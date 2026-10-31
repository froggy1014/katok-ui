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
