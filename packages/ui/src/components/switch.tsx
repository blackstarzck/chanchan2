import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { Check, X } from "lucide-react";

import { cn } from "../lib/cn";

export interface SwitchProps extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> {
  offIcon?: React.ReactNode;
  onIcon?: React.ReactNode;
}

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  SwitchProps
>(({ className, offIcon, onIcon, ...props }, ref) => (
  <SwitchPrimitive.Root
    ref={ref}
    className={cn(
      "peer relative inline-flex h-7 w-[52px] shrink-0 items-center rounded-full bg-secondary px-0.5 py-0.5 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-secondary",
      className
    )}
    {...props}
  >
    <span className="pointer-events-none absolute inset-0 grid grid-cols-2 px-0.5">
      <span className="flex items-center justify-center text-muted-foreground [&_svg]:size-2.5">
        {offIcon ?? <X />}
      </span>
      <span className="flex items-center justify-center text-muted-foreground [&_svg]:size-2.5">
        {onIcon ?? <Check />}
      </span>
    </span>
    <SwitchPrimitive.Thumb
      className={cn(
        "group pointer-events-none z-10 flex size-6 items-center justify-center rounded-full bg-background text-muted-foreground shadow-[0_1px_2px_0_rgba(0,0,0,0.15)] ring-0 transition-transform data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-0 [&_svg]:size-2.5"
      )}
    >
      <span className="group-data-[state=checked]:hidden">{offIcon ?? <X />}</span>
      <span className="hidden group-data-[state=checked]:inline-flex">{onIcon ?? <Check />}</span>
    </SwitchPrimitive.Thumb>
  </SwitchPrimitive.Root>
));

Switch.displayName = SwitchPrimitive.Root.displayName;

function SwitchField({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex items-center gap-4", className)} {...props} />;
}

function SwitchLabel({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-base font-medium leading-6 tracking-[0.08px] text-muted-foreground", className)} {...props} />;
}

export { Switch, SwitchField, SwitchLabel };

