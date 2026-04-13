import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Alert,
  AlertDescription,
  AlertTitle,
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupItem,
  AvatarGroupMore,
  Badge,
  Blockquote,
  BlockquoteCitation,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Checkbox,
  DatePicker,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Dropzone,
  FileInput,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupField,
  LegendDot,
  LegendPill,
  ListGroup,
  ListGroupDescription,
  ListGroupItem,
  ListGroupTitle,
  Navbar,
  NavbarActions,
  NavbarBrand,
  NavbarContent,
  NavbarLink,
  Navs,
  NavsLink,
  NumberField,
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PasswordField,
  PinInput,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Progress,
  RadioGroup,
  RadioGroupItem,
  Rating,
  RichTextEditor,
  RichTextToolbar,
  RichTextToolbarButton,
  RichTextToolbarGroup,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarItem,
  SidebarList,
  SidebarSection,
  SidebarSectionTitle,
  Skeleton,
  Slider,
  Spinner,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  ThemeRoot,
  Timeline,
  TimelineContent,
  TimelineDescription,
  TimelineIndicator,
  TimelineItem,
  TimelineLine,
  TimelineRail,
  TimelineTime,
  TimelineTitle,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  UploadList
} from "@blackstarzck/ui";

import { createDemoCode, createSingleVariationDoc, DemoSurface } from "../component-doc-helpers";
import { componentCatalogBySlug } from "../registry";
import { DropdownMenuPreview, PopoverPreview, SheetPreview } from "./component-doc-previews";

export const skeletonDoc = createSingleVariationDoc({
  item: componentCatalogBySlug.skeleton,
  whenToUse: ["Use skeletons while real content is loading but the final layout is already known."],
  importCode: 'import { Skeleton } from "@blackstarzck/ui";',
  variation: {
    id: "skeleton-default",
    title: "Loading blocks",
    description: "Simple height and width primitives cover text, avatar, and card placeholders.",
    controlSummary: "className sizing",
    code: createDemoCode({
      demoName: "SkeletonDefaultDemo",
      imports: ["Skeleton"],
      body: `
<div className="grid gap-4">
  <div className="flex items-center gap-3">
    <Skeleton className="size-10 rounded-full" />
    <div className="grid gap-2">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-4 w-24" />
    </div>
  </div>
  <Skeleton className="h-28 w-full rounded-xl" />
</div>`
    }),
    layout: "start",
    preview: (
      <DemoSurface>
        <div className="grid gap-4">
          <div className="flex items-center gap-3">
            <Skeleton className="size-10 rounded-full" />
            <div className="grid gap-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
          <Skeleton className="h-28 w-full rounded-xl" />
        </div>
      </DemoSurface>
    )
  },
  api: [{ name: "className", type: "string", defaultValue: "undefined", description: "Defines the block size and shape." }],
  tokens: [{ name: "secondary", usage: "Skeleton fill color." }],
  accessibility: ["Do not leave skeletons visible after content is interactive; replace them promptly."]
});

export const breadcrumbDoc = createSingleVariationDoc({
  item: componentCatalogBySlug.breadcrumb,
  whenToUse: ["Use breadcrumbs when the user benefits from seeing their current depth in a nested information hierarchy."],
  importCode: 'import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@blackstarzck/ui";',
  variation: {
    id: "breadcrumb-default",
    title: "Path trail",
    description: "Breadcrumbs communicate current depth without requiring a full secondary nav tree.",
    controlSummary: "list composition",
    code: createDemoCode({
      demoName: "BreadcrumbDefaultDemo",
      imports: ["Breadcrumb", "BreadcrumbItem", "BreadcrumbLink", "BreadcrumbList", "BreadcrumbPage", "BreadcrumbSeparator"],
      body: `
<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="#">Docs</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="#">Components</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Button</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`
    }),
    layout: "start",
    preview: (
      <DemoSurface>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Docs</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Components</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Button</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </DemoSurface>
    )
  },
  api: [{ name: "children", type: "ReactNode", defaultValue: "required", description: "Compose list, items, links, and separators in order." }],
  tokens: [{ name: "muted-foreground", usage: "Inactive path text color." }],
  accessibility: ["Mark only the current page with BreadcrumbPage so assistive tech can announce it correctly."]
});

