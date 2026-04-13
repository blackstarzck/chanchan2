import { ArrowRight, ArrowUpRight, House, LoaderCircle } from "lucide-react";

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
  BrandAvatar,
  BrandAvatarGrid,
  BrandMark,
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
import type { ComponentDoc } from "../component-doc-types";
import { componentCatalogBySlug } from "../registry";
import {
  AccordionActiveContentBorderedPreview,
  AccordionBasicUsagePreview,
  AccordionBorderedPreview,
  AccordionDividerPreview,
  AccordionNestedPreview,
  AccordionNoArrowPreview,
  AccordionStretchedArrowPreview,
  AccordionWithIconAndBadgePreview,
  AvatarPreview,
  BadgePreview,
  ButtonBlockPreview,
  ButtonColorVariantsPreview,
  ButtonExamplesPreview,
  ButtonShapesPreview,
  ButtonSizesPreview,
  ButtonStatesPreview,
  ButtonTypesPreview,
  CheckboxPreview,
  DialogPreview,
  IconButtonColorVariantsPreview,
  IconButtonExamplesPreview,
  IconButtonShapesPreview,
  IconButtonSizesPreview,
  IconButtonStatesPreview,
  IconButtonTypesPreview,
  RadioGroupPreview,
  SelectPreview,
  SidebarPreview,
  SwitchPreview,
  TabsPreview,
  TooltipPreview
} from "./component-doc-previews";

export const buttonDoc: ComponentDoc = {
  ...componentCatalogBySlug.button,
  whenToUse: [
    "Use for primary decisions, form submission, and high-emphasis actions.",
    "Combine variant, tone, size, and shape to cover the broader Preline-style button matrix with one Radix-based primitive."
  ],
  importCode: 'import { Button } from "@blackstarzck/ui";',
  variations: [
    {
      id: "button-variants",
      title: "Types",
      description: "The base button now covers solid, outlined, ghost, soft, link, and white treatments.",
      controlSummary: "variant: default | outline | ghost | soft | link | white",
      code: createDemoCode({
        demoName: "ButtonTypesDemo",
        imports: ["Button"],
        body: `
<div className="flex flex-wrap gap-3">
  <Button>Solid</Button>
  <Button variant="outline">Outlined</Button>
  <Button variant="ghost">Ghost</Button>
  <Button variant="soft">Soft</Button>
  <Button variant="link">Link</Button>
  <Button variant="white">White</Button>
</div>`
      }),
      layout: "start",
      preview: <ButtonTypesPreview />
    },
    {
      id: "button-states",
      title: "States",
      description: "Default, hover, focus, and disabled states shown as dedicated static previews.",
      controlSummary: "default | hover | focus | disabled",
      code: createDemoCode({
        demoName: "ButtonStatesDemo",
        imports: ["Button"],
        body: `
<div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
  <div className="grid gap-3">
    <p className="text-sm font-medium">Default</p>
    <Button>Button</Button>
  </div>
  <div className="grid gap-3">
    <p className="text-sm font-medium">Hover</p>
    <Button className="!bg-blue-700 hover:!bg-blue-700">Button</Button>
  </div>
  <div className="grid gap-3">
    <p className="text-sm font-medium">Focus</p>
    <Button className="ring-2 ring-primary/30 ring-offset-2">Button</Button>
  </div>
  <div className="grid gap-3">
    <p className="text-sm font-medium">Disabled</p>
    <Button disabled>Button</Button>
  </div>
</div>`
      }),
      layout: "start",
      preview: <ButtonStatesPreview />
    },
    {
      id: "button-sizes",
      title: "Sizes",
      description: "Small, default, and large sizes map to the Figma size structure without introducing a second button primitive.",
      controlSummary: "size: sm | default | lg",
      code: createDemoCode({
        demoName: "ButtonSizesDemo",
        imports: ["Button"],
        body: `
<div className="flex flex-wrap items-center gap-3">
  <Button size="sm">Small</Button>
  <Button>Default</Button>
  <Button size="lg">Large</Button>
</div>`
      }),
      layout: "start",
      preview: (
        <ButtonSizesPreview />
      )
    },
    {
      id: "button-shapes",
      title: "Shapes",
      description: "Rounded is the default shell, while pill gives the capsule treatment used in the Figma examples.",
      controlSummary: "shape: default | pill",
      code: createDemoCode({
        demoName: "ButtonShapesDemo",
        imports: ["Button"],
        body: `
<div className="grid gap-6 sm:grid-cols-2">
  <div className="grid gap-3">
    <p className="text-sm font-medium">Rounded</p>
    <Button>Button</Button>
  </div>
  <div className="grid gap-3">
    <p className="text-sm font-medium">Pill</p>
    <Button shape="pill">Button</Button>
  </div>
</div>`
      }),
      layout: "start",
      preview: <ButtonShapesPreview />
    },
    {
      id: "button-color-variants",
      title: "Color variants",
      description: "Tone extends each button style across dark, gray, green, blue, red, yellow, and light palettes.",
      controlSummary: "tone: dark | gray | green | blue | red | yellow | light",
      code: createDemoCode({
        demoName: "ButtonColorVariantsDemo",
        imports: ["Button"],
        setup: `
const toneOptions = [
  { label: "Dark", tone: "dark" },
  { label: "Gray", tone: "gray" },
  { label: "Green", tone: "green" },
  { label: "Blue", tone: "blue" },
  { label: "Red", tone: "red" },
  { label: "Yellow", tone: "yellow" },
  { label: "Light", tone: "light" }
]

const typeOptions = [
  { label: "Solid", variant: "default" },
  { label: "Outlined", variant: "outline" },
  { label: "Ghost", variant: "ghost" },
  { label: "Soft", variant: "soft" },
  { label: "Link", variant: "link" },
  { label: "White", variant: "white" }
]`,
        body: `
<div className="grid gap-6 xl:grid-cols-6">
  {typeOptions.map((typeOption) => (
    <div key={typeOption.variant} className="grid gap-3">
      <p className="text-sm font-medium">{typeOption.label}</p>
      {toneOptions.map((toneOption) => (
        <Button
          key={toneOption.tone}
          variant={typeOption.variant}
          tone={toneOption.tone}
        >
          {toneOption.label}
        </Button>
      ))}
    </div>
  ))}
</div>`
      }),
      layout: "start",
      preview: <ButtonColorVariantsPreview />
    },
    {
      id: "button-block",
      title: "Block buttons",
      description: "Full-width actions mirror the block examples on the Figma page and reuse the same primitive.",
      controlSummary: "className: w-full",
      code: createDemoCode({
        demoName: "ButtonBlockDemo",
        imports: ["Button"],
        body: `
<div className="grid gap-3">
  <Button className="w-full">Default</Button>
  <Button variant="outline" className="w-full">Outline</Button>
</div>`
      }),
      layout: "start",
      preview: <ButtonBlockPreview />
    },
    {
      id: "button-examples",
      title: "Examples",
      description: "Representative patterns from the examples panel: leading icon, trailing icon, paired actions, and a compact utility CTA.",
      controlSummary: "icons, grouped actions, utility CTA",
      code: createDemoCode({
        demoName: "ButtonExamplesDemo",
        extraImports: [
          'import { ArrowRight, ArrowUpRight, House } from "lucide-react"'
        ],
        imports: ["Button"],
        body: `
<div className="grid gap-6 sm:grid-cols-2">
  <div className="grid gap-3">
    <p className="text-sm font-medium">Leading icon</p>
    <Button>
      <House />
      Dashboard
    </Button>
  </div>
  <div className="grid gap-3">
    <p className="text-sm font-medium">Trailing icon</p>
    <Button variant="soft">
      Explore stories
      <ArrowUpRight />
    </Button>
  </div>
  <div className="grid gap-3">
    <p className="text-sm font-medium">Action pair</p>
    <div className="flex flex-wrap gap-3">
      <Button variant="outline">Start free trial</Button>
      <Button>Get started</Button>
    </div>
  </div>
  <div className="grid gap-3">
    <p className="text-sm font-medium">Inline utility</p>
    <Button variant="white" tone="gray">
      View all
      <ArrowRight />
    </Button>
  </div>
</div>`
      }),
      layout: "start",
      preview: <ButtonExamplesPreview />
    }
  ],
  api: [
    {
      name: "variant",
      type: '"default" | "secondary" | "outline" | "ghost" | "destructive" | "success" | "soft" | "link" | "white"',
      defaultValue: '"default"',
      description: "Visual treatment for hierarchy, emphasis, and surface style."
    },
    {
      name: "tone",
      type: '"dark" | "gray" | "green" | "blue" | "red" | "yellow" | "light"',
      defaultValue: '"blue" for primary variants',
      description: "Color family applied across each style."
    },
    {
      name: "size",
      type: '"sm" | "default" | "lg" | "icon-sm" | "icon" | "icon-lg"',
      defaultValue: '"default"',
      description: "Density and icon hit area sizing."
    },
    {
      name: "shape",
      type: '"default" | "pill"',
      defaultValue: '"default"',
      description: "Border radius treatment for rounded and capsule shells."
    }
  ],
  tokens: [
    { name: "primary", usage: "Default tone bridge for high-emphasis actions." },
    { name: "primary-soft", usage: "Soft button background." },
    { name: "border", usage: "Outlined and white button shell." }
  ],
  accessibility: [
    "Always provide visible label text for text buttons.",
    "Keep destructive actions visually distinct and prefer confirmation for irreversible flows."
  ]
};

