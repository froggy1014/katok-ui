"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { SearchIcon } from "./icons";
import "@/components/ui/kakao/styles/kakao.css";

/**
 * KakaoTalk's bottom sheet surface: 44pt top corners and a grabber.
 * Presentational only — put it inside your own drawer/dialog for the
 * slide-up, scrim (`bg-kk-sheet-scrim`) and focus trap.
 */
const BottomSheet = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "font-kk flex max-h-full flex-col overflow-hidden rounded-t-[var(--kk-radius-sheet)] bg-kk-sheet-bg pb-[calc(12px+env(safe-area-inset-bottom))] text-kk-text-primary",
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

export { BottomSheet, SheetSearch, type SheetSearchProps };
