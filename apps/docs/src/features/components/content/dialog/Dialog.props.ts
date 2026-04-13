import { createApiRowsFromPropDefinitions } from "../../component-doc-helpers";
import type {
  ApiRow,
  ComponentPropDefinition,
  FigmaPropMappingDoc
} from "../../component-doc-types";

export const dialogPropDefinitions: ComponentPropDefinition[] = [
  {
    name: "open",
    type: "boolean",
    defaultValue: "uncontrolled",
    description: "Controlled open state from the Radix dialog root.",
    source: "runtime"
  },
  {
    name: "defaultOpen",
    type: "boolean",
    defaultValue: "false",
    description: "Initial uncontrolled open state for previews and simple flows.",
    source: "runtime"
  },
  {
    name: "onOpenChange",
    type: "(open: boolean) => void",
    defaultValue: "undefined",
    description: "Called whenever the dialog opens or closes.",
    source: "runtime"
  },
  {
    name: "modal",
    type: "boolean",
    defaultValue: "true",
    description: "Keeps focus trapped inside the dialog while it is open.",
    source: "runtime"
  },
  {
    name: "children",
    type: "ReactNode",
    defaultValue: "undefined",
    description: "Composition tree containing Trigger, Content, Header, body content, and Footer.",
    source: "figma"
  }
];

export const dialogApi: ApiRow[] = createApiRowsFromPropDefinitions(dialogPropDefinitions);

export const dialogFigma: FigmaPropMappingDoc = {
  fileKey: "7Nd8Ml5yOREhJjdCDKggf4",
  nodeId: "297613:42706",
  nodeName: "_modal",
  propRules: [
    "The Radix root keeps the dialog state props such as open, defaultOpen, onOpenChange, and modal.",
    "The Figma modal anatomy maps to composition components: header, body, and footer stay separate instead of becoming many root props.",
    "The close affordance is built into `DialogContent`, so docs examples show it visually without exposing a dedicated public prop.",
    "Docs code uses a normal trigger flow, while previews may force the dialog open so the anatomy stays visible on the page."
  ],
  mappings: [
    {
      figmaNodeId: "297613:42623",
      figmaNodeName: "Header Slot",
      reactProp: "DialogHeader + DialogTitle + DialogDescription",
      rule: "Header slot -> composed heading area",
      notes: "Title and supporting text stay grouped in the header composition.",
      sourceKind: "slot"
    },
    {
      figmaNodeId: "297613:42626",
      figmaNodeName: "Body Slot",
      reactProp: "children inside DialogContent",
      rule: "Body slot -> free content area",
      notes: "Use this region for copy, lists, forms, or confirmation summaries.",
      sourceKind: "slot"
    },
    {
      figmaNodeId: "297613:42634",
      figmaNodeName: "Footer Slot",
      reactProp: "DialogFooter",
      rule: "Footer slot -> action row composition",
      notes: "Primary and secondary actions stay explicit instead of being hidden in root props.",
      sourceKind: "slot"
    },
    {
      figmaNodeId: "5701:258493",
      figmaNodeName: "Modal [NEW]",
      reactProp: "open / defaultOpen / onOpenChange / modal",
      rule: "Observed modal page patterns -> root state props",
      notes: "Behavior comes from the Radix dialog primitive, while layout comes from the Figma anatomy.",
      sourceKind: "observed-instance"
    }
  ]
};
