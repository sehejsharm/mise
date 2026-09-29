"use client";
/**
 * Five scattered places (binder, WhatsApp group, memory, camera roll, audit
 * prep week) physically collapse into one Mise card as you scroll. Desktop
 * with full motion only; elsewhere the same content renders as a static
 * before → after layout.
 */
import { useEffect, useRef } from "react";
import { LogoMark } from "@/components/site/Logo";
import { Icon, type IconName } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/primitives";
import { fivePlaces as c } from "@/content/home";
import { loadGsap, prefersReducedMotion, whenNear } from "@/lib/motion";

const SCATTER = [
  { left: "2%", top: "6%", rot: -7 },
  { left: "63%", top: "0%", rot: 6 },
  { left: "34%", top: "40%", rot: -3 },
  { left: "0%", top: "62%", rot: 5 },
  { left: "66%", top: "58%", rot: -6 },
];

export default function FivePlaces() {
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = stage.current;
    if (!el || prefersReducedMotion() || !matchMedia("(min-width: 768px)").matches) return;
    let kill: (() => void) | undefined;
    let cancelled = false;
    whenNear(el).then(() =>
      loadGsap().then(({ gsap }) => {
        if (cancelled) return;
        const cards = gsap.utils.toArray<HTMLElement>("[data-place]", el);
        const mise = el.querySelector<HTMLElement>("[data-mise]");
        const box = el.getBoundingClientRect();
        const tl = gsap.timeline({
          scrollTrigger: { trigger: el, start: "top 65%", end: "bottom 45%", scrub: 0.8 },
          defaults: { ease: "power2.inOut" },
        });
        cards.forEach((card, i) => {
          const r = card.getBoundingClientRect();
          const dx = box.left + box.width / 2 - (r.left + r.width / 2);
          const dy = box.top + box.height / 2 - (r.top + r.height / 2);
          tl.to(card, { x: dx, y: dy, rotate: 0, scale: 0.55, opacity: 0, duration: 1 }, i * 0.12);
        });
        if (mise) tl.fromTo(mise, { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8, ease: "expo.out" }, 0.75);
        kill = () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      }),
    );
    return () => {
      cancelled = true;
      kill?.();
    };
  }, []);

  return (
    <section aria-labelledby="places-title" className="relative overflow-hidden py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading id="places-title" eyebrow={c.eyebrow} title={c.title} align="center" />

        {/* Desktop, full motion: the collapse stage. */}
        <div ref={stage} className="relative mx-auto mt-14 hidden h-[460px] max-w-4xl motion-safe:md:block">
          {c.cards.map((card, i) => (
            <div
              key={card.place}
              data-place
              className="absolute w-[34%] rounded-2xl border border-line-strong bg-surface p-5 shadow-float"
              style={{ left: SCATTER[i].left, top: SCATTER[i].top, transform: `rotate(${SCATTER[i].rot}deg)` }}
            >
              <Icon name={card.icon as IconName} size={22} className="text-coral-ink" />
              <p className="mt-3 font-display text-[1.1rem] font-semibold text-ink">{card.place}</p>
              <p className="mt-1 text-[0.92rem] text-muted">{card.line}</p>
            </div>
          ))}
          <div data-mise className="absolute top-1/2 left-1/2 w-[44%] -translate-x-1/2 -translate-y-1/2">
            <MiseCard />
          </div>
        </div>

        {/* Mobile or reduced motion: static before → after. */}
        <div className="mt-12 motion-safe:md:hidden">
          <ul className="grid gap-3 sm:grid-cols-2">
            {c.cards.map((card) => (
              <li key={card.place} className="flex items-start gap-3 rounded-2xl border border-line bg-surface/60 p-4">
                <Icon name={card.icon as IconName} size={20} className="mt-0.5 text-coral-ink" />
                <div>
                  <p className="font-display text-[1.02rem] font-semibold text-ink">{card.place}</p>
                  <p className="text-[0.92rem] text-muted">{card.line}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="my-5 flex justify-center text-gold-ink" aria-hidden="true">
            <Icon name="arrowRight" size={22} className="rotate-90" />
          </div>
          <MiseCard />
        </div>
      </div>
    </section>
  );
}

function MiseCard() {
  return (
    <div className="rounded-2xl border border-gold/60 bg-[linear-gradient(160deg,rgb(212_169_79/0.2),rgb(212_169_79/0.04))] p-6 shadow-[0_30px_80px_-30px_rgb(212_169_79/0.5)]">
      <div className="flex items-center gap-3">
        <LogoMark size={34} />
        <p className="font-display text-[1.5rem] font-semibold text-ink">{c.mise.title}</p>
      </div>
      <p className="mt-3 text-[1.02rem] text-ink">{c.mise.line}</p>
    </div>
  );
}
