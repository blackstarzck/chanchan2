from __future__ import annotations

from dataclasses import asdict, dataclass, field
from typing import Any


@dataclass
class MatchReason:
    kind: str
    value: str

    def to_dict(self) -> dict[str, str]:
        return asdict(self)


@dataclass
class RequiredDocument:
    doc_id: str
    path: str
    summary: str
    digest: str
    priority: int
    labels: list[str] = field(default_factory=list)
    section_hints: list[str] = field(default_factory=list)
    read_paths: list[str] = field(default_factory=list)
    reasons: list[MatchReason] = field(default_factory=list)

    def to_dict(self) -> dict[str, Any]:
        payload = asdict(self)
        payload["reasons"] = [reason.to_dict() for reason in self.reasons]
        return payload


@dataclass
class AgentPacket:
    role: str
    turn_id: str
    summary: str
    user_input: str
    target_paths: list[str]
    required_documents: list[dict[str, Any]]
    requirement_memory: dict[str, Any]
    assigned_skills: list[dict[str, Any]] = field(default_factory=list)
    extra: dict[str, Any] = field(default_factory=dict)

    def to_dict(self) -> dict[str, Any]:
        return asdict(self)


@dataclass
class AgentResult:
    role: str
    status: str
    summary: str
    output: dict[str, Any] = field(default_factory=dict)

    def to_dict(self) -> dict[str, Any]:
        return asdict(self)
