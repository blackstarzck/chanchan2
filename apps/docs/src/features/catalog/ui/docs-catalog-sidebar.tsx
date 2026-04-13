import { Menu } from "antd";
import type { MenuProps } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import type { ComponentDoc } from "../../components/component-docs";
import type { VariationNavItem } from "../../components/component-doc-types";
import { docsCatalogGroups } from "../docs-page-registry";

type MenuItem = Required<MenuProps>["items"][number];

function mergeOpenKeys(current: string[], required: string[]) {
  const next = new Set(current);
  required.forEach((key) => next.add(key));

  if (next.size === current.length && current.every((key) => next.has(key))) {
    return current;
  }

  return Array.from(next);
}

function filterVariationNavItems(
  items: VariationNavItem[],
  visibleVariationIds: Set<string>
): VariationNavItem[] {
  return items.flatMap((item) => {
    const filteredItems = item.items
      ? filterVariationNavItems(item.items, visibleVariationIds)
      : undefined;
    const hasVisibleVariation = item.id ? visibleVariationIds.has(item.id) : false;

    if (!hasVisibleVariation && (!filteredItems || filteredItems.length === 0)) {
      return [];
    }

    return [{ ...item, items: filteredItems }];
  });
}

function renderMenuLabel(label: string, testId?: string, isCurrent = false) {
  return (
    <span
      aria-current={isCurrent ? "location" : undefined}
      className="flex min-w-0 items-center gap-2"
      data-testid={testId}
    >
      <span className="min-w-0 flex-1 truncate">{label}</span>
    </span>
  );
}

function buildVariationMenuItems(
  items: VariationNavItem[],
  parentKey: string,
  activeVariationId?: string
): {
  ancestorKeysByVariationId: Map<string, string[]>;
  items: MenuItem[];
} {
  const ancestorKeysByVariationId = new Map<string, string[]>();
  const menuItems: MenuItem[] = [];

  items.forEach((item, index) => {
    const nodeKey = `${parentKey}:node:${index}`;

    if (item.items?.length) {
      const nested = buildVariationMenuItems(item.items, nodeKey, activeVariationId);

      menuItems.push({
        children: nested.items,
        key: nodeKey,
        label: item.label
      });

      nested.ancestorKeysByVariationId.forEach((ancestorKeys, variationId) => {
        ancestorKeysByVariationId.set(variationId, [nodeKey, ...ancestorKeys]);
      });

      return;
    }

    if (!item.id) return;

    const variationKey = `variation:${item.id}`;
    menuItems.push({
      key: variationKey,
      label: renderMenuLabel(
        item.label,
        `variation-nav-${item.id}`,
        activeVariationId === item.id
      )
    });
    ancestorKeysByVariationId.set(item.id, []);
  });

  return { ancestorKeysByVariationId, items: menuItems };
}

