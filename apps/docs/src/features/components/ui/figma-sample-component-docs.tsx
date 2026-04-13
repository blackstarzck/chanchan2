import { Activity, Bell, CheckCircle2, Home, Layers, Package, Settings, Star, Upload } from "lucide-react";

import {
  BarChart,
  BlurPreview,
  Button,
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleContent,
  ChatBubbleMeta,
  ChatThread,
  CreditItem,
  CreditList,
  CustomIcon,
  CustomIconGrid,
  DeviceFrame,
  DeviceScreen,
  DoughnutChart,
  Flag,
  FlagGrid,
  HalfCircleChart,
  IconCollectionGrid,
  IconTile,
  IllustrationFrame,
  IllustrationSpot,
  LineChart,
  List,
  ListItem,
  ListItemDescription,
  ListItemTitle,
  PieChart,
  ShadowPreview,
  Stepper,
  StepperContent,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperTitle,
  StyledIcon,
  TreeView,
  TreeViewGroup,
  TreeViewItem,
  TreeViewLabel
} from "@blackstarzck/ui";

import { createDemoCode, DemoSurface } from "../component-doc-helpers";
import type { ApiRow, ComponentDoc, TokenRow, VariationDoc } from "../component-doc-types";
import { componentCatalogBySlug } from "../registry";

function figmaSampleDoc({
  accessibility,
  api,
  code,
  controlSummary,
  description,
  imports,
  preview,
  slug,
  title,
  tokens,
  whenToUse
}: {
  accessibility?: string[];
  api?: ApiRow[];
  code: string;
  controlSummary: string;
  description: string;
  imports: string[];
  preview: VariationDoc["preview"];
  slug: string;
  title: string;
  tokens?: TokenRow[];
  whenToUse?: string[];
}): ComponentDoc {
  const item = componentCatalogBySlug[slug];
  const demoName = `${toPascal(slug)}PropSamples`;

  return {
    ...item,
    accessibility: accessibility ?? ["Keep the visible label or surrounding context clear for assistive technologies."],
    api: api ?? [{ name: "className", type: "string", defaultValue: "undefined", description: "Allows layout-level composition without creating another component." }],
    importCode: `import { ${imports.join(", ")} } from "@blackstarzck/ui";`,
    tokens: tokens ?? [{ name: "semantic tokens", usage: "Rendered through package UI theme variables." }],
    variations: [
      {
        id: `${slug}-prop-samples`,
        title,
        description,
        controlSummary,
        code: createDemoCode({ demoName, imports, body: code }),
        layout: "start",
        preview
      }
    ],
    whenToUse: whenToUse ?? [`Use ${item.name} to render the Figma sample family through props instead of one-off components.`]
  };
}

function toPascal(value: string) {
  return value
    .split("-")
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join("");
}

export const chatBubblesDoc = figmaSampleDoc({
  slug: "chat-bubbles",
  title: "Props sample matrix",
  description: "Side and tone props recreate incoming, outgoing, muted, and primary message samples.",
  controlSummary: "side: start | end, tone: default | muted | primary",
  imports: ["ChatBubble", "ChatBubbleAvatar", "ChatBubbleContent", "ChatBubbleMeta", "ChatThread"],
  code: `
<ChatThread className="max-w-xl">
  <div className="flex items-start gap-3">
    <ChatBubbleAvatar>AK</ChatBubbleAvatar>
    <ChatBubble side="start" tone="default" meta="Alice">
      Can you review the Card examples?
    </ChatBubble>
  </div>
  <ChatBubble side="end" tone="primary" meta="You">
    Yes. I will check the props matrix and code preview.
  </ChatBubble>
  <ChatBubble side="start" tone="muted">
    <ChatBubbleContent>
      <p>Docs preview updated.</p>
      <ChatBubbleMeta>2 minutes ago</ChatBubbleMeta>
    </ChatBubbleContent>
  </ChatBubble>
</ChatThread>`,
  preview: (
    <DemoSurface>
      <ChatThread className="max-w-xl">
        <div className="flex items-start gap-3">
          <ChatBubbleAvatar>AK</ChatBubbleAvatar>
          <ChatBubble side="start" tone="default" meta="Alice">
            Can you review the Card examples?
          </ChatBubble>
        </div>
        <ChatBubble side="end" tone="primary" meta="You">
          Yes. I will check the props matrix and code preview.
        </ChatBubble>
        <ChatBubble side="start" tone="muted">
          <ChatBubbleContent>
            <p>Docs preview updated.</p>
            <ChatBubbleMeta>2 minutes ago</ChatBubbleMeta>
          </ChatBubbleContent>
        </ChatBubble>
      </ChatThread>
    </DemoSurface>
  ),
  api: [
    { name: "side", type: '"start" | "end"', defaultValue: '"start"', description: "Controls message alignment and tail radius." },
    { name: "tone", type: '"default" | "muted" | "primary"', defaultValue: '"default"', description: "Controls message surface color." },
    { name: "meta", type: "ReactNode", defaultValue: "undefined", description: "Optional sender or timestamp label." }
  ]
});

