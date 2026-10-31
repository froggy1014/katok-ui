"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { PhoneIcon, SkipFiveIcon } from "./icons";
import { ProfileAvatar } from "./profile-avatar";
import "@/components/ui/kakao/styles/kakao.css";

interface TranscriptLine {
  id: string;
  from: "me" | "them";
  text: string;
  /** Offset into the recording, "00:05". */
  time: string;
}

interface CallTranscriptProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  avatar?: string;
  /** "2026년 10월 3일 오후 6:30" */
  date?: React.ReactNode;
  lines: TranscriptLine[];
  /** The line being played: white with a dark outline. */
  activeId?: string;
  onLine?: (id: string) => void;
  /** "AI 통화요약" pill under the name; omit to hide. */
  summaryLabel?: string;
  onSummary?: () => void;
  /** Player state, in seconds. */
  position?: number;
  duration?: number;
  playing?: boolean;
  onTogglePlay?: () => void;
  onSeek?: (seconds: number) => void;
  /** Top bar (back, search, more); render your own. */
  header?: React.ReactNode;
}

const mmss = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

/** Waveform glyph at the start of each line (original drawing). */
function Wave({ on }: { on: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex size-[20px] shrink-0 items-center justify-center gap-[2px] rounded-full",
        on ? "bg-kk-always-black text-kk-yellow" : "text-current opacity-35"
      )}
    >
      {[6, 10, 7].map((h, i) => (
        <span key={i} className="w-[2px] rounded-full bg-current" style={{ height: h }} />
      ))}
    </span>
  );
}

/**
 * A recorded 보이스톡, shown as chat: their lines gray, yours yellow, each with
 * its offset; the playing line is outlined; a player sits at the bottom.
 */
const CallTranscript = React.forwardRef<HTMLDivElement, CallTranscriptProps>(
  (
    {
      className,
      name,
      avatar,
      date,
      lines,
      activeId,
      onLine,
      summaryLabel = "AI 통화요약",
      onSummary,
      position = 0,
      duration = 0,
      playing = false,
      onTogglePlay,
      onSeek,
      header,
      ...props
    },
    ref
  ) => (
    <div ref={ref} className={cn("font-kk flex h-full flex-col bg-kk-list-bg text-kk-text-primary", className)} {...props}>
      {header}
      <div className="min-h-0 flex-1 overflow-y-auto px-[16px] pb-[16px]">
        <div className="flex flex-col items-center pt-[8px]">
          <span className="relative">
            <ProfileAvatar src={avatar} name={name} size={72} />
            <span className="absolute -bottom-[2px] -right-[2px] flex size-[24px] items-center justify-center rounded-full border-2 border-kk-list-bg bg-kk-gray-800 text-kk-list-bg">
              <PhoneIcon size={12} strokeWidth={0} className="fill-current" />
            </span>
          </span>
          <h1 className="mt-[8px] text-[20px] font-bold">{name}</h1>
          {summaryLabel && (
            <button
              type="button"
              onClick={onSummary}
              className="mt-[14px] flex h-[36px] items-center gap-[8px] rounded-full border border-kk-chip-border px-[14px] text-[15px] shadow-[0_2px_8px_rgba(0,0,0,0.06)] outline-none focus-visible:ring-2 focus-visible:ring-kk-text-link"
            >
              <span aria-hidden="true" className="size-[16px] rounded-full border-[3px] border-[#ff4fa0] border-r-[#ffb03a]" />
              {summaryLabel}
            </button>
          )}
          {date && <p className="mt-[18px] text-[14px] text-kk-text-secondary">{date}</p>}
        </div>

        <ol className="mt-[14px] flex flex-col gap-[10px]">
          {lines.map((l) => {
            const mine = l.from === "me";
            const on = l.id === activeId;
            return (
              <li key={l.id} className={cn("flex items-end gap-[5px]", mine && "flex-row-reverse")}>
                <button
                  type="button"
                  aria-current={on || undefined}
                  onClick={onLine && (() => onLine(l.id))}
                  className={cn(
                    "flex max-w-[75%] items-center gap-[6px] rounded-[16px] px-[12px] py-[8px] text-left text-[16px] leading-[1.35] outline-none focus-visible:ring-2 focus-visible:ring-kk-text-link",
                    on
                      ? "bg-kk-list-bg ring-2 ring-kk-text-primary"
                      : mine
                        ? "bg-kk-bubble-outgoing text-kk-bubble-outgoing-fg"
                        : "bg-kk-transcript-them"
                  )}
                >
                  <Wave on={on} />
                  {l.text}
                </button>
                <span className="pb-[2px] text-[11px] text-kk-text-secondary">{l.time}</span>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="shrink-0 border-t border-kk-sheet-divider px-[20px] pb-[calc(12px+env(safe-area-inset-bottom))] pt-[16px]">
        <input
          type="range"
          aria-label="재생 위치"
          min={0}
          max={duration || 1}
          value={position}
          onChange={(e) => onSeek?.(Number(e.target.value))}
          className="h-[4px] w-full cursor-pointer accent-kk-text-primary"
        />
        <div className="mt-[6px] flex justify-between text-[13px] font-medium tabular-nums">
          <span>{mmss(position)}</span>
          <span className="text-kk-text-secondary">{mmss(duration)}</span>
        </div>
        <div className="mt-[4px] flex items-center justify-center gap-[40px]">
          <button type="button" aria-label="5초 뒤로" onClick={onSeek && (() => onSeek(Math.max(0, position - 5)))} className="outline-none">
            <SkipFiveIcon size={34} />
          </button>
          <button
            type="button"
            aria-label={playing ? "일시정지" : "재생"}
            onClick={onTogglePlay}
            className="flex size-[56px] items-center justify-center rounded-full bg-kk-text-primary text-kk-list-bg outline-none focus-visible:ring-2 focus-visible:ring-kk-text-link focus-visible:ring-offset-2"
          >
            {playing ? (
              <span aria-hidden="true" className="flex gap-[5px]">
                <span className="h-[20px] w-[5px] rounded-[1px] bg-current" />
                <span className="h-[20px] w-[5px] rounded-[1px] bg-current" />
              </span>
            ) : (
              <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24">
                <path fill="currentColor" d="M7 4.5v15l12-7.5z" />
              </svg>
            )}
          </button>
          <button
            type="button"
            aria-label="5초 앞으로"
            onClick={onSeek && (() => onSeek(Math.min(duration, position + 5)))}
            className="outline-none"
          >
            <SkipFiveIcon size={34} forward />
          </button>
        </div>
      </div>
    </div>
  )
);
CallTranscript.displayName = "CallTranscript";

export { CallTranscript, type CallTranscriptProps, type TranscriptLine };
