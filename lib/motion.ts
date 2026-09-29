"use client";
/**
 * Lazy loaders for the motion libraries, so none of them sit in the initial
 * bundle. GSAP + ScrollTrigger arrive when the first choreographed section
 * approaches the viewport; Lenis arrives on idle (desktop, full motion only).
 */
import type { ScrollTrigger as ScrollTriggerType } from "gsap/ScrollTrigger";

type GsapBundle = { gsap: typeof import("gsap").gsap; ScrollTrigger: typeof ScrollTriggerType };

let gsapPromise: Promise<GsapBundle> | null = null;

export function loadGsap(): Promise<GsapBundle> {
  if (!gsapPromise) {
    gsapPromise = Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([g, st]) => {
      const gsap = g.gsap;
      const ScrollTrigger = st.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);
      gsap.defaults({ ease: "expo.out", duration: 0.7 });
      const lenis = (window as unknown as { __lenis?: { on: (e: string, cb: () => void) => void } }).__lenis;
      lenis?.on("scroll", ScrollTrigger.update);
      return { gsap, ScrollTrigger };
    });
  }
  return gsapPromise;
}

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function finePointer() {
  return typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches;
}

export function onIdle(cb: () => void, timeout = 2000) {
  const w = window as unknown as { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
  if (w.requestIdleCallback) w.requestIdleCallback(cb, { timeout });
  else setTimeout(cb, 400);
}

/** Resolves when `el` is within `margin` of the viewport. */
export function whenNear(el: Element, margin = "600px"): Promise<void> {
  return new Promise((resolve) => {
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          resolve();
        }
      },
      { rootMargin: `${margin} 0px ${margin} 0px` },
    );
    io.observe(el);
  });
}
