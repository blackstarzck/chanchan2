import * as React from "react";

import { cn } from "../lib/cn";

export interface ShadowPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  depth?: "sm" | "md" | "lg" | "xl";
}

const shadowDepthClassName = {
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
  xl: "shadow-2xl"
} satisfies Record<NonNullable<ShadowPreviewProps["depth"]>, string>;

function ShadowPreview({ className, depth = "lg", ...props }: ShadowPreviewProps) {
  return (
    <div
      className={cn("rounded-2xl border border-border bg-card p-6 text-sm text-card-foreground", shadowDepthClassName[depth], className)}
      {...props}
    />
  );
}

function ShadowSwatch({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("size-24 rounded-2xl border border-border bg-card shadow-xl", className)} {...props} />;
}

const Shadows = ShadowPreview;

export { ShadowPreview, ShadowSwatch, Shadows };

