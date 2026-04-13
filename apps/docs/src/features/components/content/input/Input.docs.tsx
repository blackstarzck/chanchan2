import { componentCatalogBySlug } from "../../registry";
import type { ComponentDoc } from "../../component-doc-types";
import { inputExamples, inputExampleGroups } from "./Input.demo";
import { inputApi, inputFigma } from "./Input.props";

export const inputDoc: ComponentDoc = {
  ...componentCatalogBySlug.input,
  description:
    "Input now uses the same authored docs structure as the other upgraded components. The runtime primitive covers the repeated Figma shell matrix with explicit variant, size, shape, and status props, while labels, helper copy, and richer accessories stay in surrounding field composition.",
  whenToUse: [
    "Use Input for short, structured text entry such as search, names, versions, and email fields.",
    "Use the new variant, size, shape, and status props when the field needs to match the repeated Figma shell patterns.",
    "Keep labels, helper text, and richer accessories outside the root input element so the base primitive stays lightweight."
  ],
  importCode: `import { Input } from "@blackstarzck/ui";`,
  examples: inputExamples,
  variations: inputExamples,
  variationGroups: inputExampleGroups,
  api: inputApi,
  figma: inputFigma,
  tokens: [
    { name: "input", usage: "Default bordered input shell tone." },
    { name: "secondary", usage: "Gray input background." },
    { name: "destructive", usage: "Invalid field emphasis." },
    { name: "success", usage: "Success field emphasis." }
  ],
  accessibility: [
    "Associate every input with a visible label or an explicit aria-label.",
    "Do not rely on placeholder text as the only label or instruction.",
    "Pair invalid and success states with helper text so the meaning is clear beyond color alone."
  ]
};
