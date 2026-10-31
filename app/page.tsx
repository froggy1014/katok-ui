import { getRegistryItems } from "@/lib/registry";
import { LOGO_PATH, LOGO_VIEWBOX, REPO_URL, SITE_URL } from "@/lib/brand";
import { CopyButton } from "@/components/copy-button";
import { ComponentPreview } from "@/components/component-preview";
import { HeroChat } from "@/components/hero-chat";
import { ThemeToggle } from "@/components/theme-toggle";

const STORYBOOK_URL = `${SITE_URL}/storybook`;

const CATEGORY_ORDER = [
  {
    label: "Chat",
    names: [
      "chat-bubble",
      "message-group",
      "profile-avatar",
      "chat-header",
      "message-input",
      "date-separator",
      "system-message",
      "chat-list-item",
      "mention",
      "sticker-message",
      "media-bubble",
      "bot-message",
      "message-reactions",
      "message-actions",
      "bottom-sheet",
      "share-sheet",
      "reaction-picker",
      "attachment-sheet",
      "voice-recorder",
      "notice-banner",
      "capture-mode",
      "action-sheet",
      "location-picker",
      "chat-room",
    ],
  },
  { label: "Tabs & Lists", names: ["tab-bar", "filter-chips", "promo-banner", "friend-list"] },
  {
    label: "Profile, Feed & Calls",
    names: ["profile-view", "feed-post", "call-screen", "call-transcript", "shortform-view", "community-post"],
  },
  { label: "Biz Message", names: ["alimtalk-bubble", "brand-message-bubble", "biz-button"] },
];

const GITHUB_ICON =
  "M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z";

const pill =
  "inline-flex min-h-11 items-center gap-2 rounded-full bg-page-code-bg border border-page-border px-4 py-2 text-sm text-page-subtle hover:text-page-fg hover:border-page-muted active:scale-[0.98] transition-[color,border-color,transform] duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-page-fg";

