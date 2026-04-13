import { componentCatalogBySlug } from "../../registry";
import type { ComponentDoc } from "../../component-doc-types";
import { navsExamples, navsExampleGroups } from "./Navs.demo";
import { navsApi, navsFigma } from "./Navs.props";

export const navsDoc: ComponentDoc = {
  ...componentCatalogBySlug.navs,
  description:
    "Navs now follows the same authored docs structure as the upgraded components. The runtime component owns URL-backed navigation links, while panel switching remains in Tabs.",
  whenToUse: [
    "Use Navs for lightweight section wayfinding when each item is a real link or anchor.",
    "Use the bordered variant when the active state should read like an underline tab row.",
    "Use Tabs instead when selecting an item changes an in-page panel and needs Radix tab keyboard behavior."
  ],
  importCode: `import { Navs, NavsLink } from "@blackstarzck/ui";`,
  examples: navsExamples,
  variations: navsExamples,
  variationGroups: navsExampleGroups,
  api: navsApi,
  figma: navsFigma,
  tokens: [
    { name: "border", usage: "Bottom rail and inactive tab indicators in the bordered variant." },
    { name: "primary", usage: "Active tab label color in the bordered variant." },
    { name: "secondary", usage: "Default active pill background." }
  ],
  accessibility: [
    "Keep Navs URL-backed so state can be shared and restored.",
    "Use aria-current through the active prop for the current page or section link.",
    "If the interaction changes panels instead of navigation location, prefer Tabs."
  ]
};
