import * as React from "react";
import { BubbleRow, type BubbleRowProps } from "./chat-bubble";
import { ShareIcon } from "./icons";
import "@/components/ui/kakao/styles/kakao.css";

interface MediaBubbleProps extends Omit<BubbleRowProps, "title"> {
  /** Poster image of the photo, video or short-form clip. */
  src: string;
  alt?: string;
  /** Source shown over the top edge, e.g. a channel. */
  source?: { name: string; avatar?: string; verified?: boolean };
  title?: React.ReactNode;
  /** Shows the round play mark in the bottom-right corner. */
  video?: boolean;
  /** Adds the round share button beside the card. */
  onShare?: () => void;
  /** Card size in pt; defaults to the device's 283×377 (3:4). */
  width?: number;
  height?: number;
}

/** Speech-bubble play mark (original drawing). */
function PlayMark() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
      <path fill="#fff" d="M14 1.5a12.5 12.5 0 0 1 0 25c-2 0-3.9-.47-5.6-1.3L2.5 26.5l1.4-5.4A12.5 12.5 0 0 1 14 1.5Z" />
      <path fill="#191919" d="M11.3 9.3v9.4l7.6-4.7z" />
    </svg>
  );
}

/**
 * A shared photo / video / short-form card: rounded poster, optional source
 * and title over a top scrim, play mark, and a side share button.
 */
const MediaBubble = React.forwardRef<HTMLDivElement, MediaBubbleProps>(
  (
    { src, alt = "", source, title, video = false, onShare, width = 283, height = 377, ...props },
    ref
  ) => (
    <BubbleRow ref={ref} {...props}>
      <div
        className="relative shrink-0 overflow-hidden rounded-[16px] bg-kk-gray-200"
        style={{ width, height, maxWidth: "calc(100% - 64px)" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} loading="lazy" decoding="async" className="h-full w-full object-cover" />
        {(source || title) && (
          <div className="absolute inset-x-0 top-0 bg-gradient-to-b from-black/45 to-transparent px-[16px] pb-[28px] pt-[16px] text-kk-always-white">
            {source && (
              <p className="flex items-center gap-[6px] text-[15px] leading-none">
                {source.avatar && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={source.avatar} alt="" className="size-[19px] rounded-[40%] object-cover" />
                )}
                <span className="truncate">{source.name}</span>
                {source.verified && (
                  <svg width="15" height="15" viewBox="0 0 16 16" aria-label="인증됨" role="img">
                    <circle cx="8" cy="8" r="8" fill="#fff" />
                    <path d="m4.6 8.2 2.2 2.2 4.6-4.6" fill="none" stroke="#191919" strokeWidth="1.8" />
                  </svg>
                )}
              </p>
            )}
            {title && <p className="mt-[10px] line-clamp-2 text-[17px] font-bold leading-[1.3]">{title}</p>}
          </div>
        )}
        {video && (
          <span className="absolute bottom-[14px] right-[14px]">
            <PlayMark />
          </span>
        )}
      </div>
      {onShare && (
        <button
          type="button"
          aria-label="공유"
          onClick={onShare}
          className="mx-[6px] flex size-[37px] shrink-0 items-center justify-center self-center rounded-full bg-kk-glass-bg text-kk-chat-header-fg outline-none focus-visible:ring-2 focus-visible:ring-kk-yellow"
        >
          <ShareIcon size={18} strokeWidth={1.9} />
        </button>
      )}
    </BubbleRow>
  )
);
MediaBubble.displayName = "MediaBubble";
/** Read by MessageGroup: pass the group tail on to the next bubble. */
(MediaBubble as unknown as { kkNoTail: boolean }).kkNoTail = true;

export { MediaBubble, type MediaBubbleProps };
