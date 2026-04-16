# Frontend Rules

## Purpose

Use these rules for UI, components, and client-side behavior.

## Accessibility

- Use semantic elements first.
- Add accessible names to interactive controls.
- Preserve keyboard navigation and focus order.

## Loading And Error States

- Every async screen should define loading, empty, and error states.
- Do not leave the user without feedback during long operations.

## Forms

- Validate before submit and after server response.
- Surface useful error messages near the failing field.

## Interaction Safety

- Avoid duplicate submission paths.
- Keep destructive actions confirmable and reversible where practical.
