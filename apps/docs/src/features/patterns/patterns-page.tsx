import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@blackstarzck/ui";

export function PatternsPage() {
  return (
    <div className="flex w-full flex-col gap-6 px-4 py-6 lg:px-6">
      <Card className="shadow-none">
        <CardHeader>
          <CardTitle>Patterns</CardTitle>
          <CardDescription>
            Product-level assemblies, workflows, and opinionated compositions will be documented
            here.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          This route separates composed UX patterns from primitive component API references.
        </CardContent>
      </Card>
    </div>
  );
}
