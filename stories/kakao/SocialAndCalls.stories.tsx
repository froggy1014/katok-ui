import * as React from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";
import { CallScreen } from "@/components/ui/kakao/call-screen";
import { CallTranscript, type TranscriptLine } from "@/components/ui/kakao/call-transcript";
import { CommunityPost, CommunityReply } from "@/components/ui/kakao/community-post";
import { FeedPost } from "@/components/ui/kakao/feed-post";
import { FilterChips } from "@/components/ui/kakao/filter-chips";
import {
  BookmarkIcon,
  ChevronLeftIcon,
  HeartIcon,
  MessageCircleIcon,
  MoreHorizontalIcon,
  PencilIcon,
  SearchIcon,
  SettingsIcon,
  ShareIcon,
  SpeakerIcon,
} from "@/components/ui/kakao/icons";
import { ProfileGrid, ProfileView } from "@/components/ui/kakao/profile-view";
import { ShortformView } from "@/components/ui/kakao/shortform-view";
import { PEOPLE } from "./fixtures";

/** Profile, the 소식 feed, 보이스톡 and the 지금 tab. All copy and art here are made up. */
const meta: Meta = {
  title: "Kakao/SocialAndCalls",
  parameters: { phone: true },
};
export default meta;
type Story = StoryObj;

const PHOTOS = ["/samples/photo-landscape.jpg", "/samples/photo-portrait.jpg", "/samples/poster-kite.jpg"];

export const Profile: Story = {
  render: () => (
    <ProfileView
      background="/samples/photo-portrait.jpg"
      name={PEOPLE.minji.name}
      avatar={PEOPLE.minji.avatar}
      status="바다 보러 가는 중"
      likes="+128"
      likesLabel="응원"
      topActions={
        <>
          <button type="button" className="kk-glass h-[40px] rounded-full px-[14px] text-[15px] text-white">
            프로필 편집
          </button>
          <button type="button" aria-label="더보기" className="kk-glass flex size-[40px] items-center justify-center rounded-full text-white">
            <MoreHorizontalIcon size={22} />
          </button>
        </>
      }
      actions={[
        { id: "chat", label: "나와의 채팅", icon: <MessageCircleIcon size={20} strokeWidth={1.8} /> },
        { id: "post", label: "새 게시물", icon: <PencilIcon size={18} strokeWidth={1.8} /> },
      ]}
    >
      <ProfileGrid
        items={[
          { id: "1", src: PHOTOS[0], pinned: true },
          { id: "2", src: PHOTOS[1], pinned: true },
          { id: "3", src: PHOTOS[2], video: true },
          { id: "4", src: PHOTOS[1] },
          { id: "5", src: PHOTOS[2] },
          { id: "6", src: PHOTOS[0] },
        ]}
      />
    </ProfileView>
  ),
};

export const Feed: Story = {
  parameters: { surface: "list" },
  render: function Render() {
    const [liked, setLiked] = React.useState(false);
    return (
      <div className="h-full overflow-y-auto bg-kk-list-bg pt-[12px]">
        <FilterChips aria-label="친구 탭 보기" items={[{ value: "friends", label: "친구" }, { value: "feed", label: "소식" }]} defaultValue="feed" />
        <FeedPost
          className="mt-[8px]"
          author={PEOPLE.junho}
          meta="1시간 전 · 프로필 업데이트"
          image="/samples/photo-landscape.jpg"
          liked={liked}
          onLike={() => setLiked((v) => !v)}
          onComment={() => {}}
          onMore={() => {}}
        />
        <FeedPost author={PEOPLE.seoyeon} meta="6시간 전" image="/samples/poster-kite.jpg" caption="주말에 날린 연" onMore={() => {}} />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const like = within(canvasElement).getAllByRole("button", { name: "좋아요" })[0];
    await userEvent.click(like);
    await expect(like).toHaveAttribute("aria-pressed", "true");
  },
};

export const VoiceTalk: Story = {
  render: () => (
    <CallScreen
      name={PEOPLE.seoyeon.name}
      avatar={PEOPLE.seoyeon.avatar}
      tip={
        <>
          통화 내용을 채팅처럼 남기고
          <br />
          요약까지 받아 보세요
        </>
      }
      topActions={
        <button type="button" aria-label="통화 설정" className="flex size-[40px] items-center justify-center text-white">
          <SettingsIcon size={24} strokeWidth={1.8} />
        </button>
      }
    />
  ),
};

const LINES: TranscriptLine[] = [
  { id: "1", from: "them", text: "여보세요", time: "00:01" },
  { id: "2", from: "me", text: "응 지금 통화 괜찮아?", time: "00:02" },
  { id: "3", from: "them", text: "응 퇴근길이야", time: "00:03" },
  { id: "4", from: "them", text: "다음 달 캠핑 장소 정했어?", time: "00:05" },
  { id: "5", from: "me", text: "강원도 쪽으로 알아보는 중", time: "00:07" },
  { id: "6", from: "me", text: "둘째 주 주말 어때?", time: "00:08" },
  { id: "7", from: "them", text: "좋아 그때 비워 둘게", time: "00:10" },
];

/** Tap a line to jump to it; the player follows. */
export const VoiceTalkTranscript: Story = {
  parameters: { surface: "list" },
  render: function Render() {
    const [pos, setPos] = React.useState(5);
    const [playing, setPlaying] = React.useState(true);
    const toSec = (t: string) => Number(t.slice(3));
    const active = [...LINES].reverse().find((l) => toSec(l.time) <= pos)?.id;
    return (
      <CallTranscript
        header={
          <div className="flex h-[52px] items-center justify-between px-[8px]">
            <button type="button" aria-label="뒤로" className="flex size-[40px] items-center justify-center">
              <ChevronLeftIcon size={26} />
            </button>
            <div className="flex">
              <button type="button" aria-label="검색" className="flex size-[40px] items-center justify-center">
                <SearchIcon size={22} />
              </button>
              <button type="button" aria-label="더보기" className="flex size-[40px] items-center justify-center">
                <MoreHorizontalIcon size={22} />
              </button>
            </div>
          </div>
        }
        name={PEOPLE.seoyeon.name}
        avatar={PEOPLE.seoyeon.avatar}
        date="2026년 10월 3일 오후 6:30"
        lines={LINES}
        activeId={active}
        onLine={(id) => setPos(toSec(LINES.find((l) => l.id === id)!.time))}
        position={pos}
        duration={180}
        playing={playing}
        onTogglePlay={() => setPlaying((p) => !p)}
        onSeek={setPos}
      />
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: /둘째 주 주말 어때/ }));
    await expect(canvas.getByRole("button", { name: /둘째 주 주말 어때/ })).toHaveAttribute("aria-current", "true");
    await userEvent.click(canvas.getByRole("button", { name: "5초 뒤로" }));
    await expect(canvas.getByRole("slider", { name: "재생 위치" })).toHaveValue("3");
  },
};

