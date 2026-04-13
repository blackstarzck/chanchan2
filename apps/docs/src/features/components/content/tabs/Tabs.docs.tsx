import { componentCatalogBySlug } from "../../registry";
import type { ComponentDoc } from "../../component-doc-types";
import { tabsExamples, tabsExampleGroups } from "./Tabs.demo";
import { tabsApi, tabsFigma } from "./Tabs.props";

export const tabsDoc: ComponentDoc = {
  ...componentCatalogBySlug.tabs,
  description:
    "Tabs now uses the same authored docs structure as the other upgraded components. The runtime API stays focused on Radix tab state and orientation, while the broader Navs/Tabs Figma page is interpreted as a mix of panel tabs and navigation-only styles.",
  whenToUse: [
    "Use Tabs for peer sections inside one stable context such as settings, docs panels, or inspectors.",
    "Control the active value only when another part of the page needs to stay in sync.",
    "Use vertical orientation when the list needs to behave more like a side rail than a top bar."
  ],
  importCode: `import { Tabs, TabsContent, TabsList, TabsTrigger } from "@blackstarzck/ui";`,
  examples: tabsExamples,
  variations: tabsExamples,
  variationGroups: tabsExampleGroups,
  api: tabsApi,
  figma: tabsFigma,
  tokens: [
    { name: "secondary", usage: "Tabs list background." },
    { name: "background", usage: "Active trigger surface and panel background." },
    { name: "border", usage: "Panel outline." }
  ],
  accessibility: [
    "Tab labels should describe the content of the panel clearly and uniquely.",
    "Keep the number of tabs manageable so keyboard users can move across them quickly.",
    "When tabs are vertical, preserve a clear relationship between the tab list and the visible panel."
  ]
};
