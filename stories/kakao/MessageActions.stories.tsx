import * as React from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { ChatBubble } from "@/components/ui/kakao/chat-bubble";
import { ChatHeader } from "@/components/ui/kakao/chat-header";
import { ChatRoom } from "@/components/ui/kakao/chat-room";
import {
  BookmarkTagIcon,
  CopyIcon,
  CropIcon,
  MeIcon,
  MegaphoneIcon,
  PencilIcon,
  ReplyIcon,
  ShareIcon,
  TextSelectIcon,
  TrashIcon,
} from "@/components/ui/kakao/icons";
import { MessageActions, type MessageAction } from "@/components/ui/kakao/message-actions";
import { MessageGroup } from "@/components/ui/kakao/message-group";
import { MessageInput } from "@/components/ui/kakao/message-input";
import { PEOPLE, QUICK_REACTIONS } from "./fixtures";

const ICON = { size: 22, strokeWidth: 1.7 };

/** The menu for your own text message, in device order. */
const OWN_MESSAGE_ACTIONS: MessageAction[] = [
  { id: "copy", label: "복사", icon: <CopyIcon {...ICON} /> },
  { id: "select", label: "선택 복사", icon: <TextSelectIcon {...ICON} /> },
  { id: "reply", label: "답장", icon: <ReplyIcon {...ICON} /> },
  { id: "share", label: "공유", icon: <ShareIcon {...ICON} /> },
  { id: "to-me", label: "나에게", icon: <MeIcon size={22} /> },
  { id: "notice", label: "공지", icon: <MegaphoneIcon {...ICON} /> },
  { id: "bookmark", label: "책갈피 설정", icon: <BookmarkTagIcon {...ICON} /> },
  { id: "capture", label: "캡쳐", icon: <CropIcon {...ICON} /> },
  { id: "edit", label: "수정", icon: <PencilIcon {...ICON} /> },
  { id: "delete", label: "삭제", icon: <TrashIcon {...ICON} />, destructive: true },
];

const meta: Meta<typeof MessageActions> = {
  title: "Kakao/MessageActions",
  component: MessageActions,
  args: { reactions: QUICK_REACTIONS, actions: OWN_MESSAGE_ACTIONS, onSelect: fn(), onReact: fn() },
};
export default meta;
type Story = StoryObj<typeof MessageActions>;

export const Playground: Story = {};

/** Long-press on your own message: the bubble darkens and the menu opens under it. */
export const OverChatRoom: Story = {
  parameters: { phone: true },
  render: (args) => (
    <div className="relative h-full">
      <ChatRoom header={<ChatHeader title={PEOPLE.seoyeon.name} />} input={<MessageInput />} stickToBottom={false}>
        <MessageGroup sender={PEOPLE.seoyeon} timestamp="오후 6:00">
          <ChatBubble>우리 언제 만나?</ChatBubble>
        </MessageGroup>
        <MessageGroup variant="outgoing" timestamp="오후 6:00">
          <ChatBubble>23일 저녁 어때?</ChatBubble>
          <ChatBubble pressed>판교역 4번 출구에서 만나!</ChatBubble>
        </MessageGroup>
      </ChatRoom>
      {/* Floats over the log, 8pt under the pressed bubble. */}
      <MessageActions {...args} className="absolute right-[16px] top-[214px]" />
    </div>
  ),
};

export const ArrowKeys: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const items = canvas.getAllByRole("menuitem");
    items[0].focus();
    await userEvent.keyboard("{ArrowUp}");
    await expect(items.at(-1)).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    await expect(args.onSelect).toHaveBeenCalledWith("delete");
  },
};

/** Messages from others drop 수정 / 삭제. */
export const IncomingMessage: Story = {
  args: { actions: OWN_MESSAGE_ACTIONS.filter((a) => a.id !== "edit" && a.id !== "delete") },
  render: (args) => <MessageActions {...args} />,
};

export const WithoutReactions: Story = {
  args: { reactions: undefined },
  render: function Render(args) {
    const [picked, setPicked] = React.useState<string>();
    return (
      <div className="flex flex-col gap-3">
        <MessageActions {...args} onSelect={setPicked} />
        <p className="text-sm">selected: {picked ?? "-"}</p>
      </div>
    );
  },
};
