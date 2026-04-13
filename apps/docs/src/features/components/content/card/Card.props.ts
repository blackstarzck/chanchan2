import { createApiRowsFromPropDefinitions } from "../../component-doc-helpers";
import type {
  ApiRow,
  ComponentPropDefinition,
  FigmaPropMappingDoc
} from "../../component-doc-types";

export const cardPropDefinitions: ComponentPropDefinition[] = [
  {
    name: "header",
    type: "ReactNode",
    defaultValue: "undefined",
    description: "Maps the dedicated header slot from the Figma main component.",
    source: "figma",
    figmaNodeId: "297597:8557",
    figmaNodeName: "Card Header Slot"
  },
  {
    name: "extra",
    type: "ReactNode",
    defaultValue: "undefined",
    description: "Optional trailing content inside the header slot for AntD-style header actions.",
    source: "runtime"
  },
  {
    name: "cover",
    type: "ReactNode",
    defaultValue: "undefined",
    description: "Maps the image slot between the header and body.",
    source: "figma",
    figmaNodeId: "297597:6565",
    figmaNodeName: "Card Image Slot"
  },
  {
    name: "title",
    type: "ReactNode",
    defaultValue: "undefined",
    description: "Maps the primary body title text node inside the Figma body slot.",
    source: "figma",
    figmaNodeId: "297597:6568",
    figmaNodeName: "Body title"
  },
  {
    name: "subtitle",
    type: "ReactNode",
    defaultValue: "undefined",
    description: "Maps the secondary body label below the title.",
    source: "figma",
    figmaNodeId: "297597:6569",
    figmaNodeName: "Body subtitle"
  },
  {
    name: "children",
    type: "ReactNode",
    defaultValue: "undefined",
    description:
      "Body content. When structured props are present, children render inside the body slot; otherwise the component falls back to fully manual compound composition.",
    source: "figma",
    figmaNodeId: "297597:6594",
    figmaNodeName: "Card Body Slot"
  },
  {
    name: "actions",
    type: "ReactNode",
    defaultValue: "undefined",
    description: "Maps the CTA row at the bottom of the body slot.",
    source: "figma",
    figmaNodeId: "297597:6571",
    figmaNodeName: "Button Group"
  },
  {
    name: "footer",
    type: "ReactNode",
    defaultValue: "undefined",
    description: "Maps the footer slot rendered below the body content.",
    source: "figma",
    figmaNodeId: "297597:8358",
    figmaNodeName: "Card Footer Slot"
  },
  {
    name: "align",
    type: "'start' | 'center'",
    defaultValue: "'start'",
    description: "Observed instance mapping for centered-body examples without introducing separate centered card components.",
    source: "figma",
    figmaNodeId: "297611:22409",
    figmaNodeName: "Centered body instance"
  },
  {
    name: "className",
    type: "string",
    defaultValue: "undefined",
    description: "Runtime escape hatch for width, layout, and exception styling.",
    source: "runtime"
  }
];

export const cardApi: ApiRow[] = createApiRowsFromPropDefinitions(cardPropDefinitions);

export const cardFigma: FigmaPropMappingDoc = {
  fileKey: "7Nd8Ml5yOREhJjdCDKggf4",
  nodeId: "297597:6595",
  nodeName: "_card",
  propRules: [
    "Main component slots become optional React props on the runtime Card API.",
    "Nested text nodes inside the body slot are promoted into semantic convenience props such as title and subtitle.",
    "When an instance hides a slot in Figma, the React prop stays undefined instead of introducing extra boolean flags.",
    "Frame exceptions such as horizontal and overlay cards stay demo-only compositions and are not promoted into root Card props."
  ],
  mappings: [
    {
      figmaNodeId: "297597:8557",
      figmaNodeName: "Card Header Slot",
      reactProp: "header",
      rule: "Visible slot -> optional ReactNode prop",
      notes: "Supports plain strings or fully custom header content.",
      sourceKind: "slot"
    },
    {
      figmaNodeId: "297597:6565",
      figmaNodeName: "Card Image Slot",
      reactProp: "cover",
      rule: "Visible slot -> optional ReactNode prop",
      notes: "Keeps media between the header and body, matching AntD's cover mental model.",
      sourceKind: "slot"
    },
    {
      figmaNodeId: "297597:6568",
      figmaNodeName: "Body title",
      reactProp: "title",
      rule: "Primary text node -> semantic convenience prop",
      notes: "Lets docs examples stay close to AntD-style JSX.",
      sourceKind: "content"
    },
    {
      figmaNodeId: "297597:6569",
      figmaNodeName: "Body subtitle",
      reactProp: "subtitle",
      rule: "Secondary text node -> semantic convenience prop",
      notes: "Remains optional because several Figma instances omit it.",
      sourceKind: "content"
    },
    {
      figmaNodeId: "297597:6571",
      figmaNodeName: "Button Group",
      reactProp: "actions",
      rule: "CTA row -> optional ReactNode prop",
      notes: "Used for main-component instances that include primary and link actions.",
      sourceKind: "content"
    },
    {
      figmaNodeId: "297597:8358",
      figmaNodeName: "Card Footer Slot",
      reactProp: "footer",
      rule: "Visible slot -> optional ReactNode prop",
      notes: "Hidden footer states simply omit the prop.",
      sourceKind: "slot"
    },
    {
      figmaNodeId: "297611:22409",
      figmaNodeName: "Centered body instance",
      reactProp: "align",
      rule: "Observed instance treatment -> small layout prop",
      notes: "Applied only to body content; does not affect frame-exception layouts.",
      sourceKind: "observed-instance"
    },
    {
      figmaNodeId: "5701:201500",
      figmaNodeName: "Card Group / Horizontal / Overlay showcases",
      reactProp: "demo only",
      rule: "Frame exception -> documented composition pattern",
      notes: "These examples stay in Card.demo.tsx and do not expand the runtime root API.",
      sourceKind: "frame-exception"
    }
  ]
};
