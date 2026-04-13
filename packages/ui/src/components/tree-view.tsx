import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { ChevronRight } from "lucide-react";

import { cn } from "../lib/cn";

function TreeView({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div role="tree" className={cn("grid gap-1 rounded-xl border border-border bg-card p-2", className)} {...props} />;
}

function TreeViewGroup({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div role="group" className={cn("grid gap-1", className)} {...props} />;
}

export interface TreeViewItemProps extends React.HTMLAttributes<HTMLElement> {
  asChild?: boolean;
  expanded?: boolean;
  level?: number;
  selected?: boolean;
}

function TreeViewItem({
  asChild = false,
  children,
  className,
  expanded,
  level = 1,
  selected,
  ...props
}: TreeViewItemProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      aria-expanded={expanded}
      aria-level={level}
      aria-selected={selected}
      role="treeitem"
      className={cn(
        "flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm transition-colors outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary/30",
        selected && "bg-primary-soft text-primary-soft-foreground hover:bg-primary-soft",
        className
      )}
      style={{ paddingLeft: `calc(0.625rem + ${(level - 1) * 1}rem)` }}
      {...(!asChild ? { type: "button" as const } : {})}
      {...props}
    >
      <ChevronRight className={cn("size-4 shrink-0 transition-transform", expanded && "rotate-90")} aria-hidden="true" />
      {children}
    </Comp>
  );
}

function TreeViewLabel({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("truncate font-medium", className)} {...props} />;
}

export { TreeView, TreeViewGroup, TreeViewItem, TreeViewLabel };

