import * as React from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";
import { ChatBubble } from "@/components/ui/kakao/chat-bubble";
import { ChatHeader } from "@/components/ui/kakao/chat-header";
import { ChatListItem } from "@/components/ui/kakao/chat-list-item";
import { ChatRoom } from "@/components/ui/kakao/chat-room";
import { DownloadIcon, MeIcon, MoreHorizontalIcon } from "@/components/ui/kakao/icons";
import { MessageGroup } from "@/components/ui/kakao/message-group";
import { ShareSheet, ShareTarget } from "@/components/ui/kakao/share-sheet";
import { PEOPLE } from "./fixtures";

const meta: Meta<typeof ShareSheet> = {
  title: "Kakao/ShareSheet",
  component: ShareSheet,
  parameters: { phone: true },
};
export default meta;
type Story = StoryObj<typeof ShareSheet>;

const FILTERS = [
  { value: "all", label: "전체" },
  { value: "friends", label: "친구" },
  { value: "recent", label: "최근 공유" },
];

const ROOMS = [
  { id: "walk", name: "동네 산책 모임", openChat: true, memberCount: 32, pinned: true, muted: true, lastMessage: "내일은 비 온대요" },
  {
    id: "family",
    name: "엄마, 아빠, 동생",
    memberCount: 5,
    pinned: true,
    muted: true,
    avatar: [PEOPLE.haeun.avatar, PEOPLE.minji.avatar, PEOPLE.junho.avatar, PEOPLE.seoyeon.avatar],
    lastMessage: "저녁 먹고 들어와",
  },
  { id: "notice", name: "공지) 동네 산책 모임", openChat: true, memberCount: 30, pinned: true, muted: true, lastMessage: "톡게시판 '일정': 11월 코스 안내" },
  { id: "minji", name: PEOPLE.minji.name, avatar: PEOPLE.minji.avatar, lastMessage: "ㅋㅋㅋㅋ 내일 봐" },
  { id: "junho", name: PEOPLE.junho.name, avatar: PEOPLE.junho.avatar, lastMessage: "사진을 보냈습니다." },
];

function Demo() {
  const [picked, setPicked] = React.useState<string[]>([]);
  const toggle = (id: string) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  return (
    <ShareSheet
      filters={FILTERS}
      targets={
        <>
          <ShareTarget icon={<MeIcon size={28} />} label="나에게" />
          <ShareTarget icon={<DownloadIcon size={24} />} label="저장" />
          <ShareTarget icon={<MoreHorizontalIcon size={26} />} label="더보기" />
        </>
      }
      className="h-full"
    >
      {ROOMS.map(({ id, ...room }) => (
        <ChatListItem key={id} {...room} selected={picked.includes(id)} onClick={() => toggle(id)} />
      ))}
    </ShareSheet>
  );
}

/** Over a chat room, with the device's 50% black scrim. */
export const OverChatRoom: Story = {
  render: () => (
    <div className="relative h-full">
      <ChatRoom header={<ChatHeader title="북클럽" memberCount={5} unreadTotal={7} />}>
        <MessageGroup sender={PEOPLE.minji} timestamp="오후 1:12">
          <ChatBubble>다음 책은 투표로 정할까요?</ChatBubble>
        </MessageGroup>
        <MessageGroup sender={PEOPLE.seoyeon} timestamp="오후 1:15">
          <ChatBubble>좋아요!</ChatBubble>
        </MessageGroup>
      </ChatRoom>
      <div className="absolute inset-0 bg-kk-sheet-scrim" />
      <div className="absolute inset-x-0 bottom-0 top-[42%]">
        <Demo />
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const recent = canvas.getByRole("button", { name: "최근 공유" });
    await userEvent.click(recent);
    await expect(recent).toHaveAttribute("aria-pressed", "true");
    const row = canvas.getByRole("checkbox", { name: /김민지/ });
    await userEvent.click(row);
    await expect(row).toHaveAttribute("aria-checked", "true");
  },
};

export const SheetOnly: Story = {
  parameters: { phone: false, surface: "list" },
  render: () => (
    <div className="mx-auto h-[640px] w-[390px] bg-kk-sheet-scrim pt-6">
      <Demo />
    </div>
  ),
};
