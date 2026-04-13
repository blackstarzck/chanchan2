import { componentCatalogBySlug } from "../../registry";
import type { ComponentDoc } from "../../component-doc-types";
import { dialogExamples, dialogExampleGroups } from "./Dialog.demo";
import { dialogApi, dialogFigma } from "./Dialog.props";

export const dialogDoc: ComponentDoc = {
  ...componentCatalogBySlug.dialog,
  description:
    "Dialog now follows the same authored docs structure as Card, Button, and Checkbox. Runtime behavior stays with the Radix dialog primitive, preview examples are stored separately from copied code, and the Figma modal anatomy is documented as composition instead of a large root prop surface.",
  whenToUse: [
    "Use Dialog for blocking confirmations, release checks, and short focused tasks.",
    "Keep state on the Radix root, and compose the visible layout with DialogContent, DialogHeader, and DialogFooter.",
    "Use a richer body area when the modal needs summaries, lists, or compact forms before the primary action."
  ],
  importCode: `import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@blackstarzck/ui";`,
  examples: dialogExamples,
  variations: dialogExamples,
  variationGroups: dialogExampleGroups,
  api: dialogApi,
  figma: dialogFigma,
  tokens: [
    { name: "overlay", usage: "Backdrop color behind the dialog surface." },
    { name: "popover", usage: "Dialog panel background." },
    { name: "border", usage: "Dialog shell outline and internal body surfaces." }
  ],
  accessibility: [
    "Dialog titles and descriptions should explain the task and the result of the primary action clearly.",
    "Keep at least one obvious dismiss path such as a close button, cancel action, or escape key support.",
    "Use controlled state only when the page truly needs it, and always return focus to the trigger after close."
  ]
};
