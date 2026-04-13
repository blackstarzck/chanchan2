import * as React from "react";

import { cn } from "../lib/cn";

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  attached?: boolean;
  orientation?: "horizontal" | "vertical";
}

function ButtonGroup({
  attached = false,
  className,
  orientation = "horizontal",
  ...props
}: ButtonGroupProps) {
  const isVertical = orientation === "vertical";

  return (
    <div
      role="group"
      className={cn(
        "inline-flex",
        isVertical ? "flex-col" : "flex-row flex-wrap items-center",
        attached
          ? isVertical
            ? [
                "[&>*]:rounded-none",
                "[&>*:first-child]:rounded-t-md",
                "[&>*:last-child]:rounded-b-md",
                "[&>*:not(:first-child)]:-mt-px"
              ]
            : [
                "[&>*]:rounded-none",
                "[&>*:first-child]:rounded-l-md",
                "[&>*:last-child]:rounded-r-md",
                "[&>*:not(:first-child)]:-ml-px"
              ]
          : "gap-2",
        className
      )}
      {...props}
    />
  );
}

export { ButtonGroup };
