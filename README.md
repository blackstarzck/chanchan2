# Chanchan2 UI

`chanchan2` is a starter workspace for shipping a Figma-backed UI library with:

- Figma-derived theme tokens
- Radix-based React primitives
- Tailwind-powered component styling
- npm-ready package exports

## Workspace

- `packages/tokens`: semantic tokens, theme metadata, Figma snapshot, Tailwind preset
- `packages/ui`: publishable React component package and compiled CSS
- `apps/docs`: local playground for verifying themes and components

## Getting Started

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Sync Tokens

Update the token source and regenerate the package outputs:

```bash
npm run tokens:sync
```

Source of truth:

- [packages/tokens/src/token-source.json](C:\Users\chanki\workspace\creative-ui\chanchan2\packages\tokens\src\token-source.json)

## Publish

Replace the npm scope if needed, then publish the packages independently:

```bash
npm publish --workspace @blackstarzck/tokens --access public
npm publish --workspace @blackstarzck/ui --access public
```

Guides:

- roadmap: [FIGMA-TO-CODE-ROADMAP.md](C:\Users\chanki\workspace\creative-ui\chanchan2\FIGMA-TO-CODE-ROADMAP.md)
- operations: [DEPLOYMENT-AND-OPERATIONS.md](C:\Users\chanki\workspace\creative-ui\chanchan2\DEPLOYMENT-AND-OPERATIONS.md)
- operations (Korean): [PUBLISHING-AND-OPERATIONS.ko.md](C:\Users\chanki\workspace\creative-ui\chanchan2\PUBLISHING-AND-OPERATIONS.ko.md)
- publish blocker handoff (Korean): [PUBLISH-BLOCKER-HANDOFF.ko.md](C:\Users\chanki\workspace\creative-ui\chanchan2\PUBLISH-BLOCKER-HANDOFF.ko.md)

## Token Flow

The current starter tokens were seeded from the Figma file:

- file key: `7Nd8Ml5yOREhJjdCDKggf4`
- source snapshot: [packages/tokens/figma-token-snapshot.json](C:\Users\chanki\workspace\creative-ui\chanchan2\packages\tokens\figma-token-snapshot.json)

Recommended long-term flow:

1. Extract Figma Variables into a structured token source.
2. Update [packages/tokens/src/token-source.json](C:\Users\chanki\workspace\creative-ui\chanchan2\packages\tokens\src\token-source.json).
3. Run `npm run tokens:sync` to regenerate [packages/tokens/src/tokens.ts](C:\Users\chanki\workspace\creative-ui\chanchan2\packages\tokens\src\tokens.ts) and [packages/tokens/theme.css](C:\Users\chanki\workspace\creative-ui\chanchan2\packages\tokens\theme.css).
4. Let components consume semantic tokens only, never raw hex values.
