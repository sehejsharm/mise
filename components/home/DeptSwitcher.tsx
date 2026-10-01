"use client";
/**
 * Department switcher shared by the homepage demos. With full motion it is a
 * row of pills that auto-advances while the section is on screen, pausing on
 * hover or focus and stopping for good once the visitor picks one. Under
 * prefers-reduced-motion nothing rotates: it renders a static grid of every
 * department, each one selectable.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { departments } from "@/content/departments";

export function useDepartmentRotation(intervalMs = 4200) {
  const [index, setIndex] = useState(0);
  const [reduced, setReduced] = useState(false);
  const [paused, setPaused] = useState(false);
  const [stopped, setStopped] = useState(false);
  const [onScreen, setOnScreen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setReduced(matchMedia("(prefers-reduced-motion: reduce)").matches);
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduced || paused || stopped || !onScreen) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % departments.length), intervalMs);
    return () => clearInterval(id);
  }, [reduced, paused, stopped, onScreen, intervalMs]);

  const select = useCallback((i: number) => {
    setIndex(i);
    setStopped(true);
  }, []);

  return {
    ref,
    index,
    dept: departments[index],
    reduced,
    rotating: !reduced && !stopped,
    select,
    pauseProps: {
      onMouseEnter: () => setPaused(true),
      onMouseLeave: () => setPaused(false),
      onFocus: () => setPaused(true),
      onBlur: () => setPaused(false),
    },
  };
}

export default function DeptSwitcher({
  index,
  select,
  reduced,
  rotating,
  label,
  tone = "dark",
  className = "",
}: {
  index: number;
  select: (i: number) => void;
  reduced: boolean;
  rotating: boolean;
  label: string;
  /** "dark" for the always-dark mockups, "theme" for themed sections. */
  tone?: "dark" | "theme";
  className?: string;
}) {
  const t =
    tone === "dark"
      ? { on: "bg-[#e5b35a] text-[#0c2329]", off: "border border-white/15 text-[#b9c7c3] hover:text-[#f2f4ee]", meta: "text-[#a0b0ac]" }
      : { on: "bg-gold text-on-gold", off: "border border-line-strong text-muted hover:text-ink", meta: "text-faint" };

  if (reduced) {
    return (
      <div role="group" aria-label={label} className={`grid grid-cols-2 gap-1.5 sm:grid-cols-4 lg:grid-cols-7 ${className}`}>
        {departments.map((d, i) => (
          <button
            key={d.id}
            type="button"
            aria-pressed={index === i}
            onClick={() => select(i)}
            className={`rounded-lg px-2.5 py-2 text-left text-[0.72rem] leading-tight ${index === i ? t.on : t.off}`}
          >
            <span className="block font-medium">{d.label}</span>
            <span className={`mt-0.5 block font-mono text-[0.62rem] ${index === i ? "" : t.meta}`}>{d.standardId}</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div role="group" aria-label={label} className={`flex flex-wrap gap-1.5 ${className}`}>
      {departments.map((d, i) => (
        <button
          key={d.id}
          type="button"
          aria-pressed={index === i}
          onClick={() => select(i)}
          className={`relative overflow-hidden rounded-full px-3 py-1 font-mono text-[0.66rem] tracking-wide transition-colors ${index === i ? t.on : t.off}`}
        >
          {d.label}
          {rotating && index === i ? (
            <span aria-hidden="true" key={`p-${i}`} className="dept-progress absolute inset-x-0 bottom-0 h-[2px] origin-left bg-current opacity-40" />
          ) : null}
        </button>
      ))}
    </div>
  );
}
