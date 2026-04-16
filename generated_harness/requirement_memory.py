from __future__ import annotations

import json
from pathlib import Path
from typing import Any


DEFAULT_MEMORY = {
    "turns": [],
    "active_labels": [],
    "active_intents": [],
    "recent_doc_ids": [],
    "open_risks": [],
    "registry_suggestions": [],
    "skill_suggestions": [],
    "acknowledged_constraints": [],
}


class RequirementMemory:
    def __init__(self, repo_root: Path) -> None:
        self.repo_root = repo_root
        self.memory_path = repo_root / ".harness" / "requirement_memory.json"
        self.memory_path.parent.mkdir(parents=True, exist_ok=True)

    def load(self) -> dict[str, Any]:
        if not self.memory_path.exists():
            return json.loads(json.dumps(DEFAULT_MEMORY))
        return json.loads(self.memory_path.read_text(encoding="utf-8"))

    def save(self, memory: dict[str, Any]) -> None:
        self.memory_path.write_text(json.dumps(memory, ensure_ascii=False, indent=2), encoding="utf-8")

    def update(
        self,
        *,
        turn_id: str,
        user_input: str,
        target_paths: list[str],
        inferred_intents: list[str],
        required_docs: list[dict[str, Any]],
        reviewer_questions: list[str],
        open_risks: list[str],
        registry_suggestions: list[dict[str, Any]],
        workflow_signature: str,
        skill_suggestions: list[dict[str, Any]],
    ) -> dict[str, Any]:
        memory = self.load()
        memory["turns"].append(
            {
                "turn_id": turn_id,
                "user_input": user_input,
                "target_paths": target_paths,
                "inferred_intents": inferred_intents,
                "required_doc_ids": [doc["doc_id"] for doc in required_docs],
                "reviewer_questions": reviewer_questions,
                "open_risks": open_risks,
                "workflow_signature": workflow_signature,
                "skill_suggestions": skill_suggestions,
            }
        )
        memory["active_intents"] = sorted(set(memory["active_intents"]) | set(inferred_intents))
        labels = set(memory["active_labels"])
        doc_ids = set(memory["recent_doc_ids"])
        for doc in required_docs:
            labels.update(doc.get("labels", []))
            doc_ids.add(doc["doc_id"])
        memory["active_labels"] = sorted(labels)
        memory["recent_doc_ids"] = sorted(doc_ids)
        memory["open_risks"] = [risk for risk in open_risks if risk]
        suggestions = memory.get("registry_suggestions", [])
        suggestions.extend(registry_suggestions)
        deduped: list[dict[str, Any]] = []
        seen: set[tuple[str, str]] = set()
        for suggestion in suggestions:
            key = (suggestion.get("kind", ""), suggestion.get("value", ""))
            if key in seen:
                continue
            seen.add(key)
            deduped.append(suggestion)
        memory["registry_suggestions"] = deduped
        skill_items = memory.get("skill_suggestions", [])
        skill_items.extend(skill_suggestions)
        deduped_skills: list[dict[str, Any]] = []
        seen_skills: set[str] = set()
        for suggestion in skill_items:
            key = str(suggestion.get("skill_id") or suggestion.get("workflow_signature") or "")
            if not key or key in seen_skills:
                continue
            seen_skills.add(key)
            deduped_skills.append(suggestion)
        memory["skill_suggestions"] = deduped_skills
        self.save(memory)
        return memory

    def record_acknowledgement(self, *, turn_id: str, documents: list[dict[str, Any]], note: str) -> dict[str, Any]:
        memory = self.load()
        items = memory.get("acknowledged_constraints", [])
        for document in documents:
            items.append(
                {
                    "turn_id": turn_id,
                    "doc_id": document["doc_id"],
                    "constraints": document.get("constraints", []),
                    "note": note,
                }
            )
        memory["acknowledged_constraints"] = items[-25:]
        self.save(memory)
        return memory
