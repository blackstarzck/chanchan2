import { expect, test } from "@playwright/test";

const routedComponentSlugs = [
  "accordion",
  "alert",
  "avatar",
  "badge",
  "blockquote",
  "button",
  "button-group",
  "button-icons",
  "card",
  "chat-bubbles",
  "carousel",
  "date-picker",
  "devices",
  "lists",
  "list-group",
  "legend-indicator",
  "progress",
  "rating",
  "skeleton",
  "spinner",
  "styled-icons",
  "timeline",
  "tree-view",
  "navbar",
  "tabs",
  "sidebar",
  "breadcrumb",
  "pagination",
  "stepper",
  "input",
  "input-group",
  "file-input",
  "checkbox",
  "radio-group",
  "switch",
  "select",
  "number-field",
  "password-field",
  "pin-input",
  "dropzone",
  "upload-list",
  "slider",
  "rich-text-toolbar",
  "dropdown-menu",
  "dialog",
  "sheet",
  "tooltip",
  "popover",
  "table",
  "line-chart",
  "bar-chart",
  "pie-chart",
  "doughnut-chart",
  "half-circle-chart",
  "shadows",
  "blur",
  "icon-collection-lucide",
  "custom-icons",
  "brands-avatars",
  "illustration",
  "flags",
  "credits"
] as const;

const routedStaticCatalogPages = [
  { testId: "catalog-link-templates-cms", path: "/templates/cms", heading: "CMS" },
  { testId: "catalog-link-templates-ai-chat", path: "/templates/ai-chat", heading: "AI Chat" },
  { testId: "catalog-link-templates-agency", path: "/templates/agency", heading: "Agency" },
  {
    testId: "catalog-link-templates-coffee-shop",
    path: "/templates/coffee-shop",
    heading: "Coffee Shop"
  },
  { testId: "catalog-link-templates-personal", path: "/templates/personal", heading: "Personal" },
  {
    testId: "catalog-link-customization-colors",
    path: "/customization/colors",
    heading: "Colors"
  },
  {
    testId: "catalog-link-layout-grid-layout",
    path: "/layout/grid-layout",
    heading: "Grid Layout"
  },
  {
    testId: "catalog-link-layout-containers",
    path: "/layout/containers",
    heading: "Containers"
  },
  {
    testId: "catalog-link-content-typography",
    path: "/content/typography",
    heading: "Typography"
  },
  { testId: "catalog-link-content-links", path: "/content/links", heading: "Links" },
  {
    testId: "catalog-link-content-dividers",
    path: "/content/dividers",
    heading: "Dividers"
  },
  { testId: "catalog-link-content-kbd", path: "/content/kbd", heading: "<kbd>" }
] as const;

test("navigates from overview to component detail and switches theme family and mode", async ({
  page
}) => {
  await page.goto("/overview");

  await expect(
    page.getByRole("heading", {
      name: /AntD-style information architecture/i
    })
  ).toBeVisible();

  const themeRoot = page.locator("[data-docs-theme]");
  await expect(themeRoot).toHaveAttribute("data-docs-theme", "default");

  await page.getByRole("button", { name: "Components" }).click();
  await expect(page).toHaveURL(/\/components$/);
  await expect(page.getByRole("heading", { name: "Components Overview" })).toBeVisible();

  await page.locator('a[href="/components/button"]').first().click();
  await expect(page).toHaveURL(/\/components\/button$/);
  await expect(page.getByRole("heading", { name: "Button", exact: true })).toBeVisible();
  await expect(page.getByTestId("component-catalog-sidebar")).toBeVisible();
  await expect(page.getByTestId("variation-anchor-sidebar")).toBeVisible();
  await expect(page.getByTestId("component-detail-scroll")).toBeVisible();
  await expect(page.getByTestId("variation-navigation")).toBeVisible();
  await expect(page.getByTestId("variation-nav-button-variants")).toHaveAttribute(
    "aria-current",
    "location"
  );

  await page.getByTestId("theme-toolbar-select").click();
  await page.getByRole("option", { name: /^Harvest$/ }).click();

  await expect(themeRoot).toHaveAttribute("data-docs-theme", "harvest");
  const previewScope = page
    .frameLocator('[data-testid="button-variants-preview-viewport"]')
    .locator("[data-component-theme-scope]");
  await expect(previewScope).toHaveAttribute("data-component-theme", "harvest");
  await expect(previewScope).toHaveAttribute("data-theme", "harvest");
  await expect(previewScope).toHaveAttribute("data-mode", "light");

  await page.getByTestId("theme-dark-toggle").click();

  await expect(themeRoot).toHaveAttribute("data-docs-theme", "harvest-dark");
  await expect(previewScope).toHaveAttribute("data-component-theme", "harvest-dark");
  await expect(previewScope).toHaveAttribute("data-theme", "harvest");
  await expect(previewScope).toHaveAttribute("data-mode", "dark");
  await expect(page.getByTestId("component-theme-toolbar")).toBeVisible();
});

