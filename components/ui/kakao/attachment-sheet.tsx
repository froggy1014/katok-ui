"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { BottomSheet } from "./bottom-sheet";
import { CameraIcon, CheckIcon, ChevronRightIcon } from "./icons";
import "@/components/ui/kakao/styles/kakao.css";

/**
 * The sheet the chat input's "+" opens: recent photos, then grouped
 * attachments (사진 · 송금 | 통화 · 선물하기 | 지도 · … | 파일 · 일정) and a
 * promo banner. Built on `BottomSheet`; compose it from the parts below.
 */
const AttachmentSheet = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <BottomSheet ref={ref} aria-label="첨부" className={className} {...props}>
      <div className="min-h-0 flex-1 overflow-y-auto pb-[8px]">{children}</div>
    </BottomSheet>
  )
);
AttachmentSheet.displayName = "AttachmentSheet";

interface AttachmentPhoto {
  id: string;
  src: string;
  alt?: string;
}

interface AttachmentPhotosProps extends Omit<React.HTMLAttributes<HTMLElement>, "onToggle"> {
  title?: string;
  photos: AttachmentPhoto[];
  /** Selected photo ids, in pick order. */
  selected?: string[];
  onToggle?: (id: string) => void;
  onCamera?: () => void;
  /** 전송 — enabled once something is selected. */
  onSend?: () => void;
}

/** "최근 사진": a camera tile and a horizontal strip of selectable thumbnails. */
const AttachmentPhotos = React.forwardRef<HTMLElement, AttachmentPhotosProps>(
  ({ className, title = "최근 사진", photos, selected = [], onToggle, onCamera, onSend, ...props }, ref) => (
    <section ref={ref} aria-label={title} className={cn("pt-[14px]", className)} {...props}>
      <div className="flex items-center justify-between pl-[20px] pr-[10px]">
        <h3 className="text-[18px] font-bold leading-none tracking-[-0.01em] text-kk-text-primary">{title}</h3>
        <button
          type="button"
          disabled={selected.length === 0}
          onClick={onSend}
          className="h-[30px] min-w-[45px] rounded-full bg-kk-yellow px-[10px] text-[15px] font-medium text-kk-on-yellow outline-none focus-visible:ring-2 focus-visible:ring-kk-text-link disabled:bg-kk-attach-send-disabled disabled:text-kk-attach-send-disabled-fg"
        >
          {selected.length > 0 ? `전송 ${selected.length}` : "전송"}
        </button>
      </div>

      <div className="mt-[18px] flex gap-[6px] overflow-x-auto px-[16px] [scrollbar-width:none]">
        <button
          type="button"
          aria-label="카메라"
          onClick={onCamera}
          className="flex size-[104px] shrink-0 items-center justify-center rounded-[12px] bg-kk-attach-camera text-kk-always-white outline-none focus-visible:ring-2 focus-visible:ring-kk-text-link"
        >
          <CameraIcon size={34} strokeWidth={1.8} />
        </button>
        {photos.map((p) => {
          const order = selected.indexOf(p.id);
          const on = order >= 0;
          return (
            <button
              key={p.id}
              type="button"
              role="checkbox"
              aria-checked={on}
              aria-label={p.alt ?? "사진"}
              onClick={() => onToggle?.(p.id)}
              className="relative size-[104px] shrink-0 overflow-hidden rounded-[12px] bg-kk-sheet-fill outline-none focus-visible:ring-2 focus-visible:ring-kk-text-link"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.src} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
              <span
                aria-hidden="true"
                className={cn(
                  "absolute right-[6px] top-[6px] flex size-[22px] items-center justify-center rounded-full text-[12px] font-bold",
                  on
                    ? "bg-kk-check-selected text-kk-check-selected-fg"
                    : "border-[1.5px] border-kk-always-white bg-black/10 shadow-[0_0_2px_rgba(0,0,0,0.3)]"
                )}
              >
                {on && (selected.length > 1 ? order + 1 : <CheckIcon size={13} strokeWidth={3} />)}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  )
);
AttachmentPhotos.displayName = "AttachmentPhotos";

/** A block of rows; every group after the first gets a full-width divider. */
const AttachmentGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      role="group"
      className={cn("py-[10px] [&+&]:border-t [&+&]:border-kk-attach-divider", className)}
      {...props}
    />
  )
);
AttachmentGroup.displayName = "AttachmentGroup";

interface AttachmentItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** A colored glyph, ~24px (통화 green, 선물하기 red, 지도 blue …). */
  icon: React.ReactNode;
  label: string;
}

const AttachmentItem = React.forwardRef<HTMLButtonElement, AttachmentItemProps>(
  ({ className, icon, label, type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(
        "flex h-[46px] w-full items-center gap-[13px] pl-[21px] pr-[16px] text-left text-[17px] tracking-[-0.01em] text-kk-text-primary outline-none hover:bg-kk-list-pressed active:bg-kk-list-pressed focus-visible:bg-kk-list-pressed",
        className
      )}
      {...props}
    >
      <span aria-hidden="true" className="flex size-[24px] shrink-0 items-center justify-center">
        {icon}
      </span>
      {label}
    </button>
  )
);
AttachmentItem.displayName = "AttachmentItem";

interface AttachmentBannerProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "title"> {
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Illustration on the right. */
  art?: React.ReactNode;
}

/** Gray promo card at the bottom (e.g. "맞춤법, 번역 그리고 챗봇까지!"). */
const AttachmentBanner = React.forwardRef<HTMLButtonElement, AttachmentBannerProps>(
  ({ className, title, description, art, type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(
        "mx-[16px] mt-[12px] flex min-h-[60px] w-[calc(100%-32px)] items-center justify-between gap-[12px] rounded-[12px] bg-kk-sheet-fill px-[16px] py-[12px] text-left outline-none focus-visible:ring-2 focus-visible:ring-kk-text-link",
        className
      )}
      {...props}
    >
      <span className="flex min-w-0 flex-col gap-[4px]">
        <span className="text-[16px] font-bold leading-[1.25] text-kk-text-primary">{title}</span>
        {description && (
          <span className="flex items-center gap-[2px] text-[15px] leading-[1.25] text-kk-attach-banner-fg">
            {description}
            <ChevronRightIcon size={16} strokeWidth={2} />
          </span>
        )}
      </span>
      {art && <span className="shrink-0">{art}</span>}
    </button>
  )
);
AttachmentBanner.displayName = "AttachmentBanner";

export {
  AttachmentSheet,
  AttachmentPhotos,
  AttachmentGroup,
  AttachmentItem,
  AttachmentBanner,
  type AttachmentPhoto,
  type AttachmentPhotosProps,
  type AttachmentItemProps,
  type AttachmentBannerProps,
};
