"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import "@/components/ui/kakao/styles/kakao.css";

interface FilterChip {
  value: string;
  label: React.ReactNode;
  /** Orange count badge, e.g. unread chats in a folder. */
  count?: number;
}

interface FilterChipsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  items: FilterChip[];
  /** Active chip. Omit for uncontrolled; defaults to the first chip. */
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** `md` (42pt) for tab headers — 채팅 folders, 친구 / 소식; `sm` (36pt) inside sheets. */
  size?: "sm" | "md";
  /** Extra chip after the list, e.g. the folder-edit button. */
  trailing?: React.ReactNode;
}

/**
 * Horizontal pill filters: black when active, outlined otherwise, with an
 * optional orange count. Used by the chats-tab folders, the friends tab
 * toggle and the share sheet.
 */
const FilterChips = React.forwardRef<HTMLDivElement, FilterChipsProps>(
  ({ className, items, value, defaultValue, onValueChange, size = "md", trailing, ...props }, ref) => {
    const [inner, setInner] = React.useState(defaultValue ?? items[0]?.value);
    const active = value !== undefined ? value : inner;
    const md = size === "md";
    return (
      <div
        ref={ref}
        role="group"
        className={cn(
          "font-kk flex shrink-0 overflow-x-auto px-[16px] [scrollbar-width:none]",
          md ? "gap-[8px]" : "gap-[7px]",
          className
        )}
        {...props}
      >
        {items.map((it) => {
          const on = it.value === active;
          return (
            <button
              key={it.value}
              type="button"
              aria-pressed={on}
              onClick={() => {
                if (value === undefined) setInner(it.value);
                onValueChange?.(it.value);
              }}
              className={cn(
                "flex shrink-0 items-center gap-[6px] rounded-full leading-none outline-none transition-colors focus-visible:ring-2 focus-visible:ring-kk-text-link",
                md ? "h-[42px] px-[18px] text-[17px] font-semibold" : "h-[36px] px-[12px] text-[14px]",
                on ? "bg-kk-chip-selected text-kk-chip-selected-fg" : "border border-kk-chip-border text-kk-chip-fg"
              )}
            >
              {it.label}
              {!!it.count && (
                <span
                  aria-label={`${it.count}개`}
                  className="flex h-[17px] min-w-[21px] items-center justify-center rounded-full bg-kk-badge px-[5px] text-[12px] font-bold text-kk-badge-fg"
                >
                  {it.count > 999 ? "999+" : it.count}
                </span>
              )}
            </button>
          );
        })}
        {trailing}
      </div>
    );
  }
);
FilterChips.displayName = "FilterChips";

export { FilterChips, type FilterChip, type FilterChipsProps };