const A = { size: 30, strokeWidth: 1.8 };

export const NowShortform: Story = {
  render: () => (
    <ShortformView
      segments={[
        { id: "short", label: "숏폼" },
        { id: "open", label: "오픈채팅" },
      ]}
      topActions={
        <>
          <button type="button" aria-label="검색" className="flex size-[40px] items-center justify-center">
            <SearchIcon size={24} />
          </button>
          <button type="button" aria-label="소리" className="flex size-[40px] items-center justify-center">
            <SpeakerIcon size={24} />
          </button>
        </>
      }
      actions={[
        { id: "like", label: "좋아요", icon: <HeartIcon {...A} />, count: "2.4만" },
        { id: "comment", label: "댓글", icon: <MessageCircleIcon {...A} />, count: "318" },
        { id: "share", label: "공유", icon: <ShareIcon {...A} />, count: "57" },
        { id: "save", label: "저장", icon: <BookmarkIcon {...A} />, count: "41" },
      ]}
      channel={{ name: "강변 산책 기록", avatar: "/samples/channel-shop.svg", verified: true }}
      channelAction={
        <button type="button" className="kk-glass h-[28px] rounded-full px-[10px] text-[13px] text-white">
          친구추가
        </button>
      }
      title="노을 질 때 날린 연이 제일 높이 올라갔어요"
      views="조회수 3.2만"
      progress={0.3}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/samples/poster-kite.jpg" alt="" className="h-full w-full object-cover" />
    </ShortformView>
  ),
};

export const NowCommunity: Story = {
  parameters: { surface: "list" },
  render: () => (
    <div className="h-full overflow-y-auto bg-kk-list-bg pt-[12px]">
      <FilterChips aria-label="지금 탭 보기" items={[{ value: "short", label: "숏폼" }, { value: "open", label: "오픈채팅" }]} defaultValue="open" />
      <h2 className="font-kk px-[16px] pb-[4px] pt-[20px] text-[19px] font-bold text-kk-list-title">지금 뜨는 커뮤니티</h2>
      <CommunityPost
        title="캠핑 장비 나눔방"
        author="초보 캠퍼"
        avatar={PEOPLE.junho.avatar}
        time="30분 전"
        tag={{ label: "캠핑", tone: "green" }}
        image="/samples/photo-landscape.jpg"
        reactions={{ emoji: ["❤️", "😆"], count: 12 }}
        comments={24}
      >
        <CommunityReply author="새벽 등산객" avatar={PEOPLE.dohyun.avatar} time="20분 전">
          이 언덕 어디예요? 다음에 가 보고 싶네요
        </CommunityReply>
      </CommunityPost>
      <CommunityPost
        title="오늘 우리 동네 날씨는?"
        author="동네 기상캐스터"
        avatar={PEOPLE.seoyeon.avatar}
        time="30분 전"
        tag={{ label: "일상", tone: "blue" }}
        body={"아침엔 쌀쌀했는데 점심엔 반팔이에요.\n다들 겉옷 챙기세요 🍂"}
        reactions={{ emoji: ["👍", "😮"], count: 12 }}
        comments={16}
      />
    </div>
  ),
};
