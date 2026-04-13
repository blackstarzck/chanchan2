import type * as React from "react";

export const inputVariantNames = ["bordered", "gray", "underline"] as const;
export const inputSizeNames = ["sm", "default", "lg"] as const;
export const inputShapeNames = ["rounded", "pill", "none"] as const;
export const inputStatusNames = ["default", "invalid", "success"] as const;

export type InputVariant = (typeof inputVariantNames)[number];
export type InputSize = (typeof inputSizeNames)[number];
export type InputShape = (typeof inputShapeNames)[number];
export type InputStatus = (typeof inputStatusNames)[number];

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  shape?: InputShape;
  size?: InputSize;
  status?: InputStatus;
  variant?: InputVariant;
}
