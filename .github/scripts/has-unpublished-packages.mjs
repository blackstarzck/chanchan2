import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

async function getWorkspacePackageJsonPaths(rootDir) {
  const rootPackage = JSON.parse(
    await fs.readFile(path.join(rootDir, "package.json"), "utf8"),
  );
  const workspaces = Array.isArray(rootPackage.workspaces)
    ? rootPackage.workspaces
    : rootPackage.workspaces?.packages ?? [];

  const packageJsonPaths = [];

  for (const workspacePattern of workspaces) {
    if (!workspacePattern.startsWith("packages/") || !workspacePattern.endsWith("/*")) {
      continue;
    }

    const workspaceDir = path.join(
      rootDir,
      workspacePattern.slice(0, -2),
    );
    const entries = await fs.readdir(workspaceDir, { withFileTypes: true });

    for (const entry of entries) {
      if (!entry.isDirectory()) {
        continue;
      }

      const packageJsonPath = path.join(workspaceDir, entry.name, "package.json");
      try {
        await fs.access(packageJsonPath);
        packageJsonPaths.push(packageJsonPath);
      } catch {
        // Ignore directories without a package manifest.
      }
    }
  }

  return packageJsonPaths;
}

async function getPublishedVersions(packageName) {
  const registryPath = packageName.startsWith("@")
    ? packageName.replace("/", "%2f")
    : packageName;
  const response = await fetch(`https://registry.npmjs.org/${registryPath}`);

  if (response.status === 404) {
    return new Set();
  }

  if (!response.ok) {
    throw new Error(
      `Failed to query npm registry for ${packageName}: ${response.status} ${response.statusText}`,
    );
  }

  const metadata = await response.json();
  return new Set(Object.keys(metadata.versions ?? {}));
}

async function main() {
  const rootDir = process.cwd();
  const packageJsonPaths = await getWorkspacePackageJsonPaths(rootDir);
  const publishablePackages = [];

  for (const packageJsonPath of packageJsonPaths) {
    const packageJson = JSON.parse(await fs.readFile(packageJsonPath, "utf8"));

    if (packageJson.private) {
      continue;
    }

    publishablePackages.push({
      name: packageJson.name,
      version: packageJson.version,
    });
  }

  const unpublishedPackages = [];

  for (const pkg of publishablePackages) {
    const publishedVersions = await getPublishedVersions(pkg.name);
    if (!publishedVersions.has(pkg.version)) {
      unpublishedPackages.push(pkg);
    }
  }

  const shouldPublish = unpublishedPackages.length > 0;
  const outputPath = process.env.GITHUB_OUTPUT;

  if (outputPath) {
    await fs.appendFile(outputPath, `should_publish=${shouldPublish}\n`);
  }

  if (shouldPublish) {
    console.log(
      `Unpublished packages found: ${unpublishedPackages
        .map((pkg) => `${pkg.name}@${pkg.version}`)
        .join(", ")}`,
    );
    return;
  }

  console.log("All publishable package versions already exist on npm. Skipping publish.");
}

await main();