export const datePickerDoc = createSingleVariationDoc({
  item: componentCatalogBySlug["date-picker"],
  whenToUse: ["Use a date picker when a calendar date must be explicit and comparable across locales."],
  importCode: 'import { DatePicker } from "@blackstarzck/ui";',
  variation: {
    id: "date-picker-default",
    title: "Labeled date field",
    description: "DatePicker wraps the native date input with label, icon, and helper description.",
    controlSummary: "label, description, min, max",
    code: createDemoCode({
      demoName: "DatePickerDefaultDemo",
      imports: ["DatePicker"],
      body: `
<DatePicker
  label="Release date"
  description="Choose the package publish date."
  defaultValue="2026-04-08"
/>`
    }),
    layout: "start",
    preview: (
      <DemoSurface>
        <DatePicker label="Release date" description="Choose the package publish date." defaultValue="2026-04-08" />
      </DemoSurface>
    )
  },
  api: [
    { name: "label", type: "string", defaultValue: "undefined", description: "Visible field label." },
    { name: "description", type: "string", defaultValue: "undefined", description: "Helper text below the input." }
  ],
  tokens: [{ name: "input", usage: "Date field border and icon alignment shell." }],
  accessibility: ["Use the label prop or an external label so the date meaning stays explicit."]
});

export const numberFieldDoc = createSingleVariationDoc({
  item: componentCatalogBySlug["number-field"],
  whenToUse: ["Use number fields when stepping values is faster than freeform typing alone."],
  importCode: 'import { NumberField } from "@blackstarzck/ui";',
  variation: {
    id: "number-field-default",
    title: "Stepper input",
    description: "Increment and decrement controls keep numeric changes bounded and discoverable.",
    controlSummary: "defaultValue, min, max, step, onValueChange",
    code: createDemoCode({
      demoName: "NumberFieldDefaultDemo",
      imports: ["NumberField"],
      body: `
<NumberField
  defaultValue={4}
  min={1}
  max={10}
  step={1}
  aria-label="Release candidate count"
/>`
    }),
    layout: "start",
    preview: (
      <DemoSurface>
        <NumberField defaultValue={4} min={1} max={10} step={1} aria-label="Release candidate count" />
      </DemoSurface>
    )
  },
  api: [
    { name: "onValueChange", type: "(value: number) => void", defaultValue: "undefined", description: "Fires after value normalization." },
    { name: "step", type: "number", defaultValue: "1", description: "Increment/decrement amount." }
  ],
  tokens: [{ name: "input", usage: "Border and button divider tone." }],
  accessibility: ["Provide an aria-label if there is no visible field label."]
});

export const passwordFieldDoc = createSingleVariationDoc({
  item: componentCatalogBySlug["password-field"],
  whenToUse: ["Use password fields for secrets that benefit from reveal affordance and inline strength feedback."],
  importCode: 'import { PasswordField } from "@blackstarzck/ui";',
  variation: {
    id: "password-field-default",
    title: "Reveal + strength",
    description: "PasswordField combines the base input with reveal control and strength meter.",
    controlSummary: "showStrength, value, defaultValue",
    code: createDemoCode({
      demoName: "PasswordFieldDefaultDemo",
      imports: ["PasswordField"],
      body: `
<PasswordField
  defaultValue="Publish@2026"
  placeholder="Create a password"
/>`
    }),
    layout: "start",
    preview: (
      <DemoSurface>
        <PasswordField defaultValue="Publish@2026" placeholder="Create a password" />
      </DemoSurface>
    )
  },
  api: [
    { name: "showStrength", type: "boolean", defaultValue: "true", description: "Shows or hides the strength meter." },
    { name: "type", type: "managed internally", defaultValue: '"password"', description: "Switched between password and text by the reveal control." }
  ],
  tokens: [{ name: "destructive", usage: "Weak strength tone." }],
  accessibility: ["Keep the reveal control keyboard reachable and clearly labeled for assistive tech."]
});

export const pinInputDoc = createSingleVariationDoc({
  item: componentCatalogBySlug["pin-input"],
  whenToUse: ["Use segmented PIN inputs for OTP codes, verification flows, and compact secure entry."],
  importCode: 'import { PinInput } from "@blackstarzck/ui";',
  variation: {
    id: "pin-input-default",
    title: "Verification code",
    description: "PinInput manages segmented focus, paste support, and keyboard navigation for short codes.",
    controlSummary: "length, mode, onValueChange",
    code: createDemoCode({
      demoName: "PinInputDefaultDemo",
      imports: ["PinInput"],
      body: `
<PinInput
  length={6}
  defaultValue="128934"
  aria-label="Verification code"
/>`
    }),
    layout: "start",
    preview: (
      <DemoSurface>
        <PinInput length={6} defaultValue="128934" aria-label="Verification code" />
      </DemoSurface>
    )
  },
  api: [
    { name: "length", type: "number", defaultValue: "6", description: "Number of input cells." },
    { name: "mode", type: '"numeric" | "alphanumeric"', defaultValue: '"numeric"', description: "Controls allowed characters." }
  ],
  tokens: [{ name: "input", usage: "Cell border color." }],
  accessibility: ["Keep the total required code length clear in nearby text."]
});

