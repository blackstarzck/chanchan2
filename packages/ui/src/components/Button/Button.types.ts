import type * as React from "react";

export const buttonVariantNames = [
  "default",
  "secondary",
  "outline",
  "ghost",
  "destructive",
  "success",
  "soft",
  "link",
  "white"
] as const;

export const buttonToneNames = [
  "dark",
  "gray",
  "green",
  "blue",
  "red",
  "yellow",
  "light"
] as const;

export const buttonSizeNames = [
  "sm",
  "default",
  "lg",
  "icon-sm",
  "icon",
  "icon-lg"
] as const;

export const buttonShapeNames = ["default", "pill"] as const;

export type ButtonVariant = (typeof buttonVariantNames)[number];
export type ButtonTone = (typeof buttonToneNames)[number];
export type ButtonSize = (typeof buttonSizeNames)[number];
export type ButtonShape = (typeof buttonShapeNames)[number];

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  badge?: React.ReactNode;
  leading?: React.ReactNode;
  leadingDivider?: boolean;
  shape?: ButtonShape;
  size?: ButtonSize;
  tone?: ButtonTone;
  trailing?: React.ReactNode;
  trailingDivider?: boolean;
  variant?: ButtonVariant;
}
