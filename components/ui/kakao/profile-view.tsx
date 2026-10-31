import * as React from "react";
import { cn } from "@/lib/utils";
import { PinIcon, XIcon } from "./icons";
import { ProfileAvatar } from "./profile-avatar";
import "@/components/ui/kakao/styles/kakao.css";

interface ProfileAction {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

interface ProfileViewProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** Background image (or CSS background) behind the top half. */
  background?: string;
  name: string;
  avatar?: string;
  status?: React.ReactNode;
  /** Heart count on the background ("+377") and the line under it. */
  likes?: React.ReactNode;
  likesLabel?: React.ReactNode;
  /** Free decoration over the background (stickers). */
  decoration?: React.ReactNode;
  onClose?: () => void;
  /** Top-right buttons, e.g. "프로필 편집" and "…". */
  topActions?: React.ReactNode;
  /** Glass bar under the name: 나와의 채팅 | 새 게시물. */
  actions?: ProfileAction[];
  /** Under the hero, usually a `<ProfileGrid>`. */
  children?: React.ReactNode;
}

/** Full-screen profile: background hero, avatar, name, glass action bar, then posts. */
const ProfileView = React.forwardRef<HTMLDivElement, ProfileViewProps>(
  (
    { className, background, name, avatar, status, likes, likesLabel, decoration, onClose, topActions, actions, children, ...props },
    ref
  ) => (
    <div ref={ref} className={cn("font-kk h-full overflow-y-auto bg-kk-list-bg", className)} {...props}>
      <div
        className="relative flex min-h-[420px] flex-col justify-end bg-kk-avatar-bg bg-cover bg-center px-[16px] pb-[16px] text-kk-always-white"
        style={background ? { backgroundImage: background.startsWith("url(") ? background : `url(${background})` } : undefined}
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/35" />
        <div className="absolute inset-x-[16px] top-[8px] flex items-center justify-between">
          <button
            type="button"
            aria-label="닫기"
            onClick={onClose}
            className="kk-glass flex size-[44px] items-center justify-center rounded-full text-kk-always-white outline-none focus-visible:ring-2 focus-visible:ring-kk-yellow"
          >
            <XIcon size={24} strokeWidth={1.8} />
          </button>
          <div className="flex items-center gap-[8px]">{topActions}</div>
        </div>
        {likes != null && (
          <p className="absolute left-[24px] top-[76px] text-[22px] font-bold leading-[1.15] drop-shadow">
            <span aria-hidden="true">♥</span>
            {likes}
            {likesLabel && <span className="block text-[17px] font-medium">{likesLabel}</span>}
          </p>
        )}
        {decoration}
        <div className="relative">
          <ProfileAvatar src={avatar} name={name} size={64} className="rounded-[40%] ring-2 ring-white/80" />
          <h1 className="mt-[10px] text-[28px] font-bold leading-[1.2]">{name}</h1>
          {status && <p className="mt-[2px] text-[15px] opacity-85">{status}</p>}
          {actions && actions.length > 0 && (
            <div className="kk-glass mt-[18px] flex h-[52px] items-center rounded-[14px] text-[16px]">
              {actions.map((a, i) => (
                <button
                  key={a.id}
                  type="button"
                  onClick={a.onClick}
                  className={cn(
                    "flex h-full flex-1 items-center justify-center gap-[8px] outline-none focus-visible:underline",
                    i > 0 && "border-l border-white/40"
                  )}
                >
                  {a.icon}
                  {a.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      {children}
    </div>
  )
);
ProfileView.displayName = "ProfileView";

interface ProfileGridItem {
  id: string;
  src: string;
  alt?: string;
  pinned?: boolean;
  video?: boolean;
}

/** Three-column post grid with pin and video marks. */
const ProfileGrid = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { items: ProfileGridItem[] }>(
  ({ className, items, ...props }, ref) => (
    <div ref={ref} className={cn("grid grid-cols-3 gap-[2px]", className)} {...props}>
      {items.map((it) => (
        <div key={it.id} className="relative aspect-[3/4] overflow-hidden bg-kk-gray-200">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={it.src} alt={it.alt ?? ""} loading="lazy" decoding="async" className="h-full w-full object-cover" />
          {it.pinned && (
            <PinIcon size={18} strokeWidth={2.2} aria-label="고정됨" className="absolute right-[8px] top-[8px] text-white drop-shadow" />
          )}
          {it.video && (
            <svg aria-label="동영상" role="img" width="22" height="22" viewBox="0 0 24 24" className="absolute right-[8px] top-[8px] drop-shadow">
              <circle cx="12" cy="12" r="11" fill="#fff" />
              <path d="M10 8v8l6-4z" fill="#191919" />
            </svg>
          )}
        </div>
      ))}
    </div>
  )
);
ProfileGrid.displayName = "ProfileGrid";

export { ProfileView, ProfileGrid, type ProfileViewProps, type ProfileAction, type ProfileGridItem };
