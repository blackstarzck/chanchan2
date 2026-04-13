import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

import { cn } from "../lib/cn";

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav role="navigation" aria-label="pagination" className={cn("flex w-full", className)} {...props} />
);

const PaginationContent = React.forwardRef<HTMLUListElement, React.ComponentProps<"ul">>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("inline-flex items-stretch overflow-hidden rounded-lg border border-border bg-card divide-x divide-border", className)}
    {...props}
  />
));

PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<HTMLLIElement, React.ComponentProps<"li">>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
));

PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
  isActive?: boolean;
  size?: "default" | "icon";
} &
  React.ComponentProps<"a">;

const PaginationLink = ({ className, isActive, size = "icon", ...props }: PaginationLinkProps) => (
  <a
    aria-current={isActive ? "page" : undefined}
    className={cn(
      "inline-flex shrink-0 items-center justify-center font-medium text-foreground transition-colors hover:bg-secondary hover:text-foreground",
      size === "default"
        ? "h-[38px] gap-2 px-3 text-base leading-6 tracking-[0.08px]"
        : "size-[38px] text-base leading-6 tracking-[0.08px]",
      isActive ? "bg-secondary" : "bg-card",
      className
    )}
    {...props}
  />
);

const PaginationPrevious = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink aria-label="Go to previous page" size="default" className={className} {...props}>
    <ChevronLeft className="size-4" />
    <span aria-hidden>«</span>
    <span>Previous</span>
  </PaginationLink>
);

const PaginationNext = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink aria-label="Go to next page" size="default" className={className} {...props}>
    <span>Next</span>
    <span aria-hidden>»</span>
    <ChevronRight className="size-4" />
  </PaginationLink>
);

const PaginationEllipsis = ({ className, ...props }: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("inline-flex size-[38px] items-center justify-center text-xs font-medium leading-4 tracking-[0.06px] text-foreground", className)}
    {...props}
  >
    <MoreHorizontal className="size-4" />
    <span className="sr-only">More pages</span>
  </span>
);

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
};
