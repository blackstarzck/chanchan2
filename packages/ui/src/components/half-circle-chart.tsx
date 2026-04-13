import * as React from "react";

import { cn } from "../lib/cn";

export interface HalfCircleChartProps extends React.HTMLAttributes<HTMLDivElement> {
  progress?: number;
}

function HalfCircleChart({ children, className, progress = 68, style, ...props }: HalfCircleChartProps) {
  const safeProgress = Math.max(0, Math.min(100, progress));

  return (
    <div className={cn("relative h-20 w-40 overflow-hidden", className)} {...props}>
      <div
        className="absolute left-0 top-0 grid aspect-square w-40 place-items-center rounded-full p-5"
        style={{
          background: `conic-gradient(from 270deg, var(--cc-primary) 0 ${safeProgress * 0.5}%, var(--cc-muted) ${safeProgress * 0.5}% 50%, transparent 50% 100%)`,
          ...style
        }}
      >
        <div className="size-full rounded-full bg-background" />
      </div>
      {children ? <div className="absolute inset-x-0 bottom-0 text-center text-sm font-semibold text-foreground">{children}</div> : null}
    </div>
  );
}

export { HalfCircleChart };

