import type * as React from "react";

export type CardAlign = "start" | "center";

export interface CardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  actions?: React.ReactNode;
  align?: CardAlign;
  cover?: React.ReactNode;
  extra?: React.ReactNode;
  footer?: React.ReactNode;
  header?: React.ReactNode;
  subtitle?: React.ReactNode;
  title?: React.ReactNode;
}

export type CardHeaderProps = React.HTMLAttributes<HTMLDivElement>;
export type CardTitleProps = React.HTMLAttributes<HTMLHeadingElement>;
export type CardDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;
export type CardImageProps = React.HTMLAttributes<HTMLDivElement>;
export type CardContentProps = React.HTMLAttributes<HTMLDivElement>;
export type CardFooterProps = React.HTMLAttributes<HTMLDivElement>;
