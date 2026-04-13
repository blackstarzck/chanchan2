import type { ReactNode } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  CircleMinus,
  CirclePlus,
  FolderOpen,
  House,
  LoaderCircle
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  Checkbox,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarItem,
  SidebarList,
  SidebarSection,
  SidebarSectionTitle,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@blackstarzck/ui";

import { DemoSurface } from "../component-doc-helpers";

export function SelectPreview() {
  return (
    <DemoSurface>
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
      </div>
    </DemoSurface>
  );
}

export function DialogPreview() {
  return (
    <DemoSurface>
      <div className="relative flex min-h-[10rem] items-center justify-center overflow-hidden rounded-2xl bg-secondary/20 p-4">
        <div className="absolute inset-0 bg-overlay/10" />
        <div className="relative z-10 grid w-full max-w-[18rem] gap-4 rounded-xl border border-border bg-popover p-4 text-popover-foreground shadow-xl">
          <div className="grid gap-1">
            <p className="text-base font-semibold">Ship the next package version?</p>
            <p className="text-sm text-muted-foreground">
              Confirm the changelog, tags, and registry target before publishing.
            </p>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm">
              Cancel
            </Button>
            <Button size="sm">Publish</Button>
          </div>
        </div>
      </div>
    </DemoSurface>
  );
}

export function PopoverPreview() {
  return (
    <DemoSurface>
      <div className="relative flex min-h-[9rem] items-start justify-center pt-4">
        <Button variant="outline" size="sm">
          Theme info
        </Button>
        <div className="absolute left-1/2 top-16 z-10 w-56 -translate-x-1/2 rounded-lg border border-border bg-popover p-3 text-popover-foreground shadow-xl">
          <div className="grid gap-1">
            <p className="font-medium">Cashmere</p>
            <p className="text-sm text-muted-foreground">
              Soft contrast with a neutral surface palette.
            </p>
          </div>
        </div>
      </div>
    </DemoSurface>
  );
}

export function DropdownMenuPreview() {
  return (
    <DemoSurface>
      <div className="relative flex min-h-[9rem] items-start justify-center pt-4">
        <Button variant="outline" size="sm">
          Options
        </Button>
        <div className="absolute left-1/2 top-16 z-10 w-56 -translate-x-1/2 rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-xl">
          <p className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">Display</p>
          <div className="rounded-md bg-accent px-2 py-1.5 text-sm text-accent-foreground">
            Line numbers
          </div>
          <div className="px-2 py-1.5 text-sm">Wrapped code</div>
          <div className="my-1 h-px bg-border" />
          <div className="px-2 py-1.5 text-sm">Duplicate variation</div>
        </div>
      </div>
    </DemoSurface>
  );
}

export function SheetPreview() {
  return (
    <DemoSurface>
      <div className="relative min-h-[10rem] w-[16rem] overflow-hidden rounded-2xl bg-secondary/20">
        <div className="absolute inset-0 bg-overlay/10" />
        <div className="absolute inset-y-2 right-2 z-10 flex w-[72%] min-w-[12rem] flex-col rounded-xl border-l border-border bg-popover p-4 text-popover-foreground shadow-xl">
          <div className="grid gap-1">
            <p className="text-base font-semibold">Review settings</p>
            <p className="text-sm text-muted-foreground">
              Adjust layout density and publish metadata.
            </p>
          </div>
          <div className="mt-auto flex justify-end gap-2">
            <Button variant="outline" size="sm">
              Cancel
            </Button>
            <Button size="sm">Save</Button>
          </div>
        </div>
      </div>
    </DemoSurface>
  );
}

export function TooltipPreview() {
  return (
    <DemoSurface>
      <div className="flex min-h-[8rem] items-center justify-center">
        <div className="relative flex items-center gap-3">
          <div className="absolute left-7 top-0 -translate-x-1/2 -translate-y-[calc(100%+0.5rem)] rounded-md bg-foreground px-3 py-1.5 text-xs font-medium text-background shadow-lg">
            Pushes the release workflow after merge.
          </div>
          <Button variant="outline" size="sm">
            Publish
          </Button>
          <Button variant="ghost" size="sm">
            Token
          </Button>
        </div>
      </div>
    </DemoSurface>
  );
}

export function TabsPreview() {
  return (
    <DemoSurface>
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
      </Tabs>
    </DemoSurface>
  );
}

export function SidebarPreview() {
  return (
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
    </Sidebar>
  );
}

