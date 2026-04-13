import type { ReactNode } from "react";

import { ThemeRoot } from "@blackstarzck/ui";

import { useDocsTheme } from "../theme/docs-theme";
import type { ComponentCatalogItem } from "./registry";
import type {
  ApiRow,
  ComponentDoc,
  ComponentPropDefinition,
  TokenRow,
  VariationDoc
} from "./component-doc-types";

export function DemoSurface({ children }: { children: ReactNode }) {
  const { activeTheme, themeStyle } = useDocsTheme();

  return (
    <ThemeRoot
      theme={activeTheme}
      style={themeStyle}
      data-component-theme-scope=""
      data-component-theme={activeTheme}
      className="bg-background py-4"
    >
      {children}
    </ThemeRoot>
  );
}

export function indentBlock(source: string, spaces: number) {
  const prefix = " ".repeat(spaces);
  return source
    .trim()
    .split("\n")
    .map((line) => `${prefix}${line}`)
    .join("\n");
}

export function createDemoCode({
  extraImports,
  demoName,
  imports,
  body,
  reactImports,
  setup
}: {
  extraImports?: string[];
  demoName: string;
  imports: string[];
  body: string;
  reactImports?: string[];
  setup?: string;
}) {
  const lines: string[] = [];

  if (reactImports && reactImports.length > 0) {
    lines.push(`import { ${reactImports.join(", ")} } from "react"`);
  }

  if (extraImports && extraImports.length > 0) {
    lines.push(...extraImports);
  }

  if (imports.length > 0) {
    lines.push(`import { ${imports.join(", ")} } from "@blackstarzck/ui"`);
  }

  const setupBlock = setup ? `\n${indentBlock(setup, 2)}\n` : "\n";

  return `${lines.join("\n")}\n\nexport function ${demoName}() {${setupBlock}  return (\n${indentBlock(body, 4)}\n  )\n}`;
}

export function createSingleVariationDoc({
  accessibility,
  api,
  importCode,
  item,
  tokens,
  variation,
  whenToUse
}: {
  accessibility: string[];
  api: ApiRow[];
  importCode: string;
  item: ComponentCatalogItem;
  tokens: TokenRow[];
  variation: VariationDoc;
  whenToUse: string[];
}): ComponentDoc {
  return {
    ...item,
    accessibility,
    api,
    importCode,
    tokens,
    variations: [variation],
    whenToUse
  };
}

export function createApiRowsFromPropDefinitions(definitions: ComponentPropDefinition[]): ApiRow[] {
  return definitions.map((definition) => ({ ...definition }));
}

export function getDocExamples(doc: Pick<ComponentDoc, "examples" | "variations">): VariationDoc[] {
  return doc.examples ?? doc.variations;
}
