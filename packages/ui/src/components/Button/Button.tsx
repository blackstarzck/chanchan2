import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "../../lib/cn";
import type { ButtonProps, ButtonShape, ButtonSize, ButtonTone, ButtonVariant } from "./Button.types";

type ResolvedButtonStyle = "solid" | "outline" | "ghost" | "soft" | "link" | "white";
type ResolvedButtonTone = ButtonTone | "theme";

const buttonBaseClasses =
  "inline-flex shrink-0 items-center justify-center gap-2.5 whitespace-nowrap font-medium tracking-[0.07px] select-none outline-none transition-[color,background-color,border-color,box-shadow] duration-200 focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0";

const textButtonSizeClasses: Record<Exclude<ButtonSize, "icon-sm" | "icon" | "icon-lg">, string> = {
  sm: "h-9 px-3 text-sm [&_svg]:size-4",
  default: "h-11 px-4 text-sm [&_svg]:size-4",
  lg: "h-14 px-5 text-base [&_svg]:size-5"
};

const iconButtonSizeClasses: Record<Extract<ButtonSize, "icon-sm" | "icon" | "icon-lg">, string> = {
  "icon-sm": "size-9 [&_svg]:size-4",
  icon: "size-11 [&_svg]:size-5",
  "icon-lg": "size-14 [&_svg]:size-6"
};

const linkButtonSizeClasses: Record<Exclude<ButtonSize, "icon-sm" | "icon" | "icon-lg">, string> = {
  sm: "h-auto px-0 py-0 text-sm [&_svg]:size-4",
  default: "h-auto px-0 py-0 text-sm [&_svg]:size-4",
  lg: "h-auto px-0 py-0 text-base [&_svg]:size-5"
};

const buttonShapeClasses: Record<ButtonShape, string> = {
  default: "rounded-lg",
  pill: "rounded-full"
};

const solidToneClasses: Record<ButtonTone, string> = {
  dark: "border border-transparent bg-slate-900 text-white hover:bg-slate-800",
  gray: "border border-transparent bg-slate-500 text-white hover:bg-slate-400",
  green: "border border-transparent bg-teal-500 text-white hover:bg-teal-400",
  blue: "border border-transparent bg-blue-600 text-white hover:bg-blue-500",
  red: "border border-transparent bg-red-500 text-white hover:bg-red-400",
  yellow: "border border-transparent bg-amber-400 text-slate-900 hover:bg-amber-300",
  light: "border border-slate-200 bg-white text-slate-900 hover:bg-slate-50"
};

const outlineToneClasses: Record<ButtonTone, string> = {
  dark: "border border-slate-900 bg-transparent text-slate-900 hover:bg-slate-900 hover:text-white",
  gray: "border border-slate-300 bg-transparent text-slate-600 hover:bg-slate-50",
  green: "border border-teal-500 bg-transparent text-teal-600 hover:bg-teal-50",
  blue: "border border-blue-600 bg-transparent text-blue-600 hover:bg-blue-50",
  red: "border border-red-500 bg-transparent text-red-500 hover:bg-red-50",
  yellow: "border border-amber-400 bg-transparent text-amber-500 hover:bg-amber-50",
  light: "border border-slate-200 bg-transparent text-slate-400 hover:bg-slate-50"
};

const ghostToneClasses: Record<ButtonTone, string> = {
  dark: "border border-transparent bg-transparent text-slate-900 hover:bg-slate-100",
  gray: "border border-transparent bg-transparent text-slate-500 hover:bg-slate-50",
  green: "border border-transparent bg-transparent text-teal-600 hover:bg-teal-50",
  blue: "border border-transparent bg-transparent text-blue-600 hover:bg-blue-50",
  red: "border border-transparent bg-transparent text-red-500 hover:bg-red-50",
  yellow: "border border-transparent bg-transparent text-amber-500 hover:bg-amber-50",
  light: "border border-transparent bg-transparent text-slate-400 hover:bg-slate-50"
};

const softToneClasses: Record<ButtonTone, string> = {
  dark: "border border-transparent bg-slate-100 text-slate-900 hover:bg-slate-200",
  gray: "border border-transparent bg-slate-100 text-slate-600 hover:bg-slate-200",
  green: "border border-transparent bg-teal-100 text-teal-700 hover:bg-teal-200",
  blue: "border border-transparent bg-blue-100 text-blue-700 hover:bg-blue-200",
  red: "border border-transparent bg-red-100 text-red-600 hover:bg-red-200",
  yellow: "border border-transparent bg-amber-100 text-amber-700 hover:bg-amber-200",
  light: "border border-slate-100 bg-white text-slate-500 hover:bg-slate-50"
};

const linkToneClasses: Record<ButtonTone, string> = {
  dark: "border border-transparent bg-transparent text-slate-900 hover:text-slate-700 hover:underline",
  gray: "border border-transparent bg-transparent text-slate-600 hover:text-slate-700 hover:underline",
  green: "border border-transparent bg-transparent text-teal-700 hover:text-teal-800 hover:underline",
  blue: "border border-transparent bg-transparent text-blue-700 hover:text-blue-800 hover:underline",
  red: "border border-transparent bg-transparent text-red-600 hover:text-red-700 hover:underline",
  yellow: "border border-transparent bg-transparent text-amber-700 hover:text-amber-800 hover:underline",
  light: "border border-transparent bg-transparent text-slate-400 hover:text-slate-500 hover:underline"
};

