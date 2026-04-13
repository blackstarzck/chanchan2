import * as React from "react";

import { cn } from "../lib/cn";

export interface PieChartProps extends React.HTMLAttributes<HTMLDivElement> {
  segments?: string[];
}

function PieChart({ className, segments = ["#2563eb 0 38%", "#22c55e 38% 68%", "#f59e0b 68% 100%"], style, ...props }: PieChartProps) {
  return (
    <div
      role="img"
      className={cn("aspect-square w-40 rounded-full shadow-inner", className)}
      style={{ background: `conic-gradient(${segments.join(", ")})`, ...style }}
      {...props}
    />
  );
}

const CirclesPieChart = PieChart;

export { CirclesPieChart, PieChart };

