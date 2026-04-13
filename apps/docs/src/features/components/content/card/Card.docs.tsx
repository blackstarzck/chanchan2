import { componentCatalogBySlug } from "../../registry";
import type { ComponentDoc } from "../../component-doc-types";
import { cardExamples, cardExampleGroups } from "./Card.demo";
import { cardApi, cardFigma } from "./Card.props";

export const cardDoc: ComponentDoc = {
  ...componentCatalogBySlug.card,
  description:
    "The Card docs are now authored in the same three layers that Ant Design uses: the runtime component API, separately managed docs code snippets, and a Figma-derived props contract. Core slots from the main Figma component become runtime props, while grouped, horizontal, and overlay showcases remain explicit composition examples.",
  whenToUse: [
    "Use Card to group related metadata, actions, and summaries into a single scannable surface.",
    "Prefer the structured root props for standard docs examples where AntD-like JSX improves readability.",
    "Drop to compound composition for frame exceptions such as horizontal marketing cards or full-image overlays."
  ],
  importCode: `import { Button, Card, CardContent, CardDescription, CardFooter, CardTitle } from "@blackstarzck/ui";
import { ArrowRight } from "lucide-react";`,
  examples: cardExamples,
  variations: cardExamples,
  variationGroups: cardExampleGroups,
  api: cardApi,
  figma: cardFigma,
  tokens: [
    { name: "card", usage: "Primary card surface background." },
    { name: "card-border", usage: "Shared shell outline and grouped edge seams." },
    { name: "muted", usage: "Header and footer strip background." }
  ],
  accessibility: [
    "Keep a meaningful heading inside the body or header so screen-reader users can identify the card content quickly.",
    "If actions are present, ensure each button label remains explicit outside of the surrounding card copy.",
    "Overlay and image-heavy variants still need sufficient text contrast over media."
  ]
};
