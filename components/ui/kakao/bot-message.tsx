import * as React from "react";
import { BubbleRow, BubbleTail, type BubbleRowProps } from "./chat-bubble";
import { ChevronRightIcon } from "./icons";
import "@/components/ui/kakao/styles/kakao.css";

interface BotAnswerProps extends BubbleRowProps {
  /** Lines shown before "전체보기"; the rest is clipped. */
  maxLines?: number;
  /** "전체보기 >" footer, shown when set. */
  onMore?: () => void;
  moreLabel?: string;
}

/**
 * A long chatbot answer: a white bubble clipped to `maxLines` with a
 * "전체보기 >" footer. Use inside `<MessageGroup sender={bot}>`.
 */
const BotAnswer = React.forwardRef<HTMLDivElement, BotAnswerProps>(
  ({ maxLines = 14, onMore, moreLabel = "전체보기", showTail, children, ...props }, ref) => (
    <BubbleRow ref={ref} showTail={showTail} {...props}>
      <div className="relative max-w-[var(--kk-msg-max-width)] rounded-[var(--kk-radius-bubble)] bg-kk-bubble-incoming text-kk-bubble-incoming-fg">
        {showTail && <BubbleTail variant="incoming" className="text-kk-bubble-incoming" />}
        <div
          className="relative whitespace-pre-wrap break-keep px-[11px] pt-[8px] text-[15px] leading-[21px] tracking-[-0.01em]"
          style={{ display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: maxLines, overflow: "hidden" }}
        >
          {children}
        </div>
        {onMore ? (
          <button
            type="button"
            onClick={onMore}
            className="mt-[6px] flex w-full items-center justify-between px-[11px] pb-[9px] text-[12px] text-kk-text-secondary outline-none focus-visible:underline"
          >
            {moreLabel}
            <ChevronRightIcon size={14} strokeWidth={1.8} />
          </button>
        ) : (
          <div className="h-[8px]" />
        )}
      </div>
    </BubbleRow>
  )
);
BotAnswer.displayName = "BotAnswer";

interface BotActionCardProps extends BubbleRowProps {
  /** e.g. "답변 내용을 더 확인해보세요." */
  text: React.ReactNode;
  buttonLabel: string;
  onAction?: () => void;
}

/** The follow-up card under a bot answer: a line of text and one gray button. */
const BotActionCard = React.forwardRef<HTMLDivElement, BotActionCardProps>(
  ({ text, buttonLabel, onAction, ...props }, ref) => (
    <BubbleRow ref={ref} {...props}>
      <div className="w-[var(--kk-msg-max-width)] max-w-[var(--kk-msg-max-width)] rounded-[var(--kk-radius-bubble)] bg-kk-bubble-incoming p-[11px] text-kk-bubble-incoming-fg">
        <p className="text-[14px] leading-[1.4]">{text}</p>
        <button
          type="button"
          onClick={onAction}
          className="mt-[10px] h-[40px] w-full rounded-[8px] bg-kk-biz-button-bg text-[14px] text-kk-biz-button-fg outline-none active:brightness-95 focus-visible:ring-2 focus-visible:ring-kk-text-link"
        >
          {buttonLabel}
        </button>
      </div>
    </BubbleRow>
  )
);
BotActionCard.displayName = "BotActionCard";

export { BotAnswer, BotActionCard, type BotAnswerProps, type BotActionCardProps };
