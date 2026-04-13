import { ReadonlyCodePanel } from "../../components/ui/readonly-code-panel";

const HARNESS_CODE = `import { Button } from "@blackstarzck/ui"

export function ButtonSizesDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="sm">Small</Button>
      <Button>Default</Button>
      <Button size="lg">Large</Button>
    </div>
  )
}`;

export function CodeEditorHarnessPage() {
  return (
    <div className="min-h-screen bg-background px-8 py-10">
      <div className="mx-auto max-w-3xl space-y-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Code Editor Harness</h1>
          <p className="text-sm text-muted-foreground">
            Use this page to verify gutter borders and code panel layout in Playwright.
          </p>
        </div>

        <div className="overflow-hidden rounded-[22px] border border-border bg-background">
          <ReadonlyCodePanel code={HARNESS_CODE} testIdPrefix="harness-code" />
        </div>
      </div>
    </div>
  );
}
