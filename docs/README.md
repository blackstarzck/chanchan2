# Docs Index

This directory contains the process and maintenance documents for the `chanchan2` workspace.

## Collaboration

- [Design-Dev Cooperation Guide](./DESIGN-DEV-COOPERATION-GUIDE.md)
  - Shared rules for designers, frontend, QA, and PM using Figma Release Pages.
- [Frontend Design Sync Guide](./FRONTEND-DESIGN-SYNC-GUIDE.md)
  - Frontend-only implementation rules for syncing Release Pages into the npm packages and docs preview.
- [Figma Release Handoff Spec](./FIGMA-RELEASE-HANDOFF-SPEC.md)
  - Export contract for the Figma plugin and the repository-side handoff JSON files.
- [Docs Version Selector Spec](./DOCS-VERSION-SELECTOR-SPEC.md)
  - Behavior spec for switching docs previews and code examples between frozen release snapshots.

## Product And Package References

- [Figma To Code Roadmap](./FIGMA-TO-CODE-ROADMAP.md)
  - Maps Figma pages to the current `@blackstarzck/ui` package scope.
- [UI/UX Theme System Spec (Korean)](./UI-UX-THEME-SYSTEM-SPEC.ko.md)
  - Detailed theme and token specification.

## Release And Operations

- [Deployment And Operations](./DEPLOYMENT-AND-OPERATIONS.md)
  - Versioning, changesets, and npm release operations.
- [Publishing And Operations (Korean)](./PUBLISHING-AND-OPERATIONS.ko.md)
  - Korean guide for the release workflow.
- [Publish Blocker Handoff (Korean)](./PUBLISH-BLOCKER-HANDOFF.ko.md)
  - Historical handoff for npm publish issues and recovery context.

- [`../design/README.md`](../design/README.md)
  - Repository-side handoff and design release snapshot directory structure.

## Workspace Roles

- `packages/tokens`
  - semantic tokens, generated token outputs, and theme contract
- `packages/ui`
  - publishable React component package
- `apps/docs`
  - review and preview site used to verify components and themes

## Common Commands

```bash
npm install
npm run dev
npm run tokens:sync
npm run design:release -- 0.2.1
npm run typecheck
npm run build
npm run changeset
```

## Current Design Sync Input

The current repository-side editable design handoff source is:

- [`../design/handoff/current/tokens.json`](../design/handoff/current/tokens.json)
- [`../design/handoff/current/themes.json`](../design/handoff/current/themes.json)
- [`../design/handoff/current/components.json`](../design/handoff/current/components.json)
- [`../design/handoff/current/samples.json`](../design/handoff/current/samples.json)

Frozen version snapshots live under:

- [`../design/releases`](../design/releases)

Generated outputs:

- [`../packages/tokens/src/token-source.json`](../packages/tokens/src/token-source.json)
- [`../packages/tokens/src/tokens.ts`](../packages/tokens/src/tokens.ts)
- [`../packages/tokens/theme.css`](../packages/tokens/theme.css)

## Notes

- Figma Release Pages drive implementation decisions.
- Figma Release version, repository snapshot version, and npm publish version should match.
- npm packages are the publishable outputs.
- `apps/docs` is the shared preview surface for review, not the source of truth.
