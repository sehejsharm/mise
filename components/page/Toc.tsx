"use client";
import { useEffect, useState } from "react";

/** Sticky table of contents with scroll-spy. */
export default function Toc({ headings, label = "On this page" }: { headings: { id: string; text: string }[]; label?: string }) {
  const [active, setActive] = useState(headings[0]?.id);
  useEffect(() => {
    const els = headings.map((h) => document.getElementById(h.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-90px 0px -65% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [headings]);
  if (headings.length < 2) return null;
  return (
    <nav aria-label={label} className="text-[0.88rem]">
      <p className="eyebrow !text-faint">{label}</p>
      <ol className="mt-4 space-y-1 border-l border-line">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              aria-current={active === h.id ? "location" : undefined}
              className={`-ml-px block border-l py-1.5 pl-4 leading-snug transition-colors ${
                active === h.id ? "border-gold text-ink" : "border-transparent text-muted hover:text-ink"
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
