import { createApiRowsFromPropDefinitions } from "../../component-doc-helpers";
import type {
  ApiRow,
  ComponentPropDefinition,
  FigmaPropMappingDoc
} from "../../component-doc-types";

export const selectPropDefinitions: ComponentPropDefinition[] = [
  {
    name: "value",
    type: "string",
    defaultValue: "uncontrolled",
    description: "Controlled selected value from the Radix root primitive.",
    source: "runtime"
  },
  {
    name: "defaultValue",
    type: "string",
    defaultValue: "undefined",
    description: "Initial uncontrolled selected value.",
    source: "runtime"
  },
  {
    name: "onValueChange",
    type: "(value: string) => void",
    defaultValue: "undefined",
    description: "Called whenever a new option is selected.",
    source: "runtime"
  },
  {
    name: "open",
    type: "boolean",
    defaultValue: "uncontrolled",
    description: "Controlled open state for the dropdown panel.",
    source: "runtime"
  },
  {
    name: "onOpenChange",
    type: "(open: boolean) => void",
    defaultValue: "undefined",
    description: "Called when the dropdown panel opens or closes.",
    source: "runtime"
  },
  {
    name: "disabled",
    type: "boolean",
    defaultValue: "false",
    description: "Disables the select trigger and prevents opening the list.",
    source: "runtime"
  }
];

export const selectApi: ApiRow[] = createApiRowsFromPropDefinitions(selectPropDefinitions);

export const selectFigma: FigmaPropMappingDoc = {
  fileKey: "7Nd8Ml5yOREhJjdCDKggf4",
  nodeId: "5701:248431",
  nodeName: "Advanced Select [NEW]",
  propRules: [
    "Select is documented from the Advanced Select page because the visible pattern is built from an input-like trigger plus a dropdown menu.",
    "The Radix root keeps state props such as value, defaultValue, open, and onValueChange.",
    "Trigger, value, content, groups, labels, and items stay as composition components instead of becoming one large root prop object.",
    "Search inputs, avatars, status dots, and richer option media remain advanced examples rather than required root props."
  ],
  mappings: [
    {
      figmaNodeId: "5701:249189",
      figmaNodeName: "Input",
      reactProp: "SelectTrigger + SelectValue",
      rule: "Input-like closed shell -> trigger composition",
      notes: "The runtime Select uses a trigger and value slot instead of exposing a custom shell object prop.",
      sourceKind: "slot"
    },
    {
      figmaNodeId: "5701:249193",
      figmaNodeName: "Dropdown Menu",
      reactProp: "SelectContent",
      rule: "Dropdown surface -> content composition",
      notes: "The panel background, spacing, and list area map to the SelectContent primitive.",
      sourceKind: "slot"
    },
    {
      figmaNodeId: "297723:21828",
      figmaNodeName: "Dropdown Input Slot",
      reactProp: "advanced search example only",
      rule: "Search field inside dropdown stays out of the base Select runtime API",
      notes: "The current Select component does not bundle filtering behavior into the root primitive.",
      sourceKind: "frame-exception"
    },
    {
      figmaNodeId: "4246:27468",
      figmaNodeName: "Dropdown List #4 Slot",
      reactProp: "SelectGroup + SelectItem",
      rule: "List slot -> grouped item composition",
      notes: "Grouped and repeated option rows are built from SelectGroup and SelectItem.",
      sourceKind: "slot"
    },
    {
      figmaNodeId: "4246:27588",
      figmaNodeName: "check",
      reactProp: "selected item state",
      rule: "Selected row icon -> ItemIndicator inside SelectItem",
      notes: "Selection feedback comes from the Radix item state rather than a separate prop.",
      sourceKind: "content"
    }
  ]
};
