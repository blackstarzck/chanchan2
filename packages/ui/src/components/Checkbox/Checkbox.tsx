import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

import { cn } from "../../lib/cn";
import type {
  CheckboxContentProps,
  CheckboxDescriptionProps,
  CheckboxFieldProps,
  CheckboxLabelProps,
  CheckboxProps,
  CheckboxSupportProps
} from "./Checkbox.types";

export const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer inline-flex size-4 shrink-0 items-center justify-center rounded-sm border border-input bg-background text-primary outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="flex size-[14px] items-center justify-center text-current">
      <Check className="size-3.5" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));

Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export function CheckboxField({ className, ...props }: CheckboxFieldProps) {
  return <div className={cn("flex items-start gap-4 rounded-lg", className)} {...props} />;
}

export function CheckboxSupport({ className, ...props }: CheckboxSupportProps) {
  return (
    <div
      className={cn(
        "flex items-start gap-2.5 pt-1 text-muted-foreground [&_svg]:size-4 [&_svg]:shrink-0",
        className
      )}
      {...props}
    />
  );
}

export function CheckboxContent({ className, ...props }: CheckboxContentProps) {
  return <div className={cn("flex min-w-0 flex-1 flex-col", className)} {...props} />;
}

export function CheckboxLabel({ className, ...props }: CheckboxLabelProps) {
  return (
    <p
      className={cn("text-base font-medium leading-6 tracking-[0.08px] text-foreground", className)}
      {...props}
    />
  );
}

export function CheckboxDescription({ className, ...props }: CheckboxDescriptionProps) {
  return (
    <p
      className={cn("text-sm font-medium leading-5 tracking-[0.07px] text-muted-foreground", className)}
      {...props}
    />
  );
}
