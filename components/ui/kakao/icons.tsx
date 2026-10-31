import * as React from "react";

/**
 * Inline UI icons. Stroke paths come from Lucide (ISC license,
 * https://lucide.dev) and are copied into the repo so every registry item
 * installs without an icon-library dependency. No Kakao logos or characters.
 */

type IconProps = React.SVGProps<SVGSVGElement> & { size?: number };

function strokeIcon(name: string, children: React.ReactNode) {
  const Icon = ({ size = 24, ...props }: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={props["aria-label"] ? undefined : true}
      role={props["aria-label"] ? "img" : undefined}
      {...props}
    >
      {children}
    </svg>
  );
  Icon.displayName = name;
  return Icon;
}

export const ChevronLeftIcon = strokeIcon("ChevronLeftIcon", <path d="m15 18-6-6 6-6" />);
export const ChevronRightIcon = strokeIcon("ChevronRightIcon", <path d="m9 18 6-6-6-6" />);
export const SearchIcon = strokeIcon(
  "SearchIcon",
  <>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </>
);
export const MenuIcon = strokeIcon("MenuIcon", <path d="M4 6h16M4 12h16M4 18h16" />);
export const PlusIcon = strokeIcon("PlusIcon", <path d="M5 12h14M12 5v14" />);
export const SmileIcon = strokeIcon(
  "SmileIcon",
  <>
    <circle cx="12" cy="12" r="10" />
    <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" />
  </>
);
/** Face without the outline — sits inside the input bar's round emoji button. */
export const EmojiFaceIcon = strokeIcon("EmojiFaceIcon", <path d="M7 13s1.8 3 5 3 5-3 5-3M8.5 8.5v1M15.5 8.5v1" />);
export const HashIcon = strokeIcon("HashIcon", <path d="M4 9h16M4 15h16M10 3 8 21M16 3l-2 18" />);
export const ArrowUpIcon = strokeIcon("ArrowUpIcon", <path d="m5 12 7-7 7 7M12 19V5" />);
export const BellOffIcon = strokeIcon(
  "BellOffIcon",
  <path d="M10.268 21a2 2 0 0 0 3.464 0M17 17H4a1 1 0 0 1-.74-1.673C4.59 13.956 6 12.499 6 8a6 6 0 0 1 .258-1.742M2 2l20 20M8.668 3.01A6 6 0 0 1 18 8c0 2.687.77 4.653 1.707 6.05" />
);
export const PinIcon = strokeIcon(
  "PinIcon",
  <path d="M12 17v5M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z" />
);
export const CalendarIcon = strokeIcon(
  "CalendarIcon",
  <>
    <rect width="18" height="18" x="3" y="4" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </>
);
export const DownloadIcon = strokeIcon("DownloadIcon", <path d="M12 4v11m-5-5 5 5 5-5M5 20h14" />);
export const TicketIcon = strokeIcon(
  "TicketIcon",
  <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2ZM13 5v2M13 17v2M13 11v2" />
);
export const MessageCircleIcon = strokeIcon(
  "MessageCircleIcon",
  <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
);
export const SettingsIcon = strokeIcon(
  "SettingsIcon",
  <>
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </>
);

export const CheckIcon = strokeIcon("CheckIcon", <path d="M20 6 9 17l-5-5" />);
export const MoreHorizontalIcon = strokeIcon(
  "MoreHorizontalIcon",
  <>
    <circle cx="12" cy="12" r="1" />
    <circle cx="19" cy="12" r="1" />
    <circle cx="5" cy="12" r="1" />
  </>
);

