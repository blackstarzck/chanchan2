import { createApiRowsFromPropDefinitions } from "../../component-doc-helpers";
import type {
  ApiRow,
  ComponentPropDefinition,
  FigmaPropMappingDoc
} from "../../component-doc-types";

export const tabsPropDefinitions: ComponentPropDefinition[] = [
  {
    name: "value",
    type: "string",
    defaultValue: "uncontrolled",
    description: "Controlled active tab value from the Radix root primitive.",
    source: "runtime"
  },
  {
    name: "defaultValue",
    type: "string",
    defaultValue: "undefined",
    description: "Initial active tab in uncontrolled usage.",
    source: "runtime"
  },
  {
    name: "onValueChange",
    type: "(value: string) => void",
    defaultValue: "undefined",
    description: "Called when the active tab changes.",
    source: "runtime"
  },
  {
    name: "orientation",
    type: "'horizontal' | 'vertical'",
    defaultValue: "'horizontal'",
    description: "Switches the list between horizontal and vertical layouts.",
    source: "runtime"
  },
  {
    name: "activationMode",
    type: "'automatic' | 'manual'",
    defaultValue: "'automatic'",
    description: "Controls whether focus moves tabs automatically or only on explicit activation.",
    source: "runtime"
  }
];

export const tabsApi: ApiRow[] = createApiRowsFromPropDefinitions(tabsPropDefinitions);

export const tabsFigma: FigmaPropMappingDoc = {
  fileKey: "7Nd8Ml5yOREhJjdCDKggf4",
  nodeId: "4434:140584",
  nodeName: "Navs/Tabs",
  propRules: [
    "Tabs is documented from the shared Navs/Tabs page because the file mixes content tabs with navigation-only patterns.",
    "The current runtime Tabs primitive focuses on section switching with panels, while many pill, bordered, and nav-only patterns on the same Figma page belong to the separate Navs component.",
    "Active, inactive, and disabled states come from the Radix trigger state and disabled attributes, not from manual boolean props.",
    "Horizontal and vertical examples map directly to the runtime orientation prop."
  ],
  mappings: [
    {
      figmaNodeId: "4547:108782",
      figmaNodeName: "Type=Base, Direction=Horizontal, Fill=None",
      reactProp: "TabsList + TabsTrigger",
      rule: "Base horizontal tab row -> list and trigger composition",
      notes: "This is the closest Figma structure to the current runtime Tabs primitive.",
      sourceKind: "observed-instance"
    },
    {
      figmaNodeId: "4436:90180",
      figmaNodeName: "_nav-active-link",
      reactProp: "active trigger state",
      rule: "Active visual treatment -> Radix active state styling",
      notes: "The runtime TabsTrigger reads active styling from data-state=active.",
      sourceKind: "content"
    },
    {
      figmaNodeId: "4436:90181",
      figmaNodeName: "_nav-disabled-link",
      reactProp: "disabled trigger state",
      rule: "Disabled visual treatment -> disabled attribute on TabsTrigger",
      notes: "Disabled triggers remain focus-safe and visually dimmed.",
      sourceKind: "content"
    },
    {
      figmaNodeId: "4547:110769",
      figmaNodeName: "Type=Base, Direction=Vertical, Fill=Vertical",
      reactProp: "orientation",
      rule: "Vertical instance -> orientation='vertical'",
      notes: "The runtime API covers vertical layouts without a second tabs primitive.",
      sourceKind: "observed-instance"
    },
    {
      figmaNodeId: "4436:92381",
      figmaNodeName: "Type=Segment, Direction=Horizontal, Fill=None",
      reactProp: "Navs component or docs example only",
      rule: "Shared page styles that behave more like navigation stay outside the base Tabs API",
      notes: "Segmented, pills, and bordered navigation patterns are documented separately from panel tabs.",
      sourceKind: "frame-exception"
    }
  ]
};
