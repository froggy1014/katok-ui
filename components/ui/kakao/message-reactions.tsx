"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { SmilePlusIcon } from "./icons";
import "@/components/ui/kakao/styles/kakao.css";

interface Reaction {
  id: string;
  /** A Unicode emoji, or your own image/node. */
  emoji: React.ReactNode;
  /** Accessible name, e.g. "하트". */
  label: string;
  count: number;
  /** The viewer added this one. */
  selected?: boolean;
}

interface MessageReactionsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onToggle"> {
  reactions: Reaction[];
  onToggle?: (id: string) => void;
  /** Shows the trailing smiley-plus chip that opens the reaction picker. */
  onAdd?: () => void;
}

/**
 * Reaction chips under a bubble (KakaoTalk 26.4+: up to 30 per message).
 * Pass it to `<ChatBubble reactions={…}>` so it lines up with the bubble.
 */
const MessageReactions = React.forwardRef<HTMLDivElement, MessageReactionsProps>(
  ({ className, reactions, onToggle, onAdd, ...props }, ref) => (
    <div
      ref={ref}
      role="group"
      aria-label="리액션"
      className={cn("font-kk flex max-w-[85%] flex-wrap gap-x-[4px] gap-y-[8px]", className)}
      {...props}
    >
      {reactions.map((r) => (
        <button
          key={r.id}
          type="button"
          aria-pressed={!!r.selected}
          aria-label={`${r.label} ${r.count}`}
          onClick={() => onToggle?.(r.id)}
          className={cn(
            "flex h-[24px] items-center gap-[3px] rounded-full pl-[5px] pr-[7px] text-kk-reaction-fg outline-none transition-colors focus-visible:ring-2 focus-visible:ring-kk-text-link",
            r.selected ? "bg-kk-reaction-selected-bg" : "bg-kk-reaction-bg"
          )}
        >
          <span aria-hidden="true" className="flex size-[17px] items-center justify-center text-[15px] leading-none">
            {r.emoji}
          </span>
          <span aria-hidden="true" className="text-[12px] font-medium leading-none tabular-nums">
            {r.count > 999 ? "999+" : r.count}
          </span>
        </button>
      ))}
      {onAdd && (
        <button
          type="button"
          aria-label="리액션 추가"
          onClick={onAdd}
          className="flex h-[24px] w-[30px] items-center justify-center rounded-full bg-kk-reaction-bg text-kk-reaction-fg outline-none focus-visible:ring-2 focus-visible:ring-kk-text-link"
        >
          <SmilePlusIcon size={16} strokeWidth={1.8} />
        </button>
      )}
    </div>
  )
);
MessageReactions.displayName = "MessageReactions";

export { MessageReactions, type MessageReactionsProps, type Reaction };
