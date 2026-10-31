"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ProfileAvatar } from "./profile-avatar";
import "@/components/ui/kakao/styles/kakao.css";

/** An inline `@이름` in a bubble or the input, in KakaoTalk's mention blue. */
const Mention = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, children, ...props }, ref) => (
    <span ref={ref} className={cn("text-kk-mention", className)} {...props}>
      @{children}
    </span>
  )
);
Mention.displayName = "Mention";

/**
 * Splits plain text into text and `<Mention>` nodes for the given names, so
 * "@김민지 내일 봐" renders with the name in blue. Longest names match first.
 */
function withMentions(text: string, names: string[]): React.ReactNode[] {
  if (!names.length) return [text];
  const escaped = [...names].sort((a, b) => b.length - a.length).map((n) => n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const parts = text.split(new RegExp(`@(${escaped.join("|")})`, "g"));
  // split() with one capture group alternates: text, name, text, name, …
  return parts.map((p, i) => (i % 2 ? <Mention key={i}>{p}</Mention> : p)).filter((p) => p !== "");
}

interface MentionCandidate {
  id: string;
  name: string;
  avatar?: string;
  /** The viewer: gets the round "나" badge. */
  me?: boolean;
  /** A chatbot or channel; pass your own mark as `avatarNode`. */
  avatarNode?: React.ReactNode;
}

interface MentionPopoverProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  candidates: MentionCandidate[];
  /** Highlighted row (keyboard focus lives in the input, so the parent tracks it). */
  activeId?: string;
  onSelect?: (candidate: MentionCandidate) => void;
}

/**
 * The member list that pops up above the input after typing "@". Render it
 * just above `<MessageInput>`; drive `activeId` from the input's arrow keys.
 */
const MentionPopover = React.forwardRef<HTMLDivElement, MentionPopoverProps>(
  ({ className, candidates, activeId, onSelect, ...props }, ref) => (
    <div
      ref={ref}
      role="listbox"
      aria-label="멘션할 멤버"
      className={cn(
        "font-kk max-h-[220px] overflow-y-auto rounded-[14px] bg-kk-menu-bg py-[4px] shadow-[var(--kk-menu-shadow)]",
        className
      )}
      {...props}
    >
      {candidates.map((c) => (
        <button
          key={c.id}
          type="button"
          role="option"
          aria-selected={c.id === activeId}
          onMouseDown={(e) => e.preventDefault()} // keep focus in the input
          onClick={() => onSelect?.(c)}
          className="flex h-[46px] w-full items-center gap-[10px] px-[12px] text-left text-[15px] text-kk-menu-fg outline-none aria-selected:bg-kk-menu-pressed hover:bg-kk-menu-pressed"
        >
          {c.avatarNode ?? <ProfileAvatar src={c.avatar} name={c.name} size={30} />}
          {c.me && (
            <span
              aria-label="나"
              className="flex size-[16px] shrink-0 items-center justify-center rounded-full bg-kk-gray-700 text-[10px] font-bold leading-none text-kk-always-white"
            >
              나
            </span>
          )}
          <span className="truncate">{c.name}</span>
        </button>
      ))}
    </div>
  )
);
MentionPopover.displayName = "MentionPopover";

export { Mention, MentionPopover, withMentions, type MentionCandidate, type MentionPopoverProps };
