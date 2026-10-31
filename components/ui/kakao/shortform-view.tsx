"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import "@/components/ui/kakao/styles/kakao.css";

interface ShortformAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  /** "60.8만", "1,342" … */
  count?: React.ReactNode;
  active?: boolean;
}

interface ShortformViewProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** Large title in the top-left ("지금"). */
  heading?: string;
  /** Top-right icons. */
  topActions?: React.ReactNode;
  /** Segments under the heading (숏폼 · 오픈채팅). */
  segments?: { id: string; label: string }[];
  activeSegment?: string;
  onSegment?: (id: string) => void;
  /** Vertical action column on the right (좋아요, 댓글, 공유, 저장, …). */
  actions?: ShortformAction[];
  onAction?: (id: string) => void;
  channel?: { name: string; avatar?: string; verified?: boolean };
  /** e.g. "친구추가" pill next to the channel. */
  channelAction?: React.ReactNode;
  title?: React.ReactNode;
  /** "조회수 9.1만" */
  views?: React.ReactNode;
  /** 0–1 playback progress along the bottom edge. */
  progress?: number;
  /** The clip itself (video, image); it fills the view. */
  children?: React.ReactNode;
}

/** The 지금 tab's short-form player chrome over a full-bleed clip. */
const ShortformView = React.forwardRef<HTMLDivElement, ShortformViewProps>(
  (
    {
      className,
      heading = "지금",
      topActions,
      segments,
      activeSegment = segments?.[0]?.id,
      onSegment,
      actions,
      onAction,
      channel,
      channelAction,
      title,
      views,
      progress,
      children,
      ...props
    },
    ref
  ) => (
    <div ref={ref} className={cn("font-kk relative h-full overflow-hidden bg-kk-always-black text-kk-always-white", className)} {...props}>
      <div className="absolute inset-0">{children}</div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/55" />

      <div className="absolute inset-x-0 top-0 px-[16px] pt-[8px]">
        <div className="flex h-[44px] items-center justify-between">
          <h1 className="text-[24px] font-bold">{heading}</h1>
          <div className="flex items-center gap-[4px]">{topActions}</div>
        </div>
        {segments && (
          <div role="group" className="mt-[10px] flex gap-[8px]">
            {segments.map((s) => (
              <button
                key={s.id}
                type="button"
                aria-pressed={s.id === activeSegment}
                onClick={onSegment && (() => onSegment(s.id))}
                className={cn(
                  "h-[38px] rounded-full px-[16px] text-[16px] font-semibold outline-none focus-visible:ring-2 focus-visible:ring-kk-yellow",
                  s.id === activeSegment ? "bg-kk-always-white text-kk-always-black" : "kk-glass text-kk-always-white"
                )}
              >
                {s.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {actions && (
        <div className="absolute bottom-[96px] right-[12px] flex flex-col items-center gap-[18px]">
          {actions.map((a) => (
            <button
              key={a.id}
              type="button"
              aria-label={a.label}
              aria-pressed={a.active}
              onClick={onAction && (() => onAction(a.id))}
              className="flex flex-col items-center gap-[4px] text-[12px] outline-none drop-shadow focus-visible:ring-2 focus-visible:ring-kk-yellow"
            >
              {a.icon}
              {a.count != null && <span>{a.count}</span>}
            </button>
          ))}
        </div>
      )}

      <div className="absolute inset-x-0 bottom-0 px-[16px] pb-[18px] pr-[72px]">
        {channel && (
          <div className="flex items-center gap-[8px]">
            {channel.avatar && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={channel.avatar} alt="" className="size-[30px] rounded-[40%] object-cover" />
            )}
            <span className="truncate text-[16px] font-bold">{channel.name}</span>
            {channel.verified && (
              <svg width="16" height="16" viewBox="0 0 16 16" role="img" aria-label="인증됨" className="shrink-0">
                <circle cx="8" cy="8" r="8" fill="#fff" />
                <path d="m4.6 8.2 2.2 2.2 4.6-4.6" fill="none" stroke="#191919" strokeWidth="1.8" />
              </svg>
            )}
            {channelAction}
          </div>
        )}
        {title && <p className="mt-[10px] line-clamp-2 text-[16px] font-semibold leading-[1.35]">{title}</p>}
        {views && <p className="mt-[6px] text-[13px] opacity-80">▶ {views}</p>}
      </div>
      {progress != null && (
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[2px] bg-white/25">
          <div className="h-full bg-kk-always-white" style={{ width: `${Math.min(1, Math.max(0, progress)) * 100}%` }} />
        </div>
      )}
    </div>
  )
);
ShortformView.displayName = "ShortformView";

export { ShortformView, type ShortformViewProps, type ShortformAction };
