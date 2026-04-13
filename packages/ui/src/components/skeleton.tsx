import { cn } from "../lib/cn";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  animate?: boolean;
  shape?: "rounded" | "pill" | "circle";
}

const skeletonShapeClasses: Record<NonNullable<SkeletonProps["shape"]>, string> = {
  rounded: "rounded-lg",
  pill: "rounded-full",
  circle: "rounded-full"
};

function Skeleton({ animate = true, className, shape = "rounded", ...props }: SkeletonProps) {
  return (
    <div
      className={cn("bg-secondary/90", animate && "animate-pulse", skeletonShapeClasses[shape], className)}
      {...props}
    />
  );
}

export { Skeleton };

