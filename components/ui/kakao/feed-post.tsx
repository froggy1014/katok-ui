import * as React from "react";
import { cn } from "@/lib/utils";
import { HeartIcon, MessageCircleIcon, MoreHorizontalIcon } from "./icons";
import { ProfileAvatar } from "./profile-avatar";
import "@/components/ui/kakao/styles/kakao.css";

interface FeedPostProps extends React.HTMLAttributes<HTMLElement> {
  author: { name: string; avatar?: string };
  /** "1시간 전 · 프로필 업데이트" */
  meta?: React.ReactNode;
  image?: string;
  imageAlt?: string;
  /** Text under the image, if any. */
  caption?: React.ReactNode;
  liked?: boolean;
  onLike?: () => void;
  onComment?: () => void;
  onMore?: () => void;
}

/** A post in the friends tab's 소식 feed: author row, rounded photo, like and comment. */
const FeedPost = React.forwardRef<HTMLElement, FeedPostProps>(
  ({ className, author, meta, image, imageAlt = "", caption, liked = false, onLike, onComment, onMore, ...props }, ref) => (
    <article ref={ref} className={cn("font-kk px-[16px] py-[12px] text-kk-list-title", className)} {...props}>
      <header className="flex items-center gap-[10px]">
        <ProfileAvatar src={author.avatar} name={author.name} size={36} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[16px] font-bold leading-[1.3]">{author.name}</p>
          {meta && <p className="truncate text-[14px] leading-[1.3] text-kk-text-secondary">{meta}</p>}
        </div>
        {onMore && (
          <button type="button" aria-label="더보기" onClick={onMore} className="text-kk-text-secondary outline-none">
            <MoreHorizontalIcon size={22} />
          </button>
        )}
      </header>
      {image && (
        <div className="mt-[12px] aspect-square overflow-hidden rounded-[16px] bg-kk-gray-200">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt={imageAlt} loading="lazy" decoding="async" className="h-full w-full object-cover" />
        </div>
      )}
      {caption && <p className="mt-[10px] text-[15px] leading-[1.45]">{caption}</p>}
      <div className="mt-[10px] flex items-center gap-[14px]">
        <button
          type="button"
          aria-label="좋아요"
          aria-pressed={liked}
          onClick={onLike}
          className={cn("outline-none", liked ? "text-kk-critical" : "text-kk-list-title")}
        >
          <HeartIcon size={26} strokeWidth={1.8} className={liked ? "fill-current" : undefined} />
        </button>
        <button type="button" aria-label="댓글" onClick={onComment} className="outline-none">
          <MessageCircleIcon size={26} strokeWidth={1.8} />
        </button>
      </div>
    </article>
  )
);
FeedPost.displayName = "FeedPost";

export { FeedPost, type FeedPostProps };
