"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import "@/components/ui/kakao/styles/kakao.css";

interface QuickReaction {
  id: string;
  emoji: React.ReactNode;
  label: string;
}

/** KakaoTalk's six one-tap reactions, as Unicode stand-ins for Kakao's own art. */
const DEFAULT_QUICK_REACTIONS: QuickReaction[] = [
  { id: "heart", emoji: "❤️", label: "하트" },
  { id: "like", emoji: "👍", label: "좋아요" },
  { id: "check", emoji: "✅", label: "체크" },
  { id: "laugh", emoji: "😆", label: "웃음" },
  { id: "wow", emoji: "😮", label: "놀람" },
  { id: "sad", emoji: "😢", label: "슬픔" },
];

interface MessageAction {
  id: string;
  label: string;
  icon?: React.ReactNode;
  /** Red label and icon, e.g. 삭제. */
  destructive?: boolean;
  disabled?: boolean;
}

interface MessageActionsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  /** One-tap reactions in the card above the menu (device shows six). */
  reactions?: QuickReaction[];
  onReact?: (id: string) => void;
  actions: MessageAction[];
  onSelect?: (id: string) => void;
  /** Escape key. */
  onClose?: () => void;
}

/**
 * The long-press menu: a quick-reaction card over a list of actions
 * (복사 · 답장 · 공유 · … · 삭제). Presentational — position it under the
 * pressed bubble (`<ChatBubble pressed>`) yourself; the chat behind is not dimmed.
 */
const MessageActions = React.forwardRef<HTMLDivElement, MessageActionsProps>(
  ({ className, reactions, onReact, actions, onSelect, onClose, onKeyDown, ...props }, ref) => {
    const listRef = React.useRef<HTMLDivElement>(null);

    const moveFocus = (delta: number) => {
      const items = [...(listRef.current?.querySelectorAll<HTMLButtonElement>("[role=menuitem]:not(:disabled)") ?? [])];
      if (!items.length) return;
      const i = items.indexOf(document.activeElement as HTMLButtonElement);
      items[(i + delta + items.length) % items.length].focus();
    };

    return (
      <div
        ref={ref}
        className={cn("font-kk flex w-[300px] max-w-full flex-col gap-[5px]", className)}
        onKeyDown={(e) => {
          onKeyDown?.(e);
          if (e.key === "Escape") onClose?.();
          if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            e.preventDefault();
            moveFocus(e.key === "ArrowDown" ? 1 : -1);
          }
        }}
        {...props}
      >
        {reactions && reactions.length > 0 && (
          <div
            role="group"
            aria-label="리액션"
            className="flex h-[50px] items-center justify-between rounded-[16px] bg-kk-menu-bg px-[16px] shadow-[var(--kk-menu-shadow)]"
          >
            {reactions.map((r) => (
              <button
                key={r.id}
                type="button"
                aria-label={r.label}
                onClick={() => onReact?.(r.id)}
                className="flex size-[30px] items-center justify-center rounded-full text-[25px] leading-none outline-none transition-transform active:scale-90 focus-visible:ring-2 focus-visible:ring-kk-text-link"
              >
                <span aria-hidden="true">{r.emoji}</span>
              </button>
            ))}
          </div>
        )}

        <div
          ref={listRef}
          role="menu"
          aria-label="메시지 메뉴"
          className="overflow-hidden rounded-[16px] bg-kk-menu-bg shadow-[var(--kk-menu-shadow)]"
        >
          {actions.map((a, i) => (
            <button
              key={a.id}
              type="button"
              role="menuitem"
              disabled={a.disabled}
              onClick={() => onSelect?.(a.id)}
              className={cn(
                "flex h-[45px] w-full items-center justify-between px-[16px] text-left text-[17px] tracking-[-0.01em] outline-none",
                "hover:bg-kk-menu-pressed active:bg-kk-menu-pressed focus-visible:bg-kk-menu-pressed disabled:opacity-40",
                i > 0 && "border-t border-kk-menu-divider",
                a.destructive ? "text-kk-menu-destructive" : "text-kk-menu-fg"
              )}
            >
              <span>{a.label}</span>
              {a.icon && (
                <span aria-hidden="true" className="flex size-[22px] items-center justify-center">
                  {a.icon}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    );
  }
);
MessageActions.displayName = "MessageActions";

export { MessageActions, DEFAULT_QUICK_REACTIONS, type MessageActionsProps, type MessageAction, type QuickReaction };
