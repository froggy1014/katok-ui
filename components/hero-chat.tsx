"use client";

import * as React from "react";
import { AlimtalkBubble } from "@/components/ui/kakao/alimtalk-bubble";
import { ChatBubble } from "@/components/ui/kakao/chat-bubble";
import { ChatHeader } from "@/components/ui/kakao/chat-header";
import { ChatRoom } from "@/components/ui/kakao/chat-room";
import { DateSeparator } from "@/components/ui/kakao/date-separator";
import { CopyIcon, PencilIcon, ReplyIcon, ShareIcon, TrashIcon } from "@/components/ui/kakao/icons";
import { DEFAULT_QUICK_REACTIONS, MessageActions } from "@/components/ui/kakao/message-actions";
import { MessageGroup } from "@/components/ui/kakao/message-group";
import { MessageInput } from "@/components/ui/kakao/message-input";
import { MessageReactions, type Reaction } from "@/components/ui/kakao/message-reactions";

const MINJI = { name: "김민지", avatar: "/samples/avatar-minji.svg" };
const SHOP = { name: "미리마켓", avatar: "/samples/channel-shop.svg" };

type TextMessage = {
  id: number;
  kind: "text";
  from: "me" | "minji";
  text: string;
  time: string;
  unread?: number;
  edited?: boolean;
  reactions?: Reaction[];
};

type Message = TextMessage | { id: number; kind: "alimtalk"; time: string };

const ICON = { size: 20, strokeWidth: 1.7 };
const MENU = [
  { id: "copy", label: "복사", icon: <CopyIcon {...ICON} /> },
  { id: "reply", label: "답장", icon: <ReplyIcon {...ICON} /> },
  { id: "share", label: "공유", icon: <ShareIcon {...ICON} /> },
  { id: "edit", label: "수정", icon: <PencilIcon {...ICON} /> },
  { id: "delete", label: "삭제", icon: <TrashIcon {...ICON} />, destructive: true },
];

type Scene = "friend" | "shop";

/** One beat of the script. `type` fills the input letter by letter, then sends. */
type Step =
  | { wait: number; scene: Scene }
  | { wait: number; say: string; time: string }
  | { wait: number; type: string; time: string }
  | { wait: number; read: true }
  /** Long-press your last message: it darkens and the menu opens under it. */
  | { wait: number; press: true }
  /** Pick 수정: the menu closes and the last message is rewritten. */
  | { wait: number; edit: string }
  | { wait: number; react: { from: "me" | "minji"; emoji: string; label: string } }
  | { wait: number; alimtalk: string };

const SCRIPT: Step[] = [
  { wait: 500, scene: "friend" },
  { wait: 700, say: "러닝화 새로 샀어? 👟", time: "오후 6:02" },
  { wait: 900, say: "주말에 같이 뛰자", time: "오후 6:02" },
  { wait: 900, type: "응 미리마켓에서 방금 주문햇어", time: "오후 6:03" },
  { wait: 900, read: true },
  { wait: 700, press: true },
  { wait: 1500, edit: "응 미리마켓에서 방금 주문했어" },
  { wait: 900, react: { from: "minji", emoji: "👍", label: "좋아요" } },
  { wait: 900, say: "오 나도 링크 줘 👀", time: "오후 6:03" },
  { wait: 800, type: "알림톡 오면 보여줄게", time: "오후 6:04" },
  { wait: 1000, read: true },
  { wait: 800, react: { from: "minji", emoji: "😆", label: "웃음" } },
  { wait: 1600, scene: "shop" },
  { wait: 900, alimtalk: "오후 6:04" },
  { wait: 5200, scene: "friend" },
];

const TYPE_SPEED = 75;

const REDUCED = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function useReducedMotion() {
  return React.useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED).matches,
    () => false
  );
}

/** The full friend conversation, for reduced motion and the first paint. */
const STATIC_FRIEND: Message[] = [
  { id: 1, kind: "text", from: "minji", text: "러닝화 새로 샀어? 👟", time: "오후 6:02" },
  { id: 2, kind: "text", from: "minji", text: "주말에 같이 뛰자", time: "오후 6:02" },
  {
    id: 3,
    kind: "text",
    from: "me",
    text: "응 미리마켓에서 방금 주문했어",
    time: "오후 6:03",
    edited: true,
    reactions: [{ id: "like", emoji: "👍", label: "좋아요", count: 1 }],
  },
  { id: 4, kind: "text", from: "minji", text: "오 나도 링크 줘 👀", time: "오후 6:03" },
  {
    id: 5,
    kind: "text",
    from: "me",
    text: "알림톡 오면 보여줄게",
    time: "오후 6:04",
    reactions: [{ id: "laugh", emoji: "😆", label: "웃음", count: 1 }],
  },
];

/** Applies `fn` to the newest text message sent by `from`. */
function updateLast(list: Message[], from: "me" | "minji", fn: (m: TextMessage) => TextMessage) {
  const i = list.findLastIndex((m) => m.kind === "text" && m.from === from);
  return i < 0 ? list : list.map((m, j) => (j === i ? fn(m as TextMessage) : m));
}

/**
 * Landing-page hero: a scripted conversation that plays on a loop, built only
 * from the registry components. Decorative, so it is hidden from assistive tech.
 */
