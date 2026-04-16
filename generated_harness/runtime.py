from __future__ import annotations

import uuid
from pathlib import Path
from typing import Any

from .agents import AgentExecutor, DefaultAgentExecutor, build_packet
from .browser_review import BrowserReviewHandler, BrowserReviewRunner
from .checklists import build_post_run_questions
from .document_gate import DocumentGate, DocumentGateError
from .document_registry import DocumentRegistry
from .quality_review import QualityReviewer
from .requirement_analysis import RequirementAnalyzer, ensure_requirements_analyzed
from .requirement_memory import RequirementMemory
from .session_store import FileSessionStore
from .skill_registry import SkillRegistry
from .tool_gateway import ToolGateway


class HarnessRuntime:
    def __init__(
        self,
        repo_root: str | Path,
        *,
        executor: AgentExecutor | None = None,
        tool_handlers: dict[str, Any] | None = None,
        browser_review_handler: BrowserReviewHandler | None = None,
    ) -> None:
        self.repo_root = Path(repo_root).resolve()
        self.store = FileSessionStore(self.repo_root)
        self.memory = RequirementMemory(self.repo_root)
        self.registry = DocumentRegistry(self.repo_root)
        self.skills = SkillRegistry(self.repo_root)
        self.gate = DocumentGate(self.repo_root, self.store)
        self.analyzer = RequirementAnalyzer(self.repo_root, self.store, self.registry, self.memory, self.skills)
        self.tool_gateway = ToolGateway(store=self.store, gate=self.gate, handlers=tool_handlers)
        self.browser_review = BrowserReviewRunner(self.repo_root, self.store, handler=browser_review_handler)
        self.quality = QualityReviewer(self.repo_root, self.store)
        self.executor = executor or DefaultAgentExecutor()

    def _ensure_session(self, session_id: str) -> None:
        if self.store.get_events(session_id):
            return
        self.store.emit_event(session_id, "session.started", {"session_id": session_id})

    def start_turn(self, *, user_input: str, target_paths: list[str], session_id: str | None = None) -> dict[str, Any]:
        session_id = session_id or uuid.uuid4().hex[:12]
        turn_id = uuid.uuid4().hex[:8]
        self._ensure_session(session_id)
        self.store.emit_event(session_id, "turn.started", {"turn_id": turn_id, "user_input": user_input, "target_paths": target_paths})
        requirement_analysis, required_docs, memory = self.analyzer.analyze_turn(
            session_id=session_id,
            turn_id=turn_id,
            user_input=user_input,
            target_paths=target_paths,
        )
        self.gate.emit_required(session_id, turn_id, required_docs)

        required_payload = requirement_analysis["required_documents"]
        planner_packet = build_packet(
            role="planner",
            turn_id=turn_id,
            user_input=user_input,
            target_paths=target_paths,
            required_documents=required_payload,
            requirement_memory=memory,
            assigned_skills=self.skills.skills_for_role("planner"),
            extra={
                "inferred_intents": requirement_analysis["inferred_intents"],
                "requirement_analysis": requirement_analysis,
            },
        )
        self.store.emit_event(session_id, "agent.assigned", {"turn_id": turn_id, "role": "planner", "skills": planner_packet.assigned_skills})
        planner_result = self.executor.run("planner", planner_packet)
        self.store.emit_event(session_id, "agent.completed", {"turn_id": turn_id, **planner_result.to_dict()})

        updated_memory = self.memory.update(
            turn_id=turn_id,
            user_input=user_input,
            target_paths=target_paths,
            inferred_intents=requirement_analysis["inferred_intents"],
            required_docs=required_payload,
            reviewer_questions=requirement_analysis["reviewer_questions"],
            open_risks=requirement_analysis["open_risks"],
            registry_suggestions=requirement_analysis["registry_suggestions"],
            workflow_signature=requirement_analysis["workflow_signature"],
            skill_suggestions=requirement_analysis["skill_suggestions"],
        )
        self.store.emit_event(
            session_id,
            "requirements.updated",
            {
                "turn_id": turn_id,
                "inferred_intents": requirement_analysis["inferred_intents"],
                "required_doc_ids": [doc["doc_id"] for doc in required_payload],
                "registry_suggestions": requirement_analysis["registry_suggestions"],
                "skill_suggestions": requirement_analysis["skill_suggestions"],
            },
        )
        return {
            "session_id": session_id,
            "turn_id": turn_id,
            "required_documents": required_payload,
            "acknowledgement_template": self.gate.build_ack_template(required_payload),
            "planner_result": planner_result.to_dict(),
            "requirement_memory": updated_memory,
            "requirement_analysis": requirement_analysis,
        }

    def _require_analysis_completed(self, *, session_id: str, turn_id: str) -> dict[str, Any]:
        return ensure_requirements_analyzed(
            self.store,
            session_id=session_id,
            turn_id=turn_id,
            block_event_type="turn.blocked",
        )

    def build_acknowledgement_template(self, *, session_id: str, turn_id: str) -> dict[str, Any]:
        required_event = self.store.latest_event(session_id, "docs.required", turn_id)
        if required_event is None:
            raise DocumentGateError("No required documents found for this turn.")
        return self.gate.build_ack_template(required_event["payload"]["documents"])

    def acknowledge_required_docs(
        self,
        *,
        session_id: str,
        turn_id: str,
        note: str | None = None,
        documents: list[dict[str, Any]] | None = None,
        auto: bool = False,
    ) -> dict[str, Any]:
        required_event = self.store.latest_event(session_id, "docs.required", turn_id)
        if required_event is None:
            raise DocumentGateError("No required documents found for this turn.")
        ack_note = note or ""
        ack_documents = documents or []
        if auto:
            payload = self.gate.build_auto_ack_payload(required_event["payload"]["documents"])
            if not ack_note:
                ack_note = payload["note"]
            if not ack_documents:
                ack_documents = payload["documents"]
        acknowledgement = self.gate.acknowledge(
            session_id=session_id,
            turn_id=turn_id,
            note=ack_note,
            documents=ack_documents,
        )
        self.memory.record_acknowledgement(
            turn_id=turn_id,
            documents=acknowledgement["documents"],
            note=acknowledgement["note"],
        )
        return acknowledgement

    def run_implementer(self, *, session_id: str, turn_id: str) -> dict[str, Any]:
        self._require_analysis_completed(session_id=session_id, turn_id=turn_id)
        turn = self.store.latest_event(session_id, "turn.started", turn_id)
        required = self.store.latest_event(session_id, "docs.required", turn_id)
        if turn is None or required is None:
            raise RuntimeError("Turn is incomplete.")
        packet = build_packet(
            role="implementer",
            turn_id=turn_id,
            user_input=turn["payload"]["user_input"],
            target_paths=turn["payload"]["target_paths"],
            required_documents=required["payload"]["documents"],
            requirement_memory=self.memory.load(),
            assigned_skills=self.skills.skills_for_role("implementer"),
        )
        self.store.emit_event(session_id, "agent.assigned", {"turn_id": turn_id, "role": "implementer", "skills": packet.assigned_skills})
        result = self.executor.run("implementer", packet)
        self.store.emit_event(session_id, "agent.completed", {"turn_id": turn_id, **result.to_dict()})
        return result.to_dict()

    def simulate_write(self, *, session_id: str, turn_id: str, target_paths: list[str]) -> dict[str, Any]:
        self._require_analysis_completed(session_id=session_id, turn_id=turn_id)
        return self.tool_gateway.execute(
            session_id=session_id,
            turn_id=turn_id,
            name="repo.write",
            payload={"target_paths": target_paths, "mode": "simulated"},
        )

    def run_reviewer(self, *, session_id: str, turn_id: str) -> dict[str, Any]:
        self._require_analysis_completed(session_id=session_id, turn_id=turn_id)
        turn = self.store.latest_event(session_id, "turn.started", turn_id)
        required = self.store.latest_event(session_id, "docs.required", turn_id)
        if turn is None or required is None:
            raise RuntimeError("Turn is incomplete.")
        questions = build_post_run_questions(required["payload"]["documents"], turn["payload"]["target_paths"])
        packet = build_packet(
            role="reviewer",
            turn_id=turn_id,
            user_input=turn["payload"]["user_input"],
            target_paths=turn["payload"]["target_paths"],
            required_documents=required["payload"]["documents"],
            requirement_memory=self.memory.load(),
            assigned_skills=self.skills.skills_for_role("reviewer"),
            extra={"questions": questions},
        )
        self.store.emit_event(session_id, "agent.assigned", {"turn_id": turn_id, "role": "reviewer", "skills": packet.assigned_skills})
        result = self.executor.run("reviewer", packet)
        browser_result = self.browser_review.review(
            session_id=session_id,
            turn_id=turn_id,
            user_input=turn["payload"]["user_input"],
            target_paths=turn["payload"]["target_paths"],
            required_documents=required["payload"]["documents"],
        )
        result.output["browser_review"] = browser_result
        self.store.emit_event(session_id, "agent.completed", {"turn_id": turn_id, **result.to_dict()})
        self.store.emit_event(session_id, "reviewer.questions_ready", {"turn_id": turn_id, "questions": result.output.get("questions", questions)})
        return result.to_dict()

    def run_fixer(self, *, session_id: str, turn_id: str, findings: list[str]) -> dict[str, Any]:
        self._require_analysis_completed(session_id=session_id, turn_id=turn_id)
        turn = self.store.latest_event(session_id, "turn.started", turn_id)
        required = self.store.latest_event(session_id, "docs.required", turn_id)
        if turn is None or required is None:
            raise RuntimeError("Turn is incomplete.")
        packet = build_packet(
            role="fixer",
            turn_id=turn_id,
            user_input=turn["payload"]["user_input"],
            target_paths=turn["payload"]["target_paths"],
            required_documents=required["payload"]["documents"],
            requirement_memory=self.memory.load(),
            assigned_skills=self.skills.skills_for_role("fixer"),
            extra={"findings": findings},
        )
        self.store.emit_event(session_id, "agent.assigned", {"turn_id": turn_id, "role": "fixer", "skills": packet.assigned_skills})
        result = self.executor.run("fixer", packet)
        self.store.emit_event(session_id, "agent.completed", {"turn_id": turn_id, **result.to_dict()})
        return result.to_dict()

    def run_quality_review(self, *, session_id: str, turn_id: str) -> dict[str, Any]:
        self._require_analysis_completed(session_id=session_id, turn_id=turn_id)
        return self.quality.review_turn(session_id=session_id, turn_id=turn_id)

    def continue_turn(self, *, session_id: str, turn_id: str) -> dict[str, Any]:
        self._require_analysis_completed(session_id=session_id, turn_id=turn_id)
        turn = self.store.latest_event(session_id, "turn.started", turn_id)
        if turn is None:
            raise RuntimeError("Turn is incomplete.")
        target_paths = turn["payload"]["target_paths"]
        output: dict[str, Any] = {
            "session_id": session_id,
            "turn_id": turn_id,
        }
        output["implementer_result"] = self.run_implementer(session_id=session_id, turn_id=turn_id)
        output["simulated_write"] = self.simulate_write(
            session_id=session_id,
            turn_id=turn_id,
            target_paths=target_paths,
        )
        output["reviewer_result"] = self.run_reviewer(session_id=session_id, turn_id=turn_id)
        output["quality_review"] = self.run_quality_review(session_id=session_id, turn_id=turn_id)
        fallback_action = output["quality_review"]["fallback_action"]
        if fallback_action in {"recommend_immediate_fix", "recommend_specialist_fixer"}:
            findings = [finding["message"] for finding in output["quality_review"]["findings"]]
            output["fixer_result"] = self.run_fixer(session_id=session_id, turn_id=turn_id, findings=findings)
            self.store.emit_event(
                session_id,
                "turn.needs_attention",
                {
                    "turn_id": turn_id,
                    "fallback_action": fallback_action,
                    "findings": output["quality_review"]["findings"],
                },
            )
        output["turn_completed"] = self.complete_turn(
            session_id=session_id,
            turn_id=turn_id,
            summary=f"Turn finished with quality fallback action: {fallback_action}.",
        )
        return output

    def complete_turn(self, *, session_id: str, turn_id: str, summary: str) -> dict[str, Any]:
        return self.store.emit_event(session_id, "turn.completed", {"turn_id": turn_id, "summary": summary})
