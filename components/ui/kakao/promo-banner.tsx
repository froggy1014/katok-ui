import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronRightIcon } from "./icons";
import "@/components/ui/kakao/styles/kakao.css";

interface PromoBannerProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "title"> {
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Illustration on the right. */
  art?: React.ReactNode;
  /** `md` (88pt) at the top of the chats / friends tab; `sm` (60pt) in sheets. */
  size?: "sm" | "md";
  /** Chevron after the description, as in the "+" sheet. */
  chevron?: boolean;
}

/** The gray promo card: bold title, a gray line under it, art on the right. */
const PromoBanner = React.forwardRef<HTMLButtonElement, PromoBannerProps>(
  ({ className, title, description, art, size = "md", chevron = false, type = "button", ...props }, ref) => {
    const md = size === "md";
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "font-kk mx-[16px] flex w-[calc(100%-32px)] items-center justify-between gap-[12px] rounded-[13px] bg-kk-promo-bg text-left outline-none focus-visible:ring-2 focus-visible:ring-kk-text-link",
          md ? "min-h-[88px] px-[24px] py-[16px]" : "min-h-[60px] rounded-[12px] px-[16px] py-[12px]",
          className
        )}
        {...props}
      >
        <span className="flex min-w-0 flex-col gap-[4px]">
          <span className={cn("break-keep font-bold leading-[1.25] text-kk-promo-title", md ? "text-[18px]" : "text-[16px]")}>
            {title}
          </span>
          {description && (
            <span className="flex items-center gap-[2px] text-[15px] leading-[1.25] text-kk-promo-fg">
              {description}
              {chevron && <ChevronRightIcon size={16} strokeWidth={2} />}
            </span>
          )}
        </span>
        {art && <span className="shrink-0">{art}</span>}
      </button>
    );
  }
);
PromoBanner.displayName = "PromoBanner";

export { PromoBanner, type PromoBannerProps };
