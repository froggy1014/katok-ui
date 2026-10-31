import * as React from "react";
import { cn } from "@/lib/utils";
import { XIcon } from "./icons";
import "@/components/ui/kakao/styles/kakao.css";

interface NoticeBannerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** The pinned 공지, shown on one line. */
  title: React.ReactNode;
  /** More text below the title; the device shows "…" when the notice is longer. */
  more?: boolean;
  onClose?: () => void;
}

/** Megaphone mark (original drawing, filled). */
function Megaphone() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" className="shrink-0 text-kk-notice-icon">
      <path fill="currentColor" d="M3 9.5a1.5 1.5 0 0 1 1.5-1.5H6v8H4.5A1.5 1.5 0 0 1 3 14.5zM7.5 8 19 3.6a1 1 0 0 1 1.4.94v14.92a1 1 0 0 1-1.4.94L7.5 16z" />
      <path fill="currentColor" d="M8 16.5h3l.9 3.4a1 1 0 0 1-1 1.3H9.7a1 1 0 0 1-1-.8z" opacity=".75" />
    </svg>
  );
}

/**
 * The chat room's pinned notice (공지): a card that floats under the header.
 * Pass it to `<ChatRoom notice={…}>`.
 */
const NoticeBanner = React.forwardRef<HTMLDivElement, NoticeBannerProps>(
  ({ className, title, more = false, onClose, children, ...props }, ref) => (
    <div
      ref={ref}
      role="note"
      aria-label="공지"
      className={cn(
        "font-kk flex min-h-[49px] items-center gap-[10px] rounded-[16px] bg-kk-notice-bg py-[8px] pl-[12px] pr-[8px] text-kk-text-primary shadow-[0_2px_10px_rgba(0,0,0,0.08)] backdrop-blur-xl",
        className
      )}
      {...props}
    >
      <Megaphone />
      <div className="min-w-0 flex-1">
        <p className="truncate text-[15px] leading-[20px]">{title}</p>
        {children}
        {more && <p className="text-[13px] leading-[14px] text-kk-text-secondary">…</p>}
      </div>
      {onClose && (
        <button
          type="button"
          aria-label="공지 접기"
          onClick={onClose}
          className="flex size-[32px] shrink-0 items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-kk-text-link"
        >
          <XIcon size={20} strokeWidth={2} />
        </button>
      )}
    </div>
  )
);
NoticeBanner.displayName = "NoticeBanner";

export { NoticeBanner, type NoticeBannerProps };
