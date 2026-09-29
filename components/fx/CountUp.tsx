"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Rolls a number up when it scrolls into view. The final value is server
 * rendered, so crawlers and no-JS readers always see the real figure.
 */
export default function CountUp({
  value,
  decimals = 0,
  suffix = "",
  prefix = "",
  duration = 1400,
  className,
  proportional = false,
}: {
  value: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
  /** Large standalone figures use proportional digits; columns use tabular. */
  proportional?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    // Start from zero only if the number is not already on screen.
    if (el.getBoundingClientRect().top > window.innerHeight) setDisplay(0);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 4);
          setDisplay(value * eased);
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        setDisplay(0);
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, duration]);

  const shown = display === null ? value : display;
  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: proportional ? "normal" : "tabular-nums" }}>
      {prefix}
      {shown.toLocaleString("en-IN", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  );
}
