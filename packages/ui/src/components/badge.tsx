import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/cn";

const badgeVariants = cva(
  "inline-flex items-center justify-center gap-1.5 font-medium transition-colors",
  {
    variants: {
      shape: {
        default: "rounded-md",
        pill: "rounded-full"
      },
      variant: {
        default: "border-primary/20 bg-primary-soft text-primary-soft-foreground",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        outline: "border-border bg-transparent text-foreground",
        success: "border-success/20 bg-success/10 text-success",
        destructive: "border-destructive/20 bg-destructive/10 text-destructive",
        accent: "border-transparent bg-[#dbeafe] text-[#1e40af]"
      },
      size: {
        default: "border px-2.5 py-1.5 text-xs leading-4 tracking-[0.06px]",
        sm: "px-[7px] py-0.5 text-[12px] leading-4 tracking-[0.06px]",
        lg: "border px-3 py-1.5 text-sm leading-5 tracking-[0.07px]"
      }
    },
    defaultVariants: {
      shape: "default",
      size: "default",
      variant: "default"
    }
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  avatar?: React.ReactNode;
  closeIcon?: React.ReactNode;
  leading?: React.ReactNode;
  status?: boolean | React.ReactNode;
  trailing?: React.ReactNode;
}

export function Badge({
  avatar,
  children,
  className,
  closeIcon,
  leading,
  shape,
  size,
  status,
  trailing,
  variant,
  ...props
}: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ shape, size, variant }), className)} {...props}>
      {avatar ? <span className="shrink-0 overflow-hidden rounded-full [&_img]:size-4 [&_img]:object-cover">{avatar}</span> : null}
      {leading}
      {status === true ? <span className="size-1.5 shrink-0 rounded-full bg-current" /> : status}
      {children}
      {trailing}
      {closeIcon ? (
        <span className="inline-flex size-3.5 shrink-0 items-center justify-center rounded-full bg-black/8 text-current">
          {closeIcon}
        </span>
      ) : null}
    </span>
  );
}