export const devicesDoc = figmaSampleDoc({
  slug: "devices",
  title: "Props sample matrix",
  description: "The device prop switches between desktop and mobile frames, while shadow controls elevation.",
  controlSummary: "device: desktop | mobile, shadow: boolean",
  imports: ["DeviceFrame", "DeviceScreen"],
  code: `
<div className="flex flex-wrap items-start gap-6">
  <DeviceFrame device="desktop" className="max-w-sm">
    <DeviceScreen>
      <div className="h-full rounded-xl bg-primary-soft p-4 text-sm font-medium text-primary-soft-foreground">
        Desktop preview
      </div>
    </DeviceScreen>
  </DeviceFrame>
  <DeviceFrame device="mobile" shadow={false}>
    <DeviceScreen>
      <div className="h-full rounded-xl bg-muted p-4 text-sm">Mobile preview</div>
    </DeviceScreen>
  </DeviceFrame>
</div>`,
  preview: (
    <DemoSurface>
      <div className="flex flex-wrap items-start gap-6">
        <DeviceFrame device="desktop" className="max-w-sm">
          <DeviceScreen>
            <div className="h-full rounded-xl bg-primary-soft p-4 text-sm font-medium text-primary-soft-foreground">
              Desktop preview
            </div>
          </DeviceScreen>
        </DeviceFrame>
        <DeviceFrame device="mobile" shadow={false}>
          <DeviceScreen>
            <div className="h-full rounded-xl bg-muted p-4 text-sm">Mobile preview</div>
          </DeviceScreen>
        </DeviceFrame>
      </div>
    </DemoSurface>
  ),
  api: [
    { name: "device", type: '"desktop" | "mobile"', defaultValue: '"desktop"', description: "Controls frame aspect ratio and radius." },
    { name: "shadow", type: "boolean", defaultValue: "true", description: "Turns frame elevation on or off." }
  ]
});

export const listsDoc = figmaSampleDoc({
  slug: "lists",
  title: "Props sample matrix",
  description: "The state prop covers default, active, and disabled list rows from the Figma samples.",
  controlSummary: "state: default | active | disabled",
  imports: ["List", "ListItem", "ListItemDescription", "ListItemTitle"],
  code: `
<List className="max-w-md">
  <ListItem state="active">
    <span>
      <ListItemTitle>Published package</ListItemTitle>
      <ListItemDescription>Available on the docs preview.</ListItemDescription>
    </span>
  </ListItem>
  <ListItem>
    <span>
      <ListItemTitle>Build package</ListItemTitle>
      <ListItemDescription>Ready for validation.</ListItemDescription>
    </span>
  </ListItem>
  <ListItem state="disabled">
    <span>
      <ListItemTitle>Notify team</ListItemTitle>
      <ListItemDescription>Disabled until release approval.</ListItemDescription>
    </span>
  </ListItem>
</List>`,
  preview: (
    <DemoSurface>
      <List className="max-w-md">
        <ListItem state="active">
          <CheckCircle2 className="size-4" />
          <span>
            <ListItemTitle>Published package</ListItemTitle>
            <ListItemDescription>Available on the docs preview.</ListItemDescription>
          </span>
        </ListItem>
        <ListItem>
          <Package className="size-4" />
          <span>
            <ListItemTitle>Build package</ListItemTitle>
            <ListItemDescription>Ready for validation.</ListItemDescription>
          </span>
        </ListItem>
        <ListItem state="disabled">
          <Bell className="size-4" />
          <span>
            <ListItemTitle>Notify team</ListItemTitle>
            <ListItemDescription>Disabled until release approval.</ListItemDescription>
          </span>
        </ListItem>
      </List>
    </DemoSurface>
  ),
  api: [{ name: "state", type: '"default" | "active" | "disabled"', defaultValue: '"default"', description: "Controls row emphasis and availability." }]
});

