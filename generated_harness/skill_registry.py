from __future__ import annotations

import json
from pathlib import Path
from typing import Any


DEFAULT_AGENT_SKILLS: dict[str, list[dict[str, str]]] = {
    "planner": [
        {
            "skill_id": "requirement-analysis",
            "name": "Requirement Analysis",
            "purpose": "Analyze user intent, target paths, required docs, risks, and repeat patterns before execution.",
        },
        {
            "skill_id": "task-planning",
            "name": "Task Planning",
            "purpose": "Split the request into bounded steps with explicit handoffs.",
        },
    ],
    "implementer": [
        {
            "skill_id": "bounded-implementation",
            "name": "Bounded Implementation",
            "purpose": "Apply narrow changes through the tool gateway after required documents are acknowledged.",
        },
        {
            "skill_id": "constraint-application",
            "name": "Constraint Application",
            "purpose": "Use extracted document constraints while editing or running tools.",
        },
    ],
    "reviewer": [
        {
            "skill_id": "quality-review",
            "name": "Quality Review",
            "purpose": "Check changed files, validation output, missing scope, and consistency.",
        },
        {
            "skill_id": "browser-verification",
            "name": "Browser Verification",
            "purpose": "Use Playwright MCP for UI-impacting work and record validation.completed results.",
        },
        {
            "skill_id": "fallback-routing",
            "name": "Fallback Routing",
            "purpose": "Decide whether to complete, remind, fix immediately, or recommend a specialist fixer.",
        },
    ],
    "fixer": [
        {
            "skill_id": "targeted-remediation",
            "name": "Targeted Remediation",
            "purpose": "Repair validation failures and repeated findings without broad rewrites.",
        },
        {
            "skill_id": "regression-checking",
            "name": "Regression Checking",
            "purpose": "Rerun focused checks after remediation.",
        },
    ],
}


def slugify_skill_id(text: str) -> str:
    lowered = text.lower().strip()
    parts: list[str] = []
    previous_dash = False
    for character in lowered:
        if character.isalnum():
            parts.append(character)
            previous_dash = False
            continue
        if not previous_dash:
            parts.append("-")
            previous_dash = True
    return "".join(parts).strip("-") or "repeated-workflow"


