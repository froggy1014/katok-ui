import * as React from "react";
import { cn } from "@/lib/utils";
import { ProfileAvatar } from "./profile-avatar";
import "@/components/ui/kakao/styles/kakao.css";

interface CommunityPostProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  /** Open chat room the post comes from ("유럽 여행 수다방"). */
  title: React.ReactNode;
  author: string;
  avatar?: string;
  /** "30분 전" */
  time?: React.ReactNode;
  /** Topic tag with its tint, e.g. { label: "여행", tone: "purple" }. */
  tag?: { label: string; tone?: "purple" | "green" | "blue" | "orange" };
  body?: React.ReactNode;
  image?: string;
  /** Reaction emoji (up to three are stacked) and the total. */
  reactions?: { emoji: string[]; count: number };
  comments?: number;
  /** Replies under the post, usually `<CommunityReply>`s; a thread line joins them. */
  children?: React.ReactNode;
}

const TONES = {
  purple: "bg-[#efeaff] text-[#7a5af5]",
  green: "bg-[#e6f6ec] text-[#22a35a]",
  blue: "bg-[#e6f0ff] text-[#2f6fe0]",
  orange: "bg-[#fff0e3] text-[#e57a1f]",
};

/** A post on the 지금 tab's open-chat community list, with its replies threaded below. */
const CommunityPost = React.forwardRef<HTMLElement, CommunityPostProps>(
  ({ className, title, author, avatar, time, tag, body, image, reactions, comments, children, ...props }, ref) => (
    <article ref={ref} className={cn("font-kk relative px-[16px] py-[12px] text-kk-list-title", className)} {...props}>
      {children && (
        <span aria-hidden="true" className="absolute bottom-[12px] left-[31px] top-[48px] w-px bg-kk-sheet-divider" />
      )}
      <div className="flex gap-[10px]">
        <ProfileAvatar src={avatar} name={author} size={30} className="relative" />
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-[16px] font-bold leading-[1.3]">{title}</h3>
          <p className="mt-[2px] flex items-center gap-[6px] text-[13px] text-kk-text-secondary">
            <span className="truncate">
              {author}
              {time && <> · {time}</>}
            </span>
            {tag && (
              <span className={cn("shrink-0 rounded-[4px] px-[5px] py-[1px] text-[11px] font-semibold", TONES[tag.tone ?? "purple"])}>
                {tag.label}
              </span>
            )}
          </p>
          {body && <p className="mt-[8px] whitespace-pre-line text-[15px] leading-[1.45]">{body}</p>}
          {image && (
            <div className="mt-[10px] aspect-[16/9] overflow-hidden rounded-[12px] bg-kk-gray-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
            </div>
          )}
          {(reactions || comments != null) && (
            <p className="mt-[8px] flex items-center gap-[4px] text-[14px] text-kk-text-secondary">
              {reactions && (
                <>
                  <span aria-hidden="true" className="flex -space-x-[4px]">
                    {reactions.emoji.slice(0, 3).map((e, i) => (
                      <span key={i} className="text-[15px] leading-none">
                        {e}
                      </span>
                    ))}
                  </span>
                  <span>{reactions.count}</span>
                </>
              )}
              {reactions && comments != null && <span>·</span>}
              {comments != null && <span>댓글 {comments}</span>}
            </p>
          )}
        </div>
      </div>
      {children && <div className="mt-[10px] flex flex-col gap-[12px]">{children}</div>}
    </article>
  )
);
CommunityPost.displayName = "CommunityPost";

interface CommunityReplyProps extends React.HTMLAttributes<HTMLDivElement> {
  author: string;
  avatar?: string;
  time?: React.ReactNode;
}

/** A reply under a community post, hooked to the thread line. */
const CommunityReply = React.forwardRef<HTMLDivElement, CommunityReplyProps>(
  ({ className, author, avatar, time, children, ...props }, ref) => (
    <div ref={ref} className={cn("relative flex gap-[8px] pl-[30px]", className)} {...props}>
      <span aria-hidden="true" className="absolute left-[15px] top-0 h-[14px] w-[12px] rounded-bl-[10px] border-b border-l border-kk-sheet-divider" />
      <ProfileAvatar src={avatar} name={author} size={24} />
      <div className="min-w-0 flex-1">
        <p className="text-[14px]">
          <span className="font-bold">{author}</span>
          {time && <span className="text-kk-text-secondary"> · {time}</span>}
        </p>
        <p className="mt-[2px] whitespace-pre-line text-[15px] leading-[1.45]">{children}</p>
      </div>
    </div>
  )
);
CommunityReply.displayName = "CommunityReply";

export { CommunityPost, CommunityReply, type CommunityPostProps, type CommunityReplyProps };
