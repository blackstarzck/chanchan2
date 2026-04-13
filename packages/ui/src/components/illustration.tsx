import * as React from "react";

import { cn } from "../lib/cn";

function IllustrationFrame({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative isolate overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary/15 via-background to-warning/20 p-8",
        className
      )}
      {...props}
    >
      <div className="absolute -right-10 -top-10 -z-10 size-40 rounded-full bg-primary/20 blur-2xl" />
      <div className="absolute -bottom-12 left-10 -z-10 size-36 rounded-full bg-success/20 blur-2xl" />
      {children}
    </div>
  );
}

function IllustrationSpot({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("size-24 rounded-[2rem] bg-primary/20 shadow-inner ring-1 ring-primary/20", className)} {...props} />;
}

const Illustration = IllustrationFrame;

export { Illustration, IllustrationFrame, IllustrationSpot };

