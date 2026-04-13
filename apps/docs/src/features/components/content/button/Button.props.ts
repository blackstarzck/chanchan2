import { createApiRowsFromPropDefinitions } from "../../component-doc-helpers";
import type {
  ApiRow,
  ComponentPropDefinition,
  FigmaPropMappingDoc
} from "../../component-doc-types";

export const buttonPropDefinitions: ComponentPropDefinition[] = [
  {
    name: "variant",
    type: "'default' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'success' | 'soft' | 'link' | 'white'",
    defaultValue: "'default'",
    description: "Visual treatment for the button shell. The default runtime value maps to the solid Figma family.",
    source: "figma"
  },
  {
    name: "tone",
    type: "'dark' | 'gray' | 'green' | 'blue' | 'red' | 'yellow' | 'light'",
    defaultValue: "'theme'",
    description: "Color family observed across the Figma button matrix.",
    source: "figma"
  },
  {
    name: "size",
    type: "'sm' | 'default' | 'lg' | 'icon-sm' | 'icon' | 'icon-lg'",
    defaultValue: "'default'",
    description: "Text and icon sizes mapped from the default, small, large, and icon button pages.",
    source: "figma"
  },
  {
    name: "shape",
    type: "'default' | 'pill'",
    defaultValue: "'default'",
    description: "Rounded or pill shell. Matches the repeated rounded and capsule treatments in Figma.",
    source: "figma"
  },
  {
    name: "leading",
    type: "ReactNode",
    defaultValue: "undefined",
    description: "Leading slot for icons or avatars inside the button body.",
    source: "figma",
    figmaNodeId: "3748:4700",
    figmaNodeName: "leading icon slot"
  },
  {
    name: "leadingDivider",
    type: "boolean",
    defaultValue: "false",
    description: "Shows a vertical divider after the leading slot when that pattern is needed.",
    source: "figma",
    figmaNodeId: "4140:203947",
    figmaNodeName: "leading divider"
  },
  {
    name: "children",
    type: "ReactNode",
    defaultValue: "undefined",
    description: "Primary label content. Maps to the main placeholder text in the Figma button body.",
    source: "figma",
    figmaNodeId: "3748:4701",
    figmaNodeName: "Placeholder"
  },
  {
    name: "badge",
    type: "ReactNode",
    defaultValue: "undefined",
    description: "Optional badge slot rendered inline with the label.",
    source: "figma",
    figmaNodeId: "4277:197671",
    figmaNodeName: "Badge"
  },
  {
    name: "trailing",
    type: "ReactNode",
    defaultValue: "undefined",
    description: "Trailing slot for icons or avatars inside the button body.",
    source: "figma",
    figmaNodeId: "3748:4703",
    figmaNodeName: "trailing icon slot"
  },
  {
    name: "trailingDivider",
    type: "boolean",
    defaultValue: "false",
    description: "Shows a vertical divider before the trailing slot when the layout needs separation.",
    source: "figma",
    figmaNodeId: "4140:210369",
    figmaNodeName: "trailing divider"
  },
  {
    name: "asChild",
    type: "boolean",
    defaultValue: "false",
    description: "Reuses the button styling on a child element through Radix Slot.",
    source: "runtime"
  },
  {
    name: "disabled",
    type: "boolean",
    defaultValue: "false",
    description: "Disables interaction and applies the disabled visual treatment.",
    source: "runtime"
  }
];

export const buttonApi: ApiRow[] = createApiRowsFromPropDefinitions(buttonPropDefinitions);

export const buttonFigma: FigmaPropMappingDoc = {
  fileKey: "7Nd8Ml5yOREhJjdCDKggf4",
  nodeId: "3748:4707",
  nodeName: "_button",
  propRules: [
    "Repeated style, tone, size, and shape values on the Figma button pages become public button props.",
    "Leading, badge, and trailing areas are treated as content slots, so the runtime API uses ReactNode instead of many boolean toggles.",
    "The default runtime variant stays `default`, even though the matching Figma family is labelled as the solid button treatment.",
    "Docs examples show simple usage code, while internal layout details such as Slot handling stay inside the runtime component."
  ],
  mappings: [
    {
      figmaNodeId: "3748:4701",
      figmaNodeName: "Placeholder",
      reactProp: "children",
      rule: "Primary text node -> label content",
      notes: "This keeps docs code short and readable.",
      sourceKind: "content"
    },
    {
      figmaNodeId: "3748:4700",
      figmaNodeName: "home",
      reactProp: "leading",
      rule: "Leading icon/avatar cluster -> ReactNode slot",
      notes: "The runtime slot can accept any icon or avatar, not only the Figma default icon.",
      sourceKind: "slot"
    },
    {
      figmaNodeId: "4140:203947",
      figmaNodeName: "Divider",
      reactProp: "leadingDivider",
      rule: "Repeated separator treatment -> boolean prop",
      notes: "Only used when a visual split is needed.",
      sourceKind: "content"
    },
    {
      figmaNodeId: "4277:197671",
      figmaNodeName: "Badge",
      reactProp: "badge",
      rule: "Inline accessory -> ReactNode slot",
      notes: "The runtime API accepts any badge-like content instead of a fixed count style.",
      sourceKind: "slot"
    },
    {
      figmaNodeId: "3748:4703",
      figmaNodeName: "chevron-right",
      reactProp: "trailing",
      rule: "Trailing icon/avatar cluster -> ReactNode slot",
      notes: "Used for arrows, status icons, or avatars.",
      sourceKind: "slot"
    },
    {
      figmaNodeId: "4140:210369",
      figmaNodeName: "Divider",
      reactProp: "trailingDivider",
      rule: "Repeated separator treatment -> boolean prop",
      notes: "Mirrors the leading divider behavior.",
      sourceKind: "content"
    },
    {
      figmaNodeId: "3823:22618",
      figmaNodeName: "Buttons [NEW]",
      reactProp: "variant / tone / size / shape",
      rule: "Observed instance matrix -> enum props",
      notes: "The public API is based on repeated values across the main Figma button pages, not on one-off marketing examples.",
      sourceKind: "observed-instance"
    }
  ]
};
