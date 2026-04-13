import { componentCatalogBySlug } from "../../registry";
import type { ComponentDoc } from "../../component-doc-types";
import { inputGroupExamples, inputGroupExampleGroups } from "./InputGroup.demo";
import { inputGroupApi, inputGroupFigma } from "./InputGroup.props";

export const inputGroupDoc: ComponentDoc = {
  ...componentCatalogBySlug["input-group"],
  description:
    "Input Group is now documented as a compound field shell. Runtime code stays focused on reusable slots, while docs examples show copyable JSX for addons, actions, validation messages, and compact controls.",
  whenToUse: [
    "Use Input Group when a field needs fixed leading or trailing context such as a URL prefix, suffix, unit, or icon.",
    "Use addons for visual context, and keep the actual label and helper text outside the input shell.",
    "Use Input directly when there is no fixed surrounding content."
  ],
  importCode: `import {
  InputGroup,
  InputGroupAddon,
  InputGroupField
} from "@blackstarzck/ui";`,
  examples: inputGroupExamples,
  variations: inputGroupExamples,
  variationGroups: inputGroupExampleGroups,
  api: inputGroupApi,
  figma: inputGroupFigma,
  tokens: [
    { name: "input", usage: "Default grouped shell border tone." },
    { name: "secondary", usage: "Gray grouped shell surface." },
    { name: "destructive", usage: "Invalid grouped field emphasis." },
    { name: "success", usage: "Success grouped field emphasis." }
  ],
  accessibility: [
    "Do not use addons as the only label; the field purpose still needs a visible label or aria-label.",
    "If an addon contains an interactive control, keep its focus order and accessible label explicit.",
    "Pair invalid and success states with visible helper text so the meaning is not color-only."
  ]
};
