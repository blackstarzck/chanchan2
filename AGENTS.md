# Chanchan2 Harness Agent Instructions

## Goal

This repository contains a generated project harness for the Chanchan2 design-system workspace. The harness is a guard rail for agent work: it records each turn, decides which local documents must be read, blocks risky execution until those documents are acknowledged, and runs a review step after implementation.

Explain results in practical language first. When using technical names such as `HarnessRuntime`, `docs.required`, or `config/document_registry.json`, briefly state what they do.

## Repository Shape

- `packages/tokens`: semantic design-token package.
- `packages/ui`: React UI component package.
- `apps/docs`: Vite documentation and preview app.
- `design`: repository-side Figma handoff and release snapshots.
- `docs`: source-of-truth process, release, and design-dev guides.
- `generated_harness`: Python runtime for the local harness.
- `config/document_registry.json`: document gate registry.
- `.harness`: ignored runtime state for sessions, acknowledgements, document indexes, and requirement memory.

## Default Roles

- `planner`: produces a task plan and declares required docs
- `implementer`: performs tool and sandbox actions but cannot continue past the acknowledgement gate without per-document constraints
- `reviewer`: checks missing scope, weak spots, consistency, validation output, and emits reminder questions
- `fixer`: applies remediation when quality review recommends immediate or specialist repair

Each role receives assigned skills from `config/agent_skills.json`. Treat these skills like the role's toolbox: the role name says who owns the work, while the assigned skills say how that role should perform it.

The reviewer owns browser verification. For UI-impacting work, it should use the Playwright MCP browser-review adapter when configured and record the result as `validation.completed`. The final `quality_review` step reads that result and decides the fallback action.

## Local Commands

- `npm run harness:turn "--" "--user-input" "..." "--target-path" "<path>"` starts a harness turn on Windows shells.
- `npm run harness:ack "--" "--session-id" "<id>" "--turn-id" "<id>" "--template"` writes an acknowledgement template on Windows shells.
- `npm run harness:docs` rebuilds the `.harness/document_library` index from the document registry.
- `npm run harness:test` runs the generated runtime tests.

## Requirement Analysis Rule

Every turn must emit `requirements.analyzed` after `turn.started` and before planning, writing, shell, sandbox, or unknown tool execution. Treat this like checking the address before a delivery: if the request has not been analyzed, the harness does not know which route or manual applies.

## Required-Document Rule

The runtime must not call tools or sandbox execution until the current turn has acknowledged every required document selected by policy.

## Safety Rule

Session state must be durable outside the sandbox. Credentials must stay outside the sandbox by default.

## Persistent Requirement Memory

The harness keeps a durable requirement-memory file so repeated requests can update labels, doc matches, open risks, and registry suggestions across turns.

## Repeated Workflow Skills

When the same workflow repeats, the harness records a skill suggestion in `.harness/requirement_memory.json`. Use `scripts/export_repeated_skill.py` to turn the suggestion into `.codex/skills/<skill-id>/SKILL.md` plus `.codex/skills/<skill-id>/README.md` so future runs can reuse the workflow directly and humans can understand what was saved.

## Post-Run Quality Review

After implementation, the harness records changed files and runs a quality review. Reminder-only issues should be surfaced as reminders, not treated as hard failures. Failed validation or repeated findings should route to a fixer or specialist recommendation.

## Chanchan2 Document Gate

The registry is tuned for this repo:

- UI package changes should select `frontend-design-sync`, `ui-package`, and often `figma-component-extraction`.
- Token or theme changes should select `frontend-design-sync` and `token-package`.
- Docs preview changes should select `docs-visual-harness`.
- Harness maintenance should select `harness-operations`.
- Release or publishing changes should select `publishing-and-operations`.
