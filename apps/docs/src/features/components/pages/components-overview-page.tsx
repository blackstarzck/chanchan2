import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Card, Tag, Typography } from "antd";

import { DocsCatalogSidebar } from "../../catalog/ui/docs-catalog-sidebar";
import { getComponentDoc } from "../component-docs";
import {
  componentCatalog,
  componentCategories,
  type ComponentCatalogItem
} from "../registry";

type TileConfig = {
  align?: "center" | "top" | "top-left";
  heightClassName?: string;
  scale?: number;
};

const defaultTileConfig: TileConfig = {
  align: "center",
  heightClassName: "h-[176px]",
  scale: 0.76
};

const tileConfigBySlug: Partial<Record<ComponentCatalogItem["slug"], TileConfig>> = {
  card: {
    heightClassName: "h-[176px]",
    scale: 0.68
  },
  carousel: {
    align: "top-left",
    heightClassName: "h-[176px]",
    scale: 0.64
  },
  "color-picker": {
    align: "top-left",
    heightClassName: "h-[200px]",
    scale: 0.72
  },
  "context-menu": {
    align: "top-left",
    heightClassName: "h-[200px]",
    scale: 0.7
  },
  "date-picker": {
    align: "top-left",
    heightClassName: "h-[216px]",
    scale: 0.72
  },
  dialog: {
    heightClassName: "h-[208px]",
    scale: 0.7
  },
  "dropdown-menu": {
    align: "top-left",
    heightClassName: "h-[200px]",
    scale: 0.72
  },
  dropzone: {
    align: "top-left",
    heightClassName: "h-[208px]",
    scale: 0.72
  },
  "file-input": {
    align: "top-left",
    heightClassName: "h-[184px]",
    scale: 0.78
  },
  "input-group": {
    align: "top-left",
    heightClassName: "h-[184px]",
    scale: 0.74
  },
  "legend-indicator": {
    align: "top-left",
    heightClassName: "h-[152px]",
    scale: 0.82
  },
  "list-group": {
    align: "top-left",
    heightClassName: "h-[208px]",
    scale: 0.72
  },
  navbar: {
    align: "top-left",
    heightClassName: "h-[168px]",
    scale: 0.62
  },
  pagination: {
    align: "top-left",
    heightClassName: "h-[152px]",
    scale: 0.82
  },
  popover: {
    heightClassName: "h-[208px]",
    scale: 0.72
  },
  "rich-text-toolbar": {
    align: "top-left",
    heightClassName: "h-[224px]",
    scale: 0.66
  },
  sheet: {
    align: "top-left",
    heightClassName: "h-[216px]",
    scale: 0.68
  },
  sidebar: {
    align: "top-left",
    heightClassName: "h-[224px]",
    scale: 0.62
  },
  table: {
    align: "top-left",
    heightClassName: "h-[208px]",
    scale: 0.68
  },
  tabs: {
    align: "top-left",
    heightClassName: "h-[168px]",
    scale: 0.72
  },
  timeline: {
    align: "top-left",
    heightClassName: "h-[216px]",
    scale: 0.66
  },
  "upload-list": {
    align: "top-left",
    heightClassName: "h-[224px]",
    scale: 0.68
  }
};

