import type { ComponentCatalogItem } from "./registry";
import type { ReactNode } from "react";

export type ComponentExampleDoc = {
  code: string;
  component?: ReactNode;
  controlSummary: string;
  description: string;
  id: string;
  layout?: "center" | "start";
  preview?: ReactNode;
  title: string;
};

export type VariationDoc = ComponentExampleDoc;

export type VariationNavItem = {
  id?: string;
  items?: VariationNavItem[];
  label: string;
};

export type VariationNavGroup = {
  items: VariationNavItem[];
  label: string;
};

export type ComponentPropDefinition = {
  defaultValue: string;
  description: string;
  figmaNodeId?: string;
  figmaNodeName?: string;
  name: string;
  required?: boolean;
  source?: "figma" | "runtime";
  type: string;
};

export type ApiRow = ComponentPropDefinition;

export type TokenRow = {
  name: string;
  usage: string;
};

export type FigmaPropMappingRule = {
  figmaNodeId: string;
  figmaNodeName: string;
  notes: string;
  reactProp: string;
  rule: string;
  sourceKind: "slot" | "content" | "observed-instance" | "frame-exception" | "runtime";
};

export type FigmaPropMappingDoc = {
  fileKey: string;
  mappings: FigmaPropMappingRule[];
  nodeId: string;
  nodeName: string;
  propRules: string[];
};

export type ComponentDoc = ComponentCatalogItem & {
  accessibility: string[];
  api: ApiRow[];
  description?: string;
  examples?: ComponentExampleDoc[];
  figma?: FigmaPropMappingDoc;
  importCode: string;
  tokens: TokenRow[];
  variationGroups?: VariationNavGroup[];
  variations: VariationDoc[];
  whenToUse: string[];
};
