import * as React from "react";
import { Minus, Plus } from "lucide-react";

import { cn } from "../lib/cn";

function clampValue(value: number, min?: number, max?: number) {
  let nextValue = value;

  if (typeof min === "number") {
    nextValue = Math.max(min, nextValue);
  }

  if (typeof max === "number") {
    nextValue = Math.min(max, nextValue);
  }

  return nextValue;
}

export interface NumberFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "defaultValue" | "onChange" | "type" | "value"> {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onValueChange?: (value: number) => void;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const NumberField = React.forwardRef<HTMLInputElement, NumberFieldProps>(
  ({ className, defaultValue, disabled, max, min, onChange, onValueChange, step = 1, value, ...props }, ref) => {
    const [internalValue, setInternalValue] = React.useState(
      defaultValue === undefined ? "" : String(defaultValue)
    );
    const isControlled = value !== undefined;
    const inputValue = isControlled ? String(value) : internalValue;
    const stepValue = typeof step === "number" ? step : Number(step) || 1;

    const updateValue = (nextValue: string) => {
      if (!isControlled) {
        setInternalValue(nextValue);
      }

      const numericValue = Number(nextValue);

      if (nextValue !== "" && Number.isFinite(numericValue)) {
        onValueChange?.(clampValue(numericValue, min, max));
      }
    };

    const nudgeValue = (direction: 1 | -1) => {
      const baseline = inputValue === "" ? 0 : Number(inputValue);
      const nextValue = clampValue(baseline + stepValue * direction, min, max);
      updateValue(String(nextValue));
    };

    return (
      <div
        className={cn(
          "flex h-10 w-full items-center overflow-hidden rounded-md border border-input bg-background shadow-xs transition-colors focus-within:ring-2 focus-within:ring-primary/30 focus-within:ring-offset-2 focus-within:ring-offset-background",
          disabled && "cursor-not-allowed opacity-50",
          className
        )}
      >
        <button
          type="button"
          className="inline-flex h-full w-10 items-center justify-center border-r border-border text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground disabled:pointer-events-none"
          onClick={() => nudgeValue(-1)}
          disabled={disabled}
        >
          <Minus className="size-4" />
          <span className="sr-only">Decrease value</span>
        </button>

        <input
          ref={ref}
          type="number"
          inputMode="decimal"
          className="h-full w-full bg-transparent px-3 text-center text-sm text-foreground outline-none"
          value={inputValue}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          onChange={(event) => {
            onChange?.(event);
            updateValue(event.target.value);
          }}
          onBlur={(event) => {
            props.onBlur?.(event);

            if (event.target.value === "") {
              return;
            }

            const normalized = String(clampValue(Number(event.target.value), min, max));
            updateValue(normalized);
          }}
          {...props}
        />

        <button
          type="button"
          className="inline-flex h-full w-10 items-center justify-center border-l border-border text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground disabled:pointer-events-none"
          onClick={() => nudgeValue(1)}
          disabled={disabled}
        >
          <Plus className="size-4" />
          <span className="sr-only">Increase value</span>
        </button>
      </div>
    );
  }
);

NumberField.displayName = "NumberField";

export { NumberField };
