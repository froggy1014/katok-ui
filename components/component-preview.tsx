import { AlimtalkBubble } from "@/components/ui/kakao/alimtalk-bubble";
import { BizButton } from "@/components/ui/kakao/biz-button";
import { BrandMessageBubble } from "@/components/ui/kakao/brand-message-bubble";
import { ChatBubble } from "@/components/ui/kakao/chat-bubble";
import { ChatHeader } from "@/components/ui/kakao/chat-header";
import { ChatListItem } from "@/components/ui/kakao/chat-list-item";
import { ChatRoom } from "@/components/ui/kakao/chat-room";
import { DateSeparator } from "@/components/ui/kakao/date-separator";
import { MessageGroup } from "@/components/ui/kakao/message-group";
import { MessageInput } from "@/components/ui/kakao/message-input";
import { ProfileAvatar } from "@/components/ui/kakao/profile-avatar";
import { AttachmentGroup, AttachmentItem, AttachmentPhotos, AttachmentSheet } from "@/components/ui/kakao/attachment-sheet";
import { ActionSheet } from "@/components/ui/kakao/action-sheet";
import { BottomSheet, SheetSearch } from "@/components/ui/kakao/bottom-sheet";
import { BotActionCard } from "@/components/ui/kakao/bot-message";
import { MediaBubble } from "@/components/ui/kakao/media-bubble";
import { withMentions } from "@/components/ui/kakao/mention";
import { MentionPopover } from "@/components/ui/kakao/mention-popover";
import { StickerMessage } from "@/components/ui/kakao/sticker-message";
import { CaptureSelection } from "@/components/ui/kakao/capture-mode";
import { LocationPicker } from "@/components/ui/kakao/location-picker";
import { NoticeBanner } from "@/components/ui/kakao/notice-banner";
import { VoiceRecorder } from "@/components/ui/kakao/voice-recorder";
import { CameraIcon, CopyIcon, ReplyIcon, TrashIcon } from "@/components/ui/kakao/icons";
import { DEFAULT_QUICK_REACTIONS, MessageActions } from "@/components/ui/kakao/message-actions";
import { MessageReactions } from "@/components/ui/kakao/message-reactions";
import { ReactionPicker } from "@/components/ui/kakao/reaction-picker";
import { ShareSheet } from "@/components/ui/kakao/share-sheet";
import { SystemMessage } from "@/components/ui/kakao/system-message";

const S = (n: string) => `/samples/${n}.svg`;
const MINJI = { name: "김민지", avatar: S("avatar-minji") };
const SHOP = { name: "미리마켓", avatar: S("channel-shop") };