export const sliderDoc = createSingleVariationDoc({
  item: componentCatalogBySlug.slider,
  whenToUse: ["Use sliders for bounded continuous values where a rough visual range matters more than exact typing."],
  importCode: 'import { Slider } from "@blackstarzck/ui";',
  variation: {
    id: "slider-default",
    title: "Range selection",
    description: "Sliders work well for confidence thresholds, opacity, and percentages.",
    controlSummary: "defaultValue, max, step",
    code: createDemoCode({
      demoName: "SliderDefaultDemo",
      imports: ["Slider"],
      body: `
<div className="grid gap-3">
  <div className="flex items-center justify-between text-sm">
    <span>Confidence threshold</span>
    <span className="text-muted-foreground">72%</span>
  </div>
  <Slider defaultValue={[72]} max={100} step={1} />
</div>`
    }),
    layout: "start",
    preview: (
      <DemoSurface>
        <div className="grid gap-3">
          <div className="flex items-center justify-between text-sm">
            <span>Confidence threshold</span>
            <span className="text-muted-foreground">72%</span>
          </div>
          <Slider defaultValue={[72]} max={100} step={1} />
        </div>
      </DemoSurface>
    )
  },
  api: [
    { name: "defaultValue", type: "number[]", defaultValue: "[0]", description: "Initial thumb positions." },
    { name: "step", type: "number", defaultValue: "1", description: "Increment granularity." }
  ],
  tokens: [{ name: "primary", usage: "Filled track color." }],
  accessibility: ["Provide visible value context because slider position alone is ambiguous."]
});

export const fileInputDoc = createSingleVariationDoc({
  item: componentCatalogBySlug["file-input"],
  whenToUse: ["Use file inputs when native picker behavior is enough and drag-and-drop is not required."],
  importCode: 'import { FileInput } from "@blackstarzck/ui";',
  variation: {
    id: "file-input-default",
    title: "Native picker",
    description: "FileInput wraps the browser picker with labels, helper text, and a simple selected-file list.",
    controlSummary: "label, description, multiple, onFilesChange",
    code: createDemoCode({
      demoName: "FileInputDefaultDemo",
      imports: ["FileInput"],
      body: `
<FileInput
  label="Upload assets"
  description="Choose one or more files to attach."
  multiple
/>`
    }),
    layout: "start",
    preview: (
      <DemoSurface>
        <FileInput label="Upload assets" description="Choose one or more files to attach." multiple />
      </DemoSurface>
    )
  },
  api: [
    { name: "multiple", type: "boolean", defaultValue: "false", description: "Enables multiple file selection." },
    { name: "onFilesChange", type: "(files: File[]) => void", defaultValue: "undefined", description: "Receives the normalized file array." }
  ],
  tokens: [{ name: "input", usage: "Dashed picker border." }],
  accessibility: ["Use a clear label so the accepted upload type is understandable before opening the picker."]
});

export const dropzoneDoc = createSingleVariationDoc({
  item: componentCatalogBySlug.dropzone,
  whenToUse: ["Use dropzones when drag-and-drop is a primary part of the upload flow."],
  importCode: 'import { Dropzone } from "@blackstarzck/ui";',
  variation: {
    id: "dropzone-default",
    title: "Drag-and-drop upload",
    description: "Dropzone exposes drag feedback, browse affordance, and a selected file list in one surface.",
    controlSummary: "title, description, multiple, onFilesChange",
    code: createDemoCode({
      demoName: "DropzoneDefaultDemo",
      imports: ["Dropzone"],
      body: `
<Dropzone
  title="Upload release assets"
  description="Drag files here or browse from your device."
/>`
    }),
    layout: "start",
    preview: (
      <DemoSurface>
        <Dropzone title="Upload release assets" description="Drag files here or browse from your device." />
      </DemoSurface>
    )
  },
  api: [
    { name: "multiple", type: "boolean", defaultValue: "true", description: "Allows multiple files in one drop." },
    { name: "onFilesChange", type: "(files: File[]) => void", defaultValue: "undefined", description: "Receives the dropped file list." }
  ],
  tokens: [{ name: "primary-soft", usage: "Active drag feedback surface." }],
  accessibility: ["Keep a keyboard-triggerable browse action available alongside drag-and-drop."]
});

