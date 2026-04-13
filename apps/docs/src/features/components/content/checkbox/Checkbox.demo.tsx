import { Info } from "lucide-react";
import { useState } from "react";

import {
  Checkbox,
  CheckboxContent,
  CheckboxDescription,
  CheckboxField,
  CheckboxLabel,
  CheckboxSupport
} from "@blackstarzck/ui";

import { createDemoCode } from "../../component-doc-helpers";
import type { ComponentExampleDoc, VariationNavGroup } from "../../component-doc-types";

function CheckboxBasicDemo() {
  return (
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
  );
}

function CheckboxFieldDemo() {
  return (
    <div className="grid gap-4">
      <CheckboxField>
        <Checkbox defaultChecked />
        <CheckboxContent>
          <CheckboxLabel>Publish package</CheckboxLabel>
          <CheckboxDescription>Ship the compiled package to the public registry.</CheckboxDescription>
          <CheckboxSupport>
            <Info className="size-4" />
            <span>This action updates the release changelog and tags the current commit.</span>
          </CheckboxSupport>
        </CheckboxContent>
      </CheckboxField>
      <CheckboxField>
        <Checkbox />
        <CheckboxContent>
          <CheckboxLabel>Send release notes</CheckboxLabel>
          <CheckboxDescription>Email the generated summary to the launch list.</CheckboxDescription>
        </CheckboxContent>
      </CheckboxField>
    </div>
  );
}

function CheckboxIndeterminateDemo() {
  const [checked, setChecked] = useState<boolean | "indeterminate">("indeterminate");

  return (
    <div className="grid gap-4">
      <CheckboxField>
        <Checkbox checked={checked} onCheckedChange={setChecked} />
        <CheckboxContent>
          <CheckboxLabel>Include every release artifact</CheckboxLabel>
          <CheckboxDescription>
            This starts in the indeterminate state to show partially selected content.
          </CheckboxDescription>
        </CheckboxContent>
      </CheckboxField>
      <p className="text-sm text-muted-foreground">Current state: {String(checked)}</p>
    </div>
  );
}

export const checkboxExampleGroups: VariationNavGroup[] = [
  {
    label: "Core API",
    items: [
      { id: "checkbox-basic", label: "Basic" },
      { id: "checkbox-indeterminate", label: "Indeterminate" }
    ]
  },
  {
    label: "Composition",
    items: [{ id: "checkbox-field", label: "Field layout" }]
  }
];

export const checkboxExamples: ComponentExampleDoc[] = [
  {
    id: "checkbox-basic",
    title: "Basic",
    description: "Simple checkbox rows for lists, settings, and acknowledgements.",
    controlSummary: "defaultChecked + disabled",
    layout: "start",
    component: <CheckboxBasicDemo />,
    code: createDemoCode({
      demoName: "CheckboxBasicDemo",
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
    })
  },
  {
    id: "checkbox-field",
    title: "Field layout",
    description: "Companion layout components keep the docs close to the Figma row anatomy without bloating the root checkbox API.",
    controlSummary: "CheckboxField + CheckboxContent + CheckboxLabel + CheckboxDescription + CheckboxSupport",
    layout: "start",
    component: <CheckboxFieldDemo />,
    code: createDemoCode({
      demoName: "CheckboxFieldDemo",
      extraImports: ['import { Info } from "lucide-react"'],
      imports: [
        "Checkbox",
        "CheckboxContent",
        "CheckboxDescription",
        "CheckboxField",
        "CheckboxLabel",
        "CheckboxSupport"
      ],
      body: `
<CheckboxField>
  <Checkbox defaultChecked />
  <CheckboxContent>
    <CheckboxLabel>Publish package</CheckboxLabel>
    <CheckboxDescription>Ship the compiled package to the public registry.</CheckboxDescription>
    <CheckboxSupport>
      <Info className="size-4" />
      <span>This action updates the release changelog and tags the current commit.</span>
    </CheckboxSupport>
  </CheckboxContent>
</CheckboxField>`
    })
  },
  {
    id: "checkbox-indeterminate",
    title: "Indeterminate",
    description: "Radix state handling allows a controlled mixed state for partial selections.",
    controlSummary: "checked='indeterminate' + onCheckedChange",
    layout: "start",
    component: <CheckboxIndeterminateDemo />,
    code: createDemoCode({
      demoName: "CheckboxIndeterminateDemo",
      reactImports: ["useState"],
      imports: [
        "Checkbox",
        "CheckboxContent",
        "CheckboxDescription",
        "CheckboxField",
        "CheckboxLabel"
      ],
      setup: `
const [checked, setChecked] = useState<boolean | "indeterminate">("indeterminate")
      `,
      body: `
<div className="grid gap-4">
  <CheckboxField>
    <Checkbox checked={checked} onCheckedChange={setChecked} />
    <CheckboxContent>
      <CheckboxLabel>Include every release artifact</CheckboxLabel>
      <CheckboxDescription>
        This starts in the indeterminate state to show partially selected content.
      </CheckboxDescription>
    </CheckboxContent>
  </CheckboxField>
  <p className="text-sm text-muted-foreground">Current state: {String(checked)}</p>
</div>`
    })
  }
];
