import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/cn";

const navbarLinkVariants = cva(
  "inline-flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  {
    variants: {
      active: {
        true: "bg-primary-soft text-primary-soft-foreground",
        false: "text-muted-foreground hover:bg-secondary hover:text-foreground"
      }
    },
    defaultVariants: {
      active: false
    }
  }
);

function Navbar({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <header
      className={cn(
        "flex flex-wrap items-center justify-between gap-4 rounded-[calc(var(--cc-radius-xl)+4px)] border border-border bg-card px-4 py-3 shadow-sm",
        className
      )}
      {...props}
    />
  );
}

function NavbarBrand({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex items-center gap-3 font-semibold tracking-tight", className)} {...props} />;
}

function NavbarContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <nav className={cn("flex flex-1 flex-wrap items-center gap-2", className)} {...props} />;
}

function NavbarActions({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex items-center gap-2", className)} {...props} />;
}

export interface NavbarLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof navbarLinkVariants> {
  asChild?: boolean;
}

function NavbarLink({ asChild = false, active, className, ...props }: NavbarLinkProps) {
  const Comp = asChild ? Slot : "a";

  return <Comp className={cn(navbarLinkVariants({ active }), className)} {...props} />;
}

export { Navbar, NavbarActions, NavbarBrand, NavbarContent, NavbarLink };
