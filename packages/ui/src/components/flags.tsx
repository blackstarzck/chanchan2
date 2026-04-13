import * as React from "react";

import { cn } from "../lib/cn";

export interface FlagProps extends React.HTMLAttributes<HTMLSpanElement> {
  code: string;
  label?: string;
}

function Flag({ className, code, label, ...props }: FlagProps) {
  return (
    <span
      aria-label={label ?? code.toUpperCase()}
      className={cn("inline-flex items-center gap-2 rounded-md border border-border bg-card px-2.5 py-1.5 text-sm font-medium", className)}
      role="img"
      {...props}
    >
      <span aria-hidden="true">{countryCodeToEmoji(code)}</span>
      {label ? <span>{label}</span> : null}
    </span>
  );
}

function FlagGrid({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-wrap gap-2", className)} {...props} />;
}

function countryCodeToEmoji(code: string) {
  const normalized = code.trim().toUpperCase();
  if (!/^[A-Z]{2}$/.test(normalized)) return normalized;

  return normalized
    .split("")
    .map((letter) => String.fromCodePoint(127397 + letter.charCodeAt(0)))
    .join("");
}

const Flags = FlagGrid;

export { Flag, FlagGrid, Flags };