export const SmilePlusIcon = strokeIcon(
  "SmilePlusIcon",
  <path d="M22 11v1a10 10 0 1 1-9-10M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01M16 5h6M19 2v6" />
);
export const CameraIcon = strokeIcon(
  "CameraIcon",
  <>
    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
    <circle cx="12" cy="13" r="3" />
  </>
);
export const PhoneIcon = strokeIcon(
  "PhoneIcon",
  <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
);
export const VideoIcon = strokeIcon(
  "VideoIcon",
  <>
    <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
    <rect x="2" y="6" width="14" height="12" rx="2" />
  </>
);
export const FileIcon = strokeIcon(
  "FileIcon",
  <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7zM14 2v4a2 2 0 0 0 2 2h4" />
);
export const PictureIcon = strokeIcon(
  "PictureIcon",
  <>
    <rect width="18" height="18" x="3" y="3" rx="3" />
    <path d="m6 15 3.5-4 3 3 2-2L18 15" />
  </>
);
/** Document on a scanner bed (original drawing). */
export const ScanDocumentIcon = strokeIcon(
  "ScanDocumentIcon",
  <path d="M6 13V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8M9 7h6M9 10h6M3 13h18M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6" />
);
export const XIcon = strokeIcon("XIcon", <path d="M18 6 6 18M6 6l12 12" />);
export const SlidersIcon = strokeIcon(
  "SlidersIcon",
  <path d="M21 7h-8M8 7H3M21 17h-5M11 17H3M10.5 4.5v5M15.5 14.5v5" />
);
export const CrosshairIcon = strokeIcon(
  "CrosshairIcon",
  <>
    <circle cx="12" cy="12" r="8" />
    <circle cx="12" cy="12" r="2.5" />
    <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
  </>
);
export const UserPlusIcon = strokeIcon(
  "UserPlusIcon",
  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 3a4 4 0 1 1 0 8 4 4 0 0 1 0-8ZM19 8v6M22 11h-6" />
);
/** New chat: speech bubble with a plus (original drawing). */
export const ChatPlusIcon = strokeIcon(
  "ChatPlusIcon",
  <path d="M20.5 11.5A8.5 7.5 0 1 1 12 4M7.4 18.4 5 21l.4-3.4M19 2v6M16 5h6" />
);
/** Gift box with a heart bow (original drawing). */
export const GiftBoxIcon = strokeIcon(
  "GiftBoxIcon",
  <path d="M4 10h16v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zM3 7.5h18V10H3zM12 7.5V21M12 7.5c-1.6-2.8-5-3.4-5-1.2 0 1.4 2.4 1.2 5 1.2Zm0 0c1.6-2.8 5-3.4 5-1.2 0 1.4-2.4 1.2-5 1.2Z" />
);
export const HeartIcon = strokeIcon(
  "HeartIcon",
  <path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7Z" />
);
export const BookmarkIcon = strokeIcon("BookmarkIcon", <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />);
export const MicIcon = strokeIcon(
  "MicIcon",
  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3ZM19 10v2a7 7 0 0 1-14 0v-2M12 19v3" />
);
export const SpeakerIcon = strokeIcon(
  "SpeakerIcon",
  <path d="M11 4.7a.7.7 0 0 0-1.2-.5L6.4 7.6A1.4 1.4 0 0 1 5.4 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.4a1.4 1.4 0 0 1 1 .4l3.4 3.4a.7.7 0 0 0 1.2-.5zM16 9a5 5 0 0 1 0 6M19.4 18.4a9 9 0 0 0 0-12.8" />
);
export const SparklesIcon = strokeIcon(
  "SparklesIcon",
  <path d="M9.9 15.5A2 2 0 0 0 8.5 14l-6.1-1.6a.5.5 0 0 1 0-1L8.5 9.9A2 2 0 0 0 9.9 8.5l1.6-6.1a.5.5 0 0 1 1 0L14 8.5A2 2 0 0 0 15.5 10l6.1 1.6a.5.5 0 0 1 0 1L15.5 14a2 2 0 0 0-1.4 1.4l-1.6 6.2a.5.5 0 0 1-1 0zM20 3v4M22 5h-4" />
);
export const PhoneOffIcon = strokeIcon(
  "PhoneOffIcon",
  <path d="M3.5 12.5c4.7-4.2 12.3-4.2 17 0 .5.5.6 1.3.2 1.8l-1.3 1.6a1.4 1.4 0 0 1-1.7.3l-2.3-1.1a1.4 1.4 0 0 1-.8-1.2l-.1-1.5a12 12 0 0 0-5 0l-.1 1.5a1.4 1.4 0 0 1-.8 1.2l-2.3 1.1a1.4 1.4 0 0 1-1.7-.3l-1.3-1.6c-.4-.5-.3-1.3.2-1.8Z" />
);
/** Circular arrow with a "5": skip back / forward five seconds (original drawing). */
export function SkipFiveIcon({ size = 24, forward = false, ...props }: IconProps & { forward?: boolean }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <g transform={forward ? "matrix(-1 0 0 1 24 0)" : undefined} stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 8.5A8.5 8.5 0 1 1 3.5 12" />
        <path d="M4 4v4.5h4.5" />
      </g>
      <text x="12" y="16" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="currentColor">5</text>
    </svg>
  );
}
export const CopyIcon = strokeIcon(
  "CopyIcon",
  <>
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
  </>
);
/** "Select text" — I-beams around a T (original drawing). */
export const TextSelectIcon = strokeIcon(
  "TextSelectIcon",
  <path d="M4 4v16M2.5 4h3M2.5 20h3M20 4v16M18.5 4h3M18.5 20h3M8.5 8h7M12 8v9" />
);
export const ReplyIcon = strokeIcon("ReplyIcon", <path d="m15 10 5 5-5 5M4 4v7a4 4 0 0 0 4 4h12" />);
export const ShareIcon = strokeIcon(
  "ShareIcon",
  <path d="M12 2v13M16 6l-4-4-4 4M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
);
export const MegaphoneIcon = strokeIcon(
  "MegaphoneIcon",
  <path d="m3 11 18-5v12L3 14v-3zM11.6 16.8a3 3 0 1 1-5.8-1.6" />
);
/** Bookmark tag pointing right (original drawing). */
export const BookmarkTagIcon = strokeIcon(
  "BookmarkTagIcon",
  <>
    <path d="M3 8a2 2 0 0 1 2-2h10l6 6-6 6H5a2 2 0 0 1-2-2z" />
    <circle cx="15" cy="12" r="1" />
  </>
);
export const CropIcon = strokeIcon("CropIcon", <path d="M6 2v14a2 2 0 0 0 2 2h14M18 22V8a2 2 0 0 0-2-2H2" />);
export const PencilIcon = strokeIcon(
  "PencilIcon",
  <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497zM3 22h18" />
);
export const TrashIcon = strokeIcon(
  "TrashIcon",
  <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2M10 11v6M14 11v6" />
);

/** "나" in a ring — 나에게 (chat with yourself). */
export function MeIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden={props["aria-label"] ? undefined : true}
      role={props["aria-label"] ? "img" : undefined}
      {...props}
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={2} />
      <text x="12" y="16.2" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="currentColor">
        나
      </text>
    </svg>
  );
}

/** Open chat room mark: a filled disc with a knocked-out speech bubble (original drawing). */
export function OpenChatIcon({ size = 16, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden={props["aria-label"] ? undefined : true}
      role={props["aria-label"] ? "img" : undefined}
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M12 1a11 11 0 1 0 0 22 11 11 0 0 0 0-22Zm0 5.2c-3.3 0-5.9 2.2-5.9 4.9 0 1.6.9 3 2.4 3.9l-.5 2.4 2.6-1.7c.5.1.9.1 1.4.1 3.3 0 5.9-2.2 5.9-4.9S15.3 6.2 12 6.2Z"
      />
    </svg>
  );
}

/** Default profile silhouette (filled, original drawing). */
export function SilhouetteIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <circle cx="12" cy="9.2" r="4.2" />
      <path d="M3.6 22c.6-4.6 4.1-7.4 8.4-7.4s7.8 2.8 8.4 7.4z" />
    </svg>
  );
}
