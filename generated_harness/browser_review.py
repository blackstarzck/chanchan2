from __future__ import annotations

from pathlib import Path
from typing import Any, Callable

from .session_store import FileSessionStore


BrowserReviewHandler = Callable[[dict[str, Any]], dict[str, Any]]

UI_PATH_PARTS = {
    "app",
    "components",
    "frontend",
    "pages",
    "public",
    "routes",
    "ui",
    "views",
}
UI_SUFFIXES = {
    ".css",
    ".html",
    ".jsx",
    ".scss",
    ".svelte",
    ".ts",
    ".tsx",
    ".vue",
}


class BrowserReviewRunner:
    """Reviewer-owned browser validation adapter."""

    def __init__(
        self,
        repo_root: Path,
        store: FileSessionStore,
        *,
        handler: BrowserReviewHandler | None = None,
    ) -> None:
        self.repo_root = repo_root
        self.store = store
        self.handler = handler

    def _requires_browser_review(self, target_paths: list[str], required_documents: list[dict[str, Any]]) -> bool:
        labels = {
            str(label).lower()
            for document in required_documents
            for label in document.get("labels", [])
            if str(label).strip()
        }
        if labels & {"frontend", "ui", "web"}:
            return True

        for raw_path in target_paths:
            path = Path(raw_path)
            normalized_parts = {part.lower() for part in path.parts}
            if normalized_parts & UI_PATH_PARTS:
                return True
            if path.suffix.lower() in UI_SUFFIXES and not {"backend", "server", "api"} & normalized_parts:
                return True
        return False

    def review(
        self,
        *,
        session_id: str,
        turn_id: str,
        user_input: str,
        target_paths: list[str],
        required_documents: list[dict[str, Any]],
    ) -> dict[str, Any]:
        payload = {
            "turn_id": turn_id,
            "validator": "playwright-mcp",
            "target_paths": target_paths,
            "required_doc_ids": [document["doc_id"] for document in required_documents],
        }

        if not self._requires_browser_review(target_paths, required_documents):
            result = {
                **payload,
                "status": "skipped",
                "applicability": "not_applicable",
                "summary": "Browser review skipped because the touched scope does not appear to affect UI behavior.",
            }
            self.store.emit_event(session_id, "validation.completed", result)
            return result

        request = {
            **payload,
            "user_input": user_input,
            "checks": [
                "open the app in a real browser",
                "check console errors",
                "verify the relevant screen renders",
                "exercise the primary interaction when one is obvious",
                "capture screenshot or artifact references when available",
            ],
        }
        if self.handler is None:
            result = {
                **request,
                "status": "unavailable",
                "applicability": "required",
                "summary": "UI-impacting work needs Playwright MCP browser review, but no browser review handler is configured.",
            }
            self.store.emit_event(session_id, "validation.completed", result)
            return result

        handler_result = self.handler(request)
        status = str(handler_result.get("status", "unavailable"))
        result = {
            **request,
            **handler_result,
            "status": status,
            "applicability": "required",
            "summary": str(handler_result.get("summary", "Playwright MCP browser review finished.")),
        }
        self.store.emit_event(session_id, "validation.completed", result)
        return result
