"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronLeftIcon, MenuIcon, PhoneIcon, SearchIcon } from "./icons";
import "@/components/ui/kakao/styles/kakao.css";

interface ChatHeaderProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  /**
   * `chat` — inside a chat room (translucent over the chat background).
   * `main` — a tab's large-title header ("채팅", "친구").
   */
  variant?: "chat" | "main";
  title: React.ReactNode;
  /** Group chats show the member count next to the title. */
  memberCount?: number;
  /** Second line under the title, e.g. "공유하기" or a status. */
  subtitle?: React.ReactNode;
  /** Total unread chats, shown beside the back chevron. */
  unreadTotal?: number;
  onBack?: () => void;
  onSearch?: () => void;
  onMenu?: () => void;
  /** Adds the phone button between search and menu (1:1 and group chats on device). */
  onCall?: () => void;
  /** Replace the default trailing buttons. */
  actions?: React.ReactNode;
}

const GLASS = "kk-glass";

function IconButton({
  label,
  onClick,
  size = 40,
  children,
}: {
  label: string;
  onClick?: () => void;
  size?: number;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      style={{ width: size, height: size }}
      className="flex shrink-0 items-center justify-center rounded-full outline-none transition-opacity hover:opacity-70 focus-visible:ring-2 focus-visible:ring-kk-yellow"
    >
      {children}
    </button>
  );
}

const ChatHeader = React.forwardRef<HTMLElement, ChatHeaderProps>(
  (
    {
      className,
      variant = "chat",
      title,
      memberCount,
      subtitle,
      unreadTotal,
      onBack,
      onSearch,
      onMenu,
      onCall,
      actions,
      ...props
    },
    ref
  ) => {
    const trailing = actions ?? (
      <>
        <IconButton label="검색" onClick={onSearch}>
          <SearchIcon size={23} strokeWidth={1.9} />
        </IconButton>
        {onCall && (
          <IconButton label="통화" onClick={onCall}>
            <PhoneIcon size={22} strokeWidth={1.7} />
          </IconButton>
        )}
        <IconButton label="메뉴" onClick={onMenu}>
          <MenuIcon size={23} strokeWidth={1.9} />
        </IconButton>
      </>
    );

    if (variant === "main") {
      return (
        <header
          ref={ref}
          className={cn(
            "font-kk flex h-[var(--kk-header-height)] w-full items-center justify-between bg-kk-list-bg px-[16px] text-kk-list-title",
            className
          )}
          {...props}
        >
          <h1 className="text-[22px] font-bold tracking-[-0.02em]">{title}</h1>
          <div className="flex items-center gap-[2px]">{trailing}</div>
        </header>
      );
    }

    const hasCount = !!unreadTotal && unreadTotal > 0;

    // iOS 26 layout: the bar itself is transparent; the back button and the
    // trailing actions are floating glass pills, the title sits centered.
    return (
      <header
        ref={ref}
        className={cn(
          "font-kk flex h-[var(--kk-header-height)] w-full items-center gap-[8px] bg-kk-chat-header-bg px-[16px] text-kk-chat-header-fg",
          className
        )}
        {...props}
      >
        <div className="flex flex-1 basis-0 justify-start">
          <button
            type="button"
            aria-label={hasCount ? `뒤로, 안 읽은 채팅 ${unreadTotal}개` : "뒤로"}
            onClick={onBack}
            className={cn(
              GLASS,
              "flex h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-full outline-none hover:opacity-80 focus-visible:ring-2 focus-visible:ring-kk-yellow",
              hasCount && "gap-[2px] pl-[10px] pr-[14px]"
            )}
          >
            <ChevronLeftIcon size={26} strokeWidth={1.9} />
            {hasCount && (
              <span className="text-[17px] tabular-nums">{unreadTotal > 999 ? "999+" : unreadTotal}</span>
            )}
          </button>
        </div>
        <div className="flex min-w-0 shrink flex-col items-center text-center">
          <h1 className="flex max-w-full items-baseline gap-[5px] text-[17px] font-bold tracking-[-0.01em]">
            <span className="truncate">{title}</span>
            {memberCount != null && (
              <span className="shrink-0 font-semibold opacity-50">{memberCount}</span>
            )}
          </h1>
          {subtitle && <p className="max-w-full truncate text-[13px] opacity-70">{subtitle}</p>}
        </div>
        <div className="flex flex-1 basis-0 justify-end">
          <div className={cn(GLASS, "flex h-[44px] shrink-0 items-center rounded-full px-[4px]")}>
            {trailing}
          </div>
        </div>
      </header>
    );
  }
);
ChatHeader.displayName = "ChatHeader";

export { ChatHeader, type ChatHeaderProps };
