import * as React from "react";

import { cn } from "../lib/cn";

function CreditList({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("grid gap-3 rounded-2xl border border-border bg-card p-4", className)} {...props} />;
}

export interface CreditItemProps extends React.HTMLAttributes<HTMLDivElement> {
  href?: string;
  source?: React.ReactNode;
}

function CreditItem({ children, className, href, source, ...props }: CreditItemProps) {
  const content = (
    <div className={cn("flex items-center justify-between gap-4 rounded-xl bg-muted/50 px-4 py-3 text-sm", className)} {...props}>
      <span className="font-medium text-foreground">{children}</span>
      {source ? <span className="text-muted-foreground">{source}</span> : null}
    </div>
  );

  if (!href) return content;

  return (
    <a href={href} className="block rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-primary/30">
      {content}
    </a>
  );
}

const Credits = CreditList;

export { CreditItem, CreditList, Credits };