test("shows the release selector and preserves the selected version in component navigation", async ({
  page
}) => {
  await page.goto("/components/button?version=0.2.1");

  await expect(page.getByTestId("release-toolbar-select")).toBeVisible();
  await expect(page.getByTestId("component-release-badge")).toContainText("Version 0.2.1");

  await page.getByTestId("release-toolbar-select").click();
  await expect(page.getByRole("option", { name: /0.2.1/ })).toBeVisible();
  await page.keyboard.press("Escape");

  const selectNavLink = page.locator('a[href="/components/select?version=0.2.1"]').first();
  await expect(selectNavLink).toBeVisible();
  await selectNavLink.click();

  await expect(page).toHaveURL(/\/components\/select\?version=0\.2\.1$/);
  await expect(page.getByTestId("component-release-badge")).toContainText("Version 0.2.1");
  await expect(page.getByTestId("select-default-preview-frame")).toBeVisible();
});

test("opens component detail from the overview left nav and preview tiles", async ({ page }) => {
  await page.goto("/components");

  await page.getByTestId("catalog-link-component-button").click();
  await expect(page).toHaveURL(/\/components\/button(?:\?|$)/);
  await expect(page.getByRole("heading", { name: "Button", exact: true })).toBeVisible();

  await page.goto("/components");

  await page.getByTestId("component-overview-tile-select").click();
  await expect(page).toHaveURL(/\/components\/select$/);
  await expect(page.getByRole("heading", { name: "Select", exact: true })).toBeVisible();
});

test("uses the anchor panel to navigate and tracks the active variation on scroll", async ({ page }) => {
  await page.goto("/components/button");

  await expect(page.getByTestId("button-variants-preview-viewport")).toBeVisible();

  await page.getByTestId("variation-nav-button-sizes").click();

  await expect(page.getByTestId("variation-nav-button-sizes")).toHaveAttribute(
    "aria-current",
    "location"
  );
  await expect(page.getByTestId("variation-section-button-sizes")).toBeInViewport();

  await page.getByTestId("component-detail-scroll").evaluate((node) => {
    const target = node.querySelector('[data-variation-section="button-variants"]');
    if (!target) return;
    target.scrollIntoView({ block: "start" });
  });

  await expect(page.getByTestId("variation-nav-button-variants")).toHaveAttribute(
    "aria-current",
    "location"
  );
});

test("resets the main panel scroll before the next detail page becomes visible", async ({ page }) => {
  await page.goto("/components/button");

  const detailScroll = page.getByTestId("component-detail-scroll");

  await detailScroll.evaluate((node) => {
    node.scrollTo({ top: node.scrollHeight });
  });

  await expect
    .poll(() => detailScroll.evaluate((node) => node.scrollTop))
    .toBeGreaterThan(400);

  await page.getByTestId("catalog-link-component-select").click();

  await expect(page).toHaveURL(/\/components\/select(?:\?|$)/);

  const nextDetailScroll = page.getByTestId("component-detail-scroll");
  await expect(nextDetailScroll.getByRole("heading", { name: "Select", exact: true })).toBeVisible();
  await expect
    .poll(() => nextDetailScroll.evaluate((node) => node.scrollTop))
    .toBe(0);
});

