# Figma Package UI Full Audit

Date: 2026-04-14

Scope: all 44 package-backed component pages from `figma-package-ui-coverage.md`, checked against live Figma API page details for file `7Nd8Ml5yOREhJjdCDKggf4`.

## Method

The audit follows the updated `figma-component-extraction` skill checklist:

1. Re-fetch the Figma page inventory and each package-backed page detail.
2. Check whether the page has a real `COMPONENT` or `COMPONENT_SET` main source.
3. Check whether Figma examples are represented in docs as multiple variations or only as a single generic sample.
4. Check whether docs include a `figma` mapping document.
5. Check whether the coverage target resolves to the actual `packages/ui` runtime source.
6. Route pages with no main component through the frame-exception flow instead of treating them as normal component extraction.

## Summary

- Total package-backed pages checked: 44
- Verified after fix: 1 (`Accordion`)
- Structural pass candidates, still requiring visual/sample verification: 6 (`Buttons`, `Card`, `Navs/Tabs`, `Input`, `Checkbox`, `Modal`)
- Failed extraction check: 37
- Pages with no docs `figma` mapping: 35
- Pages with no Figma `COMPONENT` or `COMPONENT_SET` main source: 10
- Stale coverage paths: 9

## What Was Not Reflected

- Most docs pages were marked package-backed without a Figma-to-prop mapping. That means the package component may exist, but the implementation was not proven against the Figma main/sample component structure.
- Many Figma pages have large example frames, but the docs expose only one generic sample. These need sample-by-sample extraction or a clear frame-exception decision.
- The coverage file still points at old flat paths for several components, such as `button.tsx`, `card.tsx`, `input.tsx`, and `dialog.tsx`, while runtime code now lives in directory components like `Button/Button.tsx` and `Dialog/Dialog.tsx`.
- Some existing Figma docs were written before the token was restored. For example, `InputGroup.props.ts` still says direct Figma reads were unavailable because the token was expired. That note is now stale.

## What Was Wrong

- Pages with zero Figma main components were not separated from normal component pages. `Button Group`, `Ratings`, `Skeleton`, `Timeline`, `Input Group`, `File Input`, `Advanced Select`, `Input Number`, `Strong Password`, and `PIN Input` are frame-exception pages in the current Figma file.
- `Accordion` previously had package behavior gaps: the bordered item trigger padding, expanded content inset, docs wrapper size/border behavior, font, and mapping for `5701:176914` were not fully reflected. This was corrected and visually verified earlier.
- Some docs-only implementations are probably compensating visually instead of exposing package behavior. This is most visible in pages with one docs variation but hundreds or thousands of Figma instances.

## Page Results

