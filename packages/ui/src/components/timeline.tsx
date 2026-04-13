import * as React from "react";

import { cn } from "../lib/cn";

function Timeline({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("grid gap-8", className)} {...props} />;
}

function TimelineItem({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("grid grid-cols-[28px_minmax(0,1fr)] gap-0", className)} {...props} />;
}

function TimelineRail({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col items-center self-stretch", className)} {...props} />;
}

function TimelineIndicator({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("inline-flex size-7 items-center justify-center rounded-full text-muted-foreground", className)} {...props} />;
}

function TimelineLine({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("h-full w-px flex-1 bg-border", className)} {...props} />;
}

function TimelineContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex min-w-0 flex-col gap-1 pb-8 pl-3", className)} {...props} />;
}

function TimelineTime({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-xs font-medium leading-4 tracking-[0.06px] text-muted-foreground", className)} {...props} />;
}

function TimelineTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("text-base font-semibold leading-6 tracking-[0.08px] text-foreground", className)} {...props} />;
}

function TimelineDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-base font-medium leading-6 tracking-[0.08px] text-muted-foreground", className)} {...props} />;
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
