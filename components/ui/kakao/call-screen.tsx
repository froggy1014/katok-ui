"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { MicIcon, PhoneOffIcon, SpeakerIcon, SparklesIcon, VideoIcon } from "./icons";
import { ProfileAvatar } from "./profile-avatar";
import "@/components/ui/kakao/styles/kakao.css";

interface CallControl {
  id: string;
  label: string;
  icon: React.ReactNode;
  /** Pressed state (mute on, speaker on). */
  active?: boolean;
  disabled?: boolean;
}

interface CallScreenProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  avatar?: string;
  /** "연결 중", "00:42" … */
  status?: React.ReactNode;
  /** Three dots under the status while ringing. */
  ringing?: boolean;
  /** "통화 녹음 시작" pill; omit to hide. */
  recordLabel?: string;
  onRecord?: () => void;
  /** Hint bubble under the record pill. */
  tip?: React.ReactNode;
  /** Controls left of and right of the red hang-up button. */
  controls?: { before: CallControl[]; after: CallControl[] };
  onControl?: (id: string) => void;
  onHangUp?: () => void;
  /** Top-right icons (settings, picture-in-picture). */
  topActions?: React.ReactNode;
}

const DEFAULT_CONTROLS: NonNullable<CallScreenProps["controls"]> = {
  before: [
    { id: "ai", label: "AI 기능", icon: <SparklesIcon size={24} strokeWidth={1.8} /> },
    { id: "mute", label: "음소거", icon: <MicIcon size={24} strokeWidth={1.8} /> },
  ],
  after: [
    { id: "speaker", label: "스피커", icon: <SpeakerIcon size={24} strokeWidth={1.8} /> },
    { id: "video", label: "영상 켜기", icon: <VideoIcon size={24} strokeWidth={1.8} />, disabled: true },
  ],
};

/** 보이스톡 in progress: dark card with the callee, record pill, and the control row. */
const CallScreen = React.forwardRef<HTMLDivElement, CallScreenProps>(
  (
    {
      className,
      name,
      avatar,
      status = "연결 중",
      ringing = true,
      recordLabel = "통화 녹음 시작",
      onRecord,
      tip,
      controls = DEFAULT_CONTROLS,
      onControl,
      onHangUp,
      topActions,
      ...props
    },
    ref
  ) => {
    const control = (c: CallControl) => (
      <button
        key={c.id}
        type="button"
        aria-label={c.label}
        aria-pressed={c.active}
        disabled={c.disabled}
        onClick={onControl && (() => onControl(c.id))}
        className={cn(
          "flex size-[52px] items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-kk-yellow disabled:opacity-35",
          c.active ? "bg-kk-always-white text-kk-always-black" : "bg-kk-call-surface text-kk-always-white"
        )}
      >
        {c.icon}
      </button>
    );
    return (
      <div
        ref={ref}
        className={cn("font-kk flex h-full flex-col bg-kk-call-bg px-[10px] pb-[calc(16px+env(safe-area-inset-bottom))] text-kk-always-white", className)}
        {...props}
      >
        <div className="flex h-[52px] shrink-0 items-center justify-end gap-[6px] px-[6px]">{topActions}</div>
        <div className="flex min-h-0 flex-1 flex-col items-center rounded-[24px] bg-kk-call-surface px-[20px] pt-[52px]">
          <h1 className="text-[26px] font-bold">{name}</h1>
          <p className="mt-[2px] text-[15px] opacity-80">{status}</p>
          {ringing && (
            <span aria-hidden="true" className="mt-[16px] flex gap-[8px]">
              <span className="size-[5px] rounded-full bg-kk-yellow/40" />
              <span className="size-[5px] rounded-full bg-kk-yellow/70" />
              <span className="size-[7px] -translate-y-[1px] rounded-full bg-kk-yellow" />
            </span>
          )}
          <ProfileAvatar src={avatar} name={name} size={88} className="mt-[28px]" />
          {recordLabel && (
            <button
              type="button"
              onClick={onRecord}
              className="mt-[28px] flex h-[34px] items-center gap-[6px] rounded-full border border-white/25 px-[14px] text-[15px] outline-none focus-visible:ring-2 focus-visible:ring-kk-yellow"
            >
              <span aria-hidden="true" className="flex size-[16px] items-center justify-center rounded-full border-[1.5px] border-current">
                <span className="size-[7px] rounded-full bg-current" />
              </span>
              {recordLabel}
            </button>
          )}
          {tip && (
            <p className="mt-[10px] rounded-[10px] border border-white/15 bg-kk-call-bg/40 px-[14px] py-[10px] text-center text-[13px] leading-[1.45] opacity-90">
              {tip}
            </p>
          )}
        </div>
        <div className="mt-[16px] flex shrink-0 items-center justify-between px-[6px]">
          {controls.before.map(control)}
          <button
            type="button"
            aria-label="통화 종료"
            onClick={onHangUp}
            className="flex size-[60px] items-center justify-center rounded-full bg-kk-call-end text-kk-always-white outline-none focus-visible:ring-2 focus-visible:ring-kk-yellow"
          >
            <PhoneOffIcon size={28} strokeWidth={0} className="fill-current" />
          </button>
          {controls.after.map(control)}
        </div>
      </div>
    );
  }
);
CallScreen.displayName = "CallScreen";

export { CallScreen, type CallScreenProps, type CallControl };