export const styledIconsDoc = figmaSampleDoc({
  slug: "styled-icons",
  title: "Props sample matrix",
  description: "Variant, tone, size, and shape props replace hundreds of repeated Figma icon nodes.",
  controlSummary: "variant + tone + size + shape",
  imports: ["StyledIcon"],
  code: `
<div className="grid gap-4">
  <div className="flex flex-wrap items-center gap-3">
    <StyledIcon variant="base" tone="blue" />
    <StyledIcon variant="soft" tone="green" />
    <StyledIcon variant="outline" tone="red" />
  </div>
  <div className="flex flex-wrap items-center gap-3">
    <StyledIcon size="xs" shape="square" />
    <StyledIcon size="small" shape="rounded" />
    <StyledIcon size="large" shape="circular" tone="yellow" />
  </div>
</div>`,
  preview: (
    <DemoSurface>
      <div className="grid gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <StyledIcon variant="base" tone="blue"><Activity /></StyledIcon>
          <StyledIcon variant="soft" tone="green"><Bell /></StyledIcon>
          <StyledIcon variant="outline" tone="red"><Star /></StyledIcon>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <StyledIcon size="xs" shape="square" />
          <StyledIcon size="small" shape="rounded" />
          <StyledIcon size="large" shape="circular" tone="yellow" />
        </div>
      </div>
    </DemoSurface>
  ),
  api: [
    { name: "variant", type: '"base" | "soft" | "outline"', defaultValue: '"soft"', description: "Controls the icon container treatment." },
    { name: "tone", type: '"blue" | "dark" | "gray" | "green" | "red" | "yellow"', defaultValue: '"blue"', description: "Controls semantic color." },
    { name: "size", type: '"xs" | "small" | "default" | "large"', defaultValue: '"default"', description: "Controls square container size." },
    { name: "shape", type: '"square" | "rounded" | "circular"', defaultValue: '"rounded"', description: "Controls the icon container radius." }
  ]
});

export const treeViewDoc = figmaSampleDoc({
  slug: "tree-view",
  title: "Props sample matrix",
  description: "Expanded, selected, and level props express the hierarchy samples without separate components.",
  controlSummary: "expanded, selected, level",
  imports: ["TreeView", "TreeViewGroup", "TreeViewItem", "TreeViewLabel"],
  code: `
<TreeView className="max-w-sm">
  <TreeViewItem expanded selected>
    <TreeViewLabel>Components</TreeViewLabel>
  </TreeViewItem>
  <TreeViewGroup>
    <TreeViewItem level={2} expanded><TreeViewLabel>Forms</TreeViewLabel></TreeViewItem>
    <TreeViewItem level={3}><TreeViewLabel>Input.tsx</TreeViewLabel></TreeViewItem>
    <TreeViewItem level={3}><TreeViewLabel>Select.tsx</TreeViewLabel></TreeViewItem>
  </TreeViewGroup>
</TreeView>`,
  preview: (
    <DemoSurface>
      <TreeView className="max-w-sm">
        <TreeViewItem expanded selected>
          <TreeViewLabel>Components</TreeViewLabel>
        </TreeViewItem>
        <TreeViewGroup>
          <TreeViewItem level={2} expanded><TreeViewLabel>Forms</TreeViewLabel></TreeViewItem>
          <TreeViewItem level={3}><TreeViewLabel>Input.tsx</TreeViewLabel></TreeViewItem>
          <TreeViewItem level={3}><TreeViewLabel>Select.tsx</TreeViewLabel></TreeViewItem>
        </TreeViewGroup>
      </TreeView>
    </DemoSurface>
  ),
  api: [
    { name: "expanded", type: "boolean", defaultValue: "undefined", description: "Shows a branch as open." },
    { name: "selected", type: "boolean", defaultValue: "false", description: "Marks the current item." },
    { name: "level", type: "number", defaultValue: "1", description: "Controls indentation and aria-level." }
  ]
});

