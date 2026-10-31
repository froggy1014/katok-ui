import * as React from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";
import { ChatListItem } from "@/components/ui/kakao/chat-list-item";
import { CHANNELS, PEOPLE } from "./fixtures";

const meta: Meta<typeof ChatListItem> = {
  title: "Kakao/ChatListItem",
  component: ChatListItem,
  parameters: { surface: "list" },
  args: {
    name: PEOPLE.minji.name,
    avatar: PEOPLE.minji.avatar,
    lastMessage: "내일 몇 시에 볼까?",
    timestamp: "오후 2:14",
    unreadCount: 2,
  },
};
export default meta;
type Story = StoryObj<typeof ChatListItem>;

export const Playground: Story = {};

export const Read: Story = { args: { unreadCount: 0, timestamp: "어제" } };

export const GroupChat: Story = {
  args: {
    name: "주말 등산 모임",
    memberCount: 6,
    avatar: [PEOPLE.minji.avatar, PEOPLE.junho.avatar, PEOPLE.seoyeon.avatar, PEOPLE.dohyun.avatar],
    lastMessage: "최도현: 그럼 일요일 아침 8시 구파발역!",
    unreadCount: 37,
  },
};

export const Muted: Story = {
  args: { muted: true, name: "회사 공지방", memberCount: 214, avatar: undefined, unreadCount: 128 },
};

export const Pinned: Story = { args: { pinned: true, name: "엄마", avatar: PEOPLE.haeun.avatar, unreadCount: 0 } };

export const TwoLinePreview: Story = {
  args: {
    lastMessage:
      "오늘 회의에서 나온 이야기 정리해서 공유할게요. 일정은 다음 주 화요일까지 1차 시안, 목요일에 리뷰하는 걸로 했어요.",
  },
};

export const OverflowBadge: Story = { args: { unreadCount: 1500 } };

export const Channel: Story = {
  args: {
    name: CHANNELS.shop.name,
    avatar: CHANNELS.shop.avatar,
    lastMessage: "[미리마켓] 주문하신 상품이 출발했어요.",
    timestamp: "오전 9:12",
    unreadCount: 1,
  },
};

export const OpenChat: Story = {
  args: { openChat: true, name: "동네 산책 모임", memberCount: 32, avatar: undefined, lastMessage: "내일은 비 온대요", unreadCount: 0 },
};

/** `selected` turns the row into a checkbox for share / invite pickers. */
export const Picker: Story = {
  render: function Render() {
    const [picked, setPicked] = React.useState<string[]>(["mom"]);
    const toggle = (id: string) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
    return (
      <div className="-mx-6 flex flex-col">
        <ChatListItem name="엄마" avatar={PEOPLE.haeun.avatar} pinned lastMessage="밥은 먹었어?" selected={picked.includes("mom")} onClick={() => toggle("mom")} />
        <ChatListItem
          name="동네 산책 모임"
          openChat
          memberCount={32}
          muted
          lastMessage="내일은 비 온대요"
          selected={picked.includes("walk")}
          onClick={() => toggle("walk")}
        />
        <ChatListItem name={PEOPLE.minji.name} avatar={PEOPLE.minji.avatar} lastMessage="ㅋㅋㅋㅋ 내일 봐" selected={picked.includes("minji")} onClick={() => toggle("minji")} />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const minji = canvas.getByRole("checkbox", { name: /김민지/ });
    await expect(minji).toHaveAttribute("aria-checked", "false");
    minji.focus();
    await userEvent.keyboard(" ");
    await expect(minji).toHaveAttribute("aria-checked", "true");
  },
};

/** `render` swaps the root element — here an anchor, e.g. a Next.js Link. */
export const AsLink: Story = {
  args: { render: <a href="#chat" /> },
};

export const ChatsTab: Story = {
  render: () => (
    <div className="-mx-6 flex flex-col">
      <ChatListItem name="엄마" avatar={PEOPLE.haeun.avatar} pinned lastMessage="밥은 먹었어?" timestamp="오후 6:02" unreadCount={1} />
      <ChatListItem
        name="주말 등산 모임"
        memberCount={6}
        avatar={[PEOPLE.minji.avatar, PEOPLE.junho.avatar, PEOPLE.seoyeon.avatar, PEOPLE.dohyun.avatar]}
        lastMessage="최도현: 그럼 일요일 아침 8시 구파발역!"
        timestamp="오후 8:06"
        unreadCount={37}
      />
      <ChatListItem name={PEOPLE.minji.name} avatar={PEOPLE.minji.avatar} lastMessage="ㅋㅋㅋㅋ 내일 봐" timestamp="오후 5:40" />
      <ChatListItem name={CHANNELS.shop.name} avatar={CHANNELS.shop.avatar} lastMessage="[미리마켓] 주문하신 상품이 출발했어요." timestamp="오전 9:12" unreadCount={1} />
      <ChatListItem name="회사 공지방" memberCount={214} muted lastMessage="10월 사내 행사 안내" timestamp="어제" unreadCount={128} />
      <ChatListItem name={PEOPLE.junho.name} avatar={PEOPLE.junho.avatar} lastMessage="사진을 보냈습니다." timestamp="10월 9일" />
      <ChatListItem name={CHANNELS.bank.name} avatar={CHANNELS.bank.avatar} lastMessage="[포근은행] 체크카드 승인 12,000원" timestamp="10월 8일" />
    </div>
  ),
};