| Page | Figma inventory | Docs Figma mapping | Package source | Result | Main issue |
| --- | --- | --- | --- | --- | --- |
| Accordion | C 1 / CS 0 / I 265 | accordionDoc, 16 example ids, yes | accordion.tsx | Verified after fix | No structural issue found in this audit. |
| Alerts | C 16 / CS 1 / I 1604 | alertDoc, 1 example id, no | alert.tsx | Fail extraction check | No docs Figma mapping; docs expose too few samples for the Figma Examples frame. |
| Avatar [NEW] | C 196 / CS 1 / I 1389 | avatarDoc, 1 example id, no | avatar.tsx | Fail extraction check | No docs Figma mapping; docs expose too few samples for the Figma Examples frame. |
| Badge/Tags [NEW] | C 135 / CS 1 / I 1112 | badgeDoc, 1 example id, no | badge.tsx | Fail extraction check | No docs Figma mapping; docs expose too few samples for the Figma Examples frame. |
| Blockquotes | C 19 / CS 1 / I 205 | blockquoteDoc, 7 example ids, no | blockquote.tsx | Fail extraction check | No docs Figma mapping. |
| Buttons [NEW] | C 495 / CS 1 / I 6299 | buttonDoc, 12 example ids, yes | Button/Button.tsx | Structural pass candidate | Coverage path stale: `button.tsx`. |
| Button Group [NEW] | C 0 / CS 0 / I 1028 | buttonGroupDoc, 6 example ids, no | button-group.tsx | Fail extraction check | No docs Figma mapping; no Figma main component; frame-exception extraction required. |
| Button Icons | C 495 / CS 1 / I 5065 | buttonIconsDoc, 6 example ids, no | Button/Button.tsx | Fail extraction check | No docs Figma mapping; coverage path stale: `button.tsx`. |
| Card [NEW] | C 1 / CS 0 / I 428 | cardDoc, 16 example ids, yes | Card/Card.tsx | Structural pass candidate | Coverage path stale: `card.tsx`. |
| Slider/Carousel | C 4 / CS 0 / I 1875 | carouselDoc, 1 example id, no | carousel.tsx | Fail extraction check | No docs Figma mapping; docs expose too few samples for the Figma Examples frame. |
| Datepicker | C 10 / CS 0 / I 3003 | datePickerDoc, 1 example id, no | date-picker.tsx | Fail extraction check | No docs Figma mapping; docs expose too few samples for the Figma Examples frame. |
| List Group [NEW] | C 1 / CS 0 / I 674 | listGroupDoc, 1 example id, no | list-group.tsx | Fail extraction check | No docs Figma mapping; docs expose too few samples for the Figma Examples frame. |
| Legend Indicator [NEW] | C 4 / CS 1 / I 74 | legendIndicatorDoc, 1 example id, no | legend-indicator.tsx | Fail extraction check | No docs Figma mapping; docs expose too few samples for the Figma Examples frame. |
| Progress [NEW] | C 66 / CS 1 / I 54 | progressDoc, 1 example id, no | progress.tsx | Fail extraction check | No docs Figma mapping; docs expose too few samples for the Figma Examples frame. |
| Ratings | C 0 / CS 0 / I 83 | ratingDoc, 1 example id, no | rating.tsx | Fail extraction check | No docs Figma mapping; no Figma main component; frame-exception extraction required. |
| Skeleton | C 0 / CS 0 / I 11 | skeletonDoc, 1 example id, no | skeleton.tsx | Fail extraction check | No docs Figma mapping; no Figma main component; frame-exception extraction required. |
| Spinners (Loaders) [NEW] | C 8 / CS 1 / I 100 | spinnerDoc, 1 example id, no | spinner.tsx | Fail extraction check | No docs Figma mapping; docs expose too few samples for the Figma Examples frame. |
| Timeline [NEW] | C 0 / CS 0 / I 193 | timelineDoc, 1 example id, no | timeline.tsx | Fail extraction check | No docs Figma mapping; no Figma main component; frame-exception extraction required. |
| Header/Navbar [NEW] | C 1 / CS 0 / I 3628 | navbarDoc, 1 example id, no | navbar.tsx | Fail extraction check | No docs Figma mapping; docs expose too few samples for the Figma Examples frame. |
| Navs/Tabs | C 31 / CS 1 / I 1620 | tabsDoc, 6 example ids, yes | Navs/Navs.tsx, Tabs/Tabs.tsx | Structural pass candidate | Coverage path stale: `navs.tsx`, `tabs.tsx`. |
| Sidebar [NEW] | C 3 / CS 0 / I 5080 | sidebarDoc, 1 example id, no | sidebar.tsx | Fail extraction check | No docs Figma mapping; docs expose too few samples for the Figma Examples frame. |
| Breadcrumb | C 29 / CS 1 / I 345 | breadcrumbDoc, 1 example id, no | breadcrumb.tsx | Fail extraction check | No docs Figma mapping; docs expose too few samples for the Figma Examples frame. |
| Pagination | C 13 / CS 1 / I 422 | paginationDoc, 1 example id, no | pagination.tsx | Fail extraction check | No docs Figma mapping; docs expose too few samples for the Figma Examples frame. |
| Input [NEW] | C 123 / CS 1 / I 4299 | inputDoc, 8 example ids, yes | Input/Input.tsx | Structural pass candidate | Coverage path stale: `input.tsx`. |
| Input Group [NEW] | C 0 / CS 0 / I 844 | inputGroupDoc, 10 example ids, yes | InputGroup/InputGroup.tsx | Fail extraction check | No Figma main component; frame-exception extraction required; coverage path stale: `input-group.tsx`. |
| File Input | C 0 / CS 0 / I 218 | fileInputDoc, 1 example id, no | file-input.tsx | Fail extraction check | No docs Figma mapping; no Figma main component; frame-exception extraction required. |
| Checkbox | C 65 / CS 1 / I 597 | checkboxDoc, 6 example ids, yes | Checkbox/Checkbox.tsx | Structural pass candidate | Coverage path stale: `checkbox.tsx`. |
| Radio | C 57 / CS 1 / I 360 | radioGroupDoc, 1 example id, no | radio-group.tsx | Fail extraction check | No docs Figma mapping; docs expose too few samples for the Figma Examples frame. |
| Switch [NEW] | C 45 / CS 1 / I 362 | switchDoc, 1 example id, no | switch.tsx | Fail extraction check | No docs Figma mapping; docs expose too few samples for the Figma Examples frame. |
| Advanced Select [NEW] | C 0 / CS 0 / I 2655 | selectDoc, 6 example ids, yes | Select/Select.tsx | Fail extraction check | No Figma main component; frame-exception extraction required; coverage path stale: `select.tsx`. |
| Input Number | C 0 / CS 0 / I 32 | numberFieldDoc, 1 example id, no | number-field.tsx | Fail extraction check | No docs Figma mapping; no Figma main component; frame-exception extraction required. |
| Strong Password | C 0 / CS 0 / I 218 | passwordFieldDoc, 1 example id, no | password-field.tsx | Fail extraction check | No docs Figma mapping; no Figma main component; frame-exception extraction required. |
| PIN Input | C 0 / CS 0 / I 957 | pinInputDoc, 1 example id, no | pin-input.tsx | Fail extraction check | No docs Figma mapping; no Figma main component; frame-exception extraction required. |
| Drag'n'Drop File Uploads | C 7 / CS 1 / I 108 | dropzoneDoc, 1 example id, no | dropzone.tsx | Fail extraction check | No docs Figma mapping; docs expose too few samples for the Figma Examples frame. |
| File Uploading Progress | C 8 / CS 1 / I 398 | uploadListDoc, 1 example id, no | upload-list.tsx | Fail extraction check | No docs Figma mapping; docs expose too few samples for the Figma Examples frame. |
| Range Slider | C 1 / CS 0 / I 31 | sliderDoc, 1 example id, no | slider.tsx | Fail extraction check | No docs Figma mapping; docs expose too few samples for the Figma Examples frame. |
| WYSIWYG Editor | C 15 / CS 1 / I 559 | richTextToolbarDoc, 1 example id, no | rich-text-toolbar.tsx | Fail extraction check | No docs Figma mapping; docs expose too few samples for the Figma Examples frame. |
| Dropdowns [NEW] | C 1 / CS 0 / I 4346 | dropdownMenuDoc, 1 example id, no | dropdown-menu.tsx | Fail extraction check | No docs Figma mapping; docs expose too few samples for the Figma Examples frame. |
| Modal [NEW] | C 1 / CS 0 / I 803 | dialogDoc, 6 example ids, yes | Dialog/Dialog.tsx | Structural pass candidate | Coverage path stale: `dialog.tsx`. |
| Offcanvas (Drawer) [NEW] | C 1 / CS 0 / I 89 | sheetDoc, 1 example id, no | sheet.tsx | Fail extraction check | No docs Figma mapping; docs expose too few samples for the Figma Examples frame. |
| Tooltips [NEW] | C 11 / CS 1 / I 153 | tooltipDoc, 1 example id, no | tooltip.tsx | Fail extraction check | No docs Figma mapping; docs expose too few samples for the Figma Examples frame. |
| Popover [NEW] | C 1 / CS 0 / I 89 | popoverDoc, 1 example id, no | popover.tsx | Fail extraction check | No docs Figma mapping; docs expose too few samples for the Figma Examples frame. |
| Table [NEW] | C 1 / CS 0 / I 857 | tableDoc, 1 example id, no | table.tsx | Fail extraction check | No docs Figma mapping; docs expose too few samples for the Figma Examples frame. |
| Brands & Avatars [NEW] | C 64 / CS 0 / I 13 | brandsAvatarsDoc, 7 example ids, no | avatar-group.tsx, brands-avatars.tsx | Fail extraction check | No docs Figma mapping; coverage points at avatar group even though the page also maps to brand avatar assets. |

## Next Implementation Order

1. Fix the coverage table so it points at actual runtime files and separates `Button Icons` and `Brands & Avatars` from their adjacent primitives.
2. Process frame-exception pages first: `Input Group`, `Advanced Select`, `Button Group`, `File Input`, `Input Number`, `Strong Password`, and `PIN Input`.
3. Add docs `figma` mapping for componentized but unmapped pages with high sample counts: `Alerts`, `Avatar`, `Badge/Tags`, `Datepicker`, `Header/Navbar`, `Sidebar`, `Dropdowns`, and `Table`.
4. Run visual verification per page after mapping and package updates, not just typecheck/build.
