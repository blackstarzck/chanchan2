# Harness Runtime Directory

This directory is used by the generated chanchan2 harness at runtime.

- `sessions/` stores append-only turn event logs.
- `acks/` stores required-document acknowledgement templates and submissions.
- `document_library/` stores rebuilt document indexes and split manual sections.
- `requirement_memory.json` stores persistent intent, risks, repeated workflows, and acknowledgement notes.

Runtime files are ignored by Git so local sessions do not leak into commits.
