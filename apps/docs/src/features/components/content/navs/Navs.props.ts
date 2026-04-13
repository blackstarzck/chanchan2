import { createApiRowsFromPropDefinitions } from "../../component-doc-helpers";
import type {
  ApiRow,
  ComponentPropDefinition,
  FigmaPropMappingDoc
} from "../../component-doc-types";

export const navsPropDefinitions: ComponentPropDefinition[] = [
  {
    name: "variant",
    type: "'default' | 'bordered'",
    defaultValue: "'default'",
    description: "Switches between pill-style navigation and the bordered tab row from the shared Navs/Tabs Figma page.",
    source: "figma"
  },
  {
    name: "orientation",
    type: "'horizontal' | 'vertical'",
    defaultValue: "'horizontal'",
    description: "Changes the root nav direction using the repeated horizontal and vertical Figma variants.",
    source: "figma"
  },
  {
    name: "fill",
    type: "'fit' | 'equal'",
    defaultValue: "'fit'",
    description: "Controls whether links hug their content or distribute evenly across the row.",
    source: "figma"
  },
  {
    name: "active",
    type: "boolean",
    defaultValue: "false",
    description: "Marks the current navigation link and applies aria-current.",
    source: "figma",
    figmaNodeId: "4436:90180",
    figmaNodeName: "_nav-active-link"
  },
  {
    name: "disabled",
    type: "boolean",
    defaultValue: "false",
    description: "Disables a link visually and removes it from tab order.",
    source: "figma",
    figmaNodeId: "4436:90181",
    figmaNodeName: "_nav-disabled-link"
  },
  {
    name: "state",
    type: "'default' | 'hover'",
    defaultValue: "'default'",
    description: "Docs-only state hook for rendering static hover examples without pointer interaction.",
    source: "figma"
  },
  {
    name: "asChild",
    type: "boolean",
    defaultValue: "false",
    description: "Uses Radix Slot to render a custom link component while preserving Navs styling.",
    source: "runtime"
  }
];

export const navsApi: ApiRow[] = createApiRowsFromPropDefinitions(navsPropDefinitions);

export const navsFigma: FigmaPropMappingDoc = {
  fileKey: "7Nd8Ml5yOREhJjdCDKggf4",
  nodeId: "4434:140584",
  nodeName: "Navs/Tabs",
  propRules: [
    "Navs is documented from the shared Navs/Tabs page because the file mixes URL navigation and panel tabs.",
    "Pill, bordered, horizontal, vertical, and fill examples become public Navs props because they repeat across true Figma variants.",
    "Segmented panel switching stays in Tabs docs when it needs Radix tab panels.",
    "Figma MCP direct reads were not available during this pass because the authentication token was expired."
  ],
  mappings: [
    {
      figmaNodeId: "4547:108782",
      figmaNodeName: "Type=Base, Direction=Horizontal, Fill=None",
      reactProp: "variant='default' orientation='horizontal' fill='fit'",
      rule: "Base horizontal instance -> default Navs props",
      notes: "This is the simplest URL-backed nav pattern.",
      sourceKind: "observed-instance"
    },
    {
      figmaNodeId: "4436:92388",
      figmaNodeName: "Type=Bordered, Direction=Horizontal, Fill=None",
      reactProp: "variant='bordered'",
      rule: "Bordered Figma family -> bordered variant",
      notes: "The bottom indicator is part of the link renderer.",
      sourceKind: "observed-instance"
    },
    {
      figmaNodeId: "4436:92379",
      figmaNodeName: "Type=Bordered, Direction=Horizontal, Fill=Filled",
      reactProp: "fill='equal'",
      rule: "Filled layout -> equal link distribution",
      notes: "This maps to equal-width links instead of a separate layout component.",
      sourceKind: "observed-instance"
    },
    {
      figmaNodeId: "4547:110769",
      figmaNodeName: "Type=Base, Direction=Vertical, Fill=Vertical",
      reactProp: "orientation='vertical'",
      rule: "Vertical instance -> vertical orientation",
      notes: "The same link primitive handles side-panel local navigation.",
      sourceKind: "observed-instance"
    },
    {
      figmaNodeId: "4436:90180",
      figmaNodeName: "_nav-active-link",
      reactProp: "active",
      rule: "Active link visual -> active boolean",
      notes: "Active links also set aria-current='page'.",
      sourceKind: "content"
    },
    {
      figmaNodeId: "4436:90181",
      figmaNodeName: "_nav-disabled-link",
      reactProp: "disabled",
      rule: "Disabled link visual -> disabled boolean",
      notes: "Disabled links are removed from tab order.",
      sourceKind: "content"
    }
  ]
};
