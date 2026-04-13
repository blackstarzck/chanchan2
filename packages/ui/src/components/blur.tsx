import * as React from "react";

import { cn } from "../lib/cn";

export interface BlurPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  intensity?: "sm" | "md" | "lg";
}

const blurIntensityClassName = {
  sm: "backdrop-blur-sm",
  md: "backdrop-blur-md",
  lg: "backdrop-blur-xl"
} satisfies Record<NonNullable<BlurPreviewProps["intensity"]>, string>;

function BlurPreview({ children, className, intensity = "md", ...props }: BlurPreviewProps) {
  return (
    <div className={cn("relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-primary/30 via-success/20 to-warning/30 p-8", className)} {...props}>
      <div className={cn("rounded-xl border border-white/40 bg-background/70 p-5 shadow-lg", blurIntensityClassName[intensity])}>
        {children}
      </div>
    </div>
  );
}

const Blur = BlurPreview;

export { Blur, BlurPreview };

