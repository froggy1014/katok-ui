import * as React from "react";
import { cn } from "@/lib/utils";
import "@/components/ui/kakao/styles/kakao.css";

type BubbleVariant = "incoming" | "outgoing";

interface BubbleMetaProps {
  variant?: BubbleVariant;
  timestamp?: string;
  /** Members who haven't read the message yet — KakaoTalk's yellow "1". */
  unreadCount?: number;
  /**
   * Shows "수정됨" for messages edited within 24h (KakaoTalk 25.8+).
   * `ChatBubble` draws it inside the bubble; here it falls back to the meta line.
   */
  edited?: boolean;
}

/** Unread count + edited flag + time, stacked beside the bubble's bottom edge. */
function BubbleMeta({ variant = "incoming", timestamp, unreadCount, edited }: BubbleMetaProps) {
  const hasUnread = !!unreadCount && unreadCount > 0;
  if (!hasUnread && !timestamp && !edited) return null;
  return (
    <span
      className={cn(
        "flex shrink-0 flex-col pb-[1px] leading-[1.15]",
        variant === "outgoing" ? "items-end text-right" : "items-start text-left"
      )}
    >
      {hasUnread && (
        <span className="text-[11px] font-bold text-kk-unread" aria-label={`안 읽은 사람 ${unreadCount}명`}>
          {unreadCount}
        </span>
      )}
      {(edited || timestamp) && (
        <span className="whitespace-nowrap text-[length:var(--kk-text-meta)] text-kk-chat-meta">
          {edited && <span className="mr-[3px]">수정됨</span>}
          {timestamp}
        </span>
      )}
    </span>
  );
}

/**
 * KakaoTalk's tail: a small "ear" on the top corner of the first bubble in a
 * group. The bubble keeps all four corners rounded; the ear sits outside the
 * rounded corner with its tip ~2px past the edge and a scooped notch between
 * tip and top edge. Path traced from an iOS @3x device capture (in px, origin
 * at the bubble's top-left). Drawn for incoming; mirrored for outgoing.
 */
function BubbleTail({ variant, className }: { variant: BubbleVariant; className: string }) {
  return (
    <svg
      viewBox="-2.2 0 11.2 13"
      width="11.2"
      height="13"
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute top-0",
        variant === "outgoing" ? "-right-[2.2px] -scale-x-100" : "-left-[2.2px]",
        className
      )}
    >
      <path
        d="M-2.1 .8C-1.2 .7 1.6 1.9 4.6 4.1L9 13H0V7C-.3 4.5-1 2.4-2.1.8Z"
        fill="currentColor"
      />
    </svg>
  );
}

interface BubbleRowProps extends BubbleMetaProps, React.HTMLAttributes<HTMLDivElement> {
  /** Draw the tail — set on the first bubble of a group. */
  showTail?: boolean;
}

/**
 * Lays out one message: bubble content plus meta, aligned to the sender side.
 * Biz-message bubbles reuse it so they line up with plain chat bubbles.
 */
const BubbleRow = React.forwardRef<HTMLDivElement, BubbleRowProps>(
  (
    { className, variant = "incoming", timestamp, unreadCount, edited, showTail, children, ...props },
    ref
  ) => (
    <div
      ref={ref}
      data-variant={variant}
      data-tail={showTail || undefined}
      className={cn(
        "font-kk flex w-full items-end gap-[var(--kk-gap-meta)]",
        variant === "outgoing" ? "flex-row-reverse" : "flex-row",
        className
      )}
      {...props}
    >
      {children}
      <BubbleMeta variant={variant} timestamp={timestamp} unreadCount={unreadCount} edited={edited} />
    </div>
  )
);
BubbleRow.displayName = "BubbleRow";

interface ChatBubbleProps extends BubbleRowProps {
  /** Extra classes for the bubble surface (the row gets `className`). */
  bubbleClassName?: string;
  /** Darkened, as while the long-press menu is open. */
  pressed?: boolean;
  /** Shown under the bubble, usually `<MessageReactions>`. */
  reactions?: React.ReactNode;
}

const ChatBubble = React.forwardRef<HTMLDivElement, ChatBubbleProps>(
  (
    { variant = "incoming", showTail = false, edited, pressed, reactions, bubbleClassName, children, ...props },
    ref
  ) => {
    const isOutgoing = variant === "outgoing";
    const row = (
      <BubbleRow ref={reactions ? undefined : ref} variant={variant} showTail={showTail} {...props}>
        <div
          data-pressed={pressed || undefined}
          className={cn(
            "relative min-w-[36px] max-w-[var(--kk-msg-max-width)] whitespace-pre-wrap break-words break-keep px-[11px] py-[7px]",
            "text-[length:var(--kk-text-message)] leading-[var(--kk-leading-message)] tracking-[-0.01em]",
            "rounded-[var(--kk-radius-bubble)] transition-[filter] duration-150",
            isOutgoing
              ? "bg-kk-bubble-outgoing text-kk-bubble-outgoing-fg"
              : "bg-kk-bubble-incoming text-kk-bubble-incoming-fg",
            pressed && "[filter:var(--kk-bubble-pressed)]",
            bubbleClassName
          )}
        >
          {showTail && (
            <BubbleTail
              variant={variant}
              className={isOutgoing ? "text-kk-bubble-outgoing" : "text-kk-bubble-incoming"}
            />
          )}
          {/* positioned so text paints above the tail */}
          <span className="relative">{children}</span>
          {/* Device: small label on its own line, inside the bubble's bottom-right. */}
          {edited && (
            <span
              className={cn(
                "relative -mt-[1px] block text-right text-[12px] leading-[16px] tracking-normal",
                isOutgoing ? "text-kk-bubble-outgoing-edited" : "text-kk-bubble-incoming-edited"
              )}
            >
              수정됨
            </span>
          )}
        </div>
      </BubbleRow>
    );

    if (!reactions) return row;
    return (
      <div ref={ref} className={cn("flex w-full flex-col gap-[8px]", isOutgoing ? "items-end" : "items-start")}>
        {row}
        {reactions}
      </div>
    );
  }
);
ChatBubble.displayName = "ChatBubble";

export {
  ChatBubble,
  BubbleRow,
  BubbleMeta,
  BubbleTail,
  type ChatBubbleProps,
  type BubbleRowProps,
  type BubbleMetaProps,
  type BubbleVariant,
};