const PREVIEWS: Record<string, () => React.ReactNode> = {
  "chat-bubble": () => (
    <div className="flex flex-col gap-1">
      <ChatBubble showTail timestamp="오후 2:14">점심 뭐 먹을까요?</ChatBubble>
      <ChatBubble variant="outgoing" showTail unreadCount={1} timestamp="오후 2:15">
        국밥 어때요?
      </ChatBubble>
    </div>
  ),
  "message-group": () => (
    <MessageGroup sender={MINJI} timestamp="오후 12:03">
      <ChatBubble>점심 뭐 먹어?</ChatBubble>
      <ChatBubble>덮밥 어때</ChatBubble>
    </MessageGroup>
  ),
  "profile-avatar": () => (
    <div className="flex items-center gap-3">
      <ProfileAvatar src={MINJI.avatar} size="lg" />
      <ProfileAvatar size="lg" />
      <ProfileAvatar src={[S("avatar-minji"), S("avatar-junho"), S("avatar-seoyeon"), S("avatar-dohyun")]} size="lg" />
    </div>
  ),
  "chat-header": () => (
    <div className="-mx-4 overflow-hidden">
      <ChatHeader title="주말 등산 모임" memberCount={6} unreadTotal={23} />
    </div>
  ),
  "message-input": () => (
    <div className="-mx-4">
      <MessageInput defaultValue="지금 출발해요" />
    </div>
  ),
  "date-separator": () => <DateSeparator date="2026년 10월 11일 일요일" />,
  "system-message": () => <SystemMessage>김민지님이 들어왔습니다.</SystemMessage>,
  "chat-list-item": () => (
    <div className="-mx-4">
      <ChatListItem name="김민지" avatar={MINJI.avatar} lastMessage="내일 몇 시에 볼까?" timestamp="오후 2:14" unreadCount={2} />
    </div>
  ),
  "bottom-sheet": () => (
    <div className="-mx-4 -mb-4 h-[140px] bg-kk-sheet-scrim pt-4">
      <BottomSheet className="h-full">
        <SheetSearch placeholder="검색" />
      </BottomSheet>
    </div>
  ),
  mention: () => (
    <div className="flex flex-col gap-2">
      <MessageGroup variant="outgoing" timestamp="오전 10:13">
        <ChatBubble>{withMentions("@김민지 시안 확인 부탁해요", ["김민지"])}</ChatBubble>
      </MessageGroup>
      <MentionPopover
        candidates={[
          { id: "me", name: "김민지", avatar: MINJI.avatar, me: true },
          { id: "junho", name: "이준호", avatar: S("avatar-junho") },
        ]}
        activeId="junho"
      />
    </div>
  ),
  "sticker-message": () => (
    <MessageGroup variant="outgoing" timestamp="오전 10:13">
      <StickerMessage src={S("sticker-cheer")} size={110} />
    </MessageGroup>
  ),
  "media-bubble": () => (
    <MessageGroup variant="outgoing" timestamp="오후 6:40">
      <MediaBubble src="/samples/poster-kite.jpg" title="노을 질 때 날린 연" video width={150} height={200} />
    </MessageGroup>
  ),
  "bot-message": () => (
    <MessageGroup sender={{ name: "도우미 봇" }} timestamp="오후 2:03">
      <BotActionCard text="답변 내용을 더 확인해 보세요." buttonLabel="자세히 보기" />
    </MessageGroup>
  ),
  "message-reactions": () => (
    <MessageGroup sender={MINJI} timestamp="오전 10:03">
      <ChatBubble
        reactions={
          <MessageReactions
            reactions={[
              { id: "heart", emoji: "❤️", label: "하트", count: 4 },
              { id: "party", emoji: "🥳", label: "축하", count: 9, selected: true },
            ]}
          />
        }
      >
        승진 축하해!
      </ChatBubble>
    </MessageGroup>
  ),
  "reaction-picker": () => (
    <div className="-mx-4 -mb-4 h-[220px] bg-kk-sheet-scrim pt-4">
      <ReactionPicker
        className="h-full"
        sections={[
          {
            label: "기본",
            reactions: ["❤️", "👍", "✅", "😆", "😮", "😢"].map((e, i) => ({ id: String(i), emoji: e, label: e })),
          },
        ]}
      />
    </div>
  ),
  "message-actions": () => (
    <div className="flex justify-end">
      <MessageActions
        className="w-[240px]"
        reactions={DEFAULT_QUICK_REACTIONS}
        actions={[
          { id: "copy", label: "복사", icon: <CopyIcon size={20} strokeWidth={1.7} /> },
          { id: "reply", label: "답장", icon: <ReplyIcon size={20} strokeWidth={1.7} /> },
          { id: "delete", label: "삭제", icon: <TrashIcon size={20} strokeWidth={1.7} />, destructive: true },
        ]}
      />
    </div>
  ),
  "attachment-sheet": () => (
    <div className="-mx-4 -mb-4 h-[300px] bg-kk-sheet-scrim pt-4">
      <AttachmentSheet className="h-full">
        <AttachmentPhotos
          photos={[
            { id: "1", src: S("photo-1") },
            { id: "2", src: "/samples/photo-landscape.jpg" },
          ]}
          selected={["2"]}
        />
        <AttachmentGroup className="mt-[8px]">
          <AttachmentItem icon={<CameraIcon size={22} className="text-[#3fb26a]" />} label="사진" />
        </AttachmentGroup>
      </AttachmentSheet>
    </div>
  ),
  "voice-recorder": () => (
    <div className="-mx-4 -mb-4 bg-kk-sheet-bg py-4">
      <VoiceRecorder state="recording" elapsed={2} />
    </div>
  ),
  "notice-banner": () => <NoticeBanner title="11월 정모 · 15일(토) 오후 2시 · 합정" more />,
  "capture-mode": () => (
    <div className="-mx-4 -my-4 overflow-hidden px-4 py-6">
      <CaptureSelection>
        <MessageGroup variant="outgoing" timestamp="오후 8:58">
          <ChatBubble>규칙 설명은 내가 할게</ChatBubble>
        </MessageGroup>
      </CaptureSelection>
    </div>
  ),
  "action-sheet": () => (
    <div className="-mx-4 -my-4 flex justify-center bg-black/25 py-4">
      <ActionSheet className="w-[240px]" actions={[{ id: "send", label: "송금하기" }, { id: "split", label: "1/N 정산하기" }]} />
    </div>
  ),
  "location-picker": () => (
    <div className="-mx-4 -my-4 h-[300px]">
      <LocationPicker address="서울 서초구 서초동 1739-1" distance="0m">
        <div className="h-full bg-[url(/samples/map.svg)] bg-cover bg-center" />
      </LocationPicker>
    </div>
  ),
  "share-sheet": () => (
    <div className="-mx-4 -mb-4 h-[260px] bg-kk-sheet-scrim pt-4">
      <ShareSheet
        className="h-full"
        filters={[
          { value: "all", label: "전체" },
          { value: "friends", label: "친구" },
          { value: "recent", label: "최근 공유" },
        ]}
      >
        <ChatListItem name="동네 산책 모임" openChat memberCount={32} lastMessage="내일은 비 온대요" selected />
        <ChatListItem name="김민지" avatar={MINJI.avatar} lastMessage="내일 몇 시에 볼까?" selected={false} />
      </ShareSheet>
    </div>
  ),
  "chat-room": () => (
    <div className="-mx-4 -my-4 h-[200px]">
      <ChatRoom header={<ChatHeader title="김민지" />}>
        <MessageGroup variant="outgoing" timestamp="오후 2:15">
          <ChatBubble>ChatRoom = header + log + input</ChatBubble>
        </MessageGroup>
      </ChatRoom>
    </div>
  ),
  "biz-button": () => (
    <div className="flex flex-col gap-1.5">
      <BizButton type="WL" name="주문 내역 보기" />
      <BizButton type="DS" name="배송 조회" />
    </div>
  ),
  "alimtalk-bubble": () => (
    <MessageGroup sender={SHOP}>
      <AlimtalkBubble
        emphasizeType="TEXT"
        subtitle="배송 출발 안내"
        title="오늘 도착 예정"
        content="주문하신 상품이 배송을 시작했습니다."
        buttons={[{ type: "DS", name: "배송 조회" }]}
      />
    </MessageGroup>
  ),
  "brand-message-bubble": () => (
    <MessageGroup sender={SHOP}>
      <BrandMessageBubble
        isAd
        content="가을 정기 세일 시작!"
        coupon={{ title: "3,000원 할인 쿠폰", description: "5만원 이상" }}
        buttons={[{ type: "WL", name: "세일 상품 보기" }]}
      />
    </MessageGroup>
  ),
};

export function ComponentPreview({ name }: { name: string }) {
  const render = PREVIEWS[name];
  if (!render) return null;
  return (
    <div className="bg-kk-chat-bg flex min-h-[200px] items-center p-4">
      <div className="w-full">{render()}</div>
    </div>
  );
}
