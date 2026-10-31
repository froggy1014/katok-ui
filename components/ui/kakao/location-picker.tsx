"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { CrosshairIcon, SearchIcon, XIcon } from "./icons";
import "@/components/ui/kakao/styles/kakao.css";

interface LocationCategory {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface LocationPickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: string;
  onClose?: () => void;
  /** Search field props (value, onChange, placeholder …). */
  searchProps?: React.InputHTMLAttributes<HTMLInputElement>;
  /** Quick filters over the map (친구위치 · 카페 · 음식점 · 편의점 · 주차장). */
  categories?: LocationCategory[];
  onCategory?: (id: string) => void;
  /** The picked place, e.g. "서울 서초구 서초동 1739-1". */
  address?: React.ReactNode;
  /** Distance from you, e.g. "0m". */
  distance?: React.ReactNode;
  sendLabel?: string;
  onSend?: () => void;
  onLocate?: () => void;
  /** Your map (Kakao Maps, Leaflet, a static image …); it fills the screen. */
  children?: React.ReactNode;
}

const FLOAT = "bg-kk-sheet-bg shadow-[0_2px_10px_rgba(0,0,0,0.12)]";

/**
 * 지도 → 이 위치 보내기: a full-screen picker whose chrome floats over the
 * map you pass as children (the center pin is yours to draw).
 */
const LocationPicker = React.forwardRef<HTMLDivElement, LocationPickerProps>(
  (
    {
      className,
      title = "지도",
      onClose,
      searchProps,
      categories,
      onCategory,
      address,
      distance,
      sendLabel = "이 위치 보내기",
      onSend,
      onLocate,
      children,
      ...props
    },
    ref
  ) => (
    <div
      ref={ref}
      className={cn("font-kk relative flex h-full w-full flex-col overflow-hidden text-kk-text-primary", className)}
      {...props}
    >
      <header className="relative z-10 flex h-[60px] shrink-0 items-center justify-center bg-kk-sheet-bg">
        <button
          type="button"
          aria-label="닫기"
          onClick={onClose}
          className={cn(FLOAT, "absolute left-[16px] flex size-[44px] items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-kk-text-link")}
        >
          <XIcon size={24} strokeWidth={1.8} />
        </button>
        <h1 className="text-[20px] font-bold">{title}</h1>
      </header>

      <div className="relative min-h-0 flex-1">
        <div className="absolute inset-0">{children}</div>

        <div className="absolute inset-x-0 top-[8px] flex flex-col gap-[12px]">
          <label className={cn(FLOAT, "mx-[16px] flex h-[45px] items-center gap-[12px] rounded-[12px] px-[14px]")}>
            <SearchIcon size={22} strokeWidth={2} className="shrink-0" />
            <input
              type="search"
              placeholder="검색어를 입력하세요"
              aria-label={searchProps?.placeholder ?? "검색어를 입력하세요"}
              {...searchProps}
              className="min-w-0 flex-1 bg-transparent text-[17px] outline-none placeholder:text-kk-sheet-placeholder [&::-webkit-search-cancel-button]:hidden"
            />
          </label>
          {categories && categories.length > 0 && (
            <div className="flex gap-[5px] overflow-x-auto px-[16px] pb-[6px] [scrollbar-width:none]">
              {categories.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => onCategory?.(c.id)}
                  className={cn(FLOAT, "flex h-[32px] shrink-0 items-center gap-[6px] rounded-full px-[12px] text-[15px] outline-none focus-visible:ring-2 focus-visible:ring-kk-text-link")}
                >
                  {c.icon && <span aria-hidden="true" className="flex size-[18px] items-center justify-center">{c.icon}</span>}
                  {c.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="absolute inset-x-0 bottom-0 flex flex-col items-end gap-[12px] px-[16px] pb-[calc(16px+env(safe-area-inset-bottom))]">
          <button
            type="button"
            aria-label="현재 위치"
            onClick={onLocate}
            className={cn(FLOAT, "flex size-[40px] items-center justify-center rounded-full text-kk-map-primary outline-none focus-visible:ring-2 focus-visible:ring-kk-text-link")}
          >
            <CrosshairIcon size={22} strokeWidth={1.8} />
          </button>
          <div className={cn(FLOAT, "w-full rounded-[20px] p-[16px]")}>
            {address && <p className="text-[19px] font-bold leading-[1.3]">{address}</p>}
            {distance && <p className="mt-[2px] text-[15px] text-kk-text-secondary">{distance}</p>}
            <button
              type="button"
              onClick={onSend}
              className="mt-[14px] h-[40px] w-full rounded-[10px] bg-kk-map-primary text-[17px] text-kk-always-white outline-none active:brightness-95 focus-visible:ring-2 focus-visible:ring-kk-text-link focus-visible:ring-offset-2"
            >
              {sendLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
);
LocationPicker.displayName = "LocationPicker";

export { LocationPicker, type LocationPickerProps, type LocationCategory };
