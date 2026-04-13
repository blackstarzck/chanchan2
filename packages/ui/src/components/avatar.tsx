import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { MoonStar, X } from "lucide-react";

import { cn } from "../lib/cn";

export const avatarVariantNames = ["solid", "soft", "outline"] as const;
export const avatarToneNames = ["gray", "dark", "blue", "green", "red", "yellow", "light"] as const;
export const avatarSizeNames = ["xs", "sm", "default", "lg"] as const;
export const avatarShapeNames = ["rounded", "circular"] as const;
export const avatarStatusToneNames = ["online", "offline", "away", "dnd"] as const;

export type AvatarVariant = (typeof avatarVariantNames)[number];
export type AvatarTone = (typeof avatarToneNames)[number];
export type AvatarSize = (typeof avatarSizeNames)[number];
export type AvatarShape = (typeof avatarShapeNames)[number];
export type AvatarStatusTone = (typeof avatarStatusToneNames)[number];

const avatarSizeClasses: Record<AvatarSize, string> = {
  xs: "size-6 text-xs leading-4 tracking-[0.06px]",
  sm: "size-9 text-sm leading-5 tracking-[0.07px]",
  default: "size-11 text-base leading-6 tracking-[0.08px]",
  lg: "size-[60px] text-[20px] leading-5 tracking-[0.1px]"
};

const avatarShapeClasses: Record<AvatarShape, string> = {
  rounded: "rounded-lg",
  circular: "rounded-full"
};

const avatarSolidToneClasses: Record<AvatarTone, string> = {
  gray: "bg-slate-500 text-white",
  dark: "bg-slate-900 text-white",
  blue: "bg-blue-600 text-white",
  green: "bg-teal-500 text-white",
  red: "bg-red-500 text-white",
  yellow: "bg-amber-400 text-slate-900",
  light: "bg-white text-slate-900"
};

const avatarSoftToneClasses: Record<AvatarTone, string> = {
  gray: "bg-slate-100 text-slate-600",
  dark: "bg-slate-800 text-white",
  blue: "bg-blue-100 text-blue-700",
  green: "bg-teal-100 text-teal-700",
  red: "bg-red-100 text-red-600",
  yellow: "bg-amber-100 text-amber-700",
  light: "bg-slate-50 text-slate-500"
};

const avatarOutlineToneClasses: Record<AvatarTone, string> = {
  gray: "border border-slate-300 bg-white text-slate-600",
  dark: "border border-slate-900 bg-white text-slate-900",
  blue: "border border-blue-600 bg-white text-blue-700",
  green: "border border-teal-500 bg-white text-teal-700",
  red: "border border-red-500 bg-white text-red-600",
  yellow: "border border-amber-400 bg-white text-amber-700",
  light: "border border-slate-200 bg-white text-slate-500"
};

const avatarVariantToneClasses: Record<AvatarVariant, Record<AvatarTone, string>> = {
  solid: avatarSolidToneClasses,
  soft: avatarSoftToneClasses,
  outline: avatarOutlineToneClasses
};

const avatarStatusSizeClasses: Record<AvatarSize, string> = {
  xs: "size-1.5 border",
  sm: "size-2.5 border-2",
  default: "size-3 border-2",
  lg: "size-3.5 border-2"
};

const avatarStatusPositionClasses: Record<AvatarShape, Record<AvatarSize, string>> = {
  rounded: {
    xs: "-right-px -top-px",
    sm: "-right-1 -top-1",
    default: "-right-[5px] -top-1",
    lg: "-right-1.5 -top-1"
  },
  circular: {
    xs: "right-[3px] top-px",
    sm: "right-px top-0",
    default: "right-px top-0",
    lg: "right-[3px] top-[2px]"
  }
};

const avatarStatusToneClasses: Record<AvatarStatusTone, string> = {
  online: "bg-teal-500",
  offline: "bg-slate-500",
  away: "bg-amber-500",
  dnd: "bg-red-500"
};

const avatarStatusIconSizeClasses: Record<AvatarSize, string> = {
  xs: "[&_svg]:size-1.5",
  sm: "[&_svg]:size-2.5",
  default: "[&_svg]:size-3",
  lg: "[&_svg]:size-4"
};

export interface AvatarProps extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
  shape?: AvatarShape;
  size?: AvatarSize;
  tone?: AvatarTone;
  variant?: AvatarVariant;
}

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ className, shape = "rounded", size = "default", tone = "gray", variant = "solid", ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative inline-flex shrink-0 items-center justify-center font-semibold select-none",
      avatarSizeClasses[size],
      avatarShapeClasses[shape],
      avatarVariantToneClasses[variant][tone],
      className
    )}
    {...props}
  />
));

Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("absolute inset-[-1px] h-[calc(100%+2px)] w-[calc(100%+2px)] rounded-[inherit] object-cover", className)}
    {...props}
  />
));

AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "absolute inset-0 flex items-center justify-center rounded-[inherit] bg-transparent text-center font-semibold text-current",
      className
    )}
    {...props}
  />
));

AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export interface AvatarStatusProps extends React.HTMLAttributes<HTMLSpanElement> {
  icon?: React.ReactNode;
  shape?: AvatarShape;
  size?: AvatarSize;
  tone?: AvatarStatusTone;
}

function AvatarStatus({
  className,
  icon,
  shape = "rounded",
  size = "default",
  tone = "online",
  ...props
}: AvatarStatusProps) {
  const defaultIcon = tone === "away" ? <MoonStar /> : tone === "dnd" ? <X /> : null;

  return (
    <span
      className={cn(
        "absolute z-10 inline-flex items-center justify-center rounded-full border-white text-white shadow-[0_0_0_1px_rgba(255,255,255,0.4)]",
        avatarStatusSizeClasses[size],
        avatarStatusPositionClasses[shape][size],
        avatarStatusToneClasses[tone],
        avatarStatusIconSizeClasses[size],
        className
      )}
      {...props}
    >
      {icon ?? defaultIcon}
    </span>
  );
}

export { Avatar, AvatarFallback, AvatarImage, AvatarStatus };

