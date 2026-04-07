import * as React from "react";

import { Badge } from "./badge";
import { Progress } from "./progress";
import { Spinner } from "./spinner";
import { cn } from "../lib/cn";

type UploadStatus = "queued" | "uploading" | "completed" | "failed";

export interface UploadEntry {
  id?: string;
  name: string;
  progress: number;
  sizeLabel?: string;
  status?: UploadStatus;
}

function statusBadgeVariant(status: UploadStatus) {
  switch (status) {
    case "completed":
      return "success";
    case "failed":
      return "destructive";
    default:
      return "secondary";
  }
}

function statusLabel(status: UploadStatus) {
  switch (status) {
    case "completed":
      return "completed";
    case "failed":
      return "failed";
    case "queued":
      return "queued";
    default:
      return "uploading";
  }
}

export interface UploadListProps extends React.HTMLAttributes<HTMLDivElement> {
  items: UploadEntry[];
}

function UploadList({ className, items, ...props }: UploadListProps) {
  return (
    <div className={cn("grid gap-3", className)} {...props}>
      {items.map((item) => (
        <UploadItem key={item.id ?? item.name} item={item} />
      ))}
    </div>
  );
}

function UploadItem({ item, className, ...props }: React.HTMLAttributes<HTMLDivElement> & { item: UploadEntry }) {
  const status = item.status ?? "uploading";

  return (
    <div className={cn("grid gap-3 rounded-xl border border-border bg-card p-4", className)} {...props}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 space-y-1">
          <p className="truncate text-sm font-medium text-card-foreground">{item.name}</p>
          <p className="text-xs text-muted-foreground">{item.sizeLabel ?? `${item.progress}% uploaded`}</p>
        </div>
        <div className="flex items-center gap-2">
          {status === "uploading" ? <Spinner size="sm" tone="muted" /> : null}
          <Badge variant={statusBadgeVariant(status)}>{statusLabel(status)}</Badge>
        </div>
      </div>
      <Progress value={item.progress} />
    </div>
  );
}

export { UploadItem, UploadList };
