import * as React from "react";
import { cn } from "@/lib/utils";
import { ProfileAvatar } from "./profile-avatar";
import type { BubbleVariant } from "./chat-bubble";
import "@/components/ui/kakao/styles/kakao.css";

interface MessageSender {
  name: string;
  avatar?: string;
}

interface MessageGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BubbleVariant;
  /** Incoming groups show the sender's avatar and name next to the first bubble. */
  sender?: MessageSender;
  /** Hide the avatar column (e.g. channel previews), keeping the name. */
  hideAvatar?: boolean;
  /** Applied to the last bubble unless it sets its own. KakaoTalk shows time once per minute. */
  timestamp?: string;
  /** Applied to the last bubble unless it sets its own. */
  unreadCount?: number;
}

type BubbleChildProps = {
  variant?: BubbleVariant;
  showTail?: boolean;
  timestamp?: string;
  unreadCount?: number;
};

/**
 * Consecutive messages from one sender. Injects `variant` into every bubble,
 * the tail into the first, and the group's time/unread count into the last.
 */
const MessageGroup = React.forwardRef<HTMLDivElement, MessageGroupProps>(
  (
    { className, variant = "incoming", sender, hideAvatar, timestamp, unreadCount, children, ...props },
    ref
  ) => {
    const items = React.Children.toArray(children).filter(React.isValidElement) as React.ReactElement<BubbleChildProps>[];
    const last = items.length - 1;
    // Stickers and media cards have no tail; the tail goes to the first real bubble.
    const tailAt = items.findIndex((c) => !(c.type as { kkNoTail?: boolean }).kkNoTail);
    const bubbles = items.map((child, i) =>
      React.cloneElement(child, {
        variant: child.props.variant ?? variant,
        showTail: child.props.showTail ?? i === tailAt,
        timestamp: child.props.timestamp ?? (i === last ? timestamp : undefined),
        unreadCount: child.props.unreadCount ?? (i === last ? unreadCount : undefined),
      })
    );

    const stack = (
      <div className="flex min-w-0 flex-1 flex-col gap-[var(--kk-gap-grouped)]">
        {variant === "incoming" && sender && (
          <span className="mb-[1px] truncate text-[length:var(--kk-text-sender)] leading-[1.3] text-kk-chat-sender">
            {sender.name}
          </span>
        )}
        {bubbles}
      </div>
    );

    return (
      <div
        ref={ref}
        role="group"
        aria-label={variant === "incoming" && sender ? `${sender.name}의 메시지` : "내 메시지"}
        className={cn("font-kk flex w-full gap-[8px]", className)}
        {...props}
      >
        {variant === "incoming" && sender && !hideAvatar && (
          <ProfileAvatar src={sender.avatar} name={sender.name} size="md" />
        )}
        {stack}
      </div>
    );
  }
);
MessageGroup.displayName = "MessageGroup";

export { MessageGroup, type MessageGroupProps, type MessageSender };
