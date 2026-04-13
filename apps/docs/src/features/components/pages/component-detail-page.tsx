import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { Button as AntButton, Card, Select as AntSelect, Space, Splitter, Tag } from "antd";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, ThemeRoot } from "@blackstarzck/ui";
import { themeFamilyCatalog, themeFamilyNames } from "@blackstarzck/tokens";

import { getComponentDoc } from "../component-docs";
import { getDocExamples } from "../component-doc-helpers";
import {
  getReleaseSnapshot,
  getReleaseSnapshotsAscending,
  latestReleaseSnapshot,
  releaseSnapshots,
  type ReleaseSnapshot
} from "../release-catalog";
import { ReadonlyCodePanel } from "../ui/readonly-code-panel";
import { DocsCatalogSidebar } from "../../catalog/ui/docs-catalog-sidebar";
import { useDocsTheme } from "../../theme/docs-theme";

function resolveReleaseComponentState({
  doc,
  requestedVersion,
  slug
}: {
  doc: NonNullable<ReturnType<typeof getComponentDoc>>;
  requestedVersion: string | null;
  slug: string;
}) {
  const docExamples = getDocExamples(doc);
  const selectedRelease = getReleaseSnapshot(requestedVersion);

  if (!selectedRelease) {
    return {
      componentAvailable: true,
      selectedRelease: null,
      selectedVersion: null,
      visibleVariations: docExamples
    };
  }

  const releasesAscending = getReleaseSnapshotsAscending();
  const releaseIndex = releasesAscending.findIndex((snapshot) => snapshot.version === selectedRelease.version);
  const cumulativeReleases = releaseIndex >= 0 ? releasesAscending.slice(0, releaseIndex + 1) : [];
  let componentAvailable = false;
  let variationIds: Set<string> | null = null;

  for (const snapshot of cumulativeReleases) {
    const exposesAllComponents =
      snapshot.components.length === 0 && snapshot.manifest.changedComponents?.includes("*");

    if (
      exposesAllComponents ||
      snapshot.components.some(
        (entry) =>
          entry.componentSlug === slug ||
          entry.docsRoute === `/components/${slug}` ||
          entry.docsRoute === slug
      )
    ) {
      componentAvailable = true;
    }

    const matchingSamples = snapshot.samples.filter(
      (entry) => entry.componentSlug === slug && typeof entry.docsVariationId === "string"
    );

    if (matchingSamples.length > 0) {
      if (!variationIds) variationIds = new Set<string>();
      matchingSamples.forEach((entry) => {
        if (entry.docsVariationId) variationIds?.add(entry.docsVariationId);
      });
    } else if (
      snapshot.samples.length === 0 &&
      snapshot.manifest.changedSamples?.includes("*") &&
      componentAvailable
    ) {
      variationIds = new Set(docExamples.map((variation) => variation.id));
    }
  }

  const visibleVariations =
    componentAvailable && variationIds
      ? docExamples.filter((variation) => variationIds?.has(variation.id))
      : componentAvailable
        ? docExamples
        : [];

  return {
    componentAvailable,
    selectedRelease,
    selectedVersion: selectedRelease.version,
    visibleVariations
  };
}