export const ratingDoc = createSingleVariationDoc({
  item: componentCatalogBySlug.rating,
  whenToUse: ["Use ratings for lightweight feedback and score selection when a numeric scale should feel visual."],
  importCode: 'import { Rating } from "@blackstarzck/ui";',
  variation: {
    id: "rating-default",
    title: "Star rating",
    description: "Interactive star selection is useful for reviews, quality scoring, and preference capture.",
    controlSummary: "defaultValue, max, readOnly, onValueChange",
    code: createDemoCode({
      demoName: "RatingDefaultDemo",
      imports: ["Rating"],
      body: `
<div className="grid gap-3">
  <Rating defaultValue={4} />
  <Rating defaultValue={3} readOnly />
</div>`
    }),
    layout: "start",
    preview: (
      <DemoSurface>
        <div className="grid gap-3">
          <Rating defaultValue={4} />
          <Rating defaultValue={3} readOnly />
        </div>
      </DemoSurface>
    )
  },
  api: [
    { name: "max", type: "number", defaultValue: "5", description: "Number of rating symbols." },
    { name: "readOnly", type: "boolean", defaultValue: "false", description: "Disables interaction while keeping the visual score." }
  ],
  tokens: [{ name: "primary", usage: "Active star color." }],
  accessibility: ["Use labels or nearby text so the meaning of the score stays clear."]
});

export const richTextToolbarDoc = createSingleVariationDoc({
  item: componentCatalogBySlug["rich-text-toolbar"],
  whenToUse: ["Use the rich text toolbar when an editable region needs a compact, composable formatting row."],
  importCode: 'import { RichTextEditor, RichTextToolbar, RichTextToolbarButton, RichTextToolbarGroup } from "@blackstarzck/ui";',
  variation: {
    id: "rich-text-toolbar-default",
    title: "Formatting shell",
    description: "The toolbar and editor are split primitives so you can compose formatting controls freely.",
    controlSummary: "active buttons, grouped controls, contentEditable editor",
    code: createDemoCode({
      demoName: "RichTextToolbarDefaultDemo",
      imports: ["RichTextEditor", "RichTextToolbar", "RichTextToolbarButton", "RichTextToolbarGroup"],
      body: `
<div className="grid gap-3">
  <RichTextToolbar>
    <RichTextToolbarGroup>
      <RichTextToolbarButton active>Bold</RichTextToolbarButton>
      <RichTextToolbarButton>Italic</RichTextToolbarButton>
      <RichTextToolbarButton>Link</RichTextToolbarButton>
    </RichTextToolbarGroup>
  </RichTextToolbar>
  <RichTextEditor>
    Publish notes can be edited inline with shared semantic tokens.
  </RichTextEditor>
</div>`
    }),
    layout: "start",
    preview: (
      <DemoSurface>
        <div className="grid gap-3">
          <RichTextToolbar>
            <RichTextToolbarGroup>
              <RichTextToolbarButton active>Bold</RichTextToolbarButton>
              <RichTextToolbarButton>Italic</RichTextToolbarButton>
              <RichTextToolbarButton>Link</RichTextToolbarButton>
            </RichTextToolbarGroup>
          </RichTextToolbar>
          <RichTextEditor>Publish notes can be edited inline with shared semantic tokens.</RichTextEditor>
        </div>
      </DemoSurface>
    )
  },
  api: [
    { name: "active", type: "boolean", defaultValue: "false", description: "Highlights a toolbar button as selected." },
    { name: "children", type: "ReactNode", defaultValue: "required", description: "Compose groups, buttons, and editor content." }
  ],
  tokens: [{ name: "secondary", usage: "Toolbar group background." }],
  accessibility: ["Ensure formatting buttons have explicit text or aria-labels when using icon-only affordances."]
});

export const paginationDoc = createSingleVariationDoc({
  item: componentCatalogBySlug.pagination,
  whenToUse: ["Use pagination when a result set is intentionally split across discrete pages."],
  importCode: 'import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@blackstarzck/ui";',
  variation: {
    id: "pagination-default",
    title: "Paged navigation",
    description: "Pagination composes previous, next, numbered pages, and ellipsis with the shared button primitive.",
    controlSummary: "isActive, href, composition",
    code: createDemoCode({
      demoName: "PaginationDefaultDemo",
      imports: ["Pagination", "PaginationContent", "PaginationEllipsis", "PaginationItem", "PaginationLink", "PaginationNext", "PaginationPrevious"],
      body: `
<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isActive>1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">2</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>`
    }),
    layout: "start",
    preview: (
      <DemoSurface>
        <Pagination>
          <PaginationContent>
            <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
            <PaginationItem><PaginationLink href="#" isActive>1</PaginationLink></PaginationItem>
            <PaginationItem><PaginationLink href="#">2</PaginationLink></PaginationItem>
            <PaginationItem><PaginationEllipsis /></PaginationItem>
            <PaginationItem><PaginationNext href="#" /></PaginationItem>
          </PaginationContent>
        </Pagination>
      </DemoSurface>
    )
  },
  api: [{ name: "isActive", type: "boolean", defaultValue: "false", description: "Marks the current page." }],
  tokens: [{ name: "primary-soft", usage: "Active page emphasis." }],
  accessibility: ["Expose the current page with aria-current and keep previous/next labels explicit."]
});

