import { createApiRowsFromPropDefinitions } from "../../component-doc-helpers";
import type {
  ApiRow,
  ComponentPropDefinition,
  FigmaPropMappingDoc
} from "../../component-doc-types";

export const inputPropDefinitions: ComponentPropDefinition[] = [
  {
    name: "variant",
    type: "'bordered' | 'gray' | 'underline'",
    defaultValue: "'bordered'",
    description: "Shell treatment mapped from the repeated Input page families.",
    source: "figma"
  },
  {
    name: "size",
    type: "'sm' | 'default' | 'lg'",
    defaultValue: "'default'",
    description: "Small, default, and large input heights from the main Figma input set.",
    source: "figma"
  },
  {
    name: "shape",
    type: "'rounded' | 'pill' | 'none'",
    defaultValue: "'rounded'",
    description: "Rounded, pill, or flat underline shell mapped from the Figma shape variations.",
    source: "figma"
  },
  {
    name: "status",
    type: "'default' | 'invalid' | 'success'",
    defaultValue: "'default'",
    description: "Validation emphasis derived from the invalid and success page states.",
    source: "figma"
  },
  {
    name: "placeholder",
    type: "string",
    defaultValue: "undefined",
    description: "Hint text shown before the user enters a value.",
    source: "figma",
    figmaNodeId: "4186:34730",
    figmaNodeName: "Placeholder"
  },
  {
    name: "type",
    type: "string",
    defaultValue: "'text'",
    description: "Native input type such as text, email, search, or password.",
    source: "runtime"
  },
  {
    name: "disabled",
    type: "boolean",
    defaultValue: "false",
    description: "Prevents interaction and dims the input shell.",
    source: "runtime"
  },
  {
    name: "readOnly",
    type: "boolean",
    defaultValue: "false",
    description: "Keeps the value selectable while preventing editing.",
    source: "runtime"
  }
];

export const inputApi: ApiRow[] = createApiRowsFromPropDefinitions(inputPropDefinitions);

export const inputFigma: FigmaPropMappingDoc = {
  fileKey: "7Nd8Ml5yOREhJjdCDKggf4",
  nodeId: "4186:34746",
  nodeName: "_input",
  propRules: [
    "Repeated size, shell, shape, and validation patterns on the Input page become public runtime props.",
    "Placeholder stays a native input prop because the main Figma component exposes it as the central content area.",
    "Labels, helper copy, tags, and leading or trailing accessories stay outside the root Input API and are composed with surrounding layout or Input Group patterns.",
    "Hover and focus visuals remain interactive states in CSS, not separate public props."
  ],
  mappings: [
    {
      figmaNodeId: "4186:34730",
      figmaNodeName: "Placeholder",
      reactProp: "placeholder",
      rule: "Primary text area -> native placeholder prop",
      notes: "This keeps the basic input usage close to both HTML and Figma.",
      sourceKind: "content"
    },
    {
      figmaNodeId: "4186:18772",
      figmaNodeName: "Input [NEW]",
      reactProp: "variant / size / shape / status",
      rule: "Observed page matrix -> enum props",
      notes: "The runtime Input now covers the repeated shell patterns instead of a single fixed style.",
      sourceKind: "observed-instance"
    },
    {
      figmaNodeId: "4186:34756",
      figmaNodeName: "Label",
      reactProp: "external label composition",
      rule: "Label row stays outside the root Input primitive",
      notes: "Use a separate label, field wrapper, or Input Group style helper when needed.",
      sourceKind: "content"
    },
    {
      figmaNodeId: "4188:18882",
      figmaNodeName: "Leading",
      reactProp: "Input Group or surrounding composition",
      rule: "Leading accessories are kept out of the root Input API",
      notes: "This avoids turning the base input into a large accessory container.",
      sourceKind: "slot"
    },
    {
      figmaNodeId: "4188:18878",
      figmaNodeName: "Trailing",
      reactProp: "Input Group or surrounding composition",
      rule: "Trailing actions and helper affordances stay in composition",
      notes: "Examples can still show clear layouts without bloating the root Input props.",
      sourceKind: "slot"
    },
    {
      figmaNodeId: "4200:37076",
      figmaNodeName: "This is a feedback message",
      reactProp: "external helper text",
      rule: "Feedback message stays outside the root input element",
      notes: "Validation copy should be rendered by the surrounding form layout.",
      sourceKind: "frame-exception"
    }
  ]
};
