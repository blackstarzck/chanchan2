import * as React from "react";
import { UploadCloud } from "lucide-react";

import { Button } from "./button";
import { cn } from "../lib/cn";

export interface DropzoneProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "type"> {
  title?: string;
  description?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onFilesChange?: (files: File[]) => void;
}

function Dropzone({
  className,
  description = "Drag files here or browse from your device.",
  disabled = false,
  multiple = true,
  onChange,
  onFilesChange,
  title = "Upload files",
  ...props
}: DropzoneProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [files, setFiles] = React.useState<File[]>([]);

  const updateFiles = (fileList: FileList | null) => {
    const nextFiles = Array.from(fileList ?? []);
    setFiles(nextFiles);
    onFilesChange?.(nextFiles);
  };

  return (
    <div className="grid gap-3">
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        className={cn(
          "grid gap-4 rounded-[calc(var(--cc-radius-xl)+4px)] border border-dashed border-input bg-card p-6 text-center transition-colors",
          isDragging ? "border-primary bg-primary-soft/40" : "hover:border-primary/40 hover:bg-secondary/30",
          disabled && "pointer-events-none opacity-50",
          className
        )}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragEnter={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={(event) => {
          event.preventDefault();
          setIsDragging(false);
        }}
        onDragOver={(event) => {
          event.preventDefault();
          event.dataTransfer.dropEffect = "copy";
        }}
        onDrop={(event) => {
          event.preventDefault();
          setIsDragging(false);
          updateFiles(event.dataTransfer.files);
        }}
      >
        <div className="mx-auto inline-flex size-12 items-center justify-center rounded-full bg-primary-soft text-primary-soft-foreground">
          <UploadCloud className="size-5" />
        </div>
        <div className="space-y-1">
          <h3 className="text-base font-semibold text-card-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <div className="flex justify-center">
          <Button variant="outline" size="sm">Choose files</Button>
        </div>
        <input
          ref={inputRef}
          type="file"
          className="sr-only"
          disabled={disabled}
          multiple={multiple}
          onChange={(event) => {
            updateFiles(event.target.files);
            onChange?.(event);
          }}
          {...props}
        />
      </div>

      {files.length ? (
        <div className="grid gap-2 rounded-xl border border-border bg-secondary/40 p-3">
          {files.map((file) => (
            <div key={`${file.name}-${file.lastModified}`} className="truncate text-sm text-foreground">
              {file.name}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export { Dropzone };
