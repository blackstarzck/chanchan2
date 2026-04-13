import { componentCatalogBySlug } from "../../registry";
import type { ComponentDoc } from "../../component-doc-types";
import { checkboxExamples, checkboxExampleGroups } from "./Checkbox.demo";
import { checkboxApi, checkboxFigma } from "./Checkbox.props";

export const checkboxDoc: ComponentDoc = {
  ...componentCatalogBySlug.checkbox,
  description:
    "Checkbox is now documented with the same authored structure as Card. The Radix root primitive owns the state props, while the larger row anatomy from Figma is expressed through companion layout components and separate docs examples.",
  whenToUse: [
    "Use Checkbox for multi-select settings, acknowledgements, and bulk row actions.",
    "Keep the root API focused on state, and use the field helpers for label and description layout.",
    "Use the indeterminate state when the checkbox represents a partial selection."
  ],
  importCode: `import {
  Checkbox,
  CheckboxContent,
  CheckboxDescription,
  CheckboxField,
  CheckboxLabel,
  CheckboxSupport
} from "@blackstarzck/ui";
import { Info } from "lucide-react";`,
  examples: checkboxExamples,
  variations: checkboxExamples,
  variationGroups: checkboxExampleGroups,
  api: checkboxApi,
  figma: checkboxFigma,
  tokens: [
    { name: "primary", usage: "Checked indicator and active shell emphasis." },
    { name: "input", usage: "Unchecked shell border and background." },
    { name: "muted-foreground", usage: "Description and support text tone." }
  ],
  accessibility: [
    "Pair every checkbox with clear visible text or an explicit `aria-label`.",
    "Use the indeterminate state only when the selection is partially complete, not as a third permanent choice.",
    "Keep helper copy close to the control so the meaning of the choice remains clear."
  ]
};
