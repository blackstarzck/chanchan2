import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/cn";

const buttonIconVariants = cva(
  "inline-flex items-center justify-center rounded-md border text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      size: {
        small: "size-8",
        default: "size-9",
        large: "size-11"
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
        ghost: "",
        outline: "",
        soft: "",
        solid: ""
      }
    },
    compoundVariants: [
      { variant: "solid", tone: "blue", className: "border-primary bg-primary text-primary-foreground hover:bg-primary/90" },
      { variant: "solid", tone: "dark", className: "border-foreground bg-foreground text-background hover:bg-foreground/90" },
      { variant: "solid", tone: "gray", className: "border-muted-foreground bg-muted-foreground text-background hover:bg-muted-foreground/90" },
      { variant: "solid", tone: "green", className: "border-success bg-success text-success-foreground hover:bg-success/90" },
      { variant: "solid", tone: "red", className: "border-destructive bg-destructive text-destructive-foreground hover:bg-destructive/90" },
      { variant: "solid", tone: "yellow", className: "border-warning bg-warning text-warning-foreground hover:bg-warning/90" },
      { variant: "soft", tone: "blue", className: "border-primary/10 bg-primary/10 text-primary hover:bg-primary/15" },
      { variant: "soft", tone: "dark", className: "border-foreground/10 bg-foreground/10 text-foreground hover:bg-foreground/15" },
      { variant: "soft", tone: "gray", className: "border-muted bg-muted text-muted-foreground hover:bg-muted/80" },
      { variant: "soft", tone: "green", className: "border-success/10 bg-success/10 text-success hover:bg-success/15" },
      { variant: "soft", tone: "red", className: "border-destructive/10 bg-destructive/10 text-destructive hover:bg-destructive/15" },
      { variant: "soft", tone: "yellow", className: "border-warning/10 bg-warning/10 text-warning hover:bg-warning/15" },
      { variant: "outline", tone: "blue", className: "border-primary/40 bg-background text-primary hover:bg-primary/10" },
      { variant: "outline", tone: "dark", className: "border-foreground/40 bg-background text-foreground hover:bg-foreground/10" },
      { variant: "outline", tone: "gray", className: "border-border bg-background text-muted-foreground hover:bg-muted" },
      { variant: "outline", tone: "green", className: "border-success/40 bg-background text-success hover:bg-success/10" },
      { variant: "outline", tone: "red", className: "border-destructive/40 bg-background text-destructive hover:bg-destructive/10" },
      { variant: "outline", tone: "yellow", className: "border-warning/40 bg-background text-warning hover:bg-warning/10" },
      { variant: "ghost", tone: "blue", className: "border-transparent bg-transparent text-primary hover:bg-primary/10" },
      { variant: "ghost", tone: "dark", className: "border-transparent bg-transparent text-foreground hover:bg-foreground/10" },
      { variant: "ghost", tone: "gray", className: "border-transparent bg-transparent text-muted-foreground hover:bg-muted" },
      { variant: "ghost", tone: "green", className: "border-transparent bg-transparent text-success hover:bg-success/10" },
      { variant: "ghost", tone: "red", className: "border-transparent bg-transparent text-destructive hover:bg-destructive/10" },
      { variant: "ghost", tone: "yellow", className: "border-transparent bg-transparent text-warning hover:bg-warning/10" }
    ],
    defaultVariants: {
      size: "default",
      tone: "blue",
      variant: "soft"
    }
  }
);

export interface ButtonIconProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonIconVariants> {
  asChild?: boolean;
  label?: string;
}

function ButtonIcon({
  asChild = false,
  children,
  className,
  label,
  size,
  tone,
  type = "button",
  variant,
  ...props
}: ButtonIconProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      aria-label={label}
      className={cn(buttonIconVariants({ size, tone, variant }), className)}
      {...(!asChild ? { type } : {})}
      {...props}
    >
      {children}
    </Comp>
  );
}

const ButtonIcons = ButtonIcon;

export { ButtonIcon, ButtonIcons, buttonIconVariants };

