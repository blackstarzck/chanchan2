import type { ComponentCatalogItem } from "./registry";
import { componentCatalog } from "./registry";
import { createDemoCode, DemoSurface } from "./component-doc-helpers";
import type { ComponentDoc } from "./component-doc-types";
export type { ComponentDoc } from "./component-doc-types";
import { buttonDoc } from "./content/button/Button.docs";
import { cardDoc } from "./content/card/Card.docs";
import { checkboxDoc } from "./content/checkbox/Checkbox.docs";
import { dialogDoc } from "./content/dialog/Dialog.docs";
import { inputGroupDoc } from "./content/input-group/InputGroup.docs";
import { inputDoc } from "./content/input/Input.docs";
import { selectDoc } from "./content/select/Select.docs";
import { tabsDoc } from "./content/tabs/Tabs.docs";
import {
  accordionDoc,
  alertDoc,
  avatarDoc,
  badgeDoc,
  blockquoteDoc,
  brandsAvatarsDoc,
  buttonGroupDoc,
  buttonIconsDoc,
  progressDoc,
  radioGroupDoc,
  sidebarDoc,
  switchDoc,
  tableDoc,
  tooltipDoc
} from "./ui/complex-component-docs";
import { allFigmaSampleDocs } from "./ui/figma-sample-component-docs";
import {
  breadcrumbDoc,
  carouselDoc,
  datePickerDoc,
  dropdownMenuDoc,
  dropzoneDoc,
  fileInputDoc,
  legendIndicatorDoc,
  listGroupDoc,
  navbarDoc,
  numberFieldDoc,
  paginationDoc,
  passwordFieldDoc,
  pinInputDoc,
  popoverDoc,
  ratingDoc,
  richTextToolbarDoc,
  sheetDoc,
  skeletonDoc,
  sliderDoc,
  spinnerDoc,
  timelineDoc,
  uploadListDoc
} from "./ui/simple-component-docs";

const docs = [
  buttonDoc,
  buttonIconsDoc,
  badgeDoc,
  avatarDoc,
  brandsAvatarsDoc,
  blockquoteDoc,
  buttonGroupDoc,
  cardDoc,
  skeletonDoc,
  checkboxDoc,
  radioGroupDoc,
  switchDoc,
  accordionDoc,
  breadcrumbDoc,
  inputDoc,
  inputGroupDoc,
  selectDoc,
  datePickerDoc,
  numberFieldDoc,
  passwordFieldDoc,
  pinInputDoc,
  sliderDoc,
  fileInputDoc,
  dropzoneDoc,
  ratingDoc,
  richTextToolbarDoc,
  paginationDoc,
  navbarDoc,
  dialogDoc,
  popoverDoc,
  dropdownMenuDoc,
  sheetDoc,
  tabsDoc,
  carouselDoc,
  legendIndicatorDoc,
  listGroupDoc,
  tableDoc,
  timelineDoc,
  uploadListDoc,
  tooltipDoc,
  sidebarDoc,
  progressDoc,
  spinnerDoc,
  alertDoc,
  ...allFigmaSampleDocs
];

const docMap = Object.fromEntries(docs.map((doc) => [doc.slug, doc] as const));

export function getComponentDoc(slug: string): ComponentDoc | null {
  const existing = docMap[slug];
  if (existing) return existing;

  const item = componentCatalog.find((entry) => entry.slug === slug);
  if (!item) return null;

  return createFallbackDoc(item);
}

function createFallbackDoc(item: ComponentCatalogItem): ComponentDoc {
  const importName = toPascalIdentifier(item.name);

  return {
    ...item,
    whenToUse: [`Use ${item.name} where ${item.summary.toLowerCase()}`],
    importCode: `import { ${importName} } from "@blackstarzck/ui";`,
    description: `${item.name} is indexed in the docs registry, but its authored examples and API reference have not been split into the new AntD-style docs structure yet.`,
    variations: [
      {
        id: `${item.slug}-placeholder`,
        title: "Detail coming next",
        description: "This component is already indexed and will use the same docs template.",
        controlSummary: "registry-driven docs entry",
        code: createDemoCode({
          demoName: `${importName}Demo`,
          imports: [importName],
          body: `
<div className="border-l border-border pl-4 text-sm text-muted-foreground">
  ${item.name} examples will be added here.
</div>`
        }),
        component: (
          <DemoSurface>
            <div className="border-l border-border pl-4 text-sm text-muted-foreground">
              This component is already discoverable in the new docs IA. Variation samples and API
              details can now be added without changing the page layout.
            </div>
          </DemoSurface>
        )
      }
    ],
    api: [{ name: "children", type: "ReactNode", defaultValue: "varies", description: "Component-specific props will be documented here." }],
    tokens: [{ name: "semantic tokens", usage: "Styled through global theme variables." }],
    accessibility: ["Accessibility guidance will be filled in with the component-specific examples."]
  };
}

function toPascalIdentifier(value: string) {
  const identifier = value
    .replace(/&/g, " and ")
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .split(/\s+/)
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join("");

  return identifier || "Component";
}
