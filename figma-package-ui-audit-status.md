# Figma to packages/ui Audit Status

Updated: 2026-04-14

## Sources

- `figma-component-pages-table.json`
- `figma-package-ui-coverage.md`
- `.tmp-accordion-page.json`
- `.tmp-card-page-detail.json`
- Package source under `packages/ui/src/components`
- Docs source under `apps/docs/src/features/components`

Live Figma re-extraction is now available after adding `FIGMA_TOKEN` and `FIGMA_PAT` to `.env.local`.

## Result

- Accordion was revalidated against exact Figma nodes and patched in package UI and docs examples.
- Accordion page inventory was re-fetched from the Figma API for page `4304:44741`.
- Package source and docs source typecheck passed.
- Package build and docs build passed.
- The docs app aliases `@blackstarzck/ui` to `packages/ui/src/index.ts`, so the docs preview reads package source, not stale `dist`.
- `packages/ui/dist` was rebuilt so package consumers do not keep the previous Accordion content inset.

## What Was Wrong

- `AccordionContent` exposed `inset?: "none" | "start"` and defaulted to `start`, but the source no longer applied the `inset` class. This made the prop dead in runtime.
- `AccordionItem variant="card"` changed the item surface only. It did not make the trigger row use the Figma `Inline` frame padding from nodes `5701:176912`, `5701:176913`, and `5701:176916`, so the plus/minus icons rendered against the left edge instead of at the extracted `20px` inset.
- `packages/ui/dist` still had the old `pl-9` implementation while `packages/ui/src` had no inset implementation, creating source/dist drift.
- The Accordion Bordered docs sample used a generic `max-w-xl rounded-2xl` wrapper and a layout-affecting CSS border instead of the extracted Figma shell dimensions from node `5701:176911` (`475px`, `232px`, radius `12px`).
- The Accordion preview inherited the docs `Geist` font, while the Figma Accordion nodes use `Inter`; this changed the answer text wrapping even after the content width was corrected.
- The Accordion Figma mapping documented bordered item variants but did not explicitly map the expanded Bordered content frame `5701:176914` to `AccordionContent inset`.

## Accordion Patch

Exact nodes used:

- Page: `4304:44741`
- Main component: `4305:44881`
- Bordered shell: `5701:176911`
- Bordered rows: `5701:176912`, `5701:176913`, `5701:176916`
- Bordered expanded content: `5701:176914`
- Active content bordered sample: `5701:176948`

Applied:

- `AccordionContent inset="start"` now applies `pl-14 pr-5`, matching the extracted `56px` left inset and `20px` right inset.
- `AccordionContent` now uses `pb-4` and `font-medium`, matching the extracted `16px` bottom padding and `500` content text weight.
- `AccordionItem variant="card"` now provides item context to `AccordionTrigger`, so card rows apply `px-5` and the open trigger row uses the extracted `54px` height treatment.
- The Bordered docs sample now uses `w-[475px] max-w-full rounded-xl` and an inset ring for the extracted shell width, radius, and non-layout Figma stroke.
- The Bordered docs sample now scopes the shell to `font-[Inter]` to match the extracted Figma text metrics and wrapping.
- The Figma mapping now includes `5701:176914` as the package-backed `AccordionContent inset` behavior.

## Revalidation Matrix

`Inventory` is `main/sample` count from `figma-component-pages-table.json`.

