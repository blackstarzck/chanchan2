import * as React from "react";
import { Eye, EyeOff } from "lucide-react";

import { cn } from "../lib/cn";
import { Input, type InputProps } from "./Input";

type PasswordStrength = {
  label: "Very weak" | "Weak" | "Fair" | "Good" | "Strong";
  score: number;
};

function getPasswordStrength(password: string): PasswordStrength {
  let score = 0;

  if (password.length >= 8) {
    score += 1;
  }

  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) {
    score += 1;
  }

  if (/\d/.test(password)) {
    score += 1;
  }

  if (/[^A-Za-z0-9]/.test(password)) {
    score += 1;
  }

  if (password.length >= 14) {
    score += 1;
  }

  const labels: PasswordStrength["label"][] = [
    "Very weak",
    "Weak",
    "Fair",
    "Good",
    "Strong"
  ];

  return {
    label: labels[Math.min(score, labels.length - 1)],
    score: Math.min(score, labels.length - 1)
  };
}

export interface PasswordFieldProps extends Omit<InputProps, "type"> {
  showStrength?: boolean;
}

const PasswordField = React.forwardRef<HTMLInputElement, PasswordFieldProps>(
  ({ className, defaultValue, onChange, showStrength = true, value, ...props }, ref) => {
    const [visible, setVisible] = React.useState(false);
    const [internalValue, setInternalValue] = React.useState(String(defaultValue ?? ""));
    const currentValue = typeof value === "string" ? value : internalValue;
    const strength = getPasswordStrength(currentValue);
    const progressWidth = `${((strength.score + 1) / 5) * 100}%`;
    const progressTone =
      strength.score >= 4
        ? "bg-success"
        : strength.score >= 2
          ? "bg-primary"
          : "bg-destructive";

    return (
      <div className="grid gap-2">
        <div className="relative">
          <Input
            ref={ref}
            type={visible ? "text" : "password"}
            value={value}
            defaultValue={defaultValue}
            className={cn("pr-12", className)}
            onChange={(event) => {
              if (typeof value !== "string") {
                setInternalValue(event.target.value);
              }

              onChange?.(event);
            }}
            {...props}
          />
          <button
            type="button"
            className="absolute right-2 top-1/2 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            onClick={() => setVisible((current) => !current)}
          >
            {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            <span className="sr-only">{visible ? "Hide password" : "Show password"}</span>
          </button>
        </div>

        {showStrength ? (
          <div className="grid gap-2">
            <div className="h-2 overflow-hidden rounded-full bg-secondary">
              <div className={cn("h-full rounded-full transition-all", progressTone)} style={{ width: progressWidth }} />
            </div>
            <p className="text-xs text-muted-foreground">Password strength: {strength.label}</p>
          </div>
        ) : null}
      </div>
    );
  }
);

PasswordField.displayName = "PasswordField";

export { PasswordField, getPasswordStrength };
