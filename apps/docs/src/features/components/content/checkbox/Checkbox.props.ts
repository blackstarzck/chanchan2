import { createApiRowsFromPropDefinitions } from "../../component-doc-helpers";
import type {
  ApiRow,
  ComponentPropDefinition,
  FigmaPropMappingDoc
} from "../../component-doc-types";

export const checkboxPropDefinitions: ComponentPropDefinition[] = [
  {
    name: "checked",
    type: "boolean | 'indeterminate'",
    defaultValue: "false",
    description: "Controlled checkbox state from the Radix root primitive.",
    source: "runtime"
  },
  {
    name: "defaultChecked",
    type: "boolean | 'indeterminate'",
    defaultValue: "undefined",
    description: "Initial uncontrolled state for the checkbox.",
    source: "runtime"
  },
  {
    name: "disabled",
    type: "boolean",
    defaultValue: "false",
    description: "Prevents interaction and dims the control.",
    source: "runtime"
  },
  {
    name: "required",
    type: "boolean",
    defaultValue: "false",
    description: "Marks the checkbox as required in forms.",
    source: "runtime"
  },
  {
    name: "onCheckedChange",
    type: "(checked: boolean | 'indeterminate') => void",
    defaultValue: "undefined",
    description: "Called when the Radix checkbox state changes.",
    source: "runtime"
  },
  {
    name: "className",
    type: "string",
    defaultValue: "undefined",
    description: "Override the visual shell when a different checkbox size or tone is needed.",
    source: "runtime"
  }
];

export const checkboxApi: ApiRow[] = createApiRowsFromPropDefinitions(checkboxPropDefinitions);

export const checkboxFigma: FigmaPropMappingDoc = {
  fileKey: "7Nd8Ml5yOREhJjdCDKggf4",
  nodeId: "4237:21650",
  nodeName: "_checkbox",
  propRules: [
    "The Radix root keeps state props such as checked, defaultChecked, disabled, and onCheckedChange.",
    "The larger Figma checkbox row is treated as composition: the control stays in `Checkbox`, while labels and helper copy map to `CheckboxLabel`, `CheckboxDescription`, and layout helpers.",
    "One-off trailing icons from the Figma showcase rows stay example-only content, not public root props.",
    "The docs examples use the helper layout components to stay close to the Figma anatomy without inflating the root checkbox API."
  ],
  mappings: [
    {
      figmaNodeId: "4237:21642",
      figmaNodeName: "Check Icon",
      reactProp: "checked / defaultChecked",
      rule: "Control shell + indicator -> Radix state props",
      notes: "The visual shell is driven by the Radix root and indicator, not by a separate wrapper prop.",
      sourceKind: "runtime"
    },
    {
      figmaNodeId: "4237:21645",
      figmaNodeName: "Label",
      reactProp: "CheckboxLabel",
      rule: "Primary text node -> companion composition component",
      notes: "The label stays external to the root checkbox primitive.",
      sourceKind: "content"
    },
    {
      figmaNodeId: "4237:21646",
      figmaNodeName: "Description text",
      reactProp: "CheckboxDescription",
      rule: "Secondary text node -> companion composition component",
      notes: "Use when the choice needs additional explanation.",
      sourceKind: "content"
    },
    {
      figmaNodeId: "4364:123372",
      figmaNodeName: "Inline",
      reactProp: "CheckboxField / CheckboxContent / CheckboxSupport",
      rule: "Observed row anatomy -> layout helper components",
      notes: "These helpers keep the row composition close to the Figma structure without adding extra root props.",
      sourceKind: "observed-instance"
    },
    {
      figmaNodeId: "4243:23982",
      figmaNodeName: "table",
      reactProp: "demo only",
      rule: "Showcase trailing icon -> example-only composition",
      notes: "Trailing accessory icons can be composed manually when needed.",
      sourceKind: "frame-exception"
    }
  ]
};
