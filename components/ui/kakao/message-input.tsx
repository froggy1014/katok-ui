"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ArrowUpIcon, EmojiFaceIcon, HashIcon, PlusIcon } from "./icons";
import "@/components/ui/kakao/styles/kakao.css";

interface MessageInputProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange" | "value" | "defaultValue"> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Called with the trimmed text; uncontrolled inputs clear themselves afterwards. */
  onSend?: (text: string) => void;
  onAttach?: () => void;
  onEmoji?: () => void;
  /** The "#" button shown while the field is empty (KakaoTalk's in-chat search). */
  onHash?: () => void;
  /** Max visible lines before the field scrolls. */
  maxRows?: number;
}

const LINE_HEIGHT = 20;

const MessageInput = React.forwardRef<HTMLTextAreaElement, MessageInputProps>(
  (
    {
      className,
      value,
      defaultValue = "",
      onValueChange,
      onSend,
      onAttach,
      onEmoji,
      onHash,
      maxRows = 5,
      placeholder = "메시지 입력",
      disabled,
      onKeyDown,
      ...props
    },
    ref
  ) => {
    const [inner, setInner] = React.useState(defaultValue);
    const isControlled = value !== undefined;
    const text = isControlled ? value : inner;
    const hasText = text.trim().length > 0;

    const localRef = React.useRef<HTMLTextAreaElement>(null);
    React.useImperativeHandle(ref, () => localRef.current as HTMLTextAreaElement);

    // Auto-grow up to maxRows, then scroll.
    React.useLayoutEffect(() => {
      const el = localRef.current;
      if (!el) return;
      el.style.height = "auto";
      el.style.height = `${Math.min(el.scrollHeight, LINE_HEIGHT * maxRows + 12)}px`;
    }, [text, maxRows]);

    const update = (next: string) => {
      if (!isControlled) setInner(next);
      onValueChange?.(next);
    };

    const send = () => {
      if (!hasText || disabled) return;
      onSend?.(text.trim());
      update("");
    };

    const circle =
      "flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-kk-yellow disabled:opacity-40";

    // iOS 26 layout: a floating pill over the chat background with round
    // "+" and "#" buttons; "#" turns into the yellow send button once typed.
    return (
      <div className={cn("font-kk w-full px-[10px] pb-[8px] pt-[6px]", className)}>
        <div className="flex min-h-[48px] w-full items-end gap-[6px] rounded-[24px] border border-kk-input-border bg-kk-input-bar-bg p-[7px] shadow-[0_2px_12px_rgba(0,0,0,0.08)] backdrop-blur-xl">
          <button
            type="button"
            aria-label="첨부"
            onClick={onAttach}
            disabled={disabled}
            className={cn(circle, "bg-kk-input-button-bg text-kk-input-icon hover:opacity-80")}
          >
            <PlusIcon size={20} strokeWidth={2} />
          </button>

          <textarea
            ref={localRef}
            rows={1}
            value={text}
            placeholder={placeholder}
            disabled={disabled}
            aria-label="메시지"
            onChange={(e) => update(e.target.value)}
            onKeyDown={(e) => {
              // Yours runs first; preventDefault() there (e.g. a mention list taking Enter) skips sending.
              onKeyDown?.(e);
              if (e.defaultPrevented) return;
              if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
                e.preventDefault();
                send();
              }
            }}
            className="min-h-[32px] min-w-0 flex-1 resize-none bg-transparent px-[4px] py-[6px] text-[16px] leading-[20px] text-kk-text-primary outline-none placeholder:text-kk-input-placeholder"
            {...props}
          />

          <button
            type="button"
            aria-label="이모티콘"
            onClick={onEmoji}
            disabled={disabled}
            className={cn(circle, "my-[4px] h-[24px] w-[24px] bg-kk-input-emoji-bg text-kk-input-icon hover:opacity-80")}
          >
            <EmojiFaceIcon size={18} strokeWidth={2.4} />
          </button>

          {hasText ? (
            <button
              type="button"
              aria-label="전송"
              onClick={send}
              disabled={disabled}
              className={cn(circle, "bg-kk-send-bg text-kk-send-fg transition-transform active:scale-95")}
            >
              <ArrowUpIcon size={18} strokeWidth={2.4} />
            </button>
          ) : (
            <button
              type="button"
              aria-label="샵검색"
              onClick={onHash}
              disabled={disabled}
              className={cn(circle, "bg-kk-input-button-bg text-kk-input-icon hover:opacity-80")}
            >
              <HashIcon size={18} strokeWidth={2.2} />
            </button>
          )}
        </div>
      </div>
    );
  }
);
MessageInput.displayName = "MessageInput";

export { MessageInput, type MessageInputProps };
