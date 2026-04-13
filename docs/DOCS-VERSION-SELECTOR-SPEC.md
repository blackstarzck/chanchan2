# Docs Version Selector Spec

This document defines the docs UI behavior for switching between released component versions.

## Goal

The selector should allow design and frontend to review past and current releases from one component page without introducing a separate docs-only version model.

The selector works on the same version number used by:

- Figma `Release vX.Y.Z`
- `design/releases/X.Y.Z`
- npm package publish version

## Placement

- page: component detail page
- position: top toolbar area near theme controls and action buttons
- label: `Version`

## Default Behavior

- default selection: latest available release
- available options: all versions that exist under `design/releases`
- order: newest first

## Data Source

The selector should be driven by release snapshot data, not by temporary branch state.

Minimum data sources:

- `design/releases/*/manifest.json`
- version-specific component data
- version-specific sample data

Recommended resolution order:

1. list available releases from `design/releases`
2. read each `manifest.json`
3. load the selected release snapshot for the current component slug

## Behavior On Change

When the selected version changes, the page should update:

- component preview
- code editor content
- sample descriptions
- sample availability

The selected version should not only change a badge. It should switch the content source for the page.

## Empty And Missing States

If the selected release does not include the current component:

- show a clear empty state such as `This component was not part of version 0.4.0.`
- keep the selector visible
- do not silently fall back to the latest release

If the selected release includes the component but not a specific sample:

- hide that sample section, or
- show a small note that the sample was introduced later

## URL And Navigation

Recommended URL behavior:

- use a query string such as `?version=1.2.0`
- preserve the selected version while navigating inside the same component page
- allow direct linking to a specific release view

## Copy And Labels

Use the release version as the primary label:

- selector option: `1.2.0`
- optional helper text: `Latest`

Avoid:

- a separate docs-only version id
- a separate preview-state id
- ambiguous labels like `Current`, `Old`, or `Stable` without version numbers

## Scope

This selector is a release viewer, not a runtime package loader.

That means:

- the docs app should read frozen snapshot data from `design/releases`
- the selector should present versioned preview and code content based on those snapshots
- it should not pretend to execute historical package bundles unless that capability is intentionally added later

## Future Extension

If historical runtime rendering is needed later, add it as a separate capability. The first implementation should stay simple and snapshot-driven.
