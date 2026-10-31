import * as React from "react";
import { BubbleRow, type BubbleRowProps } from "./chat-bubble";
import "@/components/ui/kakao/styles/kakao.css";

interface StickerMessageProps extends BubbleRowProps {
  /** Image URL of the sticker (or pass your own node as children). */
  src?: string;
  alt?: string;
  /** Rendered edge in px; the device shows stickers at about 150pt. */
  size?: number;
}

/**
 * An emoticon / sticker message: the art alone, no bubble or tail. Works
 * inside `<MessageGroup>` like a `<ChatBubble>` (time and unread sit beside it).
 */
const StickerMessage = React.forwardRef<HTMLDivElement, StickerMessageProps>(
  ({ src, alt = "이모티콘", size = 150, children, ...props }, ref) => (
    <BubbleRow ref={ref} {...props}>
      <div className="shrink-0" style={{ width: size, height: size }}>
        {children ?? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={alt} loading="lazy" decoding="async" className="h-full w-full object-contain" />
        )}
      </div>
    </BubbleRow>
  )
);
StickerMessage.displayName = "StickerMessage";
/** Read by MessageGroup: pass the group tail on to the next bubble. */
(StickerMessage as unknown as { kkNoTail: boolean }).kkNoTail = true;

export { StickerMessage, type StickerMessageProps };
