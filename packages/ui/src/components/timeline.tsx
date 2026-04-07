import * as React from "react";

import { cn } from "../lib/cn";

function Timeline({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("grid gap-4", className)} {...props} />;
}

function TimelineItem({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("grid grid-cols-[auto_1fr] gap-4", className)} {...props} />;
}

function TimelineRail({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col items-center", className)} {...props} />;
}

function TimelineIndicator({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("mt-1 inline-flex size-3 rounded-full bg-primary", className)} {...props} />;
}

function TimelineLine({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("mt-2 h-full w-px flex-1 bg-border", className)} {...props} />;
}

function TimelineContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("grid gap-1 rounded-xl border border-border bg-card p-4", className)} {...props} />;
}

function TimelineTime({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground", className)} {...props} />;
}

function TimelineTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("text-sm font-semibold text-card-foreground", className)} {...props} />;
}

function TimelineDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm text-muted-foreground", className)} {...props} />;
}

export {
  Timeline,
  TimelineContent,
  TimelineDescription,
  TimelineIndicator,
  TimelineItem,
  TimelineLine,
  TimelineRail,
  TimelineTime,
  TimelineTitle
};
