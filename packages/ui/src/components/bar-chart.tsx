import * as React from "react";

import { cn } from "../lib/cn";

export interface BarChartProps extends React.SVGAttributes<SVGSVGElement> {
  bars?: number[];
  secondaryBars?: number[];
}

function BarChart({ bars = [38, 62, 44, 78, 56, 90], className, secondaryBars, ...props }: BarChartProps) {
  const count = bars.length;
  const gap = 4;
  const width = (100 - gap * (count - 1)) / count;

  return (
    <svg viewBox="0 0 100 100" role="img" className={cn("h-40 w-full overflow-visible text-primary", className)} {...props}>
      <path d="M0 90H100" className="stroke-border" strokeWidth="1" fill="none" />
      {bars.map((value, index) => {
        const height = Math.max(0, Math.min(100, value)) * 0.8;
        const x = index * (width + gap);
        const y = 90 - height;
        const secondaryHeight = Math.max(0, Math.min(100, secondaryBars?.[index] ?? 0)) * 0.8;

        return (
          <React.Fragment key={index}>
            {secondaryBars ? (
              <rect x={x} y={90 - secondaryHeight} width={width} height={secondaryHeight} rx="2" className="fill-muted" />
            ) : null}
            <rect x={x} y={y} width={secondaryBars ? width * 0.46 : width} height={height} rx="2" fill="currentColor" />
          </React.Fragment>
        );
      })}
    </svg>
  );
}

export { BarChart };

