import * as React from "react";

import { cn } from "../lib/cn";

export interface PinInputProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: string;
  defaultValue?: string;
  length?: number;
  mode?: "numeric" | "alphanumeric";
  onValueChange?: (value: string) => void;
  inputClassName?: string;
  disabled?: boolean;
}

function sanitizePinValue(value: string, mode: PinInputProps["mode"]) {
  const normalized = mode === "numeric" ? value.replace(/\D/g, "") : value;
  return normalized.slice(0, 1);
}

function PinInput({
  className,
  defaultValue = "",
  disabled = false,
  inputClassName,
  length = 6,
  mode = "numeric",
  onValueChange,
  value,
  ...props
}: PinInputProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue.slice(0, length));
  const refs = React.useRef<Array<HTMLInputElement | null>>([]);
  const currentValue = (value ?? internalValue).slice(0, length);
  const values = Array.from({ length }, (_, index) => currentValue[index] ?? "");

  const updateValue = (nextValue: string) => {
    const normalized = nextValue.slice(0, length);

    if (value === undefined) {
      setInternalValue(normalized);
    }

    onValueChange?.(normalized);
  };

  return (
    <div className={cn("flex flex-wrap gap-2", className)} {...props}>
      {values.map((digit, index) => (
        <input
          key={index}
          ref={(node) => {
            refs.current[index] = node;
          }}
          type="text"
          inputMode={mode === "numeric" ? "numeric" : "text"}
          autoComplete={index === 0 ? "one-time-code" : "off"}
          maxLength={1}
          disabled={disabled}
          className={cn(
            "flex size-11 items-center justify-center rounded-lg border border-input bg-background text-center text-lg font-semibold text-foreground shadow-xs outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
            inputClassName
          )}
          value={digit}
          onChange={(event) => {
            const nextDigit = sanitizePinValue(event.target.value, mode);
            const nextValues = [...values];
            nextValues[index] = nextDigit;
            updateValue(nextValues.join(""));

            if (nextDigit && index < length - 1) {
              refs.current[index + 1]?.focus();
            }
          }}
          onKeyDown={(event) => {
            if (event.key === "Backspace" && !values[index] && index > 0) {
              refs.current[index - 1]?.focus();
            }

            if (event.key === "ArrowLeft" && index > 0) {
              refs.current[index - 1]?.focus();
            }

            if (event.key === "ArrowRight" && index < length - 1) {
              refs.current[index + 1]?.focus();
            }
          }}
          onPaste={(event) => {
            event.preventDefault();
            const pasted = event.clipboardData.getData("text").slice(0, length - index);
            const nextValues = [...values];

            pasted.split("").forEach((char, pasteIndex) => {
              nextValues[index + pasteIndex] = sanitizePinValue(char, mode);
            });

            updateValue(nextValues.join(""));
            refs.current[Math.min(index + pasted.length, length - 1)]?.focus();
          }}
        />
      ))}
    </div>
  );
}

export { PinInput };
