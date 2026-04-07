# Figma To Code Roadmap

This document maps the Preline Figma pages to the `@blackstarzck/ui` package roadmap.

Source Figma file:

- file key: `7Nd8Ml5yOREhJjdCDKggf4`

## Working Rule

For every Figma page:

1. identify the reusable primitive
2. map needed semantic tokens
3. implement the component API in `packages/ui`
4. add a representative example in `apps/docs`
5. only then move to the next page

The package should prioritize reusable primitives over page-specific compositions.

## Current Status

Implemented in code:

- `Buttons [NEW]` -> `Button`
- `Badge/Tags [NEW]` -> `Badge`
- `Card [NEW]` -> `Card`
- `Input [NEW]` -> `Input`
- `Advanced Select [NEW]` -> `Select` foundation
- `Modal [NEW]` -> `Dialog`
- `Offcanvas (Drawer) [NEW]` -> `Sheet`
- `Navs/Tabs` -> `Tabs`
- `Checkbox` -> `Checkbox`
- `Radio` -> `RadioGroup`, `RadioGroupItem`
- `Switch [NEW]` -> `Switch`
- `Dropdowns [NEW]` -> `DropdownMenu`
- `Popover [NEW]` -> `Popover`
- `Tooltips [NEW]` -> `Tooltip`
- `Alerts` -> `Alert`
- `Accordion` -> `Accordion`
- `Pagination` -> `Pagination`
- `Breadcrumb` -> `Breadcrumb`
- `Table [NEW]` -> `Table`
- `Avatar [NEW]` -> `Avatar`
- `Skeleton` -> `Skeleton`
- `Progress [NEW]` -> `Progress`
- `Sidebar [NEW]` -> `Sidebar`, `SidebarSection`, `SidebarItem`
- `List Group [NEW]` -> `ListGroup`, `ListGroupItem`
- `Header/Navbar [NEW]` -> `Navbar`, `NavbarBrand`, `NavbarActions`
- `Spinners (Loaders) [NEW]` -> `Spinner`
- `Legend Indicator [NEW]` -> `LegendDot`, `LegendPill`
- `Ratings` -> `Rating`
- `Timeline [NEW]` -> `Timeline`, `TimelineItem`
- `Datepicker` -> `DatePicker`
- `Input Number` -> `NumberField`
- `Strong Password` -> `PasswordField`
- `PIN Input` -> `PinInput`
- `File Input` -> `FileInput`
- `Drag and Drop File Uploads` -> `Dropzone`
- `File Uploading Progress` -> `UploadList`, `UploadItem`
- `Range Slider` -> `Slider`
- `WYSIWYG Editor` -> `RichTextToolbar`, `RichTextEditor`
- `Slider/Carousel` -> `Carousel`
- `Typography` token usage -> text semantics through theme tokens

Remaining follow-up work is now mostly refinement rather than missing package coverage:

- deepen variants for specific Figma examples
- expand responsive compositions in `apps/docs`
- decide whether complex controls like `RichTextEditor` and `Carousel` should stay lightweight or get separate integration packages later

## Phase 1

Highest priority. These are the next components to implement because they complete the basic form and overlay system.

| Figma page | Code target | Notes |
|---|---|---|
| `Checkbox` | `Checkbox` | Use Radix checkbox. Tokenize checked, unchecked, disabled, focus states. |
| `Radio` | `RadioGroup`, `RadioGroupItem` | Use Radix radio group. Share control sizing tokens with checkbox. |
| `Switch [NEW]` | `Switch` | Use Radix switch. Align track/thumb tokens with Figma state colors. |
| `Dropdowns [NEW]` | `DropdownMenu`, `DropdownMenuItem`, `DropdownMenuSeparator`, `DropdownMenuLabel`, `DropdownMenuCheckboxItem`, `DropdownMenuRadioGroup` | This page should become the menu system foundation. |
| `Popover [NEW]` | `Popover`, `PopoverTrigger`, `PopoverContent` | Use Radix popover. Reuse surface, border, overlay, and spacing tokens. |
| `Tooltips [NEW]` | `Tooltip`, `TooltipProvider`, `TooltipTrigger`, `TooltipContent` | Use Radix tooltip. Keep API thin and styling token-driven. |

### Token focus for Phase 1

- control size
- control border width
- control border radius
- checked and unchecked colors
- hover and focus ring colors
- overlay surface colors
- menu padding and item spacing

## Phase 2

Second priority. These shape navigation and feedback patterns used broadly across applications.

