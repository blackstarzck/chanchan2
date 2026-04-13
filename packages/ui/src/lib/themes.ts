export const uiThemeFamilies = ["default", "harvest", "retro"] as const;

export type ThemeFamilyName = (typeof uiThemeFamilies)[number];

export const uiThemeModes = ["light", "dark"] as const;

export type ThemeMode = (typeof uiThemeModes)[number];

export const uiThemeNames = [
  "default",
  "default-dark",
  "harvest",
  "harvest-dark",
  "retro",
  "retro-dark"
] as const;

export type ThemeName = (typeof uiThemeNames)[number];

export const uiThemeFamilyCatalog = {
  default: {
    label: "Default",
    themes: {
      light: "default",
      dark: "default-dark"
    }
  },
  harvest: {
    label: "Harvest",
    themes: {
      light: "harvest",
      dark: "harvest-dark"
    }
  },
  retro: {
    label: "Retro",
    themes: {
      light: "retro",
      dark: "retro-dark"
    }
  }
} as const satisfies Record<
  ThemeFamilyName,
  {
    label: string;
    themes: Record<ThemeMode, ThemeName>;
  }
>;

export function resolveThemeName(themeFamily: ThemeFamilyName, mode: ThemeMode = "light") {
  return uiThemeFamilyCatalog[themeFamily].themes[mode];
}

export function parseThemeName(theme: ThemeName) {
  if (theme.endsWith("-dark")) {
    const familyName = theme.replace("-dark", "") as ThemeFamilyName;

    return {
      family: uiThemeFamilyCatalog[familyName].label,
      familyName,
      label: uiThemeFamilyCatalog[familyName].label,
      mode: "dark" as const
    };
  }

  const familyName = theme as ThemeFamilyName;

  return {
    family: uiThemeFamilyCatalog[familyName].label,
    familyName,
    label: uiThemeFamilyCatalog[familyName].label,
    mode: "light" as const
  };
}

