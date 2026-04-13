import { componentCatalogBySlug } from "../../registry";
import type { ComponentDoc } from "../../component-doc-types";
import { selectExamples, selectExampleGroups } from "./Select.demo";
import { selectApi, selectFigma } from "./Select.props";

export const selectDoc: ComponentDoc = {
  ...componentCatalogBySlug.select,
  description:
    "Select now uses the same authored docs structure as the other upgraded components. The runtime API stays rooted in Radix state props, while the visible advanced-select pattern from Figma is expressed through trigger, content, group, and item composition.",
  whenToUse: [
    "Use Select when the option set is known and short enough to scan inside a dropdown.",
    "Keep value and open state on the Radix root when the surrounding page needs to coordinate selection.",
    "Use grouped labels and separators when the dropdown has multiple sections or ownership categories."
  ],
  importCode: `import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue
} from "@blackstarzck/ui";`,
  examples: selectExamples,
  variations: selectExamples,
  variationGroups: selectExampleGroups,
  api: selectApi,
  figma: selectFigma,
  tokens: [
    { name: "input", usage: "Trigger shell border and field tone." },
    { name: "popover", usage: "Dropdown menu surface background." },
    { name: "accent", usage: "Focused option background." }
  ],
  accessibility: [
    "Provide a clear label or placeholder so the purpose of the select is obvious before opening it.",
    "Keep option text concise and predictable so keyboard users can scan the list quickly.",
    "Do not rely on decorative avatars or icons alone to communicate the meaning of an option."
  ]
};