export const buttonIconsDoc: ComponentDoc = {
  ...componentCatalogBySlug["button-icons"],
  whenToUse: [
    "Use icon buttons for compact toolbars, navigation rails, and repeated command surfaces.",
    "Treat icon buttons as the same Radix-based Button primitive with icon sizes and optional circular shape."
  ],
  importCode:
    'import { Button } from "@blackstarzck/ui";\nimport { House } from "lucide-react";',
  variations: [
    {
      id: "button-icons-types",
      title: "Types",
      description: "Icon buttons share the same style system as text buttons.",
      controlSummary: "variant: default | outline | ghost | soft | link | white",
      code: createDemoCode({
        demoName: "ButtonIconTypesDemo",
        extraImports: ['import { House } from "lucide-react"'],
        imports: ["Button"],
        body: `
<div className="flex flex-wrap gap-3">
  <Button size="icon" aria-label="Solid icon button">
    <House />
  </Button>
  <Button variant="outline" size="icon" aria-label="Outlined icon button">
    <House />
  </Button>
  <Button variant="ghost" size="icon" aria-label="Ghost icon button">
    <House />
  </Button>
  <Button variant="soft" size="icon" aria-label="Soft icon button">
    <House />
  </Button>
  <Button variant="link" size="icon" aria-label="Link icon button">
    <House />
  </Button>
  <Button variant="white" size="icon" aria-label="White icon button">
    <House />
  </Button>
</div>`
      }),
      layout: "start",
      preview: <IconButtonTypesPreview />
    },
    {
      id: "button-icons-states",
      title: "States",
      description: "Default, hover, focus, and disabled states for icon-only actions.",
      controlSummary: "default | hover | focus | disabled",
      code: createDemoCode({
        demoName: "ButtonIconStatesDemo",
        extraImports: ['import { House } from "lucide-react"'],
        imports: ["Button"],
        body: `
<div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
  <div className="grid gap-3">
    <p className="text-sm font-medium">Default</p>
    <Button size="icon" aria-label="Default icon button">
      <House />
    </Button>
  </div>
  <div className="grid gap-3">
    <p className="text-sm font-medium">Hover</p>
    <Button size="icon" aria-label="Hover icon button" className="!bg-blue-700 hover:!bg-blue-700">
      <House />
    </Button>
  </div>
  <div className="grid gap-3">
    <p className="text-sm font-medium">Focus</p>
    <Button size="icon" aria-label="Focused icon button" className="ring-2 ring-primary/30 ring-offset-2">
      <House />
    </Button>
  </div>
  <div className="grid gap-3">
    <p className="text-sm font-medium">Disabled</p>
    <Button size="icon" aria-label="Disabled icon button" disabled>
      <House />
    </Button>
  </div>
</div>`
      }),
      layout: "start",
      preview: <IconButtonStatesPreview />
    },
    {
      id: "button-icons-sizes",
      title: "Sizes",
      description: "Dedicated icon sizes align to the small, default, and large Figma structure.",
      controlSummary: 'size: "icon-sm" | "icon" | "icon-lg"',
      code: createDemoCode({
        demoName: "ButtonIconSizesDemo",
        extraImports: ['import { House } from "lucide-react"'],
        imports: ["Button"],
        body: `
<div className="flex flex-wrap items-end gap-3">
  <Button size="icon-sm" aria-label="Small icon button">
    <House />
  </Button>
  <Button size="icon" aria-label="Default icon button">
    <House />
  </Button>
  <Button size="icon-lg" aria-label="Large icon button">
    <House />
  </Button>
</div>`
      }),
      layout: "start",
      preview: <IconButtonSizesPreview />
    },
    {
      id: "button-icons-shapes",
      title: "Shapes",
      description: "Rounded is the default shell and pill maps to the circled icon button treatment.",
      controlSummary: "shape: default | pill",
      code: createDemoCode({
        demoName: "ButtonIconShapesDemo",
        extraImports: ['import { House } from "lucide-react"'],
        imports: ["Button"],
        body: `
<div className="grid gap-6 sm:grid-cols-2">
  <div className="grid gap-3">
    <p className="text-sm font-medium">Rounded</p>
    <Button size="icon" aria-label="Rounded icon button">
      <House />
    </Button>
  </div>
  <div className="grid gap-3">
    <p className="text-sm font-medium">Circled</p>
    <Button size="icon" shape="pill" aria-label="Circled icon button">
      <House />
    </Button>
  </div>
</div>`
      }),
      layout: "start",
      preview: <IconButtonShapesPreview />
    },
    {
      id: "button-icons-color-variants",
      title: "Color variants",
      description: "The same tone matrix works for icon buttons and keeps the API aligned with the text button primitive.",
      controlSummary: "variant + tone + size=icon",
      code: createDemoCode({
        demoName: "ButtonIconColorVariantsDemo",
        extraImports: ['import { House } from "lucide-react"'],
        imports: ["Button"],
        setup: `
const toneOptions = [
  { label: "Dark", tone: "dark" },
  { label: "Gray", tone: "gray" },
  { label: "Green", tone: "green" },
  { label: "Blue", tone: "blue" },
  { label: "Red", tone: "red" },
  { label: "Yellow", tone: "yellow" },
  { label: "Light", tone: "light" }
]

const typeOptions = [
  { label: "Solid", variant: "default" },
  { label: "Outlined", variant: "outline" },
  { label: "Ghost", variant: "ghost" },
  { label: "Soft", variant: "soft" },
  { label: "Link", variant: "link" },
  { label: "White", variant: "white" }
]`,
        body: `
<div className="grid gap-6 xl:grid-cols-6">
  {typeOptions.map((typeOption) => (
    <div key={typeOption.variant} className="grid gap-3">
      <p className="text-sm font-medium">{typeOption.label}</p>
      {toneOptions.map((toneOption) => (
        <Button
          key={toneOption.tone}
          variant={typeOption.variant}
          tone={toneOption.tone}
          size="icon"
          aria-label={\`\${toneOption.label} \${typeOption.label} icon button\`}
        >
          <House />
        </Button>
      ))}
    </div>
  ))}
</div>`
      }),
      layout: "start",
      preview: <IconButtonColorVariantsPreview />
    },
    {
      id: "button-icons-examples",
      title: "Examples",
      description: "Compact avatar and loading affordances mapped onto the same button shell.",
      controlSummary: "avatars, loading, compact action buttons",
      code: createDemoCode({
        demoName: "ButtonIconExamplesDemo",
        extraImports: ['import { LoaderCircle } from "lucide-react"'],
        imports: ["Button"],
        body: `
<div className="flex flex-wrap gap-3">
  <Button variant="white" tone="gray" size="icon" aria-label="Google account">
    <span className="text-sm font-semibold text-[#ea4335]">G</span>
  </Button>
  <Button variant="white" tone="gray" size="icon" aria-label="Avatar action">
    <span className="flex size-5 items-center justify-center rounded-full bg-amber-100 text-[10px] font-semibold text-amber-700">
      A
    </span>
  </Button>
  <Button variant="white" tone="gray" size="icon" aria-label="Loading state">
    <LoaderCircle className="animate-spin" />
  </Button>
</div>`
      }),
      layout: "start",
      preview: <IconButtonExamplesPreview />
    }
  ],
  api: [
    {
      name: "variant",
      type: '"default" | "secondary" | "outline" | "ghost" | "destructive" | "success" | "soft" | "link" | "white"',
      defaultValue: '"default"',
      description: "Shared with the base Button primitive."
    },
    {
      name: "size",
      type: '"icon-sm" | "icon" | "icon-lg"',
      defaultValue: '"icon"',
      description: "Icon-specific hit areas."
    },
    {
      name: "shape",
      type: '"default" | "pill"',
      defaultValue: '"default"',
      description: "Rounded square or circle."
    },
    {
      name: "aria-label",
      type: "string",
      defaultValue: "required for icon-only buttons",
      description: "Accessible name for icon-only actions."
    }
  ],
  tokens: [
    { name: "primary", usage: "Default filled icon button color." },
    { name: "border", usage: "Outlined and white icon shell." }
  ],
  accessibility: [
    "Always provide an aria-label or accessible text for icon-only buttons.",
    "Prefer icon buttons for compact repeated actions, not critical destructive flows without labels."
  ]
};

export const badgeDoc: ComponentDoc = {
  ...componentCatalogBySlug.badge,
  whenToUse: ["Use badges for compact status, filters, and inline labels without adding button semantics."],
  importCode: 'import { Badge } from "@blackstarzck/ui";',
  variations: [
    {
      id: "badge-variants",
      title: "Variants",
      description: "Default, secondary, outline, success, and destructive treatments cover the common status range.",
      controlSummary: "variant: default | secondary | outline | success | destructive",
      code: createDemoCode({
        demoName: "BadgeVariantsDemo",
        imports: ["Badge"],
        body: `
<div className="flex flex-wrap gap-3">
  <Badge>Default</Badge>
  <Badge variant="secondary">Secondary</Badge>
  <Badge variant="outline">Outline</Badge>
  <Badge variant="success">Success</Badge>
  <Badge variant="destructive">Destructive</Badge>
</div>`
      }),
      layout: "start",
      preview: <BadgePreview />
    }
  ],
  api: [
    {
      name: "variant",
      type: '"default" | "secondary" | "outline" | "success" | "destructive"',
      defaultValue: '"default"',
      description: "Visual styling for inline status emphasis."
    }
  ],
  tokens: [
    { name: "primary-soft", usage: "Default badge background and text bridge." },
    { name: "success", usage: "Success badge foreground." }
  ],
  accessibility: ["Badges should supplement nearby text, not replace the meaning of a full label."]
};

export const avatarDoc: ComponentDoc = {
  ...componentCatalogBySlug.avatar,
  whenToUse: ["Use avatars to represent people, owners, or systems in a compact, repeatable way."],
  importCode: 'import { Avatar, AvatarFallback } from "@blackstarzck/ui";',
  variations: [
    {
      id: "avatar-default",
      title: "Fallback avatar",
      description: "Fallback initials remain useful even when no remote image source exists.",
      controlSummary: "Avatar + AvatarFallback",
      code: createDemoCode({
        demoName: "AvatarDefaultDemo",
        imports: ["Avatar", "AvatarFallback"],
        body: `
<div className="flex items-center gap-4">
  <Avatar>
    <AvatarFallback>CC</AvatarFallback>
  </Avatar>
  <Avatar className="size-12">
    <AvatarFallback>DS</AvatarFallback>
  </Avatar>
</div>`
      }),
      layout: "start",
      preview: <AvatarPreview />
    }
  ],
  api: [
    {
      name: "children",
      type: "ReactNode",
      defaultValue: "required",
      description: "Compose AvatarImage and/or AvatarFallback inside the root."
    }
  ],
  tokens: [
    { name: "secondary", usage: "Avatar shell background." },
    { name: "primary-soft", usage: "Fallback surface for initials." }
  ],
  accessibility: ["Provide descriptive alt text when using AvatarImage for meaningful identity cues."]
};

export const checkboxDoc: ComponentDoc = {
  ...componentCatalogBySlug.checkbox,
  whenToUse: ["Use checkboxes for multi-select settings, tasks, and opt-in acknowledgements."],
  importCode: 'import { Checkbox } from "@blackstarzck/ui";',
  variations: [
    {
      id: "checkbox-default",
      title: "Setting list",
      description: "Compact checkbox rows work well for checklists and grouped publish options.",
      controlSummary: "checked, disabled",
      code: createDemoCode({
        demoName: "CheckboxDefaultDemo",
        imports: ["Checkbox"],
        body: `
<div className="grid gap-4">
  <label className="flex items-center gap-3 text-sm">
    <Checkbox defaultChecked />
    <span>Ship package metadata</span>
  </label>
  <label className="flex items-center gap-3 text-sm">
    <Checkbox />
    <span>Generate changelog</span>
  </label>
  <label className="flex items-center gap-3 text-sm text-muted-foreground">
    <Checkbox disabled />
    <span>Protected option</span>
  </label>
</div>`
      }),
      layout: "start",
      preview: <CheckboxPreview />
    }
  ],
  api: [
    { name: "checked", type: "boolean | 'indeterminate'", defaultValue: "false", description: "Current checked state." },
    { name: "disabled", type: "boolean", defaultValue: "false", description: "Prevents interaction and dims the control." }
  ],
  tokens: [
    { name: "primary", usage: "Checked indicator color." },
    { name: "input", usage: "Unchecked border tone." }
  ],
  accessibility: ["Always pair the checkbox with visible text or an aria-label that explains the choice."]
};

export const radioGroupDoc: ComponentDoc = {
  ...componentCatalogBySlug["radio-group"],
  whenToUse: ["Use radio groups when users must choose exactly one visible option."],
  importCode: 'import { RadioGroup, RadioGroupItem } from "@blackstarzck/ui";',
  variations: [
    {
      id: "radio-group-default",
      title: "Single choice",
      description: "Radio groups keep mutually exclusive release targets visible and comparable.",
      controlSummary: "value, defaultValue, onValueChange",
      code: createDemoCode({
        demoName: "RadioGroupDefaultDemo",
        imports: ["RadioGroup", "RadioGroupItem"],
        body: `
<RadioGroup defaultValue="stable" className="gap-4">
  <label className="flex items-center gap-3 text-sm">
    <RadioGroupItem value="stable" />
    <span>Stable release</span>
  </label>
  <label className="flex items-center gap-3 text-sm">
    <RadioGroupItem value="beta" />
    <span>Beta release</span>
  </label>
  <label className="flex items-center gap-3 text-sm">
    <RadioGroupItem value="canary" />
    <span>Canary release</span>
  </label>
</RadioGroup>`
      }),
      layout: "start",
      preview: <RadioGroupPreview />
    }
  ],
  api: [
    { name: "defaultValue", type: "string", defaultValue: "undefined", description: "Initial selected value." },
    { name: "onValueChange", type: "(value: string) => void", defaultValue: "undefined", description: "Called when the selected option changes." }
  ],
  tokens: [
    { name: "primary", usage: "Selected dot and ring." },
    { name: "input", usage: "Unselected shell border." }
  ],
  accessibility: ["Group related options with clear visible labels so the choice context stays obvious."]
};

