"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import "@/components/ui/kakao/styles/kakao.css";

interface ChatRoomProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Usually a `<ChatHeader />`. */
  header?: React.ReactNode;
  /** Pinned notice under the header, usually a `<NoticeBanner />`. Messages scroll beneath it. */
  notice?: React.ReactNode;
  /** Usually a `<MessageInput />`. */
  input?: React.ReactNode;
  /** Override the chat background (color or image), e.g. a custom theme. */
  background?: string;
  /**
   * Keep the newest message in view: open at the bottom and follow new
   * messages, unless the reader has scrolled up. Defaults to `true`.
   */
  stickToBottom?: boolean;
}

/** Within this many pixels of the bottom, new content keeps the log pinned. */
const STICK_THRESHOLD = 48;

/**
 * Chat room shell: header, scrollable message area on the chat background,
 * and the input bar. Fills its parent's height.
 *
 * As in KakaoTalk on iOS 26, the header floats over the messages (they scroll
 * under its glass pills) and the input pill sits on the chat background.
 */
const ChatRoom = React.forwardRef<HTMLDivElement, ChatRoomProps>(
  ({ className, header, notice, input, background, stickToBottom = true, children, style, ...props }, ref) => {
    const logRef = React.useRef<HTMLDivElement>(null);
    const contentRef = React.useRef<HTMLDivElement>(null);
    const pinned = React.useRef(true);

    React.useEffect(() => {
      const log = logRef.current;
      const content = contentRef.current;
      if (!stickToBottom || !log || !content) return;
      const toBottom = () => {
        if (pinned.current) log.scrollTop = log.scrollHeight;
      };
      const onScroll = () => {
        pinned.current = log.scrollHeight - log.scrollTop - log.clientHeight < STICK_THRESHOLD;
      };
      toBottom();
      // Follows new messages and late-loading images alike.
      const observer = new ResizeObserver(toBottom);
      observer.observe(content);
      log.addEventListener("scroll", onScroll, { passive: true });
      return () => {
        observer.disconnect();
        log.removeEventListener("scroll", onScroll);
      };
    }, [stickToBottom]);

    return (
      <div
        ref={ref}
        className={cn("font-kk relative flex h-full w-full flex-col overflow-hidden bg-kk-chat-bg", className)}
        style={{ ...(background ? { background } : null), ...style }}
        {...props}
      >
        {header && <div className="absolute inset-x-0 top-0 z-10">{header}</div>}
        {notice && (
          <div
            className={cn(
              "absolute inset-x-[10px] z-10",
              header ? "top-[calc(var(--kk-header-height)+2px)]" : "top-[8px]"
            )}
          >
            {notice}
          </div>
        )}
        <div
          ref={logRef}
          role="log"
          aria-live="polite"
          className={cn(
            "min-h-0 flex-1 overflow-y-auto px-[10px] pb-[8px] [scrollbar-width:none]",
            header ? "pt-[calc(var(--kk-header-height)+4px)]" : "pt-[4px]"
          )}
        >
          <div ref={contentRef} className="flex flex-col gap-[var(--kk-gap-group)]">
            {children}
          </div>
        </div>
        {input && <div className="shrink-0">{input}</div>}
      </div>
    );
  }
);
ChatRoom.displayName = "ChatRoom";

export { ChatRoom, type ChatRoomProps };
