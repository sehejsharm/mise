"use client";
import { useEffect, useRef, useState } from "react";
import { track } from "@/lib/analytics";

/** Reading progress for the article body; fires blog_read_75 once. */
export default function ReadingProgress({ targetId, slug }: { targetId: string; slug: string }) {
  const [p, setP] = useState(0);
  const fired = useRef(false);
  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight * 0.6;
      const progress = Math.min(1, Math.max(0, (window.innerHeight * 0.4 - r.top) / Math.max(1, total)));
      setP(progress);
      if (progress >= 0.75 && !fired.current) {
        fired.current = true;
        track("blog_read_75", { slug });
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [targetId, slug]);
  return (
    <div className="flex items-center gap-3" aria-hidden="true">
      <div className="h-1 flex-1 overflow-hidden rounded-full bg-line">
        <div className="h-full origin-left rounded-full bg-gold" style={{ transform: `scaleX(${p})` }} />
      </div>
      <span className="w-9 text-right font-mono text-[0.72rem] text-faint tabular-nums">{Math.round(p * 100)}%</span>
    </div>
  );
}
