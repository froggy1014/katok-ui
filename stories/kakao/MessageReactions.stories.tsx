import * as React from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";
import { ChatBubble } from "@/components/ui/kakao/chat-bubble";
import { MessageGroup } from "@/components/ui/kakao/message-group";
import { MessageReactions, type Reaction } from "@/components/ui/kakao/message-reactions";
import { PEOPLE } from "./fixtures";

const meta: Meta<typeof MessageReactions> = {
  title: "Kakao/MessageReactions",
  component: MessageReactions,
};
export default meta;
type Story = StoryObj<typeof MessageReactions>;

const BIRTHDAY: Reaction[] = [
  { id: "party", emoji: "🥳", label: "축하", count: 9 },
  { id: "cake", emoji: "🎂", label: "케이크", count: 6 },
  { id: "tada", emoji: "🎉", label: "빵빠레", count: 1 },
  { id: "gift", emoji: "🎁", label: "선물", count: 3 },
  { id: "clap", emoji: "👏", label: "박수", count: 4 },
  { id: "heart", emoji: "❤️", label: "하트", count: 12 },
  { id: "love", emoji: "😍", label: "하트 눈", count: 9 },
];

function useToggle(initial: Reaction[]) {
  const [list, setList] = React.useState(initial);
  const toggle = (id: string) =>
    setList((l) => l.map((r) => (r.id === id ? { ...r, selected: !r.selected, count: r.count + (r.selected ? -1 : 1) } : r)));
  return [list, toggle] as const;
}

export const UnderBubbles: Story = {
  render: function Render() {
    const [incoming, toggleIn] = useToggle(BIRTHDAY);
    const [outgoing, toggleOut] = useToggle([
      { id: "heart", emoji: "❤️", label: "하트", count: 4 },
      { id: "purple", emoji: "💜", label: "보라 하트", count: 9 },
      { id: "love", emoji: "🥰", label: "사랑", count: 2, selected: true },
    ]);
    return (
      <div className="flex flex-col gap-[12px]">
        <MessageGroup sender={PEOPLE.minji} timestamp="오전 10:03" unreadCount={12}>
          <ChatBubble reactions={<MessageReactions reactions={incoming} onToggle={toggleIn} onAdd={() => {}} />}>
            서연아 생일 축하해
          </ChatBubble>
        </MessageGroup>
        <MessageGroup variant="outgoing" timestamp="오전 10:03" unreadCount={12}>
          <ChatBubble reactions={<MessageReactions reactions={outgoing} onToggle={toggleOut} onAdd={() => {}} />}>
            고마워
          </ChatBubble>
        </MessageGroup>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const heart = canvas.getByRole("button", { name: "하트 12" });
    await userEvent.click(heart);
    await expect(canvas.getByRole("button", { name: "하트 13" })).toHaveAttribute("aria-pressed", "true");
  },
};

export const Single: Story = {
  args: { reactions: [{ id: "heart", emoji: "❤️", label: "하트", count: 1 }], onAdd: () => {} },
};

export const Overflow: Story = {
  args: { reactions: [{ id: "heart", emoji: "❤️", label: "하트", count: 1200 }] },
};