const whiteToneClasses: Record<ButtonTone, string> = {
  dark: "border border-slate-200 bg-white text-slate-900 hover:bg-slate-50",
  gray: "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50",
  green: "border border-slate-200 bg-white text-teal-700 hover:bg-slate-50",
  blue: "border border-slate-200 bg-white text-blue-700 hover:bg-slate-50",
  red: "border border-slate-200 bg-white text-red-600 hover:bg-slate-50",
  yellow: "border border-slate-200 bg-white text-amber-700 hover:bg-slate-50",
  light: "border border-slate-100 bg-white text-slate-400 hover:bg-slate-50"
};

const themeToneClasses: Record<ResolvedButtonStyle, string> = {
  solid: "border border-transparent bg-primary text-primary-foreground hover:opacity-95",
  outline: "border border-primary bg-transparent text-primary hover:bg-primary-soft",
  ghost: "border border-transparent bg-transparent text-primary hover:bg-primary-soft",
  soft: "border border-transparent bg-primary-soft text-primary-soft-foreground hover:opacity-90",
  link: "border border-transparent bg-transparent text-primary hover:text-primary hover:underline",
  white: "border border-border bg-card text-primary hover:bg-secondary"
};

const buttonStyleClasses: Record<ResolvedButtonStyle, Record<ButtonTone, string>> = {
  solid: solidToneClasses,
  outline: outlineToneClasses,
  ghost: ghostToneClasses,
  soft: softToneClasses,
  link: linkToneClasses,
  white: whiteToneClasses
};

function resolveButtonStyle(variant: ButtonVariant): {
  style: ResolvedButtonStyle;
  tone: ButtonTone | null;
} {
  switch (variant) {
    case "secondary":
      return { style: "solid", tone: "gray" };
    case "destructive":
      return { style: "solid", tone: "red" };
    case "success":
      return { style: "solid", tone: "green" };
    case "outline":
      return { style: "outline", tone: null };
    case "ghost":
      return { style: "ghost", tone: null };
    case "soft":
      return { style: "soft", tone: null };
    case "link":
      return { style: "link", tone: null };
    case "white":
      return { style: "white", tone: null };
    case "default":
    default:
      return { style: "solid", tone: null };
  }
}

function resolveButtonTone(variant: ButtonVariant, tone?: ButtonTone): {
  style: ResolvedButtonStyle;
  tone: ResolvedButtonTone;
} {
  const resolved = resolveButtonStyle(variant);
  return {
    style: resolved.style,
    tone: resolved.tone ?? tone ?? "theme"
  };
}

function resolveButtonSize(size: ButtonSize, style: ResolvedButtonStyle) {
  if (size === "icon-sm" || size === "icon" || size === "icon-lg") {
    return iconButtonSizeClasses[size];
  }

  if (style === "link") {
    return linkButtonSizeClasses[size];
  }

  return textButtonSizeClasses[size];
}

export function buttonVariants({
  className,
  shape = "default",
  size = "default",
  tone,
  variant = "default"
}: {
  className?: string;
  shape?: ButtonShape | null;
  size?: ButtonSize | null;
  tone?: ButtonTone | null;
  variant?: ButtonVariant | null;
} = {}) {
  const resolvedVariant = variant ?? "default";
  const resolvedSize = size ?? "default";
  const resolvedShape = shape ?? "default";
  const { style, tone: resolvedTone } = resolveButtonTone(resolvedVariant, tone ?? undefined);

  return cn(
    buttonBaseClasses,
    resolveButtonSize(resolvedSize, style),
    buttonShapeClasses[resolvedShape],
    resolvedTone === "theme" ? themeToneClasses[style] : buttonStyleClasses[style][resolvedTone],
    className
  );
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      asChild = false,
      badge,
      children,
      className,
      leading,
      leadingDivider = false,
      shape = "default",
      size = "default",
      tone,
      trailing,
      trailingDivider = false,
      type = "button",
      variant = "default",
      ...props
    },
    ref
  ) => {
    const buttonContent = (childContent: React.ReactNode = children) => (
      <>
        {leading}
        {leading && leadingDivider ? (
          <span aria-hidden="true" className="mx-0.5 h-full w-px self-stretch bg-border" />
        ) : null}
        {childContent}
        {badge}
        {trailing && trailingDivider ? (
          <span aria-hidden="true" className="mx-0.5 h-full w-px self-stretch bg-border" />
        ) : null}
        {trailing}
      </>
    );

    if (asChild) {
      const child = React.Children.only(children) as React.ReactElement<{ children?: React.ReactNode }>;

      return (
        <Slot
          ref={ref}
          className={buttonVariants({ className, shape, size, tone, variant })}
          {...props}
        >
          {React.cloneElement(child, undefined, buttonContent(child.props.children))}
        </Slot>
      );
    }

    return (
      <button
        ref={ref}
        className={buttonVariants({ className, shape, size, tone, variant })}
        type={type}
        {...props}
      >
        {buttonContent()}
      </button>
    );
  }
);

Button.displayName = "Button";
