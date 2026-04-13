# Design Data Layout

This directory stores the repository-side design handoff data that frontend uses to sync Figma Release Pages into the packages.

## Structure

```text
design/
  handoff/
    current/
      tokens.json
      themes.json
      components.json
      samples.json
  releases/
    <version>/
      manifest.json
      tokens.json
      themes.json
      components.json
      samples.json
  schemas/
    manifest.schema.json
    tokens.schema.json
    themes.schema.json
    components.schema.json
    samples.schema.json
  scripts/
    create-release.mjs
```

## Meaning

- `handoff/current`
  - the editable repository-side handoff input for the latest approved Release Page
- `releases/<version>`
  - frozen snapshots of the handoff data for each release version
  - the folder name should match the Figma Release Page version and the npm publish version

## Release Snapshot

Create a versioned snapshot from the current handoff data:

```bash
npm run design:release -- 0.2.1
```

For the first baseline snapshot, use:

```bash
npm run design:release -- 0.2.1 --baseline
```

## Important Rules

- Edit `handoff/current` first.
- Do not edit a frozen release snapshot after it is created.
- `packages/tokens/src/token-source.json` is now a generated mirror, not the editable design source.

## Related Documents

- [`../docs/FIGMA-RELEASE-HANDOFF-SPEC.md`](../docs/FIGMA-RELEASE-HANDOFF-SPEC.md)
- [`../docs/FRONTEND-DESIGN-SYNC-GUIDE.md`](../docs/FRONTEND-DESIGN-SYNC-GUIDE.md)