test("renders heading, playground, toolbar, and API reference in the main panel", async ({ page }) => {
  await page.goto("/components/select");

  const mainPanel = page.getByTestId("component-detail-scroll");
  const codeTrigger = page.getByTestId("select-default-code-accordion-trigger");
  const codePanel = page.getByTestId("select-default-code-panel");
  await expect(mainPanel.getByRole("heading", { name: "Select", exact: true })).toBeVisible();
  await expect(mainPanel.getByText("Radix-based choice picker for short enumerated options.")).toBeVisible();
  await expect(page.getByTestId("component-theme-toolbar")).toBeVisible();
  await expect(page.getByTestId("select-default-preview-frame")).toBeVisible();
  await expect(codeTrigger).toBeVisible();
  await expect(codePanel).toBeHidden();
  await expect(page.getByTestId("component-api-reference")).toBeVisible();
  await expect(page.getByRole("heading", { name: "API Reference" })).toBeVisible();
  await expect(page.getByTestId("component-api-table")).toContainText("onValueChange");

  await codeTrigger.click();
  await expect(codePanel).toBeVisible();
  await expect(codePanel).toContainText(
    'import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@blackstarzck/ui"'
  );

  await expect(mainPanel.getByRole("heading", { name: "When to use" })).toHaveCount(0);
  await expect(mainPanel.getByRole("heading", { name: "Import" })).toHaveCount(0);
  await expect(mainPanel.getByRole("heading", { name: "Tokens" })).toHaveCount(0);
  await expect(mainPanel.getByRole("heading", { name: "Accessibility" })).toHaveCount(0);
  await expect(page.getByText("Component Panel")).toHaveCount(0);
});

test("matches the left catalog grouping to the figma page tree and exposes layout routes", async ({
  page
}) => {
  await page.goto("/components/button");

  await expect(page.getByTestId("component-catalog-sidebar")).toContainText("Templates");
  await expect(page.getByTestId("component-catalog-sidebar")).toContainText("Customization");
  await expect(page.getByTestId("component-catalog-sidebar")).toContainText("Layout");
  await expect(page.getByTestId("component-catalog-sidebar")).toContainText("Content");
  await expect(page.getByTestId("component-catalog-sidebar")).toContainText("Components");
  await expect(page.getByTestId("component-catalog-sidebar")).toContainText("Dividers");

  await page.getByTestId("catalog-link-layout-grid-layout").click();

  await expect(page).toHaveURL(/\/layout\/grid-layout$/);
  await expect(
    page.getByTestId("catalog-entry-scroll").getByRole("heading", { level: 1, name: "Grid Layout" })
  ).toBeVisible();
  await expect(page.getByText("Grid rules, column behavior, and spacing systems")).toBeVisible();
});

test("every figma-style static sidebar page resolves from the left catalog", async ({ page }) => {
  test.setTimeout(180_000);

  for (const entry of routedStaticCatalogPages) {
    await page.goto("/components/button");
    await page.getByTestId(entry.testId).click();

    await expect(page, `static route missing for ${entry.path}`).toHaveURL(
      new RegExp(`${entry.path.replace(/\//g, "\\/")}$`)
    );
    await expect(
      page.getByTestId("catalog-entry-scroll").getByRole("heading", { level: 1, name: entry.heading }),
      `catalog heading missing for ${entry.path}`
    ).toBeVisible();
  }
});

