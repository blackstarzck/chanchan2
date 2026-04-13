import { ArrowRight, House, LoaderCircle } from "lucide-react";

import { Button } from "@blackstarzck/ui";

import { createDemoCode } from "../../component-doc-helpers";
import type { ComponentExampleDoc, VariationNavGroup } from "../../component-doc-types";

function ButtonBasicDemo() {
  return <Button>Solid button</Button>;
}

function ButtonVariantsDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button>Solid</Button>
      <Button variant="outline">Outlined</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="soft">Soft</Button>
      <Button variant="link">Link</Button>
      <Button variant="white">White</Button>
    </div>
  );
}

function ButtonTonesDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button tone="dark">Dark</Button>
      <Button tone="gray">Gray</Button>
      <Button tone="green">Green</Button>
      <Button tone="blue">Blue</Button>
      <Button tone="red">Red</Button>
      <Button tone="yellow">Yellow</Button>
      <Button tone="light">Light</Button>
    </div>
  );
}

function ButtonSizesDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="sm">Small</Button>
      <Button>Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon-sm" aria-label="Small home">
        <House className="size-4" />
      </Button>
      <Button size="icon" aria-label="Default home">
        <House className="size-5" />
      </Button>
      <Button size="icon-lg" aria-label="Large home">
        <House className="size-6" />
      </Button>
    </div>
  );
}

function ButtonSlotsDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button leading={<House className="size-4" />}>Leading icon</Button>
      <Button
        variant="outline"
        leading={<House className="size-4" />}
        leadingDivider
        badge={<span className="rounded-full border border-border px-2 py-0.5 text-xs">5</span>}
        trailing={<ArrowRight className="size-4" />}
        trailingDivider
      >
        Accessory slots
      </Button>
      <Button variant="soft" tone="green" leading={<LoaderCircle className="size-4 animate-spin" />}>
        Loading
      </Button>
    </div>
  );
}

function ButtonAsChildDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button asChild>
        <a href="/components/card">Open card docs</a>
      </Button>
      <Button asChild variant="link" trailing={<ArrowRight className="size-4" />}>
        <a href="/components/checkbox">See checkbox examples</a>
      </Button>
    </div>
  );
}

export const buttonExampleGroups: VariationNavGroup[] = [
  {
    label: "Core API",
    items: [
      { id: "button-basic", label: "Basic" },
      { id: "button-variants", label: "Variants" },
      { id: "button-tones", label: "Tones" },
      { id: "button-sizes", label: "Sizes" }
    ]
  },
  {
    label: "Composition",
    items: [
      { id: "button-slots", label: "Slots" },
      { id: "button-as-child", label: "As child" }
    ]
  }
];

export const buttonExamples: ComponentExampleDoc[] = [
  {
    id: "button-basic",
    title: "Basic",
    description: "Default button treatment using the solid shell and theme tone.",
    controlSummary: "children",
    layout: "start",
    component: <ButtonBasicDemo />,
    code: createDemoCode({
      demoName: "ButtonBasicDemo",
      imports: ["Button"],
      body: `
<Button>Solid button</Button>`
    })
  },
  {
    id: "button-variants",
    title: "Variants",
    description: "The public variant prop maps the repeated button families found on the Figma button pages.",
    controlSummary: "variant",
    layout: "start",
    component: <ButtonVariantsDemo />,
    code: createDemoCode({
      demoName: "ButtonVariantsDemo",
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
    })
  },
  {
    id: "button-tones",
    title: "Tones",
    description: "Color families stay separate from button variants so the runtime API covers the larger Figma matrix cleanly.",
    controlSummary: "tone",
    layout: "start",
    component: <ButtonTonesDemo />,
    code: createDemoCode({
      demoName: "ButtonTonesDemo",
      imports: ["Button"],
      body: `
<div className="flex flex-wrap gap-3">
  <Button tone="dark">Dark</Button>
  <Button tone="gray">Gray</Button>
  <Button tone="green">Green</Button>
  <Button tone="blue">Blue</Button>
  <Button tone="red">Red</Button>
  <Button tone="yellow">Yellow</Button>
  <Button tone="light">Light</Button>
</div>`
    })
  },
  {
    id: "button-sizes",
    title: "Sizes",
    description: "Text buttons and icon buttons share the same public size system.",
    controlSummary: "size",
    layout: "start",
    component: <ButtonSizesDemo />,
    code: createDemoCode({
      demoName: "ButtonSizesDemo",
      extraImports: ['import { House } from "lucide-react"'],
      imports: ["Button"],
      body: `
<div className="flex flex-wrap items-center gap-3">
  <Button size="sm">Small</Button>
  <Button>Default</Button>
  <Button size="lg">Large</Button>
  <Button size="icon-sm" aria-label="Small home">
    <House className="size-4" />
  </Button>
  <Button size="icon" aria-label="Default home">
    <House className="size-5" />
  </Button>
  <Button size="icon-lg" aria-label="Large home">
    <House className="size-6" />
  </Button>
</div>`
    })
  },
  {
    id: "button-slots",
    title: "Slots",
    description: "Leading, badge, and trailing content come from the shared Figma anatomy but stay flexible at runtime.",
    controlSummary: "leading + badge + trailing + dividers",
    layout: "start",
    component: <ButtonSlotsDemo />,
    code: createDemoCode({
      demoName: "ButtonSlotsDemo",
      extraImports: ['import { ArrowRight, House, LoaderCircle } from "lucide-react"'],
      imports: ["Button"],
      body: `
<div className="flex flex-wrap gap-3">
  <Button leading={<House className="size-4" />}>Leading icon</Button>
  <Button
    variant="outline"
    leading={<House className="size-4" />}
    leadingDivider
    badge={<span className="rounded-full border border-border px-2 py-0.5 text-xs">5</span>}
    trailing={<ArrowRight className="size-4" />}
    trailingDivider
  >
    Accessory slots
  </Button>
  <Button variant="soft" tone="green" leading={<LoaderCircle className="size-4 animate-spin" />}>
    Loading
  </Button>
</div>`
    })
  },
  {
    id: "button-as-child",
    title: "As child",
    description: "Use Radix Slot when the button needs to style an anchor or another focusable element.",
    controlSummary: "asChild",
    layout: "start",
    component: <ButtonAsChildDemo />,
    code: createDemoCode({
      demoName: "ButtonAsChildDemo",
      extraImports: ['import { ArrowRight } from "lucide-react"'],
      imports: ["Button"],
      body: `
<div className="flex flex-wrap gap-3">
  <Button asChild>
    <a href="/components/card">Open card docs</a>
  </Button>
  <Button asChild variant="link" trailing={<ArrowRight className="size-4" />}>
    <a href="/components/checkbox">See checkbox examples</a>
  </Button>
</div>`
    })
  }
];
