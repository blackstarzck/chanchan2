import * as React from "react";

import { cn } from "../lib/cn";

function CustomIconGrid({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("grid grid-cols-2 gap-3 sm:grid-cols-4", className)} {...props} />;
}

export interface CustomIconProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: React.ReactNode;
}

function CustomIcon({ children, className, label, ...props }: CustomIconProps) {
  return (
    <div className={cn("inline-grid place-items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-center", className)} {...props}>
      <div className="grid size-10 place-items-center rounded-lg bg-foreground text-sm font-bold uppercase text-background">{children}</div>
      {label ? <span className="text-xs text-muted-foreground">{label}</span> : null}
    </div>
  );
}

const CustomIcons = CustomIconGrid;

export { CustomIcon, CustomIconGrid, CustomIcons };

