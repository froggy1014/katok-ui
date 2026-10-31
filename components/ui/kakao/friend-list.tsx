"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronRightIcon } from "./icons";
import { ProfileAvatar } from "./profile-avatar";
import "@/components/ui/kakao/styles/kakao.css";

interface ListSectionProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  /** "업데이트한 친구", "생일인 친구", "친구" … */
  title: React.ReactNode;
  count?: number;
  /** Right side of the label row, e.g. a sort toggle. */
  trailing?: React.ReactNode;
  /** Thin divider above the section (between sections on the friends tab). */
  divided?: boolean;
}

/** A friends-tab section: gray "label count" row, then its rows. */
const ListSection = React.forwardRef<HTMLElement, ListSectionProps>(
  ({ className, title, count, trailing, divided = false, children, ...props }, ref) => (
    <section ref={ref} className={cn("font-kk", className)} {...props}>
      {divided && <div aria-hidden="true" className="mx-[16px] border-t border-kk-sheet-divider" />}
      <div className="flex items-center justify-between px-[16px] pb-[8px] pt-[18px]">
        <h2 className="text-[15px] text-kk-text-secondary">
          {title}
          {count != null && <span className="ml-[4px]">{count}</span>}
        </h2>
        {trailing && <div className="text-[14px] text-kk-text-secondary">{trailing}</div>}
      </div>
      {children}
    </section>
  )
);
ListSection.displayName = "ListSection";

interface UpdatedFriend {
  id: string;
  name: string;
  avatar?: string;
  /** Red dot: a profile update not seen yet. */
  isNew?: boolean;
  /** Small "AD" tag for sponsored entries. */
  ad?: boolean;
}

interface UpdatedFriendsProps extends React.HTMLAttributes<HTMLDivElement> {
  friends: UpdatedFriend[];
  /** Called with the friend id; rows become buttons when set. */
  onOpen?: (id: string) => void;
}

/** The horizontal strip of friends who updated their profile. */
const UpdatedFriends = React.forwardRef<HTMLDivElement, UpdatedFriendsProps>(
  ({ className, friends, onOpen, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("font-kk flex gap-[4px] overflow-x-auto px-[12px] pb-[14px] pt-[4px] [scrollbar-width:none]", className)}
      {...props}
    >
      {friends.map((f) => (
        <button
          key={f.id}
          type="button"
          onClick={onOpen && (() => onOpen(f.id))}
          className="flex w-[70px] shrink-0 flex-col items-center gap-[7px] outline-none focus-visible:ring-2 focus-visible:ring-kk-text-link"
        >
          <span className="relative">
            <ProfileAvatar src={f.avatar} name={f.name} size={54} />
            {f.isNew && (
              <span aria-label="새 소식" className="absolute -left-[2px] -top-[2px] size-[6px] rounded-full bg-kk-badge" />
            )}
            {f.ad && (
              <span className="absolute -right-[6px] -top-[4px] rounded-full border border-kk-chip-border bg-kk-list-bg px-[4px] text-[10px] font-semibold leading-[14px] text-kk-text-secondary">
                AD
              </span>
            )}
          </span>
          <span className="w-full truncate text-center text-[14px] text-kk-list-title">{f.name}</span>
        </button>
      ))}
    </div>
  )
);
UpdatedFriends.displayName = "UpdatedFriends";

interface FriendListItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  name: React.ReactNode;
  avatar?: string;
  /** Or your own leading node (an emoji tile for "친구의 생일을 확인해 보세요"). */
  leading?: React.ReactNode;
  /** Status message or a note such as "오늘". */
  description?: React.ReactNode;
  /** After the name, e.g. a cake for birthdays. */
  badge?: React.ReactNode;
  /** Right side: a button (선물하기) … */
  action?: React.ReactNode;
  /** … or a count with a chevron (추천친구 28 >). */
  count?: number;
}

/** A friends-tab row: squircle photo, name, status line, and an action or count. */
const FriendListItem = React.forwardRef<HTMLDivElement, FriendListItemProps>(
  ({ className, name, avatar, leading, description, badge, action, count, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("font-kk flex min-h-[64px] items-center gap-[12px] px-[16px] py-[8px] text-kk-list-title", className)}
      {...props}
    >
      {leading ?? <ProfileAvatar src={avatar} name={typeof name === "string" ? name : undefined} size={46} />}
      <div className="flex min-w-0 flex-1 flex-col gap-[2px]">
        <span className="flex min-w-0 items-center gap-[4px] text-[17px] leading-[1.3]">
          <span className="truncate">{name}</span>
          {badge}
        </span>
        {description && <span className="truncate text-[14px] leading-[1.3] text-kk-text-secondary">{description}</span>}
      </div>
      {action}
      {count != null && (
        <span className="flex shrink-0 items-center gap-[2px] text-[15px] text-kk-text-tertiary">
          {count}
          <ChevronRightIcon size={16} strokeWidth={2} />
        </span>
      )}
    </div>
  )
);
FriendListItem.displayName = "FriendListItem";

/** The outlined pill used for row actions (선물하기). */
const RowButton = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(
        "h-[36px] shrink-0 rounded-full border border-kk-chip-border px-[14px] text-[15px] text-kk-list-title outline-none focus-visible:ring-2 focus-visible:ring-kk-text-link",
        className
      )}
      {...props}
    />
  )
);
RowButton.displayName = "RowButton";

export {
  ListSection,
  UpdatedFriends,
  FriendListItem,
  RowButton,
  type ListSectionProps,
  type UpdatedFriend,
  type UpdatedFriendsProps,
  type FriendListItemProps,
};
