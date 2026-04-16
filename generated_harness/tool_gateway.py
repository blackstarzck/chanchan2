from __future__ import annotations

from typing import Any, Callable

from .document_gate import DocumentGate
from .requirement_analysis import ensure_requirements_analyzed
from .session_store import FileSessionStore


ToolHandler = Callable[[dict[str, Any]], dict[str, Any]]

DEFAULT_READ_ONLY_TOOLS = {
    "repo.read",
    "repo.search",
    "repo.list",
    "filesystem.read",
    "filesystem.search",
    "git.status",
    "git.diff",
    "git.show",
}

DEFAULT_MUTATING_TOOLS = {
    "repo.write",
    "filesystem.write",
    "filesystem.delete",
    "filesystem.move",
    "shell.run",
    "sandbox.execute",
    "git.apply_patch",
    "git.commit",
}


class ToolGateway:
    def __init__(
        self,
        *,
        store: FileSessionStore,
        gate: DocumentGate,
        handlers: dict[str, ToolHandler] | None = None,
        read_only_tools: set[str] | None = None,
        mutating_tools: set[str] | None = None,
        gate_unknown_tools: bool = True,
    ) -> None:
        self.store = store
        self.gate = gate
        self.handlers = handlers or {}
        self.read_only_tools = set(DEFAULT_READ_ONLY_TOOLS)
        if read_only_tools:
            self.read_only_tools.update(read_only_tools)
        self.mutating_tools = set(DEFAULT_MUTATING_TOOLS)
        if mutating_tools:
            self.mutating_tools.update(mutating_tools)
        self.gate_unknown_tools = gate_unknown_tools

    def _requires_gate(self, name: str) -> bool:
        if name in self.read_only_tools:
            return False
        if name in self.mutating_tools:
            return True
        return self.gate_unknown_tools

    def _changed_paths(self, payload: dict[str, Any], result: dict[str, Any]) -> list[str]:
        paths: list[str] = []
        for source in (payload, result):
            for key in ("changed_paths", "target_paths", "paths"):
                value = source.get(key)
                if isinstance(value, list):
                    paths.extend(str(item) for item in value if str(item).strip())
                elif isinstance(value, str) and value.strip():
                    paths.append(value)
        return sorted(set(paths))

    def execute(self, *, session_id: str, turn_id: str, name: str, payload: dict[str, Any]) -> dict[str, Any]:
        requires_gate = self._requires_gate(name)
        if requires_gate:
            ensure_requirements_analyzed(self.store, session_id=session_id, turn_id=turn_id)
            self.gate.ensure_open(session_id, turn_id)
        self.store.emit_event(session_id, "tool.called", {"turn_id": turn_id, "tool_name": name, "input": payload})
        handler = self.handlers.get(name)
        result = handler(payload) if handler else {"status": "noop", "tool_name": name, "payload": payload}
        self.store.emit_event(session_id, "tool.completed", {"turn_id": turn_id, "tool_name": name, "result": result})
        result_payload = result if isinstance(result, dict) else {}
        changed_paths = self._changed_paths(payload, result_payload)
        if changed_paths and (name in self.mutating_tools or "changed_paths" in result_payload):
            self.store.emit_event(
                session_id,
                "repo.changed",
                {
                    "turn_id": turn_id,
                    "tool_name": name,
                    "changed_paths": changed_paths,
                    "source": "tool_gateway",
                },
            )
        return result