export const stepperDoc = figmaSampleDoc({
  slug: "stepper",
  title: "Props sample matrix",
  description: "Orientation, alignment, and state props cover the stepper examples.",
  controlSummary: "orientation + state",
  imports: ["Stepper", "StepperContent", "StepperDescription", "StepperIndicator", "StepperItem", "StepperTitle"],
  code: `
<Stepper orientation="horizontal">
  <StepperItem state="complete">
    <StepperIndicator state="complete" />
    <StepperContent><StepperTitle>Design</StepperTitle><StepperDescription>Figma mapped.</StepperDescription></StepperContent>
  </StepperItem>
  <StepperItem state="active">
    <StepperIndicator state="active" step={2} />
    <StepperContent><StepperTitle>Build</StepperTitle><StepperDescription>Props implemented.</StepperDescription></StepperContent>
  </StepperItem>
  <StepperItem>
    <StepperIndicator step={3} />
    <StepperContent><StepperTitle>Verify</StepperTitle><StepperDescription>Tests and preview.</StepperDescription></StepperContent>
  </StepperItem>
</Stepper>`,
  preview: (
    <DemoSurface>
      <Stepper orientation="horizontal">
        <StepperItem state="complete">
          <StepperIndicator state="complete" />
          <StepperContent><StepperTitle>Design</StepperTitle><StepperDescription>Figma mapped.</StepperDescription></StepperContent>
        </StepperItem>
        <StepperItem state="active">
          <StepperIndicator state="active" step={2} />
          <StepperContent><StepperTitle>Build</StepperTitle><StepperDescription>Props implemented.</StepperDescription></StepperContent>
        </StepperItem>
        <StepperItem>
          <StepperIndicator step={3} />
          <StepperContent><StepperTitle>Verify</StepperTitle><StepperDescription>Tests and preview.</StepperDescription></StepperContent>
        </StepperItem>
      </Stepper>
    </DemoSurface>
  ),
  api: [
    { name: "orientation", type: '"horizontal" | "vertical"', defaultValue: '"horizontal"', description: "Controls step layout direction." },
    { name: "state", type: '"complete" | "active" | "default"', defaultValue: '"default"', description: "Controls item and indicator emphasis." },
    { name: "alignment", type: '"left" | "center"', defaultValue: '"left"', description: "Controls item alignment." }
  ]
});

export const lineChartDoc = figmaSampleDoc({
  slug: "line-chart",
  title: "Props sample matrix",
  description: "Data and strong props cover standard and emphasized line chart samples.",
  controlSummary: "data: number[], strong: boolean",
  imports: ["LineChart"],
  code: `
<div className="grid gap-6 md:grid-cols-2">
  <LineChart aria-label="Weekly adoption trend" data={[18, 32, 28, 54, 70, 64, 82]} />
  <LineChart aria-label="Revenue trend" data={[12, 20, 38, 44, 58, 72, 88]} strong />
</div>`,
  preview: (
    <DemoSurface>
      <div className="grid gap-6 md:grid-cols-2">
        <LineChart aria-label="Weekly adoption trend" data={[18, 32, 28, 54, 70, 64, 82]} />
        <LineChart aria-label="Revenue trend" data={[12, 20, 38, 44, 58, 72, 88]} strong />
      </div>
    </DemoSurface>
  ),
  api: [
    { name: "data", type: "number[]", defaultValue: "[22, 40, 34, 58, 48, 76, 68]", description: "Values normalized into SVG points." },
    { name: "strong", type: "boolean", defaultValue: "false", description: "Uses a thicker line treatment." }
  ]
});

export const barChartDoc = figmaSampleDoc({
  slug: "bar-chart",
  title: "Props sample matrix",
  description: "Bars and secondaryBars cover single and comparison chart samples.",
  controlSummary: "bars: number[], secondaryBars?: number[]",
  imports: ["BarChart"],
  code: `
<div className="grid gap-6 md:grid-cols-2">
  <BarChart aria-label="Monthly installs" bars={[38, 62, 44, 78, 56, 90]} />
  <BarChart aria-label="Install comparison" bars={[58, 72, 64, 84, 68, 92]} secondaryBars={[44, 50, 52, 61, 48, 75]} />
</div>`,
  preview: (
    <DemoSurface>
      <div className="grid gap-6 md:grid-cols-2">
        <BarChart aria-label="Monthly installs" bars={[38, 62, 44, 78, 56, 90]} />
        <BarChart aria-label="Install comparison" bars={[58, 72, 64, 84, 68, 92]} secondaryBars={[44, 50, 52, 61, 48, 75]} />
      </div>
    </DemoSurface>
  ),
  api: [
    { name: "bars", type: "number[]", defaultValue: "[38, 62, 44, 78, 56, 90]", description: "Primary bar heights." },
    { name: "secondaryBars", type: "number[]", defaultValue: "undefined", description: "Optional comparison bars." }
  ]
});