export const switchDoc: ComponentDoc = {
  ...componentCatalogBySlug.switch,
  whenToUse: ["Use switches for immediate binary settings where the effect is applied on toggle."],
  importCode: 'import { Switch } from "@blackstarzck/ui";',
  variations: [
    {
      id: "switch-default",
      title: "Preference toggles",
      description: "Switches are best for realtime settings that take effect immediately.",
      controlSummary: "checked, defaultChecked, disabled",
      code: createDemoCode({
        demoName: "SwitchDefaultDemo",
        imports: ["Switch"],
        body: `
<div className="grid gap-4">
  <label className="flex items-center justify-between gap-4 rounded-xl border border-border px-4 py-3">
    <div className="grid gap-1">
      <span className="text-sm font-medium">Realtime sync</span>
      <span className="text-sm text-muted-foreground">Push theme updates while editing.</span>
    </div>
    <Switch defaultChecked />
  </label>
  <label className="flex items-center justify-between gap-4 rounded-xl border border-border px-4 py-3">
    <div className="grid gap-1">
      <span className="text-sm font-medium">Strict mode</span>
      <span className="text-sm text-muted-foreground">Prevent layout regressions during publish.</span>
    </div>
    <Switch />
  </label>
</div>`
      }),
      layout: "start",
      preview: <SwitchPreview />
    }
  ],
  api: [
    { name: "checked", type: "boolean", defaultValue: "false", description: "Controlled on/off state." },
    { name: "defaultChecked", type: "boolean", defaultValue: "false", description: "Initial uncontrolled state." }
  ],
  tokens: [
    { name: "primary", usage: "Checked track color." },
    { name: "input", usage: "Unchecked track color." }
  ],
  accessibility: ["Use a switch only when the label clearly communicates an immediate on/off state."]
};

export const accordionDoc: ComponentDoc = {
  ...componentCatalogBySlug.accordion,
  description:
    "Accordion now maps the Figma _accordion component properties into Radix-based props: toggle icon position, icon family, density, leading icon, badge, divider, bordered surface, and nested content.",
  whenToUse: [
    "Use accordions to progressively reveal content without navigating away from the current page.",
    "Use indicatorPosition and indicatorVariant to cover the plus/minus, chevron, and stretched arrow samples.",
    "Use bordered content and nested accordions for dense FAQ or settings groups."
  ],
  importCode: `import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, Badge } from "@blackstarzck/ui";
import { CircleMinus, CirclePlus, FolderOpen } from "lucide-react";`,
  variationGroups: [
    {
      label: "Figma samples",
      items: [
        { id: "accordion-basic-usage", label: "Basic usage" },
        { id: "accordion-no-arrow", label: "No arrow" },
        { id: "accordion-bordered", label: "Bordered" },
        { id: "accordion-divider", label: "Divider" },
        { id: "accordion-stretched-arrow", label: "Stretched arrow" },
        { id: "accordion-active-content-bordered", label: "Active content bordered" },
        { id: "accordion-nested", label: "Nested" },
        { id: "accordion-icon-badge", label: "Icon and badge" }
      ]
    }
  ],
  variations: [
    {
      id: "accordion-basic-usage",
      title: "Basic usage",
      description: "Compact rows with a start-position plus/minus toggle mirror the first Figma sample group.",
      controlSummary: "density: compact, indicatorPosition: start, divider: false",
      code: createDemoCode({
        demoName: "AccordionBasicUsageDemo",
        imports: ["Accordion", "AccordionContent", "AccordionItem", "AccordionTrigger"],
        body: `
<Accordion type="single" collapsible defaultValue="preline" className="grid max-w-xl gap-5">
  <AccordionItem value="updates" divider={false}>
    <AccordionTrigger density="compact" indicatorPosition="start">
      What does "free updates" include?
    </AccordionTrigger>
  </AccordionItem>
  <AccordionItem value="preline" divider={false}>
    <AccordionTrigger density="compact" indicatorPosition="start">
      Is Preline UI free?
    </AccordionTrigger>
    <AccordionContent>
      Yes, Preline is an open-source project and is copyright 2022 Htmlstream.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="lifetime" divider={false}>
    <AccordionTrigger density="compact" indicatorPosition="start">
      What does "lifetime access" mean?
    </AccordionTrigger>
  </AccordionItem>
</Accordion>`
      }),
      layout: "start",
      preview: <AccordionBasicUsagePreview />
    },
    {
      id: "accordion-no-arrow",
      title: "No arrow",
      description: "The Figma no-arrow sample keeps the content rhythm but removes the toggle icon.",
      controlSummary: "indicatorPosition: none",
      code: createDemoCode({
        demoName: "AccordionNoArrowDemo",
        imports: ["Accordion", "AccordionContent", "AccordionItem", "AccordionTrigger"],
        body: `
<Accordion type="single" collapsible defaultValue="preline" className="grid max-w-xl gap-5">
  <AccordionItem value="updates" divider={false}>
    <AccordionTrigger indicatorPosition="none">
      What does "free updates" include?
    </AccordionTrigger>
  </AccordionItem>
  <AccordionItem value="preline" divider={false}>
    <AccordionTrigger indicatorPosition="none">Is Preline UI free?</AccordionTrigger>
    <AccordionContent inset="none">
      Yes, Preline is an open-source project and is copyright 2022 Htmlstream.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="lifetime" divider={false}>
    <AccordionTrigger indicatorPosition="none">
      What does "lifetime access" mean?
    </AccordionTrigger>
  </AccordionItem>
</Accordion>`
      }),
      layout: "start",
      preview: <AccordionNoArrowPreview />
    },
    {
      id: "accordion-bordered",
      title: "Bordered",
      description: "The bordered sample uses a card shell, item dividers, and active content inside the same surface.",
      controlSummary: "variant: card, divider: true",
      code: createDemoCode({
        demoName: "AccordionBorderedDemo",
        imports: ["Accordion", "AccordionContent", "AccordionItem", "AccordionTrigger"],
        body: `
<Accordion
  type="single"
  collapsible
  defaultValue="preline"
  className="max-w-xl overflow-hidden rounded-2xl border border-border bg-card"
>
  <AccordionItem value="updates" variant="card" divider={false}>
    <AccordionTrigger indicatorPosition="start">
      What does "free updates" include?
    </AccordionTrigger>
  </AccordionItem>
  <AccordionItem value="preline" variant="card">
    <AccordionTrigger indicatorPosition="start">Is Preline UI free?</AccordionTrigger>
    <AccordionContent>
      Yes, Preline is an open-source project and is copyright 2022 Htmlstream.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="lifetime" variant="card">
    <AccordionTrigger indicatorPosition="start">
      What does "lifetime access" mean?
    </AccordionTrigger>
  </AccordionItem>
</Accordion>`
      }),
      layout: "start",
      preview: <AccordionBorderedPreview />
    },
    {
      id: "accordion-divider",
      title: "Divider",
      description: "Divider rows use visible separators and chevron toggle icons from the Figma samples.",
      controlSummary: "divider: true, indicatorVariant: chevron",
      code: createDemoCode({
        demoName: "AccordionDividerDemo",
        imports: ["Accordion", "AccordionContent", "AccordionItem", "AccordionTrigger"],
        body: `
<Accordion type="single" collapsible defaultValue="preline" className="max-w-xl">
  <AccordionItem value="updates" divider={false}>
    <AccordionTrigger indicatorPosition="start" indicatorVariant="chevron">
      What does "free updates" include?
    </AccordionTrigger>
  </AccordionItem>
  <AccordionItem value="preline">
    <AccordionTrigger indicatorPosition="start" indicatorVariant="chevron">
      Is Preline UI free?
    </AccordionTrigger>
    <AccordionContent>
      Yes, Preline is an open-source project and is copyright 2022 Htmlstream.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="lifetime">
    <AccordionTrigger indicatorPosition="start" indicatorVariant="chevron">
      What does "lifetime access" mean?
    </AccordionTrigger>
  </AccordionItem>
</Accordion>`
      }),
      layout: "start",
      preview: <AccordionDividerPreview />
    },
    {
      id: "accordion-stretched-arrow",
      title: "With title and arrow stretched",
      description: "The title and chevron stretch apart when the indicator is moved to the trailing edge.",
      controlSummary: "indicatorPosition: end, indicatorVariant: chevron",
      code: createDemoCode({
        demoName: "AccordionStretchedArrowDemo",
        imports: ["Accordion", "AccordionContent", "AccordionItem", "AccordionTrigger"],
        body: `
<Accordion type="single" collapsible defaultValue="preline" className="max-w-xl">
  <AccordionItem value="updates" divider={false}>
    <AccordionTrigger indicatorPosition="end" indicatorVariant="chevron">
      What does "free updates" include?
    </AccordionTrigger>
  </AccordionItem>
  <AccordionItem value="preline" divider={false}>
    <AccordionTrigger indicatorPosition="end" indicatorVariant="chevron">
      Is Preline UI free?
    </AccordionTrigger>
    <AccordionContent inset="none">
      Yes, Preline is an open-source project and is copyright 2022 Htmlstream.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="lifetime" divider={false}>
    <AccordionTrigger indicatorPosition="end" indicatorVariant="chevron">
      What does "lifetime access" mean?
    </AccordionTrigger>
  </AccordionItem>
</Accordion>`
      }),
      layout: "start",
      preview: <AccordionStretchedArrowPreview />
    },
    {
      id: "accordion-active-content-bordered",
      title: "Active Content bordered",
      description: "The active row can use a bordered body panel while keeping trigger icons and state color.",
      controlSummary: "leading, content variant: bordered",
      code: createDemoCode({
        demoName: "AccordionActiveContentBorderedDemo",
        extraImports: ['import { CircleMinus, CirclePlus } from "lucide-react"'],
        imports: ["Accordion", "AccordionContent", "AccordionItem", "AccordionTrigger"],
        body: `
<Accordion type="single" collapsible defaultValue="preline" className="max-w-xl">
  <AccordionItem value="updates" divider={false}>
    <AccordionTrigger indicatorPosition="end" leading={<CirclePlus className="size-4" />}>
      What does "free updates" include?
    </AccordionTrigger>
  </AccordionItem>
  <AccordionItem value="preline" divider={false}>
    <AccordionTrigger indicatorPosition="end" leading={<CircleMinus className="size-4" />}>
      Is Preline UI free?
    </AccordionTrigger>
    <AccordionContent inset="none" variant="bordered">
      Yes, Preline is an open-source project and is copyright 2022 Htmlstream.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="lifetime" divider={false}>
    <AccordionTrigger indicatorPosition="end" leading={<CirclePlus className="size-4" />}>
      What does "lifetime access" mean?
    </AccordionTrigger>
  </AccordionItem>
</Accordion>`
      }),
      layout: "start",
      preview: <AccordionActiveContentBorderedPreview />
    },
    {
      id: "accordion-nested",
      title: "Nested",
      description: "Nested disclosure rows stay as a docs example rather than a separate component.",
      controlSummary: "nested Accordion composition",
      code: createDemoCode({
        demoName: "AccordionNestedDemo",
        imports: ["Accordion", "AccordionContent", "AccordionItem", "AccordionTrigger"],
        body: `
<Accordion type="single" collapsible defaultValue="preline" className="max-w-xl">
  <AccordionItem value="updates" divider={false}>
    <AccordionTrigger>What does "free updates" include?</AccordionTrigger>
  </AccordionItem>
  <AccordionItem value="preline" divider={false}>
    <AccordionTrigger>Is Preline UI free?</AccordionTrigger>
    <AccordionContent>
      <div className="grid gap-4">
        <p>Yes, Preline is an open-source project and is copyright 2022 Htmlstream.</p>
        <Accordion type="single" collapsible className="max-w-md">
          <AccordionItem value="why" divider={false}>
            <AccordionTrigger density="compact" indicatorPosition="start">
              Why it's free?
            </AccordionTrigger>
          </AccordionItem>
          <AccordionItem value="pro" divider={false}>
            <AccordionTrigger density="compact" indicatorPosition="start">
              Is there a PRO version?
            </AccordionTrigger>
          </AccordionItem>
        </Accordion>
      </div>
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="lifetime" divider={false}>
    <AccordionTrigger>What does "lifetime access" mean?</AccordionTrigger>
  </AccordionItem>
</Accordion>`
      }),
      layout: "start",
      preview: <AccordionNestedPreview />
    },
    {
      id: "accordion-icon-badge",
      title: "Leading icon and badge",
      description: "The Main component exposes leading icon and badge slots, so they stay public props.",
      controlSummary: "leading + badge + indicatorPosition: both",
      code: createDemoCode({
        demoName: "AccordionIconBadgeDemo",
        extraImports: ['import { FolderOpen } from "lucide-react"'],
        imports: ["Accordion", "AccordionItem", "AccordionTrigger", "Badge"],
        body: `
<Accordion type="single" collapsible className="max-w-xl">
  <AccordionItem value="assets" divider={false}>
    <AccordionTrigger
      indicatorPosition="both"
      leading={<FolderOpen className="size-4" />}
      badge={<Badge size="sm" shape="pill" variant="accent">New</Badge>}
    >
      Asset folders and badges
    </AccordionTrigger>
  </AccordionItem>
</Accordion>`
      }),
      layout: "start",
      preview: <AccordionWithIconAndBadgePreview />
    }
  ],
  api: [
    { name: "type", type: '"single" | "multiple"', defaultValue: '"single"', description: "Radix root prop that controls whether one or many items can be expanded." },
    { name: "collapsible", type: "boolean", defaultValue: "false", description: "Radix root prop that allows all items to collapse when using single mode." },
    { name: "indicatorPosition", type: '"start" | "end" | "both" | "none"', defaultValue: '"start"', description: "Maps Figma Leading Toggle Icon and Trailing Toggle Icon visibility." },
    { name: "indicatorVariant", type: '"plus" | "chevron" | "circle"', defaultValue: '"plus"', description: "Maps repeated Figma icon swaps to plus/minus, chevron, or circle icon families." },
    { name: "density", type: '"compact" | "comfortable"', defaultValue: '"comfortable"', description: "Controls trigger row height for compact 24px rows and larger 54-56px rows." },
    { name: "leading", type: "ReactNode", defaultValue: "undefined", description: "Optional leading visual slot from the Figma Leading Icon property." },
    { name: "badge", type: "ReactNode", defaultValue: "undefined", description: "Optional badge slot from the Figma Badge property." },
    { name: "divider", type: "boolean", defaultValue: "true", description: "Controls the item divider from the Figma Divider property." },
    { name: "variant", type: '"plain" | "card"', defaultValue: '"plain"', description: "Controls the item surface used by bordered samples." },
    { name: "inset", type: '"none" | "start"', defaultValue: '"start"', description: "Controls expanded content alignment." },
    { name: "content variant", type: '"plain" | "bordered"', defaultValue: '"plain"', description: "Controls whether active content renders as a bordered panel." }
  ],
  figma: {
    fileKey: "7Nd8Ml5yOREhJjdCDKggf4",
    nodeId: "4305:44881",
    nodeName: "_accordion",
    propRules: [
      "Boolean Figma slots become semantic boolean or position props instead of separate components.",
      "Repeated icon swaps become indicatorVariant, while one-off icon content remains a ReactNode slot.",
      "Nested accordion is kept as composition in docs examples, not a new package component."
    ],
    mappings: [
      { figmaNodeId: "4305:0 / 4305:7", figmaNodeName: "Leading Toggle Icon / Trailing Toggle Icon", reactProp: "indicatorPosition", rule: "Visible start/end toggle slots map to one position enum.", sourceKind: "observed-instance", notes: "Supports start, end, both, and none." },
      { figmaNodeId: "4305:2 / 4305:8", figmaNodeName: "Leading Toggle Icon Swap / Trailing Toggle Swap", reactProp: "indicatorVariant", rule: "Repeated plus/minus and chevron swaps map to a small icon family enum.", sourceKind: "observed-instance", notes: "Custom icons can still be passed through indicator/openIndicator." },
      { figmaNodeId: "4305:3 / 4305:4", figmaNodeName: "Leading Icon / Leading Icon Swap", reactProp: "leading", rule: "Optional visible leading visual becomes a ReactNode slot.", sourceKind: "slot", notes: "Used for folder or circular icon examples." },
      { figmaNodeId: "4305:6", figmaNodeName: "Badge", reactProp: "badge", rule: "Optional badge becomes a ReactNode slot.", sourceKind: "slot", notes: "Keeps Badge reusable instead of hardcoding a badge style in Accordion." },
      { figmaNodeId: "4305:9", figmaNodeName: "Divider", reactProp: "divider", rule: "Divider visibility becomes a boolean item prop.", sourceKind: "observed-instance", notes: "Avoids forcing border seams into every sample." },
      { figmaNodeId: "5701:176912 / 5701:176913", figmaNodeName: "Bordered samples", reactProp: "variant", rule: "Repeated bordered surface becomes an item surface prop.", sourceKind: "observed-instance", notes: "The outer card shell is still composed with className at the docs example level." },
      { figmaNodeId: "5701:176948", figmaNodeName: "Active Content bordered", reactProp: "AccordionContent variant", rule: "Expanded panel treatment becomes a content variant.", sourceKind: "observed-instance", notes: "Kept on content because only the active body changes." }
    ]
  },
  tokens: [
    { name: "card", usage: "Accordion bordered item and active content surface." },
    { name: "border", usage: "Item dividers and bordered shell seams." },
    { name: "primary", usage: "Open trigger and active title color." }
  ],
  accessibility: [
    "Accordion keeps Radix keyboard and ARIA behavior through AccordionPrimitive.Root, Item, Trigger, and Content.",
    "Trigger labels must describe the hidden content because the icon is decorative.",
    "Nested accordions should use clear labels so keyboard users can distinguish parent and child disclosures."
  ]
};


