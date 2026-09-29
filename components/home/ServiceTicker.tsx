"use client";
import { useState } from "react";
import { Icon } from "@/components/ui/Icon";

export type TickerItem = { time: string; where: string; what: string; tone: "green" | "cyan" | "gold" | "coral" };

const toneClass = { green: "bg-green", cyan: "bg-cyan", gold: "bg-gold", coral: "bg-coral" };

/** Auto-scrolling service record. Pausable (WCAG 2.2.2) and static under reduced motion. */
export default function ServiceTicker({ items, label }: { items: TickerItem[]; label: string }) {
  const [paused, setPaused] = useState(false);
  const rows = [...items, ...items];
  return (
    <div className={`relative ${paused ? "is-paused" : ""}`}>
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-2.5">
        <p className="font-mono text-[0.68rem] tracking-[0.16em] text-[#d4a94f] uppercase">Service record · live</p>
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
          aria-label={paused ? "Resume service record ticker" : "Pause service record ticker"}
          className="grid size-7 place-items-center rounded-full border border-white/15 text-[#b4bdd3] hover:border-[#d4a94f] hover:text-[#d4a94f]"
        >
          <Icon name={paused ? "play" : "pause"} size={12} />
        </button>
      </div>
      <div className="relative h-[168px] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,#000_18%,#000_82%,transparent)]">
        <ul className="animate-ticker [--ticker-duration:26s]" aria-label={label}>
          {rows.map((item, n) => (
            <li
              key={n}
              aria-hidden={n >= items.length ? true : undefined}
              className="flex items-center gap-3 px-4 py-2 font-mono text-[0.76rem] text-[#c9d0e2]"
            >
              <span className={`size-1.5 shrink-0 rounded-full ${toneClass[item.tone]}`} aria-hidden="true" />
              <span className="text-[#eef2fa] tabular-nums">{item.time}</span>
              <span className="text-[#8a94ad]">·</span>
              <span className="shrink-0">{item.where}</span>
              <span className="text-[#8a94ad]">·</span>
              <span className="truncate">{item.what}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
