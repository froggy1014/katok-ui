# Katok UI

> **KakaoTalk (카카오톡) UI components for React** — an unofficial shadcn/ui registry of Kakao / KakaoTalk mobile (iOS) chat UI, plus the first open-source **Kakao AlimTalk (카카오 알림톡) and Brand Message (브랜드메시지) preview** components.
>
> 카카오톡 채팅 UI(말풍선, 채팅 목록, 입력창)와 카카오 알림톡·브랜드메시지 미리보기를 React 컴포넌트로 제공하는 비공식 shadcn/ui 레지스트리입니다.

If you send Kakao Biz Messages — from a SaaS dashboard, a CRM, or an internal admin — you need a preview that looks like what customers actually see in KakaoTalk. Teams keep rebuilding `AlimtalkPreview` from scratch. This registry gives you that, plus the core chat UI, ready to drop into a React app.

**[Demo](https://katok-ui.jeongmin.dev)** · **[Storybook](https://katok-ui.jeongmin.dev/storybook)** · **[Registry](https://katok-ui.jeongmin.dev/r/registry.json)**

<p align="center"><img src="./docs/demo.gif" width="300" alt="Katok UI demo: typing and sending a message, dark mode, an AlimTalk order notice and a Brand Message ad" /></p>

> "Katok" (카톡) is the everyday nickname for KakaoTalk. Not affiliated with or endorsed by Kakao Corp. No Kakao logos, characters, or font files are included.

---

## Install

```bash
npx shadcn@latest add https://katok-ui.jeongmin.dev/r/alimtalk-bubble.json
```

Each component is independent — it brings the files it needs (tokens, icons, shared bubble layout).

---

## What's included

| Component | |
|---|---|
| `kakao-core` | Tokens (`kakao.css`) and the shared icon set; every item depends on it, so `shadcn add` pulls it in |
| `chat-bubble` | Yellow outgoing / white incoming, first-bubble tail, unread count "1", time, "수정됨" inside the bubble, pressed state, `reactions` slot |
| `message-group` | Consecutive messages: squircle avatar + name on the first, tail on the first, time on the last |
| `profile-avatar` | Squircle, default silhouette, 2–4 member group-chat composites |
| `chat-header` | iOS 26 floating glass pills: back + unread total, centered title + member count, search + menu; large-title tab header |
| `message-input` | Floating pill: round `+`, auto-grow, emoji, `#` that turns into the yellow send button; IME-safe Enter |
| `date-separator` | Date pill + `formatKakaoDate()` |
| `system-message` | Join / leave / invite / deleted notices |
| `chat-list-item` | Chats tab row: unread badge, mute, pin, member count, open chat mark, `render` polymorphism; `selected` makes it a picker row |
| `mention` | Blue `@이름` (`withMentions()`) and the "@" member list above the input |
| `sticker-message` | Emoticon message: the art alone, no bubble |
| `media-bubble` | Shared photo / video / short-form card with source, title, play mark, side share button |
| `bot-message` | Chatbot answer with "전체보기 >" and the follow-up button card |
| `message-reactions` | Reaction chips under a bubble (`<ChatBubble reactions>`), counts, your own highlighted, add chip |
| `message-actions` | Long-press menu: quick-reaction card + 복사 · 답장 · 공유 · … · 삭제 |
| `bottom-sheet` | Sheet surface (44pt corners, grabber) and sheet search field |
| `attachment-sheet` | "+" sheet: recent photos with camera tile and 전송, grouped attachment rows, promo banner |
| `voice-recorder` | 음성메시지 sheet body: idle / recording bar, timer, record · stop · send |
| `notice-banner` | Pinned 공지 card (`<ChatRoom notice>`) |
| `capture-mode` | 캡처: glass header and toolbar, spotlight selection that dims the rest |
| `action-sheet` | iOS 26 glass action sheet (송금하기 · 요청하기 · 1/N 정산하기 …) |
| `location-picker` | 지도 → 이 위치 보내기 chrome over your own map |
| `reaction-picker` | Reaction search + sectioned 6-column emoji grid |
| `share-sheet` | Share bottom sheet: grabber, search, filter chips, picker rows, quick-share targets |
| `chat-room` | Layout shell: header, message log, input, custom theme background |
| `alimtalk-bubble` | `messageType` BA/EX/AD/MI × `emphasizeType` NONE/TEXT/IMAGE/ITEM_LIST, buttons, quick replies — matched against the Kakao Business guide |
| `brand-message-bubble` | `chatBubbleType` TEXT/IMAGE/WIDE/CAROUSEL_FEED, ticket coupons, opt-out line; `adSenderName()` for the "(광고)" sender label |
| `biz-button` | Biz Message buttons using API codes (WL, AL, DS, BK, MD, BC, BT, AC, BF, TN, P1–P3) |

### Biz Message props mirror the API

```tsx
<MessageGroup sender={{ name: "미리마켓", avatar: "/shop.png" }}>
  <AlimtalkBubble
    messageType="BA"
    emphasizeType="TEXT"
    subtitle="배송 출발 안내"
    title="오늘 도착 예정"
    content={template.content}
    buttons={[{ type: "DS", name: "배송 조회" }]}
  />
</MessageGroup>
```

Length limits follow the Kakao Business content guide (body 1,300, or 1,000 with an item list; title 50; item list header 16; buttons ≤ 5 …). Over-limit text is cut with an ellipsis and warned in development, and every bubble takes a `limits` override.

---

## Design tokens

No official KakaoTalk design system is public. Tokens are reconstructed and **every value carries an evidence grade**: official (developers.kakao.com), official theme-creation spec, measured from Kakao's own App Store screenshots and Business guides, measured on device, or clone approximation. Token names follow KakaoTalk's theme slots, so a custom theme is a handful of CSS variables.

Storybook's **Kakao/Reference** pages put each screen next to Kakao's imagery. Those images aren't redistributed: `pnpm refs:fetch` downloads them locally.

See [`DESIGN.md`](./DESIGN.md).

---

## Stack

- **Tailwind CSS v4** — utilities mapped to `--kk-*` tokens
- **shadcn/ui registry** — install with `npx shadcn add`
- **Storybook 10** — every use case, light and dark, with story tests in Chromium

## Develop

```bash
pnpm install
pnpm storybook      # http://localhost:6006
pnpm dev            # landing + registry routes
pnpm test           # unit tests (limits, coupon formats)
pnpm test:stories   # render every story in headless Chromium
pnpm refs:fetch     # download Kakao reference images for Kakao/Reference (local only)
```

---

## License

[MIT](./LICENSE) · [Contributing](./CONTRIBUTING.md) · UI icons adapted from [Lucide](https://lucide.dev) (ISC).