export const brandsAvatarsDoc: ComponentDoc = {
  ...componentCatalogBySlug["brands-avatars"],
  whenToUse: [
    "Use avatar groups when multiple collaborators or assignees need to appear in limited horizontal space.",
    "Treat each Figma Content frame as a separate sample so stack, grid, and overflow patterns stay independently navigable."
  ],
  importCode:
    'import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupItem, AvatarGroupMore, BrandAvatar, BrandAvatarGrid, BrandMark, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, Tooltip, TooltipContent, TooltipTrigger } from "@blackstarzck/ui";',
  variations: [
    {
      id: "brands-and-avatars-brand-marks",
      title: "Brand marks",
      description: "The Figma page includes brand resources as reusable marks, so the docs expose them separately from people avatars.",
      controlSummary: "brand: preline | google | github | slack | react | tailwind | openai",
      code: createDemoCode({
        demoName: "BrandMarksDemo",
        imports: ["BrandAvatarGrid", "BrandMark"],
        body: `
<BrandAvatarGrid>
  <BrandMark brand="preline" showLabel />
  <BrandMark brand="google" showLabel />
  <BrandMark brand="github" showLabel />
  <BrandMark brand="slack" showLabel />
  <BrandMark brand="react" showLabel />
  <BrandMark brand="tailwind" showLabel />
</BrandAvatarGrid>`
      }),
      layout: "start",
      preview: (
        <DemoSurface>
          <BrandAvatarGrid>
            <BrandMark brand="preline" showLabel />
            <BrandMark brand="google" showLabel />
            <BrandMark brand="github" showLabel />
            <BrandMark brand="slack" showLabel />
            <BrandMark brand="react" showLabel />
            <BrandMark brand="tailwind" showLabel />
          </BrandAvatarGrid>
        </DemoSurface>
      )
    },
    {
      id: "brands-and-avatars-people",
      title: "People avatars",
      description: "The same page also contains avatar assets, represented as token-driven avatar initials until local image assets are extracted.",
      controlSummary: "name, fallback, src",
      code: createDemoCode({
        demoName: "BrandAvatarPeopleDemo",
        imports: ["BrandAvatarGrid", "BrandAvatar"],
        body: `
<BrandAvatarGrid className="md:grid-cols-4">
  <BrandAvatar name="Alice Kim" shape="circular" />
  <BrandAvatar name="Min Lee" shape="circular" tone="blue" />
  <BrandAvatar name="Joon Roh" shape="circular" tone="green" />
  <BrandAvatar name="Sora Han" shape="circular" tone="red" />
</BrandAvatarGrid>`
      }),
      layout: "start",
      preview: (
        <DemoSurface>
          <BrandAvatarGrid className="md:grid-cols-4">
            <BrandAvatar name="Alice Kim" shape="circular" />
            <BrandAvatar name="Min Lee" shape="circular" tone="blue" />
            <BrandAvatar name="Joon Roh" shape="circular" tone="green" />
            <BrandAvatar name="Sora Han" shape="circular" tone="red" />
          </BrandAvatarGrid>
        </DemoSurface>
      )
    },
    {
      id: "avatar-group-stacked",
      title: "Stacked avatars",
      description: "The default group overlaps collaborators into one compact presence cluster.",
      controlSummary: "default overlap",
      code: createDemoCode({
        demoName: "AvatarGroupStackedDemo",
        imports: ["Avatar", "AvatarFallback", "AvatarGroup", "AvatarGroupItem"],
        body: `
<AvatarGroup>
  <AvatarGroupItem asChild>
    <Avatar>
      <AvatarFallback>AK</AvatarFallback>
    </Avatar>
  </AvatarGroupItem>
  <AvatarGroupItem asChild>
    <Avatar>
      <AvatarFallback>ML</AvatarFallback>
    </Avatar>
  </AvatarGroupItem>
  <AvatarGroupItem asChild>
    <Avatar>
      <AvatarFallback>JR</AvatarFallback>
    </Avatar>
  </AvatarGroupItem>
</AvatarGroup>`
      }),
      layout: "center",
      preview: (
        <DemoSurface>
          <AvatarGroup>
            <AvatarGroupItem asChild>
              <Avatar>
                <AvatarFallback>AK</AvatarFallback>
              </Avatar>
            </AvatarGroupItem>
            <AvatarGroupItem asChild>
              <Avatar>
                <AvatarFallback>ML</AvatarFallback>
              </Avatar>
            </AvatarGroupItem>
            <AvatarGroupItem asChild>
              <Avatar>
                <AvatarFallback>JR</AvatarFallback>
              </Avatar>
            </AvatarGroupItem>
          </AvatarGroup>
        </DemoSurface>
      )
    },
    {
      id: "avatar-group-grid",
      title: "Grid layout",
      description: "The same primitive can flatten into a grid by removing overlap and using explicit gaps.",
      controlSummary: "space-x-0, grid layout",
      code: createDemoCode({
        demoName: "AvatarGroupGridDemo",
        imports: ["Avatar", "AvatarFallback", "AvatarGroup", "AvatarGroupItem"],
        body: `
<AvatarGroup className="grid grid-cols-3 gap-3 space-x-0">
  <AvatarGroupItem asChild className="ring-0">
    <Avatar className="size-12">
      <AvatarFallback>AK</AvatarFallback>
    </Avatar>
  </AvatarGroupItem>
  <AvatarGroupItem asChild className="ring-0">
    <Avatar className="size-12">
      <AvatarFallback>ML</AvatarFallback>
    </Avatar>
  </AvatarGroupItem>
  <AvatarGroupItem asChild className="ring-0">
    <Avatar className="size-12">
      <AvatarFallback>JR</AvatarFallback>
    </Avatar>
  </AvatarGroupItem>
</AvatarGroup>`
      }),
      layout: "center",
      preview: (
        <DemoSurface>
          <AvatarGroup className="grid grid-cols-3 gap-3 space-x-0">
            <AvatarGroupItem asChild className="ring-0">
              <Avatar className="size-12">
                <AvatarFallback>AK</AvatarFallback>
              </Avatar>
            </AvatarGroupItem>
            <AvatarGroupItem asChild className="ring-0">
              <Avatar className="size-12">
                <AvatarFallback>ML</AvatarFallback>
              </Avatar>
            </AvatarGroupItem>
            <AvatarGroupItem asChild className="ring-0">
              <Avatar className="size-12">
                <AvatarFallback>JR</AvatarFallback>
              </Avatar>
            </AvatarGroupItem>
          </AvatarGroup>
        </DemoSurface>
      )
    },
    {
      id: "avatar-group-border-color",
      title: "Border color",
      description: "Accent rings can reinforce role or team groupings without changing the underlying avatar primitive.",
      controlSummary: "ring color overrides",
      code: createDemoCode({
        demoName: "AvatarGroupBorderColorDemo",
        imports: ["Avatar", "AvatarFallback", "AvatarGroup", "AvatarGroupItem", "AvatarGroupMore"],
        body: `
<AvatarGroup>
  <AvatarGroupItem asChild className="ring-sky-200">
    <Avatar>
      <AvatarFallback>AK</AvatarFallback>
    </Avatar>
  </AvatarGroupItem>
  <AvatarGroupItem asChild className="ring-emerald-200">
    <Avatar>
      <AvatarFallback>ML</AvatarFallback>
    </Avatar>
  </AvatarGroupItem>
  <AvatarGroupItem asChild className="ring-amber-200">
    <Avatar>
      <AvatarFallback>JR</AvatarFallback>
    </Avatar>
  </AvatarGroupItem>
  <AvatarGroupMore className="ring-violet-200">+2</AvatarGroupMore>
</AvatarGroup>`
      }),
      layout: "center",
      preview: (
        <DemoSurface>
          <AvatarGroup>
            <AvatarGroupItem asChild className="ring-sky-200">
              <Avatar>
                <AvatarFallback>AK</AvatarFallback>
              </Avatar>
            </AvatarGroupItem>
            <AvatarGroupItem asChild className="ring-emerald-200">
              <Avatar>
                <AvatarFallback>ML</AvatarFallback>
              </Avatar>
            </AvatarGroupItem>
            <AvatarGroupItem asChild className="ring-amber-200">
              <Avatar>
                <AvatarFallback>JR</AvatarFallback>
              </Avatar>
            </AvatarGroupItem>
            <AvatarGroupMore className="ring-violet-200">+2</AvatarGroupMore>
          </AvatarGroup>
        </DemoSurface>
      )
    },
    {
      id: "avatar-group-tooltip",
      title: "With tooltip",
      description: "Tooltips let each avatar expose a name while the group still stays visually compact.",
      controlSummary: "tooltip trigger around each avatar",
      code: createDemoCode({
        demoName: "AvatarGroupTooltipDemo",
        imports: [
          "Avatar",
          "AvatarFallback",
          "AvatarGroup",
          "AvatarGroupItem",
          "Tooltip",
          "TooltipContent",
          "TooltipTrigger"
        ],
        body: `
<AvatarGroup>
  <Tooltip>
    <TooltipTrigger asChild>
      <AvatarGroupItem asChild>
        <Avatar>
          <AvatarFallback>AK</AvatarFallback>
        </Avatar>
      </AvatarGroupItem>
    </TooltipTrigger>
    <TooltipContent>Alice Kim</TooltipContent>
  </Tooltip>
  <Tooltip>
    <TooltipTrigger asChild>
      <AvatarGroupItem asChild>
        <Avatar>
          <AvatarFallback>ML</AvatarFallback>
        </Avatar>
      </AvatarGroupItem>
    </TooltipTrigger>
    <TooltipContent>Min Lee</TooltipContent>
  </Tooltip>
  <Tooltip>
    <TooltipTrigger asChild>
      <AvatarGroupItem asChild>
        <Avatar>
          <AvatarFallback>JR</AvatarFallback>
        </Avatar>
      </AvatarGroupItem>
    </TooltipTrigger>
    <TooltipContent>Joon Roh</TooltipContent>
  </Tooltip>
</AvatarGroup>`
      }),
      layout: "center",
      preview: (
        <DemoSurface>
          <AvatarGroup>
            <Tooltip>
              <TooltipTrigger asChild>
                <AvatarGroupItem asChild>
                  <Avatar>
                    <AvatarFallback>AK</AvatarFallback>
                  </Avatar>
                </AvatarGroupItem>
              </TooltipTrigger>
              <TooltipContent>Alice Kim</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <AvatarGroupItem asChild>
                  <Avatar>
                    <AvatarFallback>ML</AvatarFallback>
                  </Avatar>
                </AvatarGroupItem>
              </TooltipTrigger>
              <TooltipContent>Min Lee</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <AvatarGroupItem asChild>
                  <Avatar>
                    <AvatarFallback>JR</AvatarFallback>
                  </Avatar>
                </AvatarGroupItem>
              </TooltipTrigger>
              <TooltipContent>Joon Roh</TooltipContent>
            </Tooltip>
          </AvatarGroup>
        </DemoSurface>
      )
    },
    {
      id: "avatar-group-dropdown",
      title: "With dropdown",
      description: "Overflow members can move behind a dropdown trigger while the visible stack stays stable.",
      controlSummary: "overflow trigger, dropdown menu",
      code: createDemoCode({
        demoName: "AvatarGroupDropdownDemo",
        imports: [
          "Avatar",
          "AvatarFallback",
          "AvatarGroup",
          "AvatarGroupItem",
          "AvatarGroupMore",
          "DropdownMenu",
          "DropdownMenuContent",
          "DropdownMenuItem",
          "DropdownMenuTrigger"
        ],
        body: `
<DropdownMenu>
  <AvatarGroup>
    <AvatarGroupItem asChild>
      <Avatar>
        <AvatarFallback>AK</AvatarFallback>
      </Avatar>
    </AvatarGroupItem>
    <AvatarGroupItem asChild>
      <Avatar>
        <AvatarFallback>ML</AvatarFallback>
      </Avatar>
    </AvatarGroupItem>
    <DropdownMenuTrigger asChild>
      <AvatarGroupMore className="cursor-pointer">+3</AvatarGroupMore>
    </DropdownMenuTrigger>
  </AvatarGroup>
  <DropdownMenuContent align="start">
    <DropdownMenuItem>Joon Roh</DropdownMenuItem>
    <DropdownMenuItem>Sora Han</DropdownMenuItem>
    <DropdownMenuItem>Min Park</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`
      }),
      layout: "center",
      preview: (
        <DemoSurface>
          <DropdownMenu>
            <AvatarGroup>
              <AvatarGroupItem asChild>
                <Avatar>
                  <AvatarFallback>AK</AvatarFallback>
                </Avatar>
              </AvatarGroupItem>
              <AvatarGroupItem asChild>
                <Avatar>
                  <AvatarFallback>ML</AvatarFallback>
                </Avatar>
              </AvatarGroupItem>
              <DropdownMenuTrigger asChild>
                <AvatarGroupMore className="cursor-pointer">+3</AvatarGroupMore>
              </DropdownMenuTrigger>
            </AvatarGroup>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>Joon Roh</DropdownMenuItem>
              <DropdownMenuItem>Sora Han</DropdownMenuItem>
              <DropdownMenuItem>Min Park</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </DemoSurface>
      )
    }
  ],
  api: [
    { name: "brand", type: "BrandAvatarName | string", defaultValue: '"preline"', description: "Selects one of the Figma brand resources or falls back to initials for custom brands." },
    { name: "showLabel", type: "boolean", defaultValue: "false", description: "Shows the readable brand label under the mark." },
    { name: "name", type: "string", defaultValue: "required for BrandAvatar", description: "Readable person name used for avatar fallback initials and image alt text." },
    { name: "asChild", type: "boolean", defaultValue: "false", description: "Lets AvatarGroupItem wrap an existing avatar primitive." }
  ],
  tokens: [{ name: "background", usage: "Ring color separating overlapped avatars." }],
  accessibility: [
    "Keep nearby text or labels available so grouped avatars still have identifiable meaning.",
    "If overflow members are hidden behind a dropdown, expose the full member list through the trigger label."
  ]
};

