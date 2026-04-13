# Design-Dev Cooperation Guide

This document defines the shared collaboration rules between design and frontend based on Figma Release Pages.

## Purpose

The goal of this guide is to make design handoff, implementation, QA, and release decisions consistent.

## Related Documents

- [Frontend Design Sync Guide](./FRONTEND-DESIGN-SYNC-GUIDE.md)
  - Frontend-only implementation rules for syncing Figma changes into `packages/tokens`, `packages/ui`, and `apps/docs`.
- [Figma To Code Roadmap](./FIGMA-TO-CODE-ROADMAP.md)
  - Mapping between Figma pages and the current `@blackstarzck/ui` implementation scope.
- [Deployment And Operations](./DEPLOYMENT-AND-OPERATIONS.md)
  - Release, changeset, and npm publishing operations.

## Core Principles

1. Develop from Release Pages only.
2. Treat the Release Page as the single source of truth for a release handoff.
3. Use one semantic release version across Figma, repository snapshots, and npm publishing.
4. Manage changes through tickets, not verbal requests.

## Figma Page Structure

Use the following page structure inside the Figma file:

```text
[Working]
[Dev Ready]
[Release v1.0.0]
[Release v1.1.0]
[Archive]
```

### Page Roles

| Page | Purpose |
| --- | --- |
| Working | Exploration and active design work |
| Dev Ready | Design is internally reviewed and ready to be frozen |
| Release vX.Y.Z | Frozen handoff page used for implementation and QA |
| Archive | Previous release pages kept for history |

## End-To-End Flow

```text
Working -> Dev Ready -> Release Page creation -> frontend implementation -> docs preview review -> QA -> npm package release
```

Implementation details for the frontend step live in [Frontend Design Sync Guide](./FRONTEND-DESIGN-SYNC-GUIDE.md).

The same version number should be used for:

- the Figma `Release vX.Y.Z` page
- the frozen repository snapshot under `design/releases/X.Y.Z`
- the npm package publish for that release

## Dev Ready Rules

Move a design into `Dev Ready` only when all of the following are true:

- component structure is defined
- states such as default, hover, disabled, and focus are defined when needed
- spacing and typography are specified
- key interaction behavior is specified
- internal design review is complete

`Dev Ready` means the design is prepared. It is not the implementation source.

## Release Page Rules

### When To Create A Release Page

- right before frontend implementation starts
- when a feature-level UI is finalized
- right before a release handoff

### How To Create A Release Page

Duplicate the `Dev Ready` page and freeze it:

```text
Dev Ready -> Duplicate -> Release v1.2.0
```

### Naming Rule

```text
Release v1.0.0
Release v1.1.0
Release v2.0.0
```

The version must match the version used for the repository release snapshot and the npm package release.

### Freeze Rule

- A Release Page must not be edited after handoff.
- If a change is needed after freeze:
  - create a patch release page such as `Release v1.0.1`, or
  - move the change into the next release page

## Change Management

### Request Rule

- Every change must be tracked through a ticket.

### Change Types

| Type | Description |
| --- | --- |
| Minor | color, spacing, or other non-structural adjustments |
| Major | layout-level changes |
| System | component-level or design-system changes |

### Post-Release Changes

| Situation | Handling |
| --- | --- |
| urgent fix | create a patch Release Page |
| normal improvement | include it in the next release |

## Frontend Implementation Rules

### Implementation Source

- Frontend must implement against a specific Release Page.
- Frontend reflects approved design changes into `packages/tokens` and `packages/ui`.
- `apps/docs` is used as the shared preview and review surface, not as the source of truth.

See [Frontend Design Sync Guide](./FRONTEND-DESIGN-SYNC-GUIDE.md) for the repository-side implementation details.

### Pull Request Requirements

Every PR should include:

- the Release version
- the Release Page link
- UI screenshots or preview evidence

### Do Not

- implement from `Working` or `Dev Ready`
- apply Slack or verbal requests directly
- make arbitrary UI adjustments outside the Release Page

## QA Rules

### QA Source

- QA must validate against the Release Page and the docs preview generated from it.

### QA Checklist

- spacing
- typography
- color
- interaction
- responsive behavior

### Allowed Tolerance

| Item | Tolerance |
| --- | --- |
| spacing | +/- 2px |
| font size | +/- 1px |
| color | exact match |

## Approval And Release

- Release approval requires QA completion and agreement between design and frontend.
- The final preview shared for approval should match the Release Page.
- npm package publishing happens only after this review is complete.
- The publish version should match the Release Page version that was approved.

Operational release steps are documented in [Deployment And Operations](./DEPLOYMENT-AND-OPERATIONS.md).

## Roles

| Role | Responsibility |
| --- | --- |
| Designer | create and manage Release Pages |
| Frontend | implement the approved Release Page into the packages and freeze the matching repository snapshot |
| QA | verify against the Release Page and preview |
| PM | manage schedule and priority |

## Summary Rules

1. Frontend works from Release Pages only.
2. `Dev Ready` is a preparation state, not the implementation source.
3. Release Pages are frozen after handoff.
4. Post-freeze changes go into a patch release or the next release.
5. QA and final approval both use the Release Page as the baseline.
6. Release Page version, snapshot version, and npm publish version should match.

## Prohibited

- development without a Release Page
- implementation from `Dev Ready`
- accepting informal requests without ticketing and Release update
- publishing without QA and shared review

## Final Point

The collaboration baseline is not `Dev Ready`.  
The collaboration baseline is the frozen `Release Page`.
