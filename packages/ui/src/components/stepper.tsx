import * as React from "react";
import { Check } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/cn";

function Stepper({ className, orientation = "horizontal", ...props }: StepperProps) {
  return (
    <div
      data-orientation={orientation}
      className={cn(
        "grid gap-4",
        orientation === "horizontal" ? "grid-cols-[repeat(auto-fit,minmax(9rem,1fr))]" : "grid-cols-1",
        className
      )}
      {...props}
    />
  );
}

export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
}

const stepperItemVariants = cva("relative flex gap-3", {
  variants: {
    alignment: {
      center: "items-center text-center",
      left: "items-start text-left"
    },
    state: {
      active: "",
      complete: "",
      default: ""
    }
  },
  defaultVariants: {
    alignment: "left",
    state: "default"
  }
});

export interface StepperItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stepperItemVariants> {}

function StepperItem({ alignment, className, state, ...props }: StepperItemProps) {
  return <div className={cn(stepperItemVariants({ alignment, state }), className)} data-state={state} {...props} />;
}

const stepperIndicatorVariants = cva(
  "inline-flex size-8 shrink-0 items-center justify-center rounded-full border text-sm font-semibold",
  {
    variants: {
      state: {
        active: "border-primary bg-primary text-primary-foreground",
        complete: "border-success bg-success text-success-foreground",
        default: "border-border bg-card text-muted-foreground"
      }
    },
    defaultVariants: {
      state: "default"
    }
  }
);

export interface StepperIndicatorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stepperIndicatorVariants> {
  step?: React.ReactNode;
}

function StepperIndicator({ children, className, state, step, ...props }: StepperIndicatorProps) {
  return (
    <div className={cn(stepperIndicatorVariants({ state }), className)} {...props}>
      {children ?? (state === "complete" ? <Check className="size-4" aria-hidden="true" /> : step)}
    </div>
  );
}

function StepperContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("min-w-0 space-y-1", className)} {...props} />;
}

function StepperTitle({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("font-medium text-foreground", className)} {...props} />;
}

function StepperDescription({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("text-sm text-muted-foreground", className)} {...props} />;
}

export { Stepper, StepperContent, StepperDescription, StepperIndicator, StepperItem, StepperTitle };

