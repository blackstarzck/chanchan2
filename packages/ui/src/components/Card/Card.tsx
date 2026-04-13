import * as React from "react";

import { cn } from "../../lib/cn";
import type {
  CardAlign,
  CardContentProps,
  CardDescriptionProps,
  CardFooterProps,
  CardHeaderProps,
  CardImageProps,
  CardProps,
  CardTitleProps
} from "./Card.types";

function resolveContentAlignment(align: CardAlign) {
  return align === "center" ? "items-center text-center" : "";
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      actions,
      align = "start",
      children,
      className,
      cover,
      extra,
      footer,
      header,
      subtitle,
      title,
      ...props
    },
    ref
  ) => {
    const usesStructuredProps =
      header !== undefined ||
      extra !== undefined ||
      cover !== undefined ||
      title !== undefined ||
      subtitle !== undefined ||
      actions !== undefined ||
      footer !== undefined ||
      align !== "start";

    const hasBodyContent =
      title !== undefined || subtitle !== undefined || children !== undefined || actions !== undefined;

    return (
      <div
        ref={ref}
        className={cn(
          "overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-[0_1px_1px_0_rgba(0,0,0,0.05)]",
          className
        )}
        {...props}
      >
        {usesStructuredProps ? (
          <>
            {header !== undefined || extra !== undefined ? (
              <CardHeader className={cn(extra !== undefined && "flex-row items-center justify-between gap-4")}>
                {header !== undefined ? <div className="min-w-0 flex-1">{header}</div> : null}
                {extra !== undefined ? (
                  <div className={cn("shrink-0", header === undefined && "ml-auto")}>{extra}</div>
                ) : null}
              </CardHeader>
            ) : null}
            {cover !== undefined ? <CardImage>{cover}</CardImage> : null}
            {hasBodyContent ? (
              <CardContent className={resolveContentAlignment(align)}>
                {title !== undefined || subtitle !== undefined ? (
                  <div className={cn("w-full space-y-1", align === "center" && "text-center")}>
                    {title !== undefined ? <CardTitle>{title}</CardTitle> : null}
                    {subtitle !== undefined ? <CardDescription>{subtitle}</CardDescription> : null}
                  </div>
                ) : null}
                {children}
                {actions !== undefined ? (
                  <div
                    className={cn(
                      "flex flex-wrap gap-[10px] pt-[10px]",
                      align === "center" && "justify-center"
                    )}
                  >
                    {actions}
                  </div>
                ) : null}
              </CardContent>
            ) : null}
            {footer !== undefined ? <CardFooter>{footer}</CardFooter> : null}
          </>
        ) : (
          children
        )}
      </div>
    );
  }
);

Card.displayName = "Card";

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col gap-2.5 border-b border-border bg-muted px-5 py-5", className)}
      {...props}
    />
  )
);

CardHeader.displayName = "CardHeader";

export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn("text-lg font-semibold tracking-[0.09px] text-foreground", className)} {...props} />
  )
);

CardTitle.displayName = "CardTitle";

export const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm font-semibold uppercase tracking-[0.07px] text-muted-foreground", className)}
      {...props}
    />
  )
);

CardDescription.displayName = "CardDescription";

export const CardImage = React.forwardRef<HTMLDivElement, CardImageProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("relative h-[200px] w-full shrink-0 overflow-hidden", className)} {...props} />
  )
);

CardImage.displayName = "CardImage";

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col gap-4 px-5 py-5", className)} {...props} />
  )
);

CardContent.displayName = "CardContent";

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex min-h-[60px] items-start gap-3 border-t border-border bg-muted px-5 py-5 text-sm font-medium tracking-[0.07px] text-muted-foreground",
        className
      )}
      {...props}
    />
  )
);

CardFooter.displayName = "CardFooter";
