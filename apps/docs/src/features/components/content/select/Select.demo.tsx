import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue
} from "@blackstarzck/ui";

import { createDemoCode } from "../../component-doc-helpers";
import type { ComponentExampleDoc, VariationNavGroup } from "../../component-doc-types";

function SelectBasicDemo() {
  return (
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
  );
}

function SelectGroupedDemo() {
  return (
    <div className="grid gap-3">
      <p className="text-sm font-medium">Release owner</p>
      <Select defaultValue="docs">
        <SelectTrigger>
          <SelectValue placeholder="Choose an owner" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Core teams</SelectLabel>
            <SelectItem value="docs">Docs</SelectItem>
            <SelectItem value="design">Design</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Platform</SelectLabel>
            <SelectItem value="infra">Infra</SelectItem>
            <SelectItem value="release">Release</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

function SelectControlledDemo() {
  const [value, setValue] = useState("retro");

  return (
    <div className="grid gap-3">
      <p className="text-sm font-medium">Preview theme</p>
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger>
          <SelectValue placeholder="Choose a theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="default">Default</SelectItem>
          <SelectItem value="retro">Retro</SelectItem>
          <SelectItem value="harvest">Harvest</SelectItem>
        </SelectContent>
      </Select>
      <p className="text-sm text-muted-foreground">Current value: {value}</p>
    </div>
  );
}

export const selectExampleGroups: VariationNavGroup[] = [
  {
    label: "Core API",
    items: [
      { id: "select-basic", label: "Basic" },
      { id: "select-controlled", label: "Controlled state" }
    ]
  },
  {
    label: "Composition",
    items: [{ id: "select-grouped", label: "Grouped options" }]
  }
];

export const selectExamples: ComponentExampleDoc[] = [
  {
    id: "select-basic",
    title: "Basic",
    description: "Default select trigger and option list for a short known set of choices.",
    controlSummary: "defaultValue + SelectTrigger + SelectItem",
    layout: "start",
    component: <SelectBasicDemo />,
    code: createDemoCode({
      demoName: "SelectBasicDemo",
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
    })
  },
  {
    id: "select-grouped",
    title: "Grouped options",
    description: "Labels and separators let the dropdown mirror the grouped sections shown on the advanced Figma page.",
    controlSummary: "SelectGroup + SelectLabel + SelectSeparator",
    layout: "start",
    component: <SelectGroupedDemo />,
    code: createDemoCode({
      demoName: "SelectGroupedDemo",
      imports: [
        "Select",
        "SelectContent",
        "SelectGroup",
        "SelectItem",
        "SelectLabel",
        "SelectSeparator",
        "SelectTrigger",
        "SelectValue"
      ],
      body: `
<div className="grid gap-3">
  <p className="text-sm font-medium">Release owner</p>
  <Select defaultValue="docs">
    <SelectTrigger>
      <SelectValue placeholder="Choose an owner" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Core teams</SelectLabel>
        <SelectItem value="docs">Docs</SelectItem>
        <SelectItem value="design">Design</SelectItem>
      </SelectGroup>
      <SelectSeparator />
      <SelectGroup>
        <SelectLabel>Platform</SelectLabel>
        <SelectItem value="infra">Infra</SelectItem>
        <SelectItem value="release">Release</SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</div>`
    })
  },
  {
    id: "select-controlled",
    title: "Controlled state",
    description: "Keep the selected option controlled when the page needs to coordinate state with other UI.",
    controlSummary: "value + onValueChange",
    layout: "start",
    component: <SelectControlledDemo />,
    code: createDemoCode({
      demoName: "SelectControlledDemo",
      reactImports: ["useState"],
      imports: ["Select", "SelectContent", "SelectItem", "SelectTrigger", "SelectValue"],
      setup: `
const [value, setValue] = useState("retro")
      `,
      body: `
<div className="grid gap-3">
  <p className="text-sm font-medium">Preview theme</p>
  <Select value={value} onValueChange={setValue}>
    <SelectTrigger>
      <SelectValue placeholder="Choose a theme" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="default">Default</SelectItem>
      <SelectItem value="retro">Retro</SelectItem>
      <SelectItem value="harvest">Harvest</SelectItem>
    </SelectContent>
  </Select>
  <p className="text-sm text-muted-foreground">Current value: {value}</p>
</div>`
    })
  }
];
