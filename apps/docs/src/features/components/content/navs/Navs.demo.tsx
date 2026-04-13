import { House } from "lucide-react";

import { Badge, Navs, NavsLink } from "@blackstarzck/ui";

import { createDemoCode } from "../../component-doc-helpers";
import type { ComponentExampleDoc, VariationNavGroup } from "../../component-doc-types";

function NavsBasicDemo() {
  return (
    <Navs>
      <NavsLink href="#overview" active>Overview</NavsLink>
      <NavsLink href="#api">API</NavsLink>
      <NavsLink href="#examples">Examples</NavsLink>
    </Navs>
  );
}

function NavsBorderedDemo() {
  return (
    <Navs className="w-[854px] max-w-full" variant="bordered" fill="equal">
      <NavsLink href="#overview" active>Overview</NavsLink>
      <NavsLink href="#api">API</NavsLink>
      <NavsLink href="#examples">Examples</NavsLink>
    </Navs>
  );
}

function NavsIconDemo() {
  return (
    <Navs>
      <NavsLink href="#home" active>
        <House className="size-4" />
        Home
      </NavsLink>
      <NavsLink href="#projects">Projects</NavsLink>
      <NavsLink href="#settings">Settings</NavsLink>
    </Navs>
  );
}

function NavsBadgeDemo() {
  return (
    <Navs className="w-[854px] max-w-full" variant="bordered" fill="equal">
      <NavsLink href="#profile" active>Profile</NavsLink>
      <NavsLink href="#teams">Teams</NavsLink>
      <NavsLink href="#projects" state="hover">
        Projects
        <Badge variant="accent" size="sm">3</Badge>
      </NavsLink>
      <NavsLink href="#connections" disabled>Connections</NavsLink>
    </Navs>
  );
}

function NavsVerticalDemo() {
  return (
    <Navs className="max-w-52" orientation="vertical">
      <NavsLink href="#general" active>General</NavsLink>
      <NavsLink href="#members">Members</NavsLink>
      <NavsLink href="#billing">Billing</NavsLink>
    </Navs>
  );
}

export const navsExampleGroups: VariationNavGroup[] = [
  {
    label: "Core API",
    items: [
      { id: "navs-basic", label: "Basic" },
      { id: "navs-bordered", label: "Bordered" },
      { id: "navs-vertical", label: "Vertical" }
    ]
  },
  {
    label: "Composition",
    items: [
      { id: "navs-icons", label: "Icons" },
      { id: "navs-badges", label: "Badges" }
    ]
  }
];

export const navsExamples: ComponentExampleDoc[] = [
  {
    id: "navs-basic",
    title: "Basic",
    description: "The base nav primitive renders lightweight URL-backed links.",
    controlSummary: "active links + anchors",
    layout: "start",
    component: <NavsBasicDemo />,
    code: createDemoCode({
      demoName: "NavsBasicDemo",
      imports: ["Navs", "NavsLink"],
      body: `
<Navs>
  <NavsLink href="#overview" active>Overview</NavsLink>
  <NavsLink href="#api">API</NavsLink>
  <NavsLink href="#examples">Examples</NavsLink>
</Navs>`
    })
  },
  {
    id: "navs-bordered",
    title: "Bordered",
    description: "Bordered navigation keeps the link model while shifting the active affordance to the bottom indicator.",
    controlSummary: "variant + fill",
    layout: "start",
    component: <NavsBorderedDemo />,
    code: createDemoCode({
      demoName: "NavsBorderedDemo",
      imports: ["Navs", "NavsLink"],
      body: `
<Navs className="w-[854px] max-w-full" variant="bordered" fill="equal">
  <NavsLink href="#overview" active>Overview</NavsLink>
  <NavsLink href="#api">API</NavsLink>
  <NavsLink href="#examples">Examples</NavsLink>
</Navs>`
    })
  },
  {
    id: "navs-icons",
    title: "With icons",
    description: "Icons can sit alongside labels without changing the underlying navigation semantics.",
    controlSummary: "children composition",
    layout: "start",
    component: <NavsIconDemo />,
    code: createDemoCode({
      demoName: "NavsIconDemo",
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
    })
  },
  {
    id: "navs-badges",
    title: "With badges",
    description: "Badges let a nav communicate pending work without becoming a separate filter control.",
    controlSummary: "badge child + disabled state",
    layout: "start",
    component: <NavsBadgeDemo />,
    code: createDemoCode({
      demoName: "NavsBadgeDemo",
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
    })
  },
  {
    id: "navs-vertical",
    title: "Vertical",
    description: "A vertical stack works well in side panels where local sections need lighter affordances than a full sidebar.",
    controlSummary: "orientation",
    layout: "start",
    component: <NavsVerticalDemo />,
    code: createDemoCode({
      demoName: "NavsVerticalDemo",
      imports: ["Navs", "NavsLink"],
      body: `
<Navs className="max-w-52" orientation="vertical">
  <NavsLink href="#general" active>General</NavsLink>
  <NavsLink href="#members">Members</NavsLink>
  <NavsLink href="#billing">Billing</NavsLink>
</Navs>`
    })
  }
];