export const blockquoteDoc: ComponentDoc = {
  ...componentCatalogBySlug.blockquote,
  whenToUse: [
    "Use blockquotes for editorial callouts, testimonials, or cited product statements.",
    "Treat each Figma Content frame as one quote sample so size, alignment, and attribution patterns stay independently navigable."
  ],
  importCode: 'import { Avatar, AvatarFallback, Blockquote, BlockquoteCitation } from "@blackstarzck/ui";',
  variations: [
    {
      id: "blockquote-basic",
      title: "Basic usage",
      description: "The default quote emphasizes editorial text without creating a heavier card shell.",
      controlSummary: "default border-left quote",
      code: createDemoCode({
        demoName: "BlockquoteBasicDemo",
        imports: ["Blockquote"],
        body: `
<Blockquote>
  Design systems scale when primitives are shared across docs, product, and tooling.
</Blockquote>`
      }),
      layout: "start",
      preview: (
        <DemoSurface>
          <Blockquote>
            Design systems scale when primitives are shared across docs, product, and tooling.
          </Blockquote>
        </DemoSurface>
      )
    },
    {
      id: "blockquote-small",
      title: "Small",
      description: "Small copy keeps the quote compact inside denser sidebars and list content.",
      controlSummary: "text-xs quote",
      code: createDemoCode({
        demoName: "BlockquoteSmallDemo",
        imports: ["Blockquote"],
        body: `
<Blockquote className="text-xs leading-6">
  Small quotations work well inside cards, notes, and compact side panels.
</Blockquote>`
      }),
      layout: "start",
      preview: (
        <DemoSurface>
          <Blockquote className="text-xs leading-6">
            Small quotations work well inside cards, notes, and compact side panels.
          </Blockquote>
        </DemoSurface>
      )
    },
    {
      id: "blockquote-medium",
      title: "Medium",
      description: "A medium quote size is better suited to body-width editorial examples.",
      controlSummary: "text-base quote",
      code: createDemoCode({
        demoName: "BlockquoteMediumDemo",
        imports: ["Blockquote"],
        body: `
<Blockquote className="text-base leading-7">
  Medium quotes give editorial callouts more presence while preserving the same structure.
</Blockquote>`
      }),
      layout: "start",
      preview: (
        <DemoSurface>
          <Blockquote className="text-base leading-7">
            Medium quotes give editorial callouts more presence while preserving the same structure.
          </Blockquote>
        </DemoSurface>
      )
    },
    {
      id: "blockquote-large",
      title: "Large",
      description: "Large quotes turn the same primitive into a hero-level testimonial or manifesto statement.",
      controlSummary: "text-lg quote",
      code: createDemoCode({
        demoName: "BlockquoteLargeDemo",
        imports: ["Blockquote"],
        body: `
<Blockquote className="text-lg leading-8">
  Large quotes are useful when a product statement should become the focal point of the section.
</Blockquote>`
      }),
      layout: "start",
      preview: (
        <DemoSurface>
          <Blockquote className="text-lg leading-8">
            Large quotes are useful when a product statement should become the focal point of the section.
          </Blockquote>
        </DemoSurface>
      )
    },
    {
      id: "blockquote-right-aligned",
      title: "Right aligned",
      description: "The base primitive can flip to a right-side rule for editorial layouts with asymmetric alignment.",
      controlSummary: "border-right, text-right",
      code: createDemoCode({
        demoName: "BlockquoteRightAlignedDemo",
        imports: ["Blockquote"],
        body: `
<Blockquote className="ml-auto max-w-xl border-l-0 border-r-2 pl-0 pr-4 text-right">
  A right-aligned quote works well in editorial layouts where text and imagery alternate.
</Blockquote>`
      }),
      layout: "start",
      preview: (
        <DemoSurface>
          <Blockquote className="ml-auto max-w-xl border-l-0 border-r-2 pl-0 pr-4 text-right">
            A right-aligned quote works well in editorial layouts where text and imagery alternate.
          </Blockquote>
        </DemoSurface>
      )
    },
    {
      id: "blockquote-source",
      title: "Naming a source",
      description: "Add an explicit citation footer when the quote needs a clear speaker or publication source.",
      controlSummary: "quote body + citation footer",
      code: createDemoCode({
        demoName: "BlockquoteSourceDemo",
        imports: ["Blockquote", "BlockquoteCitation"],
        body: `
<Blockquote>
  Design systems only scale when teams can recognize the same primitive everywhere they work.
  <BlockquoteCitation>Chanchan2 UI Team</BlockquoteCitation>
</Blockquote>`
      }),
      layout: "start",
      preview: (
        <DemoSurface>
          <Blockquote>
            Design systems only scale when teams can recognize the same primitive everywhere they work.
            <BlockquoteCitation>Chanchan2 UI Team</BlockquoteCitation>
          </Blockquote>
        </DemoSurface>
      )
    },
    {
      id: "blockquote-with-avatar",
      title: "With avatar",
      description: "A lightweight author row helps a testimonial feel more grounded without changing the quote primitive itself.",
      controlSummary: "avatar + citation metadata",
      code: createDemoCode({
        demoName: "BlockquoteWithAvatarDemo",
        imports: ["Avatar", "AvatarFallback", "Blockquote", "BlockquoteCitation"],
        body: `
<div className="flex gap-4">
  <Avatar className="mt-1">
    <AvatarFallback>AK</AvatarFallback>
  </Avatar>
  <Blockquote className="flex-1">
    The best primitives disappear into the product while keeping code and design aligned.
    <BlockquoteCitation>Alice Kim 쨌 Product Design</BlockquoteCitation>
  </Blockquote>
</div>`
      }),
      layout: "start",
      preview: (
        <DemoSurface>
          <div className="flex gap-4">
            <Avatar className="mt-1">
              <AvatarFallback>AK</AvatarFallback>
            </Avatar>
            <Blockquote className="flex-1">
              The best primitives disappear into the product while keeping code and design aligned.
              <BlockquoteCitation>Alice Kim 쨌 Product Design</BlockquoteCitation>
            </Blockquote>
          </div>
        </DemoSurface>
      )
    }
  ],
  api: [{ name: "children", type: "ReactNode", defaultValue: "required", description: "Quoted content and optional citation footer." }],
  tokens: [{ name: "border", usage: "Leading rule color." }],
  accessibility: [
    "Keep quotation text and attribution distinct so the source remains obvious.",
    "If the quote is decorative, the surrounding section should still expose the same information in plain text."
  ]
};

