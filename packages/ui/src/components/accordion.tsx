import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown, ChevronUp, CircleMinus, CirclePlus, Minus, Plus } from "lucide-react";

import { cn } from "../lib/cn";

const Accordion = AccordionPrimitive.Root;

export type AccordionItemVariant = "plain" | "card";
export type AccordionTriggerDensity = "compact" | "comfortable";
export type AccordionIndicatorPosition = "start" | "end" | "both" | "none";
export type AccordionIndicatorVariant = "plus" | "chevron" | "circle";
export type AccordionContentInset = "none" | "start";
export type AccordionContentVariant = "plain" | "bordered";

export type AccordionItemProps = React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> & {
  divider?: boolean;
  variant?: AccordionItemVariant;
};

export type AccordionTriggerProps = React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> & {
  badge?: React.ReactNode;
  density?: AccordionTriggerDensity;
  indicator?: React.ReactNode;
  indicatorPosition?: AccordionIndicatorPosition;
  indicatorVariant?: AccordionIndicatorVariant;
  leading?: React.ReactNode;
  openIndicator?: React.ReactNode;
};

export type AccordionContentProps = React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> & {
  inset?: AccordionContentInset;
  variant?: AccordionContentVariant;
};

const itemVariantClasses: Record<AccordionItemVariant, string> = {
  plain: "bg-transparent",
  card: "bg-card"
};

const triggerDensityClasses: Record<AccordionTriggerDensity, string> = {
  compact: "min-h-6 py-0",
  comfortable: "min-h-14 py-4"
};

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  AccordionItemProps
>(({ className, divider = true, variant = "plain", ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(itemVariantClasses[variant], divider && "border-t border-border", className)}
    {...props}
  />
));

AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  AccordionTriggerProps
>(({
  badge,
  className,
  children,
  density = "comfortable",
  indicator,
  indicatorPosition = "start",
  indicatorVariant = "plus",
  leading,
  openIndicator,
  ...props
}, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "group flex flex-1 items-center gap-5 text-left text-base font-semibold tracking-[0.08px] text-foreground transition-colors hover:text-primary data-[state=open]:text-primary",
        triggerDensityClasses[density],
        className
      )}
      {...props}
    >
      {(indicatorPosition === "start" || indicatorPosition === "both") ? (
        <AccordionIndicator
          indicator={indicator}
          openIndicator={openIndicator}
          variant={indicatorVariant}
        />
      ) : null}
      <span className="flex min-w-0 flex-1 items-center gap-3">
        {leading ? <span className="shrink-0 text-muted-foreground group-data-[state=open]:text-primary">{leading}</span> : null}
        <span className="truncate">{children}</span>
        {badge ? <span className="shrink-0">{badge}</span> : null}
      </span>
      {(indicatorPosition === "end" || indicatorPosition === "both") ? (
        <AccordionIndicator
          indicator={indicator}
          openIndicator={openIndicator}
          variant={indicatorVariant}
        />
      ) : null}
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));

function AccordionIndicator({
  indicator,
  openIndicator,
  variant
}: {
  indicator?: React.ReactNode;
  openIndicator?: React.ReactNode;
  variant: AccordionIndicatorVariant;
}) {
  if (indicator !== undefined) {
    return (
      <span data-accordion-indicator className="shrink-0 text-current transition-colors duration-200">
        {indicator}
      </span>
    );
  }

  const closedIcon =
    variant === "chevron" ? (
      <ChevronDown className="size-4" />
    ) : variant === "circle" ? (
      <CirclePlus className="size-4" />
    ) : (
      <Plus className="size-4" />
    );
  const openedIcon =
    openIndicator ??
    (variant === "chevron" ? (
      <ChevronUp className="size-4" />
    ) : variant === "circle" ? (
      <CircleMinus className="size-4" />
    ) : (
      <Minus className="size-4" />
    ));

  return (
    <span data-accordion-indicator className="shrink-0 text-current transition-colors duration-200">
      <span className="inline-flex group-data-[state=open]:hidden">{closedIcon}</span>
      <span className="hidden group-data-[state=open]:inline-flex">{openedIcon}</span>
    </span>
  );
}

AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  AccordionContentProps
>(({ className, children, inset = "start", variant = "plain", ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn("overflow-hidden text-base text-muted-foreground", className)}
    {...props}
  >
    <div
      className={cn(
        "pb-5 pt-0 leading-6 tracking-[0.08px]",
        inset === "start" && "pl-9",
        variant === "bordered" && "mt-0 rounded-xl border border-border bg-card px-5 py-4 shadow-sm"
      )}
    >
      {children}
    </div>
  </AccordionPrimitive.Content>
));

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
