type ReleaseManifest = {
  designVersion: string;
  packageVersions?: {
    tokens?: string;
    ui?: string;
  };
  changedComponents?: string[];
  changedSamples?: string[];
};

type ReleaseComponentEntry = {
  componentSlug: string;
  docsRoute?: string;
};

type ReleaseSampleEntry = {
  componentSlug: string;
  docsVariationId?: string;
};

export type ReleaseSnapshot = {
  components: ReleaseComponentEntry[];
  manifest: ReleaseManifest;
  samples: ReleaseSampleEntry[];
  version: string;
};

const manifestModules = import.meta.glob("../../../../../design/releases/*/manifest.json", {
  eager: true,
  import: "default"
}) as Record<string, ReleaseManifest>;

const componentModules = import.meta.glob("../../../../../design/releases/*/components.json", {
  eager: true,
  import: "default"
}) as Record<string, { components?: ReleaseComponentEntry[] }>;

const sampleModules = import.meta.glob("../../../../../design/releases/*/samples.json", {
  eager: true,
  import: "default"
}) as Record<string, { samples?: ReleaseSampleEntry[] }>;

function extractVersionFromPath(path: string, fileName: string) {
  const matcher = new RegExp(`design/releases/([^/]+)/${fileName.replace(".", "\\.")}$`);
  const match = path.match(matcher);
  return match?.[1] ?? null;
}

function parseVersion(version: string) {
  return version.split(".").map((part) => Number.parseInt(part, 10) || 0);
}

export function compareReleaseVersions(left: string, right: string) {
  const leftParts = parseVersion(left);
  const rightParts = parseVersion(right);
  const maxLength = Math.max(leftParts.length, rightParts.length);

  for (let index = 0; index < maxLength; index += 1) {
    const leftValue = leftParts[index] ?? 0;
    const rightValue = rightParts[index] ?? 0;

    if (leftValue !== rightValue) {
      return leftValue - rightValue;
    }
  }

  return 0;
}

const releaseVersions = Array.from(
  new Set(
    Object.keys(manifestModules)
      .map((path) => extractVersionFromPath(path, "manifest.json"))
      .filter((value): value is string => Boolean(value))
  )
).sort((left, right) => compareReleaseVersions(right, left));

export const releaseSnapshots: ReleaseSnapshot[] = releaseVersions
  .map((version) => {
    const manifestEntry = Object.entries(manifestModules).find(([path]) =>
      path.includes(`/design/releases/${version}/manifest.json`)
    )?.[1];

    if (!manifestEntry) return null;

    const componentEntry =
      Object.entries(componentModules).find(([path]) =>
        path.includes(`/design/releases/${version}/components.json`)
      )?.[1] ?? {};
    const sampleEntry =
      Object.entries(sampleModules).find(([path]) =>
        path.includes(`/design/releases/${version}/samples.json`)
      )?.[1] ?? {};

    return {
      components: componentEntry.components ?? [],
      manifest: manifestEntry,
      samples: sampleEntry.samples ?? [],
      version
    };
  })
  .filter((snapshot): snapshot is ReleaseSnapshot => Boolean(snapshot));

export const latestReleaseSnapshot = releaseSnapshots[0] ?? null;

export function getReleaseSnapshot(version: string | null | undefined) {
  if (!version) return latestReleaseSnapshot;
  return releaseSnapshots.find((snapshot) => snapshot.version === version) ?? latestReleaseSnapshot;
}

export function getReleaseSnapshotsAscending() {
  return [...releaseSnapshots].sort((left, right) => compareReleaseVersions(left.version, right.version));
}
