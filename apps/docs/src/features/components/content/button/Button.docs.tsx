import { componentCatalogBySlug } from "../../registry";
import type { ComponentDoc } from "../../component-doc-types";
import { buttonExamples, buttonExampleGroups } from "./Button.demo";
import { buttonApi, buttonFigma } from "./Button.props";

export const buttonDoc: ComponentDoc = {
  ...componentCatalogBySlug.button,
  description:
    "Button now follows the same authored docs structure as Card: the runtime button primitive stays in the UI package, docs examples are stored separately from the copied code, and the public props are described from the Figma button anatomy and the wider button matrix.",
  whenToUse: [
    "Use Button for primary actions, compact commands, and inline text actions.",
    "Use the variant and tone props to cover the repeated visual matrix from the Figma button pages.",
    "Use the leading, badge, and trailing slots when the button needs extra context without introducing a second button component."
  ],
  importCode: `import { Button } from "@blackstarzck/ui";
import { ArrowRight, House, LoaderCircle } from "lucide-react";`,
  examples: buttonExamples,
  variations: buttonExamples,
  variationGroups: buttonExampleGroups,
  api: buttonApi,
  figma: buttonFigma,
  tokens: [
    { name: "primary", usage: "Default solid button background." },
    { name: "primary-soft", usage: "Soft and ghost emphasis background." },
    { name: "border", usage: "Outline, white, and slot divider treatments." }
  ],
  accessibility: [
    "Use an explicit label or `aria-label`, especially for icon-only button sizes.",
    "Do not rely on color alone to communicate destructive or success intent.",
    "When `asChild` is used, the child element must stay focusable and keyboard accessible."
  ]
};
