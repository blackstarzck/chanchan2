import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@blackstarzck/ui";

export function FoundationsPage() {
  return (
    <div className="flex w-full flex-col gap-6 px-4 py-6 lg:px-6">
      <Card className="shadow-none">
        <CardHeader>
          <CardTitle>Foundations</CardTitle>
          <CardDescription>
            Token docs, typography rules, spacing scales, and theme system surfaces land here next.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          The route is in place so foundations can be split out from the component showcase instead
          of living in the same page.
        </CardContent>
      </Card>
    </div>
  );
}