export function DocsCatalogSidebar({
  activeVariationId,
  componentDoc,
  componentVersion,
  onSelectVariation,
  variations
}: {
  activeVariationId?: string;
  componentDoc?: ComponentDoc | null;
  componentVersion?: string | null;
  onSelectVariation?: (variationId: string) => void;
  variations?: ComponentDoc["variations"];
}) {
  const location = useLocation();
  const navigate = useNavigate();

  const visibleVariations = variations ?? componentDoc?.variations ?? [];
  const visibleVariationIds = useMemo(
    () => new Set(visibleVariations.map((variation) => variation.id)),
    [visibleVariations]
  );
  const groupedVariations = useMemo(
    () =>
      componentDoc?.variationGroups
        ?.map((group) => ({
          ...group,
          items: filterVariationNavItems(group.items, visibleVariationIds)
        }))
        .filter((group) => group.items.length > 0),
    [componentDoc?.variationGroups, visibleVariationIds]
  );

  const menuConfig = useMemo(() => {
    const routeByKey = new Map<string, string>();
    const activeOpenKeys = new Set<string>();
    const variationAncestorKeysById = new Map<string, string[]>();
    let selectedKey: string | undefined;

    const items: MenuItem[] = docsCatalogGroups.flatMap((group) => {
      const groupKey = `group:${group.label}`;
      const groupChildren: MenuItem[] = group.items.map((item) => {
        const itemHref =
          item.kind === "component" && componentVersion
            ? `${item.to}?version=${encodeURIComponent(componentVersion)}`
            : item.to;
        const pageKey = `page:${item.id}`;

        routeByKey.set(pageKey, itemHref);

        const isActiveRoute = location.pathname === item.to;
        const isActiveComponent =
          item.kind === "component" && item.componentSlug === componentDoc?.slug;

        if (isActiveRoute && group.label !== "Components") {
          activeOpenKeys.add(groupKey);
        }

        if (
          isActiveComponent &&
          onSelectVariation &&
          ((groupedVariations && groupedVariations.length > 0) || visibleVariations.length > 0)
        ) {
          const componentKey = `component:${item.id}`;
          if (group.label !== "Components") {
            activeOpenKeys.add(groupKey);
          }
          activeOpenKeys.add(componentKey);

          const componentChildren = groupedVariations?.length
            ? groupedVariations.map((variationGroup, groupIndex) => {
                const groupNodeKey = `${componentKey}:group:${groupIndex}`;
                const nested = buildVariationMenuItems(
                  variationGroup.items,
                  groupNodeKey,
                  activeVariationId
                );

                nested.ancestorKeysByVariationId.forEach((ancestorKeys, variationId) => {
                  variationAncestorKeysById.set(variationId, [componentKey, ...ancestorKeys]);
                });

                return {
                  children: nested.items,
                  key: groupNodeKey,
                  label: variationGroup.label,
                  type: "group" as const
                };
              })
              : visibleVariations.map((variation) => ({
                  key: `variation:${variation.id}`,
                  label: renderMenuLabel(
                    variation.title,
                    `variation-nav-${variation.id}`,
                    activeVariationId === variation.id
                  )
                }));

          if (!groupedVariations?.length) {
            visibleVariations.forEach((variation) => {
              variationAncestorKeysById.set(variation.id, [componentKey]);
            });
          }

          if (isActiveRoute && !activeVariationId) {
            selectedKey = componentKey;
          }

          return {
            children: componentChildren,
            key: componentKey,
            label: renderMenuLabel(item.label, `catalog-link-${item.id}`)
          };
        }

        if (isActiveRoute && !activeVariationId) {
          selectedKey = pageKey;
        }

        return {
          key: pageKey,
          label: renderMenuLabel(item.label, `catalog-link-${item.id}`)
        };
      });

      if (group.label === "Components") {
        return groupChildren;
      }

      return [
        {
          children: groupChildren,
          key: groupKey,
          label: group.label
        }
      ];
    });

    if (activeVariationId) {
      selectedKey = `variation:${activeVariationId}`;
      variationAncestorKeysById.get(activeVariationId)?.forEach((key) => activeOpenKeys.add(key));
    }

    return {
      activeOpenKeys: Array.from(activeOpenKeys),
      items,
      routeByKey,
      selectedKey
    };
  }, [
    activeVariationId,
    componentDoc?.slug,
    componentVersion,
    groupedVariations,
    location.pathname,
    onSelectVariation,
    visibleVariations
  ]);

  const [openKeys, setOpenKeys] = useState<string[]>(menuConfig.activeOpenKeys);

  useEffect(() => {
    setOpenKeys((current) => mergeOpenKeys(current, menuConfig.activeOpenKeys));
  }, [menuConfig.activeOpenKeys]);

  const onClick: MenuProps["onClick"] = ({ key }) => {
    if (typeof key !== "string") return;

    if (key.startsWith("variation:")) {
      onSelectVariation?.(key.replace("variation:", ""));
      return;
    }

    const href = menuConfig.routeByKey.get(key);
    if (href) {
      navigate(href);
    }
  };

  return (
    <div className="docs-catalog-sidebar h-full py-5" data-testid="component-catalog-sidebar">
      <div className="px-3">
        <div data-testid="variation-navigation">
          <Menu
            mode="inline"
            items={menuConfig.items}
            onClick={onClick}
            onOpenChange={(nextKeys) => setOpenKeys(nextKeys as string[])}
            openKeys={openKeys}
            selectedKeys={menuConfig.selectedKey ? [menuConfig.selectedKey] : []}
            inlineIndent={20}
            style={{ borderInlineEnd: 0, width: "100%" }}
          />
        </div>
      </div>
    </div>
  );
}
