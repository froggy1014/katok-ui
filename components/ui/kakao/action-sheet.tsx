"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import "@/components/ui/kakao/styles/kakao.css";

interface ActionSheetAction {
  id: string;
  label: React.ReactNode;
  destructive?: boolean;
  disabled?: boolean;
}

interface ActionSheetProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  actions: ActionSheetAction[];
  onSelect?: (id: string) => void;
  /** Last pill; set to `null` to drop it. */
  cancelLabel?: React.ReactNode | null;
  onCancel?: () => void;
}

/**
 * iOS 26 action sheet: a floating glass card of stacked pill buttons with
 * 취소 last (e.g. 송금하기 · 요청하기 · 1/N 정산하기 · 정산 사다리타기).
 * Center it over a dimmed chat yourself.
 */
const ActionSheet = React.forwardRef<HTMLDivElement, ActionSheetProps>(
  ({ className, actions, onSelect, cancelLabel = "취소", onCancel, onKeyDown, ...props }, ref) => {
    const pill =
      "h-[47px] w-full shrink-0 rounded-full bg-kk-action-button text-[17px] font-medium tracking-[-0.01em] outline-none transition-[filter] active:brightness-90 focus-visible:ring-2 focus-visible:ring-kk-text-link disabled:opacity-40";
    return (
      <div
        ref={ref}
        role="menu"
        className={cn(
          "font-kk flex w-[319px] max-w-full flex-col gap-[9px] rounded-[34px] border border-white/60 bg-kk-action-card p-[15px] text-kk-text-primary shadow-[0_10px_40px_rgba(0,0,0,0.18)] backdrop-blur-2xl backdrop-saturate-150",
          className
        )}
        onKeyDown={(e) => {
          onKeyDown?.(e);
          if (e.key === "Escape") onCancel?.();
        }}
        {...props}
      >
        {actions.map((a) => (
          <button
            key={a.id}
            type="button"
            role="menuitem"
            disabled={a.disabled}
            onClick={() => onSelect?.(a.id)}
            className={cn(pill, a.destructive && "text-kk-menu-destructive")}
          >
            {a.label}
          </button>
        ))}
        {cancelLabel !== null && (
          <button type="button" role="menuitem" onClick={onCancel} className={pill}>
            {cancelLabel}
          </button>
        )}
      </div>
    );
  }
);
ActionSheet.displayName = "ActionSheet";

export { ActionSheet, type ActionSheetProps, type ActionSheetAction };