export const navbarDoc = createSingleVariationDoc({
  item: componentCatalogBySlug.navbar,
  whenToUse: ["Use navbars for top-level app structure, global links, and primary actions."],
  importCode: 'import { Navbar, NavbarActions, NavbarBrand, NavbarContent, NavbarLink } from "@blackstarzck/ui";',
  variation: {
    id: "navbar-default",
    title: "Application header",
    description: "Navbar composes brand, links, and trailing actions into one responsive top bar.",
    controlSummary: "active links, brand slot, action slot",
    code: createDemoCode({
      demoName: "NavbarDefaultDemo",
      imports: ["Button", "Navbar", "NavbarActions", "NavbarBrand", "NavbarContent", "NavbarLink"],
      body: `
<Navbar>
  <NavbarBrand>Chanchan2 UI</NavbarBrand>
  <NavbarContent>
    <NavbarLink href="#" active>Components</NavbarLink>
    <NavbarLink href="#">Foundations</NavbarLink>
    <NavbarLink href="#">Patterns</NavbarLink>
  </NavbarContent>
  <NavbarActions>
    <Button size="sm">Publish</Button>
  </NavbarActions>
</Navbar>`
    }),
    layout: "start",
    preview: (
      <DemoSurface>
        <Navbar>
          <NavbarBrand>Chanchan2 UI</NavbarBrand>
          <NavbarContent>
            <NavbarLink href="#" active>Components</NavbarLink>
            <NavbarLink href="#">Foundations</NavbarLink>
            <NavbarLink href="#">Patterns</NavbarLink>
          </NavbarContent>
          <NavbarActions>
            <Button size="sm">Publish</Button>
          </NavbarActions>
        </Navbar>
      </DemoSurface>
    )
  },
  api: [{ name: "active", type: "boolean", defaultValue: "false", description: "Highlights the current NavbarLink." }],
  tokens: [{ name: "card", usage: "Navbar surface background." }],
  accessibility: ["Keep link labels concise and ensure the primary navigation destination is clear."]
});

export const spinnerDoc = createSingleVariationDoc({
  item: componentCatalogBySlug.spinner,
  whenToUse: ["Use spinners when a short-lived async action is in progress and no determinate progress exists."],
  importCode: 'import { Spinner } from "@blackstarzck/ui";',
  variation: {
    id: "spinner-default",
    title: "Busy states",
    description: "Spinner supports size and tone variants for inline and standalone loading states.",
    controlSummary: "size: sm | default | lg, tone: default | muted | success | destructive",
    code: createDemoCode({
      demoName: "SpinnerDefaultDemo",
      imports: ["Spinner"],
      body: `
<div className="flex items-center gap-4">
  <Spinner size="sm" />
  <Spinner />
  <Spinner size="lg" tone="muted" />
  <Spinner tone="success" />
</div>`
    }),
    layout: "start",
    preview: (
      <DemoSurface>
        <div className="flex items-center gap-4">
          <Spinner size="sm" />
          <Spinner />
          <Spinner size="lg" tone="muted" />
          <Spinner tone="success" />
        </div>
      </DemoSurface>
    )
  },
  api: [
    { name: "size", type: '"sm" | "default" | "lg"', defaultValue: '"default"', description: "Rendered spinner size." },
    { name: "tone", type: '"default" | "muted" | "success" | "destructive"', defaultValue: '"default"', description: "Foreground color tone." }
  ],
  tokens: [{ name: "primary", usage: "Default spinner color." }],
  accessibility: ["Pair spinners with nearby text when the loading state has user-facing meaning."]
});

export const popoverDoc = createSingleVariationDoc({
  item: componentCatalogBySlug.popover,
  whenToUse: ["Use popovers for contextual metadata or controls that should stay anchored to the trigger."],
  importCode: 'import { Popover, PopoverContent, PopoverTrigger } from "@blackstarzck/ui";',
  variation: {
    id: "popover-default",
    title: "Anchored panel",
    description: "Popover works for token details, settings, and lightweight contextual actions.",
    controlSummary: "align, sideOffset, trigger composition",
    code: createDemoCode({
      demoName: "PopoverDefaultDemo",
      imports: ["Button", "Popover", "PopoverContent", "PopoverTrigger"],
      body: `
<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Theme info</Button>
  </PopoverTrigger>
  <PopoverContent>
    <div className="grid gap-1">
      <p className="font-medium">Cashmere</p>
      <p className="text-sm text-muted-foreground">Soft contrast with a neutral surface palette.</p>
    </div>
  </PopoverContent>
</Popover>`
    }),
    layout: "center",
    preview: <PopoverPreview />
  },
  api: [
    { name: "align", type: '"start" | "center" | "end"', defaultValue: '"center"', description: "Horizontal alignment against the trigger." },
    { name: "sideOffset", type: "number", defaultValue: "8", description: "Gap between trigger and panel." }
  ],
  tokens: [{ name: "popover", usage: "Popover surface background." }],
  accessibility: ["Keep popover content short and anchored to a clearly labeled trigger."]
});

