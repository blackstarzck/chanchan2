# Figma Component Extraction Guide

## Purpose

This guide defines the extraction workflow for rebuilding `apps/docs` component detail pages from Figma without guessing layout, hierarchy, or styling.

The goal is:

- keep the Figma `Main component` hierarchy intact
- treat Figma `instance` samples as overrides of the main component
- separate frame-based showcase exceptions from true component instances
- avoid checking temporary Figma asset URLs into source

Use both extraction layers:

- Figma API for file-wide page inventory and page-to-node mapping
- Figma MCP for exact node hierarchy, Dev Mode styles, screenshots, and implementation details

## When To Use This Guide

Use this workflow when all of the following are true:

- a docs page or sample gallery must match a Figma component page
- the page mixes `Main component`, `instance`, and plain `frame` examples
- visual fidelity matters more than fast approximation

Do not use a page-level “one shot” extraction when the target page contains multiple examples with different overrides.

## Core Rules

1. Figma is the source of truth for structure and style.
2. Use Figma API first when page ids or frame ids are unknown.
3. Extract the `Main component` and every sample `instance` separately.
4. Keep `instance` samples and frame exceptions in different buckets.
5. Download image assets locally before merge. Figma MCP asset URLs expire.
6. Re-validate the rendered result against a screenshot after implementation.

## Workflow

### 1. Build page inventory first

If page ids or top-level frame ids are not already known, start with Figma API inventory.

Preferred token scope:

- `file_content:read`

Useful extras:

- `file_metadata:read`
- `file_dev_resources:read`

Preferred environment variables:

- `FIGMA_TOKEN`
- `FIGMA_PAT`

Preferred helper:

```bash
node ~/.codex/skills/figma-component-extraction/scripts/build-figma-inventory.mjs --file-key <fileKey> --mode pages
node ~/.codex/skills/figma-component-extraction/scripts/build-figma-inventory.mjs --file-key <fileKey> --mode page-detail --page-id <pageId>
```

### 2. Find the page and classify nodes

Start with page metadata, not implementation.

- read the page/canvas metadata first
- map page names to page ids and top-level frames with API inventory
- identify the `Main component`
- identify every `instance` that inherits from that main component
- identify frame-based examples that only resemble the component visually

For the Preline Card page, this classification mattered because:

- `_card` main component existed as a true component
- most samples were true `_card` instances
- `Overlay` and `Horizontal` were plain frames, not instances

### 3. Extract the main component first

Read the main component with `get_design_context`.

Capture:

- slot hierarchy
- layout direction
- spacing
- border radius
- border and shadow values
- image slot dimensions
- button group structure
- footer strip structure

This becomes the baseline component anatomy.

Do not assume that every extracted slot `border` should become a full CSS `border` on all four sides.

If a bordered slot sits flush against a bordered root, compare the rendered seams against the Figma screenshot and translate the visible result. In practice, this often means:

- keep the root outer border
- render only the shared separator on the slot, such as `border-b` for a header or `border-t` for a footer
- avoid doubled left, right, top, or bottom edges unless the screenshot proves they are visible

### 4. Extract each instance individually

Do not infer overrides from the screenshot alone.

For each sample instance:

- read that exact node with `get_design_context`
- note which slots are visible or hidden
- capture text overrides
- capture style overrides
- capture CTA composition changes
- capture image placement differences

Examples from the Card page:

- `Heading` enabled the header slot and hid footer/image
- `Button and link` kept both CTA types in the body
- `Image inside body content` moved media into the body slot instead of the root image slot
- `Centered body content` changed body alignment and text alignment

### 5. Extract frame exceptions separately

Some examples on a component page are showcase layouts, not component instances.

Treat them as standalone compositions.

Examples from the Card page:

- `Overlay`
- `Horizontal`

These should not be modeled as “instance overrides” in documentation or code review notes.

### 6. Resolve assets locally

`get_design_context` returns temporary remote asset URLs. Those URLs expire.

Before implementation:

- download the required images and logos into the app
- store them in a stable local path such as `apps/docs/public/...`
- replace temporary URLs with local paths in the docs implementation

This rule applies to:

- card hero images
- brand logos
- illustration assets
- screenshot-derived image slots

### 7. Filter noise before coding

Do not blindly copy every child node from Figma.

Ignore:

- cursor or hand-pointer artifacts
- measurement annotations
- off-bounds overlays that are not part of the component
- unrelated helper layers on the page

On the Card page, the Shopify sample included an off-position hand cursor artifact in the extracted node. That should not be implemented.

### 8. Implement with the extracted structure

For docs-only previews:

- use plain HTML wrappers if package primitives are not ready
- keep the extracted slot structure
- keep exact spacing and typography values
- keep grouped rows contiguous when the Figma samples share borders

For the Card page, grouped rows mattered in two places:

- the `Agency demo` row
- the `Group` row

### 9. Validate after implementation

Validation is required.

- run `typecheck`
- run `build`
- open the rendered docs page
- compare the resulting card surfaces to the Figma screenshot

Check for:

- missing media
- wrong slot order
- incorrect radii or border sharing
- incorrect padding
- missing footer strips
- wrong alignment in centered examples
- wrong background treatment in frame exceptions

## Recommended Extraction Order

For a mixed component page, use this sequence:

1. page metadata
2. page ids and top-level frames from API inventory
3. main component node
4. every instance node
5. every frame exception
6. asset download
7. implementation
8. screenshot comparison

## Common Failure Modes

### Failure: Page-level approximation

Symptom:

- the page “looks similar” but individual samples do not match

Cause:

- only the canvas was inspected
- instance overrides were inferred instead of extracted

### Failure: Missing page inventory

Symptom:

- page names are known but the correct page ids or frame ids are not

Cause:

- the workflow skipped the API inventory step and jumped straight into MCP

### Failure: Treating frame showcases as component instances

Symptom:

- docs page invents impossible overrides for the component

Cause:

- frame-based examples were mistaken for true instances

### Failure: Checking temporary asset URLs into source

Symptom:

- docs page works briefly, then images disappear later

Cause:

- remote Figma MCP asset URLs were committed directly

### Failure: Over-implementing noisy layers

Symptom:

- cursor glyphs, hints, or helper overlays appear in the UI

Cause:

- extracted children were copied without filtering

### Failure: Literal border translation

Symptom:

- the component has the right border values on paper but still looks wrong next to Figma

Cause:

- nested Figma strokes were copied as full CSS borders instead of being translated into the visible shared edges

## Card Page Reference

These nodes were useful anchors while rebuilding the Card docs page:

- canvas: `5701:201271`
- main component: `297597:6595`
- heading instance: `297611:22451`
- scrollable body instance: `297611:23118`
- navigation instance: `297611:22580`
- footer strip instance: `297611:22487`
- image instance: `297611:22205`
- image-inside-body instance: `297611:22300`
- button-and-link instance: `297611:22317`
- centered body instance: `297611:21557`
- empty state instance: `297611:21701`
- overlay frame: `5701:201480`
- horizontal frame: `5701:201490`

## Merge Checklist

- main component hierarchy preserved
- every docs sample tied to a specific Figma node
- frame exceptions explicitly called out
- assets downloaded locally
- screenshots compared after implementation