export const pieChartDoc = figmaSampleDoc({
  slug: "pie-chart",
  title: "Props sample matrix",
  description: "Segments map Figma color slices to a single conic-gradient component.",
  controlSummary: "segments: string[]",
  imports: ["PieChart"],
  code: `
<div className="flex flex-wrap gap-6">
  <PieChart aria-label="Traffic split" />
  <PieChart aria-label="Status split" segments={["#111827 0 20%", "#2563eb 20% 55%", "#22c55e 55% 100%"]} />
</div>`,
  preview: (
    <DemoSurface>
      <div className="flex flex-wrap gap-6">
        <PieChart aria-label="Traffic split" />
        <PieChart aria-label="Status split" segments={["#111827 0 20%", "#2563eb 20% 55%", "#22c55e 55% 100%"]} />
      </div>
    </DemoSurface>
  ),
  api: [{ name: "segments", type: "string[]", defaultValue: "blue/green/amber slices", description: "CSS conic-gradient segment definitions." }]
});

export const doughnutChartDoc = figmaSampleDoc({
  slug: "doughnut-chart",
  title: "Props sample matrix",
  description: "Segments and children cover ring charts with center labels.",
  controlSummary: "segments: string[], children: ReactNode",
  imports: ["DoughnutChart"],
  code: `
<div className="flex flex-wrap gap-6">
  <DoughnutChart aria-label="Completion split">72%</DoughnutChart>
  <DoughnutChart aria-label="Budget split" segments={["#111827 0 32%", "#2563eb 32% 66%", "#e5e7eb 66% 100%"]}>$8.4k</DoughnutChart>
</div>`,
  preview: (
    <DemoSurface>
      <div className="flex flex-wrap gap-6">
        <DoughnutChart aria-label="Completion split">72%</DoughnutChart>
        <DoughnutChart aria-label="Budget split" segments={["#111827 0 32%", "#2563eb 32% 66%", "#e5e7eb 66% 100%"]}>$8.4k</DoughnutChart>
      </div>
    </DemoSurface>
  ),
  api: [
    { name: "segments", type: "string[]", defaultValue: "blue/green/gray slices", description: "CSS conic-gradient ring definitions." },
    { name: "children", type: "ReactNode", defaultValue: "undefined", description: "Center label content." }
  ]
});

export const halfCircleChartDoc = figmaSampleDoc({
  slug: "half-circle-chart",
  title: "Props sample matrix",
  description: "Progress and children cover gauge samples without separate components.",
  controlSummary: "progress: number, children: ReactNode",
  imports: ["HalfCircleChart"],
  code: `
<div className="flex flex-wrap gap-6">
  <HalfCircleChart progress={42}>42%</HalfCircleChart>
  <HalfCircleChart progress={84}>84%</HalfCircleChart>
</div>`,
  preview: (
    <DemoSurface>
      <div className="flex flex-wrap gap-6">
        <HalfCircleChart progress={42}>42%</HalfCircleChart>
        <HalfCircleChart progress={84}>84%</HalfCircleChart>
      </div>
    </DemoSurface>
  ),
  api: [{ name: "progress", type: "number", defaultValue: "68", description: "Gauge progress from 0 to 100." }]
});

