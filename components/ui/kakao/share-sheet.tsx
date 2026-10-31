"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { BottomSheet, SheetSearch } from "./bottom-sheet";
import "@/components/ui/kakao/styles/kakao.css";

interface ShareSheetFilter {
  value: string;
  label: string;
}

interface ShareSheetProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Search field value. Omit for an uncontrolled field. */
  query?: string;
  defaultQuery?: string;
  onQueryChange?: (query: string) => void;
  searchPlaceholder?: string;
  /** Filter chips under the search field (전체 / 친구 / 최근 공유). */
  filters?: ShareSheetFilter[];
  /** Active chip value. Omit for uncontrolled; defaults to the first chip. */
  filter?: string;
  defaultFilter?: string;
  onFilterChange?: (value: string) => void;
  /** Quick-share row pinned to the bottom, usually `<ShareTarget>`s. */
  targets?: React.ReactNode;
  /** Selectable rows, usually `<ChatListItem selected={…}>`. */
  children?: React.ReactNode;
}

/**
 * The bottom sheet KakaoTalk opens to share into a chat: grabber, search,
 * filter chips, a picker list and a quick-share row. Built on `BottomSheet`,
 * so it is presentational too — bring your own drawer for the slide-up.
 */
const ShareSheet = React.forwardRef<HTMLDivElement, ShareSheetProps>(
  (
    {
      className,
      query,
      defaultQuery = "",
      onQueryChange,
      searchPlaceholder = "공유하고 싶은 친구, 채팅방 검색 (초성 가능)",
      filters,
      filter,
      defaultFilter,
      onFilterChange,
      targets,
      children,
      ...props
    },
    ref
  ) => {
    const [innerFilter, setInnerFilter] = React.useState(defaultFilter ?? filters?.[0]?.value);
    const active = filter !== undefined ? filter : innerFilter;

    return (
      <BottomSheet ref={ref} className={className} {...props}>
        <SheetSearch
          value={query}
          defaultValue={defaultQuery}
          onValueChange={onQueryChange}
          placeholder={searchPlaceholder}
        />

        {filters && filters.length > 0 && (
          <div role="group" aria-label="필터" className="mt-[16px] flex shrink-0 gap-[7px] overflow-x-auto px-[16px]">
            {filters.map((f) => {
              const on = f.value === active;
              return (
                <button
                  key={f.value}
                  type="button"
                  aria-pressed={on}
                  onClick={() => {
                    if (filter === undefined) setInnerFilter(f.value);
                    onFilterChange?.(f.value);
                  }}
                  className={cn(
                    "h-[36px] shrink-0 rounded-full px-[12px] text-[14px] leading-none outline-none transition-colors focus-visible:ring-2 focus-visible:ring-kk-text-link",
                    on ? "bg-kk-chip-selected text-kk-chip-selected-fg" : "border border-kk-chip-border text-kk-chip-fg"
                  )}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        )}

        {/* Rows sit 76pt apart here, taller than the Chats tab. */}
        <div className="mt-[6px] min-h-0 flex-1 overflow-y-auto *:py-[14px]">{children}</div>

        {targets && (
          <div className="flex shrink-0 overflow-x-auto border-t border-kk-divider px-[9px] pt-[16px]">{targets}</div>
        )}
      </BottomSheet>
    );
  }
);
ShareSheet.displayName = "ShareSheet";

interface ShareTargetProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  label: string;
}

/** Round quick-share button with a caption (나에게, 더보기, an app). */
const ShareTarget = React.forwardRef<HTMLButtonElement, ShareTargetProps>(
  ({ className, icon, label, type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(
        "group flex w-[66px] shrink-0 flex-col items-center gap-[9px] outline-none",
        className
      )}
      {...props}
    >
      <span className="flex size-[52px] items-center justify-center rounded-full bg-kk-sheet-fill text-kk-text-primary transition-[filter] group-active:brightness-95 group-focus-visible:ring-2 group-focus-visible:ring-kk-text-link">
        {icon}
      </span>
      <span className="w-full truncate text-center text-[14px] leading-none text-kk-sheet-label">{label}</span>
    </button>
  )
);
ShareTarget.displayName = "ShareTarget";

export { ShareSheet, ShareTarget, type ShareSheetProps, type ShareSheetFilter, type ShareTargetProps };
