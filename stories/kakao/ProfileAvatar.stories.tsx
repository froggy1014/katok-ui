import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, waitFor } from "storybook/test";
import { ProfileAvatar } from "@/components/ui/kakao/profile-avatar";
import { PEOPLE } from "./fixtures";

const IMG_JPG = (name: string) => `/samples/${name}.jpg`;

const meta: Meta<typeof ProfileAvatar> = {
  title: "Kakao/ProfileAvatar",
  component: ProfileAvatar,
  args: { src: PEOPLE.minji.avatar, name: PEOPLE.minji.name, size: "lg" },
  argTypes: { size: { control: "inline-radio", options: ["xs", "sm", "md", "lg", "xl"] } },
};
export default meta;
type Story = StoryObj<typeof ProfileAvatar>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <div key={size} className="flex flex-col items-center gap-1">
          <ProfileAvatar src={PEOPLE.junho.avatar} name="이준호" size={size} />
          <span className="font-kk text-[11px] text-kk-chat-meta">{size}</span>
        </div>
      ))}
    </div>
  ),
};

export const DefaultSilhouette: Story = {
  args: { src: undefined, name: "알 수 없음" },
};

/** Group chats in the chat list combine up to four member photos. */
export const GroupComposites: Story = {
  render: () => {
    const photos = [PEOPLE.minji, PEOPLE.junho, PEOPLE.seoyeon, PEOPLE.dohyun].map((p) => p.avatar);
    return (
      <div className="flex items-center gap-4">
        <ProfileAvatar src={photos.slice(0, 2)} size="lg" name="2명" />
        <ProfileAvatar src={photos.slice(0, 3)} size="lg" name="3명" />
        <ProfileAvatar src={photos} size="lg" name="4명" />
        <ProfileAvatar src={[photos[0], undefined, photos[2]]} size="lg" name="사진 없는 멤버" />
      </div>
    );
  },
};

export const CustomPixelSize: Story = {
  args: { size: 96 },
};

/** Real photos of any aspect ratio are center-cropped into the squircle. */
export const Photos: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <ProfileAvatar src={IMG_JPG("photo-landscape")} name="가로 사진" size="xl" />
      <ProfileAvatar src={IMG_JPG("photo-portrait")} name="세로 사진" size="xl" />
      <ProfileAvatar src={[IMG_JPG("photo-landscape"), IMG_JPG("photo-portrait"), PEOPLE.minji.avatar]} name="3명" size="xl" />
    </div>
  ),
};

/** A URL that fails to load falls back to the default silhouette. */
export const BrokenImage: Story = {
  args: { src: "/samples/does-not-exist.jpg", name: "깨진 이미지", size: "xl" },
  play: async ({ canvasElement }) => {
    await waitFor(() => expect(canvasElement.querySelector("img")).toBeNull());
  },
};

/** `renderImage` swaps in your own image element, e.g. Next.js `<Image fill />`. */
export const CustomImage: Story = {
  args: {
    src: IMG_JPG("photo-portrait"),
    size: "xl",
    renderImage: ({ src, onError, className }) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} onError={onError} alt="" className={`${className} grayscale`} data-testid="custom" />
    ),
  },
};
