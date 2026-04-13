import { useState } from "react";

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@blackstarzck/ui";

import { createDemoCode } from "../../component-doc-helpers";
import type { ComponentExampleDoc, VariationNavGroup } from "../../component-doc-types";

function DialogConfirmationDemo() {
  return (
    <Dialog defaultOpen>
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
    </Dialog>
  );
}

function DialogControlledDemo() {
  const [open, setOpen] = useState(true);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Review release notes</DialogTitle>
          <DialogDescription>
            This example keeps the dialog controlled so docs can show the runtime state API clearly.
          </DialogDescription>
        </DialogHeader>
        <div className="rounded-lg border border-border bg-muted/40 p-4 text-sm text-muted-foreground">
          Current state: {open ? "open" : "closed"}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Close
          </Button>
          <Button onClick={() => setOpen(true)}>Keep open</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function DialogStructuredBodyDemo() {
  return (
    <Dialog defaultOpen>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Prepare release checklist</DialogTitle>
          <DialogDescription>
            Use the body slot for richer content while the footer remains focused on decision actions.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-3 text-sm text-muted-foreground">
          <div className="rounded-lg border border-border bg-muted/40 p-4">
            Package build completed successfully and preview artifacts are ready for review.
          </div>
          <ul className="grid gap-2 pl-5 text-foreground">
            <li>Verify changelog summary</li>
            <li>Confirm package tag and release branch</li>
            <li>Notify launch channel after publish</li>
          </ul>
        </div>
        <DialogFooter>
          <Button variant="outline">Back</Button>
          <Button>Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export const dialogExampleGroups: VariationNavGroup[] = [
  {
    label: "Core API",
    items: [
      { id: "dialog-confirmation", label: "Confirmation" },
      { id: "dialog-controlled", label: "Controlled state" }
    ]
  },
  {
    label: "Composition",
    items: [{ id: "dialog-structured-body", label: "Structured body" }]
  }
];

export const dialogExamples: ComponentExampleDoc[] = [
  {
    id: "dialog-confirmation",
    title: "Confirmation",
    description: "Standard confirmation flow with a trigger, structured header, and footer actions.",
    controlSummary: "DialogTrigger + DialogContent + DialogFooter",
    layout: "center",
    component: <DialogConfirmationDemo />,
    code: createDemoCode({
      demoName: "DialogConfirmationDemo",
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
    })
  },
  {
    id: "dialog-controlled",
    title: "Controlled state",
    description: "The Radix root can stay fully controlled when the page needs to coordinate open state.",
    controlSummary: "open + onOpenChange",
    layout: "center",
    component: <DialogControlledDemo />,
    code: createDemoCode({
      demoName: "DialogControlledDemo",
      reactImports: ["useState"],
      imports: [
        "Button",
        "Dialog",
        "DialogContent",
        "DialogDescription",
        "DialogFooter",
        "DialogHeader",
        "DialogTitle"
      ],
      setup: `
const [open, setOpen] = useState(false)
      `,
      body: `
<div className="flex flex-wrap gap-3">
  <Button onClick={() => setOpen(true)}>Open dialog</Button>
  <Dialog open={open} onOpenChange={setOpen}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Review release notes</DialogTitle>
        <DialogDescription>
          This example keeps the dialog controlled so the page can coordinate open state explicitly.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button variant="outline" onClick={() => setOpen(false)}>
          Close
        </Button>
        <Button onClick={() => setOpen(false)}>Done</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</div>`
    })
  },
  {
    id: "dialog-structured-body",
    title: "Structured body",
    description: "Use the body area for richer content while keeping the footer reserved for the decision row.",
    controlSummary: "free body content + footer actions",
    layout: "center",
    component: <DialogStructuredBodyDemo />,
    code: createDemoCode({
      demoName: "DialogStructuredBodyDemo",
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
    <Button variant="outline">Prepare release</Button>
  </DialogTrigger>
  <DialogContent className="max-w-xl">
    <DialogHeader>
      <DialogTitle>Prepare release checklist</DialogTitle>
      <DialogDescription>
        Use the body slot for richer content while the footer remains focused on decision actions.
      </DialogDescription>
    </DialogHeader>
    <div className="grid gap-3 text-sm text-muted-foreground">
      <div className="rounded-lg border border-border bg-muted/40 p-4">
        Package build completed successfully and preview artifacts are ready for review.
      </div>
      <ul className="grid gap-2 pl-5 text-foreground">
        <li>Verify changelog summary</li>
        <li>Confirm package tag and release branch</li>
        <li>Notify launch channel after publish</li>
      </ul>
    </div>
    <DialogFooter>
      <Button variant="outline">Back</Button>
      <Button>Continue</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`
    })
  }
];