test("renders a persistent code editor and responsive preview inside a variation", async ({
  page
}) => {
  await page.goto("/components/select");

  const viewport = page.getByTestId("select-default-preview-viewport");
  const handle = page.locator('[data-testid="select-default-preview-frame"] .ant-splitter-bar').first();
  const codeTrigger = page.getByTestId("select-default-code-accordion-trigger");
  const codePanel = page.getByTestId("select-default-code-panel");

  await expect(viewport).toBeVisible();
  await expect(codePanel).toBeHidden();
  const initialRatio = await viewport.getAttribute("data-width-ratio");
  if (!initialRatio) throw new Error("Initial preview ratio was not available.");

  const handleBox = await handle.boundingBox();
  if (!handleBox) {
    throw new Error("Resize handle box was not available.");
  }

  await page.mouse.move(handleBox.x + handleBox.width / 2, handleBox.y + handleBox.height / 2);
  await page.mouse.down();
  await page.mouse.move(handleBox.x - 120, handleBox.y + handleBox.height / 2);
  await page.mouse.up();

  await expect
    .poll(async () => Number(await viewport.getAttribute("data-width-ratio")))
    .not.toBe(Number(initialRatio));

  await codeTrigger.click();
  await expect(codePanel).toBeVisible();
  await expect(codePanel).toContainText("export function SelectDefaultDemo()");
  await expect(codePanel).toContainText("<Select defaultValue=\"starter\">");
});

test("indexes button icon coverage from the expanded Radix button primitive", async ({ page }) => {
  await page.goto("/components");

  const buttonIconsLink = page.locator('a[href="/components/button-icons"]').first();
  await expect(buttonIconsLink).toBeVisible();

  await buttonIconsLink.click();

  await expect(page).toHaveURL(/\/components\/button-icons$/);
  await expect(page.getByRole("heading", { name: "Button Icons", exact: true })).toBeVisible();
  await expect(page.getByTestId("variation-nav-button-icons-types")).toBeVisible();
  await expect(page.getByTestId("variation-nav-button-icons-color-variants")).toBeVisible();
  await expect(page.getByTestId("variation-section-button-icons-examples")).toBeVisible();
  await expect(page.getByTestId("component-api-table")).toContainText("aria-label");
});

test("maps button group samples to multiple figma-style content sections", async ({ page }) => {
  await page.goto("/components/button-group");

  await expect(page.getByRole("heading", { name: "Button Group", exact: true })).toBeVisible();
  await expect(page.getByTestId("variation-nav-button-group-attached")).toBeVisible();
  await expect(page.getByTestId("variation-nav-button-group-topics")).toBeVisible();
  await expect(page.getByTestId("variation-nav-button-group-vertical")).toBeVisible();
  await expect(page.getByTestId("variation-nav-button-group-split")).toBeVisible();
  await expect(page.getByTestId("variation-nav-button-group-icon-pair")).toBeVisible();
  await expect(page.getByTestId("variation-nav-button-group-utility")).toBeVisible();
  await expect(page.getByTestId("variation-section-button-group-split")).toContainText(
    "Mixed-width groups support a primary CTA"
  );
});

test("surfaces multiple content sections for brands, avatar groups, and blockquotes", async ({ page }) => {
  await page.goto("/components/brands-avatars");

  await expect(page.getByTestId("variation-nav-brands-and-avatars-brand-marks")).toBeVisible();
  await expect(page.getByTestId("variation-nav-brands-and-avatars-people")).toBeVisible();
  await expect(page.getByTestId("variation-nav-avatar-group-stacked")).toBeVisible();
  await expect(page.getByTestId("variation-nav-avatar-group-grid")).toBeVisible();
  await expect(page.getByTestId("variation-nav-avatar-group-border-color")).toBeVisible();
  await expect(page.getByTestId("variation-nav-avatar-group-tooltip")).toBeVisible();
  await expect(page.getByTestId("variation-nav-avatar-group-dropdown")).toBeVisible();

  await page.goto("/components/blockquote");

  await expect(page.getByTestId("variation-nav-blockquote-basic")).toBeVisible();
  await expect(page.getByTestId("variation-nav-blockquote-small")).toBeVisible();
  await expect(page.getByTestId("variation-nav-blockquote-medium")).toBeVisible();
  await expect(page.getByTestId("variation-nav-blockquote-large")).toBeVisible();
  await expect(page.getByTestId("variation-nav-blockquote-right-aligned")).toBeVisible();
  await expect(page.getByTestId("variation-nav-blockquote-source")).toBeVisible();
  await expect(page.getByTestId("variation-nav-blockquote-with-avatar")).toBeVisible();
});

