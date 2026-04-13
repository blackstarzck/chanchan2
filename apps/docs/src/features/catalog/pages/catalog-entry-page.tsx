import { Link, useParams } from "react-router-dom";

import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@blackstarzck/ui";

import { getStaticCatalogPage } from "../docs-page-registry";
import { DocsCatalogSidebar } from "../ui/docs-catalog-sidebar";

export function CatalogEntryPage({ section }: { section: string }) {
  const { slug = "" } = useParams();
  const page = getStaticCatalogPage(section, slug);

  if (!page) {
    return (
      <div className="flex w-full flex-col">
        <div className="border border-border px-6 py-8">
          <div className="space-y-3">
            <h1 className="text-2xl font-semibold">Page not found</h1>
            <p className="text-sm text-muted-foreground">
              The left-panel entry exists in the Figma-based docs tree, but the route could not be
              resolved.
            </p>
            <Button asChild>
              <Link to="/components">Back to docs</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col">
      <div className="grid gap-0 border-y border-border lg:h-[calc(100vh-5rem)] lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="hidden min-h-0 border-r border-border lg:block">
          <DocsCatalogSidebar />
        </aside>

        <main data-testid="catalog-entry-scroll" className="min-h-0 h-full overflow-y-auto">
          <section className="border-b border-border px-4 py-6 sm:px-6">
            <div className="space-y-2">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                {page.group}
              </p>
              <h1 className="text-3xl font-semibold tracking-tight">{page.title}</h1>
              <p className="max-w-3xl text-sm text-muted-foreground">{page.description}</p>
            </div>
          </section>

          <section className="px-4 py-6 sm:px-6">
            <div className="grid max-w-4xl gap-4">
              {page.body.map((paragraph) => (
                <Card key={paragraph} className="shadow-none">
                  <CardHeader>
                    <CardTitle>{page.title}</CardTitle>
                    <CardDescription>Figma page tree aligned route</CardDescription>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">{paragraph}</CardContent>
                </Card>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
