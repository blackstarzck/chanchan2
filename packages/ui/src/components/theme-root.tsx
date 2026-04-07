import * as React from "react";

import { cn } from "../lib/cn";
import type { ThemeName } from "../lib/themes";

export interface ThemeRootProps extends React.HTMLAttributes<HTMLDivElement> {
  theme?: ThemeName;
}

export const ThemeRoot = React.forwardRef<HTMLDivElement, ThemeRootProps>(
  ({ className, theme = "default", ...props }, ref) => (
    <div
      ref={ref}
      data-theme={theme}
      className={cn("bg-background text-foreground", className)}
      {...props}
    />
  )
);

ThemeRoot.displayName = "ThemeRoot";
