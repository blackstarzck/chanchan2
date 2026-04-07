import * as React from "react";
import { CalendarDays } from "lucide-react";

import { cn } from "../lib/cn";

export interface DatePickerProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
}

const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(
  ({ className, label, description, id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;

    return (
      <div className="grid gap-2">
        {label ? <label htmlFor={inputId} className="text-sm font-medium text-foreground">{label}</label> : null}
        <div className="relative">
          <CalendarDays className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            ref={ref}
            id={inputId}
            type="date"
            className={cn(
              "flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm text-foreground shadow-xs transition-colors outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
              className
            )}
            {...props}
          />
        </div>
        {description ? <p className="text-xs text-muted-foreground">{description}</p> : null}
      </div>
    );
  }
);

DatePicker.displayName = "DatePicker";

export { DatePicker };
