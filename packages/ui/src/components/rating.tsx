import * as React from "react";
import { Star } from "lucide-react";

import { cn } from "../lib/cn";

export interface RatingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: number;
  defaultValue?: number;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  max?: number;
  readOnly?: boolean;
  onValueChange?: (value: number) => void;
}

function Rating({
  className,
  value,
  defaultValue = 0,
  icon: Icon = Star,
  max = 5,
  readOnly = false,
  onValueChange,
  ...props
}: RatingProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const currentValue = value ?? internalValue;

  const setValue = (nextValue: number) => {
    if (!readOnly && value === undefined) {
      setInternalValue(nextValue);
    }

    if (!readOnly) {
      onValueChange?.(nextValue);
    }
  };

  return (
    <div className={cn("inline-flex items-center", className)} {...props}>
      {Array.from({ length: max }, (_, index) => {
        const isActive = index < currentValue;

        return (
          <button
            key={index}
            type="button"
            disabled={readOnly}
            aria-label={`Rate ${index + 1} out of ${max}`}
            className="inline-flex size-5 items-center justify-center text-slate-300 transition-colors hover:text-primary disabled:pointer-events-none"
            onClick={() => setValue(index + 1)}
          >
            <Icon
              className={cn(
                "size-5",
                isActive ? "fill-current text-primary" : "text-slate-300"
              )}
            />
          </button>
        );
      })}
    </div>
  );
}

export { Rating };
