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
    VariantProps<typeof spinnerVariants> {}

function Spinner({ className, size, tone, ...props }: SpinnerProps) {
  return <span aria-hidden className={cn(spinnerVariants({ size, tone }), className)} {...props} />;
}

export { Spinner };
