import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/cn";

const sidebarItemVariants = cva(
  "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  {
    variants: {
      active: {
        true: "bg-primary-soft text-primary-soft-foreground",
        false: "text-muted-foreground hover:bg-secondary hover:text-foreground"
      },
      inset: {
        true: "pl-10",
        false: ""
      }
    },
    defaultVariants: {
      active: false,
      inset: false
    }
  }
);

function Sidebar({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <aside
      className={cn(
        "flex min-h-full w-full max-w-80 flex-col rounded-[calc(var(--cc-radius-xl)+4px)] border border-border bg-card text-card-foreground shadow-sm",
        className
      )}
      {...props}
    />
  );
}

function SidebarHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("border-b border-border px-4 py-4", className)} {...props} />;
}

function SidebarContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-1 flex-col gap-5 px-3 py-4", className)} {...props} />;
}

function SidebarFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("border-t border-border px-4 py-4", className)} {...props} />;
}

function SidebarSection({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <section className={cn("grid gap-2", className)} {...props} />;
}

function SidebarSectionTitle({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("px-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground", className)}
      {...props}
    />
  );
}

function SidebarList({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("grid gap-1.5", className)} {...props} />;
}

export interface SidebarItemProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sidebarItemVariants> {
  asChild?: boolean;
}

function SidebarItem({ asChild = false, active, inset, className, ...props }: SidebarItemProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn(sidebarItemVariants({ active, inset }), className)}
      {...(!asChild ? { type: "button" as const } : {})}
      {...props}
    />
  );
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarList,
  SidebarSection,
  SidebarSectionTitle
};