export default function Home() {
  const items = getRegistryItems();
  const itemMap = new Map(items.map((i) => [i.name, i]));
  const quickInstall = `npx shadcn@latest add ${SITE_URL}/r/alimtalk-bubble.json`;

  return (
    <div className="min-h-screen bg-page-bg text-page-fg">
      <nav className="sticky top-0 z-50 border-b border-page-border bg-page-bg/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-page-highlight">
              <svg viewBox={LOGO_VIEWBOX} width="18" height="18" fill="#191919" aria-hidden>
                <path fillRule="evenodd" d={LOGO_PATH} />
              </svg>
            </div>
            <span className="text-sm font-semibold">Katok UI</span>
            <span className="rounded-full border border-page-border px-2 py-0.5 text-[10px] text-page-muted">unofficial</span>
          </div>
          <div className="flex items-center gap-3">
            <a href={REPO_URL} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-page-muted transition-colors hover:text-page-fg">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d={GITHUB_ICON} /></svg>
            </a>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <header className="relative overflow-hidden border-b border-page-border">
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 left-1/2 h-[340px] w-[680px] max-w-[150vw] -translate-x-1/2 rounded-full bg-page-highlight/15 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-6xl px-6 pb-10 pt-12 sm:pb-12 sm:pt-16">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:gap-12">
            <div className="min-w-0 flex-1">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-page-border bg-page-accent-soft px-3 py-1 text-xs font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-page-highlight" />
                shadcn/ui registry · {items.length} components
              </div>

              <h1 className="mb-5 text-4xl font-bold tracking-tight sm:text-5xl">
                KakaoTalk UI, <span className="bg-page-highlight px-1.5 text-[#191919]">copy-paste</span> ready.
              </h1>

              <p className="mb-2 max-w-lg text-base text-page-subtle sm:text-lg">
                Chat bubbles, chat list, message input — and the first open-source{" "}
                <strong className="text-page-fg">AlimTalk · Brand Message preview</strong> components.
              </p>
              <p className="mb-8 max-w-lg text-sm text-page-muted">
                Modeled on KakaoTalk iOS. Biz Message props mirror the API fields (messageType, emphasizeType, button codes),
                so you can pass your template JSON straight in. Light and dark mode included.
              </p>

              <div className="mb-6">
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-page-muted">Quick install</p>
                <div className="flex max-w-lg items-center gap-2 rounded-xl border border-page-border bg-page-code-bg px-4 py-3 shadow-sm">
                  <code className="flex-1 truncate font-mono text-sm">{quickInstall}</code>
                  <CopyButton text={quickInstall} />
                </div>
                <p className="mt-2 text-xs text-page-muted">Each component installs independently.</p>
              </div>

              <div className="flex flex-wrap gap-3">
                <a href={REPO_URL} target="_blank" rel="noopener noreferrer" className={pill}>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d={GITHUB_ICON} /></svg>
                  GitHub
                </a>
                <a href={STORYBOOK_URL} className={pill}>Storybook</a>
                <a href={`${SITE_URL}/r/registry.json`} className={pill}>registry.json</a>
              </div>
            </div>

            <div className="hidden h-[600px] w-[380px] flex-shrink-0 overflow-hidden rounded-[36px] border-[8px] border-neutral-900 shadow-2xl shadow-black/30 lg:block">
              <HeroChat />
            </div>
          </div>
        </div>
      </header>

      <section className="border-b border-page-border lg:hidden">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-page-muted">Live Demo</h2>
          <div className="h-[560px] overflow-hidden rounded-2xl border border-page-border shadow-xl">
            <HeroChat />
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-12">
          <h2 className="mb-2 text-2xl font-bold">Components</h2>
          <p className="text-page-subtle">
            {items.length} components. Each installs with <code className="font-mono text-sm">npx shadcn add</code>.
          </p>
        </div>

        {CATEGORY_ORDER.map((category) => (
          <section key={category.label} className="mb-14">
            <h3 className="mb-5 flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-page-muted">
              <span className="h-px flex-1 bg-page-border" />
              {category.label}
              <span className="h-px flex-1 bg-page-border" />
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {category.names.map((name) => {
                const item = itemMap.get(name);
                if (!item) return null;
                const installCmd = `npx shadcn@latest add ${SITE_URL}/r/${item.name}.json`;
                return (
                  <div
                    key={item.name}
                    className="group flex flex-col overflow-hidden rounded-xl border border-page-border bg-page-card transition-[border-color,background-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:bg-page-card-hover hover:shadow-lg hover:shadow-black/5"
                  >
                    <div className="flex-1 border-b border-page-border">
                      <ComponentPreview name={item.name} />
                    </div>
                    <div className="mt-auto space-y-2 p-4 pb-3">
                      <div>
                        <span className="mb-1 block text-sm font-semibold text-page-fg">{item.title}</span>
                        <p className="line-clamp-2 text-[11px] text-page-subtle">{item.description}</p>
                      </div>
                      <div className="flex items-center gap-1.5 rounded-md border border-page-border bg-page-code-bg px-2.5 py-1.5">
                        <code className="flex-1 truncate font-mono text-[10px] text-page-muted">{installCmd}</code>
                        <CopyButton text={installCmd} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </main>

      <footer className="border-t border-page-border py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-xs text-page-muted sm:flex-row">
          <p>
            MIT License. Unofficial — not affiliated with or endorsed by Kakao Corp. Built by{" "}
            <a href="https://github.com/froggy1014" target="_blank" rel="noopener noreferrer" className="text-page-subtle hover:text-page-fg">
              @froggy1014
            </a>
          </p>
          <div className="flex items-center gap-4">
            <a href={REPO_URL} target="_blank" rel="noopener noreferrer" className="hover:text-page-fg">GitHub</a>
            <a href={`${REPO_URL}/blob/main/DESIGN.md`} target="_blank" rel="noopener noreferrer" className="hover:text-page-fg">Design tokens</a>
            <a href={`${REPO_URL}/blob/main/CONTRIBUTING.md`} target="_blank" rel="noopener noreferrer" className="hover:text-page-fg">Contributing</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
