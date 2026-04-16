from __future__ import annotations

from typing import Protocol

from .checklists import build_post_run_questions
from .types import AgentPacket, AgentResult


class AgentExecutor(Protocol):
    def run(self, role: str, packet: AgentPacket) -> AgentResult:
        ...


class DefaultAgentExecutor:
    def run(self, role: str, packet: AgentPacket) -> AgentResult:
        if role == "planner":
            return AgentResult(
                role=role,
                status="planned",
                summary="Planner created a bounded execution plan.",
                output={
                    "skills": packet.assigned_skills,
                    "steps": [
                        "Inspect the requested scope and touched files.",
                        "Use assigned role skills before delegating or executing work.",
                        "Apply constraints from required documents before any write or sandbox execution.",
                        "Keep the change set narrow and validate after implementation.",
                    ]
                },
            )
        if role == "implementer":
            return AgentResult(
                role=role,
                status="ready",
                summary="Implementer prepared a work packet and is gated on required-doc acknowledgement with extracted constraints for write actions.",
                output={
                    "skills": packet.assigned_skills,
                    "next_action": "execute bounded changes with tool gateway after acknowledgement",
                },
            )
        if role == "reviewer":
            questions = build_post_run_questions(packet.required_documents, packet.target_paths)
            return AgentResult(
                role=role,
                status="needs_user_confirmation",
                summary="Reviewer prepared post-run reminder questions for missing scope, risk, and consistency checks.",
                output={"skills": packet.assigned_skills, "questions": questions, "findings": []},
            )
        if role == "fixer":
            findings = packet.extra.get("findings", [])
            return AgentResult(
                role=role,
                status="recommended",
                summary="Fixer received quality findings and should address them before the next review pass.",
                output={
                    "skills": packet.assigned_skills,
                    "findings": findings,
                    "next_action": "apply fixes, then rerun quality review",
                },
            )
        return AgentResult(role=role, status="noop", summary=f"No behavior configured for role {role}.", output={})


def build_packet(
    *,
    role: str,
    turn_id: str,
    user_input: str,
    target_paths: list[str],
    required_documents: list[dict],
    requirement_memory: dict,
    assigned_skills: list[dict] | None = None,
    extra: dict | None = None,
) -> AgentPacket:
    return AgentPacket(
        role=role,
        turn_id=turn_id,
        summary=f"{role} packet for turn {turn_id}",
        user_input=user_input,
        target_paths=target_paths,
        required_documents=required_documents,
        requirement_memory=requirement_memory,
        assigned_skills=assigned_skills or [],
        extra=extra or {},
    )
