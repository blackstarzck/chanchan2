# @blackstarzck/tokens

Semantic design tokens and theme helpers extracted for the Chanchan2 UI workspace.

This package keeps the npm page intentionally short. For the full workspace context and source code, use the repository links below:

- Workspace README: [github.com/blackstarzck/chanchan2](https://github.com/blackstarzck/chanchan2#readme)
- Package source: [github.com/blackstarzck/chanchan2/tree/main/packages/tokens](https://github.com/blackstarzck/chanchan2/tree/main/packages/tokens)

## Install

```bash
npm install @blackstarzck/tokens
```

## Usage

```ts
import { designTokens, getThemeTokens, themeNames } from "@blackstarzck/tokens";
import "@blackstarzck/tokens/theme.css";

const darkTheme = getThemeTokens("dark");
console.log(themeNames, darkTheme.color.bg.canvas);
```

## Exports

- `@blackstarzck/tokens`
- `@blackstarzck/tokens/theme.css`
- `@blackstarzck/tokens/tailwind-preset`
- `@blackstarzck/tokens/figma-token-snapshot.json`
