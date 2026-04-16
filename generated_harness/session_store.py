from __future__ import annotations

import json
from datetime import UTC, datetime
from pathlib import Path
from typing import Any


class FileSessionStore:
    def __init__(self, repo_root: Path) -> None:
        self.repo_root = repo_root
        self.session_dir = repo_root / ".harness" / "sessions"
        self.session_dir.mkdir(parents=True, exist_ok=True)

    def _session_path(self, session_id: str) -> Path:
        return self.session_dir / f"{session_id}.jsonl"

    def get_events(self, session_id: str) -> list[dict[str, Any]]:
        path = self._session_path(session_id)
        if not path.exists():
            return []
        return [json.loads(line) for line in path.read_text(encoding="utf-8").splitlines() if line.strip()]

    def emit_event(self, session_id: str, event_type: str, payload: dict[str, Any]) -> dict[str, Any]:
        events = self.get_events(session_id)
        event = {
            "sequence": len(events) + 1,
            "timestamp": datetime.now(UTC).isoformat(),
            "event_type": event_type,
            "payload": payload,
        }
        path = self._session_path(session_id)
        with path.open("a", encoding="utf-8") as handle:
            handle.write(json.dumps(event, ensure_ascii=False) + "\n")
        return event

    def latest_event(self, session_id: str, event_type: str | None = None, turn_id: str | None = None) -> dict[str, Any] | None:
        for event in reversed(self.get_events(session_id)):
            if event_type and event["event_type"] != event_type:
                continue
            if turn_id and event["payload"].get("turn_id") != turn_id:
                continue
            return event
        return None
