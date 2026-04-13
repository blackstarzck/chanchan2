import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/cn";

function ChatThread({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("grid gap-3", className)} {...props} />;
}

const chatBubbleVariants = cva("max-w-[min(32rem,85%)] rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm", {
  variants: {
    side: {
      start: "justify-self-start rounded-bl-md",
      end: "justify-self-end rounded-br-md"
    },
    tone: {
      default: "border border-border bg-card text-card-foreground",
      muted: "bg-muted text-muted-foreground",
      primary: "bg-primary text-primary-foreground"
    }
  },
  defaultVariants: {
    side: "start",
    tone: "default"
  }
});

export interface ChatBubbleProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chatBubbleVariants> {
  meta?: React.ReactNode;
}

function ChatBubble({ children, className, meta, side, tone, ...props }: ChatBubbleProps) {
  return (
    <div className={cn("grid gap-1", side === "end" && "justify-items-end")}>
      {meta ? <div className="px-1 text-xs font-medium text-muted-foreground">{meta}</div> : null}
      <div className={cn(chatBubbleVariants({ side, tone }), className)} {...props}>
        {children}
      </div>
    </div>
  );
}

function ChatBubbleAvatar({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("inline-flex size-8 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground", className)}
      {...props}
    />
  );
}

function ChatBubbleContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("space-y-1", className)} {...props} />;
}

function ChatBubbleMeta({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("text-xs text-muted-foreground", className)} {...props} />;
}

const ChatBubbles = ChatThread;

export { ChatBubble, ChatBubbleAvatar, ChatBubbleContent, ChatBubbleMeta, ChatBubbles, ChatThread };

