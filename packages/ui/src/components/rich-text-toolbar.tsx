import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "../lib/cn";

function RichTextToolbar({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-2 rounded-xl border border-border bg-card p-2 shadow-sm",
        className
      )}
      {...props}
    />
  );
}

function RichTextToolbarGroup({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex items-center gap-1 rounded-lg bg-secondary p-1", className)} {...props} />;
}

export interface RichTextToolbarButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  active?: boolean;
}

const RichTextToolbarButton = React.forwardRef<HTMLButtonElement, RichTextToolbarButtonProps>(
  ({ active = false, asChild = false, className, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        className={cn(
          "inline-flex h-9 items-center justify-center rounded-md px-3 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          active ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:bg-background hover:text-foreground",
          className
        )}
        {...(!asChild ? { type: "button" as const } : {})}
        {...props}
      />
    );
  }
);

RichTextToolbarButton.displayName = "RichTextToolbarButton";

const RichTextEditor = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      contentEditable
      suppressContentEditableWarning
      className={cn(
        "min-h-40 rounded-[calc(var(--cc-radius-xl)+2px)] border border-input bg-background px-4 py-3 text-sm text-foreground shadow-xs outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className
      )}
      {...props}
    />
  )
);

RichTextEditor.displayName = "RichTextEditor";

export { RichTextEditor, RichTextToolbar, RichTextToolbarButton, RichTextToolbarGroup };
