import {
  type CSSProperties,
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode
} from "react";

import {
  resolveThemeName,
  type ThemeFamilyName,
  type ThemeMode,
  type ThemeName
} from "@blackstarzck/tokens";

import { getDocsThemeTokens } from "./docs-brand-theme";

type DocsThemeContextValue = {
  activeTheme: ThemeName;
  selectedThemeFamily: ThemeFamilyName;
  selectedThemeMode: ThemeMode;
  themeStyle: CSSProperties;
  setThemeFamily: (theme: ThemeFamilyName) => void;
  setThemeMode: (mode: ThemeMode) => void;
};

const DocsThemeContext = createContext<DocsThemeContextValue | null>(null);
const baseFontFamily =
  '"Geist", "Pretendard Variable", "Pretendard", "Inter", "Noto Sans KR", system-ui, sans-serif';

export function DocsThemeProvider({ children }: { children: ReactNode }) {
  const [selectedThemeFamily, setSelectedThemeFamily] = useState<ThemeFamilyName>("default");
  const [selectedThemeMode, setSelectedThemeMode] = useState<ThemeMode>("light");

  const value = useMemo<DocsThemeContextValue>(
    () => {
      const activeTheme = resolveThemeName(selectedThemeFamily, selectedThemeMode);

      return {
        activeTheme,
        selectedThemeFamily,
        selectedThemeMode,
        setThemeFamily: setSelectedThemeFamily,
        setThemeMode: setSelectedThemeMode,
        themeStyle: buildThemeStyle(activeTheme)
      };
    },
    [selectedThemeFamily, selectedThemeMode]
  );

  return <DocsThemeContext.Provider value={value}>{children}</DocsThemeContext.Provider>;
}

export function useDocsTheme() {
  const context = useContext(DocsThemeContext);

  if (!context) {
    throw new Error("useDocsTheme must be used within DocsThemeProvider.");
  }

  return context;
}

function buildThemeStyle(theme: ThemeName): CSSProperties {
  const tokens = getDocsThemeTokens(theme);
  const primary = tokens.colors.primary;
  const accent = tokens.colors.accent;
  const secondary = tokens.colors.secondary;
  const radii = tokens.radius;

  return {
    "--cc-accent": accent,
    "--cc-accent-foreground": tokens.colors.accentForeground,
    "--cc-brand": tokens.colors.brand,
    "--cc-font-sans": baseFontFamily,
    "--cc-primary": primary,
    "--cc-primary-foreground": tokens.colors.primaryForeground,
    "--cc-primary-soft": tokens.colors.primarySoft,
    "--cc-primary-soft-foreground": tokens.colors.primarySoftForeground,
    "--cc-radius-full": radii.full,
    "--cc-radius-lg": radii.lg,
    "--cc-radius-md": radii.md,
    "--cc-radius-sm": radii.sm,
    "--cc-radius-xl": radii.xl,
    "--cc-radius-xs": radii.xs,
    "--cc-ring": tokens.colors.ring,
    "--cc-secondary": secondary,
    "--cc-secondary-foreground": tokens.colors.secondaryForeground
  } as CSSProperties;
}