export const buttonGroupDoc: ComponentDoc = {
  ...componentCatalogBySlug["button-group"],
  whenToUse: [
    "Use button groups when related actions should read as one control cluster.",
    "Treat each Figma Content frame as a separate sample so grouped layouts, orientation, and utility patterns are all independently visible."
  ],
  importCode: 'import { Button, ButtonGroup } from "@blackstarzck/ui";',
  variations: [
    {
      id: "button-group-attached",
      title: "Attached actions",
      description: "Attached borders create a segmented control feel for mutually related actions.",
      controlSummary: "attached, horizontal",
      code: createDemoCode({
        demoName: "ButtonGroupAttachedDemo",
        imports: ["Button", "ButtonGroup"],
        body: `
<ButtonGroup attached>
  <Button variant="outline">Day</Button>
  <Button variant="outline">Week</Button>
  <Button variant="outline">Month</Button>
</ButtonGroup>`
      }),
      layout: "center",
      preview: (
        <DemoSurface>
          <ButtonGroup attached>
            <Button variant="outline">Day</Button>
            <Button variant="outline">Week</Button>
            <Button variant="outline">Month</Button>
          </ButtonGroup>
        </DemoSurface>
      )
    },
    {
      id: "button-group-topics",
      title: "Topic filters",
      description: "Unattached groups work as compact topic filters while preserving per-button shape and tone.",
      controlSummary: "soft variant, pill shape",
      code: createDemoCode({
        demoName: "ButtonGroupTopicsDemo",
        imports: ["Button", "ButtonGroup"],
        body: `
<ButtonGroup>
  <Button variant="soft" shape="pill">Health</Button>
  <Button variant="soft" shape="pill">Learn</Button>
  <Button variant="soft" shape="pill">Technology</Button>
  <Button variant="soft" shape="pill">Business</Button>
</ButtonGroup>`
      }),
      layout: "center",
      preview: (
        <DemoSurface>
          <ButtonGroup>
            <Button variant="soft" shape="pill">Health</Button>
            <Button variant="soft" shape="pill">Learn</Button>
            <Button variant="soft" shape="pill">Technology</Button>
            <Button variant="soft" shape="pill">Business</Button>
          </ButtonGroup>
        </DemoSurface>
      )
    },
    {
      id: "button-group-vertical",
      title: "Vertical actions",
      description: "Groups can switch to a stacked layout for menus, drawers, and narrow utility panels.",
      controlSummary: "attached, orientation=vertical",
      code: createDemoCode({
        demoName: "ButtonGroupVerticalDemo",
        imports: ["Button", "ButtonGroup"],
        body: `
<ButtonGroup attached orientation="vertical">
  <Button variant="outline">Join meeting</Button>
  <Button variant="outline">New recording</Button>
  <Button variant="outline">Share link</Button>
</ButtonGroup>`
      }),
      layout: "center",
      preview: (
        <DemoSurface>
          <ButtonGroup attached orientation="vertical">
            <Button variant="outline">Join meeting</Button>
            <Button variant="outline">New recording</Button>
            <Button variant="outline">Share link</Button>
          </ButtonGroup>
        </DemoSurface>
      )
    },
    {
      id: "button-group-split",
      title: "Split actions",
      description: "Mixed-width groups support a primary CTA followed by a secondary follow-up action.",
      controlSummary: "attached, mixed-width children",
      code: createDemoCode({
        demoName: "ButtonGroupSplitDemo",
        extraImports: ['import { ArrowUpRight } from "lucide-react"'],
        imports: ["Button", "ButtonGroup"],
        body: `
<ButtonGroup attached>
  <Button className="min-w-44 justify-between">
    Explore stories
    <ArrowUpRight />
  </Button>
  <Button variant="outline">See all</Button>
</ButtonGroup>`
      }),
      layout: "center",
      preview: (
        <DemoSurface>
          <ButtonGroup attached>
            <Button className="min-w-44 justify-between">
              Explore stories
              <ArrowUpRight />
            </Button>
            <Button variant="outline">See all</Button>
          </ButtonGroup>
        </DemoSurface>
      )
    },
    {
      id: "button-group-icon-pair",
      title: "Icon pair",
      description: "Grouped icon buttons are useful for paired utility actions inside dense toolbars.",
      controlSummary: "attached, size=icon",
      code: createDemoCode({
        demoName: "ButtonGroupIconPairDemo",
        extraImports: ['import { ArrowUpRight, House } from "lucide-react"'],
        imports: ["Button", "ButtonGroup"],
        body: `
<ButtonGroup attached>
  <Button variant="outline" size="icon" aria-label="Open home">
    <House />
  </Button>
  <Button variant="outline" size="icon" aria-label="Open external link">
    <ArrowUpRight />
  </Button>
</ButtonGroup>`
      }),
      layout: "center",
      preview: (
        <DemoSurface>
          <ButtonGroup attached>
            <Button variant="outline" size="icon" aria-label="Open home">
              <House />
            </Button>
            <Button variant="outline" size="icon" aria-label="Open external link">
              <ArrowUpRight />
            </Button>
          </ButtonGroup>
        </DemoSurface>
      )
    },
    {
      id: "button-group-utility",
      title: "Utility CTA",
      description: "A compact utility pair can mix a text action with a lightweight supporting follow-up.",
      controlSummary: "horizontal utility group",
      code: createDemoCode({
        demoName: "ButtonGroupUtilityDemo",
        imports: ["Button", "ButtonGroup"],
        body: `
<ButtonGroup>
  <Button variant="ghost">Open roadmap</Button>
  <Button variant="outline">Request access</Button>
</ButtonGroup>`
      }),
      layout: "center",
      preview: (
        <DemoSurface>
          <ButtonGroup>
            <Button variant="ghost">Open roadmap</Button>
            <Button variant="outline">Request access</Button>
          </ButtonGroup>
        </DemoSurface>
      )
    }
  ],
  api: [
    { name: "attached", type: "boolean", defaultValue: "false", description: "Collapses adjacent button borders into one control cluster." },
    { name: "orientation", type: '"horizontal" | "vertical"', defaultValue: '"horizontal"', description: "Switches layout direction for grouped actions." }
  ],
  tokens: [{ name: "border", usage: "Shared button seams when attached." }],
  accessibility: [
    "Use grouped actions only when the controls are meaningfully related and ordered.",
    "If a group behaves like a segmented control, mark the active choice visually and in the surrounding copy."
  ]
};

export const inputGroupDoc: ComponentDoc = {
  ...componentCatalogBySlug["input-group"],
  whenToUse: [
    "Use input groups when a field needs fixed leading or trailing context like units, domains, or actions.",
    "Treat each Figma Content frame as one sample so icon, addon, and control combinations stay independently navigable."
  ],
  importCode:
    'import { Button, Checkbox, InputGroup, InputGroupAddon, InputGroupField } from "@blackstarzck/ui";\nimport { ArrowRight, House } from "lucide-react";',
  variations: [
    {
      id: "input-group-url",
      title: "Leading and trailing addons",
      description: "Static domain fragments are the simplest grouped field pattern.",
      controlSummary: "start addon, end addon",
      code: createDemoCode({
        demoName: "InputGroupUrlDemo",
        imports: ["InputGroup", "InputGroupAddon", "InputGroupField"],
        body: `
<InputGroup className="max-w-md">
  <InputGroupAddon>https://</InputGroupAddon>
  <InputGroupField placeholder="docs.chanchan2.dev" />
  <InputGroupAddon side="end">.dev</InputGroupAddon>
</InputGroup>`
      }),
      layout: "start",
      preview: (
        <DemoSurface>
          <InputGroup className="max-w-md">
            <InputGroupAddon>https://</InputGroupAddon>
            <InputGroupField placeholder="docs.chanchan2.dev" />
            <InputGroupAddon side="end">.dev</InputGroupAddon>
          </InputGroup>
        </DemoSurface>
      )
    },
    {
      id: "input-group-leading-icon",
      title: "Leading icon",
      description: "A leading icon makes the field purpose recognizable without changing the input primitive.",
      controlSummary: "start icon addon",
      code: createDemoCode({
        demoName: "InputGroupLeadingIconDemo",
        extraImports: ['import { House } from "lucide-react"'],
        imports: ["InputGroup", "InputGroupAddon", "InputGroupField"],
        body: `
<InputGroup className="max-w-md">
  <InputGroupAddon>
    <House className="size-4" />
  </InputGroupAddon>
  <InputGroupField placeholder="Enter a homepage URL" />
</InputGroup>`
      }),
      layout: "start",
      preview: (
        <DemoSurface>
          <InputGroup className="max-w-md">
            <InputGroupAddon>
              <House className="size-4" />
            </InputGroupAddon>
            <InputGroupField placeholder="Enter a homepage URL" />
          </InputGroup>
        </DemoSurface>
      )
    },
    {
      id: "input-group-trailing-icon",
      title: "Trailing icon",
      description: "A trailing icon works well for fields that imply continuation or a jump to another flow.",
      controlSummary: "end icon addon",
      code: createDemoCode({
        demoName: "InputGroupTrailingIconDemo",
        extraImports: ['import { ArrowRight } from "lucide-react"'],
        imports: ["InputGroup", "InputGroupAddon", "InputGroupField"],
        body: `
<InputGroup className="max-w-md">
  <InputGroupField placeholder="Invite teammate by email" />
  <InputGroupAddon side="end">
    <ArrowRight className="size-4" />
  </InputGroupAddon>
</InputGroup>`
      }),
      layout: "start",
      preview: (
        <DemoSurface>
          <InputGroup className="max-w-md">
            <InputGroupField placeholder="Invite teammate by email" />
            <InputGroupAddon side="end">
              <ArrowRight className="size-4" />
            </InputGroupAddon>
          </InputGroup>
        </DemoSurface>
      )
    },
    {
      id: "input-group-action",
      title: "Inline action",
      description: "A grouped button keeps submit or search actions visually attached to the field.",
      controlSummary: "input + end button",
      code: createDemoCode({
        demoName: "InputGroupActionDemo",
        imports: ["Button", "InputGroup", "InputGroupField"],
        body: `
<div className="flex max-w-md gap-2">
  <InputGroup className="flex-1">
    <InputGroupField placeholder="Search command" />
  </InputGroup>
  <Button>Search</Button>
</div>`
      }),
      layout: "start",
      preview: (
        <DemoSurface>
          <div className="flex max-w-md gap-2">
            <InputGroup className="flex-1">
              <InputGroupField placeholder="Search command" />
            </InputGroup>
            <Button>Search</Button>
          </div>
        </DemoSurface>
      )
    },
    {
      id: "input-group-checkbox",
      title: "Checkbox addon",
      description: "An addon can host a selection control when the field depends on a compact prefixed option.",
      controlSummary: "checkbox inside addon",
      code: createDemoCode({
        demoName: "InputGroupCheckboxDemo",
        imports: ["Checkbox", "InputGroup", "InputGroupAddon", "InputGroupField"],
        body: `
<InputGroup className="max-w-md">
  <InputGroupAddon>
    <Checkbox aria-label="Use exact match" />
  </InputGroupAddon>
  <InputGroupField placeholder="Search exact token name" />
</InputGroup>`
      }),
      layout: "start",
      preview: (
        <DemoSurface>
          <InputGroup className="max-w-md">
            <InputGroupAddon>
              <Checkbox aria-label="Use exact match" />
            </InputGroupAddon>
            <InputGroupField placeholder="Search exact token name" />
          </InputGroup>
        </DemoSurface>
      )
    }
  ],
  api: [
    { name: "side", type: '"start" | "end"', defaultValue: '"start"', description: "Controls which edge an addon attaches to." }
  ],
  tokens: [{ name: "input", usage: "Shared shell border tone." }],
  accessibility: [
    "Do not use addons as the only field label; the field purpose still needs explicit context.",
    "If the addon contains an interactive control, keep its focus order and label explicit."
  ]
};

