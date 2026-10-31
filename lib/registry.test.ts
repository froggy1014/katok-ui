import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { SITE_URL } from "./brand";
import registry from "../registry.json";

const ROOT = join(__dirname, "..");
const KAKAO = "components/ui/kakao/";
const CORE_FILES = new Set([`${KAKAO}icons.tsx`, `${KAKAO}styles/kakao.css`]);
const items = registry.items;
const byName = new Map(items.map((i) => [i.name, i]));
const read = (p: string) => readFileSync(join(ROOT, p), "utf-8");

/** Item names reachable through `registryDependencies` URLs (transitively). */
function closure(name: string, seen = new Set<string>()): Set<string> {
  for (const dep of byName.get(name)?.registryDependencies ?? []) {
    const m = dep.match(/\/r\/([a-z-]+)\.json$/);
    if (m && !seen.has(m[1])) {
      seen.add(m[1]);
      closure(m[1], seen);
    }
  }
  return seen;
}

describe("registry.json", () => {
  it("lists files that exist", () => {
    for (const item of items) for (const f of item.files) expect(existsSync(join(ROOT, f.path)), f.path).toBe(true);
  });

  it("points registry URLs at this site and at items that exist", () => {
    for (const item of items)
      for (const dep of item.registryDependencies ?? []) {
        if (!dep.startsWith("http")) continue;
        expect(dep.startsWith(`${SITE_URL}/r/`), dep).toBe(true);
        expect(byName.has(dep.match(/\/r\/([a-z-]+)\.json$/)![1]), dep).toBe(true);
      }
  });

  it("ships icons and tokens only through kakao-core", () => {
    for (const item of items) {
      if (item.name === "kakao-core") continue;
      expect(item.files.filter((f) => CORE_FILES.has(f.path)), item.name).toEqual([]);
      expect(closure(item.name).has("kakao-core"), `${item.name} → kakao-core`).toBe(true);
    }
  });

  it("covers every sibling a component imports", () => {
    for (const item of items) {
      const provided = new Set([...item.files.map((f) => f.path), ...[...closure(item.name)].flatMap((n) => byName.get(n)!.files.map((f) => f.path))]);
      for (const f of item.files.filter((f) => f.path.endsWith(".tsx"))) {
        for (const [, sibling] of read(f.path).matchAll(/from "\.\/([a-z-]+)"/g)) {
          expect(provided.has(`${KAKAO}${sibling}.tsx`), `${item.name} imports ./${sibling}`).toBe(true);
        }
      }
    }
  });
});

describe("components", () => {
  // Hooks or handlers defined inside a component break server rendering unless
  // the file is a client module (this shipped once and failed the deploy).
  const CLIENT_ONLY = /\bReact\.use(State|Effect|LayoutEffect|Ref|Reducer|SyncExternalStore|ImperativeHandle)\b|\son[A-Z]\w*=\{\s*(\([^)]*\)|\w+)\s*=>/;

  it('marks files with hooks or inline handlers "use client"', () => {
    for (const item of items)
      for (const f of item.files.filter((f) => f.path.endsWith(".tsx"))) {
        const src = read(f.path);
        if (CLIENT_ONLY.test(src)) expect(src.startsWith('"use client";'), f.path).toBe(true);
      }
  });
});
