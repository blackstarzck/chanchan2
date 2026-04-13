import { Input } from "@blackstarzck/ui";

import { createDemoCode } from "../../component-doc-helpers";
import type { ComponentExampleDoc, VariationNavGroup } from "../../component-doc-types";

function InputBasicDemo() {
  return (
    <div className="grid gap-3">
      <Input placeholder="Search components" />
      <Input defaultValue="button" />
      <Input disabled value="Disabled field" onChange={() => undefined} />
    </div>
  );
}

function InputVariantsDemo() {
  return (
    <div className="grid gap-3">
      <Input variant="bordered" placeholder="Bordered input" />
      <Input variant="gray" placeholder="Gray input" />
      <Input variant="underline" shape="none" placeholder="Underline input" />
    </div>
  );
}

function InputSizesDemo() {
  return (
    <div className="grid gap-3">
      <Input size="sm" placeholder="Small input" />
      <Input placeholder="Default input" />
      <Input size="lg" placeholder="Large input" />
    </div>
  );
}

function InputStatusDemo() {
  return (
    <div className="grid gap-4">
      <div className="grid gap-1.5">
        <label className="text-sm font-medium text-foreground">Invalid field</label>
        <Input status="invalid" defaultValue="broken-release-tag" aria-describedby="input-invalid-help" />
        <p id="input-invalid-help" className="text-sm text-destructive">
          Use a valid semver tag before publishing.
        </p>
      </div>
      <div className="grid gap-1.5">
        <label className="text-sm font-medium text-foreground">Success field</label>
        <Input status="success" defaultValue="v0.2.1" aria-describedby="input-success-help" />
        <p id="input-success-help" className="text-sm text-success">
          This version is ready to ship.
        </p>
      </div>
    </div>
  );
}

export const inputExampleGroups: VariationNavGroup[] = [
  {
    label: "Core API",
    items: [
      { id: "input-basic", label: "Basic" },
      { id: "input-variants", label: "Variants" },
      { id: "input-sizes", label: "Sizes" },
      { id: "input-status", label: "Status" }
    ]
  }
];

export const inputExamples: ComponentExampleDoc[] = [
  {
    id: "input-basic",
    title: "Basic",
    description: "Simple input rows for search, filters, and short text entry.",
    controlSummary: "placeholder + defaultValue + disabled",
    layout: "start",
    component: <InputBasicDemo />,
    code: createDemoCode({
      demoName: "InputBasicDemo",
      imports: ["Input"],
      body: `
<div className="grid gap-3">
  <Input placeholder="Search components" />
  <Input defaultValue="button" />
  <Input disabled value="Disabled field" onChange={() => undefined} />
</div>`
    })
  },
  {
    id: "input-variants",
    title: "Variants",
    description: "The runtime Input now covers the repeated bordered, gray, and underline shells from Figma.",
    controlSummary: "variant + shape",
    layout: "start",
    component: <InputVariantsDemo />,
    code: createDemoCode({
      demoName: "InputVariantsDemo",
      imports: ["Input"],
      body: `
<div className="grid gap-3">
  <Input variant="bordered" placeholder="Bordered input" />
  <Input variant="gray" placeholder="Gray input" />
  <Input variant="underline" shape="none" placeholder="Underline input" />
</div>`
    })
  },
  {
    id: "input-sizes",
    title: "Sizes",
    description: "Small, default, and large inputs match the repeated size structure on the Figma page.",
    controlSummary: "size",
    layout: "start",
    component: <InputSizesDemo />,
    code: createDemoCode({
      demoName: "InputSizesDemo",
      imports: ["Input"],
      body: `
<div className="grid gap-3">
  <Input size="sm" placeholder="Small input" />
  <Input placeholder="Default input" />
  <Input size="lg" placeholder="Large input" />
</div>`
    })
  },
  {
    id: "input-status",
    title: "Status",
    description: "Validation emphasis stays separate from focus and hover, so the component can reflect invalid and success states clearly.",
    controlSummary: "status",
    layout: "start",
    component: <InputStatusDemo />,
    code: createDemoCode({
      demoName: "InputStatusDemo",
      imports: ["Input"],
      body: `
<div className="grid gap-4">
  <div className="grid gap-1.5">
    <label className="text-sm font-medium text-foreground">Invalid field</label>
    <Input status="invalid" defaultValue="broken-release-tag" aria-describedby="input-invalid-help" />
    <p id="input-invalid-help" className="text-sm text-destructive">
      Use a valid semver tag before publishing.
    </p>
  </div>
  <div className="grid gap-1.5">
    <label className="text-sm font-medium text-foreground">Success field</label>
    <Input status="success" defaultValue="v0.2.1" aria-describedby="input-success-help" />
    <p id="input-success-help" className="text-sm text-success">
      This version is ready to ship.
    </p>
  </div>
</div>`
    })
  }
];
