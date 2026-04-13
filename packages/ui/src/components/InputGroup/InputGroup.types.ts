import type * as React from "react";

import type { InputShape, InputSize, InputStatus, InputVariant } from "../Input";

export interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  shape?: InputShape;
  size?: InputSize;
  status?: InputStatus;
  variant?: InputVariant;
}

export type InputGroupRootProps = React.HTMLAttributes<HTMLDivElement>;
export type InputGroupLabelRowProps = React.HTMLAttributes<HTMLDivElement>;
export type InputGroupLabelProps = React.HTMLAttributes<HTMLParagraphElement>;
export type InputGroupSecondaryProps = React.HTMLAttributes<HTMLParagraphElement>;
export type InputGroupMessageProps = React.HTMLAttributes<HTMLParagraphElement>;

export interface InputGroupAddonProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: "start" | "end";
}

export interface InputGroupFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  shape?: InputShape;
  size?: InputSize;
  status?: InputStatus;
  variant?: InputVariant;
}
