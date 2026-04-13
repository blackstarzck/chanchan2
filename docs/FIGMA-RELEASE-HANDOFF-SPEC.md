# Figma Release Handoff Spec

This document defines the release handoff contract between the Figma plugin export and the repository-side design sync flow.

## Goal

The plugin should not export a generic scan dump.  
It should export a release handoff bundle that frontend can place into `design/handoff/current` with minimal manual cleanup.

The release version exported from Figma should be the same version later used for:

- the frozen repository snapshot under `design/releases/<version>`
- the npm package publish for that release

## Why This Exists

The current probe plugin already proves that plugin-side export works:

- local variables are available
- page inventory is available
- component and component set inventory is available

However, a raw scan is not enough for implementation.

Frontend needs a release-focused export that answers:

- which Release Page this handoff belongs to
- which tokens and themes belong to the release
- which reusable components map to package exports
- which sample frames map to docs variations or patterns

## Export Contract

The plugin should export these five files:

```text
manifest.json
tokens.json
themes.json
components.json
samples.json
```

They map directly to:

```text
design/handoff/current/manifest.json   (optional future addition)
design/handoff/current/tokens.json
design/handoff/current/themes.json
design/handoff/current/components.json
design/handoff/current/samples.json
```

Current repository schemas live in:

- [`../design/schemas/manifest.schema.json`](../design/schemas/manifest.schema.json)
- [`../design/schemas/tokens.schema.json`](../design/schemas/tokens.schema.json)
- [`../design/schemas/themes.schema.json`](../design/schemas/themes.schema.json)
- [`../design/schemas/components.schema.json`](../design/schemas/components.schema.json)
- [`../design/schemas/samples.schema.json`](../design/schemas/samples.schema.json)

## What The Plugin Must Export

### 1. `manifest.json`

Purpose:

- identify the release handoff version
- identify which Release Page was exported
- record which plugin produced the handoff

Minimum fields:

- `designVersion`
- `figmaFileKey`
- `releasePageId`
- `releasePageName`
- `exportedAt`
- `sourcePlugin`
- `changedTokens`
- `changedThemes`
- `changedComponents`
- `changedSamples`

`designVersion` should match the semantic version used in the Figma page name. Example:

- page name: `Release v1.2.0`
- manifest field: `"designVersion": "1.2.0"`

### 2. `tokens.json`

Purpose:

- provide editable token values that frontend can sync into `packages/tokens`
- preserve variable metadata from Figma

Important shape:

- `fontSans`
- `collections`
- `colorMeta`
- `radiusMeta`
- `colors`
- `radius`

The key point is:

- `colors` and `radius` contain the values frontend consumes
- `colorMeta` and `radiusMeta` preserve Figma mapping data such as `figmaVariableId`, `figmaVariableKey`, and `figmaVariableName`

### 3. `themes.json`

Purpose:

- define theme family and mode structure
- preserve collection and mode mapping from Figma

Important shape:

- each theme entry should include:
  - `label`
  - `family`
  - `familyKey`
  - `mode`
  - `figmaCollectionId`
  - `figmaModeId`

### 4. `components.json`

Purpose:

- map Figma release components to package exports

Important shape:

- `componentSlug`
- `exportName`
- `displayName`
- `package`
- `sourceType`
- `figmaPageId`
- `figmaPageName`
- `figmaNodeId`
- `figmaNodeKey`
- `docsRoute`

### 5. `samples.json`

Purpose:

- map release-page example frames to docs variations or patterns

Important shape:

- `sampleId`
- `componentSlug`
- `title`
- `kind`
- `sourceType`
- `figmaPageId`
- `figmaPageName`
- `figmaNodeId`
- `docsVariationId`

## Naming And Mapping Rules

### Designer Side

Designers should manage:

- Figma page names
- visible component names
- release page versions
- design content

Designers should not manage:

- code slugs
- package export names
- generated mapping ids

### Plugin Side

The plugin should extract:

- Figma ids
- Figma keys when available
- visible names
- release page metadata

The plugin should not invent package export names.

### Frontend Side

Frontend owns the stable code mapping:

- `tokenKey`
- `componentSlug`
- `sampleId`
- `exportName`
- `docsVariationId`

Rule:

- Figma names may change
- stable code keys should remain fixed unless the contract is intentionally broken

## Stable Mapping Principle

Use this mental model:

- Figma id = reference from the design tool
- visible name = human-readable label
- stable code key = frontend contract

This avoids a common failure mode:

- if design renames `Button / Primary` to `Button / Brand`
- the Figma name changes
- but the code mapping can still remain `button` and `button-primary`

## Recommended Plugin Workflow

1. Designer finalizes a `Release vX.Y.Z` page.
2. Designer runs `Export Release` in the plugin.
3. Plugin exports the five JSON files.
4. Frontend replaces the files in `design/handoff/current`.
5. Frontend runs:
   - `npm run tokens:sync`
   - package implementation updates
   - docs preview updates
6. Frontend creates a frozen snapshot with:
   - `npm run design:release -- <version>`
7. Design and frontend review the preview.
8. npm packages are published after approval with the same version number.

## Recommendation For The Existing Probe Plugin

The current `Design System Probe` should evolve from:

- a generic scanner

to:

- a release handoff exporter

That means adding:

1. Release Page picker or current-page export mode
2. release-aware `manifest.json`
3. component export mapping data
4. sample frame export data
5. output grouped by the five repository handoff files

## Frontend Rule

Frontend should treat:

- Figma Release Page as the design source
- `design/handoff/current` as the repository handoff source
- `packages/tokens` and `packages/ui` as the publishable outputs
- `apps/docs` as the review surface

When the docs app exposes a version selector, it should use these release versions rather than a separate docs-only versioning scheme. See [Docs Version Selector Spec](./DOCS-VERSION-SELECTOR-SPEC.md).
