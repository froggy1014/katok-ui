# Katok UI — Design System

Reconstructed tokens for **KakaoTalk iOS 26.x** (after the 25.11.0 rollback of the
friends-tab feed). No official KakaoTalk design system is published, so every value
is graded by evidence. Replace **C** and **M** values as device measurements come in.

The chat room follows the iOS 26 layout: the header is transparent with floating glass
pills (back + unread count, search + menu), and the input is a floating pill with round
`+`, emoji and `#` buttons. Compare against Kakao's own imagery in Storybook under
**Kakao/Reference** after running `pnpm refs:fetch` (images stay local, see below).

| Grade | Meaning | Source |
|---|---|---|
| **O** | Official | [Kakao Login design guide](https://developers.kakao.com/docs/latest/ko/kakaologin/design-guide) |
| **T** | Official theme-creation spec | KakaoTalk user theme guide (Android 26.1.0 PDF) and sample iOS theme CSS (25.8.0) |
| **C** | Clone approximation | Public KakaoTalk clones (majority value) |
| **S** | Measured from Kakao's published imagery | KakaoTalk App Store screenshots (KR, light mode, rendered ≈2.35 px/pt) and Kakao Business AlimTalk / Brand Message guides (rendered 1.9 px/pt), 2026-10 |
| **D** | Measured on device | KakaoTalk iOS, iPhone @3x capture (dark mode), 2026-10 |
| **M** | Pending on-device measurement | Placeholder |

All tokens live in [`components/ui/kakao/styles/kakao.css`](./components/ui/kakao/styles/kakao.css)
as `--kk-*` variables, exposed to Tailwind as `bg-kk-*`, `text-kk-*`.

---

## Color

### Brand
| Token | Light | Grade | Note |
|---|---|---|---|
| `--kk-yellow` | `#FEE500` | O | Kakao Login container color |
| `--kk-on-yellow` | `#000` @ 85% | O | Login label |
| `--kk-brown` | `#3C1E1E` | C | |

### Chat room (`BackgroundStyle-ChatRoom`)
| Token | Light | Dark | Grade |
|---|---|---|---|
| `--kk-chat-bg` | `#ABC1D1` | `#080808` | S / D |
| `--kk-chat-pill-bg` | `rgba(0,0,0,.15)` | `rgba(255,255,255,.12)` | C |
| `--kk-chat-meta` (time) | `rgba(0,0,0,.5)` | `#9C9C9C` | S / D |
| `--kk-chat-sender` (name) | `rgba(0,0,0,.88)` | `#CFCFCF` | S / D |
| `--kk-glass-bg` (header pills) | `rgba(255,255,255,.22)` | `rgba(255,255,255,.17)` | S / D |

Both the App Store screenshots and the Kakao Business guide render the default room as `#ABC1D1`;
clones use `#B2C7D9` (majority), `#B2C7DA`, `#BACEE0`, `#9BBBD4`.

### Input bar (`InputBarStyle-Chat`)
| Token | Light | Dark | Grade |
|---|---|---|---|
| `--kk-input-bar-bg` (pill) | `#D8E7EF` | `#141414` | S / D |
| `--kk-input-button-bg` (`+`, `#`) | `#FFFFFF` | `#2E2E2E` | S / D |
| `--kk-input-emoji-bg` | `rgba(0,0,0,.1)` | `rgba(255,255,255,.11)` | S / D |
| `--kk-input-placeholder` | `#8C9599` | `#6D6D6D` | S / D |

Pill 48pt tall, 10pt from the screen edges; round buttons 32pt, emoji button 24pt (D).

### Bubbles (`MessageCellStyle-Send` / `-Receive`)
| Token | Light | Dark | Grade |
|---|---|---|---|
| `--kk-bubble-outgoing` | `#FEE500` | `#FEE500` | O / C |
| `--kk-bubble-incoming` | `#FFFFFF` | `#282828` | S / D |
| `--kk-bubble-*-fg` | `#191919` | `#191919` / `#F2F2F2` | T / D |
| `--kk-unread` | `#FEE500` | `#FEE500` | C / D (theme slot `-ios-unread-text-color`) |

### Lists (`MainViewStyle-Primary`)
| Token | Light | Grade |
|---|---|---|
| `--kk-list-title` | `#191919` | T |
| `--kk-list-pressed` | `rgba(0,0,0,.05)` | T |
| `--kk-divider` | `rgba(0,0,0,.09)` | T |
| `--kk-list-description` / `-meta` | `#767676` | S |
| `--kk-badge` | `#F4551E` | S |
| `--kk-open-chat` | `#424242` disc, 17pt, before the name | S |
| `--kk-check-border` | `#949494` ring, 22pt, 1.5pt stroke | S |
| `--kk-check-selected` | `#FEE500` fill + dark check | C |

### Reactions & message menu
Measured from kakaocorp.com KakaoTalk service screenshots and the 26.4 update image (**S**). Dark values are **C**.

| Token / part | Value |
|---|---|
| "수정됨" | inside the bubble, own line, right-aligned, 12px; `rgba(0,0,0,.6)` on yellow (`#665C00`) |
| `--kk-bubble-pressed` | `brightness(.9)` on the pressed bubble while the menu is open |
| `--kk-reaction-bg` | `rgba(255,255,255,.5)` — `#D6E0E9` on `#ABC0D1`; chips 24pt tall, 4pt apart, 8pt between rows, 8pt under the bubble |
| `--kk-reaction-selected-bg` | `rgba(255,255,255,.9)` (**C**, the viewer's own reaction) |
| Quick-reaction card | white, 50pt tall, 16pt radius, six emoji |
| Menu | white card, 300pt wide, 16pt radius, 5pt under the reaction card; rows 45pt, 17px, icon right |
| `--kk-menu-pressed` / `-divider` | `#F5F5F5` / `#F0F0F0` |
| `--kk-menu-destructive` | `#F56B3A` (삭제) |
| Chat behind the menu | not dimmed; the cards cast a shadow (`--kk-menu-shadow`, **C**) |

### Attachment sheet ("+")
Measured from an iOS 26 device screenshot (**S**). Icons in the stories are stand-ins; pass your own.

| Part | Value |
|---|---|
| "최근 사진" | 18px bold, 20pt from the left; 전송 pill 45×30, `#EFF0EF` / `#767676` while nothing is picked (yellow when enabled is **C**) |
| Thumbnails | 104pt squares, 6pt apart, 12pt radius; camera tile `#949494`; 22pt pick ring 6pt from the top-right |
| Rows | 46pt, 24pt icon at 21pt, 17px label 13pt after it |
| Group divider | full-width `#DBDBDB` |
| Banner | `--kk-sheet-fill`, 12pt radius, 16px bold title, `#5C5C5C` 15px link with chevron |

### Share sheet
Measured from an iOS 26 device screenshot (**S**, 402pt wide @3x). Dark values are **C**.

| Token / part | Value |
|---|---|
| `--kk-sheet-scrim` | `rgba(0,0,0,.5)` — `#ABC1D1` dims to `#576067` |
| `--kk-radius-sheet` | `44px` top corners |
| `--kk-sheet-grabber` | `#949494`, 36×5pt, 8pt from the top |
| `--kk-sheet-fill` | `#F5F5F5` — search field (43pt, 8pt radius, 16pt gutter) and 52pt quick-share circles |
| `--kk-sheet-placeholder` | `#888888`, 15px |
| Chips | 36pt pill, 14px, 12pt side padding; `#191919` filled when active, `#DBDBDB` 1px ring otherwise |
| Picker rows | 76pt pitch (14pt vertical padding around the 48pt avatar) |
| Quick-share row | `--kk-divider` top border, 66pt columns, `#424242` 14px captions |

### Biz Message
Measured from the Kakao Business content guides (**S**), which render the card 510px wide = 268pt.

| Token / part | Value |
|---|---|
| `--kk-biz-band` | `#FEE500`, 40pt tall, 13px label, no icon |
| `--kk-biz-badge` | round `#333` mark, 28pt, centered on the card's top-right corner (rendered as plain text "kakao", not the logotype) |
| `--kk-biz-button-bg` | `#F5F5F5`, 40pt; the AC "채널 추가" button is yellow |
| Card padding / body | 12pt / 15px |
| Item list | header 15px bold + divider, highlight 16px + divider, items 13px, summary 18px bold + divider. With a summary, item values right-align |
| `--kk-biz-coupon-*` | white ticket with `#EBEBEB` border, `#E6F1FB` download stub, `#0A73DC` arrow |
| Brand Message ads | "(광고)" before the sender name; "수신거부 \| 홈 > 채널 차단" under the bubble |

---

## Shape & size

| Token | Value | Grade | Note |
|---|---|---|---|
| Bubble tail | first bubble of a group only | T | Theme spec ships separate "first" / "following" 9-slice images |
| Tail shape | "ear" outside the rounded corner: tip 2px past the edge at y≈0.8, scooped notch to (4, 3.6) | D | Traced from device; path in `chat-bubble.tsx` |
| Bubble text padding | `10 11 7 17` send / `10 17 7 11` receive (incl. tail side) | T | Implemented as `8px 11px` + drawn tail |
| `--kk-radius-bubble` | `13px` | D | All four corners, including the tail corner |
| `--kk-radius-avatar` | `40%` squircle | C | |
| `--kk-avatar-chat` / `-list` | `34px` / `48px` | D / C | |
| `--kk-text-message` | `16px` / line `21px` | D | Default font-size setting; 1-line bubble is 35px tall |
| `--kk-text-meta` | `10px` | C | |
| `--kk-header-height` | `60px` (44pt glass pills) | D | |
| `--kk-msg-max-width` | `min(70%, 264px)` | C | |

## Typography

System stack: `-apple-system`, `Apple SD Gothic Neo`, then Pretendard / Noto Sans KR.
Kakao's own fonts (카카오 큰글씨 / 작은글씨, OFL, June 2025) can be swapped in via
`--kk-font-family`; they are not bundled and not confirmed as the app UI font.

## Biz Message rules encoded

- AlimTalk: `messageType` BA / EX / AD / MI; `emphasizeType` NONE / TEXT / IMAGE / ITEM_LIST;
  AD and MI pin a "채널 추가" button first and show the fixed channel-add notice.
- Brand Message: only WL / AL / AC buttons; TEXT and IMAGE stack up to 5, WIDE and
  CAROUSEL place up to 2 side by side with 8-char names; coupon titles use five formats.
- Limits: [`lib/biz-limits.ts`](./lib/biz-limits.ts) — sources: NHN Cloud AlimTalk API v2.3,
  Kakao Business content guide, Ncloud SENS, Solapi (checked 2026-10-11). The AlimTalk body is
  1,300 characters, or 1,000 with an item list; extra info + channel-add notice is 500, or 200.

## Reference imagery

`pnpm refs:fetch` downloads the App Store screenshots and the Kakao Business guide images
into `public/reference/`. They belong to Kakao Corp., so that folder is git-ignored and
excluded from the Docker build: the comparison pages work locally only.

## Principles

1. **Evidence over guesswork** — every token is graded; unknowns are marked, not invented.
2. **Theme-slot names** — tokens map to KakaoTalk theme slots.
3. **API-shaped props** — Biz Message props use the field names and codes senders already have.
4. **Light + dark** for every token.
5. **No trademarks** — no Kakao logo, characters, or fonts.
