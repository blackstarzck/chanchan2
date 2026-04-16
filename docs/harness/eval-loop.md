# chanchan2-harness Eval Loop

## Minimal Eval Plan

1. deterministic success path
2. resume or replay path
3. boundary-mismatch check
4. baseline comparison
5. post-run reminder checklist check
6. quality fallback routing check
7. requirement-analysis hard-gate check
8. role-skill assignment check
9. repeated-workflow skill suggestion check
10. reviewer browser verification check

## Deterministic Success Path

- task: modify a known file set with one required document
- expected: turn.started -> requirements.analyzed -> docs.required -> acknowledgement template generated -> docs.acknowledged -> tool call -> repo.changed -> reviewer.questions_ready -> quality.review_completed -> turn.completed

## Resume Check

- crash after docs.required
- resume by session_id
- verify tool execution stays blocked until docs.acknowledged exists
- verify the acknowledgement template can still be reused after resume

## Boundary-Mismatch Check

- compare document registry output against tool gateway expectations
- verify mutating and unknown tools block when `requirements.analyzed` is missing
- compare validation event schema against reviewer consumer
- compare four-condition matcher output against real target files

## Baseline Comparison

Run the same task twice:

- with required-doc gating
- without required-doc gating

Compare:

- correctness
- completeness
- repeatability
- operator effort

## Reminder Checklist Check

- run a turn that touches a backend or frontend file
- confirm reviewer outputs reminder questions about risk, error handling, security, and missing scope

## Quality Fallback Routing Check

- no findings: `fallback_action=complete`
- reminder-only findings: `fallback_action=complete_with_reminders`
- one failed validator: `fallback_action=recommend_immediate_fix`
- many failed validators or findings: `fallback_action=recommend_specialist_fixer`

The reminder path should not hard-block by default. It should behave like a senior teammate asking, "Did you also check this?" before the final report.

## Requirement-Analysis Hard-Gate Check

- create a manual turn event without `requirements.analyzed`
- call a mutating tool through the gateway
- expected: `RequirementAnalysisError` and `tool.blocked`
- then start a normal turn and verify `requirements.analyzed` appears before `docs.required`

## Role-Skill Assignment Check

- start a normal turn
- verify `planner`, `implementer`, `reviewer`, and `fixer` packets include `assigned_skills`
- verify `agent.assigned` events record the role skills

## Repeated-Workflow Skill Suggestion Check

- run the same intent and target path group twice
- verify requirement memory records a `skill_suggestions` item
- export the suggestion and verify `.codex/skills/<skill-id>/SKILL.md` exists

## Reviewer Browser Verification Check

- backend-only task: reviewer records Playwright MCP validation as `skipped` with `applicability=not_applicable`
- UI task without browser handler: reviewer records `unavailable` with `applicability=required`
- UI task with browser handler: reviewer records the handler's `passed` or `failed` result as `validation.completed`
- quality review aggregates those events but does not run Playwright MCP directly
