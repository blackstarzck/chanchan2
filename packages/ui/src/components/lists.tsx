import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/cn";

function List({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("grid gap-1 rounded-xl border border-border bg-card p-1 text-card-foreground", className)} {...props} />;
}

const listItemVariants = cva(
  "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  {
    variants: {
      state: {
        active: "bg-primary-soft text-primary-soft-foreground",
        default: "hover:bg-muted",
        disabled: "pointer-events-none opacity-50"
      }
    },
    defaultVariants: {
      state: "default"
    }
  }
);

export interface ListItemProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof listItemVariants> {
  asChild?: boolean;
}

function ListItem({ asChild = false, className, state, ...props }: ListItemProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn(listItemVariants({ state }), className)}
      {...(!asChild ? { type: "button" as const } : {})}
      {...props}
    />
  );
}

function ListItemTitle({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("font-medium text-foreground", className)} {...props} />;
}

function ListItemDescription({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("text-xs text-muted-foreground", className)} {...props} />;
}

const Lists = List;

export { List, ListItem, ListItemDescription, ListItemTitle, Lists };

