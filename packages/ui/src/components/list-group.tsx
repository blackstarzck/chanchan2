import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/cn";

const listGroupItemVariants = cva(
  "flex w-full items-center justify-between gap-3 rounded-lg px-3 py-3 text-sm transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  {
    variants: {
      active: {
        true: "bg-primary-soft text-primary-soft-foreground",
        false: "bg-card text-card-foreground hover:bg-secondary/80"
      }
    },
    defaultVariants: {
      active: false
    }
  }
);

function ListGroup({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("grid gap-2 rounded-xl border border-border bg-card p-2", className)} {...props} />;
}

export interface ListGroupItemProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof listGroupItemVariants> {
  asChild?: boolean;
}

function ListGroupItem({ asChild = false, active, className, ...props }: ListGroupItemProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn(listGroupItemVariants({ active }), className)}
      {...(!asChild ? { type: "button" as const } : {})}
      {...props}
    />
  );
}

function ListGroupTitle({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("font-medium", className)} {...props} />;
}

function ListGroupDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm text-muted-foreground", className)} {...props} />;
}

export { ListGroup, ListGroupDescription, ListGroupItem, ListGroupTitle };
