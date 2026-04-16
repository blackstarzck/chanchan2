# Backend Rules

## Purpose

Use these rules for API, service, and database work.

## Error Handling

- Return explicit error types and messages.
- Handle expected failures close to the boundary.
- Do not swallow exceptions.

## Validation

- Validate all external input before business logic.
- Prefer schema-based validation where possible.
- Reject malformed input early.

## Security

- Check authentication and authorization for every sensitive action.
- Avoid logging secrets, tokens, or raw credentials.
- Review query construction for injection risks.

## Database Changes

- Treat migrations as separate review points.
- Record rollback notes for destructive changes.
- Keep schema updates and app logic in sync.
