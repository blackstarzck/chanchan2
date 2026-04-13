import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/cn";

const styledIconVariants = cva("inline-flex items-center justify-center border", {
  variants: {
    shape: {
      circular: "rounded-full",
      rounded: "rounded-xl",
      square: "rounded-md"
    },
    size: {
      xs: "size-7 [&_svg]:size-3.5",
      small: "size-9 [&_svg]:size-4",
      default: "size-11 [&_svg]:size-5",
      large: "size-14 [&_svg]:size-6"
    },
    tone: {
      blue: "",
      dark: "",
      gray: "",
      green: "",
      red: "",
      yellow: ""
    },
    variant: {
      base: "",
      outline: "",
      soft: ""
    }
  },
  compoundVariants: [
    { variant: "base", tone: "blue", className: "border-primary bg-primary text-primary-foreground" },
    { variant: "base", tone: "dark", className: "border-foreground bg-foreground text-background" },
    { variant: "base", tone: "gray", className: "border-muted-foreground bg-muted-foreground text-background" },
    { variant: "base", tone: "green", className: "border-success bg-success text-success-foreground" },
    { variant: "base", tone: "red", className: "border-destructive bg-destructive text-destructive-foreground" },
    { variant: "base", tone: "yellow", className: "border-warning bg-warning text-warning-foreground" },
    { variant: "soft", tone: "blue", className: "border-primary/10 bg-primary/10 text-primary" },
    { variant: "soft", tone: "dark", className: "border-foreground/10 bg-foreground/10 text-foreground" },
    { variant: "soft", tone: "gray", className: "border-muted bg-muted text-muted-foreground" },
    { variant: "soft", tone: "green", className: "border-success/10 bg-success/10 text-success" },
    { variant: "soft", tone: "red", className: "border-destructive/10 bg-destructive/10 text-destructive" },
    { variant: "soft", tone: "yellow", className: "border-warning/10 bg-warning/10 text-warning" },
    { variant: "outline", tone: "blue", className: "border-primary/40 bg-background text-primary" },
    { variant: "outline", tone: "dark", className: "border-foreground/40 bg-background text-foreground" },
    { variant: "outline", tone: "gray", className: "border-border bg-background text-muted-foreground" },
    { variant: "outline", tone: "green", className: "border-success/40 bg-background text-success" },
    { variant: "outline", tone: "red", className: "border-destructive/40 bg-background text-destructive" },
    { variant: "outline", tone: "yellow", className: "border-warning/40 bg-background text-warning" }
  ],
  defaultVariants: {
    shape: "rounded",
    size: "default",
    tone: "blue",
    variant: "soft"
  }
});

export interface StyledIconProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof styledIconVariants> {}

function StyledIcon({ children, className, shape, size, tone, variant, ...props }: StyledIconProps) {
  return (
    <span className={cn(styledIconVariants({ shape, size, tone, variant }), className)} {...props}>
      {children ?? <span className="size-2 rounded-full bg-current" />}
    </span>
  );
}

const StyledIcons = StyledIcon;

export { StyledIcon, StyledIcons, styledIconVariants };

