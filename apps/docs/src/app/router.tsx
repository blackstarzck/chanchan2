import { Navigate, Route, Routes } from "react-router-dom";

import { CatalogEntryPage } from "../features/catalog/pages/catalog-entry-page";
import { ComponentDetailPage } from "../features/components/pages/component-detail-page";
import { ComponentsOverviewPage } from "../features/components/pages/components-overview-page";
import { FoundationsPage } from "../features/foundations/foundations-page";
import { CodeEditorHarnessPage } from "../features/harness/pages/code-editor-harness-page";
import { OverviewPage } from "../features/overview/overview-page";
import { PatternsPage } from "../features/patterns/patterns-page";
import { DocsShell } from "./shell/docs-shell";

export function AppRouter() {
  return (
    <Routes>
      <Route element={<DocsShell />}>
        <Route index element={<Navigate to="/overview" replace />} />
        <Route path="/overview" element={<OverviewPage />} />
        <Route path="/foundations" element={<FoundationsPage />} />
        <Route path="/components" element={<ComponentsOverviewPage />} />
        <Route path="/components/:slug" element={<ComponentDetailPage />} />
        <Route path="/templates/:slug" element={<CatalogEntryPage section="templates" />} />
        <Route path="/customization/:slug" element={<CatalogEntryPage section="customization" />} />
        <Route path="/layout/:slug" element={<CatalogEntryPage section="layout" />} />
        <Route path="/content/:slug" element={<CatalogEntryPage section="content" />} />
        <Route path="/harness/code-editor" element={<CodeEditorHarnessPage />} />
        <Route path="/patterns" element={<PatternsPage />} />
        <Route path="*" element={<Navigate to="/overview" replace />} />
      </Route>
    </Routes>
  );
}