class SkillRegistry:
    def __init__(self, repo_root: Path, config_path: Path | None = None) -> None:
        self.repo_root = repo_root
        self.config_path = config_path or self.repo_root / "config" / "agent_skills.json"
        self.config = self._load_config()

    def _load_config(self) -> dict[str, Any]:
        if not self.config_path.exists():
            return {"roles": DEFAULT_AGENT_SKILLS, "repeat_detection": {"threshold": 2, "skill_root": ".codex/skills"}}
        payload = json.loads(self.config_path.read_text(encoding="utf-8"))
        roles = payload.setdefault("roles", {})
        for role, skills in DEFAULT_AGENT_SKILLS.items():
            roles.setdefault(role, skills)
        payload.setdefault("repeat_detection", {"threshold": 2, "skill_root": ".codex/skills"})
        return payload

    def skills_for_role(self, role: str) -> list[dict[str, str]]:
        skills = self.config.get("roles", {}).get(role, [])
        return [dict(skill) for skill in skills]

    def role_skill_plan(self) -> dict[str, list[dict[str, str]]]:
        return {
            role: self.skills_for_role(role)
            for role in sorted(self.config.get("roles", {}))
        }

    def repeat_threshold(self) -> int:
        return int(self.config.get("repeat_detection", {}).get("threshold", 2))

    def skill_root(self) -> Path:
        raw_root = self.config.get("repeat_detection", {}).get("skill_root", ".codex/skills")
        root = Path(raw_root)
        return root if root.is_absolute() else self.repo_root / root

    def workflow_signature(
        self,
        *,
        inferred_intents: list[str],
        target_paths: list[str],
        required_docs: list[dict[str, Any]],
    ) -> str:
        labels: set[str] = set()
        for doc in required_docs:
            labels.update(str(label) for label in doc.get("labels", []) if str(label).strip())
        for path in target_paths:
            parts = Path(path).as_posix().split("/")
            if len(parts) >= 2:
                labels.add("/".join(parts[:2]))
            elif parts and parts[0]:
                labels.add(parts[0])
        intents = [intent for intent in inferred_intents if intent != "general"] or ["general"]
        signature_parts = sorted(set(intents)) + sorted(labels)
        return "|".join(signature_parts)

    def suggest_repeated_work(
        self,
        *,
        user_input: str,
        target_paths: list[str],
        inferred_intents: list[str],
        required_docs: list[dict[str, Any]],
        memory: dict[str, Any],
    ) -> tuple[str, list[dict[str, Any]]]:
        signature = self.workflow_signature(
            inferred_intents=inferred_intents,
            target_paths=target_paths,
            required_docs=required_docs,
        )
        previous_count = sum(
            1
            for turn in memory.get("turns", [])
            if turn.get("workflow_signature") == signature
        )
        repeat_count = previous_count + 1
        if repeat_count < self.repeat_threshold():
            return signature, []

        doc_ids = [doc["doc_id"] for doc in required_docs]
        suggested_id = slugify_skill_id("workflow-" + signature)
        suggested_dir = Path(".codex") / "skills" / suggested_id
        suggestion = {
            "kind": "repeated_workflow",
            "skill_id": suggested_id,
            "workflow_signature": signature,
            "repeat_count": repeat_count,
            "suggested_path": (suggested_dir / "SKILL.md").as_posix(),
            "suggested_readme_path": (suggested_dir / "README.md").as_posix(),
            "reason": "This request matches a repeated workflow and should be promoted to a reusable skill.",
            "latest_user_input": user_input,
            "target_paths": target_paths,
            "inferred_intents": inferred_intents,
            "required_doc_ids": doc_ids,
        }
        return signature, [suggestion]

    def export_repeated_skill(self, suggestion: dict[str, Any], *, overwrite: bool = False) -> Path:
        skill_id = slugify_skill_id(str(suggestion.get("skill_id") or "repeated-workflow"))
        output_dir = self.skill_root() / skill_id
        output_path = output_dir / "SKILL.md"
        if output_path.exists() and not overwrite:
            raise FileExistsError(f"Skill already exists: {output_path}")
        output_dir.mkdir(parents=True, exist_ok=True)
        output_path.write_text(self._render_repeated_skill(skill_id, suggestion), encoding="utf-8")
        (output_dir / "README.md").write_text(self._render_repeated_skill_readme(skill_id, suggestion), encoding="utf-8")
        return output_path

    def _render_repeated_skill(self, skill_id: str, suggestion: dict[str, Any]) -> str:
        required_doc_ids = suggestion.get("required_doc_ids", [])
        target_paths = suggestion.get("target_paths", [])
        intents = suggestion.get("inferred_intents", [])
        return (
            "---\n"
            f"name: {skill_id}\n"
            f"description: Use when a request matches repeated workflow {suggestion.get('workflow_signature', skill_id)}.\n"
            "---\n\n"
            f"# {skill_id}\n\n"
            "## Purpose\n\n"
            "Capture a repeated workflow so future agents can run it with less setup and fewer missed steps.\n\n"
            "## Trigger\n\n"
            f"- workflow signature: `{suggestion.get('workflow_signature', '')}`\n"
            f"- repeated count observed: {suggestion.get('repeat_count', 0)}\n"
            f"- intents: {', '.join(str(item) for item in intents) or 'none'}\n"
            f"- target paths: {', '.join(str(item) for item in target_paths) or 'none'}\n"
            f"- required docs: {', '.join(str(item) for item in required_doc_ids) or 'none'}\n\n"
            "## Workflow\n\n"
            "1. Re-run requirement analysis and confirm this skill still matches the current request.\n"
            "2. Read and acknowledge all required documents before mutating tools run.\n"
            "3. Execute the bounded implementation steps through the tool gateway.\n"
            "4. Record changed files, run validation, and finish with quality review fallback routing.\n\n"
            "## Notes\n\n"
            f"- latest matching request: {suggestion.get('latest_user_input', '')}\n"
        )

    def _render_repeated_skill_readme(self, skill_id: str, suggestion: dict[str, Any]) -> str:
        required_doc_ids = suggestion.get("required_doc_ids", [])
        target_paths = suggestion.get("target_paths", [])
        intents = suggestion.get("inferred_intents", [])
        return (
            f"# {skill_id}\n\n"
            "## What this skill is\n\n"
            "This skill was generated from a repeated workflow detected by the project harness.\n"
            "Think of it as a saved checklist for a task the team keeps asking the AI to do.\n\n"
            "## When it should run\n\n"
            f"- Workflow signature: `{suggestion.get('workflow_signature', '')}`\n"
            f"- Observed repeat count: {suggestion.get('repeat_count', 0)}\n"
            f"- Intents: {', '.join(str(item) for item in intents) or 'none'}\n"
            f"- Target paths: {', '.join(str(item) for item in target_paths) or 'none'}\n"
            f"- Required docs: {', '.join(str(item) for item in required_doc_ids) or 'none'}\n\n"
            "## Files\n\n"
            "- `SKILL.md`: machine-readable skill instructions used by the agent.\n"
            "- `README.md`: human-readable explanation of why this skill exists and when to use it.\n\n"
            "## Operating rule\n\n"
            "Before mutating tools run, the harness still needs requirement analysis and required-document acknowledgement.\n"
            "The skill speeds up repeated work, but it does not bypass safety gates.\n\n"
            "## Latest matching request\n\n"
            f"{suggestion.get('latest_user_input', '')}\n"
        )