test("expands input groups and navs into multiple figma-style sections", async ({ page }) => {
  await page.goto("/components/input-group");

  await expect(page.getByTestId("variation-nav-input-group-url")).toBeVisible();
  await expect(page.getByTestId("variation-nav-input-group-leading-icon")).toBeVisible();
  await expect(page.getByTestId("variation-nav-input-group-trailing-icon")).toBeVisible();
  await expect(page.getByTestId("variation-nav-input-group-action")).toBeVisible();
  await expect(page.getByTestId("variation-nav-input-group-checkbox")).toBeVisible();

  await page.goto("/components/navs");

  await expect(page.getByTestId("variation-nav-navs-basic")).toBeVisible();
  await expect(page.getByTestId("variation-nav-navs-underline")).toBeVisible();
  await expect(page.getByTestId("variation-nav-navs-icons")).toBeVisible();
  await expect(page.getByTestId("variation-nav-navs-badges")).toBeVisible();
  await expect(page.getByTestId("variation-nav-navs-vertical")).toBeVisible();
  await expect(page.getByTestId("variation-nav-navs-fill")).toBeVisible();
});

test("surfaces additional Radix primitives from the package in catalog and detail routes", async ({
  page
}) => {
  await page.goto("/components");

  await expect(page.locator('a[href="/components/badge"]').first()).toBeVisible();
  await expect(page.locator('a[href="/components/avatar"]').first()).toBeVisible();
  await expect(page.locator('a[href="/components/checkbox"]').first()).toBeVisible();
  await expect(page.locator('a[href="/components/radio-group"]').first()).toBeVisible();
  await expect(page.locator('a[href="/components/switch"]').first()).toBeVisible();
  await expect(page.locator('a[href="/components/accordion"]').first()).toBeVisible();

  await page.locator('a[href="/components/checkbox"]').first().click();

  await expect(page).toHaveURL(/\/components\/checkbox$/);
  await expect(page.getByRole("heading", { name: "Checkbox", exact: true })).toBeVisible();
  await expect(page.getByTestId("variation-section-checkbox-default")).toBeVisible();
  await expect(page.getByTestId("component-api-table")).toContainText("checked");
});

test("loads the visual harness route for manual Playwright review", async ({ page }) => {
  await page.goto("/harness/code-editor");

  const panel = page.getByTestId("harness-code-code-panel");
  const codeEditor = panel.locator(".docs-code-editor");
  const content = panel.locator(".cm-content");

  await expect(panel).toBeVisible();
  await expect(codeEditor).toBeVisible();
  await expect(panel).toContainText("ButtonSizesDemo");
  await expect(content).not.toHaveClass(/cm-lineWrapping/);
});

test("every catalog component route resolves to a detail page", async ({ page }) => {
  test.setTimeout(180_000);

  for (const slug of routedComponentSlugs) {
    const routePage = await page.context().newPage();

    await routePage.goto(`http://127.0.0.1:4173/components/${slug}`, {
      waitUntil: "domcontentloaded"
    });

    const detailScroll = routePage.getByTestId("component-detail-scroll");

    await expect(routePage).toHaveURL(new RegExp(`/components/${slug}(?:#.*)?$`));
    await expect(detailScroll, `detail scroll missing for slug: ${slug}`).toBeVisible();
    await expect(
      routePage.getByTestId("component-theme-toolbar"),
      `toolbar missing for slug: ${slug}`
    ).toBeVisible();
    await expect(
      detailScroll.locator("h1").first(),
      `heading missing for slug: ${slug}`
    ).toBeVisible();
    await expect(
      routePage.getByText("Detail coming next"),
      `fallback doc rendered for slug: ${slug}`
    ).toHaveCount(0);

    await routePage.close();
  }
});
