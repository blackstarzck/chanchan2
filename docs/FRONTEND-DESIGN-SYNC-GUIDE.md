# Frontend Design Sync Guide

This guide is for frontend maintainers working inside this repository after a Figma Release Page has been approved for implementation.

For the shared design-dev collaboration rules, see [Design-Dev Cooperation Guide](./DESIGN-DEV-COOPERATION-GUIDE.md).

## Purpose

This document explains how frontend should translate a Figma Release Page into the repository, how each package should be used, and what must be verified before npm publishing.

This repository uses a single release version policy:

- Figma `Release vX.Y.Z`
- `design/releases/X.Y.Z`
- npm package publish version

should all point to the same release.

## Repository Roles

### Design Source

- Figma `Release vX.Y.Z` page is the handoff baseline.

### Package Outputs

- `packages/tokens`
  - publishable token package
  - generated mirror for the repository-side design token input
- `packages/ui`
  - publishable React component package
- `apps/docs`
  - review and preview site used to validate the packages
  - not the source of truth

### Design Version Data

- `design/handoff/current`
  - editable repository-side handoff data for the latest approved Release Page
- `design/releases/<version>`
  - frozen snapshots for each approved release version

The directory layout is documented in [`../design/README.md`](../design/README.md).

## Source Of Truth By Layer

| Layer | Source of truth |
| --- | --- |
| design handoff | Figma Release Page |
| token package output | `packages/tokens` |
| component package output | `packages/ui` |
| review surface | `apps/docs` |

This means frontend does not implement directly into docs. Frontend syncs into the packages first and uses docs to review the results.

## Standard Frontend Flow

1. Identify the target Release Page version and ticket.
2. Treat that Release Page version as the release version for the repository snapshot and npm publish.
3. Compare the Release Page against the current package behavior.
4. Sync token and theme changes into `design/handoff/current/tokens.json` and `design/handoff/current/themes.json`.
5. Sync component and sample metadata into `design/handoff/current/components.json` and `design/handoff/current/samples.json` when they are part of the release handoff.
6. Create or update the frozen design snapshot with `npm run design:release -- <version>` when the handoff version is finalized.
7. Run `npm run tokens:sync`.
8. Implement or adjust components in `packages/ui`.
9. Update representative previews or examples in `apps/docs`.
10. Run validation:
   - `npm run typecheck`
   - `npm run build`
   - relevant e2e or visual checks
11. Share the docs preview for review with design.
12. After approval, add a changeset and publish the npm packages with the same release version.

Related references:

- [Figma To Code Roadmap](./FIGMA-TO-CODE-ROADMAP.md)
- [Figma Release Handoff Spec](./FIGMA-RELEASE-HANDOFF-SPEC.md)
- [Docs Version Selector Spec](./DOCS-VERSION-SELECTOR-SPEC.md)
- [Deployment And Operations](./DEPLOYMENT-AND-OPERATIONS.md)

## Single Version Policy

Use one semantic version for the entire release train:

- Figma page name: `Release v1.2.0`
- repository snapshot: `design/releases/1.2.0`
- npm publish target: `@blackstarzck/tokens@1.2.0` and `@blackstarzck/ui@1.2.0`

If the Release Page changes after freeze, do not overwrite the same version.

- use a patch release such as `1.2.1`, or
- move the change to the next planned release

## Change Handling Rules

### Token Changes

- Change token values in `design/handoff/current/tokens.json`.
- Change theme metadata in `design/handoff/current/themes.json`.
- Do not hand-edit generated outputs such as `packages/tokens/src/token-source.json`, `packages/tokens/src/tokens.ts`, or `packages/tokens/theme.css`.
- If token names must change, treat that as a breaking contract unless a deprecation path exists.

### Theme Changes

- Keep theme family and light/dark mode aligned with the current token model.
- A new theme should include a complete semantic token set for the supported modes.
- Theme previews must be verified in `apps/docs`.

### Component Changes

- Implement reusable primitives in `packages/ui`.
- Prefer semantic token usage over raw values.
- If the change is a composition example rather than a reusable primitive, keep the implementation in `apps/docs` unless the public API is intentionally expanding.

### Sample Changes

- Design samples and executable code samples are not the same thing.
- Design samples can trigger docs updates without necessarily changing the package API.
- If a sample reveals missing package capability, update `packages/ui` first, then reflect the result in `apps/docs`.

## Version Mapping

The repository uses one release version for the frozen handoff and the npm publish:

- Figma Release version
  - frozen design handoff reference
- design snapshot version
  - frozen repository snapshot stored under `design/releases/<version>`
- npm package version
  - published package contract for the same release
- docs preview state
  - temporary review artifact for reviewing that release before publish

Snapshot command:

```bash
npm run design:release -- 0.2.1
```

A PR should reference all of the following:

- which Figma Release Page it implements
- which packages are expected to change
- which release version will be published

## Docs Version Selector

The docs app should expose a release selector at the top of the component page.

Recommended behavior:

- label: `Version`
- default value: latest available release
- source: `design/releases/*/manifest.json`
- selection changes:
  - component preview
  - code editor content
  - sample descriptions when they are versioned

The selector should represent release versions, not ad hoc preview states. The detailed UI behavior is specified in [Docs Version Selector Spec](./DOCS-VERSION-SELECTOR-SPEC.md).

## Definition Of Done

A design handoff is implementation-ready only when all of the following are true:

- frontend implemented the approved Release Page against `packages/tokens` and `packages/ui`
- generated token outputs were synced from the editable source
- representative docs previews were updated in `apps/docs`
- `npm run typecheck` passes
- `npm run build` passes
- required e2e or visual checks pass
- design and frontend both approve the preview result

## Non-Negotiable Rules

1. Never implement from `Working` or `Dev Ready`.
2. Never hand-edit generated token outputs.
3. Never treat `apps/docs` as the source of truth.
4. Never publish before shared preview review is complete.
5. Always record package changes with changesets when the npm output changes.
6. Keep the Figma Release version, snapshot version, and npm publish version aligned.
