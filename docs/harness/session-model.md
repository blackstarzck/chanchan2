# chanchan2-harness Session Model

## Session Purpose

- What the session represents: durable history of one harnessed task stream
- What it does not represent: sandbox filesystem or prompt context alone

## Event Stream

| Event | Producer | Stored Fields | Notes |
| --- | --- | --- | --- |
| session.started | runtime | session_id, metadata | first durable event |
| turn.started | runtime | turn_id, user_input, target_paths | begins a new turn |
| requirements.analyzed | requirement analyzer | turn_id, intents, required_docs, risks, suggestions | hard pre-execution analysis receipt |
| requirements.analysis_blocked | requirement analyzer | turn_id, reason | emitted when a request cannot be analyzed |
| docs.required | pre-turn selector | turn_id, doc_ids, digests | hard gate input |
| docs.acknowledged | runtime or agent bridge | turn_id, doc_ids, digests, constraints | required before execution |
| requirements.updated | runtime | turn_id, intents, matched_docs, suggestions | persistent requirement analysis |
| agent.assigned | runtime | turn_id, role, skills, agent_id | explicit handoff with role skills |
| tool.called | tool gateway | turn_id, tool_name, input | audited |
| tool.blocked | tool gateway | turn_id, reason | used for missing docs or policy failures |
| repo.changed | tool gateway | turn_id, tool_name, changed_paths | changed-file audit trail |
| sandbox.executed | sandbox adapter | turn_id, command_ref, status | isolated work |
| validation.completed | reviewer or validator | turn_id, validator, status, findings, artifacts | deterministic check point, including Playwright MCP browser review |
| reviewer.questions_ready | reviewer | turn_id, questions | post-run reminder hook |
| quality.review_completed | quality reviewer | turn_id, status, findings, reminders, fallback_action | post-run diagnostic and fallback routing |
| turn.needs_attention | runtime | turn_id, fallback_action, findings | emitted when immediate fix or specialist review is recommended |
| turn.completed | runtime | turn_id, summary | successful close |
| turn.failed | runtime | turn_id, reason | resumable failure |

## Cursor and Replay

- Session identifier: `session_id`
- Cursor model: monotonically increasing event offset
- Replay path: rebuild turn state from ordered events
- Resume path: restart runtime from `session_id` and last durable offset

## Retention and Compaction

- Retention rule: keep raw events and compact views separately
- Compaction rule: summaries are derived, not authoritative
- Prompt shaping rule: build prompts from session state and selected docs

## Failure Cases

- Harness crash: recover from event log
- Sandbox crash: replace sandbox and replay pending turn state
- Tool timeout: emit timeout event and retry by policy
- Partial completion: require reviewer or operator decision before close