export function ComponentDetailPage() {
  const { slug = "" } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const doc = getComponentDoc(slug);
  const requestedVersion = searchParams.get("version");
  const scrollContainerRef = useRef<HTMLElement | null>(null);
  const pendingHashScrollRef = useRef<string | null>(null);
  const suppressNextHashScrollRef = useRef(false);
  const releaseState = useMemo(
    () => (doc ? resolveReleaseComponentState({ doc, requestedVersion, slug }) : null),
    [doc, requestedVersion, slug]
  );
  const docExamples = doc ? getDocExamples(doc) : [];
  const visibleVariations = releaseState?.visibleVariations ?? docExamples;
  const selectedRelease = releaseState?.selectedRelease ?? null;
  const selectedVersion = releaseState?.selectedVersion ?? null;
  const hashVariationId = location.hash.replace(/^#/, "");
  const [activeVariationId, setActiveVariationId] = useState(
    () =>
      visibleVariations.find((variation) => variation.id === hashVariationId)?.id ??
      visibleVariations[0]?.id ??
      ""
  );

  useEffect(() => {
    const nextVariationId =
      visibleVariations.find((variation) => variation.id === hashVariationId)?.id ??
      visibleVariations[0]?.id ??
      "";
    const shouldScrollToHash =
      hashVariationId &&
      visibleVariations.some((variation) => variation.id === hashVariationId) &&
      !suppressNextHashScrollRef.current;

    setActiveVariationId((current) => (current === nextVariationId ? current : nextVariationId));

    if (shouldScrollToHash) {
      pendingHashScrollRef.current = hashVariationId;
    }

    suppressNextHashScrollRef.current = false;
  }, [doc?.slug, hashVariationId, visibleVariations]);

  useEffect(() => {
    const targetVariationId = pendingHashScrollRef.current;
    const scrollContainer = scrollContainerRef.current;
    if (!targetVariationId || !scrollContainer) return;

    const target = scrollContainer.querySelector<HTMLElement>(
      `[data-variation-section="${targetVariationId}"]`
    );
    if (!target) return;

    pendingHashScrollRef.current = null;
    target.scrollIntoView({ block: "start" });
  }, [activeVariationId, visibleVariations]);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!doc || !scrollContainer) return;

    const sections = visibleVariations
      .map((variation) =>
        scrollContainer.querySelector<HTMLElement>(`[data-variation-section="${variation.id}"]`)
      )
      .filter((section): section is HTMLElement => Boolean(section));

    if (sections.length === 0) return;

    const updateActiveVariation = () => {
      const scrollTop = scrollContainer.scrollTop;
      const toolbarOffset = 120;
      const currentSection =
        [...sections]
          .reverse()
          .find((section) => section.offsetTop - toolbarOffset <= scrollTop) ?? sections[0];

      const nextId = currentSection.getAttribute("data-variation-section");
      if (nextId) {
        setActiveVariationId((current) => (current === nextId ? current : nextId));
      }
    };

    updateActiveVariation();
    scrollContainer.addEventListener("scroll", updateActiveVariation, { passive: true });

    return () => {
      scrollContainer.removeEventListener("scroll", updateActiveVariation);
    };
  }, [doc, visibleVariations]);

  useEffect(() => {
    if (!doc || !activeVariationId) return;

    const nextHash = `#${activeVariationId}`;
    if (location.hash === nextHash) return;

    suppressNextHashScrollRef.current = true;
    navigate(
      {
        pathname: location.pathname,
        search: location.search,
        hash: nextHash
      },
      { replace: true }
    );
  }, [activeVariationId, doc, location.hash, location.pathname, location.search, navigate]);

  if (!doc) {
    return (
      <div className="flex w-full flex-col">
        <div className="border border-border px-6 py-8">
          <div className="space-y-3">
            <h1 className="text-2xl font-semibold">Component not found</h1>
            <p className="text-sm text-muted-foreground">
              The route exists, but no registry entry matches this component slug.
            </p>
            <Link to="/components">
              <AntButton type="primary">Back to overview</AntButton>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const packageVersionLabel = selectedRelease?.manifest.packageVersions?.ui ?? selectedVersion;
  const latestVersionLabel = latestReleaseSnapshot?.version ?? null;
  const componentLinksVersion = selectedVersion ?? latestReleaseSnapshot?.version ?? null;
  const variantLabels = visibleVariations.map((variation) => variation.title);

  return (
    <div className="flex w-full flex-col">
      <div className="grid gap-0 border-y border-border lg:h-[calc(100vh-5rem)] lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="hidden min-h-0 border-r border-border lg:block">
          <DocsCatalogSidebar
            activeVariationId={activeVariationId}
            componentDoc={doc}
            componentVersion={componentLinksVersion}
            variations={visibleVariations}
            onSelectVariation={(variationId) => {
              const target = scrollContainerRef.current?.querySelector<HTMLElement>(
                `[data-variation-section="${variationId}"]`
              );

              if (target) {
                pendingHashScrollRef.current = null;
                target.scrollIntoView({ behavior: "smooth", block: "start" });
                setActiveVariationId(variationId);
              }
            }}
          />
        </aside>

        <main
          key={`${doc.slug}-${selectedVersion ?? "current"}`}
          ref={scrollContainerRef}
          data-testid="component-detail-scroll"
          className="min-h-0 h-full overflow-y-auto"
        >
          <div className="sticky top-0 z-10 border-b border-border bg-background/95 px-4 py-3 backdrop-blur sm:px-6">
            <ComponentThemeToolbar
              latestVersionLabel={latestVersionLabel}
              releases={releaseSnapshots}
              selectedVersion={selectedVersion}
              onVersionChange={(nextVersion) => {
                const nextSearchParams = new URLSearchParams(searchParams);
                nextSearchParams.set("version", nextVersion);
                navigate(
                  {
                    pathname: location.pathname,
                    search: `?${nextSearchParams.toString()}`,
                    hash: location.hash
                  },
                  { replace: true }
                );
              }}
            />
          </div>

          <section className="border-b border-border px-4 py-6 sm:px-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-semibold tracking-tight">{doc.name}</h1>
              <p className="text-sm text-muted-foreground">{doc.summary}</p>
              {selectedVersion ? (
                <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-muted-foreground">
                  <Tag bordered={false} className="m-0" data-testid="component-release-badge">
                    Version {selectedVersion}
                  </Tag>
                  {packageVersionLabel ? (
                    <Tag bordered={false} className="m-0">
                      UI {packageVersionLabel}
                    </Tag>
                  ) : null}
                </div>
              ) : null}
            </div>
          </section>

          <section className="border-b border-border px-4 py-6 sm:px-6" data-testid="component-overview">
            <div className="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
              <div className="space-y-2">
                <h2 className="text-xl font-semibold tracking-tight">Overview</h2>
                <p className="text-sm leading-6 text-muted-foreground">
                  {doc.description ?? doc.summary}
                </p>
              </div>

              {doc.whenToUse.length > 0 ? (
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold tracking-tight">Use cases</h2>
                  <ul className="space-y-2 text-sm leading-6 text-muted-foreground">
                    {doc.whenToUse.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-foreground/40" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </section>

          {!releaseState?.componentAvailable ? (
            <section className="px-4 py-6 sm:px-6" data-testid="component-release-empty-state">
              <div className="rounded-[22px] border border-dashed border-border bg-muted/30 px-6 py-8">
                <div className="max-w-xl space-y-2">
                  <h2 className="text-xl font-semibold tracking-tight">No release preview for this version</h2>
                  <p className="text-sm text-muted-foreground">
                    {doc.name} was not included in version {selectedVersion}. Select a newer version to review the
                    current release preview.
                  </p>
                </div>
              </div>
            </section>
          ) : null}

          {releaseState?.componentAvailable && visibleVariations.length === 0 ? (
            <section className="px-4 py-6 sm:px-6" data-testid="component-release-samples-empty-state">
              <div className="rounded-[22px] border border-dashed border-border bg-muted/30 px-6 py-8">
                <div className="max-w-xl space-y-2">
                  <h2 className="text-xl font-semibold tracking-tight">No recorded samples for this version</h2>
                  <p className="text-sm text-muted-foreground">
                    {doc.name} exists in version {selectedVersion}, but this release snapshot does not include versioned
                    preview samples yet.
                  </p>
                </div>
              </div>
            </section>
          ) : null}

          {releaseState?.componentAvailable && visibleVariations.length > 0 ? (
            <div>
              <section className="border-b border-border px-4 py-6 sm:px-6" data-testid="component-examples-header">
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold tracking-tight">Examples</h2>
                  <p className="text-sm text-muted-foreground">
                    Each example keeps the rendered JSX and the copyable docs code separate, matching the AntD docs authoring model.
                  </p>
                </div>
              </section>
              {visibleVariations.map((variation) => (
                <section
                  key={variation.id}
                  id={variation.id}
                  data-testid={`variation-section-${variation.id}`}
                  data-variation-section={variation.id}
                  className="px-4 py-6 sm:px-6"
                >
                  <div className="mb-4 space-y-2">
                    <h2 className="text-xl font-semibold tracking-tight">{variation.title}</h2>
                    <p className="text-sm text-muted-foreground">{variation.description}</p>
                  </div>

                  <VariationPlayground
                    code={variation.code}
                    id={variation.id}
                    layout={variation.layout ?? "center"}
                    preview={variation.component ?? variation.preview ?? null}
                  />
                </section>
              ))}
            </div>
          ) : null}

          {releaseState?.componentAvailable && doc.figma ? (
            <section className="border-t border-border px-4 py-8 sm:px-6" data-testid="component-figma-props">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Figma -&gt; Props</h2>
                <p className="text-sm text-muted-foreground">
                  Source main component: <code className="rounded bg-muted px-1.5 py-0.5 text-[0.875em]">{doc.figma.nodeName}</code>{" "}
                  (<code className="rounded bg-muted px-1.5 py-0.5 text-[0.875em]">{doc.figma.nodeId}</code>)
                </p>
              </div>

              <div className="mt-4 rounded-[18px] border border-border bg-muted/20 p-5">
                <ul className="space-y-2 text-sm leading-6 text-muted-foreground">
                  {doc.figma.propRules.map((rule) => (
                    <li key={rule} className="flex gap-2">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-foreground/40" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 overflow-hidden rounded-[18px] border border-border">
                <div className="overflow-x-auto">
                  <table className="min-w-full border-collapse text-sm" data-testid="component-figma-mapping-table">
                    <thead className="bg-muted/50 text-left">
                      <tr className="border-b border-border">
                        <th className="px-4 py-3 font-medium text-foreground">Figma source</th>
                        <th className="px-4 py-3 font-medium text-foreground">React prop</th>
                        <th className="px-4 py-3 font-medium text-foreground">Rule</th>
                        <th className="px-4 py-3 font-medium text-foreground">Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {doc.figma.mappings.map((mapping) => (
                        <tr key={`${mapping.reactProp}-${mapping.figmaNodeId}`} className="border-b border-border last:border-b-0">
                          <td className="px-4 py-3 align-top">
                            <div className="space-y-1">
                              <div className="font-medium text-foreground">{mapping.figmaNodeName}</div>
                              <div className="font-mono text-xs text-muted-foreground">{mapping.figmaNodeId}</div>
                            </div>
                          </td>
                          <td className="px-4 py-3 align-top">
                            <span className="inline-flex rounded-md bg-muted px-2 py-1 font-mono text-xs text-foreground">
                              {mapping.reactProp}
                            </span>
                          </td>
                          <td className="px-4 py-3 align-top text-muted-foreground">{mapping.rule}</td>
                          <td className="px-4 py-3 align-top text-muted-foreground">{mapping.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          ) : null}

          {releaseState?.componentAvailable ? (
            <section className="border-t border-border px-4 py-8 sm:px-6" data-testid="component-api-reference">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">API Reference</h2>
                <p className="text-sm text-muted-foreground">
                  The <code className="rounded bg-muted px-1.5 py-0.5 text-[0.875em]">{doc.name}</code> component
                  supports the following props.
                </p>
              </div>

              <div className="mt-6 overflow-hidden rounded-[18px] border border-border">
                <div className="overflow-x-auto">
                  <table className="min-w-full border-collapse text-sm" data-testid="component-api-table">
                    <thead className="bg-muted/50 text-left">
                      <tr className="border-b border-border">
                        <th className="px-4 py-3 font-medium text-foreground">Prop</th>
                        <th className="px-4 py-3 font-medium text-foreground">Type</th>
                        <th className="px-4 py-3 font-medium text-foreground">Default</th>
                        <th className="px-4 py-3 font-medium text-foreground">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {doc.api.map((prop) => (
                        <tr key={prop.name} className="border-b border-border last:border-b-0">
                          <td className="px-4 py-3 align-top">
                            <span className="inline-flex rounded-md bg-muted px-2 py-1 font-mono text-xs text-foreground">
                              {prop.name}
                            </span>
                          </td>
                          <td className="px-4 py-3 align-top font-mono text-xs text-foreground">{prop.type}</td>
                          <td className="px-4 py-3 align-top font-mono text-xs text-muted-foreground">
                            {prop.defaultValue}
                          </td>
                          <td className="px-4 py-3 align-top text-muted-foreground">{prop.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          ) : null}

          {releaseState?.componentAvailable && (variantLabels.length > 0 || doc.accessibility.length > 0) ? (
            <section className="border-t border-border px-4 py-8 sm:px-6" data-testid="component-variants-use-cases">
              <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
                {variantLabels.length > 0 ? (
                  <div className="space-y-2">
                    <h2 className="text-2xl font-semibold tracking-tight">Variants</h2>
                    <ul className="space-y-2 text-sm leading-6 text-muted-foreground">
                      {variantLabels.map((label) => (
                        <li key={label} className="flex gap-2">
                          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-foreground/40" />
                          <span>{label}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {doc.accessibility.length > 0 ? (
                  <div className="space-y-2">
                    <h2 className="text-2xl font-semibold tracking-tight">Accessibility</h2>
                    <ul className="space-y-2 text-sm leading-6 text-muted-foreground">
                      {doc.accessibility.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-foreground/40" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </section>
          ) : null}
        </main>

      </div>
    </div>
  );
}

function VariationPlayground({
  code,
  id,
  layout,
  preview
}: {
  code: string;
  id: string;
  layout: "center" | "start";
  preview: ReactNode;
}) {
  const DEFAULT_VIEWPORT_RATIO = 0.96;
  const MIN_VIEWPORT_WIDTH = 392;
  const { activeTheme, themeStyle } = useDocsTheme();
  const previewShellRef = useRef<HTMLDivElement | null>(null);
  const viewportPanelRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLIFrameElement | null>(null);
  const [panelWidth, setPanelWidth] = useState(0);
  const [shellWidth, setShellWidth] = useState(0);
  const [frameHeight, setFrameHeight] = useState(320);
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPanelWidth(0);
    setShellWidth(0);
  }, [id]);

  useEffect(() => {
    const shell = previewShellRef.current;
    const panel = viewportPanelRef.current;
    if (!shell || !panel) return;

    const syncMetrics = () => {
      setShellWidth(shell.clientWidth);
      setPanelWidth(panel.clientWidth);
    };

    syncMetrics();

    const resizeObserver = new ResizeObserver(syncMetrics);
    resizeObserver.observe(shell);
    resizeObserver.observe(panel);

    return () => {
      resizeObserver.disconnect();
    };
  }, [id]);

  useEffect(() => {
    const iframe = viewportRef.current;
    if (!iframe) return;

    const doc = iframe.contentDocument;
    if (!doc) return;

    doc.open();
    doc.write(
      "<!DOCTYPE html><html><head><meta charset=\"utf-8\" /><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" /></head><body><div id=\"preview-root\"></div></body></html>"
    );
    doc.close();

    const base = doc.createElement("base");
    base.href = document.baseURI;
    doc.head.appendChild(base);

    document
      .querySelectorAll('link[rel="stylesheet"], style')
      .forEach((node) => doc.head.appendChild(node.cloneNode(true)));

    const previewStyle = doc.createElement("style");
    previewStyle.textContent = `
      html, body {
        margin: 0;
        height: 100%;
        min-height: 100%;
        background: transparent;
      }

      body {
        display: flex;
        width: 100%;
        height: 100%;
      }

      #preview-root {
        flex: 1 1 auto;
        width: 100%;
        height: 100%;
        min-height: 100%;
      }
    `;
    doc.head.appendChild(previewStyle);

    const root = doc.getElementById("preview-root");
    if (!root) return;

    setMountNode(root);
  }, [id]);

  useEffect(() => {
    if (!mountNode) return;

    const doc = mountNode.ownerDocument;
    const syncHeight = () => {
      const nextHeight = Math.max(
        240,
        mountNode.scrollHeight,
        doc.body.scrollHeight,
        doc.documentElement.scrollHeight
      );
      setFrameHeight(nextHeight);
    };

    syncHeight();

    const resizeObserver = new ResizeObserver(syncHeight);
    resizeObserver.observe(mountNode);
    resizeObserver.observe(doc.body);
    resizeObserver.observe(doc.documentElement);

    const mutationObserver = new MutationObserver(syncHeight);
    mutationObserver.observe(mountNode, {
      attributes: true,
      characterData: true,
      childList: true,
      subtree: true
    });

    const rafId = window.requestAnimationFrame(syncHeight);

    return () => {
      window.cancelAnimationFrame(rafId);
      mutationObserver.disconnect();
      resizeObserver.disconnect();
    };
  }, [mountNode, preview, panelWidth]);

  const widthRatio =
    shellWidth > 0 ? Math.min(1, Math.max(0.32, panelWidth / shellWidth)) : DEFAULT_VIEWPORT_RATIO;
  const previewHeight = Math.max(320, frameHeight);
  const previewLayoutClassName =
    layout === "start"
      ? "flex min-h-full w-full items-start justify-start bg-background p-4 sm:p-6"
      : "flex min-h-full w-full items-center justify-center bg-background";

  return (
    <ThemeRoot theme={activeTheme} style={themeStyle}>
      <Card
        className="docs-variation-card overflow-hidden rounded-[22px]"
        styles={{ body: { padding: 0 } }}
      >
        <section className="relative min-h-[320px]" aria-label={`${id} preview`}>
          <div
            ref={previewShellRef}
            className="relative min-h-[320px] overflow-hidden"
            data-testid={`${id}-preview-frame`}
          >
            <Splitter className="docs-preview-splitter" style={{ height: `${previewHeight}px` }}>
              <Splitter.Panel
                defaultSize={`${Math.round(DEFAULT_VIEWPORT_RATIO * 100)}%`}
                min={MIN_VIEWPORT_WIDTH}
              >
                <div
                  ref={viewportPanelRef}
                  className="docs-preview-viewport-panel relative h-full min-h-[320px] overflow-hidden bg-background"
                >
                  <iframe
                    ref={viewportRef}
                    data-testid={`${id}-preview-viewport`}
                    data-width-ratio={widthRatio.toFixed(2)}
                    title={`${id} preview viewport`}
                    className="block border-0 bg-transparent"
                    style={{
                      height: `${previewHeight}px`,
                      width: "100%"
                    }}
                  />
                  {mountNode
                    ? createPortal(
                        <ThemeRoot
                          theme={activeTheme}
                          style={themeStyle}
                          className={previewLayoutClassName}
                        >
                          {preview}
                        </ThemeRoot>,
                        mountNode
                      )
                    : null}
                </div>
              </Splitter.Panel>
              <Splitter.Panel min={0}>
                <div
                  data-testid={`${id}-preview-fill`}
                  className="docs-preview-fill-panel h-full min-h-[320px] bg-muted/60"
                />
              </Splitter.Panel>
            </Splitter>
          </div>
        </section>

        <Accordion
          type="single"
          collapsible
          defaultValue={`${id}-source-code`}
          className="border-t border-border"
        >
          <AccordionItem
            value={`${id}-source-code`}
            className="rounded-none border-0 bg-transparent px-0"
          >
            <AccordionTrigger
              className="px-4 py-3 text-sm font-medium text-foreground hover:text-foreground sm:px-6"
              data-testid={`${id}-code-accordion-trigger`}
            >
              Code preview
            </AccordionTrigger>
            <AccordionContent
              className="[&>div]:pb-0"
              data-testid={`${id}-code-accordion-content`}
            >
              <section aria-label={`${id} source code`}>
                <ReadonlyCodePanel code={code} testIdPrefix={id} />
              </section>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>
    </ThemeRoot>
  );
}

function ComponentThemeToolbar({
  latestVersionLabel,
  onVersionChange,
  releases,
  selectedVersion
}: {
  latestVersionLabel: string | null;
  onVersionChange: (version: string) => void;
  releases: ReleaseSnapshot[];
  selectedVersion: string | null;
}) {
  const {
    selectedThemeFamily,
    selectedThemeMode,
    setThemeFamily,
    setThemeMode
  } = useDocsTheme();
  const isDarkMode = selectedThemeMode === "dark";
  const releaseOptions = releases.map((release) => ({
    label: `Version: ${release.version}${release.version === latestVersionLabel ? " (Latest)" : ""}`,
    value: release.version
  }));
  const themeOptions = themeFamilyNames.map((themeFamily) => ({
    label: `Theme: ${themeFamilyCatalog[themeFamily].label}`,
    value: themeFamily
  }));

  return (
    <Space wrap size={12} className="w-full justify-end" data-testid="component-theme-toolbar">
      {releases.length > 0 && selectedVersion ? (
        <AntSelect
          aria-label="Select release version"
          className="docs-toolbar-select docs-toolbar-select-wide"
          data-testid="release-toolbar-select"
          options={releaseOptions}
          popupMatchSelectWidth={false}
          value={selectedVersion}
          onChange={onVersionChange}
        />
      ) : null}

      <AntSelect
        aria-label="Select preview theme"
        className="docs-toolbar-select docs-toolbar-select-wide"
        data-testid="theme-toolbar-select"
        options={themeOptions}
        popupMatchSelectWidth={false}
        value={selectedThemeFamily}
        onChange={(value) => setThemeFamily(value as (typeof themeFamilyNames)[number])}
      />

      <AntButton
        aria-label="Toggle dark mode"
        aria-pressed={isDarkMode}
        className="docs-toolbar-toggle"
        data-testid="theme-dark-toggle"
        icon={isDarkMode ? <SunOutlined /> : <MoonOutlined />}
        shape="circle"
        onClick={() => setThemeMode(isDarkMode ? "light" : "dark")}
      />
    </Space>
  );
}
