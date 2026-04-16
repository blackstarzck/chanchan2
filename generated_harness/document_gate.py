from __future__ import annotations

import hashlib
from pathlib import Path
from typing import Any

from .session_store import FileSessionStore
from .types import RequiredDocument


class DocumentGateError(RuntimeError):
    pass


class DocumentGate:
    def __init__(self, repo_root: Path, store: FileSessionStore) -> None:
        self.repo_root = repo_root
        self.store = store

    def _current_digest(self, document: dict[str, Any]) -> str:
        path = self.repo_root / document["path"]
        if not path.exists() or not path.is_file():
            raise DocumentGateError(f"Required document is missing: {document['path']}")
        return hashlib.sha256(path.read_bytes()).hexdigest()

    def emit_required(self, session_id: str, turn_id: str, required_docs: list[RequiredDocument]) -> None:
        self.store.emit_event(
            session_id,
            "docs.required",
            {
                "turn_id": turn_id,
                "documents": [doc.to_dict() for doc in required_docs],
            },
        )

    def build_ack_template(self, required_docs: list[dict[str, Any]]) -> dict[str, Any]:
        return {
            "note": "Summarize the constraints you extracted before execution.",
            "documents": [
                {
                    "doc_id": doc["doc_id"],
                    "digest": doc["digest"],
                    "read_paths": doc.get("read_paths", []),
                    "constraints": [],
                }
                for doc in required_docs
            ],
        }

    def build_auto_ack_payload(self, required_docs: list[dict[str, Any]]) -> dict[str, Any]:
        return {
            "note": "Auto acknowledgement for demo or testing only.",
            "documents": [
                {
                    "doc_id": doc["doc_id"],
                    "digest": doc["digest"],
                    "read_paths": doc.get("read_paths", []),
                    "constraints": [doc["summary"], *[f"Review section: {hint}" for hint in doc.get("section_hints", [])[:2]]],
                }
                for doc in required_docs
            ],
        }

    def acknowledge(self, *, session_id: str, turn_id: str, note: str, documents: list[dict[str, Any]]) -> dict[str, Any]:
        required_event = self.store.latest_event(session_id, "docs.required", turn_id)
        if required_event is None:
            raise DocumentGateError("No required-document event exists for this turn.")
        required_docs = required_event["payload"]["documents"]
        required_lookup = {doc["doc_id"]: doc for doc in required_docs}
        if not note.strip():
            raise DocumentGateError("Acknowledgement note must include extracted constraints.")

        normalized_documents: list[dict[str, Any]] = []
        seen_ids: set[str] = set()
        for document in documents:
            doc_id = document.get("doc_id", "").strip()
            if not doc_id:
                raise DocumentGateError("Each acknowledgement document must include a doc_id.")
            if doc_id not in required_lookup:
                raise DocumentGateError(f"Document {doc_id} is not required for this turn.")
            if doc_id in seen_ids:
                raise DocumentGateError(f"Document {doc_id} appears more than once in the acknowledgement.")
            seen_ids.add(doc_id)

            constraints = [item.strip() for item in document.get("constraints", []) if str(item).strip()]
            if not constraints:
                raise DocumentGateError(f"Document {doc_id} must include at least one extracted constraint.")
            normalized_documents.append(
                {
                    "doc_id": doc_id,
                    "digest": required_lookup[doc_id]["digest"],
                    "read_paths": required_lookup[doc_id].get("read_paths", []),
                    "constraints": constraints,
                }
            )

        missing = sorted(set(required_lookup) - seen_ids)
        if missing:
            raise DocumentGateError(f"Cannot acknowledge partially. Missing: {', '.join(missing)}")

        payload = {
            "turn_id": turn_id,
            "documents": normalized_documents,
            "note": note.strip(),
        }
        self.store.emit_event(session_id, "docs.acknowledged", payload)
        return payload

    def ensure_open(self, session_id: str, turn_id: str) -> None:
        required_event = self.store.latest_event(session_id, "docs.required", turn_id)
        if required_event is None:
            return
        ack_event = self.store.latest_event(session_id, "docs.acknowledged", turn_id)
        required_docs = required_event["payload"]["documents"]
        required_lookup = {doc["doc_id"]: doc for doc in required_docs}
        required_ids = set(required_lookup)
        acknowledged_lookup: dict[str, dict[str, Any]] = {}
        if ack_event is not None:
            acknowledged_lookup = {doc["doc_id"]: doc for doc in ack_event["payload"]["documents"]}
        acknowledged_ids = set(acknowledged_lookup)
        missing = sorted(required_ids - acknowledged_ids)
        if missing:
            self.store.emit_event(
                session_id,
                "tool.blocked",
                {
                    "turn_id": turn_id,
                    "reason": "required documents not acknowledged",
                    "missing_doc_ids": missing,
                },
            )
            raise DocumentGateError(f"Blocked until required docs are acknowledged: {', '.join(missing)}")

        stale: list[str] = []
        for doc_id, required_doc in required_lookup.items():
            acknowledged_doc = acknowledged_lookup[doc_id]
            acknowledged_digest = acknowledged_doc.get("digest")
            required_digest = required_doc.get("digest")
            current_digest = self._current_digest(required_doc)
            if acknowledged_digest != required_digest or current_digest != acknowledged_digest:
                stale.append(doc_id)

        if stale:
            self.store.emit_event(
                session_id,
                "tool.blocked",
                {
                    "turn_id": turn_id,
                    "reason": "required documents changed after acknowledgement",
                    "stale_doc_ids": stale,
                },
            )
            raise DocumentGateError(f"Blocked because required docs changed after acknowledgement: {', '.join(stale)}")