export const shadowsDoc = figmaSampleDoc({
  slug: "shadows",
  title: "Props sample matrix",
  description: "Depth covers the available elevation samples.",
  controlSummary: "depth: sm | md | lg | xl",
  imports: ["ShadowPreview"],
  code: `
<div className="grid gap-4 sm:grid-cols-4">
  <ShadowPreview depth="sm">sm</ShadowPreview>
  <ShadowPreview depth="md">md</ShadowPreview>
  <ShadowPreview depth="lg">lg</ShadowPreview>
  <ShadowPreview depth="xl">xl</ShadowPreview>
</div>`,
  preview: (
    <DemoSurface>
      <div className="grid gap-4 sm:grid-cols-4">
        <ShadowPreview depth="sm">sm</ShadowPreview>
        <ShadowPreview depth="md">md</ShadowPreview>
        <ShadowPreview depth="lg">lg</ShadowPreview>
        <ShadowPreview depth="xl">xl</ShadowPreview>
      </div>
    </DemoSurface>
  ),
  api: [{ name: "depth", type: '"sm" | "md" | "lg" | "xl"', defaultValue: '"lg"', description: "Selects the elevation token sample." }]
});

export const blurDoc = figmaSampleDoc({
  slug: "blur",
  title: "Props sample matrix",
  description: "Intensity covers the blur reference samples.",
  controlSummary: "intensity: sm | md | lg",
  imports: ["BlurPreview"],
  code: `
<div className="grid gap-4 md:grid-cols-3">
  <BlurPreview intensity="sm">Small blur</BlurPreview>
  <BlurPreview intensity="md">Medium blur</BlurPreview>
  <BlurPreview intensity="lg">Large blur</BlurPreview>
</div>`,
  preview: (
    <DemoSurface>
      <div className="grid gap-4 md:grid-cols-3">
        <BlurPreview intensity="sm">Small blur</BlurPreview>
        <BlurPreview intensity="md">Medium blur</BlurPreview>
        <BlurPreview intensity="lg">Large blur</BlurPreview>
      </div>
    </DemoSurface>
  ),
  api: [{ name: "intensity", type: '"sm" | "md" | "lg"', defaultValue: '"md"', description: "Controls backdrop blur strength." }]
});

export const iconCollectionLucideDoc = figmaSampleDoc({
  slug: "icon-collection-lucide",
  title: "Props sample matrix",
  description: "IconTile renders a label and any icon child, so the large Figma collection becomes a reusable grid.",
  controlSummary: "label + children",
  imports: ["IconCollectionGrid", "IconTile"],
  code: `
<IconCollectionGrid>
  <IconTile label="Home"><Home /></IconTile>
  <IconTile label="Settings"><Settings /></IconTile>
  <IconTile label="Activity"><Activity /></IconTile>
  <IconTile label="Bell"><Bell /></IconTile>
</IconCollectionGrid>`,
  preview: (
    <DemoSurface>
      <IconCollectionGrid>
        <IconTile label="Home"><Home /></IconTile>
        <IconTile label="Settings"><Settings /></IconTile>
        <IconTile label="Activity"><Activity /></IconTile>
        <IconTile label="Bell"><Bell /></IconTile>
        <IconTile label="Layers"><Layers /></IconTile>
        <IconTile label="Upload"><Upload /></IconTile>
      </IconCollectionGrid>
    </DemoSurface>
  ),
  api: [
    { name: "label", type: "ReactNode", defaultValue: "undefined", description: "Readable icon name shown under the tile." },
    { name: "children", type: "ReactNode", defaultValue: "required", description: "Icon node rendered inside the tile." }
  ]
});

export const customIconsDoc = figmaSampleDoc({
  slug: "custom-icons",
  title: "Props sample matrix",
  description: "CustomIcon renders label plus arbitrary mark content for Figma custom icon samples.",
  controlSummary: "label + children",
  imports: ["CustomIcon", "CustomIconGrid"],
  code: `
<CustomIconGrid>
  <CustomIcon label="API">API</CustomIcon>
  <CustomIcon label="Docs">D</CustomIcon>
  <CustomIcon label="Theme">T</CustomIcon>
  <CustomIcon label="Labs">L</CustomIcon>
</CustomIconGrid>`,
  preview: (
    <DemoSurface>
      <CustomIconGrid>
        <CustomIcon label="API">API</CustomIcon>
        <CustomIcon label="Docs">D</CustomIcon>
        <CustomIcon label="Theme">T</CustomIcon>
        <CustomIcon label="Labs">L</CustomIcon>
      </CustomIconGrid>
    </DemoSurface>
  ),
  api: [
    { name: "label", type: "ReactNode", defaultValue: "undefined", description: "Readable custom icon name." },
    { name: "children", type: "ReactNode", defaultValue: "required", description: "Custom mark content." }
  ]
});

