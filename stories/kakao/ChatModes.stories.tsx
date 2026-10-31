import * as React from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { Car, Coffee, Store, UtensilsCrossed, Users } from "lucide-react";
import { ActionSheet } from "@/components/ui/kakao/action-sheet";
import { CaptureHeader, CaptureSelection, CaptureToolbar } from "@/components/ui/kakao/capture-mode";
import { ChatBubble } from "@/components/ui/kakao/chat-bubble";
import { ChatHeader } from "@/components/ui/kakao/chat-header";
import { ChatRoom } from "@/components/ui/kakao/chat-room";
import { LocationPicker } from "@/components/ui/kakao/location-picker";
import { MessageGroup } from "@/components/ui/kakao/message-group";
import { MessageInput } from "@/components/ui/kakao/message-input";
import { PEOPLE } from "./fixtures";

/** Full-screen modes: 캡처, the 송금 action sheet, and 지도 → 이 위치 보내기. */
const meta: Meta = {
  title: "Kakao/ChatModes",
  parameters: { phone: true },
};
export default meta;
type Story = StoryObj;

const Before = () => (
  <>
    <MessageGroup sender={PEOPLE.haeun} timestamp="오후 8:31">
      <ChatBubble>카페 자리 있대?</ChatBubble>
      <ChatBubble>창가 쪽으로 예약했어</ChatBubble>
    </MessageGroup>
    <MessageGroup variant="outgoing" timestamp="오후 8:37">
      <ChatBubble>몇 명으로?</ChatBubble>
      <ChatBubble>여섯 명 맞지?</ChatBubble>
    </MessageGroup>
  </>
);

const Picked = () => (
  <>
    <MessageGroup sender={PEOPLE.haeun} timestamp="오후 8:57">
      <ChatBubble>ㅇㅇ 여섯</ChatBubble>
      <ChatBubble>한 명은 조금 늦는대</ChatBubble>
    </MessageGroup>
    <MessageGroup variant="outgoing" timestamp="오후 8:58">
      <ChatBubble>그럼 먼저 시작하자</ChatBubble>
      <ChatBubble>규칙 설명은 내가 할게</ChatBubble>
    </MessageGroup>
  </>
);

/** Picked messages stay bright inside a dashed frame; the rest of the chat dims. */
export const Capture: Story = {
  render: () => (
    <ChatRoom stickToBottom={false} header={<CaptureHeader />} input={<CaptureToolbar />} floatingInput>
      <Before />
      <CaptureSelection>
        <Picked />
      </CaptureSelection>
      <MessageGroup sender={PEOPLE.haeun} timestamp="오후 9:12">
        <ChatBubble>좋아 그럼 3시에 봐</ChatBubble>
        <ChatBubble>ㅋㅋ</ChatBubble>
      </MessageGroup>
      <MessageGroup variant="outgoing" timestamp="오후 9:13">
        <ChatBubble>ㅇㅋ 이따 봐</ChatBubble>
      </MessageGroup>
    </ChatRoom>
  ),
};

/** Selection running under the toolbar: the toolbar and the notice-free header stay on top and tappable. */
export const CaptureToBottom: Story = {
  render: () => (
    <ChatRoom header={<CaptureHeader />} input={<CaptureToolbar />} floatingInput>
      <Before />
      <CaptureSelection>
        <Picked />
        <MessageGroup sender={PEOPLE.haeun} timestamp="오후 9:12">
          <ChatBubble>좋아 그럼 3시에 봐</ChatBubble>
          <ChatBubble>ㅋㅋ</ChatBubble>
        </MessageGroup>
        <MessageGroup variant="outgoing" timestamp="오후 9:13">
          <ChatBubble>ㅇㅋ 이따 봐</ChatBubble>
        </MessageGroup>
      </CaptureSelection>
    </ChatRoom>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    for (const name of ["저장", "공유", "캡처 닫기"]) {
      const button = canvas.getByRole("button", { name });
      const r = button.getBoundingClientRect();
      const top = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
      await expect(button.contains(top), `${name} is the topmost element`).toBe(true);
    }
  },
};

export const PayActionSheet: Story = {
  args: { onSelect: fn(), onCancel: fn() },
  render: (args) => (
    <div className="relative h-full">
      <ChatRoom header={<ChatHeader title="보드게임 모임" memberCount={6} unreadTotal={7} onCall={() => {}} />} input={<MessageInput />}>
        <Before />
        <Picked />
      </ChatRoom>
      <div className="absolute inset-0 flex items-center justify-center bg-black/25">
        <ActionSheet
          actions={[
            { id: "send", label: "송금하기" },
            { id: "request", label: "요청하기" },
            { id: "split", label: "1/N 정산하기" },
            { id: "ladder", label: "정산 사다리타기" },
          ]}
          onSelect={args.onSelect}
          onCancel={args.onCancel}
        />
      </div>
    </div>
  ),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("menuitem", { name: "1/N 정산하기" }));
    await expect(args.onSelect).toHaveBeenCalledWith("split");
    await userEvent.keyboard("{Escape}");
    await expect(args.onCancel).toHaveBeenCalled();
  },
};

const C = { size: 16, strokeWidth: 2.2 };

/** Bring your own map; the picker draws the chrome. A static drawing stands in here. */
export const Location: Story = {
  render: () => (
    <LocationPicker
      categories={[
        { id: "friends", label: "친구위치", icon: <Users {...C} className="text-[#3b8cf2]" /> },
        { id: "cafe", label: "카페", icon: <Coffee {...C} className="text-[#f08a3c]" /> },
        { id: "food", label: "음식점", icon: <UtensilsCrossed {...C} className="text-[#f08a3c]" /> },
        { id: "store", label: "편의점", icon: <Store {...C} className="text-[#f2b51d]" /> },
        { id: "parking", label: "주차장", icon: <Car {...C} className="text-[#3b6fe0]" /> },
      ]}
      address="서울 서초구 서초동 1739-1"
      distance="0m"
    >
      <div className="relative h-full bg-[url(/samples/map.svg)] bg-cover bg-center">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 32"
          width="40"
          height="54"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full text-kk-map-primary"
        >
          <path fill="currentColor" d="M12 0a12 12 0 0 1 12 12c0 8-12 20-12 20S0 20 0 12A12 12 0 0 1 12 0z" />
          <circle cx="12" cy="12" r="4.5" fill="#fff" />
        </svg>
      </div>
    </LocationPicker>
  ),
};