export function HeroChat() {
  const reduced = useReducedMotion();
  const [scene, setScene] = React.useState<Scene>("friend");
  const [messages, setMessages] = React.useState<Message[]>(STATIC_FRIEND);
  const [draft, setDraft] = React.useState("");
  const [pressing, setPressing] = React.useState(false);

  React.useEffect(() => {
    // Reduced motion renders the finished conversation instead (see below).
    if (reduced) return;
    let cancelled = false;
    let id = 0;
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

    async function play() {
      while (!cancelled) {
        for (const step of SCRIPT) {
          await sleep(step.wait);
          if (cancelled) return;
          if ("scene" in step) {
            setScene(step.scene);
            setMessages([]);
            setPressing(false);
          } else if ("say" in step) {
            const msg: Message = { id: ++id, kind: "text", from: "minji", text: step.say, time: step.time };
            setMessages((m) => [...m, msg]);
          } else if ("type" in step) {
            for (let i = 1; i <= step.type.length; i++) {
              setDraft(step.type.slice(0, i));
              await sleep(TYPE_SPEED);
              if (cancelled) return;
            }
            await sleep(250);
            const msg: Message = { id: ++id, kind: "text", from: "me", text: step.type, time: step.time, unread: 1 };
            setDraft("");
            setMessages((m) => [...m, msg]);
          } else if ("read" in step) {
            setMessages((m) => m.map((x) => (x.kind === "text" ? { ...x, unread: undefined } : x)));
          } else if ("press" in step) {
            setPressing(true);
          } else if ("edit" in step) {
            setPressing(false);
            setMessages((m) => updateLast(m, "me", (x) => ({ ...x, text: step.edit, edited: true })));
          } else if ("react" in step) {
            // Your partner reacts to your latest message, and vice versa.
            const target = step.react.from === "me" ? "minji" : "me";
            const { emoji, label } = step.react;
            setMessages((m) =>
              updateLast(m, target, (x) => ({ ...x, reactions: [{ id: label, emoji, label, count: 1 }] }))
            );
          } else if ("alimtalk" in step) {
            const msg: Message = { id: ++id, kind: "alimtalk", time: step.alimtalk };
            setMessages((m) => [...m, msg]);
          }
        }
      }
    }

    play();
    return () => {
      cancelled = true;
    };
  }, [reduced]);

  const shown = reduced ? STATIC_FRIEND : messages;
  const pressedId = !reduced && pressing ? shown.findLast((m) => m.kind === "text" && m.from === "me")?.id : undefined;

  // Consecutive messages from one side at the same minute share a group.
  const groups: Message[][] = [];
  for (const m of shown) {
    const last = groups[groups.length - 1]?.at(-1);
    const same = last && last.kind === "text" && m.kind === "text" && last.from === m.from && last.time === m.time;
    if (same) groups[groups.length - 1].push(m);
    else groups.push([m]);
  }

  const isShop = !reduced && scene === "shop";

  return (
    <div aria-hidden inert className="h-full">
      <ChatRoom
        header={isShop ? <ChatHeader title={SHOP.name} /> : <ChatHeader title={MINJI.name} unreadTotal={4} />}
        input={
          <MessageInput
            value={isShop || reduced ? "" : draft}
            placeholder={isShop ? "채널에 메시지를 보낼 수 없습니다" : "메시지 입력"}
            readOnly
          />
        }
      >
        <DateSeparator date="2026년 10월 11일 일요일" />
        {groups.map((group) => {
          const first = group[0];
          const tail = group[group.length - 1];
          if (first.kind === "alimtalk") {
            return (
              <MessageGroup key={first.id} sender={SHOP} className="kk-hero-pop">
                <AlimtalkBubble
                  emphasizeType="ITEM_LIST"
                  itemList={{
                    header: "주문 접수 완료",
                    highlight: {
                      title: "러닝화 외 1건",
                      description: "미리마켓 공식몰",
                      thumbnail: "/samples/thumb-shoes.svg",
                    },
                    items: [
                      { title: "주문번호", description: "20261011-0042" },
                      { title: "배송예정", description: "10월 13일(화)" },
                    ],
                    summary: { title: "총 결제", description: "38,900원" },
                  }}
                  content="주문이 정상적으로 접수되었습니다. 감사합니다."
                  buttons={[{ type: "WL", name: "주문 내역 보기" }]}
                  timestamp={first.time}
                />
              </MessageGroup>
            );
          }
          const mine = first.kind === "text" && first.from === "me";
          return (
            <React.Fragment key={first.id}>
              <MessageGroup
                variant={mine ? "outgoing" : "incoming"}
                sender={mine ? undefined : MINJI}
                timestamp={tail.time}
                unreadCount={tail.kind === "text" ? tail.unread : undefined}
              >
                {group.map((m) =>
                  m.kind === "text" ? (
                    <ChatBubble
                      key={m.id}
                      className="kk-hero-pop"
                      edited={m.edited}
                      pressed={m.id === pressedId}
                      // Always pass a node so the bubble keeps its wrapper (and doesn't re-pop) when a reaction lands.
                      reactions={
                        m.reactions ? <MessageReactions className="kk-hero-pop" reactions={m.reactions} /> : <React.Fragment />
                      }
                    >
                      {m.text}
                    </ChatBubble>
                  ) : null
                )}
              </MessageGroup>
              {group.some((m) => m.id === pressedId) && (
                <div className="kk-hero-pop -mt-[4px] flex justify-end">
                  <MessageActions className="w-[260px]" reactions={DEFAULT_QUICK_REACTIONS} actions={MENU} />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </ChatRoom>
    </div>
  );
}
