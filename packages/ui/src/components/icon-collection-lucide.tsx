import * as React from "react";

import { cn } from "../lib/cn";

function IconCollectionGrid({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-6", className)} {...props} />;
}

export interface IconTileProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: React.ReactNode;
}

function IconTile({ children, className, label, ...props }: IconTileProps) {
  return (
    <div className={cn("grid place-items-center gap-2 rounded-xl border border-border bg-card p-3 text-center text-xs text-muted-foreground", className)} {...props}>
      <div className="grid size-10 place-items-center rounded-lg bg-muted text-foreground [&_svg]:size-5">{children}</div>
      {label ? <span className="max-w-full truncate">{label}</span> : null}
    </div>
  );
}

const IconCollectionLucide = IconCollectionGrid;

export { IconCollectionGrid, IconCollectionLucide, IconTile };