| Page | Inventory | Revalidation status |
| --- | ---: | --- |
| Accordion | 1/23 | Exact node revalidation complete; package UI patched. |
| Alerts | 16/28 | Structural package/docs target present; exact node re-extraction needed before further API changes. |
| Avatar [NEW] | 196/112 | Structural package/docs target present; exact node re-extraction needed before further API changes. |
| Badge/Tags [NEW] | 135/57 | Structural package/docs target present; exact node re-extraction needed before further API changes. |
| Blockquotes | 19/9 | Structural package/docs target present; exact node re-extraction needed before further API changes. |
| Buttons [NEW] | 495/65 | Structural package/docs target present; exact node re-extraction needed before further API changes. |
| Button Group [NEW] | 0/0 | Inventory has no main/sample instances; treat as frame exception until Figma detail proves otherwise. |
| Button Icons | 495/59 | Structural package/docs target present; exact node re-extraction needed before further API changes. |
| Card [NEW] | 1/19 | Local detail JSON exists; no new patch in this pass. |
| Slider/Carousel | 4/31 | Structural package/docs target present; exact node re-extraction needed before further API changes. |
| Datepicker | 10/16 | Structural package/docs target present; exact node re-extraction needed before further API changes. |
| List Group [NEW] | 1/0 | Main component present; sample inventory is empty, so frame exceptions need detail extraction. |
| Legend Indicator [NEW] | 4/24 | Structural package/docs target present; exact node re-extraction needed before further API changes. |
| Progress [NEW] | 66/24 | Structural package/docs target present; exact node re-extraction needed before further API changes. |
| Ratings | 0/0 | Inventory has no main/sample instances; treat as frame exception until Figma detail proves otherwise. |
| Skeleton | 0/0 | Inventory has no main/sample instances; treat as frame exception until Figma detail proves otherwise. |
| Spinners (Loaders) [NEW] | 8/14 | Structural package/docs target present; exact node re-extraction needed before further API changes. |
| Timeline [NEW] | 0/0 | Inventory has no main/sample instances; treat as frame exception until Figma detail proves otherwise. |
| Header/Navbar [NEW] | 1/25 | Structural package/docs target present; exact node re-extraction needed before further API changes. |
| Navs/Tabs | 31/21 | Structural package/docs target present; exact node re-extraction needed before further API changes. |
| Sidebar [NEW] | 3/13 | Structural package/docs target present; exact node re-extraction needed before further API changes. |
| Breadcrumb | 29/28 | Structural package/docs target present; exact node re-extraction needed before further API changes. |
| Pagination | 13/88 | Structural package/docs target present; exact node re-extraction needed before further API changes. |
| Input [NEW] | 123/45 | Structural package/docs target present; exact node re-extraction needed before further API changes. |
| Input Group [NEW] | 0/0 | Inventory has no main/sample instances; treat as frame exception until Figma detail proves otherwise. |
| File Input | 0/0 | Inventory has no main/sample instances; treat as frame exception until Figma detail proves otherwise. |
| Checkbox | 65/39 | Structural package/docs target present; exact node re-extraction needed before further API changes. |
| Radio | 57/38 | Structural package/docs target present; exact node re-extraction needed before further API changes. |
| Switch [NEW] | 45/47 | Structural package/docs target present; exact node re-extraction needed before further API changes. |
| Advanced Select [NEW] | 0/0 | Inventory has no main/sample instances; treat as frame exception until Figma detail proves otherwise. |
| Input Number | 0/0 | Inventory has no main/sample instances; treat as frame exception until Figma detail proves otherwise. |
| Strong Password | 0/0 | Inventory has no main/sample instances; treat as frame exception until Figma detail proves otherwise. |
| PIN Input | 0/0 | Inventory has no main/sample instances; treat as frame exception until Figma detail proves otherwise. |
| Drag n Drop File Uploads | 7/6 | Structural package/docs target present; exact node re-extraction needed before further API changes. |
| File Uploading Progress | 8/7 | Structural package/docs target present; exact node re-extraction needed before further API changes. |
| Range Slider | 1/6 | Structural package/docs target present; exact node re-extraction needed before further API changes. |
| WYSIWYG Editor | 15/7 | Structural package/docs target present; exact node re-extraction needed before further API changes. |
| Dropdowns [NEW] | 1/17 | Structural package/docs target present; exact node re-extraction needed before further API changes. |
| Modal [NEW] | 1/12 | Structural package/docs target present; exact node re-extraction needed before further API changes. |
| Offcanvas (Drawer) [NEW] | 1/1 | Structural package/docs target present; exact node re-extraction needed before further API changes. |
| Tooltips [NEW] | 11/13 | Structural package/docs target present; exact node re-extraction needed before further API changes. |
| Popover [NEW] | 1/3 | Structural package/docs target present; exact node re-extraction needed before further API changes. |
| Table [NEW] | 1/14 | Structural package/docs target present; exact node re-extraction needed before further API changes. |
| Brands & Avatars [NEW] | 64/0 | Main inventory present; sample inventory is empty, so frame exceptions need detail extraction. |
