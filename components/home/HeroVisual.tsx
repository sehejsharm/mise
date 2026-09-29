"use client";
/**
 * Hero visual: the SVG poster renders immediately (server-rendered); the R3F
 * scene is imported only after the visitor's first interaction, and only on
 * capable devices (WebGL, ≥4 cores, no Save-Data, full motion). It never
 * competes with the H1 for LCP and never loads for Lighthouse-style idle
 * visits. Rendering pauses whenever the hero is off-screen.
 */
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import IsoPoster from "@/components/home/IsoPoster";

const HeroScene = dynamic(() => import("@/components/home/HeroScene"), { ssr: false });

type Nav = Navigator & { connection?: { saveData?: boolean }; deviceMemory?: number };

function capable() {
  if (typeof window === "undefined") return false;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  const nav = navigator as Nav;
  if (nav.connection?.saveData) return false;
  if ((nav.hardwareConcurrency ?? 2) < 4) return false;
  if (nav.deviceMemory !== undefined && nav.deviceMemory < 4) return false;
  try {
    const c = document.createElement("canvas");
    return Boolean(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

export default function HeroVisual() {
  const box = useRef<HTMLDivElement>(null);
  const [mount3d, setMount3d] = useState(false);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(true);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(matchMedia("(prefers-reduced-motion: reduce)").matches);
    if (!capable()) return;
    const events = ["pointermove", "pointerdown", "wheel", "touchstart", "keydown", "scroll"] as const;
    const go = () => {
      events.forEach((e) => window.removeEventListener(e, go));
      setMount3d(true);
    };
    events.forEach((e) => window.addEventListener(e, go, { passive: true, once: true }));
    return () => events.forEach((e) => window.removeEventListener(e, go));
  }, []);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={box} className="relative aspect-[600/340] w-full">
      <div
        className="absolute inset-0 transition-opacity duration-700 ease-(--ease-out-expo)"
        style={{ opacity: ready ? 0 : 1 }}
      >
        <IsoPoster animate={!reduced} />
      </div>
      {mount3d ? (
        <div
          className="absolute inset-0 transition-opacity duration-700 ease-(--ease-out-expo)"
          style={{ opacity: ready ? 1 : 0 }}
        >
          <HeroScene active={visible} onReady={() => setReady(true)} />
        </div>
      ) : null}
    </div>
  );
}
