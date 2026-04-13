import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "../../lib/cn";
import type {
  NavsFill,
  NavsLinkProps,
  NavsLinkState,
  NavsOrientation,
  NavsProps,
  NavsVariant
} from "./Navs.types";

type ResolvedNavsLinkState = NavsLinkState | "active" | "disabled";

type NavsContextValue = {
  fill: NavsFill;
  orientation: NavsOrientation;
  variant: NavsVariant;
};

const navsContext = React.createContext<NavsContextValue>({
  fill: "fit",
  orientation: "horizontal",
  variant: "default"
});

const navsLinkFocusClasses =
  "outline-none transition-[color,background-color,border-color,opacity,box-shadow] duration-200 focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

function navsRootClasses({
  fill,
  orientation,
  variant
}: Required<Pick<NavsProps, "fill" | "orientation" | "variant">>) {
  if (variant === "bordered") {
    if (orientation === "vertical") {
      return cn("flex flex-col items-stretch gap-2 border-l-2 border-border", fill === "equal" && "w-full");
    }

    return cn(
      "relative flex items-start gap-2.5 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-border",
      fill === "equal" && "w-full"
    );
  }

  if (orientation === "vertical") {
    return "flex flex-col items-stretch gap-1";
  }

  return cn("flex items-center gap-1", fill === "fit" && "flex-wrap", fill === "equal" && "w-full");
}

function Navs({
  children,
  className,
  fill = "fit",
  orientation = "horizontal",
  variant = "default",
  ...props
}: NavsProps) {
  const value = React.useMemo(
    () => ({
      fill,
      orientation,
      variant
    }),
    [fill, orientation, variant]
  );

  return (
    <navsContext.Provider value={value}>
      <nav className={cn(navsRootClasses({ fill, orientation, variant }), className)} {...props}>
        {children}
      </nav>
    </navsContext.Provider>
  );
}

function resolveNavsLinkState({
  active,
  disabled,
  state
}: Pick<NavsLinkProps, "active" | "disabled" | "state">): ResolvedNavsLinkState {
  if (disabled) {
    return "disabled";
  }

  if (active) {
    return "active";
  }

  return state ?? "default";
}

function navsLinkClasses({
  fill,
  orientation,
  state,
  variant
}: {
  fill: NavsFill;
  orientation: NavsOrientation;
  state: ResolvedNavsLinkState;
  variant: NavsVariant;
}) {
  if (variant === "bordered") {
    return {
      indicator: cn("relative z-10 h-0.5 w-full shrink-0", state === "active" ? "bg-[#1d4ed8]" : "bg-border"),
      inner: "relative flex shrink-0 items-center justify-center gap-2 px-3 py-2",
      root: cn(
        "relative flex min-w-0 flex-col items-center justify-center rounded-lg",
        navsLinkFocusClasses,
        orientation === "horizontal" && fill === "equal" && "flex-1 basis-0 self-stretch",
        orientation === "vertical" && "items-start",
        state === "disabled" && "pointer-events-none opacity-50"
      ),
      text: cn(
        "text-sm font-medium leading-5 tracking-[0.07px]",
        state === "active" && "text-[#2563eb]",
        state === "hover" && "text-[#1d4ed8]",
        state === "default" && "text-foreground hover:text-[#1d4ed8]",
        state === "disabled" && "text-foreground"
      )
    };
  }

  return {
    indicator: "",
    inner: "",
    root: cn(
      "inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium",
      navsLinkFocusClasses,
      orientation === "vertical" && "w-full justify-start",
      fill === "equal" && "w-full flex-1",
      state === "active" && "bg-secondary text-foreground",
      state !== "active" && "text-muted-foreground hover:text-foreground",
      state === "disabled" && "pointer-events-none opacity-50"
    ),
    text: ""
  };
}

function NavsLink({
  active,
  asChild = false,
  children,
  className,
  disabled = false,
  fill,
  orientation,
  state,
  variant,
  ...props
}: NavsLinkProps) {
  const context = React.useContext(navsContext);
  const Comp = asChild ? Slot : "a";
  const resolvedFill = fill ?? context.fill;
  const resolvedOrientation = orientation ?? context.orientation;
  const resolvedVariant = variant ?? context.variant;
  const resolvedState = resolveNavsLinkState({ active, disabled, state });
  const classes = navsLinkClasses({
    fill: resolvedFill,
    orientation: resolvedOrientation,
    state: resolvedState,
    variant: resolvedVariant
  });
  const linkProps = {
    ...props,
    ...(active ? { "aria-current": "page" as const } : {}),
    ...(disabled ? { "aria-disabled": true, tabIndex: -1 as const } : {})
  };

  if (resolvedVariant === "bordered") {
    return (
      <Comp className={cn(classes.root, className)} data-state={resolvedState} {...linkProps}>
        <span className={cn(classes.inner, classes.text)}>{children}</span>
        <span aria-hidden="true" className={classes.indicator} />
      </Comp>
    );
  }

  return (
    <Comp
      className={cn(classes.root, className)}
      data-state={resolvedState}
      {...linkProps}
    >
      {children}
    </Comp>
  );
}

export { Navs, NavsLink };
