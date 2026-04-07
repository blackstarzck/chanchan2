import * as React from "react";

import { cn } from "../lib/cn";

const Table = React.forwardRef<HTMLTableElement, React.ComponentProps<"table">>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-x-auto rounded-xl border border-border bg-card">
    <table ref={ref} className={cn("w-full caption-bottom text-sm", className)} {...props} />
  </div>
));

Table.displayName = "Table";

const TableHeader = React.forwardRef<HTMLTableSectionElement, React.ComponentProps<"thead">>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b [&_tr]:border-border", className)} {...props} />
));

TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<HTMLTableSectionElement, React.ComponentProps<"tbody">>(({ className, ...props }, ref) => (
  <tbody ref={ref} className={cn("[&_tr:last-child]:border-0", className)} {...props} />
));

TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef<HTMLTableSectionElement, React.ComponentProps<"tfoot">>(({ className, ...props }, ref) => (
  <tfoot ref={ref} className={cn("border-t border-border bg-secondary/30 font-medium [&>tr]:last:border-b-0", className)} {...props} />
));

TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef<HTMLTableRowElement, React.ComponentProps<"tr">>(({ className, ...props }, ref) => (
  <tr ref={ref} className={cn("border-b border-border transition-colors hover:bg-secondary/30", className)} {...props} />
));

TableRow.displayName = "TableRow";

const TableHead = React.forwardRef<HTMLTableCellElement, React.ComponentProps<"th">>(({ className, ...props }, ref) => (
  <th ref={ref} className={cn("h-12 px-4 text-left align-middle text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground", className)} {...props} />
));

TableHead.displayName = "TableHead";

const TableCell = React.forwardRef<HTMLTableCellElement, React.ComponentProps<"td">>(({ className, ...props }, ref) => (
  <td ref={ref} className={cn("p-4 align-middle text-sm", className)} {...props} />
));

TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef<HTMLTableCaptionElement, React.ComponentProps<"caption">>(({ className, ...props }, ref) => (
  <caption ref={ref} className={cn("mt-4 text-sm text-muted-foreground", className)} {...props} />
));

TableCaption.displayName = "TableCaption";

export {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
};

