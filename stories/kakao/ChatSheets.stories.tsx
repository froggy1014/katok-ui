import * as React from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";
import { BottomSheet, SheetRow, SheetTitle } from "@/components/ui/kakao/bottom-sheet";
import { ChatBubble } from "@/components/ui/kakao/chat-bubble";
import { ChatHeader } from "@/components/ui/kakao/chat-header";
import { ChatRoom } from "@/components/ui/kakao/chat-room";
import { FileIcon, PhoneIcon, PictureIcon, ScanDocumentIcon, VideoIcon } from "@/components/ui/kakao/icons";
import { MessageGroup } from "@/components/ui/kakao/message-group";
import { NoticeBanner } from "@/components/ui/kakao/notice-banner";
import { VoiceRecorder, type VoiceRecorderState } from "@/components/ui/kakao/voice-recorder";
import { PEOPLE } from "./fixtures";

/** Sheets opened from the "+" menu and the header's phone button, over the dimmed chat. */
const meta: Meta = {
  title: "Kakao/ChatSheets",
  parameters: { phone: true },
};
export default meta;
type Story = StoryObj;

function Backdrop({ sheet, top = "55%" }: { sheet: React.ReactNode; top?: string }) {
  return (
    <div className="relative h-full">
      <ChatRoom
        header={<ChatHeader title="가족" unreadTotal={51} onCall={() => {}} />}
        notice={<NoticeBanner title="요나고 2박3일 · 7월 23–25" more onClose={() => {}} />}
      >
        <MessageGroup sender={PEOPLE.haeun} timestamp="오후 8:57">
          <ChatBubble>ㅋㅋ</ChatBubble>
          <ChatBubble>ㄴ 안헤어짐 ㅅㄱ..</ChatBubble>
        </MessageGroup>
        <MessageGroup variant="outgoing" timestamp="오후 8:58">
          <ChatBubble>아니</ChatBubble>
          <ChatBubble>각자 집에 갔냐는 거였음</ChatBubble>
        </MessageGroup>
      </ChatRoom>
      <div className="absolute inset-0 bg-kk-sheet-scrim" />
      <div className="absolute inset-x-0 bottom-0" style={{ top }}>
        {sheet}
      </div>
    </div>
  );
}

const T = { size: 24, strokeWidth: 1.8 };

export const FileSheet: Story = {
  render: () => (
    <Backdrop
      top="40%"
      sheet={
        <BottomSheet className="h-full">
          <SheetTitle>파일</SheetTitle>
          <SheetRow icon={<FileIcon {...T} />} title="파일에서 선택" />
          <SheetRow icon={<PictureIcon {...T} />} title="앨범에서 선택" />
          <SheetRow icon={<ScanDocumentIcon {...T} />} title="문서 스캔" />
          <div className="mx-[16px] mt-[8px] flex items-center justify-between border-t border-kk-sheet-divider pt-[20px]">
            <h3 className="text-[16px] text-kk-sheet-label">최근에 보낸 파일</h3>
            <button
              type="button"
              disabled
              className="h-[34px] rounded-full border border-kk-chip-border px-[12px] text-[15px] text-kk-sheet-empty"
            >
              전체 삭제
            </button>
          </div>
          <p className="mt-auto pb-[24px] text-center text-[16px] text-kk-sheet-empty">최근에 보낸 파일이 없습니다.</p>
        </BottomSheet>
      }
    />
  ),
};

FileSheet.play = async ({ canvasElement }) => {
  // The scrim must cover the pinned notice and header pills, not the other way round.
  for (const el of [canvasElement.querySelector('[role="note"]')!, within(canvasElement).getByRole("button", { name: /뒤로/ })]) {
    const r = el.getBoundingClientRect();
    const top = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
    await expect(el.contains(top)).toBe(false);
  }
};

export const CallSheet: Story = {
  render: () => (
    <Backdrop
      top="62%"
      sheet={
        <BottomSheet tone="gray" className="h-full">
          <SheetTitle>통화하기</SheetTitle>
          <div className="flex flex-col gap-[10px] px-[16px]">
            <SheetRow
              variant="card"
              icon={<PhoneIcon size={22} strokeWidth={0} className="fill-current" />}
              iconClassName="bg-kk-call-tint-bg text-kk-call-tint"
              title="보이스톡"
              description="중요한 순간을 기록해주는 통화녹음"
            />
            <SheetRow
              variant="card"
              icon={<VideoIcon size={22} strokeWidth={0} className="fill-current" />}
              iconClassName="bg-kk-call-tint-bg text-kk-call-tint"
              title="페이스톡"
            />
          </div>
        </BottomSheet>
      }
    />
  ),
};

/** Tap the red dot to record, the square to stop; the timer runs for real. */
export const VoiceMessage: Story = {
  render: function Render() {
    const [state, setState] = React.useState<VoiceRecorderState>("idle");
    const [elapsed, setElapsed] = React.useState(0);
    React.useEffect(() => {
      if (state !== "recording") return;
      const t = setInterval(() => setElapsed((s) => s + 1), 1000);
      return () => clearInterval(t);
    }, [state]);
    return (
      <Backdrop
        top="66%"
        sheet={
          <BottomSheet className="h-full">
            <SheetTitle>음성메시지</SheetTitle>
            <VoiceRecorder
              state={state}
              elapsed={elapsed}
              onRecord={() => {
                setElapsed(0);
                setState("recording");
              }}
              onStop={() => setState("recorded")}
              onSend={() => {
                setState("idle");
                setElapsed(0);
              }}
            />
          </BottomSheet>
        }
      />
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("timer")).toHaveTextContent("00:00");
    await userEvent.click(canvas.getByRole("button", { name: "녹음 시작" }));
    await expect(await canvas.findByRole("button", { name: "녹음 중지" })).toBeVisible();
    await expect(canvas.getByRole("button", { name: "전송" })).toBeVisible();
  },
};

export const VoiceRecording: Story = {
  render: () => (
    <Backdrop
      top="66%"
      sheet={
        <BottomSheet className="h-full">
          <SheetTitle>음성메시지</SheetTitle>
          <VoiceRecorder state="recording" elapsed={2} />
        </BottomSheet>
      }
    />
  ),
};
