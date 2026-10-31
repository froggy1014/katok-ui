import * as React from "react";
import { cn } from "@/lib/utils";
import "@/components/ui/kakao/styles/kakao.css";

/** An inline `@이름` in a bubble or the input, in KakaoTalk's mention blue. */
const Mention = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, children, ...props }, ref) => (
    <span ref={ref} className={cn("text-kk-mention", className)} {...props}>
      @{children}
    </span>
  )
);
Mention.displayName = "Mention";

/**
 * Splits plain text into text and `<Mention>` nodes for the given names, so
 * "@김민지 내일 봐" renders with the name in blue. Longest names match first.
 */
function withMentions(text: string, names: string[]): React.ReactNode[] {
  if (!names.length) return [text];
  const escaped = [...names].sort((a, b) => b.length - a.length).map((n) => n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const parts = text.split(new RegExp(`@(${escaped.join("|")})`, "g"));
  // split() with one capture group alternates: text, name, text, name, …
  return parts.map((p, i) => (i % 2 ? <Mention key={i}>{p}</Mention> : p)).filter((p) => p !== "");
}

export { Mention, withMentions };