export const illustrationDoc = figmaSampleDoc({
  slug: "illustration",
  title: "Props sample matrix",
  description: "IllustrationFrame composes decorative spots and content without storing temporary Figma asset URLs.",
  controlSummary: "children + className composition",
  imports: ["Button", "IllustrationFrame", "IllustrationSpot"],
  code: `
<IllustrationFrame className="max-w-xl">
  <div className="flex items-center gap-5">
    <IllustrationSpot />
    <div className="grid gap-2">
      <h3 className="text-lg font-semibold">Design assets ready</h3>
      <p className="text-sm text-muted-foreground">Use local assets when exact Figma illustrations are required.</p>
      <Button size="sm" className="w-fit">Review assets</Button>
    </div>
  </div>
</IllustrationFrame>`,
  preview: (
    <DemoSurface>
      <IllustrationFrame className="max-w-xl">
        <div className="flex items-center gap-5">
          <IllustrationSpot />
          <div className="grid gap-2">
            <h3 className="text-lg font-semibold">Design assets ready</h3>
            <p className="text-sm text-muted-foreground">Use local assets when exact Figma illustrations are required.</p>
            <Button size="sm" className="w-fit">Review assets</Button>
          </div>
        </div>
      </IllustrationFrame>
    </DemoSurface>
  ),
  api: [{ name: "children", type: "ReactNode", defaultValue: "required", description: "Content placed over the illustration background." }]
});

export const flagsDoc = figmaSampleDoc({
  slug: "flags",
  title: "Props sample matrix",
  description: "The code prop generates the emoji flag while label controls visible text.",
  controlSummary: "code: string, label?: string",
  imports: ["Flag", "FlagGrid"],
  code: `
<FlagGrid>
  <Flag code="US" label="United States" />
  <Flag code="KR" label="Korea" />
  <Flag code="JP" label="Japan" />
  <Flag code="DE" label="Germany" />
</FlagGrid>`,
  preview: (
    <DemoSurface>
      <FlagGrid>
        <Flag code="US" label="United States" />
        <Flag code="KR" label="Korea" />
        <Flag code="JP" label="Japan" />
        <Flag code="DE" label="Germany" />
      </FlagGrid>
    </DemoSurface>
  ),
  api: [
    { name: "code", type: "string", defaultValue: "required", description: "ISO-like two-letter country code." },
    { name: "label", type: "string", defaultValue: "undefined", description: "Optional visible country label." }
  ]
});

export const creditsDoc = figmaSampleDoc({
  slug: "credits",
  title: "Props sample matrix",
  description: "CreditItem supports linked and unlinked attribution rows.",
  controlSummary: "href, source, children",
  imports: ["CreditItem", "CreditList"],
  code: `
<CreditList className="max-w-xl">
  <CreditItem href="https://preline.co/" source="Design kit">Preline UI</CreditItem>
  <CreditItem source="Icon set">Lucide</CreditItem>
  <CreditItem source="Implementation">Chanchan2 UI package</CreditItem>
</CreditList>`,
  preview: (
    <DemoSurface>
      <CreditList className="max-w-xl">
        <CreditItem href="https://preline.co/" source="Design kit">Preline UI</CreditItem>
        <CreditItem source="Icon set">Lucide</CreditItem>
        <CreditItem source="Implementation">Chanchan2 UI package</CreditItem>
      </CreditList>
    </DemoSurface>
  ),
  api: [
    { name: "href", type: "string", defaultValue: "undefined", description: "Optional link target for a credit row." },
    { name: "source", type: "ReactNode", defaultValue: "undefined", description: "Source label shown on the right side." }
  ]
});

export const allFigmaSampleDocs = [
  chatBubblesDoc,
  devicesDoc,
  listsDoc,
  styledIconsDoc,
  treeViewDoc,
  stepperDoc,
  lineChartDoc,
  barChartDoc,
  pieChartDoc,
  doughnutChartDoc,
  halfCircleChartDoc,
  shadowsDoc,
  blurDoc,
  iconCollectionLucideDoc,
  customIconsDoc,
  illustrationDoc,
  flagsDoc,
  creditsDoc
];
