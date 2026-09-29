"use client";
/**
 * Site-wide, low-cost enhancements mounted once in the root layout:
 *  - GA4 click tracking via data attributes (demo CTAs, outbound, mailto, tel)
 *  - Lenis smooth scroll (lazy, idle, fine pointer, full motion only)
 *  - a subtle cursor spotlight on desktop
 */
import { useEffect, useRef } from "react";
import { track } from "@/lib/analytics";
import { finePointer, onIdle, prefersReducedMotion } from "@/lib/motion";

export default function Enhancements() {
  const spot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const el = (event.target as Element | null)?.closest?.("a, button");
      if (!el) return;
      const tracked = el.getAttribute("data-track");
      if (tracked === "demo_cta_click") {
        track("demo_cta_click", { location: el.getAttribute("data-track-location") ?? "unknown" });
        return;
      }
      if (el instanceof HTMLAnchorElement) {
        const href = el.getAttribute("href") ?? "";
        if (href.startsWith("mailto:")) track("contact_email_click", { location: el.dataset.trackLocation });
        else if (href.startsWith("tel:")) track("phone_click", { location: el.dataset.trackLocation });
        else if (/^https?:/.test(href)) {
          try {
            if (new URL(href).host !== location.host) track("outbound_click", { url: href });
          } catch {
            /* ignore malformed */
          }
        } else if (href.startsWith("/demo")) {
          track("demo_cta_click", { location: el.getAttribute("data-track-location") ?? "inline-link" });
        }
      }
    };
    document.addEventListener("click", onClick, { capture: true });

    let raf = 0;
    let destroyLenis: (() => void) | undefined;
    const fine = finePointer();
    const reduce = prefersReducedMotion();

    if (fine && !reduce) {
      onIdle(() => {
        import("lenis").then(({ default: Lenis }) => {
          const lenis = new Lenis({ lerp: 0.11, anchors: { offset: -88 }, autoRaf: true });
          (window as unknown as { __lenis?: unknown }).__lenis = lenis;
          destroyLenis = () => lenis.destroy();
        });
      }, 3000);
    }

    let onMove: ((e: PointerEvent) => void) | undefined;
    if (fine && !reduce && spot.current) {
      const node = spot.current;
      let x = 0;
      let y = 0;
      onMove = (e: PointerEvent) => {
        x = e.clientX;
        y = e.clientY;
        if (!raf) {
          raf = requestAnimationFrame(() => {
            node.style.setProperty("--x", `${x}px`);
            node.style.setProperty("--y", `${y}px`);
            node.style.opacity = "1";
            raf = 0;
          });
        }
      };
      window.addEventListener("pointermove", onMove, { passive: true });
    }

    return () => {
      document.removeEventListener("click", onClick, { capture: true });
      if (onMove) window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
      destroyLenis?.();
    };
  }, []);

  return (
    <div
      ref={spot}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1] opacity-0 transition-opacity duration-700"
      style={{
        background:
          "radial-gradient(520px circle at var(--x, 50%) var(--y, 50%), rgb(229 179 90 / 0.07), transparent 45%)",
      }}
    />
  );
}
