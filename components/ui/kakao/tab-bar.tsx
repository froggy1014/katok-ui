"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import "@/components/ui/kakao/styles/kakao.css";

/* Filled tab glyphs (original drawings, 26px). */
const G = (d: React.ReactNode) => (
  <svg width="26" height="26" viewBox="0 0 26 26" fill="currentColor" aria-hidden="true">
    {d}
  </svg>
);
const TAB_ICONS = {
  friends: G(
    <>
      <circle cx="13" cy="8.5" r="4.6" />
      <path d="M4 21.5c.6-4.4 4.4-6.6 9-6.6s8.4 2.2 9 6.6a1 1 0 0 1-1 1.1H5a1 1 0 0 1-1-1.1Z" />
    </>
  ),
  chats: G(<path d="M13 3.5c5.5 0 10 3.6 10 8.2s-4.5 8.2-10 8.2c-1 0-2-.1-2.9-.3l-4.6 2.9.9-4.3C4.3 16.7 3 14.3 3 11.7c0-4.6 4.5-8.2 10-8.2Z" />),
  now: G(
    <>
      <path d="M16.5 4.5c4.1 0 7.5 2.8 7.5 6.4 0 2-1 3.7-2.6 4.9l.6 2.9-3.1-1.8c-.6.1-1.2.2-1.9.2" opacity=".75" />
      <path d="M10.5 7.5c4.4 0 8 3 8 6.8s-3.6 6.8-8 6.8c-.8 0-1.6-.1-2.3-.3l-3.7 2.3.8-3.5C3.6 18.4 2.5 16.5 2.5 14.3c0-3.8 3.6-6.8 8-6.8Z" />
      <path d="M9 11.6v5.4l4.5-2.7Z" fill="var(--kk-tab-bg)" />
    </>
  ),
  shopping: G(<path d="M8.5 8V7a4.5 4.5 0 0 1 9 0v1h2.3a1 1 0 0 1 1 .9l1.1 12.3a1.6 1.6 0 0 1-1.6 1.8H5.7a1.6 1.6 0 0 1-1.6-1.8L5.2 8.9a1 1 0 0 1 1-.9Zm2 0h5V7a2.5 2.5 0 0 0-5 0Z" />),
  more: G(
    <>
      <circle cx="5.5" cy="13" r="2.2" />
      <circle cx="13" cy="13" r="2.2" />
      <circle cx="20.5" cy="13" r="2.2" />
    </>
  ),
};

type KakaoTab = keyof typeof TAB_ICONS;

interface TabBarItem {
  id: string;
  label: string;
  /** One of the built-in glyphs, or your own node. */
  icon: KakaoTab | React.ReactNode;
  /** Red count badge (unread chats). */
  badge?: number;
}

interface TabBarProps extends Omit<React.HTMLAttributes<HTMLElement>, "onSelect"> {
  items?: TabBarItem[];
  activeId?: string;
  onSelect?: (id: string) => void;
}

const DEFAULT_TABS: TabBarItem[] = [
  { id: "friends", label: "친구", icon: "friends" },
  { id: "chats", label: "채팅", icon: "chats" },
  { id: "now", label: "지금", icon: "now" },
  { id: "shopping", label: "쇼핑", icon: "shopping" },
  { id: "more", label: "더보기", icon: "more" },
];

/** KakaoTalk's five-tab bar (icons only, labels for assistive tech). */
const TabBar = React.forwardRef<HTMLElement, TabBarProps>(
  ({ className, items = DEFAULT_TABS, activeId = items[0]?.id, onSelect, ...props }, ref) => (
    <nav
      ref={ref}
      aria-label="탭"
      className={cn(
        "font-kk flex w-full border-t border-kk-tab-border bg-kk-tab-bg pb-[env(safe-area-inset-bottom)]",
        className
      )}
      {...props}
    >
      {items.map((t) => {
        const on = t.id === activeId;
        const glyph = typeof t.icon === "string" && t.icon in TAB_ICONS ? TAB_ICONS[t.icon as KakaoTab] : t.icon;
        return (
          <button
            key={t.id}
            type="button"
            aria-label={t.badge ? `${t.label}, 새 메시지 ${t.badge}개` : t.label}
            aria-current={on ? "page" : undefined}
            onClick={() => onSelect?.(t.id)}
            className={cn(
              "relative flex h-[56px] flex-1 items-center justify-center outline-none focus-visible:bg-kk-list-pressed",
              on ? "text-kk-tab-icon-active" : "text-kk-tab-icon"
            )}
          >
            {glyph}
            {!!t.badge && (
              <span className="absolute left-1/2 top-[6px] ml-[4px] flex h-[19px] min-w-[19px] items-center justify-center rounded-full bg-kk-badge px-[5px] text-[11px] font-bold leading-none text-kk-badge-fg">
                {t.badge > 999 ? "999+" : t.badge}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  )
);
TabBar.displayName = "TabBar";

export { TabBar, type TabBarProps, type TabBarItem, type KakaoTab };
