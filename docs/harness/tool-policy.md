# chanchan2-harness Tool Policy

## Defaults

- default mode: deny
- all tool calls must be audited
- mutating and unknown tool calls require `requirements.analyzed` for the current turn
- required-doc acknowledgement is checked before write, shell, sandbox, and unknown tools
- read-only tools must be explicitly listed; unknown tools are treated as risky until classified
- acknowledgement must include extracted constraints for every required document
- acknowledgement is tied to document digests, so changed documents require a new acknowledgement
- changed files are recorded as `repo.changed`
- post-run reviewer reminders are emitted after implementation even when validation passes
- post-run quality review routes work to fallback actions instead of hard-blocking reminder-only issues

## Read-Only Without Acknowledgement

- `repo.read`: read repository state
- `repo.search`: search repository state
- `filesystem.read`: read a file
- `git.diff`: inspect local changes

## Requires Requirement Analysis And Required-Doc Acknowledgement

- `shell.run`: runs commands and can mutate files or external systems
- `sandbox.execute`: runs isolated commands
- `repo.write`: mutates repository state
- `filesystem.write`: mutates repository state
- unknown tool names: blocked until they are classified as read-only or acknowledged as risky

## Require Extra Approval

- `external.publish`: affects remote systems
- `git.commit`: records repository history
- `git.apply_patch`: mutates repository state

## Deny

- `credential.dump`: secrets must stay outside the sandbox

## Audit Fields

Capture at least:

- session_id
- turn_id
- tool name
- normalized input
- result or error
- policy decision
- requirement analysis status
- changed paths for mutating tools
- quality fallback action after review
