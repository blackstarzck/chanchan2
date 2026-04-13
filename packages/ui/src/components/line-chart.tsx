import * as React from "react";

import { cn } from "../lib/cn";

export interface LineChartProps extends React.SVGAttributes<SVGSVGElement> {
  data?: number[];
  strong?: boolean;
}

function LineChart({ className, data = [22, 40, 34, 58, 48, 76, 68], strong = false, ...props }: LineChartProps) {
  const points = data.map((value, index) => {
    const x = data.length === 1 ? 50 : (index / (data.length - 1)) * 100;
    const y = 100 - Math.max(0, Math.min(100, value));
    return `${x},${y}`;
  });

  return (
    <svg viewBox="0 0 100 100" role="img" className={cn("h-40 w-full overflow-visible text-primary", className)} {...props}>
      <path d="M0 80H100" className="stroke-border" strokeWidth="1" fill="none" />
      <path d="M0 50H100" className="stroke-border/70" strokeWidth="1" fill="none" />
      <path d="M0 20H100" className="stroke-border/70" strokeWidth="1" fill="none" />
      <polyline points={points.join(" ")} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={strong ? 5 : 3} />
    </svg>
  );
}

export { LineChart };
