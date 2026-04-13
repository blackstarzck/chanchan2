import { ArrowRight, House } from "lucide-react";

import {
  Button,
  Checkbox,
  InputGroup,
  InputGroupAddon,
  InputGroupField,
  InputGroupLabel,
  InputGroupLabelRow,
  InputGroupMessage,
  InputGroupRoot,
  InputGroupSecondary
} from "@blackstarzck/ui";

import { createDemoCode } from "../../component-doc-helpers";
import type { ComponentExampleDoc, VariationNavGroup } from "../../component-doc-types";

function InputGroupAddonsDemo() {
  return (
    <InputGroup className="max-w-md">
      <InputGroupAddon>https://</InputGroupAddon>
      <InputGroupField placeholder="docs.chanchan2.dev" />
      <InputGroupAddon side="end">.dev</InputGroupAddon>
    </InputGroup>
  );
}

function InputGroupIconsDemo() {
  return (
    <div className="grid gap-3">
      <InputGroup className="max-w-md">
        <InputGroupAddon>
          <House className="size-4" />
        </InputGroupAddon>
        <InputGroupField placeholder="Enter a homepage URL" />
      </InputGroup>
      <InputGroup className="max-w-md">
        <InputGroupField placeholder="Invite teammate by email" />
        <InputGroupAddon side="end">
          <ArrowRight className="size-4" />
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}

function InputGroupActionDemo() {
  return (
    <div className="flex max-w-md gap-2">
      <InputGroup className="flex-1">
        <InputGroupField placeholder="Search command" />
      </InputGroup>
      <Button>Search</Button>
    </div>
  );
}

function InputGroupStatusDemo() {
  return (
    <InputGroupRoot className="max-w-md">
      <InputGroupLabelRow>
        <InputGroupLabel>Release URL</InputGroupLabel>
        <InputGroupSecondary>Required</InputGroupSecondary>
      </InputGroupLabelRow>
      <InputGroup status="invalid">
        <InputGroupAddon>https://</InputGroupAddon>
        <InputGroupField placeholder="release" aria-describedby="input-group-status-message" />
      </InputGroup>
      <InputGroupMessage id="input-group-status-message" className="text-destructive">
        Use a valid release slug before publishing.
      </InputGroupMessage>
    </InputGroupRoot>
  );
}

function InputGroupCheckboxDemo() {
  return (
    <InputGroup className="max-w-md">
      <InputGroupAddon>
        <Checkbox aria-label="Use exact match" />
      </InputGroupAddon>
      <InputGroupField placeholder="Search exact token name" />
    </InputGroup>
  );
}

export const inputGroupExampleGroups: VariationNavGroup[] = [
  {
    label: "Composition",
    items: [
      { id: "input-group-addons", label: "Addons" },
      { id: "input-group-icons", label: "Icons" },
      { id: "input-group-action", label: "Action" },
      { id: "input-group-checkbox", label: "Checkbox addon" }
    ]
  },
  {
    label: "Field wrapper",
    items: [{ id: "input-group-status", label: "Status" }]
  }
];

export const inputGroupExamples: ComponentExampleDoc[] = [
  {
    id: "input-group-addons",
    title: "Leading and trailing addons",
    description: "Static domain fragments are the simplest grouped field pattern.",
    controlSummary: "InputGroupAddon side=start | end",
    layout: "start",
    component: <InputGroupAddonsDemo />,
    code: createDemoCode({
      demoName: "InputGroupAddonsDemo",
      imports: ["InputGroup", "InputGroupAddon", "InputGroupField"],
      body: `
<InputGroup className="max-w-md">
  <InputGroupAddon>https://</InputGroupAddon>
  <InputGroupField placeholder="docs.chanchan2.dev" />
  <InputGroupAddon side="end">.dev</InputGroupAddon>
</InputGroup>`
    })
  },
  {
    id: "input-group-icons",
    title: "With icons",
    description: "Leading and trailing icon slots stay as addons so the field remains a focused input primitive.",
    controlSummary: "addon content + side",
    layout: "start",
    component: <InputGroupIconsDemo />,
    code: createDemoCode({
      demoName: "InputGroupIconsDemo",
      extraImports: ['import { ArrowRight, House } from "lucide-react"'],
      imports: ["InputGroup", "InputGroupAddon", "InputGroupField"],
      body: `
<div className="grid gap-3">
  <InputGroup className="max-w-md">
    <InputGroupAddon>
      <House className="size-4" />
    </InputGroupAddon>
    <InputGroupField placeholder="Enter a homepage URL" />
  </InputGroup>
  <InputGroup className="max-w-md">
    <InputGroupField placeholder="Invite teammate by email" />
    <InputGroupAddon side="end">
      <ArrowRight className="size-4" />
    </InputGroupAddon>
  </InputGroup>
</div>`
    })
  },
  {
    id: "input-group-action",
    title: "Inline action",
    description: "A grouped button keeps submit or search actions visually attached to the field.",
    controlSummary: "InputGroup + Button",
    layout: "start",
    component: <InputGroupActionDemo />,
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
    })
  },
  {
    id: "input-group-status",
    title: "Status and message",
    description: "The group can inherit the same invalid and success emphasis as Input while helper copy stays outside the field shell.",
    controlSummary: "status + field wrapper slots",
    layout: "start",
    component: <InputGroupStatusDemo />,
    code: createDemoCode({
      demoName: "InputGroupStatusDemo",
      imports: [
        "InputGroup",
        "InputGroupAddon",
        "InputGroupField",
        "InputGroupLabel",
        "InputGroupLabelRow",
        "InputGroupMessage",
        "InputGroupRoot",
        "InputGroupSecondary"
      ],
      body: `
<InputGroupRoot className="max-w-md">
  <InputGroupLabelRow>
    <InputGroupLabel>Release URL</InputGroupLabel>
    <InputGroupSecondary>Required</InputGroupSecondary>
  </InputGroupLabelRow>
  <InputGroup status="invalid">
    <InputGroupAddon>https://</InputGroupAddon>
    <InputGroupField placeholder="release" aria-describedby="input-group-status-message" />
  </InputGroup>
  <InputGroupMessage id="input-group-status-message" className="text-destructive">
    Use a valid release slug before publishing.
  </InputGroupMessage>
</InputGroupRoot>`
    })
  },
  {
    id: "input-group-checkbox",
    title: "Checkbox addon",
    description: "An addon can host a compact control when the field depends on a prefixed option.",
    controlSummary: "interactive addon",
    layout: "start",
    component: <InputGroupCheckboxDemo />,
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
    })
  }
];
