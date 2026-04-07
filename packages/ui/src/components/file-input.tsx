import * as React from "react";

import { cn } from "../lib/cn";

function formatFileSize(size: number) {
  if (size >= 1024 * 1024) {
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  }

  if (size >= 1024) {
    return `${Math.round(size / 1024)} KB`;
  }

  return `${size} B`;
}

export interface FileInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "type"> {
  label?: string;
  description?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onFilesChange?: (files: File[]) => void;
}

const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  ({ className, description, id, label, multiple, onChange, onFilesChange, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;
    const [files, setFiles] = React.useState<File[]>([]);

    return (
      <div className="grid gap-3">
        {label ? <label htmlFor={inputId} className="text-sm font-medium text-foreground">{label}</label> : null}
        <input
          ref={ref}
          id={inputId}
          type="file"
          multiple={multiple}
          className={cn(
            "block w-full rounded-lg border border-dashed border-input bg-background px-4 py-4 text-sm text-foreground file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-3 file:py-2 file:text-sm file:font-medium file:text-primary-foreground hover:file:bg-primary/90",
            className
          )}
          onChange={(event) => {
            const nextFiles = Array.from(event.target.files ?? []);
            setFiles(nextFiles);
            onFilesChange?.(nextFiles);
            onChange?.(event);
          }}
          {...props}
        />
        {description ? <p className="text-xs text-muted-foreground">{description}</p> : null}
        {files.length ? (
          <div className="grid gap-2 rounded-xl border border-border bg-secondary/40 p-3">
            {files.map((file) => (
              <div key={`${file.name}-${file.lastModified}`} className="flex items-center justify-between gap-3 text-sm">
                <span className="truncate font-medium text-foreground">{file.name}</span>
                <span className="shrink-0 text-muted-foreground">{formatFileSize(file.size)}</span>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    );
  }
);

FileInput.displayName = "FileInput";

export { FileInput, formatFileSize };
