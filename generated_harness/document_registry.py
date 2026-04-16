from __future__ import annotations

import fnmatch
import hashlib
import json
import re
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any

from .types import MatchReason, RequiredDocument


INTENT_HINTS = {
    "create": ["make", "create", "add", "build", "\ub9cc\ub4e4", "\ucd94\uac00", "\uad6c\ud604"],
    "fix": ["fix", "bug", "repair", "\uc218\uc815", "\uace0\uccd0", "\ubc84\uadf8"],
    "refactor": ["refactor", "cleanup", "\ub9ac\ud329\ud130", "\uc815\ub9ac"],
    "review": ["review", "check", "\uac80\ud1a0", "\ud655\uc778"],
    "test": ["test", "verify", "\uac80\uc99d", "\ud14c\uc2a4\ud2b8"],
}

MATCH_WEIGHTS = {
    "keyword": 2,
    "intent": 1,
    "path": 5,
    "content": 5,
    "memory": 4,
}


@dataclass
class DocumentEntry:
    doc_id: str
    path: str
    summary: str
    priority: int = 0
    keywords: list[str] = field(default_factory=list)
    intent_patterns: list[str] = field(default_factory=list)
    path_globs: list[str] = field(default_factory=list)
    content_patterns: list[str] = field(default_factory=list)
    labels: list[str] = field(default_factory=list)
    section_hints: list[str] = field(default_factory=list)
    toc: dict[str, Any] = field(default_factory=dict)


def infer_intents(user_input: str) -> list[str]:
    lowered = user_input.lower()
    intents = [intent for intent, patterns in INTENT_HINTS.items() if any(pattern in lowered for pattern in patterns)]
    return intents or ["general"]


class DocumentRegistry:
    def __init__(self, repo_root: Path, config_path: Path | None = None) -> None:
        self.repo_root = repo_root
        self.config_path = config_path or self._default_config_path()
        self.entries = self._load_entries()

    def _default_config_path(self) -> Path:
        primary = self.repo_root / "config" / "document_registry.json"
        fallback = self.repo_root / "config" / "document_registry.example.json"
        return primary if primary.exists() else fallback

    def _load_entries(self) -> list[DocumentEntry]:
        payload = json.loads(self.config_path.read_text(encoding="utf-8"))
        return [DocumentEntry(**entry) for entry in payload.get("documents", [])]

    def _normalize_path(self, raw_path: str) -> str:
        path = Path(raw_path)
        if path.is_absolute():
            try:
                return path.relative_to(self.repo_root).as_posix()
            except ValueError:
                return path.as_posix()
        return path.as_posix()

    def _digest_for(self, relative_path: str) -> str:
        return hashlib.sha256((self.repo_root / relative_path).read_bytes()).hexdigest()

    def _doc_read_paths(self, entry: DocumentEntry) -> list[str]:
        library_index = self.repo_root / ".harness" / "document_library" / entry.doc_id / "INDEX.md"
        if library_index.exists():
            return [library_index.relative_to(self.repo_root).as_posix()]
        return [entry.path]

    def _reason_score(self, reasons: list[MatchReason]) -> int:
        return sum(MATCH_WEIGHTS.get(reason.kind, 0) for reason in reasons)

    def _is_viable_match(self, reasons: list[MatchReason]) -> bool:
        kinds = {reason.kind for reason in reasons}
        if kinds == {"intent"}:
            return False
        if {"path", "content"} & kinds:
            return True
        if "memory" in kinds and not ({"keyword", "path", "content"} & kinds):
            return False
        if "keyword" in kinds:
            return self._reason_score(reasons) >= 3
        return False

    def match(self, *, user_input: str, target_paths: list[str], memory: dict[str, Any]) -> tuple[list[RequiredDocument], list[str], list[dict[str, Any]]]:
        normalized_paths = [self._normalize_path(path) for path in target_paths]
        inferred_intents = infer_intents(user_input)
        lowered = user_input.lower()
        matches: list[RequiredDocument] = []
        suggestions: list[dict[str, Any]] = []

        for entry in self.entries:
            reasons: list[MatchReason] = []
            for keyword in entry.keywords:
                if keyword.lower() in lowered:
                    reasons.append(MatchReason("keyword", keyword))
            for pattern in entry.intent_patterns:
                if pattern.lower() in lowered:
                    reasons.append(MatchReason("intent", pattern))
            for candidate in normalized_paths:
                if any(fnmatch.fnmatch(candidate, glob) for glob in entry.path_globs):
                    reasons.append(MatchReason("path", candidate))
            for candidate in normalized_paths:
                absolute = self.repo_root / candidate
                if not absolute.exists() or not absolute.is_file():
                    continue
                try:
                    text = absolute.read_text(encoding="utf-8")
                except UnicodeDecodeError:
                    continue
                for pattern in entry.content_patterns:
                    if re.search(pattern, text, flags=re.IGNORECASE):
                        reasons.append(MatchReason("content", pattern))
            active_labels = set(memory.get("active_labels", []))
            if set(entry.labels) & active_labels:
                for label in sorted(set(entry.labels) & active_labels):
                    reasons.append(MatchReason("memory", label))
            if not reasons or not self._is_viable_match(reasons):
                continue
            matches.append(
                RequiredDocument(
                    doc_id=entry.doc_id,
                    path=entry.path,
                    summary=entry.summary,
                    digest=self._digest_for(entry.path),
                    priority=entry.priority,
                    labels=entry.labels,
                    section_hints=entry.section_hints,
                    read_paths=self._doc_read_paths(entry),
                    reasons=reasons,
                )
            )

        if not matches and normalized_paths:
            for candidate in normalized_paths:
                suggestions.append({"kind": "path_glob", "value": candidate, "suggestion": f"Add a registry entry for {candidate}"})
        if not matches and inferred_intents:
            for intent in inferred_intents:
                suggestions.append({"kind": "intent", "value": intent, "suggestion": f"Add a document entry covering intent '{intent}'"})

        matches.sort(key=lambda item: (-item.priority, item.doc_id))
        return matches, inferred_intents, suggestions
