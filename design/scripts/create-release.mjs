import { copyFile, mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const designRoot = path.resolve(__dirname, "..");
const workspaceRoot = path.resolve(designRoot, "..");
const handoffRoot = path.join(designRoot, "handoff", "current");
const releasesRoot = path.join(designRoot, "releases");

const sourceFiles = ["tokens.json", "themes.json", "components.json", "samples.json"];
const args = process.argv.slice(2);
const version = args.find((arg) => !arg.startsWith("--"));
const forceBaseline = args.includes("--baseline");

if (!version) {
  console.error("Usage: npm run design:release -- <design-version> [--baseline]");
  process.exit(1);
}

const targetRoot = path.join(releasesRoot, version);
const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: "base" });

async function pathExists(targetPath) {
  try {
    await readdir(targetPath);
    return true;
  } catch {
    return false;
  }
}

if (await pathExists(targetRoot)) {
  console.error(`Design release directory already exists: ${path.relative(workspaceRoot, targetRoot)}`);
  process.exit(1);
}

await mkdir(targetRoot, { recursive: true });

for (const fileName of sourceFiles) {
  await copyFile(path.join(handoffRoot, fileName), path.join(targetRoot, fileName));
}

const existingVersions = (await readdir(releasesRoot, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory() && entry.name !== version)
  .map((entry) => entry.name)
  .sort(collator.compare);

const baseVersion = existingVersions.at(-1) ?? null;
const isBaseline = forceBaseline || baseVersion === null;

const handoffTokens = JSON.parse(await readFile(path.join(handoffRoot, "tokens.json"), "utf8"));
const handoffThemes = JSON.parse(await readFile(path.join(handoffRoot, "themes.json"), "utf8"));
const handoffFigma = handoffTokens.figma ?? handoffThemes.figma ?? null;

const figmaSnapshot = JSON.parse(
  await readFile(path.join(workspaceRoot, "packages", "tokens", "figma-token-snapshot.json"), "utf8")
);
const tokensPkg = JSON.parse(
  await readFile(path.join(workspaceRoot, "packages", "tokens", "package.json"), "utf8")
);
const uiPkg = JSON.parse(await readFile(path.join(workspaceRoot, "packages", "ui", "package.json"), "utf8"));

const manifest = {
  designVersion: version,
  figmaFileKey: handoffFigma?.fileKey ?? figmaSnapshot?.source?.fileKey ?? null,
  figmaLibraryVersion: figmaSnapshot?.source?.collection ?? null,
  releasePageId: handoffFigma?.releasePageId ?? null,
  releasePageName: handoffFigma?.releasePageName ?? null,
  exportedAt: handoffFigma?.exportedAt ?? null,
  sourcePlugin: handoffFigma?.sourcePlugin ?? null,
  baseVersion,
  changedTokens: isBaseline ? ["*"] : [],
  changedThemes: isBaseline ? ["*"] : [],
  changedComponents: isBaseline ? ["*"] : [],
  changedSamples: isBaseline ? ["*"] : [],
  approvedBy: [],
  packageVersions: {
    tokens: tokensPkg.version,
    ui: uiPkg.version
  },
  createdAt: new Date().toISOString(),
  notes: ""
};

await writeFile(path.join(targetRoot, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`, "utf8");

console.log(`Created design release snapshot at ${path.relative(workspaceRoot, targetRoot)}`);
