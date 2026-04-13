import {
  getThemeTokens,
  type ColorTokenName,
  type RadiusTokenName,
  type ThemeName
} from "@blackstarzck/tokens";

export type DocsThemeTokens = {
  colors: Record<ColorTokenName, string>;
  radius: Record<RadiusTokenName, string>;
};

export const docsBrandPalette = {
  light: {
    primary: "#fe6a80",
    primaryActive: "#d61f69",
    primaryHover: "#f84f9c",
    primarySoft: "#fff1f4",
    primarySoftForeground: "#be185d",
    secondary: "#fff6f8",
    secondaryForeground: "#9f1239",
    accent: "#ffe3ea",
    accentForeground: "#be185d",
    ring: "#fe6a80",
    brand: "#fe6a80"
  },
  dark: {
    primary: "#ff8fa1",
    primaryActive: "#fe6a80",
    primaryHover: "#ffb3c1",
    primarySoft: "#fe6a8029",
    primarySoftForeground: "#ffb3c1",
    secondary: "#35111f",
    secondaryForeground: "#ffd6de",
    accent: "#f84f9c33",
    accentForeground: "#ffb3c1",
    ring: "#ff8fa1",
    brand: "#ff8fa1"
  }
} as const;

export function getDocsThemeTokens(theme: ThemeName): DocsThemeTokens {
  const tokens = getThemeTokens(theme);
  const palette = getDocsBrandPalette(theme);

  return {
    ...tokens,
    colors: {
      ...tokens.colors,
      accent: palette.accent,
      accentForeground: palette.accentForeground,
      brand: palette.brand,
      primary: palette.primary,
      primaryForeground: getReadableTextColor(palette.primary),
      primarySoft: palette.primarySoft,
      primarySoftForeground: palette.primarySoftForeground,
      ring: palette.ring,
      secondary: palette.secondary,
      secondaryForeground: palette.secondaryForeground
    }
  };
}

export function getDocsBrandPalette(theme: ThemeName) {
  return theme.endsWith("-dark") ? docsBrandPalette.dark : docsBrandPalette.light;
}

function getReadableTextColor(hex: string) {
  const darkText = "#111827";
  const lightText = "#ffffff";

  return getContrastRatio(hex, darkText) >= getContrastRatio(hex, lightText)
    ? darkText
    : lightText;
}

function getContrastRatio(background: string, foreground: string) {
  const backgroundLuminance = getRelativeLuminance(background);
  const foregroundLuminance = getRelativeLuminance(foreground);
  const lighter = Math.max(backgroundLuminance, foregroundLuminance);
  const darker = Math.min(backgroundLuminance, foregroundLuminance);

  return (lighter + 0.05) / (darker + 0.05);
}

function getRelativeLuminance(hex: string) {
  const { r, g, b } = parseHexColor(hex);
  const [linearR, linearG, linearB] = [r, g, b].map((channel) => {
    const value = channel / 255;

    return value <= 0.03928
      ? value / 12.92
      : Math.pow((value + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * linearR + 0.7152 * linearG + 0.0722 * linearB;
}

function parseHexColor(hex: string) {
  const normalized = hex.replace("#", "");
  const fullHex =
    normalized.length === 3
      ? normalized
          .split("")
          .map((char) => `${char}${char}`)
          .join("")
      : normalized;

  return {
    b: Number.parseInt(fullHex.slice(4, 6), 16),
    g: Number.parseInt(fullHex.slice(2, 4), 16),
    r: Number.parseInt(fullHex.slice(0, 2), 16)
  };
}
