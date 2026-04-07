import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/cn";

const legendToneVariants = cva("", {
  variants: {
    tone: {
      default: "bg-primary text-primary",
      success: "bg-success text-success",
      destructive: "bg-destructive text-destructive",
      accent: "bg-accent-foreground text-accent-foreground",
      muted: "bg-muted-foreground text-muted-foreground"
    }
  },
  defaultVariants: {
    tone: "default"
  }
});

export interface LegendDotProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof legendToneVariants> {}

function LegendDot({ className, tone, ...props }: LegendDotProps) {
  return <span className={cn("inline-flex size-2.5 rounded-full", legendToneVariants({ tone }), className)} {...props} />;
}

export interface LegendPillProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof legendToneVariants> {
  indicatorClassName?: string;
}

function LegendPill({ className, indicatorClassName, tone, children, ...props }: LegendPillProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-sm text-card-foreground",
        className
      )}
      {...props}
    >
      <span className={cn("inline-flex size-2.5 rounded-full", legendToneVariants({ tone }), indicatorClassName)} />
      <span>{children}</span>
    </div>
  );
}

export { LegendDot, LegendPill };
