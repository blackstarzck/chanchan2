# @blackstarzck/ui

React UI primitives and compiled CSS for the Chanchan2 design system.

This package keeps the npm page intentionally short. For the full workspace context and source code, use the repository links below:

- Workspace README: [github.com/blackstarzck/chanchan2](https://github.com/blackstarzck/chanchan2#readme)
- Package source: [github.com/blackstarzck/chanchan2/tree/main/packages/ui](https://github.com/blackstarzck/chanchan2/tree/main/packages/ui)

## Install

```bash
npm install @blackstarzck/ui @blackstarzck/tokens react react-dom
```

## Usage

```tsx
import "@blackstarzck/ui/styles.css";
import { Button, ThemeRoot } from "@blackstarzck/ui";

export function Example() {
  return (
    <ThemeRoot theme="light">
      <Button>Ship it</Button>
    </ThemeRoot>
  );
}
```

## Notes

- Depends on `@blackstarzck/tokens`
- Ships compiled CSS at `@blackstarzck/ui/styles.css`
- Detailed workspace docs live in the main repository README
