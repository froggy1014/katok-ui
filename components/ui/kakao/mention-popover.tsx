"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ProfileAvatar } from "./profile-avatar";
import "@/components/ui/kakao/styles/kakao.css";

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

export { MentionPopover, type MentionCandidate, type MentionPopoverProps };
