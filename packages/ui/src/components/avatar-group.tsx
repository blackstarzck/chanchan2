import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "../lib/cn";

function AvatarGroup({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex items-center -space-x-2", className)} {...props} />;
}

export interface AvatarGroupItemProps extends React.HTMLAttributes<HTMLElement> {
  asChild?: boolean;
}

function AvatarGroupItem({ asChild = false, className, ...props }: AvatarGroupItemProps) {
  const Comp = asChild ? Slot : "span";

  return <Comp className={cn("inline-flex rounded-full ring-2 ring-white shadow-[0_1px_1px_0_rgba(0,0,0,0.05)]", className)} {...props} />;
}

function AvatarGroupMore({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex size-11 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold tracking-[0.07px] text-slate-600 ring-2 ring-white shadow-[0_1px_1px_0_rgba(0,0,0,0.05)]",
        className
      )}
      {...props}
    />
  );
}

export { AvatarGroup, AvatarGroupItem, AvatarGroupMore };
