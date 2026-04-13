import { theme as antTheme, type ThemeConfig } from "antd";

import { getDocsBrandPalette, getDocsThemeTokens } from "./docs-brand-theme";

export function buildDocsAntdTheme(
  activeTheme: Parameters<typeof getDocsThemeTokens>[0]
): ThemeConfig {
  const { colors, radius } = getDocsThemeTokens(activeTheme);
  const brandPalette = getDocsBrandPalette(activeTheme);
  const isDark = activeTheme.endsWith("-dark");

  return {
    algorithm: isDark ? antTheme.darkAlgorithm : antTheme.defaultAlgorithm,
    components: {
      Button: {
        primaryColor: colors.primaryForeground
      }
    },
    token: {
      borderRadius: parsePixelValue(radius.xl, 12),
      borderRadiusLG: parsePixelValue(radius.xl, 12),
      borderRadiusSM: parsePixelValue(radius.sm, 4),
      borderRadiusXS: parsePixelValue(radius.xs, 2),
      colorBgBase: colors.background,
      colorBgContainer: colors.card,
      colorBgElevated: colors.popover,
      colorBorder: colors.border,
      colorBorderSecondary: colors.input,
      colorError: colors.destructive,
      colorFillSecondary: colors.secondary,
      colorFillTertiary: colors.muted,
      colorHighlight: colors.primary,
      colorInfo: colors.brand,
      colorLink: colors.primarySoftForeground,
      colorLinkActive: brandPalette.primaryActive,
      colorLinkHover: brandPalette.primaryHover,
      colorPrimary: colors.primary,
      colorPrimaryActive: brandPalette.primaryActive,
      colorPrimaryBg: colors.primarySoft,
      colorPrimaryBorder: colors.primary,
      colorPrimaryHover: brandPalette.primaryHover,
      colorPrimaryText: colors.primarySoftForeground,
      colorPrimaryTextActive: brandPalette.primaryActive,
      colorPrimaryTextHover: brandPalette.primaryHover,
      colorSuccess: colors.success,
      colorText: colors.foreground,
      colorTextBase: colors.foreground,
      colorTextLightSolid: colors.primaryForeground,
      colorTextSecondary: colors.mutedForeground,
      colorWarning: colors.accentForeground,
      controlOutline: toAlphaHex(colors.primary, 0.22),
      fontFamily:
        '"Geist", "Pretendard Variable", "Pretendard", "Inter", "Noto Sans KR", system-ui, sans-serif'
    }
  };
}

function parsePixelValue(value: string, fallback: number) {
  const parsedValue = Number.parseFloat(value);

  return Number.isFinite(parsedValue) ? parsedValue : fallback;
}

function toAlphaHex(hex: string, alpha: number) {
  const normalized = hex.replace("#", "");
  const fullHex =
    normalized.length === 3
      ? normalized
          .split("")
          .map((char) => `${char}${char}`)
          .join("")
      : normalized;
  const alphaChannel = Math.round(alpha * 255)
    .toString(16)
    .padStart(2, "0");

  return `#${fullHex}${alphaChannel}`;
}
