import * as React from "react";

import { cn } from "../lib/cn";

export interface DoughnutChartProps extends React.HTMLAttributes<HTMLDivElement> {
  segments?: string[];
}

function DoughnutChart({
  children,
  className,
  segments = ["#2563eb 0 45%", "#22c55e 45% 72%", "#e5e7eb 72% 100%"],
  style,
  ...props
}: DoughnutChartProps) {
  return (
    <div
      role="img"
      className={cn("grid aspect-square w-40 place-items-center rounded-full p-5 shadow-inner", className)}
      style={{ background: `conic-gradient(${segments.join(", ")})`, ...style }}
      {...props}
    >
      <div className="grid size-full place-items-center rounded-full bg-background text-sm font-semibold text-foreground">{children}</div>
    </div>
  );
}

export { DoughnutChart };

