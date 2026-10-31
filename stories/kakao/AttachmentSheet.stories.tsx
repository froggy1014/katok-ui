import * as React from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";
import {
  AudioLines,
  CalendarCheck,
  Clock,
  Coins,
  Contact,
  Crop,
  File,
  Gamepad2,
  Gift,
  Image as ImageIcon,
  MapPin,
  MessageSquareText,
  Music,
  Navigation,
  Phone,
} from "lucide-react";
import {
  AttachmentBanner,
  AttachmentGroup,
  AttachmentItem,
  AttachmentPhotos,
  AttachmentSheet,
} from "@/components/ui/kakao/attachment-sheet";
import { ChatBubble } from "@/components/ui/kakao/chat-bubble";
import { ChatHeader } from "@/components/ui/kakao/chat-header";
import { ChatRoom } from "@/components/ui/kakao/chat-room";
import { MessageGroup } from "@/components/ui/kakao/message-group";
import { MessageInput } from "@/components/ui/kakao/message-input";
import { IMG, PEOPLE } from "./fixtures";

const meta: Meta<typeof AttachmentSheet> = {
  title: "Kakao/AttachmentSheet",
  component: AttachmentSheet,
  parameters: { phone: true },
};
export default meta;
type Story = StoryObj<typeof AttachmentSheet>;

const PHOTOS = [
  { id: "1", src: "/samples/photo-landscape.jpg", alt: "언덕 사진" },
  { id: "2", src: "/samples/photo-portrait.jpg", alt: "바다 사진" },
  { id: "3", src: IMG("photo-1"), alt: "사진" },
  { id: "4", src: "/samples/photo-landscape.jpg", alt: "언덕 사진 2" },
];

/** Colored glyphs in the device's palette; swap in your own icon set. */
const G = { size: 24, strokeWidth: 2.2 };
const GROUPS = [
  [
    { label: "사진", icon: <ImageIcon {...G} className="text-[#3fb26a]" /> },
    { label: "송금", icon: <Coins {...G} className="text-[#f2a91d]" /> },
  ],
  [
    { label: "통화", icon: <Phone {...G} className="fill-current text-[#1fa64a]" /> },
    { label: "선물하기", icon: <Gift {...G} className="text-[#f0505a]" /> },
  ],
  [
    { label: "지도", icon: <MapPin {...G} className="text-[#3b8cf2]" /> },
    { label: "친구위치", icon: <Navigation {...G} className="text-[#3b8cf2]" /> },
    { label: "뮤직", icon: <Music {...G} className="text-[#1fa64a]" /> },
    { label: "미니게임", icon: <Gamepad2 {...G} className="text-[#f0505a]" /> },
  ],
  [
    { label: "파일", icon: <File {...G} className="text-[#8d96a3]" /> },
    { label: "연락처", icon: <Contact {...G} className="text-[#1fa64a]" /> },
    { label: "음성메시지", icon: <AudioLines {...G} className="text-[#f0505a]" /> },
    { label: "예약메시지", icon: <Clock {...G} className="text-[#8b5cf6]" /> },
    { label: "캡처", icon: <Crop {...G} className="text-[#8d96a3]" /> },
    { label: "일정", icon: <CalendarCheck {...G} className="text-[#3b8cf2]" /> },
  ],
];

function Sheet({ className }: { className?: string }) {
  const [selected, setSelected] = React.useState<string[]>([]);
  const toggle = (id: string) => setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  return (
    <AttachmentSheet className={className}>
      <AttachmentPhotos photos={PHOTOS} selected={selected} onToggle={toggle} />
      {GROUPS.map((items, i) => (
        <AttachmentGroup key={i} className={i === 0 ? "mt-[8px]" : undefined}>
          {items.map((it) => (
            <AttachmentItem key={it.label} icon={it.icon} label={it.label} />
          ))}
        </AttachmentGroup>
      ))}
      <AttachmentBanner
        title="맞춤법, 번역 그리고 챗봇까지!"
        description="툴바 써보기"
        art={<MessageSquareText size={40} strokeWidth={1.6} className="text-[#3b8cf2]" />}
      />
    </AttachmentSheet>
  );
}

/** Tap "+" in the input: the sheet slides over the dimmed chat. */
export const FromPlusButton: Story = {
  render: function Render() {
    const [open, setOpen] = React.useState(false);
    return (
      <div className="relative h-full">
        <ChatRoom
          header={<ChatHeader title="가족" memberCount={4} unreadTotal={51} />}
          input={<MessageInput onAttach={() => setOpen(true)} />}
        >
          <MessageGroup sender={PEOPLE.haeun} timestamp="오후 8:57">
            <ChatBubble>ㅋㅋ</ChatBubble>
            <ChatBubble>사진 좀 보내줘</ChatBubble>
          </MessageGroup>
        </ChatRoom>
        {open && (
          <>
            <button
              type="button"
              aria-label="닫기"
              className="absolute inset-0 bg-kk-sheet-scrim"
              onClick={() => setOpen(false)}
            />
            <div className="absolute inset-x-0 bottom-0 top-[44%]">
              <Sheet className="h-full" />
            </div>
          </>
        )}
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "첨부" }));
    const send = await canvas.findByRole("button", { name: "전송" });
    await expect(send).toBeDisabled();
    await userEvent.click(canvas.getByRole("checkbox", { name: "바다 사진" }));
    await userEvent.click(canvas.getByRole("checkbox", { name: "언덕 사진" }));
    await expect(canvas.getByRole("button", { name: "전송 2" })).toBeEnabled();
  },
};

/** Pulled up to full height. */
export const Expanded: Story = {
  render: () => (
    <div className="relative h-full bg-kk-sheet-scrim pt-[96px]">
      <Sheet className="h-full" />
    </div>
  ),
};