export function ComponentsOverviewPage() {
  const sections = componentCategories
    .map((category) => ({
      category,
      items: componentCatalog.filter((component) => component.category === category)
    }))
    .filter((section) => section.items.length > 0);

  return (
    <div className="px-4 py-6 lg:px-6">
      <div className="mx-auto max-w-[1680px]">
        <div className="grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)]">
          <aside className="hidden lg:block">
            <div className="sticky top-24 h-[calc(100vh-7rem)] overflow-hidden pr-4">
              <DocsCatalogSidebar />
            </div>
          </aside>

          <div className="space-y-10">
            <section className="space-y-3 border-b border-border pb-6">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                Component catalog
              </p>
              <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
                <div className="space-y-2">
                  <Typography.Title level={1} className="!mb-0 !text-3xl tracking-tight">
                    Components Overview
                  </Typography.Title>
                  <Typography.Paragraph className="!mb-0 max-w-3xl text-sm text-muted-foreground">
                    The overview now works like a visual index: each section keeps dense preview
                    tiles on the page, while detailed behavior, API, and code stay on the component
                    routes.
                  </Typography.Paragraph>
                </div>
                <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                  <Tag bordered={false} className="m-0 px-3 py-1.5 text-sm">
                    {componentCatalog.length} components indexed
                  </Tag>
                  <Tag bordered={false} className="m-0 px-3 py-1.5 text-sm">
                    {sections.length} grouped sections
                  </Tag>
                </div>
              </div>
            </section>

            {sections.map((section) => (
              <section
                key={section.category}
                id={getCategoryAnchorId(section.category)}
                className="scroll-mt-28 space-y-4"
              >
                <div className="flex items-center gap-3 pb-4">
                  <div className="flex items-baseline gap-3">
                    <h2 className="text-2xl font-semibold tracking-tight">{section.category}</h2>
                    <p className="text-sm text-muted-foreground">{section.items.length}</p>
                  </div>
                </div>

                <div className="grid auto-rows-[minmax(156px,auto)] gap-4 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5">
                  {section.items.map((item) => (
                    <ComponentPreviewTile key={item.slug} item={item} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ComponentPreviewTile({ item }: { item: ComponentCatalogItem }) {
  const doc = getComponentDoc(item.slug);
  const firstVariation = doc?.variations[0];
  const tileAnchorId = getComponentAnchorId(item.slug);
  const tileTitleId = `${tileAnchorId}-title`;
  const config = {
    ...defaultTileConfig,
    ...(tileConfigBySlug[item.slug] ?? {})
  };

  return (
    <Card
      id={tileAnchorId}
      data-testid={`component-overview-tile-${item.slug}`}
      className="docs-component-preview-card group relative scroll-mt-28 overflow-hidden rounded-[16px]"
      hoverable
      styles={{
        body: { padding: "24px 16px" },
        header: { minHeight: "auto", padding: "12px 16px" }
      }}
      title={
        <div
          id={tileTitleId}
          className="text-sm font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary group-focus-within:text-primary"
        >
          {item.name}
        </div>
      }
    >
      <Link
        to={`/components/${item.slug}`}
        aria-labelledby={tileTitleId}
        className="absolute inset-0 z-10 rounded-[16px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      />

      <div
        className={`relative overflow-hidden bg-background ${config.heightClassName}`}
      >
        {firstVariation ? (
          <ScaledPreview align={config.align ?? "center"} scale={config.scale ?? 0.76}>
            {firstVariation.preview}
          </ScaledPreview>
        ) : (
          <div className="flex h-full items-center justify-center px-6 text-center text-sm text-muted-foreground">
            Preview will land here with the component detail content.
          </div>
        )}
      </div>
    </Card>
  );
}

function ScaledPreview({
  align,
  children,
  scale
}: {
  align: NonNullable<TileConfig["align"]>;
  children: ReactNode;
  scale: number;
}) {
  const origin =
    align === "center" ? "center center" : align === "top" ? "top center" : "top left";
  const alignmentClassName =
    align === "center"
      ? "items-center justify-center px-6 py-4"
      : align === "top"
        ? "items-start justify-center px-4 py-4"
        : "items-start justify-start px-4 py-4";
  const viewportRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [resolvedScale, setResolvedScale] = useState(scale);

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    const content = contentRef.current;

    if (!viewport || !content || typeof ResizeObserver === "undefined") {
      setResolvedScale(scale);
      return;
    }

    let frameId = 0;

    const updateScale = () => {
      frameId = 0;

      const viewportRect = viewport.getBoundingClientRect();
      const viewportStyle = window.getComputedStyle(viewport);
      const availableWidth =
        viewportRect.width -
        parseFloat(viewportStyle.paddingLeft) -
        parseFloat(viewportStyle.paddingRight);
      const availableHeight =
        viewportRect.height -
        parseFloat(viewportStyle.paddingTop) -
        parseFloat(viewportStyle.paddingBottom);
      const contentRect = content.getBoundingClientRect();

      if (
        availableWidth <= 0 ||
        availableHeight <= 0 ||
        contentRect.width <= 0 ||
        contentRect.height <= 0
      ) {
        setResolvedScale(scale);
        return;
      }

      const nextScale = Math.min(
        scale,
        1,
        availableWidth / contentRect.width,
        availableHeight / contentRect.height
      );

      setResolvedScale((currentScale) =>
        Math.abs(currentScale - nextScale) < 0.01 ? currentScale : nextScale
      );
    };

    const scheduleUpdate = () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }

      frameId = requestAnimationFrame(updateScale);
    };

    const resizeObserver = new ResizeObserver(scheduleUpdate);
    resizeObserver.observe(viewport);
    resizeObserver.observe(content);
    scheduleUpdate();

    return () => {
      resizeObserver.disconnect();

      if (frameId) {
        cancelAnimationFrame(frameId);
      }
    };
  }, [scale]);

  return (
    <div
      aria-hidden="true"
      inert={true}
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div ref={viewportRef} className={`flex h-full w-full ${alignmentClassName}`}>
        <div ref={contentRef} className="shrink-0">
          <div
            className="shrink-0"
            style={{
              transform: `scale(${resolvedScale})`,
              transformOrigin: origin
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

function getCategoryAnchorId(category: string) {
  return `components-category-${toKebabCase(category)}`;
}

function getComponentAnchorId(slug: string) {
  return `components-item-${slug}`;
}

function toKebabCase(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}