export function BadgePreview() {
  return (
    <DemoSurface>
      <div className="flex flex-wrap gap-3">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="destructive">Destructive</Badge>
      </div>
    </DemoSurface>
  );
}

export function AvatarPreview() {
  return (
    <DemoSurface>
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarFallback>CC</AvatarFallback>
        </Avatar>
        <Avatar className="size-12">
          <AvatarFallback>DS</AvatarFallback>
        </Avatar>
        <div className="text-sm text-muted-foreground">
          Team avatars can stay fully token-driven even without remote images.
        </div>
      </div>
    </DemoSurface>
  );
}

export function CheckboxPreview() {
  return (
    <DemoSurface>
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
      </div>
    </DemoSurface>
  );
}

export function RadioGroupPreview() {
  return (
    <DemoSurface>
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
      </RadioGroup>
    </DemoSurface>
  );
}

export function SwitchPreview() {
  return (
    <DemoSurface>
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
      </div>
    </DemoSurface>
  );
}

export function AccordionPreview() {
  return <AccordionBasicUsagePreview />;
}

const accordionAnswer =
  "Yes, Preline is an open-source project and is copyright 2022 Htmlstream.";

export function AccordionBasicUsagePreview() {
  return (
    <DemoSurface>
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
            {accordionAnswer}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="lifetime" divider={false}>
          <AccordionTrigger density="compact" indicatorPosition="start">
            What does "lifetime access" mean?
          </AccordionTrigger>
        </AccordionItem>
      </Accordion>
    </DemoSurface>
  );
}

export function AccordionNoArrowPreview() {
  return (
    <DemoSurface>
      <Accordion type="single" collapsible defaultValue="preline" className="grid max-w-xl gap-5">
        <AccordionItem value="updates" divider={false}>
          <AccordionTrigger indicatorPosition="none">
            What does "free updates" include?
          </AccordionTrigger>
        </AccordionItem>
        <AccordionItem value="preline" divider={false}>
          <AccordionTrigger indicatorPosition="none">Is Preline UI free?</AccordionTrigger>
          <AccordionContent inset="none">{accordionAnswer}</AccordionContent>
        </AccordionItem>
        <AccordionItem value="lifetime" divider={false}>
          <AccordionTrigger indicatorPosition="none">
            What does "lifetime access" mean?
          </AccordionTrigger>
        </AccordionItem>
      </Accordion>
    </DemoSurface>
  );
}

export function AccordionBorderedPreview() {
  return (
    <DemoSurface>
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
          <AccordionContent>{accordionAnswer}</AccordionContent>
        </AccordionItem>
        <AccordionItem value="lifetime" variant="card">
          <AccordionTrigger indicatorPosition="start">
            What does "lifetime access" mean?
          </AccordionTrigger>
        </AccordionItem>
      </Accordion>
    </DemoSurface>
  );
}

export function AccordionDividerPreview() {
  return (
    <DemoSurface>
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
          <AccordionContent>{accordionAnswer}</AccordionContent>
        </AccordionItem>
        <AccordionItem value="lifetime">
          <AccordionTrigger indicatorPosition="start" indicatorVariant="chevron">
            What does "lifetime access" mean?
          </AccordionTrigger>
        </AccordionItem>
      </Accordion>
    </DemoSurface>
  );
}

export function AccordionStretchedArrowPreview() {
  return (
    <DemoSurface>
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
          <AccordionContent inset="none">{accordionAnswer}</AccordionContent>
        </AccordionItem>
        <AccordionItem value="lifetime" divider={false}>
          <AccordionTrigger indicatorPosition="end" indicatorVariant="chevron">
            What does "lifetime access" mean?
          </AccordionTrigger>
        </AccordionItem>
      </Accordion>
    </DemoSurface>
  );
}

export function AccordionActiveContentBorderedPreview() {
  return (
    <DemoSurface>
      <Accordion type="single" collapsible defaultValue="preline" className="max-w-xl">
        <AccordionItem value="updates" divider={false}>
          <AccordionTrigger
            indicatorPosition="end"
            leading={<CirclePlus className="size-4" />}
          >
            What does "free updates" include?
          </AccordionTrigger>
        </AccordionItem>
        <AccordionItem value="preline" divider={false}>
          <AccordionTrigger
            indicatorPosition="end"
            leading={<CircleMinus className="size-4" />}
          >
            Is Preline UI free?
          </AccordionTrigger>
          <AccordionContent inset="none" variant="bordered">
            {accordionAnswer}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="lifetime" divider={false}>
          <AccordionTrigger
            indicatorPosition="end"
            leading={<CirclePlus className="size-4" />}
          >
            What does "lifetime access" mean?
          </AccordionTrigger>
        </AccordionItem>
      </Accordion>
    </DemoSurface>
  );
}