export const navsDoc: ComponentDoc = {
  ...componentCatalogBySlug.navs,
  whenToUse: [
    "Use navs for lightweight section wayfinding when a full tabs implementation is unnecessary.",
    "Treat each Figma Content frame as one sample so inline, vertical, underline, and badge patterns remain independently scannable."
  ],
  importCode: 'import { Badge, Navs, NavsLink } from "@blackstarzck/ui";\nimport { House } from "lucide-react";',
  variations: [
    {
      id: "navs-basic",
      title: "Basic usage",
      description: "The base nav primitive renders lightweight pills backed by real links.",
      controlSummary: "active links, anchor-based navigation",
      code: createDemoCode({
        demoName: "NavsBasicDemo",
        imports: ["Navs", "NavsLink"],
        body: `
<Navs>
  <NavsLink href="#overview" active>Overview</NavsLink>
  <NavsLink href="#api">API</NavsLink>
  <NavsLink href="#examples">Examples</NavsLink>
</Navs>`
      }),
      layout: "start",
      preview: (
        <DemoSurface>
          <Navs>
            <NavsLink href="#overview" active>
              Overview
            </NavsLink>
            <NavsLink href="#api">API</NavsLink>
            <NavsLink href="#examples">Examples</NavsLink>
          </Navs>
        </DemoSurface>
      )
    },
    {
      id: "navs-underline",
      title: "Tabs with underline",
      description: "Underline tabs keep the same link model while shifting the active affordance to the border.",
      controlSummary: "underline active state",
      code: createDemoCode({
        demoName: "NavsUnderlineDemo",
        imports: ["Navs", "NavsLink"],
        body: `
<Navs className="w-[854px] max-w-full" variant="bordered" fill="equal">
  <NavsLink href="#overview" active>
    Overview
  </NavsLink>
  <NavsLink href="#api">API</NavsLink>
  <NavsLink href="#examples">Examples</NavsLink>
</Navs>`
      }),
      layout: "start",
      preview: (
        <DemoSurface>
          <Navs className="w-[854px] max-w-full" variant="bordered" fill="equal">
            <NavsLink href="#overview" active>
              Overview
            </NavsLink>
            <NavsLink href="#api">API</NavsLink>
            <NavsLink href="#examples">Examples</NavsLink>
          </Navs>
        </DemoSurface>
      )
    },
    {
      id: "navs-icons",
      title: "With icons",
      description: "Icons can sit alongside labels without changing the underlying navigation semantics.",
      controlSummary: "icon + label links",
      code: createDemoCode({
        demoName: "NavsIconsDemo",
        extraImports: ['import { House } from "lucide-react"'],
        imports: ["Navs", "NavsLink"],
        body: `
<Navs>
  <NavsLink href="#home" active>
    <House className="size-4" />
    Home
  </NavsLink>
  <NavsLink href="#projects">Projects</NavsLink>
  <NavsLink href="#settings">Settings</NavsLink>
</Navs>`
      }),
      layout: "start",
      preview: (
        <DemoSurface>
          <Navs>
            <NavsLink href="#home" active>
              <House className="size-4" />
              Home
            </NavsLink>
            <NavsLink href="#projects">Projects</NavsLink>
            <NavsLink href="#settings">Settings</NavsLink>
          </Navs>
        </DemoSurface>
      )
    },
    {
      id: "navs-badges",
      title: "With badges",
      description: "Badges let a nav communicate pending work without becoming a separate filter control.",
      controlSummary: "badges inside nav labels",
      code: createDemoCode({
        demoName: "NavsBadgesDemo",
        imports: ["Badge", "Navs", "NavsLink"],
        body: `
<Navs className="w-[854px] max-w-full" variant="bordered" fill="equal">
  <NavsLink href="#profile" active>Profile</NavsLink>
  <NavsLink href="#teams">Teams</NavsLink>
  <NavsLink href="#projects" state="hover">
    Projects
    <Badge variant="accent" size="sm">3</Badge>
  </NavsLink>
  <NavsLink href="#connections" disabled>Connections</NavsLink>
</Navs>`
      }),
      layout: "start",
      preview: (
        <DemoSurface>
          <Navs className="w-[854px] max-w-full" variant="bordered" fill="equal">
            <NavsLink href="#profile" active>
              Profile
            </NavsLink>
            <NavsLink href="#teams">Teams</NavsLink>
            <NavsLink href="#projects" state="hover">
              Projects
              <Badge size="sm" variant="accent">
                3
              </Badge>
            </NavsLink>
            <NavsLink href="#connections" disabled>
              Connections
            </NavsLink>
          </Navs>
        </DemoSurface>
      )
    },
    {
      id: "navs-vertical",
      title: "Vertical",
      description: "A vertical stack works well in side panels where local sections need lighter affordances than a full sidebar.",
      controlSummary: "vertical link stack",
      code: createDemoCode({
        demoName: "NavsVerticalDemo",
        imports: ["Navs", "NavsLink"],
        body: `
<Navs className="max-w-52" orientation="vertical">
  <NavsLink href="#general" active>General</NavsLink>
  <NavsLink href="#members">Members</NavsLink>
  <NavsLink href="#billing">Billing</NavsLink>
</Navs>`
      }),
      layout: "start",
      preview: (
        <DemoSurface>
          <Navs className="max-w-52" orientation="vertical">
            <NavsLink href="#general" active>General</NavsLink>
            <NavsLink href="#members">Members</NavsLink>
            <NavsLink href="#billing">Billing</NavsLink>
          </Navs>
        </DemoSurface>
      )
    },
    {
      id: "navs-fill",
      title: "Fill and justify",
      description: "Equal-width links are useful for dashboard top bars and segmented navigation rows.",
      controlSummary: "equal-width nav items",
      code: createDemoCode({
        demoName: "NavsFillDemo",
        imports: ["Navs", "NavsLink"],
        body: `
<Navs fill="equal">
  <NavsLink href="#overview" active>Overview</NavsLink>
  <NavsLink href="#members">Members</NavsLink>
  <NavsLink href="#activity">Activity</NavsLink>
</Navs>`
      }),
      layout: "start",
      preview: (
        <DemoSurface>
          <Navs fill="equal">
            <NavsLink href="#overview" active>Overview</NavsLink>
            <NavsLink href="#members">Members</NavsLink>
            <NavsLink href="#activity">Activity</NavsLink>
          </Navs>
        </DemoSurface>
      )
    }
  ],
  api: [
    { name: "variant", type: '"default" | "bordered"', defaultValue: '"default"', description: "Switches between pill-style navigation and the bordered tab row extracted from Figma." },
    { name: "orientation", type: '"horizontal" | "vertical"', defaultValue: '"horizontal"', description: "Changes the nav layout direction without hand-authored flex utility overrides." },
    { name: "fill", type: '"fit" | "equal"', defaultValue: '"fit"', description: "Controls whether links hug content or distribute evenly across the row." },
    { name: "active", type: "boolean", defaultValue: "false", description: "Marks the currently selected navigation link." },
    { name: "state", type: '"default" | "hover"', defaultValue: '"default"', description: "Allows docs and previews to render the Figma hover state without relying on pointer interaction." },
    { name: "disabled", type: "boolean", defaultValue: "false", description: "Matches the disabled nav state with lowered opacity and disabled focus/navigation." }
  ],
  tokens: [
    { name: "border", usage: "Bottom rail and inactive tab indicators in the bordered variant." },
    { name: "primary", usage: "Active tab label color in the bordered variant." },
    { name: "accent", usage: "Small count badge surface and text colors." }
  ],
  accessibility: [
    "Keep nav links URL-backed so state can be shared and restored.",
    "If the nav behaves like tabs, the surrounding heading should still explain what content changes below."
  ]
};

export const inputDoc: ComponentDoc = {
  ...componentCatalogBySlug.input,
  whenToUse: ["Use for short, structured text input.", "Pair with helper text and validation messaging outside the field."],
  importCode: 'import { Input } from "@blackstarzck/ui";',
  variations: [
    {
      id: "input-default",
      title: "Default input",
      description: "Base input shell for compact forms and filter bars.",
      controlSummary: "type, placeholder, disabled, readOnly",
      code: createDemoCode({
        demoName: "InputDefaultDemo",
        imports: ["Input"],
        body: `
<div className="grid gap-3">
  <Input placeholder="Search components" />
  <Input defaultValue="button" />
</div>`
      }),
      layout: "start",
      preview: (
        <DemoSurface>
          <div className="grid gap-3">
            <Input placeholder="Search components" />
            <Input defaultValue="button" />
          </div>
        </DemoSurface>
      )
    }
  ],
  api: [
    { name: "placeholder", type: "string", defaultValue: "undefined", description: "Hint shown before value entry." },
    { name: "disabled", type: "boolean", defaultValue: "false", description: "Disables interaction and focus." }
  ],
  tokens: [
    { name: "input", usage: "Border tone for default input shell." },
    { name: "ring", usage: "Focus outline color." }
  ],
  accessibility: ["Associate a visible label externally.", "Do not rely on placeholder text as the only label."]
};

export const selectDoc: ComponentDoc = {
  ...componentCatalogBySlug.select,
  whenToUse: ["Use when the choice set is known and small.", "Prefer radio groups when every option must stay visible."],
  importCode: 'import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@blackstarzck/ui";',
  variations: [
    {
      id: "select-default",
      title: "Default select",
      description: "Radix-driven trigger and popover content styled by semantic tokens.",
      controlSummary: "value, onValueChange, placeholder",
      code: createDemoCode({
        demoName: "SelectDefaultDemo",
        imports: ["Select", "SelectContent", "SelectItem", "SelectTrigger", "SelectValue"],
        body: `
<div className="grid gap-3">
  <p className="text-sm font-medium">Package tier</p>
  <Select defaultValue="starter">
    <SelectTrigger>
      <SelectValue placeholder="Choose a tier" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="starter">Starter</SelectItem>
      <SelectItem value="growth">Growth</SelectItem>
      <SelectItem value="scale">Scale</SelectItem>
    </SelectContent>
  </Select>
</div>`
      }),
      layout: "start",
      preview: <SelectPreview />
    }
  ],
  api: [
    { name: "value", type: "string", defaultValue: "undefined", description: "Current selected option." },
    { name: "onValueChange", type: "(value: string) => void", defaultValue: "undefined", description: "Selection change handler." }
  ],
  tokens: [
    { name: "popover", usage: "Menu surface background." },
    { name: "accent", usage: "Focused option background." }
  ],
  accessibility: ["Provide a placeholder or external label.", "Ensure options are concise and keyboard order is predictable."]
};

