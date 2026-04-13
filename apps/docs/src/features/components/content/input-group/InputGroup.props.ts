import { createApiRowsFromPropDefinitions } from "../../component-doc-helpers";
import type {
  ApiRow,
  ComponentPropDefinition,
  FigmaPropMappingDoc
} from "../../component-doc-types";

export const inputGroupPropDefinitions: ComponentPropDefinition[] = [
  {
    name: "variant",
    type: "'bordered' | 'gray' | 'underline'",
    defaultValue: "'bordered'",
    description: "Shell treatment shared with Input and applied to the grouped field container.",
    source: "figma"
  },
  {
    name: "size",
    type: "'sm' | 'default' | 'lg'",
    defaultValue: "'default'",
    description: "Field density shared with Input and inherited by InputGroupField.",
    source: "figma"
  },
  {
    name: "shape",
    type: "'rounded' | 'pill' | 'none'",
    defaultValue: "'rounded'",
    description: "Group shell radius shared with the Figma Input shape matrix.",
    source: "figma"
  },
  {
    name: "status",
    type: "'default' | 'invalid' | 'success'",
    defaultValue: "'default'",
    description: "Validation emphasis shared with Input and inherited by the field.",
    source: "figma"
  },
  {
    name: "side",
    type: "'start' | 'end'",
    defaultValue: "'start'",
    description: "Controls which edge an addon attaches to.",
    source: "runtime"
  },
  {
    name: "children",
    type: "ReactNode",
    defaultValue: "required",
    description: "Compose InputGroupAddon, InputGroupField, buttons, or compact controls inside the shell.",
    source: "runtime"
  }
];

export const inputGroupApi: ApiRow[] = createApiRowsFromPropDefinitions(inputGroupPropDefinitions);

export const inputGroupFigma: FigmaPropMappingDoc = {
  fileKey: "7Nd8Ml5yOREhJjdCDKggf4",
  nodeId: "5701:233673",
  nodeName: "Input Group [NEW]",
  propRules: [
    "The local inventory lists the Input Group page but does not expose a Main component or true sample instances.",
    "Input Group therefore reuses the repeated Input [NEW] shell rules for variant, size, shape, and status.",
    "Leading and trailing content stays as child composition through InputGroupAddon, not as individual icon or button props.",
    "Figma MCP direct reads were not available during this pass because the authentication token was expired."
  ],
  mappings: [
    {
      figmaNodeId: "5701:233673",
      figmaNodeName: "Input Group [NEW]",
      reactProp: "InputGroup / InputGroupAddon / InputGroupField composition",
      rule: "Page-level grouped-field pattern -> compound component anatomy",
      notes: "No extracted Main component was present in the local inventory, so this keeps the API conservative.",
      sourceKind: "frame-exception"
    },
    {
      figmaNodeId: "4186:18772",
      figmaNodeName: "Input [NEW]",
      reactProp: "variant / size / shape / status",
      rule: "Shared input shell matrix -> inherited group props",
      notes: "Input Group should visually align with Input without duplicating a separate prop taxonomy.",
      sourceKind: "observed-instance"
    },
    {
      figmaNodeId: "4188:18882",
      figmaNodeName: "Leading",
      reactProp: "InputGroupAddon side='start'",
      rule: "Leading accessory -> start addon child",
      notes: "Icons, text fragments, and compact controls can all live in the addon slot.",
      sourceKind: "slot"
    },
    {
      figmaNodeId: "4188:18878",
      figmaNodeName: "Trailing",
      reactProp: "InputGroupAddon side='end'",
      rule: "Trailing accessory -> end addon child",
      notes: "This keeps docs examples close to the Figma anatomy without expanding the root props.",
      sourceKind: "slot"
    }
  ]
};
