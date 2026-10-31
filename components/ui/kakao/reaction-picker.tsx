"use client";

import * as React from "react";
import { BottomSheet, SheetSearch } from "./bottom-sheet";
import "@/components/ui/kakao/styles/kakao.css";

interface ReactionOption {
  id: string;
  /** A Unicode emoji, or your own image/node. */
  emoji: React.ReactNode;
  /** Accessible name; also what the search matches. */
  label: string;
  keywords?: string[];
}

interface ReactionSection {
  label: string;
  reactions: ReactionOption[];
}

interface ReactionPickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  sections: ReactionSection[];
  onSelect?: (id: string) => void;
  /** Search field value. Omit to let the picker filter by label/keywords itself. */
  query?: string;
  onQueryChange?: (query: string) => void;
  searchPlaceholder?: string;
  emptyText?: React.ReactNode;
}

const matches = (r: ReactionOption, q: string) =>
  [r.label, ...(r.keywords ?? [])].some((k) => k.toLowerCase().includes(q));

/** The sheet that opens from the reaction "+" chip: search, then sectioned 6-column emoji grid. */
const ReactionPicker = React.forwardRef<HTMLDivElement, ReactionPickerProps>(
  (
    {
      className,
      sections,
      onSelect,
      query,
      onQueryChange,
      searchPlaceholder = "찾고 싶은 리액션 검색",
      emptyText = "검색 결과가 없어요",
      ...props
    },
    ref
  ) => {
    const [inner, setInner] = React.useState("");
    const q = (query ?? inner).trim().toLowerCase();
    const visible = q
      ? [{ label: "검색 결과", reactions: sections.flatMap((s) => s.reactions).filter((r) => matches(r, q)) }]
      : sections;

    return (
      <BottomSheet ref={ref} className={className} {...props}>
        <SheetSearch
          value={query ?? inner}
          onValueChange={(v) => {
            if (query === undefined) setInner(v);
            onQueryChange?.(v);
          }}
          placeholder={searchPlaceholder}
        />
        <div className="min-h-0 flex-1 overflow-y-auto px-[16px] pb-[8px]">
          {visible.every((s) => s.reactions.length === 0) ? (
            <p className="py-[40px] text-center text-[14px] text-kk-sheet-placeholder">{emptyText}</p>
          ) : (
            visible.map((s) =>
              s.reactions.length === 0 ? null : (
                <section key={s.label} aria-label={s.label}>
                  <h3 className="mb-[10px] mt-[20px] text-[14px] font-semibold leading-none text-kk-text-primary">
                    {s.label}
                  </h3>
                  <div className="grid grid-cols-6">
                    {s.reactions.map((r) => (
                      <button
                        key={r.id}
                        type="button"
                        aria-label={r.label}
                        onClick={() => onSelect?.(r.id)}
                        className="flex h-[46px] items-center justify-center rounded-[12px] text-[30px] leading-none outline-none active:bg-kk-sheet-fill focus-visible:ring-2 focus-visible:ring-kk-text-link"
                      >
                        <span aria-hidden="true">{r.emoji}</span>
                      </button>
                    ))}
                  </div>
                </section>
              )
            )
          )}
        </div>
      </BottomSheet>
    );
  }
);
ReactionPicker.displayName = "ReactionPicker";

export { ReactionPicker, type ReactionPickerProps, type ReactionSection, type ReactionOption };
