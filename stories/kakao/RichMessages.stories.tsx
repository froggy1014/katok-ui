import * as React from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";
import { BotActionCard, BotAnswer } from "@/components/ui/kakao/bot-message";
import { ChatBubble } from "@/components/ui/kakao/chat-bubble";
import { ChatHeader } from "@/components/ui/kakao/chat-header";
import { ChatRoom } from "@/components/ui/kakao/chat-room";
import { MediaBubble } from "@/components/ui/kakao/media-bubble";
import { MentionPopover, withMentions, type MentionCandidate } from "@/components/ui/kakao/mention";
import { MessageGroup } from "@/components/ui/kakao/message-group";
import { MessageInput } from "@/components/ui/kakao/message-input";
import { StickerMessage } from "@/components/ui/kakao/sticker-message";
import { IMG, PEOPLE } from "./fixtures";

/** Messages beyond plain text: mentions, stickers, shared media, chatbot answers. */
const meta: Meta = {
  title: "Kakao/RichMessages",
  parameters: { phone: true },
};
export default meta;
type Story = StoryObj;

const MEMBERS = [PEOPLE.minji.name, PEOPLE.junho.name, PEOPLE.seoyeon.name];

/** A neutral bot mark for stories (not any real assistant's logo). */
const BotMark = () => (
  <span className="flex size-[30px] items-center justify-center rounded-[40%] bg-[#6b5cff] text-[13px] font-bold text-white">
    AI
  </span>
);

const BOT = { name: "도우미 봇", avatar: undefined };

export const MentionsAndStickers: Story = {
  render: () => (
    <ChatRoom header={<ChatHeader title="프로젝트 팀" memberCount={4} />} input={<MessageInput />}>
      <MessageGroup sender={PEOPLE.junho} timestamp="오전 10:12">
        <ChatBubble>{withMentions("@김민지 시안 확인 부탁해요", MEMBERS)}</ChatBubble>
      </MessageGroup>
      <MessageGroup variant="outgoing" timestamp="오전 10:13">
        <ChatBubble>{withMentions("@이준호 넵 점심 전에 볼게요", MEMBERS)}</ChatBubble>
        <StickerMessage src={IMG("sticker-cheer")} alt="응원 이모티콘" />
      </MessageGroup>
    </ChatRoom>
  ),
};

/** Type "@" to open the member list; arrows move, Enter inserts. */
export const MentionAutocomplete: Story = {
  render: function Render() {
    const candidates: MentionCandidate[] = [
      { id: "bot", name: BOT.name, avatarNode: <BotMark /> },
      { id: "me", name: PEOPLE.minji.name, avatar: PEOPLE.minji.avatar, me: true },
      { id: "junho", name: PEOPLE.junho.name, avatar: PEOPLE.junho.avatar },
      { id: "seoyeon", name: PEOPLE.seoyeon.name, avatar: PEOPLE.seoyeon.avatar },
    ];
    const [text, setText] = React.useState("");
    const [active, setActive] = React.useState(0);
    const query = text.match(/@(\S*)$/)?.[1];
    const shown = query === undefined ? [] : candidates.filter((c) => c.name.includes(query));
    const pick = (c: MentionCandidate) => setText(text.replace(/@\S*$/, `@${c.name} `));
    return (
      <ChatRoom
        header={<ChatHeader title="프로젝트 팀" memberCount={4} />}
        input={
          <div className="relative">
            {shown.length > 0 && (
              <MentionPopover
                className="absolute inset-x-[10px] bottom-full mb-[6px]"
                candidates={shown}
                activeId={shown[active % shown.length]?.id}
                onSelect={pick}
              />
            )}
            <MessageInput
              value={text}
              onValueChange={(v) => {
                setText(v);
                setActive(0);
              }}
              onKeyDown={(e) => {
                if (!shown.length) return;
                if (e.key === "ArrowDown" || e.key === "ArrowUp") {
                  e.preventDefault();
                  setActive((a) => (a + (e.key === "ArrowDown" ? 1 : shown.length - 1)) % shown.length);
                } else if (e.key === "Enter" && !e.nativeEvent.isComposing) {
                  e.preventDefault();
                  pick(shown[active % shown.length]);
                }
              }}
            />
          </div>
        }
      >
        <MessageGroup sender={PEOPLE.junho} timestamp="오전 10:12">
          <ChatBubble>내일 회의록 누가 정리해요?</ChatBubble>
        </MessageGroup>
      </ChatRoom>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox", { name: "메시지" });
    await userEvent.type(input, "@");
    await expect(await canvas.findByRole("listbox", { name: "멘션할 멤버" })).toBeVisible();
    await userEvent.keyboard("{ArrowDown}{ArrowDown}{Enter}");
    await expect(input).toHaveValue(`@${PEOPLE.junho.name} `);
  },
};

export const SharedMedia: Story = {
  render: () => (
    <ChatRoom header={<ChatHeader title="동네 친구들" memberCount={3} />} input={<MessageInput />}>
      <MessageGroup variant="outgoing" timestamp="오후 6:40">
        <MediaBubble
          src="/samples/poster-kite.jpg"
          source={{ name: "강변 산책 기록", avatar: IMG("channel-shop"), verified: true }}
          title="노을 질 때 날린 연이 제일 높이 올라갔어요"
          video
          onShare={() => {}}
        />
        <ChatBubble>여기 이번 주말에 가볼래?</ChatBubble>
      </MessageGroup>
      <MessageGroup sender={PEOPLE.seoyeon} timestamp="오후 6:42">
        <ChatBubble>오 연 날리기 좋겠다</ChatBubble>
      </MessageGroup>
    </ChatRoom>
  ),
};

export const ChatbotAnswer: Story = {
  render: () => (
    <ChatRoom header={<ChatHeader title="여행 준비방" memberCount={3} />} input={<MessageInput />}>
      <MessageGroup variant="outgoing" timestamp="오후 2:03">
        <ChatBubble>{withMentions("@도우미 봇 비 오는 날 갈 만한 실내 데이트 코스 알려줘", [BOT.name])}</ChatBubble>
      </MessageGroup>
      <MessageGroup sender={BOT} timestamp="오후 2:03">
        <BotAnswer onMore={() => {}}>
          {withMentions(
            "@김민지 비 오는 날에는 이런 코스를 많이 찾아요.\n\n1. 실내 식물원\n온실 산책로가 넓어서 우산 없이 둘러보기 좋아요.\n\n2. 공방 체험\n향초나 도자기를 같이 만들면 기념품도 생겨요.\n\n3. 북카페\n창가 자리에서 빗소리 들으며 쉬어 가기 좋아요.\n\n4. 실내 클라이밍\n초보 강습이 있는 곳을 고르면 부담이 없어요.",
            [PEOPLE.minji.name]
          )}
        </BotAnswer>
        <BotActionCard text="답변 내용을 더 확인해 보세요." buttonLabel="자세히 보기" />
      </MessageGroup>
    </ChatRoom>
  ),
};
