import * as React from "react";
import { cn } from "@/lib/utils";
import { BellOffIcon, CheckIcon, OpenChatIcon, PinIcon } from "./icons";
import { ProfileAvatar } from "./profile-avatar";
import "@/components/ui/kakao/styles/kakao.css";

interface ChatListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  /** One URL, or several for a group-chat composite avatar. */
  avatar?: string | (string | undefined)[];
  /** Group chats show the member count after the name. */
  memberCount?: number;
  lastMessage?: string;
  timestamp?: string;
  unreadCount?: number;
  muted?: boolean;
  pinned?: boolean;
  /** Open chat rooms get a round speech-bubble mark before the name. */
  openChat?: boolean;
  /**
   * Picker mode (share sheet, invite): a round check replaces the time and
   * unread badge, and the row becomes a checkbox. Leave undefined for a
   * normal Chats tab row.
   */
  selected?: boolean;
  /** Override the root element (e.g. Next.js Link, <a>, <button>). */
  render?: React.ReactElement;
}

const ChatListItem = React.forwardRef<HTMLDivElement, ChatListItemProps>(
  (
    {
      className,
      name,
      avatar,
      memberCount,
      lastMessage,
      timestamp,
      unreadCount,
      muted = false,
      pinned = false,
      openChat = false,
      selected,
      render,
      onKeyDown,
      ...props
    },
    ref
  ) => {
    const selectable = selected !== undefined;
    const hasUnread = !selectable && !!unreadCount && unreadCount > 0;
    const rootClassName = cn(
      "font-kk flex w-full cursor-pointer items-center gap-[12px] bg-kk-list-bg px-[16px] py-[8px] text-left outline-none transition-colors hover:bg-kk-list-pressed active:bg-kk-list-pressed focus-visible:bg-kk-list-pressed",
      className
    );

    const content = (
      <>
        <ProfileAvatar src={avatar} name={name} size="lg" />

        <div className="flex min-w-0 flex-1 flex-col gap-[3px]">
          <div className="flex min-w-0 items-center gap-[4px]">
            {openChat && (
              <OpenChatIcon size={17} className="mr-[1px] shrink-0 text-kk-open-chat" aria-label="오픈채팅" />
            )}
            <span className="truncate text-[15px] font-semibold leading-[1.3] tracking-[-0.01em] text-kk-list-title">
              {name}
            </span>
            {memberCount != null && (
              <span className="shrink-0 text-[14px] leading-[1.3] text-kk-list-meta">{memberCount}</span>
            )}
            {pinned && (
              <PinIcon size={13} strokeWidth={2} className="shrink-0 text-kk-list-meta" aria-label="고정됨" />
            )}
            {muted && (
              <BellOffIcon size={13} strokeWidth={2} className="shrink-0 text-kk-list-meta" aria-label="알림 꺼짐" />
            )}
          </div>
          {lastMessage && (
            <p className="line-clamp-2 text-[13px] leading-[1.35] text-kk-list-description">{lastMessage}</p>
          )}
        </div>

        {selectable ? (
          <span
            aria-hidden="true"
            className={cn(
              "flex size-[22px] shrink-0 items-center justify-center rounded-full",
              selected ? "bg-kk-check-selected text-kk-check-selected-fg" : "border-[1.5px] border-kk-check-border"
            )}
          >
            {selected && <CheckIcon size={14} strokeWidth={3} />}
          </span>
        ) : (
          <div className="flex shrink-0 flex-col items-end gap-[6px] self-start pt-[3px]">
            {timestamp && <span className="text-[11px] leading-none text-kk-list-meta">{timestamp}</span>}
            {hasUnread && (
              <span
                aria-label={`안 읽은 메시지 ${unreadCount}개`}
                className="flex h-[19px] min-w-[19px] items-center justify-center rounded-full bg-kk-badge px-[6px] text-[11px] font-bold leading-none text-kk-badge-fg"
              >
                {unreadCount! > 999 ? "999+" : unreadCount}
              </span>
            )}
          </div>
        )}
      </>
    );

    const pickerProps: React.HTMLAttributes<HTMLElement> = selectable ? { role: "checkbox", "aria-checked": selected } : {};

    if (render) {
      return React.cloneElement(
        render,
        {
          ref,
          className: cn((render.props as { className?: string }).className, rootClassName),
          ...pickerProps,
          onKeyDown,
          ...props,
        } as React.HTMLAttributes<HTMLElement>,
        content
      );
    }

    return (
      <div
        ref={ref}
        className={rootClassName}
        {...pickerProps}
        tabIndex={selectable ? 0 : undefined}
        onKeyDown={(e) => {
          onKeyDown?.(e);
          // A <div> checkbox needs its own Space/Enter; a `render` button gets them natively.
          if (selectable && !e.defaultPrevented && (e.key === " " || e.key === "Enter")) {
            e.preventDefault();
            e.currentTarget.click();
          }
        }}
        {...props}
      >
        {content}
      </div>
    );
  }
);
ChatListItem.displayName = "ChatListItem";

export { ChatListItem, type ChatListItemProps };
