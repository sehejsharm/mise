"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Icon } from "@/components/ui/Icon";

type Item = { path: string; title: string; description: string; group: string; keywords: string };

/** Client-side search over /search-index.json. Used on /search and the 404 page. */
export default function SiteSearch({ autoFocus = false, compact = false }: { autoFocus?: boolean; compact?: boolean }) {
  const [items, setItems] = useState<Item[]>([]);
  const [q, setQ] = useState("");

  useEffect(() => {
    setQ(new URLSearchParams(location.search).get("q") ?? "");
    fetch("/search-index.json")
      .then((r) => r.json())
      .then(setItems)
      .catch(() => setItems([]));
  }, []);

  const results = useMemo(() => {
    const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) return [];
    return items
      .map((it) => {
        const hay = `${it.title} ${it.description} ${it.keywords}`.toLowerCase();
        const score = terms.reduce((s, t) => s + (it.title.toLowerCase().includes(t) ? 3 : 0) + (hay.includes(t) ? 1 : 0), 0);
        return { it, score, all: terms.every((t) => hay.includes(t)) };
      })
      .filter((r) => r.all)
      .sort((a, b) => b.score - a.score)
      .slice(0, compact ? 5 : 20)
      .map((r) => r.it);
  }, [q, items, compact]);

  return (
    <div>
      <form
        role="search"
        action="/search"
        onSubmit={(e) => {
          e.preventDefault();
          history.replaceState(null, "", `/search?q=${encodeURIComponent(q)}`);
        }}
        className="flex items-center gap-3 rounded-full border border-line-strong bg-surface px-5 focus-within:border-gold"
      >
        <Icon name="search" size={18} className="text-muted" />
        <label htmlFor="site-search" className="sr-only">
          Search misehotel.com
        </label>
        <input
          id="site-search"
          name="q"
          type="search"
          value={q}
          autoFocus={autoFocus}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search: service execution, audit readiness, housekeeping…"
          className="h-13 min-w-0 flex-1 bg-transparent text-[1rem] text-ink placeholder:text-faint focus:outline-none"
        />
      </form>
      {q && items.length ? (
        <div className="mt-6" aria-live="polite">
          {results.length ? (
            <ul className="divide-y divide-line rounded-2xl border border-line">
              {results.map((r) => (
                <li key={r.path}>
                  <Link href={r.path} className="block p-5 hover:bg-surface/60">
                    <span className="font-mono text-[0.7rem] tracking-[0.12em] text-gold-ink uppercase">{r.group}</span>
                    <span className="mt-1 block font-display text-[1.08rem] font-semibold text-ink">{r.title}</span>
                    <span className="mt-1 block text-[0.92rem] text-muted">{r.description}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted">No pages match “{q}”. Try “standards”, “audit” or “housekeeping”.</p>
          )}
        </div>
      ) : null}
    </div>
  );
}
