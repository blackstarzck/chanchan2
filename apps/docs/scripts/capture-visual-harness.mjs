import { mkdir, rm } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawn, spawnSync } from "node:child_process";
import { chromium } from "@playwright/test";

const __dirname = dirname(fileURLToPath(import.meta.url));
const docsRoot = dirname(__dirname);
const outputDir = join(docsRoot, ".visual-harness");
const baseUrl = "http://127.0.0.1:4173";

const targets = [
  {
    name: "code-editor-harness",
    path: "/harness/code-editor",
    selector: '[data-testid="harness-code-code-panel"]'
  },
  {
    name: "button-detail-main",
    path: "/components/button",
    selector: '[data-testid="component-detail-scroll"]'
  },
  {
    name: "button-icons-detail-main",
    path: "/components/button-icons",
    selector: '[data-testid="component-detail-scroll"]'
  },
  {
    name: "button-group-detail-main",
    path: "/components/button-group",
    selector: '[data-testid="component-detail-scroll"]'
  },
  {
    name: "brands-avatars-detail-main",
    path: "/components/brands-avatars",
    selector: '[data-testid="component-detail-scroll"]'
  },
  {
    name: "blockquote-detail-main",
    path: "/components/blockquote",
    selector: '[data-testid="component-detail-scroll"]'
  },
  {
    name: "input-group-detail-main",
    path: "/components/input-group",
    selector: '[data-testid="component-detail-scroll"]'
  }
];

const server =
  process.platform === "win32"
    ? spawn("cmd.exe", ["/d", "/s", "/c", "npm run dev -- --host 127.0.0.1 --port 4173"], {
        cwd: docsRoot,
        stdio: "pipe"
      })
    : spawn("npm", ["run", "dev", "--", "--host", "127.0.0.1", "--port", "4173"], {
        cwd: docsRoot,
        stdio: "pipe"
      });

let serverClosed = false;

server.on("exit", () => {
  serverClosed = true;
});

try {
  await waitForServer();
  await rm(outputDir, { force: true, recursive: true });
  await mkdir(outputDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });

  for (const target of targets) {
    await page.goto(`${baseUrl}${target.path}`, { waitUntil: "networkidle" });
    const locator = page.locator(target.selector);
    await locator.waitFor({ state: "visible" });
    await locator.screenshot({ path: join(outputDir, `${target.name}.png`) });
  }

  await browser.close();
  console.log(`Saved harness screenshots to ${outputDir}`);
} finally {
  if (!serverClosed) {
    if (process.platform === "win32") {
      spawnSync("taskkill", ["/pid", String(server.pid), "/t", "/f"], { stdio: "ignore" });
    } else {
      server.kill("SIGTERM");
    }
  }
}

async function waitForServer() {
  const startedAt = Date.now();

  while (Date.now() - startedAt < 120_000) {
    try {
      const response = await fetch(baseUrl);
      if (response.ok) return;
    } catch {
      // ignore until server is ready
    }

    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  throw new Error("Timed out waiting for docs dev server.");
}
