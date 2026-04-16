from __future__ import annotations

from dataclasses import asdict, dataclass, field
from pathlib import Path
from typing import Any

from .checklists import build_post_run_questions
from .session_store import FileSessionStore


SEVERITY_RANK = {
    "info": 0,
    "warning": 1,
    "error": 2,
}


@dataclass
class QualityFinding:
    severity: str
    category: str
    message: str
    target_paths: list[str] = field(default_factory=list)
    fallback: str = "remind_operator"

    def to_dict(self) -> dict[str, Any]:
        return asdict(self)


def _event_turn_id(event: dict[str, Any]) -> str | None:
    return event.get("payload", {}).get("turn_id")


def _paths_from_payload(payload: dict[str, Any]) -> list[str]:
    paths: list[str] = []
    for key in ("target_paths", "changed_paths", "paths"):
        value = payload.get(key)
        if isinstance(value, list):
            paths.extend(str(item) for item in value if str(item).strip())
        elif isinstance(value, str) and value.strip():
            paths.append(value)
    return paths


class QualityReviewer:
    """Post-run quality review that reminds and routes instead of only blocking."""

    def __init__(self, repo_root: Path, store: FileSessionStore) -> None:
        self.repo_root = repo_root
        self.store = store

    def _changed_paths(self, session_id: str, turn_id: str) -> list[str]:
        changed: set[str] = set()
        for event in self.store.get_events(session_id):
            if _event_turn_id(event) != turn_id:
                continue
            if event["event_type"] == "repo.changed":
                changed.update(_paths_from_payload(event["payload"]))
            if event["event_type"] == "tool.completed":
                result = event["payload"].get("result", {})
                if isinstance(result, dict):
                    changed.update(_paths_from_payload(result))
        return sorted(changed)

    def _validator_events(self, session_id: str, turn_id: str) -> list[dict[str, Any]]:
        return [
            event
            for event in self.store.get_events(session_id)
            if event["event_type"] == "validation.completed" and _event_turn_id(event) == turn_id
        ]

    def _fallback_action(self, findings: list[QualityFinding]) -> str:
        if not findings:
            return "complete"
        error_count = sum(1 for finding in findings if finding.severity == "error")
        warning_count = sum(1 for finding in findings if finding.severity == "warning")
        if error_count >= 2 or len(findings) >= 4:
            return "recommend_specialist_fixer"
        if error_count == 1 or warning_count >= 2:
            return "recommend_immediate_fix"
        return "complete_with_reminders"

    def review_turn(self, *, session_id: str, turn_id: str) -> dict[str, Any]:
        turn = self.store.latest_event(session_id, "turn.started", turn_id)
        required = self.store.latest_event(session_id, "docs.required", turn_id)
        reviewer = self.store.latest_event(session_id, "reviewer.questions_ready", turn_id)
        if turn is None:
            raise RuntimeError("Turn is incomplete.")

        target_paths = turn["payload"].get("target_paths", [])
        required_documents = required["payload"].get("documents", []) if required else []
        changed_paths = self._changed_paths(session_id, turn_id)
        validator_events = self._validator_events(session_id, turn_id)
        reminders = (
            reviewer["payload"].get("questions", [])
            if reviewer is not None
            else build_post_run_questions(required_documents, target_paths)
        )
        findings: list[QualityFinding] = []

        missing_targets = [
            path
            for path in target_paths
            if path and not (self.repo_root / path).exists()
        ]
        if missing_targets:
            findings.append(
                QualityFinding(
                    severity="warning",
                    category="target_missing",
                    message="Some requested target paths do not exist; confirm whether the task scope changed.",
                    target_paths=missing_targets,
                    fallback="ask_operator_or_adjust_scope",
                )
            )

        if target_paths and not changed_paths:
            findings.append(
                QualityFinding(
                    severity="warning",
                    category="no_changes_recorded",
                    message="No changed files were recorded for this turn; confirm the implementation actually happened.",
                    target_paths=target_paths,
                    fallback="run_implementer_or_record_changes",
                )
            )

        for event in validator_events:
            payload = event["payload"]
            status = payload.get("status")
            if status in {"failed", "error"}:
                findings.append(
                    QualityFinding(
                        severity="error",
                        category="validator_failed",
                        message=str(payload.get("summary", "A validator reported a failure.")),
                        target_paths=payload.get("target_paths", []),
                        fallback="recommend_immediate_fix",
                    )
                )
            elif status == "skipped" and payload.get("applicability") == "not_applicable":
                continue
            elif status in {"skipped", "unavailable"}:
                findings.append(
                    QualityFinding(
                        severity="info",
                        category="validator_unavailable",
                        message=str(payload.get("summary", "A validator did not run.")),
                        target_paths=payload.get("target_paths", []),
                        fallback="manual_check",
                    )
                )

        result = {
            "turn_id": turn_id,
            "status": "passed" if not findings else "needs_attention",
            "changed_paths": changed_paths,
            "findings": [finding.to_dict() for finding in findings],
            "reminders": reminders,
            "fallback_action": self._fallback_action(findings),
        }
        self.store.emit_event(session_id, "quality.review_completed", result)
        return result
