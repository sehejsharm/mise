"use client";
/**
 * One loop, four moves. On desktop with full motion the section pins (CSS
 * sticky, so nothing jumps when GSAP arrives) and GSAP ScrollTrigger scrubs
 * the phone through Standard → Timed task → Evidence → Service record.
 * On mobile and under reduced motion it becomes a simple stepped list with
 * no pinning and no scroll-jacking.
 */
import { useEffect, useRef, useState } from "react";
import LoopPhone from "@/components/home/LoopPhone";
import { PhoneFrame } from "@/components/ui/DeviceFrame";
import { ArrowLink, SectionHeading } from "@/components/ui/primitives";
import { loopSteps } from "@/content/platform";
import { loadGsap, whenNear } from "@/lib/motion";

export default function HowItWorksPinned() {
  const track = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const mq = matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    const update = () => setPinned(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Desktop: scrub with ScrollTrigger once the section is near.
  useEffect(() => {
    if (!pinned || !track.current) return;
    let kill: (() => void) | undefined;
    let cancelled = false;
    whenNear(track.current).then(() =>
      loadGsap().then(({ ScrollTrigger }) => {
        if (cancelled || !track.current) return;
        const st = ScrollTrigger.create({
          trigger: track.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          onUpdate: (self) => setStep(Math.min(3, Math.floor(self.progress * 4 * 0.999))),
        });
        kill = () => st.kill();
      }),
    );
    return () => {
      cancelled = true;
      kill?.();
    };
  }, [pinned]);

  // Mobile / reduced motion: activate the step whose card is in view.
  useEffect(() => {
    if (pinned) return;
    const cards = document.querySelectorAll<HTMLElement>("[data-loop-card]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setStep(Number(e.target.getAttribute("data-loop-card")));
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, [pinned]);

  return (
    <section id="how-it-works" aria-labelledby="loop-title" className="relative">
      <div ref={track} className={pinned ? "relative h-[420vh]" : "relative py-20 sm:py-28"}>
        <div className={pinned ? "sticky top-0 flex h-dvh items-center overflow-hidden" : ""}>
          <div className="container-page grid w-full items-center gap-12 lg:grid-cols-[1fr_auto] lg:gap-20">
            <div>
              <SectionHeading
                id="loop-title"
                eyebrow="One loop, four moves"
                title="How Mise turns hotel SOPs into audit-ready records"
              />
              <ol className="mt-10 space-y-3">
                {loopSteps.map((s, i) => {
                  const active = step === i;
                  return (
                    <li
                      key={s.id}
                      data-loop-card={i}
                      className={`relative rounded-2xl border p-5 transition-[border-color,background,opacity] duration-500 ${
                        active ? "border-gold/50 bg-gold-soft" : "border-line bg-surface/40 opacity-70"
                      }`}
                    >
                      <div className="flex items-baseline gap-4">
                        <span className={`font-mono text-[0.78rem] ${active ? "text-gold-ink" : "text-faint"}`}>{s.n}</span>
                        <div>
                          <h3 className="font-display text-[1.2rem] font-semibold text-ink">{s.name}</h3>
                          <p className="mt-1 text-[0.98rem] text-muted">{s.line}</p>
                        </div>
                      </div>
                      {!pinned ? (
                        <div className="mt-5 flex h-[440px] justify-center overflow-hidden lg:hidden">
                          <PhoneFrame className="origin-top scale-[0.8]">
                            <LoopPhone step={i} />
                          </PhoneFrame>
                        </div>
                      ) : null}
                    </li>
                  );
                })}
              </ol>
              <div className="mt-8">
                <ArrowLink href="/how-it-works">How Mise hotel SOP management software works</ArrowLink>
              </div>
            </div>
            <div className="hidden justify-center lg:flex">
              <div className="relative">
                <div aria-hidden="true" className="absolute -inset-10 rounded-full bg-[radial-gradient(circle,rgb(212_169_79/0.18),transparent_65%)]" />
                <PhoneFrame className="relative">
                  <LoopPhone step={step} />
                </PhoneFrame>
                <div className="mt-5 flex justify-center gap-2" aria-hidden="true">
                  {loopSteps.map((s, i) => (
                    <span key={s.id} className={`h-1 rounded-full transition-all duration-500 ${step === i ? "w-8 bg-gold" : "w-3 bg-line-strong"}`} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
