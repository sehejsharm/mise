"use client";
/** Category filter with animated layout (Framer Motion, lazily loaded features). */
import { AnimatePresence, LazyMotion, m } from "framer-motion";
import { useState } from "react";
import { PostCard } from "@/components/blog/PostCard";
import type { PostMeta } from "@/lib/blog";

const loadFeatures = () => import("framer-motion").then((mod) => mod.domMax);

export default function BlogFilter({ posts, categories }: { posts: PostMeta[]; categories: { slug: string; name: string }[] }) {
  const [active, setActive] = useState<string>("all");
  const used = categories.filter((c) => posts.some((p) => p.category.slug === c.slug));
  const shown = active === "all" ? posts : posts.filter((p) => p.category.slug === active);
  return (
    <LazyMotion features={loadFeatures}>
      <div role="group" aria-label="Filter articles by category" className="flex flex-wrap gap-2">
        {[{ slug: "all", name: "All" }, ...used].map((c) => (
          <button
            key={c.slug}
            type="button"
            aria-pressed={active === c.slug}
            onClick={() => setActive(c.slug)}
            className={`relative rounded-full px-4 py-2 text-[0.9rem] transition-colors ${active === c.slug ? "text-on-gold" : "border border-line-strong text-muted hover:text-ink"}`}
          >
            {active === c.slug ? <m.span layoutId="blog-chip" className="absolute inset-0 rounded-full bg-gold" transition={{ type: "spring", stiffness: 380, damping: 32 }} /> : null}
            <span className="relative">{c.name}</span>
          </button>
        ))}
      </div>
      <m.ul layout className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {shown.map((p) => (
            <m.li
              key={p.slug}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <PostCard post={p} headingLevel={2} />
            </m.li>
          ))}
        </AnimatePresence>
      </m.ul>
    </LazyMotion>
  );
}
