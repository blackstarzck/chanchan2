import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/cn";

const deviceFrameVariants = cva("overflow-hidden border border-border bg-card text-card-foreground", {
  variants: {
    device: {
      desktop: "aspect-[16/10] w-full rounded-2xl",
      mobile: "aspect-[9/18] w-48 rounded-[2rem]"
    },
    shadow: {
      true: "shadow-2xl shadow-foreground/15",
      false: "shadow-none"
    }
  },
  defaultVariants: {
    device: "desktop",
    shadow: true
  }
});

export interface DeviceFrameProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof deviceFrameVariants> {}

function DeviceFrame({ children, className, device, shadow, ...props }: DeviceFrameProps) {
  return (
    <div className={cn(deviceFrameVariants({ device, shadow }), className)} {...props}>
      <div className="flex h-8 items-center gap-1.5 border-b border-border bg-muted/60 px-3">
        <span className="size-2 rounded-full bg-destructive/70" />
        <span className="size-2 rounded-full bg-warning/70" />
        <span className="size-2 rounded-full bg-success/70" />
      </div>
      {children}
    </div>
  );
}

function DeviceScreen({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("h-[calc(100%-2rem)] bg-background p-4", className)} {...props} />;
}

const Devices = DeviceFrame;

export { DeviceFrame, DeviceScreen, Devices };

