import * as React from "react";
import { cn } from "@/lib/utils";
import { DownloadIcon, ShareIcon, SlidersIcon, XIcon } from "./icons";
import "@/components/ui/kakao/styles/kakao.css";

/*
 * 캡처 mode, in three parts that slot into <ChatRoom>:
 *   header={<CaptureHeader />}  — replaces the chat header
 *   <CaptureSelection>…</CaptureSelection> — wraps the picked messages in the log
 *   input={<CaptureToolbar />}  — replaces the input bar
 */

interface CaptureHeaderProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  subtitle?: string;
  onClose?: () => void;
  /** 선택 해제 */
  onClear?: () => void;
}

const CaptureHeader = React.forwardRef<HTMLElement, CaptureHeaderProps>(
  ({ className, title = "캡처", subtitle = "저장 또는 공유해 보세요", onClose, onClear, ...props }, ref) => (
    <header
      ref={ref}
      className={cn(
        "font-kk flex h-[var(--kk-header-height)] w-full items-center gap-[8px] px-[16px] text-kk-chat-header-fg",
        className
      )}
      {...props}
    >
      <div className="flex flex-1 basis-0">
        <button
          type="button"
          aria-label="캡처 닫기"
          onClick={onClose}
          className="kk-glass flex size-[44px] items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-kk-yellow"
        >
          <XIcon size={24} strokeWidth={1.8} />
        </button>
      </div>
      <div className="flex shrink-0 flex-col items-center text-center">
        <h1 className="text-[17px] font-bold leading-[1.25]">{title}</h1>
        <p className="text-[13px] leading-[1.3] opacity-80">{subtitle}</p>
      </div>
      <div className="flex flex-1 basis-0 justify-end">
        <button
          type="button"
          onClick={onClear}
          className="kk-glass h-[44px] rounded-full px-[16px] text-[16px] outline-none focus-visible:ring-2 focus-visible:ring-kk-yellow"
        >
          선택 해제
        </button>
      </div>
    </header>
  )
);
CaptureHeader.displayName = "CaptureHeader";

/**
 * The picked range: full brightness inside a dashed frame, everything else
 * dimmed. The dim is a spread shadow, so it needs no overlay and scrolls along.
 */
const CaptureSelection = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, style, ...props }, ref) => (
    <div
      ref={ref}
      data-capture-selection=""
      className={cn(
        // z-[1]: paint the dim above the (relatively positioned) bubbles outside the range.
        "relative z-[1] -mx-[10px] flex flex-col gap-[var(--kk-gap-group)] border border-dashed border-white/80 px-[10px] py-[2px]",
        className
      )}
      style={{ boxShadow: "0 0 0 100vmax var(--kk-capture-dim)", ...style }}
      {...props}
    />
  )
);
CaptureSelection.displayName = "CaptureSelection";

interface CaptureToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  onOptions?: () => void;
  onSave?: () => void;
  onShare?: () => void;
}

const CaptureToolbar = React.forwardRef<HTMLDivElement, CaptureToolbarProps>(
  ({ className, onOptions, onSave, onShare, ...props }, ref) => (
    <div
      ref={ref}
      // Sits where the input bar was, so it carries the same dim as the log above.
      className={cn("font-kk bg-kk-capture-dim px-[10px] pb-[calc(8px+env(safe-area-inset-bottom))] pt-[6px]", className)}
      {...props}
    >
      <div className="kk-glass flex h-[48px] items-center justify-between rounded-full pl-[16px] pr-[6px] text-kk-chat-header-fg">
        <button
          type="button"
          onClick={onOptions}
          className="flex items-center gap-[10px] text-[16px] outline-none focus-visible:underline"
        >
          <SlidersIcon size={22} strokeWidth={1.8} />
          캡처 옵션
        </button>
        <div className="flex items-center">
          <button
            type="button"
            aria-label="저장"
            onClick={onSave}
            className="flex size-[44px] items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-kk-yellow"
          >
            <DownloadIcon size={22} strokeWidth={1.8} />
          </button>
          <button
            type="button"
            aria-label="공유"
            onClick={onShare}
            className="flex size-[44px] items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-kk-yellow"
          >
            <ShareIcon size={22} strokeWidth={1.8} />
          </button>
        </div>
      </div>
    </div>
  )
);
CaptureToolbar.displayName = "CaptureToolbar";

export { CaptureHeader, CaptureSelection, CaptureToolbar, type CaptureHeaderProps, type CaptureToolbarProps };