export function AccordionNestedPreview() {
  return (
    <DemoSurface>
      <Accordion type="single" collapsible defaultValue="preline" className="max-w-xl">
        <AccordionItem value="updates" divider={false}>
          <AccordionTrigger>What does "free updates" include?</AccordionTrigger>
        </AccordionItem>
        <AccordionItem value="preline" divider={false}>
          <AccordionTrigger>Is Preline UI free?</AccordionTrigger>
          <AccordionContent>
            <div className="grid gap-4">
              <p>{accordionAnswer}</p>
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
      </Accordion>
    </DemoSurface>
  );
}

export function AccordionWithIconAndBadgePreview() {
  return (
    <DemoSurface>
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
      </Accordion>
    </DemoSurface>
  );
}

const buttonToneOptions = [
  { label: "Dark", tone: "dark" },
  { label: "Gray", tone: "gray" },
  { label: "Green", tone: "green" },
  { label: "Blue", tone: "blue" },
  { label: "Red", tone: "red" },
  { label: "Yellow", tone: "yellow" },
  { label: "Light", tone: "light" }
] as const;

const buttonTypeOptions = [
  { label: "Solid", variant: "default" },
  { label: "Outlined", variant: "outline" },
  { label: "Ghost", variant: "ghost" },
  { label: "Soft", variant: "soft" },
  { label: "Link", variant: "link" },
  { label: "White", variant: "white" }
] as const;

function SectionTitle({ children }: { children: ReactNode }) {
  return <p className="text-sm font-medium text-foreground">{children}</p>;
}

function DemoGroup({
  children,
  columns = 4
}: {
  children: ReactNode;
  columns?: 2 | 3 | 4 | 6;
}) {
  const classes =
    columns === 6
      ? "grid gap-6 xl:grid-cols-6"
      : columns === 4
        ? "grid gap-6 sm:grid-cols-2 xl:grid-cols-4"
        : columns === 3
          ? "grid gap-6 md:grid-cols-3"
          : "grid gap-6 sm:grid-cols-2";

  return <div className={classes}>{children}</div>;
}

export function ButtonTypesPreview() {
  return (
    <DemoSurface>
      <div className="flex flex-wrap gap-3">
        {buttonTypeOptions.map(({ label, variant }) => (
          <Button key={variant} variant={variant}>
            {label}
          </Button>
        ))}
      </div>
    </DemoSurface>
  );
}

export function ButtonStatesPreview() {
  return (
    <DemoSurface>
      <DemoGroup>
        <div className="grid gap-3">
          <SectionTitle>Default</SectionTitle>
          <Button>Button</Button>
        </div>
        <div className="grid gap-3">
          <SectionTitle>Hover</SectionTitle>
          <Button className="!bg-blue-700 hover:!bg-blue-700">Button</Button>
        </div>
        <div className="grid gap-3">
          <SectionTitle>Focus</SectionTitle>
          <Button className="ring-2 ring-primary/30 ring-offset-2">Button</Button>
        </div>
        <div className="grid gap-3">
          <SectionTitle>Disabled</SectionTitle>
          <Button disabled>Button</Button>
        </div>
      </DemoGroup>
    </DemoSurface>
  );
}

export function ButtonSizesPreview() {
  return (
    <DemoSurface>
      <div className="flex flex-wrap items-end gap-3">
        <Button size="sm">Small</Button>
        <Button>Default</Button>
        <Button size="lg">Large</Button>
      </div>
    </DemoSurface>
  );
}

export function ButtonShapesPreview() {
  return (
    <DemoSurface>
      <DemoGroup columns={2}>
        <div className="grid gap-3">
          <SectionTitle>Rounded</SectionTitle>
          <Button>Button</Button>
        </div>
        <div className="grid gap-3">
          <SectionTitle>Pill</SectionTitle>
          <Button shape="pill">Button</Button>
        </div>
      </DemoGroup>
    </DemoSurface>
  );
}

