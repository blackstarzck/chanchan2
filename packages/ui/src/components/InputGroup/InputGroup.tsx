import * as React from "react";

import { cn } from "../../lib/cn";
import {
  inputVariants,
  type InputShape,
  type InputSize,
  type InputStatus,
  type InputVariant
} from "../Input";
import type {
  InputGroupAddonProps,
  InputGroupFieldProps,
  InputGroupLabelProps,
  InputGroupLabelRowProps,
  InputGroupMessageProps,
  InputGroupProps,
  InputGroupRootProps,
  InputGroupSecondaryProps
} from "./InputGroup.types";

type InputGroupContextValue = {
  shape: InputShape;
  size: InputSize;
  status: InputStatus;
  variant: InputVariant;
};

const inputGroupContext = React.createContext<InputGroupContextValue>({
  shape: "rounded",
  size: "default",
  status: "default",
  variant: "bordered"
});

const inputGroupBaseClasses =
  "flex w-full items-stretch overflow-hidden shadow-[0_1px_1px_0_rgba(0,0,0,0.05)] transition-[background-color,border-color,box-shadow] duration-200 focus-within:ring-2 focus-within:ring-primary/30 focus-within:ring-offset-2 focus-within:ring-offset-background";

const inputGroupSizeClasses: Record<InputSize, string> = {
  sm: "min-h-9",
  default: "min-h-11",
  lg: "min-h-14"
};

const inputGroupShapeClasses: Record<InputShape, string> = {
  rounded: "rounded-lg",
  pill: "rounded-full",
  none: "rounded-none"
};

const inputGroupVariantClasses: Record<InputVariant, string> = {
  bordered: "border border-input bg-background",
  gray: "border border-transparent bg-secondary",
  underline: "rounded-none border-0 border-b border-input bg-transparent shadow-none focus-within:ring-0"
};

function resolveInputGroupStatusClasses(variant: InputVariant, status: InputStatus) {
  if (status === "invalid") {
    return variant === "underline" ? "border-b-destructive" : "border-destructive focus-within:ring-destructive/20";
  }

  if (status === "success") {
    return variant === "underline" ? "border-b-success" : "border-success focus-within:ring-success/20";
  }

  return "";
}

function inputGroupClasses({
  className,
  shape,
  size,
  status,
  variant
}: InputGroupContextValue & { className?: string }) {
  return cn(
    inputGroupBaseClasses,
    inputGroupSizeClasses[size],
    inputGroupShapeClasses[shape],
    inputGroupVariantClasses[variant],
    resolveInputGroupStatusClasses(variant, status),
    className
  );
}

function InputGroup({
  className,
  shape = "rounded",
  size = "default",
  status = "default",
  variant = "bordered",
  ...props
}: InputGroupProps) {
  const value = React.useMemo(
    () => ({
      shape,
      size,
      status,
      variant
    }),
    [shape, size, status, variant]
  );

  return (
    <inputGroupContext.Provider value={value}>
      <div
        data-status={status}
        className={inputGroupClasses({ className, shape, size, status, variant })}
        {...props}
      />
    </inputGroupContext.Provider>
  );
}

function InputGroupRoot({ className, ...props }: InputGroupRootProps) {
  return <div className={cn("flex w-full flex-col gap-2.5", className)} {...props} />;
}

function InputGroupLabelRow({ className, ...props }: InputGroupLabelRowProps) {
  return <div className={cn("flex w-full items-start gap-2.5 text-sm leading-5 tracking-[0.07px]", className)} {...props} />;
}

function InputGroupLabel({ className, ...props }: InputGroupLabelProps) {
  return <p className={cn("flex-1 font-semibold text-foreground", className)} {...props} />;
}

function InputGroupSecondary({ className, ...props }: InputGroupSecondaryProps) {
  return <p className={cn("shrink-0 font-medium text-muted-foreground", className)} {...props} />;
}

function InputGroupMessage({ className, ...props }: InputGroupMessageProps) {
  return <p className={cn("text-[13px] font-medium text-muted-foreground", className)} {...props} />;
}

function InputGroupAddon({ className, side = "start", ...props }: InputGroupAddonProps) {
  const { size, variant } = React.useContext(inputGroupContext);

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2.5 text-sm font-medium tracking-[0.07px] text-muted-foreground",
        size === "sm" && "px-3 py-2",
        size === "default" && "px-4 py-3",
        size === "lg" && "px-5 py-4 text-base",
        variant !== "underline" && (side === "start" ? "border-r border-input" : "border-l border-input"),
        className
      )}
      {...props}
    />
  );
}

const InputGroupField = React.forwardRef<HTMLInputElement, InputGroupFieldProps>(
  ({ className, shape, size, status, variant, ...props }, ref) => {
    const context = React.useContext(inputGroupContext);
    const resolvedShape = shape ?? "none";
    const resolvedSize = size ?? context.size;
    const resolvedStatus = status ?? context.status;
    const resolvedVariant = variant ?? context.variant;

    return (
      <input
        ref={ref}
        aria-invalid={resolvedStatus === "invalid" ? true : props["aria-invalid"]}
        data-status={resolvedStatus}
        className={inputVariants({
          className: cn(
            "min-w-0 flex-1 border-0 bg-transparent shadow-none focus-visible:ring-0 focus-visible:ring-offset-0",
            resolvedVariant !== "underline" && "focus-visible:border-transparent",
            className
          ),
          shape: resolvedShape,
          size: resolvedSize,
          status: resolvedStatus,
          variant: resolvedVariant
        })}
        {...props}
      />
    );
  }
);

InputGroupField.displayName = "InputGroupField";

export {
  InputGroup,
  InputGroupAddon,
  InputGroupField,
  InputGroupLabel,
  InputGroupLabelRow,
  InputGroupMessage,
  InputGroupRoot,
  InputGroupSecondary
};
