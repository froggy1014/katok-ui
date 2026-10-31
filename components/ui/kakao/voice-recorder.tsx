import * as React from "react";
import { cn } from "@/lib/utils";
import { ArrowUpIcon } from "./icons";
import "@/components/ui/kakao/styles/kakao.css";

type VoiceRecorderState = "idle" | "recording" | "recorded";

interface VoiceRecorderProps extends React.HTMLAttributes<HTMLDivElement> {
  state?: VoiceRecorderState;
  /** Recorded length in seconds. */
  elapsed?: number;
  /** Bar dots drawn while recording; defaults to a few per second. */
  levels?: number;
  onRecord?: () => void;
  onStop?: () => void;
  onSend?: () => void;
}

const MAX_DOTS = 40;

function formatElapsed(s: number) {
  const m = Math.floor(s / 60);
  return `${String(m).padStart(2, "0")}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
}

/**
 * Body of the 음성메시지 sheet: a level bar (gray when idle, yellow while
 * recording) and the record / stop / send controls. Drive `state` and
 * `elapsed` from your recorder; put it under `<SheetTitle>` in a `<BottomSheet>`.
 */
const VoiceRecorder = React.forwardRef<HTMLDivElement, VoiceRecorderProps>(
  ({ className, state = "idle", elapsed = 0, levels, onRecord, onStop, onSend, ...props }, ref) => {
    const live = state !== "idle";
    const dots = Math.min(levels ?? Math.round(elapsed * 12), MAX_DOTS);
    return (
      <div ref={ref} className={cn("font-kk flex flex-col px-[16px]", className)} {...props}>
        <div
          role="timer"
          aria-label={`녹음 ${formatElapsed(elapsed)}`}
          className={cn(
            "flex h-[52px] items-center justify-between gap-[12px] rounded-[18px] px-[16px]",
            live ? "bg-kk-yellow text-kk-on-yellow" : "bg-kk-voice-idle text-kk-sheet-empty"
          )}
        >
          <span aria-hidden="true" className="flex min-w-0 items-center gap-[3px] overflow-hidden">
            {Array.from({ length: live ? dots : 0 }, (_, i) => (
              <span key={i} className="size-[4px] shrink-0 rounded-full bg-current" />
            ))}
          </span>
          <span className="shrink-0 text-[20px] font-bold tabular-nums">{formatElapsed(elapsed)}</span>
        </div>

        <div className="relative mt-[32px] flex h-[40px] items-center justify-center">
          {state === "recording" ? (
            <button
              type="button"
              aria-label="녹음 중지"
              onClick={onStop}
              className="flex size-[40px] items-center justify-center rounded-full bg-kk-sheet-fill outline-none focus-visible:ring-2 focus-visible:ring-kk-text-link"
            >
              <span className="size-[19px] rounded-[3px] bg-kk-text-primary" />
            </button>
          ) : (
            <button
              type="button"
              aria-label={state === "recorded" ? "다시 녹음" : "녹음 시작"}
              onClick={onRecord}
              className="flex size-[40px] items-center justify-center rounded-full bg-kk-sheet-fill outline-none focus-visible:ring-2 focus-visible:ring-kk-text-link"
            >
              <span className="size-[28px] rounded-full bg-kk-voice-record" />
            </button>
          )}
          {live && (
            <button
              type="button"
              aria-label="전송"
              onClick={onSend}
              className="absolute right-0 flex size-[40px] items-center justify-center rounded-full bg-kk-send-bg text-kk-send-fg outline-none focus-visible:ring-2 focus-visible:ring-kk-text-link"
            >
              <ArrowUpIcon size={22} strokeWidth={2.4} />
            </button>
          )}
        </div>
      </div>
    );
  }
);
VoiceRecorder.displayName = "VoiceRecorder";

export { VoiceRecorder, formatElapsed, type VoiceRecorderProps, type VoiceRecorderState };
