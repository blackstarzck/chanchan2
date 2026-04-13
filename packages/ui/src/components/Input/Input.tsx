import * as React from "react";

import { cn } from "../../lib/cn";
import type { InputProps, InputShape, InputSize, InputStatus, InputVariant } from "./Input.types";

const inputBaseClasses =
  "flex w-full bg-background text-foreground font-medium tracking-[0.07px] shadow-[0_1px_1px_0_rgba(0,0,0,0.05)] outline-none transition-[color,background-color,border-color,box-shadow] duration-200 placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50";

const inputSizeClasses: Record<InputSize, string> = {
  sm: "h-9 px-3 text-sm",
  default: "h-11 px-4 py-3 text-sm",
  lg: "h-14 px-5 text-base"
};

const inputShapeClasses: Record<InputShape, string> = {
  rounded: "rounded-lg",
  pill: "rounded-full",
  none: "rounded-none"
};

const inputVariantClasses: Record<InputVariant, string> = {
  bordered:
    "border border-input bg-background focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  gray:
    "border border-transparent bg-secondary focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  underline:
    "border-0 border-b border-input bg-transparent px-0 shadow-none focus-visible:border-primary focus-visible:ring-0"
};

function resolveInputStatusClasses(variant: InputVariant, status: InputStatus) {
  if (status === "invalid") {
    return variant === "underline"
      ? "border-b-destructive focus-visible:border-destructive"
      : "border-destructive focus-visible:ring-destructive/20";
  }

  if (status === "success") {
    return variant === "underline"
      ? "border-b-success focus-visible:border-success"
      : "border-success focus-visible:ring-success/20";
  }

  return "";
}

export function inputVariants({
  className,
  shape = "rounded",
  size = "default",
  status = "default",
  variant = "bordered"
}: {
  className?: string;
  shape?: InputShape | null;
  size?: InputSize | null;
  status?: InputStatus | null;
  variant?: InputVariant | null;
} = {}) {
  const resolvedShape = shape ?? "rounded";
  const resolvedSize = size ?? "default";
  const resolvedStatus = status ?? "default";
  const resolvedVariant = variant ?? "bordered";

  return cn(
    inputBaseClasses,
    inputSizeClasses[resolvedSize],
    inputShapeClasses[resolvedShape],
    inputVariantClasses[resolvedVariant],
    resolveInputStatusClasses(resolvedVariant, resolvedStatus),
    className
  );
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, shape = "rounded", size = "default", status = "default", variant = "bordered", ...props }, ref) => (
    <input
      ref={ref}
      aria-invalid={status === "invalid" ? true : props["aria-invalid"]}
      data-status={status}
      className={inputVariants({ className, shape, size, status, variant })}
      {...props}
    />
  )
);

Input.displayName = "Input";
