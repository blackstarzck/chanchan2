import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/cn";

const alertVariants = cva(
  "relative flex w-full gap-5 rounded-xl border px-4 py-4 text-foreground shadow-[0_1px_1px_0_rgba(0,0,0,0.05)]",
  {
    variants: {
      variant: {
        default: "border-border bg-card text-card-foreground",
        success: "border-success/20 bg-success/10 text-success",
        destructive: "border-destructive/20 bg-destructive/10 text-destructive"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  actions?: React.ReactNode;
  close?: React.ReactNode;
  lead?: React.ReactNode;
  meta?: React.ReactNode;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ actions, children, className, close, lead, meta, variant, ...props }, ref) => (
    <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props}>
      {lead ? <div className="shrink-0 pt-1">{lead}</div> : null}
      <div className="min-w-0 flex-1">
        {meta ? <div className="mb-1 flex items-start gap-2.5 pr-9">{meta}</div> : null}
        {children}
        {actions ? <div className="mt-2.5 flex flex-wrap items-center gap-1.5">{actions}</div> : null}
      </div>
      {close ? <div className="absolute right-2.5 top-2.5 shrink-0">{close}</div> : null}
    </div>
  )
);

Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5
      ref={ref}
      className={cn("font-semibold leading-none tracking-[0.09px] text-[18px] text-foreground", className)}
      {...props}
    />
  )
);

AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("text-base text-muted-foreground [&_p]:leading-6 [&_p]:tracking-[0.08px]", className)}
      {...props}
    />
  )
);

AlertDescription.displayName = "AlertDescription";

export { Alert, AlertDescription, AlertTitle };
