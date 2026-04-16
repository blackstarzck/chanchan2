from __future__ import annotations

from pathlib import Path
from typing import Any

from .checklists import build_post_run_questions, infer_open_risks
from .document_registry import DocumentRegistry
from .requirement_memory import RequirementMemory
from .session_store import FileSessionStore
from .skill_registry import SkillRegistry
from .types import RequiredDocument


class RequirementAnalysisError(RuntimeError):
    pass


class RequirementAnalyzer:
    def __init__(
        self,
        repo_root: Path,
        store: FileSessionStore,
        registry: DocumentRegistry,
        memory: RequirementMemory,
        skills: SkillRegistry,
    ) -> None:
        self.repo_root = repo_root
        self.store = store
        self.registry = registry
        self.memory = memory
        self.skills = skills

    def analyze_turn(
        self,
        *,
        session_id: str,
        turn_id: str,
        user_input: str,
        target_paths: list[str],
    ) -> tuple[dict[str, Any], list[RequiredDocument], dict[str, Any]]:
        if not user_input.strip():
            payload = {
                "turn_id": turn_id,
                "status": "blocked",
                "reason": "empty user input",
            }
            self.store.emit_event(session_id, "requirements.analysis_blocked", payload)
            raise RequirementAnalysisError("User input must be analyzed before execution, but it was empty.")

        memory_snapshot = self.memory.load()
        required_docs, inferred_intents, suggestions = self.registry.match(
            user_input=user_input,
            target_paths=target_paths,
            memory=memory_snapshot,
        )
        required_payload = [doc.to_dict() for doc in required_docs]
        reviewer_questions = build_post_run_questions(required_payload, target_paths)
        open_risks = infer_open_risks(required_payload, target_paths)
        workflow_signature, skill_suggestions = self.skills.suggest_repeated_work(
            user_input=user_input,
            target_paths=target_paths,
            inferred_intents=inferred_intents,
            required_docs=required_payload,
            memory=memory_snapshot,
        )
        payload = {
            "turn_id": turn_id,
            "status": "completed",
            "user_input": user_input,
            "target_paths": target_paths,
            "inferred_intents": inferred_intents,
            "required_doc_ids": [doc["doc_id"] for doc in required_payload],
            "required_documents": required_payload,
            "registry_suggestions": suggestions,
            "workflow_signature": workflow_signature,
            "skill_suggestions": skill_suggestions,
            "role_skill_plan": self.skills.role_skill_plan(),
            "reviewer_questions": reviewer_questions,
            "open_risks": open_risks,
            "summary": "Analyzed the user request before planning, doc gating, or execution.",
        }
        self.store.emit_event(session_id, "requirements.analyzed", payload)
        return payload, required_docs, memory_snapshot


def ensure_requirements_analyzed(
    store: FileSessionStore,
    *,
    session_id: str,
    turn_id: str,
    block_event_type: str | None = "tool.blocked",
) -> dict[str, Any]:
    analysis_event = store.latest_event(session_id, "requirements.analyzed", turn_id)
    if analysis_event is not None and analysis_event["payload"].get("status") == "completed":
        return analysis_event["payload"]

    payload = {
        "turn_id": turn_id,
        "reason": "requirements analysis not completed",
    }
    if block_event_type:
        store.emit_event(session_id, block_event_type, payload)
    raise RequirementAnalysisError("Blocked until the user request is analyzed.")
