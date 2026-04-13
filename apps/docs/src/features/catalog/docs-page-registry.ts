import { componentCatalog } from "../components/registry";

export type DocsCatalogGroup =
  | "Templates"
  | "Customization"
  | "Layout"
  | "Content"
  | "Components";

type StaticCatalogPage = {
  body: string[];
  description: string;
  group: DocsCatalogGroup;
  id: string;
  isNew?: boolean;
  kind: "static";
  label: string;
  to: string;
  title: string;
};

type ComponentCatalogPage = {
  componentSlug: string;
  group: DocsCatalogGroup;
  id: string;
  isNew?: boolean;
  kind: "component";
  label: string;
  to: string;
};

export type DocsCatalogPage = StaticCatalogPage | ComponentCatalogPage;

const staticCatalogPages: StaticCatalogPage[] = [
  {
    id: "templates-cms",
    group: "Templates",
    kind: "static",
    label: "CMS",
    title: "CMS",
    to: "/templates/cms",
    isNew: true,
    description: "Content-heavy marketing and admin surfaces based on the Figma page set.",
    body: [
      "This placeholder route keeps the docs tree aligned with the Figma Pages panel while the full CMS template work is being documented.",
      "Use this section for layout rules, component combinations, and content density guidance specific to CMS-style screens."
    ]
  },
  {
    id: "templates-ai-chat",
    group: "Templates",
    kind: "static",
    label: "AI Chat",
    title: "AI Chat",
    to: "/templates/ai-chat",
    isNew: true,
    description: "Conversational layouts, tool panels, and message density patterns.",
    body: [
      "The AI Chat template slot is reserved for prompt surfaces, assistant message flows, and side-panel tool integrations.",
      "It exists now so the left navigation matches the Figma source of truth even before the page content is fully authored."
    ]
  },
  {
    id: "templates-agency",
    group: "Templates",
    kind: "static",
    label: "Agency",
    title: "Agency",
    to: "/templates/agency",
    isNew: true,
    description: "Landing-page and studio-style compositions used in the Figma template set.",
    body: [
      "Agency covers hero layouts, service grids, case-study sections, and contact flows.",
      "This route is currently a placeholder so the published docs stay synchronized with the Figma page tree."
    ]
  },
  {
    id: "templates-coffee-shop",
    group: "Templates",
    kind: "static",
    label: "Coffee Shop",
    title: "Coffee Shop",
    to: "/templates/coffee-shop",
    isNew: true,
    description: "Retail-style template documentation for menus, promos, and lightweight ordering.",
    body: [
      "Coffee Shop is included to mirror the Figma library structure and reserve space for storefront template patterns.",
      "Add merchandising, product-card, and location modules here when the implementation pass begins."
    ]
  },
  {
    id: "templates-personal",
    group: "Templates",
    kind: "static",
    label: "Personal",
    title: "Personal",
    to: "/templates/personal",
    isNew: true,
    description: "Portfolio and resume-like page assemblies from the Figma page list.",
    body: [
      "Personal is intended for biography, project-summary, and timeline-based personal site layouts.",
      "It is exposed now so the docs navigation matches the page inventory in Figma."
    ]
  },
  {
    id: "customization-colors",
    group: "Customization",
    kind: "static",
    label: "Colors",
    title: "Colors",
    to: "/customization/colors",
    isNew: true,
    description: "Semantic color decisions, palette application rules, and preview override guidance.",
    body: [
      "This page is where palette tokens, semantic role mapping, and brand color usage should be documented.",
      "It exists now because the Figma page structure already includes Colors under Customization."
    ]
  },
  {
    id: "layout-grid-layout",
    group: "Layout",
    kind: "static",
    label: "Grid Layout",
    title: "Grid Layout",
    to: "/layout/grid-layout",
    description: "Grid rules, column behavior, and spacing systems for the docs and page templates.",
    body: [
      "Grid Layout was missing from the published docs tree. This route restores the page slot from the Figma source.",
      "Document responsive column rules, gutters, breakpoints, and page-width constraints here."
    ]
  },
  {
    id: "layout-containers",
    group: "Layout",
    kind: "static",
    label: "Containers",
    title: "Containers",
    to: "/layout/containers",
    description: "Container widths, section shells, and nested layout surfaces.",
    body: [
      "Containers should cover page shells, content widths, split layouts, and safe-area behavior.",
      "Use this page for container sizing rules and examples that should stay aligned with the Figma file."
    ]
  },
  {
    id: "content-typography",
    group: "Content",
    kind: "static",
    label: "Typography",
    title: "Typography",
    to: "/content/typography",
    description: "Type scale, editorial hierarchy, and long-form content guidance.",
    body: [
      "Typography reserves a page slot for heading systems, body copy rules, and editorial spacing.",
      "This route exists so the docs navigation matches the page structure already defined in Figma."
    ]
  },
  {
    id: "content-links",
    group: "Content",
    kind: "static",
    label: "Links",
    title: "Links",
    to: "/content/links",
    description: "Text link behavior, inline emphasis, and link-list usage patterns.",
    body: [
      "Links is intended for inline anchors, footer lists, navigation text links, and content-link treatments.",
      "Keep route-backed navigation rules and hover/focus guidance here."
    ]
  },
  {
    id: "content-dividers",
    group: "Content",
    kind: "static",
    label: "Dividers",
    title: "Dividers",
    to: "/content/dividers",
    description: "Rhythm, separation, and grouping rules for content blocks and dense interface regions.",
    body: [
      "Dividers is a content-level page in the Figma Pages tree, separate from the Separator component API itself.",
      "Use this route to document when visual separators should appear, how much spacing they pair with, and when whitespace alone is the better grouping tool."
    ]
  },
  {
    id: "content-kbd",
    group: "Content",
    kind: "static",
    label: "<kbd>",
    title: "<kbd>",
    to: "/content/kbd",
    description: "Keyboard hint styling and command-surface notation.",
    body: [
      "This page is reserved for keyboard shortcut tokens, hint pills, and editor command legends.",
      "It remains a placeholder until the inline code and keyboard primitive guidance is authored."
    ]
  }
];

const componentLabelOverrides: Partial<Record<(typeof componentCatalog)[number]["slug"], string>> = {
  alert: "Alerts"
};

const componentNewFlags: Partial<Record<(typeof componentCatalog)[number]["slug"], boolean>> = {
  avatar: true
};

const componentCatalogPages: ComponentCatalogPage[] = [...componentCatalog]
  .map((component) => ({
    componentSlug: component.slug,
    group: "Components" as const,
    id: `component-${component.slug}`,
    isNew: componentNewFlags[component.slug] ?? false,
    kind: "component" as const,
    label: componentLabelOverrides[component.slug] ?? component.name,
    to: `/components/${component.slug}`
  }))
  .sort((left, right) => left.label.localeCompare(right.label));

export const docsCatalogGroups: Array<{
  items: DocsCatalogPage[];
  label: DocsCatalogGroup;
}> = (["Templates", "Customization", "Layout", "Content", "Components"] as const).map((group) => ({
  label: group,
  items: [...staticCatalogPages, ...componentCatalogPages].filter((item) => item.group === group)
}));

const staticCatalogPageMap = Object.fromEntries(
  staticCatalogPages.map((page) => [page.id, page] as const)
);

export function getStaticCatalogPage(section: string, slug: string) {
  return staticCatalogPageMap[`${section}-${slug}`] ?? null;
}
