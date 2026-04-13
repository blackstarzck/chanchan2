import { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@blackstarzck/ui";

import { createDemoCode } from "../../component-doc-helpers";
import type { ComponentExampleDoc, VariationNavGroup } from "../../component-doc-types";

function TabsBasicDemo() {
  return (
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
  );
}

function TabsControlledDemo() {
  const [value, setValue] = useState("preview");

  return (
    <Tabs value={value} onValueChange={setValue} className="w-full">
      <TabsList>
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
        <TabsTrigger value="notes">Notes</TabsTrigger>
      </TabsList>
      <TabsContent value="preview" className="text-sm text-muted-foreground">
        Current tab: {value}
      </TabsContent>
      <TabsContent value="code" className="text-sm text-muted-foreground">
        The page can keep tab state controlled when another panel needs to sync with it.
      </TabsContent>
      <TabsContent value="notes" className="text-sm text-muted-foreground">
        Controlled tabs are useful for inspectors, settings, and docs navigation.
      </TabsContent>
    </Tabs>
  );
}

function TabsVerticalDemo() {
  return (
    <Tabs defaultValue="account" orientation="vertical" className="grid gap-4 md:grid-cols-[220px_minmax(0,1fr)]">
      <TabsList className="h-auto flex-col items-stretch">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="team">Team</TabsTrigger>
        <TabsTrigger value="billing">Billing</TabsTrigger>
      </TabsList>
      <div>
        <TabsContent value="account" className="mt-0 text-sm text-muted-foreground">
          Manage profile fields, notifications, and release identity settings.
        </TabsContent>
        <TabsContent value="team" className="mt-0 text-sm text-muted-foreground">
          Assign owners, reviewers, and environment access for the release flow.
        </TabsContent>
        <TabsContent value="billing" className="mt-0 text-sm text-muted-foreground">
          Review plan limits and package usage before publishing.
        </TabsContent>
      </div>
    </Tabs>
  );
}

export const tabsExampleGroups: VariationNavGroup[] = [
  {
    label: "Core API",
    items: [
      { id: "tabs-basic", label: "Basic" },
      { id: "tabs-controlled", label: "Controlled state" }
    ]
  },
  {
    label: "Layouts",
    items: [{ id: "tabs-vertical", label: "Vertical" }]
  }
];

export const tabsExamples: ComponentExampleDoc[] = [
  {
    id: "tabs-basic",
    title: "Basic",
    description: "Section tabs for docs, inspectors, and settings panels.",
    controlSummary: "defaultValue + TabsList + TabsContent",
    layout: "start",
    component: <TabsBasicDemo />,
    code: createDemoCode({
      demoName: "TabsBasicDemo",
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
    })
  },
  {
    id: "tabs-controlled",
    title: "Controlled state",
    description: "Control the active tab when another part of the page needs to stay in sync.",
    controlSummary: "value + onValueChange",
    layout: "start",
    component: <TabsControlledDemo />,
    code: createDemoCode({
      demoName: "TabsControlledDemo",
      reactImports: ["useState"],
      imports: ["Tabs", "TabsContent", "TabsList", "TabsTrigger"],
      setup: `
const [value, setValue] = useState("preview")
      `,
      body: `
<Tabs value={value} onValueChange={setValue} className="w-full">
  <TabsList>
    <TabsTrigger value="preview">Preview</TabsTrigger>
    <TabsTrigger value="code">Code</TabsTrigger>
    <TabsTrigger value="notes">Notes</TabsTrigger>
  </TabsList>
  <TabsContent value="preview" className="text-sm text-muted-foreground">
    Current tab: {value}
  </TabsContent>
  <TabsContent value="code" className="text-sm text-muted-foreground">
    The page can keep tab state controlled when another panel needs to sync with it.
  </TabsContent>
  <TabsContent value="notes" className="text-sm text-muted-foreground">
    Controlled tabs are useful for inspectors, settings, and docs navigation.
  </TabsContent>
</Tabs>`
    })
  },
  {
    id: "tabs-vertical",
    title: "Vertical",
    description: "Vertical orientation maps to the vertical tab examples on the shared Figma page.",
    controlSummary: "orientation='vertical'",
    layout: "start",
    component: <TabsVerticalDemo />,
    code: createDemoCode({
      demoName: "TabsVerticalDemo",
      imports: ["Tabs", "TabsContent", "TabsList", "TabsTrigger"],
      body: `
<Tabs defaultValue="account" orientation="vertical" className="grid gap-4 md:grid-cols-[220px_minmax(0,1fr)]">
  <TabsList className="h-auto flex-col items-stretch">
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="team">Team</TabsTrigger>
    <TabsTrigger value="billing">Billing</TabsTrigger>
  </TabsList>
  <div>
    <TabsContent value="account" className="mt-0 text-sm text-muted-foreground">
      Manage profile fields, notifications, and release identity settings.
    </TabsContent>
    <TabsContent value="team" className="mt-0 text-sm text-muted-foreground">
      Assign owners, reviewers, and environment access for the release flow.
    </TabsContent>
    <TabsContent value="billing" className="mt-0 text-sm text-muted-foreground">
      Review plan limits and package usage before publishing.
    </TabsContent>
  </div>
</Tabs>`
    })
  }
];