export const dropdownMenuDoc = createSingleVariationDoc({
  item: componentCatalogBySlug["dropdown-menu"],
  whenToUse: ["Use dropdown menus for compact action lists that would otherwise clutter the main surface."],
  importCode: 'import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@blackstarzck/ui";',
  variation: {
    id: "dropdown-menu-default",
    title: "Action menu",
    description: "DropdownMenu supports labels, items, separators, and togglable rows inside a small action list.",
    controlSummary: "trigger, items, checkbox items",
    code: createDemoCode({
      demoName: "DropdownMenuDefaultDemo",
      imports: ["Button", "DropdownMenu", "DropdownMenuCheckboxItem", "DropdownMenuContent", "DropdownMenuItem", "DropdownMenuLabel", "DropdownMenuSeparator", "DropdownMenuTrigger"],
      body: `
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Options</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Display</DropdownMenuLabel>
    <DropdownMenuCheckboxItem checked>Line numbers</DropdownMenuCheckboxItem>
    <DropdownMenuCheckboxItem>Wrapped code</DropdownMenuCheckboxItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Duplicate variation</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`
    }),
    layout: "center",
    preview: <DropdownMenuPreview />
  },
  api: [{ name: "sideOffset", type: "number", defaultValue: "6", description: "Gap between trigger and menu content." }],
  tokens: [{ name: "popover", usage: "Menu surface background." }],
  accessibility: ["Keep item labels concise and group destructive actions away from the primary cluster."]
});

export const sheetDoc = createSingleVariationDoc({
  item: componentCatalogBySlug.sheet,
  whenToUse: ["Use sheets for longer contextual tasks that need more room than a popover but less disruption than a full page."],
  importCode: 'import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@blackstarzck/ui";',
  variation: {
    id: "sheet-default",
    title: "Side panel",
    description: "Sheet reuses Radix dialog primitives for drawer-style settings and editorial workflows.",
    controlSummary: 'side: "left" | "right" | "top" | "bottom"',
    code: createDemoCode({
      demoName: "SheetDefaultDemo",
      imports: ["Button", "Sheet", "SheetContent", "SheetDescription", "SheetFooter", "SheetHeader", "SheetTitle", "SheetTrigger"],
      body: `
<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline">Open sheet</Button>
  </SheetTrigger>
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>Review settings</SheetTitle>
      <SheetDescription>Adjust layout density and publish metadata.</SheetDescription>
    </SheetHeader>
    <SheetFooter>
      <Button variant="outline">Cancel</Button>
      <Button>Save</Button>
    </SheetFooter>
  </SheetContent>
</Sheet>`
    }),
    layout: "center",
    preview: <SheetPreview />
  },
  api: [{ name: "side", type: '"left" | "right" | "top" | "bottom"', defaultValue: '"right"', description: "Attachment edge for the panel." }],
  tokens: [{ name: "popover", usage: "Sheet surface background." }],
  accessibility: ["Use a descriptive title because sheets interrupt the current flow and need clear context."]
});

