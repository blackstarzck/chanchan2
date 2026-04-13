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

export interface LegendIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  dottedClassName?: string;
  label?: React.ReactNode;
  stripedClassName?: string;
  tone?: VariantProps<typeof legendToneVariants>["tone"];
}

function LegendIndicator({
  className,
  dottedClassName,
  label,
  stripedClassName,
  tone,
  ...props
}: LegendIndicatorProps) {
  return (
    <div className={cn("inline-flex h-6 items-center gap-2.5 text-base font-medium tracking-[0.08px] text-foreground", className)} {...props}>
      <span className={cn("inline-flex size-2 rounded-full", legendToneVariants({ tone }), dottedClassName)} />
      <span className={cn("inline-flex h-1.5 w-3 rounded-[2px]", legendToneVariants({ tone }))} />
      <span
        className={cn("inline-flex h-1.5 w-3 rounded-[2px] bg-[length:6px_6px] bg-repeat-x", stripedClassName)}
        style={{
          backgroundImage:
            "linear-gradient(115deg, currentColor 0 16%, transparent 17% 30%, currentColor 31% 45%, transparent 46% 60%, currentColor 61% 74%, transparent 75% 87%, currentColor 88%)"
        }}
      />
      {label ? <span>{label}</span> : null}
    </div>
  );
}

export { LegendDot, LegendIndicator, LegendPill };