| Figma page | Code target | Notes |
|---|---|---|
| `Alerts` | `Alert`, `AlertTitle`, `AlertDescription` | Reuse success, destructive, warning, info semantics. |
| `Accordion` | `Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent` | Use Radix accordion. Good candidate for size and density variants. |
| `Pagination` | `Pagination`, `PaginationItem`, `PaginationLink`, `PaginationPrevious`, `PaginationNext` | Can be built with plain React plus existing button tokens. |
| `Breadcrumb` | `Breadcrumb`, `BreadcrumbItem`, `BreadcrumbLink`, `BreadcrumbSeparator` | Lightweight primitive set. |
| `Sidebar [NEW]` | `Sidebar`, `SidebarSection`, `SidebarItem`, `SidebarGroupLabel` | Build after nav tokens are stable. |
| `Header/Navbar [NEW]` | `Navbar`, `NavbarBrand`, `NavbarActions` | Package this only if you want layout primitives in the public API. |
| `List Group [NEW]` | `ListGroup`, `ListGroupItem` | Could share styles with nav and dropdown items. |

### Token focus for Phase 2

- nav active and hover states
- alert semantic backgrounds and foregrounds
- divider and separator tokens
- list item spacing
- sidebar typography and icon colors

## Phase 3

Third priority. These are data-display and utility components that benefit from a stable token base first.

| Figma page | Code target | Notes |
|---|---|---|
| `Table [NEW]` | `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableCell`, `TableHead`, `TableCaption` | Use semantic table spacing and border tokens. |
| `Avatar [NEW]` | `Avatar`, `AvatarImage`, `AvatarFallback` | Use Radix avatar or lightweight custom implementation. |
| `Skeleton` | `Skeleton` | Very small primitive, but best once surface tokens are finalized. |
| `Progress [NEW]` | `Progress` | Use Radix progress. |
| `Spinners (Loaders) [NEW]` | `Spinner` | Simple utility primitive. |
| `Legend Indicator [NEW]` | `LegendDot`, `LegendPill` | Useful for charts and dashboards. |
| `Ratings` | `Rating` | Likely custom primitive. |
| `Timeline [NEW]` | `Timeline`, `TimelineItem` | Better after list and divider patterns are stable. |

### Token focus for Phase 3

- table row heights
- avatar sizes
- skeleton shimmer surface pairs
- progress track and indicator colors
- loading and status indicator colors

## Phase 4

Complex or composite controls. These should wait until Phase 1 through 3 primitives are solid.

| Figma page | Code target | Notes |
|---|---|---|
| `Datepicker` | `DatePicker` | High complexity. Likely custom or external date lib integration. |
| `Input Number` | `NumberField` | Needs keyboard behavior and step logic. |
| `Strong Password` | `PasswordField`, `PasswordStrengthMeter` | Composite control built from `Input`, `Progress`, `Popover`. |
| `PIN Input` | `PinInput` | Composite control. |
| `File Input` | `FileInput` | Composite control. |
| `Drag and Drop File Uploads` | `Dropzone` | Composite control. |
| `File Uploading Progress` | `UploadList`, `UploadItem` | Built from progress, card, button, icon primitives. |
| `Range Slider` | `Slider` | Use Radix slider. |
| `WYSIWYG Editor` | `RichTextToolbar` or integration package | Better as a separate integration layer. |
| `Slider/Carousel` | `Carousel` | Often requires heavier behavior and animation choices. |

## Implementation Order

Recommended exact order for the next coding passes:

1. `Checkbox` - completed
2. `Radio` - completed
3. `Switch` - completed
4. `DropdownMenu` - completed
5. `Popover` - completed
6. `Tooltip` - completed
7. `Alert` - completed
8. `Accordion` - completed
9. `Pagination` - completed
10. `Breadcrumb` - completed
11. `Table` - completed
12. `Avatar` - completed
13. `Skeleton` - completed
14. `Progress` - completed

## Current Focus After This Pass

The roadmap is now covered end to end in the package. The next iteration should focus on:

1. deepening variant matrices for `Button`, `Input`, `DropdownMenu`, and `Table`
2. adding more page-level docs examples that mirror Figma compositions
3. improving accessibility polish and keyboard flows for composite controls
4. deciding which advanced components should later move into optional integration packages

## Definition Of Done For Each Page

A Figma page is considered translated only when:

- the corresponding public component exists in `packages/ui`
- the component uses semantic tokens instead of raw hex values
- a docs example exists in `apps/docs`
- the package still passes `npm run typecheck`
- the package still passes `npm run build`

## Public API Rule

Not every Figma page should become a top-level public component.

Pages that are mostly examples or compositions should become:

- docs examples
- internal demo patterns
- or later higher-level package exports

Examples:

- `Header/Navbar [NEW]` can begin as docs composition
- `WYSIWYG Editor` may stay as a composed demo until editor strategy is decided
- `Chat Bubbles` may be a pattern, not a primitive
