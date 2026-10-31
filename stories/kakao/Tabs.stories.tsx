import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";
import { ChatHeader, HeaderIconButton } from "@/components/ui/kakao/chat-header";
import { ChatListItem } from "@/components/ui/kakao/chat-list-item";
import { FilterChips } from "@/components/ui/kakao/filter-chips";
import { FriendListItem, ListSection, RowButton, UpdatedFriends } from "@/components/ui/kakao/friend-list";
import { ChatPlusIcon, GiftBoxIcon, SearchIcon, SettingsIcon, SlidersIcon, UserPlusIcon } from "@/components/ui/kakao/icons";
import { ProfileAvatar } from "@/components/ui/kakao/profile-avatar";
import { PromoBanner } from "@/components/ui/kakao/promo-banner";
import { TabBar } from "@/components/ui/kakao/tab-bar";
import { CHANNELS, PEOPLE } from "./fixtures";

/** The chats and friends tabs: large-title header, folder chips, promo card, lists, tab bar. */
const meta: Meta = {
  title: "Kakao/Tabs",
  parameters: { phone: true, surface: "list" },
};
export default meta;
type Story = StoryObj;

const I = { size: 24, strokeWidth: 1.9 };

const Art = () => (
  <span aria-hidden="true" className="text-[26px] leading-none">
    📣🗓️
  </span>
);

function Screen({ children, active, badge }: { children: React.ReactNode; active: string; badge?: number }) {
  return (
    <div className="flex h-full flex-col bg-kk-list-bg">
      <div className="min-h-0 flex-1 overflow-y-auto pt-[12px]">{children}</div>
      <TabBar
        activeId={active}
        items={[
          { id: "friends", label: "친구", icon: "friends" },
          { id: "chats", label: "채팅", icon: "chats", badge },
          { id: "now", label: "지금", icon: "now" },
          { id: "shopping", label: "쇼핑", icon: "shopping" },
          { id: "more", label: "더보기", icon: "more" },
        ]}
      />
    </div>
  );
}

export const ChatsTab: Story = {
  render: () => (
    <Screen active="chats" badge={18}>
      <ChatHeader
        variant="main"
        title="채팅"
        actions={
          <>
            <HeaderIconButton label="검색">
              <SearchIcon {...I} />
            </HeaderIconButton>
            <HeaderIconButton label="새 채팅">
              <ChatPlusIcon {...I} />
            </HeaderIconButton>
            <HeaderIconButton label="설정">
              <SettingsIcon {...I} />
            </HeaderIconButton>
          </>
        }
      />
      <FilterChips
        aria-label="채팅방 폴더"
        items={[
          { value: "all", label: "전체" },
          { value: "unread", label: "안읽음", count: 18 },
          { value: "friends", label: "친구", count: 6 },
          { value: "work", label: "회사" },
        ]}
        defaultValue="unread"
        trailing={
          <button
            type="button"
            aria-label="폴더 편집"
            className="flex h-[42px] shrink-0 items-center rounded-full border border-kk-chip-border px-[14px] text-kk-chip-fg"
          >
            <SlidersIcon size={20} strokeWidth={2} />
          </button>
        }
      />
      <PromoBanner className="my-[18px]" title="이번 주 새 기능이 궁금하다면?" description="업데이트 소식 보기" art={<Art />} />
      <ChatListItem
        name="보드게임 모임"
        memberCount={6}
        avatar={[PEOPLE.minji.avatar, PEOPLE.junho.avatar, PEOPLE.seoyeon.avatar]}
        lastMessage="정하은: 룰북 미리 읽어 올 사람?"
        timestamp="오후 3:30"
        unreadCount={3}
      />
      <ChatListItem name={PEOPLE.seoyeon.name} avatar={PEOPLE.seoyeon.avatar} muted lastMessage="내일 몇 시에 볼까?" timestamp="오후 3:00" unreadCount={1} />
      <ChatListItem name="동네 산책 모임" openChat memberCount={32} lastMessage="내일은 비 온대요" timestamp="오후 2:00" unreadCount={10} />
      <ChatListItem name={CHANNELS.shop.name} avatar={CHANNELS.shop.avatar} lastMessage="[미리마켓] 주문하신 상품이 출발했어요." timestamp="오후 1:30" unreadCount={4} />
    </Screen>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const work = canvas.getByRole("button", { name: "회사" });
    await userEvent.click(work);
    await expect(work).toHaveAttribute("aria-pressed", "true");
    await expect(canvas.getByRole("button", { name: "채팅, 새 메시지 18개" })).toHaveAttribute("aria-current", "page");
  },
};

export const FriendsTab: Story = {
  render: () => (
    <Screen active="friends" badge={18}>
      <ChatHeader
        variant="main"
        title={PEOPLE.minji.name}
        leading={<ProfileAvatar src={PEOPLE.minji.avatar} name={PEOPLE.minji.name} size={36} />}
        actions={
          <>
            <HeaderIconButton label="검색">
              <SearchIcon {...I} />
            </HeaderIconButton>
            <HeaderIconButton label="친구 추가">
              <UserPlusIcon {...I} />
            </HeaderIconButton>
            <HeaderIconButton label="선물하기">
              <GiftBoxIcon {...I} />
            </HeaderIconButton>
            <HeaderIconButton label="설정">
              <SettingsIcon {...I} />
            </HeaderIconButton>
          </>
        }
      />
      <FilterChips aria-label="친구 탭 보기" items={[{ value: "friends", label: "친구" }, { value: "feed", label: "소식" }]} />
      <PromoBanner className="mt-[18px]" title="이번 주 새 기능이 궁금하다면?" description="업데이트 소식 보기" art={<Art />} />
      <ListSection title="업데이트한 친구" count={5}>
        <UpdatedFriends
          friends={[
            { id: "1", name: PEOPLE.junho.name, avatar: PEOPLE.junho.avatar, isNew: true },
            { id: "2", name: PEOPLE.seoyeon.name, avatar: PEOPLE.seoyeon.avatar, isNew: true },
            { id: "3", name: CHANNELS.shop.name, avatar: CHANNELS.shop.avatar, ad: true },
            { id: "4", name: PEOPLE.dohyun.name, avatar: PEOPLE.dohyun.avatar, isNew: true },
            { id: "5", name: PEOPLE.haeun.name, avatar: PEOPLE.haeun.avatar },
          ]}
        />
      </ListSection>
      <ListSection title="생일인 친구" count={1} divided>
        <FriendListItem
          name={PEOPLE.dohyun.name}
          avatar={PEOPLE.dohyun.avatar}
          badge={<span aria-label="생일">🎂</span>}
          description="오늘"
          action={<RowButton>선물하기</RowButton>}
        />
        <FriendListItem
          name="친구의 생일을 확인해 보세요."
          leading={
            <span aria-hidden="true" className="flex size-[46px] items-center justify-center rounded-[40%] bg-[#ffe9ef] text-[24px]">
              🥳
            </span>
          }
          count={4}
        />
      </ListSection>
      <ListSection
        title="친구"
        count={128}
        divided
        trailing={
          <span>
            <span className="text-kk-list-title">가나다순</span> · 업데이트순
          </span>
        }
      >
        <FriendListItem name={PEOPLE.haeun.name} avatar={PEOPLE.haeun.avatar} description="오늘도 화이팅" />
        <FriendListItem name={PEOPLE.junho.name} avatar={PEOPLE.junho.avatar} />
      </ListSection>
    </Screen>
  ),
};
