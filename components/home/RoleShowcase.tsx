"use client";
/**
 * Three role interfaces as a tabbed device showcase using the real prototype
 * screenshots. Frames swap with a 3D tilt and parallax (Framer Motion, lazily
 * loaded features). Tabs auto-advance until the visitor interacts, and never
 * under reduced motion. Keyboard: arrow keys move between tabs.
 */
import { AnimatePresence, LazyMotion, m } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { LaptopFrame, PhoneFrame } from "@/components/ui/DeviceFrame";
import { Picture } from "@/components/ui/Picture";
import { ArrowLink, SectionHeading } from "@/components/ui/primitives";
import type { RoleInterface } from "@/content/platform";

const loadFeatures = () => import("@/lib/framer-features").then((mod) => mod.default);

export default function RoleShowcase({ roles }: { roles: RoleInterface[] }) {
  const [index, setIndex] = useState(0);
  const [auto, setAuto] = useState(true);
  const [inView, setInView] = useState(false);
  const [hovered, setHovered] = useState(false);
  const root = useRef<HTMLElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) setAuto(false);
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!auto || !inView || hovered) return;
    const id = setTimeout(() => setIndex((i) => (i + 1) % roles.length), 7000);
    return () => clearTimeout(id);
  }, [auto, inView, hovered, index, roles.length]);

  const choose = (i: number) => {
    setAuto(false);
    setIndex(i);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (index + (e.key === "ArrowRight" ? 1 : roles.length - 1)) % roles.length;
    choose(next);
    tabs.current[next]?.focus();
  };

  const role = roles[index];
  const screen = role.screens[0];

  return (
    <section
      ref={root}
      aria-labelledby="roles-title"
      className="relative py-20 sm:py-28"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="container-page">
        <SectionHeading
          id="roles-title"
          eyebrow="Three interfaces, one record"
          title="A hotel staff app, manager dashboard and standards workspace"
        />

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <div role="tablist" aria-label="Mise role interfaces" className="inline-flex rounded-full border border-line-strong bg-surface/60 p-1" onKeyDown={onKey}>
            {roles.map((r, i) => (
              <button
                key={r.id}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                role="tab"
                id={`role-tab-${r.id}`}
                aria-selected={i === index}
                aria-controls={`role-panel-${r.id}`}
                tabIndex={i === index ? 0 : -1}
                onClick={() => choose(i)}
                className={`relative rounded-full px-5 py-2.5 text-[0.93rem] font-medium transition-colors ${i === index ? "text-on-gold" : "text-muted hover:text-ink"}`}
              >
                {i === index ? <span aria-hidden="true" className="absolute inset-0 rounded-full bg-gold" /> : null}
                <span className="relative">{r.name}</span>
              </button>
            ))}
          </div>
          {auto ? (
            <button
              type="button"
              onClick={() => setAuto(false)}
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-[0.82rem] text-faint hover:text-ink"
            >
              <Icon name="pause" size={12} /> Stop auto-advance
            </button>
          ) : null}
        </div>

        <LazyMotion features={loadFeatures} strict>
          <div
            role="tabpanel"
            id={`role-panel-${role.id}`}
            aria-labelledby={`role-tab-${role.id}`}
            className="mt-10 grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]"
          >
            <div>
              <p className="font-mono text-[0.72rem] tracking-[0.14em] text-cyan-ink uppercase">{role.posture}</p>
              <h3 className="mt-3 font-display text-[clamp(1.5rem,2.6vw,2rem)] leading-tight font-semibold text-ink">{role.keyword}</h3>
              <p className="mt-3 text-[1.05rem] leading-relaxed text-muted">{role.summary}</p>
              <div className="mt-6">
                <ArrowLink href={`/platform#${role.id}`}>Explore the {role.keyword.toLowerCase()}</ArrowLink>
              </div>
            </div>
            <div className="relative [perspective:1600px]">
              <div aria-hidden="true" className="absolute inset-[10%] rounded-full bg-[radial-gradient(circle,rgb(56_225_255/0.14),transparent_65%)] blur-2xl" />
              <AnimatePresence mode="wait" initial={false}>
                <m.div
                  key={role.id}
                  initial={{ opacity: 0, rotateY: -14, x: 50 }}
                  animate={{ opacity: 1, rotateY: 0, x: 0 }}
                  exit={{ opacity: 0, rotateY: 14, x: -50 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="relative flex justify-center"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {role.device === "phone" ? (
                    <PhoneFrame className="w-[min(300px,78vw)]">
                      <Picture image={screen.image} alt={screen.alt} sizes="300px" />
                    </PhoneFrame>
                  ) : (
                    <LaptopFrame className="w-full max-w-[640px]">
                      <Picture image={screen.image} alt={screen.alt} sizes="(min-width: 1024px) 640px, 92vw" />
                    </LaptopFrame>
                  )}
                </m.div>
              </AnimatePresence>
            </div>
          </div>
        </LazyMotion>

        <div className="mt-8 flex gap-1.5" aria-hidden="true">
          {roles.map((r, i) => (
            <span key={r.id} className="h-0.5 flex-1 overflow-hidden rounded-full bg-line">
              <span
                className="block h-full origin-left bg-gold"
                style={{
                  transform: `scaleX(${i < index ? 1 : i === index ? (auto && inView && !hovered ? 1 : 0.15) : 0})`,
                  transition: i === index && auto && inView && !hovered ? "transform 7s linear" : "transform 300ms",
                }}
              />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
