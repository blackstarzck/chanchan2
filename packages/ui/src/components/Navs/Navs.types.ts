import type * as React from "react";

export const navsVariantNames = ["default", "bordered"] as const;
export const navsOrientationNames = ["horizontal", "vertical"] as const;
export const navsFillNames = ["fit", "equal"] as const;
export const navsLinkStateNames = ["default", "hover"] as const;

export type NavsVariant = (typeof navsVariantNames)[number];
export type NavsOrientation = (typeof navsOrientationNames)[number];
export type NavsFill = (typeof navsFillNames)[number];
export type NavsLinkState = (typeof navsLinkStateNames)[number];

export interface NavsProps extends React.HTMLAttributes<HTMLElement> {
  fill?: NavsFill;
  orientation?: NavsOrientation;
  variant?: NavsVariant;
}

export interface NavsLinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "disabled"> {
  active?: boolean;
  asChild?: boolean;
  disabled?: boolean;
  fill?: NavsFill;
  orientation?: NavsOrientation;
  state?: NavsLinkState;
  variant?: NavsVariant;
}
