import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";
import { ChatBubble } from "@/components/ui/kakao/chat-bubble";
import { ChatHeader } from "@/components/ui/kakao/chat-header";
import { ChatRoom } from "@/components/ui/kakao/chat-room";
import { MessageGroup } from "@/components/ui/kakao/message-group";
import { ReactionPicker } from "@/components/ui/kakao/reaction-picker";
import { PEOPLE, REACTION_SECTIONS } from "./fixtures";

const meta: Meta<typeof ReactionPicker> = {
  title: "Kakao/ReactionPicker",
  component: ReactionPicker,
  parameters: { phone: true },
  args: { sections: REACTION_SECTIONS },
};
export default meta;
type Story = StoryObj<typeof ReactionPicker>;

export const OverChatRoom: Story = {
  render: (args) => (
    <div className="relative h-full">
      <ChatRoom header={<ChatHeader title="일반채팅" memberCount={12} />}>
        <MessageGroup sender={PEOPLE.minji} timestamp="오전 10:03">
          <ChatBubble>서연아 생일 축하해</ChatBubble>
        </MessageGroup>
      </ChatRoom>
      <div className="absolute inset-0 bg-kk-sheet-scrim" />
      <div className="absolute inset-x-0 bottom-0 top-[45%]">
        <ReactionPicker {...args} className="h-full" />
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByRole("searchbox"), "생일");
    await expect(canvas.getByRole("button", { name: "축하" })).toBeVisible();
    await expect(canvas.getByRole("button", { name: "케이크" })).toBeVisible();
    await expect(canvas.queryByRole("button", { name: "하트" })).toBeNull();
  },
};

export const NoResults: Story = {
  parameters: { phone: false, surface: "list" },
  args: { query: "없는 리액션" },
  render: (args) => (
    <div className="mx-auto h-[360px] w-[390px] bg-kk-sheet-scrim pt-6">
      <ReactionPicker {...args} className="h-full" />
    </div>
  ),
};
