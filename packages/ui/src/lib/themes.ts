export const uiThemeNames = [
  "default",
  "default-dark",
  "harvest",
  "harvest-dark",
  "retro",
  "retro-dark"
] as const;

export type ThemeName = (typeof uiThemeNames)[number];

