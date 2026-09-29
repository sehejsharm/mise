"use client";
import { useState, type ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";

/** Wraps a CSS marquee with a pause control (WCAG 2.2.2 Pause, Stop, Hide). */
export default function PauseMotion({ children, className, label }: { children: ReactNode; className?: string; label: string }) {
  const [paused, setPaused] = useState(false);
  return (
    <div className={`group/pm ${className ?? ""} ${paused ? "is-paused" : ""}`}>
      {children}
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-pressed={paused}
        aria-label={paused ? `Resume scrolling ${label}` : `Pause scrolling ${label}`}
        className="absolute top-1/2 right-0 grid size-8 -translate-y-1/2 place-items-center rounded-full border border-line-strong bg-bg text-muted opacity-0 transition-opacity group-hover/pm:opacity-100 focus-visible:opacity-100 hover:text-gold-ink"
      >
        <Icon name={paused ? "play" : "pause"} size={13} />
      </button>
    </div>
  );
}
