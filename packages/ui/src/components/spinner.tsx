import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/cn";

const spinnerVariants = cva("inline-block animate-spin rounded-full border-2 border-current border-r-transparent", {
  variants: {
    size: {
      sm: "size-4",
      default: "size-6",
      lg: "size-8"
    },
    tone: {
      default: "text-primary",
      muted: "text-muted-foreground",
      success: "text-success",
      destructive: "text-destructive"
    }
  },
  defaultVariants: {
    size: "default",
    tone: "default"
  }
});

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof spinnerVariants> {
  label?: React.ReactNode;
  wrapperClassName?: string;
}

function Spinner({ className, label, size, tone, wrapperClassName, ...props }: SpinnerProps) {
  const spinner = <span aria-hidden className={cn(spinnerVariants({ size, tone }), className)} {...props} />;

  if (!label) {
    return spinner;
  }

  return (
    <span className={cn("inline-flex flex-col items-center justify-center gap-2", wrapperClassName)}>
      {spinner}
      <span className="text-base font-medium tracking-[0.08px] text-foreground">{label}</span>
    </span>
  );
}

export { Spinner };
