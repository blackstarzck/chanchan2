import * as React from "react";
import { ChevronRight, MoreHorizontal, Slash } from "lucide-react";

import { cn } from "../lib/cn";

const Breadcrumb = React.forwardRef<HTMLElement, React.ComponentProps<"nav">>(({ className, ...props }, ref) => (
  <nav ref={ref} aria-label="breadcrumb" className={cn("", className)} {...props} />
));

Breadcrumb.displayName = "Breadcrumb";

const BreadcrumbList = React.forwardRef<HTMLOListElement, React.ComponentProps<"ol">>(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn("flex flex-wrap items-center gap-4 break-words text-sm font-medium tracking-[0.07px] text-muted-foreground", className)}
    {...props}
  />
));

BreadcrumbList.displayName = "BreadcrumbList";

const BreadcrumbItem = React.forwardRef<HTMLLIElement, React.ComponentProps<"li">>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("inline-flex items-center gap-2.5", className)} {...props} />
));

BreadcrumbItem.displayName = "BreadcrumbItem";

const BreadcrumbLink = React.forwardRef<HTMLAnchorElement, React.ComponentProps<"a">>(({ className, ...props }, ref) => (
  <a ref={ref} className={cn("transition-colors hover:text-foreground", className)} {...props} />
));

BreadcrumbLink.displayName = "BreadcrumbLink";

const BreadcrumbPage = React.forwardRef<HTMLSpanElement, React.ComponentProps<"span">>(({ className, ...props }, ref) => (
  <span ref={ref} aria-current="page" className={cn("font-medium text-foreground", className)} {...props} />
));

BreadcrumbPage.displayName = "BreadcrumbPage";

const BreadcrumbSeparator = ({
  children,
  className,
  variant = "slash",
  ...props
}: React.ComponentProps<"li"> & { variant?: "slash" | "chevron" }) => (
  <li role="presentation" aria-hidden="true" className={cn("text-muted-foreground [&>svg]:size-3", className)} {...props}>
    {children ?? (variant === "chevron" ? <ChevronRight /> : <Slash />)}
  </li>
);

BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

const BreadcrumbEllipsis = ({ className, ...props }: React.ComponentProps<"span">) => (
  <span role="presentation" aria-hidden="true" className={cn("flex size-9 items-center justify-center", className)} {...props}>
    <MoreHorizontal className="size-4" />
    <span className="sr-only">More</span>
  </span>
);

BreadcrumbEllipsis.displayName = "BreadcrumbElipsis";

export {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
};