export const carouselDoc = createSingleVariationDoc({
  item: componentCatalogBySlug.carousel,
  whenToUse: ["Use carousels for grouped slides where horizontal progression is intentional and limited."],
  importCode: 'import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@blackstarzck/ui";',
  variation: {
    id: "carousel-default",
    title: "Slide viewport",
    description: "Carousel composes a scrollable viewport and directional controls on top of shared buttons.",
    controlSummary: "content, items, previous/next controls",
    code: createDemoCode({
      demoName: "CarouselDefaultDemo",
      imports: ["Card", "CardContent", "CardHeader", "CardTitle", "Carousel", "CarouselContent", "CarouselItem", "CarouselNext", "CarouselPrevious"],
      body: `
<Carousel className="max-w-xl">
  <CarouselContent>
    {["Overview", "Variants", "API"].map((slide) => (
      <CarouselItem key={slide}>
        <Card>
          <CardHeader>
            <CardTitle>{slide}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Scrollable sections can be grouped into slides.</p>
          </CardContent>
        </Card>
      </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`
    }),
    layout: "start",
    preview: (
      <DemoSurface>
        <Carousel className="max-w-xl">
          <CarouselContent>
            {["Overview", "Variants", "API"].map((slide) => (
              <CarouselItem key={slide}>
                <Card>
                  <CardHeader>
                    <CardTitle>{slide}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Scrollable sections can be grouped into slides.</p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </DemoSurface>
    )
  },
  api: [{ name: "className", type: "string", defaultValue: "undefined", description: "Controls outer carousel width and positioning." }],
  tokens: [{ name: "card", usage: "Slide surface background." }],
  accessibility: ["Do not hide critical content exclusively in slides without additional navigation cues."]
});

export const legendIndicatorDoc = createSingleVariationDoc({
  item: componentCatalogBySlug["legend-indicator"],
  whenToUse: ["Use legend indicators to map colors to meaning in charts, statuses, and grouped lists."],
  importCode: 'import { LegendDot, LegendPill } from "@blackstarzck/ui";',
  variation: {
    id: "legend-indicator-default",
    title: "Dots and pills",
    description: "LegendDot and LegendPill share the same tone system for chart keys and inline markers.",
    controlSummary: "tone: default | success | destructive | accent | muted",
    code: createDemoCode({
      demoName: "LegendIndicatorDefaultDemo",
      imports: ["LegendDot", "LegendPill"],
      body: `
<div className="grid gap-4">
  <div className="flex items-center gap-3">
    <LegendDot tone="default" />
    <LegendDot tone="success" />
    <LegendDot tone="destructive" />
    <LegendDot tone="muted" />
  </div>
  <div className="flex flex-wrap gap-3">
    <LegendPill tone="default">Published</LegendPill>
    <LegendPill tone="success">Healthy</LegendPill>
    <LegendPill tone="destructive">Failed</LegendPill>
  </div>
</div>`
    }),
    layout: "start",
    preview: (
      <DemoSurface>
        <div className="grid gap-4">
          <div className="flex items-center gap-3">
            <LegendDot tone="default" />
            <LegendDot tone="success" />
            <LegendDot tone="destructive" />
            <LegendDot tone="muted" />
          </div>
          <div className="flex flex-wrap gap-3">
            <LegendPill tone="default">Published</LegendPill>
            <LegendPill tone="success">Healthy</LegendPill>
            <LegendPill tone="destructive">Failed</LegendPill>
          </div>
        </div>
      </DemoSurface>
    )
  },
  api: [{ name: "tone", type: '"default" | "success" | "destructive" | "accent" | "muted"', defaultValue: '"default"', description: "Semantic color key." }],
  tokens: [{ name: "primary", usage: "Default legend dot color." }],
  accessibility: ["Do not rely on color alone; pair legend indicators with visible text labels."]
});

export const listGroupDoc = createSingleVariationDoc({
  item: componentCatalogBySlug["list-group"],
  whenToUse: ["Use list groups for selectable rows, stacked settings, and inbox-like lightweight navigation."],
  importCode: 'import { ListGroup, ListGroupDescription, ListGroupItem, ListGroupTitle } from "@blackstarzck/ui";',
  variation: {
    id: "list-group-default",
    title: "Selectable rows",
    description: "List groups work well for compact option stacks where one row may be active.",
    controlSummary: "active, title, description",
    code: createDemoCode({
      demoName: "ListGroupDefaultDemo",
      imports: ["ListGroup", "ListGroupDescription", "ListGroupItem", "ListGroupTitle"],
      body: `
<ListGroup className="max-w-md">
  <ListGroupItem active>
    <div className="grid gap-1 text-left">
      <ListGroupTitle>Overview</ListGroupTitle>
      <ListGroupDescription>Current documentation summary.</ListGroupDescription>
    </div>
  </ListGroupItem>
  <ListGroupItem>
    <div className="grid gap-1 text-left">
      <ListGroupTitle>API</ListGroupTitle>
      <ListGroupDescription>Prop reference and usage notes.</ListGroupDescription>
    </div>
  </ListGroupItem>
</ListGroup>`
    }),
    layout: "start",
    preview: (
      <DemoSurface>
        <ListGroup className="max-w-md">
          <ListGroupItem active>
            <div className="grid gap-1 text-left">
              <ListGroupTitle>Overview</ListGroupTitle>
              <ListGroupDescription>Current documentation summary.</ListGroupDescription>
            </div>
          </ListGroupItem>
          <ListGroupItem>
            <div className="grid gap-1 text-left">
              <ListGroupTitle>API</ListGroupTitle>
              <ListGroupDescription>Prop reference and usage notes.</ListGroupDescription>
            </div>
          </ListGroupItem>
        </ListGroup>
      </DemoSurface>
    )
  },
  api: [{ name: "active", type: "boolean", defaultValue: "false", description: "Highlights the selected list item." }],
  tokens: [{ name: "primary-soft", usage: "Active row background." }],
  accessibility: ["Expose the selected state clearly and keep row labels unique."]
});

export const timelineDoc = createSingleVariationDoc({
  item: componentCatalogBySlug.timeline,
  whenToUse: ["Use timelines for ordered events, release history, and activity streams where chronology matters."],
  importCode: 'import { Timeline, TimelineContent, TimelineDescription, TimelineIndicator, TimelineItem, TimelineLine, TimelineRail, TimelineTime, TimelineTitle } from "@blackstarzck/ui";',
  variation: {
    id: "timeline-default",
    title: "Release history",
    description: "Timeline breaks events into ordered items with rail, indicator, and content composition.",
    controlSummary: "rail, indicator, content composition",
    code: createDemoCode({
      demoName: "TimelineDefaultDemo",
      imports: ["Timeline", "TimelineContent", "TimelineDescription", "TimelineIndicator", "TimelineItem", "TimelineLine", "TimelineRail", "TimelineTime", "TimelineTitle"],
      body: `
<Timeline>
  <TimelineItem>
    <TimelineRail>
      <TimelineIndicator />
      <TimelineLine />
    </TimelineRail>
    <TimelineContent>
      <TimelineTime>2026-04-08</TimelineTime>
      <TimelineTitle>Preview published</TimelineTitle>
      <TimelineDescription>Radix-based button docs shipped to the preview app.</TimelineDescription>
    </TimelineContent>
  </TimelineItem>
  <TimelineItem>
    <TimelineRail>
      <TimelineIndicator />
    </TimelineRail>
    <TimelineContent>
      <TimelineTime>2026-04-09</TimelineTime>
      <TimelineTitle>Coverage expanded</TimelineTitle>
      <TimelineDescription>Additional primitives added to the docs catalog.</TimelineDescription>
    </TimelineContent>
  </TimelineItem>
</Timeline>`
    }),
    layout: "start",
    preview: (
      <DemoSurface>
        <Timeline>
          <TimelineItem>
            <TimelineRail>
              <TimelineIndicator />
              <TimelineLine />
            </TimelineRail>
            <TimelineContent>
              <TimelineTime>2026-04-08</TimelineTime>
              <TimelineTitle>Preview published</TimelineTitle>
              <TimelineDescription>Radix-based button docs shipped to the preview app.</TimelineDescription>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineRail>
              <TimelineIndicator />
            </TimelineRail>
            <TimelineContent>
              <TimelineTime>2026-04-09</TimelineTime>
              <TimelineTitle>Coverage expanded</TimelineTitle>
              <TimelineDescription>Additional primitives added to the docs catalog.</TimelineDescription>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </DemoSurface>
    )
  },
  api: [{ name: "children", type: "ReactNode", defaultValue: "required", description: "Compose rail, indicator, time, and content blocks for each item." }],
  tokens: [{ name: "primary", usage: "Indicator color." }],
  accessibility: ["Keep time labels machine-readable and consistent so the chronology is easy to scan."]
});

export const uploadListDoc = createSingleVariationDoc({
  item: componentCatalogBySlug["upload-list"],
  whenToUse: ["Use upload lists when multiple file transfers need progress and status visibility."],
  importCode: 'import { UploadList } from "@blackstarzck/ui";',
  variation: {
    id: "upload-list-default",
    title: "Upload queue",
    description: "UploadList renders progress-aware items with badges and a deterministic progress bar.",
    controlSummary: "items: UploadEntry[]",
    code: createDemoCode({
      demoName: "UploadListDefaultDemo",
      imports: ["UploadList"],
      setup: `
const items = [
  { name: "release-notes.pdf", progress: 100, status: "completed", sizeLabel: "1.2 MB" },
  { name: "preview.png", progress: 68, status: "uploading", sizeLabel: "840 KB" },
  { name: "figma-export.zip", progress: 12, status: "queued", sizeLabel: "4.1 MB" }
]`,
      body: `
<UploadList items={items} />`
    }),
    layout: "start",
    preview: (
      <DemoSurface>
        <UploadList
          items={[
            { name: "release-notes.pdf", progress: 100, status: "completed", sizeLabel: "1.2 MB" },
            { name: "preview.png", progress: 68, status: "uploading", sizeLabel: "840 KB" },
            { name: "figma-export.zip", progress: 12, status: "queued", sizeLabel: "4.1 MB" }
          ]}
        />
      </DemoSurface>
    )
  },
  api: [{ name: "items", type: "UploadEntry[]", defaultValue: "required", description: "Upload entries with name, progress, size, and status." }],
  tokens: [{ name: "success", usage: "Completed badge tone." }],
  accessibility: ["Expose meaningful file names and textual status, not just the progress bar itself."]
});