export const dialogDoc: ComponentDoc = {
  ...componentCatalogBySlug.dialog,
  whenToUse: ["Use for disruptive confirmation, blocking tasks, or focused subflows."],
  importCode: 'import { Dialog, DialogContent, DialogTrigger } from "@blackstarzck/ui";',
  variations: [
    {
      id: "dialog-default",
      title: "Confirmation dialog",
      description: "Primary trigger plus structured header, description, and footer actions.",
      controlSummary: "open, onOpenChange, modal",
      code: createDemoCode({
        demoName: "DialogDefaultDemo",
        imports: [
          "Button",
          "Dialog",
          "DialogContent",
          "DialogDescription",
          "DialogFooter",
          "DialogHeader",
          "DialogTitle",
          "DialogTrigger"
        ],
        body: `
<Dialog>
  <DialogTrigger asChild>
    <Button>Open release dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Ship the next package version?</DialogTitle>
      <DialogDescription>
        Confirm the changelog, tags, and registry target before publishing.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button variant="outline">Cancel</Button>
      <Button>Publish</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`
      }),
      layout: "center",
      preview: <DialogPreview />
    }
  ],
  api: [
    { name: "open", type: "boolean", defaultValue: "uncontrolled", description: "Controlled visibility state." },
    { name: "onOpenChange", type: "(open: boolean) => void", defaultValue: "undefined", description: "Open-state callback." }
  ],
  tokens: [
    { name: "popover", usage: "Dialog surface background." },
    { name: "border", usage: "Dialog outline and separators." }
  ],
  accessibility: ["Dialog title and description should describe the action clearly.", "Return focus to the trigger after close."]
};

export const tabsDoc: ComponentDoc = {
  ...componentCatalogBySlug.tabs,
  whenToUse: ["Use for peer sections within a stable context.", "Avoid tabs when each section needs deep independent navigation."],
  importCode: 'import { Tabs, TabsContent, TabsList, TabsTrigger } from "@blackstarzck/ui";',
  variations: [
    {
      id: "tabs-default",
      title: "Section tabs",
      description: "Compact segmentation for settings, docs subsections, and inspectors.",
      controlSummary: "defaultValue, value, orientation",
      code: createDemoCode({
        demoName: "TabsDefaultDemo",
        imports: ["Tabs", "TabsContent", "TabsList", "TabsTrigger"],
        body: `
<Tabs defaultValue="overview" className="w-full">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="tokens">Tokens</TabsTrigger>
    <TabsTrigger value="api">API</TabsTrigger>
  </TabsList>
  <TabsContent value="overview" className="text-sm text-muted-foreground">
    Variation grids and API tables can live in separate tab panels for dense tools.
  </TabsContent>
  <TabsContent value="tokens" className="text-sm text-muted-foreground">
    Tokens remain global, while props can override local behavior.
  </TabsContent>
  <TabsContent value="api" className="text-sm text-muted-foreground">
    This pattern is useful for docs sections and settings inspectors.
  </TabsContent>
</Tabs>`
      }),
      layout: "start",
      preview: <TabsPreview />
    }
  ],
  api: [
    { name: "defaultValue", type: "string", defaultValue: "undefined", description: "Initial active tab." },
    { name: "value", type: "string", defaultValue: "uncontrolled", description: "Controlled active tab." }
  ],
  tokens: [
    { name: "secondary", usage: "Tabs list background." },
    { name: "primary-soft", usage: "Active tab emphasis." }
  ],
  accessibility: ["Tab labels must describe the resulting panel.", "Panels should stay lightweight and scannable."]
};

export const tableDoc: ComponentDoc = {
  ...componentCatalogBySlug.table,
  whenToUse: ["Use for dense, comparable datasets.", "Move to cards on smaller screens when row scanning breaks down."],
  importCode: 'import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@blackstarzck/ui";',
  variations: [
    {
      id: "table-default",
      title: "Audit table",
      description: "Simple semantic table for release checks and registry snapshots.",
      controlSummary: "columns, captions, responsive layout",
      code: createDemoCode({
        demoName: "TableDefaultDemo",
        imports: ["Table", "TableBody", "TableCell", "TableHead", "TableHeader", "TableRow"],
        body: `
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Package</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Owner</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>@blackstarzck/ui</TableCell>
      <TableCell>Published</TableCell>
      <TableCell>Docs</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>@blackstarzck/tokens</TableCell>
      <TableCell>Published</TableCell>
      <TableCell>Design</TableCell>
    </TableRow>
  </TableBody>
</Table>`
      }),
      layout: "start",
      preview: (
        <DemoSurface>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Package</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Owner</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow><TableCell>@blackstarzck/ui</TableCell><TableCell>Published</TableCell><TableCell>Docs</TableCell></TableRow>
              <TableRow><TableCell>@blackstarzck/tokens</TableCell><TableCell>Published</TableCell><TableCell>Design</TableCell></TableRow>
            </TableBody>
          </Table>
        </DemoSurface>
      )
    }
  ],
  api: [
    { name: "children", type: "ReactNode", defaultValue: "required", description: "Semantic header/body rows." }
  ],
  tokens: [
    { name: "border", usage: "Row dividers and outline." },
    { name: "muted-foreground", usage: "Secondary column labels." }
  ],
  accessibility: ["Keep column headers concise and explicit.", "Do not overload tables with form controls unless row focus is designed."]
};

export const tooltipDoc: ComponentDoc = {
  ...componentCatalogBySlug.tooltip,
  whenToUse: ["Use for short hints that support, not replace, visible UI labels."],
  importCode: 'import { Tooltip, TooltipContent, TooltipTrigger } from "@blackstarzck/ui";',
  variations: [
    {
      id: "tooltip-default",
      title: "Inline help",
      description: "Short contextual help for icon-only or compressed controls.",
      controlSummary: "delayDuration, side, align",
      code: createDemoCode({
        demoName: "TooltipDefaultDemo",
        imports: ["Button", "Tooltip", "TooltipContent", "TooltipTrigger"],
        body: `
<div className="flex gap-3">
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline">Publish</Button>
    </TooltipTrigger>
    <TooltipContent>Pushes the release workflow after merge.</TooltipContent>
  </Tooltip>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="ghost">Token</Button>
    </TooltipTrigger>
    <TooltipContent>Opens semantic token details.</TooltipContent>
  </Tooltip>
</div>`
      }),
      layout: "start",
        preview: <TooltipPreview />
    }
  ],
  api: [
    { name: "side", type: '"top" | "right" | "bottom" | "left"', defaultValue: '"top"', description: "Preferred content placement." }
  ],
  tokens: [
    { name: "popover", usage: "Tooltip surface background." }
  ],
  accessibility: ["Tooltip content must remain supplementary.", "Critical information should be visible without hover."]
};

export const sidebarDoc: ComponentDoc = {
  ...componentCatalogBySlug.sidebar,
  whenToUse: ["Use for persistent app-level or docs-level navigation on wider screens."],
  importCode: 'import { Sidebar, SidebarContent, SidebarItem } from "@blackstarzck/ui";',
  variations: [
    {
      id: "sidebar-default",
      title: "Navigation rail",
      description: "Composable sections and active items for multi-level docs or products.",
      controlSummary: "active, inset, arbitrary children",
      code: createDemoCode({
        demoName: "SidebarDefaultDemo",
        imports: [
          "Sidebar",
          "SidebarContent",
          "SidebarHeader",
          "SidebarItem",
          "SidebarList",
          "SidebarSection",
          "SidebarSectionTitle"
        ],
        body: `
<Sidebar className="max-w-none shadow-none">
  <SidebarHeader>
    <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
      Components
    </p>
    <h3 className="text-base font-semibold">Navigation</h3>
  </SidebarHeader>
  <SidebarContent>
    <SidebarSection>
      <SidebarSectionTitle>Main</SidebarSectionTitle>
      <SidebarList>
        <SidebarItem active>Overview</SidebarItem>
        <SidebarItem>Button</SidebarItem>
        <SidebarItem>Dialog</SidebarItem>
      </SidebarList>
    </SidebarSection>
  </SidebarContent>
</Sidebar>`
      }),
      layout: "start",
      preview: <SidebarPreview />
    }
  ],
  api: [
    { name: "active", type: "boolean", defaultValue: "false", description: "Highlights an active item." },
    { name: "inset", type: "boolean", defaultValue: "false", description: "Offsets nested items." }
  ],
  tokens: [
    { name: "card", usage: "Sidebar panel background." },
    { name: "primary-soft", usage: "Active row background." }
  ],
  accessibility: ["Preserve clear active state and keyboard focus order.", "Collapse or drawer this pattern on small screens."]
};

export const progressDoc: ComponentDoc = {
  ...componentCatalogBySlug.progress,
  whenToUse: ["Use for determinate progress where completion can be calculated."],
  importCode: 'import { Progress } from "@blackstarzck/ui";',
  variations: [
    {
      id: "progress-default",
      title: "Determinate progress",
      description: "Compact indicator for upload or migration state.",
      controlSummary: "value: 0-100",
      code: createDemoCode({
        demoName: "ProgressDefaultDemo",
        imports: ["Progress"],
        body: `
<div className="grid gap-3">
  <div className="flex items-center justify-between text-sm">
    <span>Theme migration</span>
    <span className="text-muted-foreground">72%</span>
  </div>
  <Progress value={72} />
</div>`
      }),
      layout: "start",
      preview: (
        <DemoSurface>
          <div className="grid gap-3">
            <div className="flex items-center justify-between text-sm">
              <span>Theme migration</span>
              <span className="text-muted-foreground">72%</span>
            </div>
            <Progress value={72} />
          </div>
        </DemoSurface>
      )
    }
  ],
  api: [{ name: "value", type: "number", defaultValue: "0", description: "Progress percentage from 0 to 100." }],
  tokens: [{ name: "primary", usage: "Filled progress bar color." }],
  accessibility: ["Expose progress text when completion matters materially."]
};

export const alertDoc: ComponentDoc = {
  ...componentCatalogBySlug.alert,
  whenToUse: ["Use alert for inline status, warnings, and contextual action prompts."],
  importCode: 'import { Alert, AlertDescription, AlertTitle } from "@blackstarzck/ui";',
  variations: [
    {
      id: "alert-default",
      title: "Inline attention block",
      description: "Structured alert with a title, supporting copy, and optional call to action.",
      controlSummary: "title, description, optional action",
      code: createDemoCode({
        demoName: "AlertDefaultDemo",
        imports: ["Alert", "AlertDescription", "AlertTitle"],
        body: `
<Alert>
  <AlertTitle>Attention needed</AlertTitle>
  <AlertDescription>
    Review package metadata before publishing the next release.
  </AlertDescription>
</Alert>`
      }),
      layout: "start",
      preview: (
        <DemoSurface>
          <Alert className="max-w-[24rem]">
            <AlertTitle>Attention needed</AlertTitle>
            <AlertDescription>
              Review package metadata before publishing the next release.
            </AlertDescription>
          </Alert>
        </DemoSurface>
      )
    }
  ],
  api: [
    {
      name: "children",
      type: "ReactNode",
      defaultValue: "required",
      description: "Compose AlertTitle and AlertDescription to communicate the state."
    }
  ],
  tokens: [
    { name: "card", usage: "Surface background for the alert shell." },
    { name: "border", usage: "Alert outline and divider color." }
  ],
  accessibility: [
    "Use concise alert titles so assistive technologies can announce the state quickly.",
    "Do not rely on color alone to communicate severity."
  ]
};

