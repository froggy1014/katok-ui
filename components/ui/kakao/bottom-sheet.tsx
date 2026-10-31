"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronRightIcon, SearchIcon } from "./icons";
import "@/components/ui/kakao/styles/kakao.css";

/**
 * KakaoTalk's bottom sheet surface: 44pt top corners and a grabber.
 * Presentational only — put it inside your own drawer/dialog for the
 * slide-up, scrim (`bg-kk-sheet-scrim`) and focus trap.
 */
interface BottomSheetProps extends React.HTMLAttributes<HTMLDivElement> {
  /** `gray` for sheets of white cards (통화하기). */
  tone?: "white" | "gray";
}

const BottomSheet = React.forwardRef<HTMLDivElement, BottomSheetProps>(
  ({ className, tone = "white", children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "font-kk flex max-h-full flex-col overflow-hidden rounded-t-[var(--kk-radius-sheet)] pb-[calc(12px+env(safe-area-inset-bottom))] text-kk-text-primary",
        tone === "gray" ? "bg-kk-sheet-fill" : "bg-kk-sheet-bg",
        className
      )}
      {...props}
    >
      <div aria-hidden="true" className="mx-auto mt-[8px] h-[5px] w-[36px] shrink-0 rounded-full bg-kk-sheet-grabber" />
      {children}
    </div>
  )
);
BottomSheet.displayName = "BottomSheet";

interface SheetSearchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "defaultValue" | "onChange"> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

/** Gray search field at the top of a sheet. */
const SheetSearch = React.forwardRef<HTMLInputElement, SheetSearchProps>(
  ({ className, value, defaultValue = "", onValueChange, placeholder, ...props }, ref) => {
    const [inner, setInner] = React.useState(defaultValue);
    return (
      <label
        className={cn(
          "mx-[16px] mt-[10px] flex h-[43px] shrink-0 items-center gap-[10px] rounded-[8px] bg-kk-sheet-fill px-[12px]",
          className
        )}
      >
        <SearchIcon size={20} strokeWidth={2.2} className="shrink-0 text-kk-text-primary" />
        <input
          ref={ref}
          type="search"
          value={value !== undefined ? value : inner}
          onChange={(e) => {
            if (value === undefined) setInner(e.target.value);
            onValueChange?.(e.target.value);
          }}
          placeholder={placeholder}
          aria-label={props["aria-label"] ?? placeholder}
          className="min-w-0 flex-1 bg-transparent text-[15px] text-kk-text-primary outline-none placeholder:text-kk-sheet-placeholder [&::-webkit-search-cancel-button]:hidden"
          {...props}
        />
      </label>
    );
  }
);
SheetSearch.displayName = "SheetSearch";

/** Centered bold sheet title (파일, 통화하기, 음성메시지). */
const SheetTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h2
      ref={ref}
      className={cn("shrink-0 pb-[20px] pt-[16px] text-center text-[18px] font-bold leading-none", className)}
      {...props}
    />
  )
);
SheetTitle.displayName = "SheetTitle";

interface SheetRowProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "title"> {
  icon: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  /**
   * `tile`: icon in a 48pt gray tile with a trailing chevron (파일).
   * `card`: white card with a tinted round icon (통화하기) — use with `tone="gray"`.
   */
  variant?: "tile" | "card";
  /** Tint classes for the `card` icon circle, e.g. `bg-kk-call-tint-bg text-kk-call-tint`. */
  iconClassName?: string;
}

const SheetRow = React.forwardRef<HTMLButtonElement, SheetRowProps>(
  ({ className, icon, title, description, variant = "tile", iconClassName, type = "button", ...props }, ref) => {
    const card = variant === "card";
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "flex w-full items-center text-left outline-none focus-visible:ring-2 focus-visible:ring-kk-text-link",
          card
            ? "min-h-[71px] gap-[16px] rounded-[16px] bg-kk-sheet-bg px-[16px] py-[14px] active:brightness-95"
            : "min-h-[64px] gap-[16px] px-[16px] py-[8px] active:bg-kk-list-pressed",
          className
        )}
        {...props}
      >
        <span
          aria-hidden="true"
          className={cn(
            "flex shrink-0 items-center justify-center",
            card ? "size-[40px] rounded-[40%]" : "size-[48px] rounded-[8px] bg-kk-sheet-fill text-kk-text-primary",
            iconClassName
          )}
        >
          {icon}
        </span>
        <span className="flex min-w-0 flex-1 flex-col gap-[2px]">
          <span className={cn("text-[17px] leading-[1.3]", card && "font-semibold")}>{title}</span>
          {description && <span className="text-[14px] leading-[1.3] text-kk-text-secondary">{description}</span>}
        </span>
        {!card && <ChevronRightIcon size={20} strokeWidth={1.6} className="shrink-0 text-kk-text-tertiary" />}
      </button>
    );
  }
);
SheetRow.displayName = "SheetRow";

export {
  BottomSheet,
  SheetSearch,
  SheetTitle,
  SheetRow,
  type BottomSheetProps,
  type SheetSearchProps,
  type SheetRowProps,
};