export function ButtonColorVariantsPreview() {
  return (
    <DemoSurface>
      <DemoGroup columns={6}>
        {buttonTypeOptions.map(({ label, variant }) => (
          <div key={variant} className="grid gap-3">
            <SectionTitle>{label}</SectionTitle>
            {buttonToneOptions.map(({ label: toneLabel, tone }) => (
              <Button key={`${variant}-${tone}`} variant={variant} tone={tone}>
                {toneLabel}
              </Button>
            ))}
          </div>
        ))}
      </DemoGroup>
    </DemoSurface>
  );
}

export function ButtonBlockPreview() {
  return (
    <DemoSurface>
      <div className="grid gap-3">
        <Button className="w-full">Default</Button>
        <Button variant="outline" className="w-full">
          Outline
        </Button>
      </div>
    </DemoSurface>
  );
}

export function ButtonExamplesPreview() {
  return (
    <DemoSurface>
      <DemoGroup columns={2}>
        <div className="grid gap-3">
          <SectionTitle>Leading icon</SectionTitle>
          <Button>
            <House />
            Dashboard
          </Button>
        </div>
        <div className="grid gap-3">
          <SectionTitle>Trailing icon</SectionTitle>
          <Button variant="soft">
            Explore stories
            <ArrowUpRight />
          </Button>
        </div>
        <div className="grid gap-3">
          <SectionTitle>Action pair</SectionTitle>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline">Start free trial</Button>
            <Button>Get started</Button>
          </div>
        </div>
        <div className="grid gap-3">
          <SectionTitle>Inline utility</SectionTitle>
          <Button variant="white" tone="gray">
            View all
            <ArrowRight />
          </Button>
        </div>
      </DemoGroup>
    </DemoSurface>
  );
}

export function IconButtonTypesPreview() {
  return (
    <DemoSurface>
      <div className="flex flex-wrap gap-3">
        {buttonTypeOptions.map(({ label, variant }) => (
          <Button key={variant} variant={variant} size="icon" aria-label={label}>
            <House />
          </Button>
        ))}
      </div>
    </DemoSurface>
  );
}

export function IconButtonStatesPreview() {
  return (
    <DemoSurface>
      <DemoGroup>
        <div className="grid gap-3">
          <SectionTitle>Default</SectionTitle>
          <Button size="icon" aria-label="Default icon button">
            <House />
          </Button>
        </div>
        <div className="grid gap-3">
          <SectionTitle>Hover</SectionTitle>
          <Button size="icon" aria-label="Hover icon button" className="!bg-blue-700 hover:!bg-blue-700">
            <House />
          </Button>
        </div>
        <div className="grid gap-3">
          <SectionTitle>Focus</SectionTitle>
          <Button size="icon" aria-label="Focused icon button" className="ring-2 ring-primary/30 ring-offset-2">
            <House />
          </Button>
        </div>
        <div className="grid gap-3">
          <SectionTitle>Disabled</SectionTitle>
          <Button size="icon" aria-label="Disabled icon button" disabled>
            <House />
          </Button>
        </div>
      </DemoGroup>
    </DemoSurface>
  );
}

export function IconButtonSizesPreview() {
  return (
    <DemoSurface>
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
      </div>
    </DemoSurface>
  );
}

export function IconButtonShapesPreview() {
  return (
    <DemoSurface>
      <DemoGroup columns={2}>
        <div className="grid gap-3">
          <SectionTitle>Rounded</SectionTitle>
          <Button size="icon" aria-label="Rounded icon button">
            <House />
          </Button>
        </div>
        <div className="grid gap-3">
          <SectionTitle>Circled</SectionTitle>
          <Button size="icon" shape="pill" aria-label="Circled icon button">
            <House />
          </Button>
        </div>
      </DemoGroup>
    </DemoSurface>
  );
}

export function IconButtonColorVariantsPreview() {
  return (
    <DemoSurface>
      <DemoGroup columns={6}>
        {buttonTypeOptions.map(({ label, variant }) => (
          <div key={variant} className="grid gap-3">
            <SectionTitle>{label}</SectionTitle>
            {buttonToneOptions.map(({ label: toneLabel, tone }) => (
              <Button
                key={`${variant}-${tone}`}
                variant={variant}
                tone={tone}
                size="icon"
                aria-label={`${toneLabel} ${label} icon button`}
              >
                <House />
              </Button>
            ))}
          </div>
        ))}
      </DemoGroup>
    </DemoSurface>
  );
}

export function IconButtonExamplesPreview() {
  return (
    <DemoSurface>
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
      </div>
    </DemoSurface>
  );
}
