import * as React from "react";

import { cn } from "../lib/cn";
import {
  parseThemeName,
  resolveThemeName,
  type ThemeFamilyName,
  type ThemeMode,
  type ThemeName
} from "../lib/themes";

export interface ThemeRootProps extends React.HTMLAttributes<HTMLDivElement> {
  themeFamily?: ThemeFamilyName;
  themeMode?: ThemeMode;
  theme?: ThemeName;
}

export const ThemeRoot = React.forwardRef<HTMLDivElement, ThemeRootProps>(
  ({ className, theme, themeFamily = "default", themeMode = "light", ...props }, ref) => {
    const resolvedTheme = theme ? parseThemeName(theme) : null;
    const resolvedThemeFamily = resolvedTheme?.familyName ?? themeFamily;
    const resolvedThemeMode = resolvedTheme?.mode ?? themeMode;

    return (
      <div
        ref={ref}
        data-mode={resolvedThemeMode}
        data-theme={resolvedThemeFamily}
        data-theme-name={resolveThemeName(resolvedThemeFamily, resolvedThemeMode)}
        className={cn(
          "bg-background text-foreground",
          resolvedThemeMode === "dark" && "dark",
          className
        )}
        {...props}
      />
    );
  }
);

ThemeRoot.displayName = "ThemeRoot";
