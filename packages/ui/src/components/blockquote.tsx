import * as React from "react";

import { cn } from "../lib/cn";

function Blockquote({ className, ...props }: React.BlockquoteHTMLAttributes<HTMLElement>) {
  return (
    <blockquote
      className={cn("border-l-2 border-border pl-4 text-sm leading-7 text-muted-foreground", className)}
      {...props}
    />
  );
}

function BlockquoteCitation({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return <footer className={cn("mt-3 text-xs font-medium tracking-wide text-foreground", className)} {...props} />;
}

export { Blockquote, BlockquoteCitation };
