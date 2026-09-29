"use client";
/**
 * The six pains as a snowball chain. Each node opens a one-line wound and a
 * descriptive link to its problem page. On scroll, a snowball rolls through
 * the chain and grows (GSAP ScrollTrigger scrub). Vertical on mobile; static
 * under reduced motion.
 */
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/primitives";
import { track } from "@/lib/analytics";
import { loadGsap, prefersReducedMotion, whenNear } from "@/lib/motion";

export type ChainPain = { slug: string; index: string; name: string; wound: string };

const H_POINTS = [
  [90, 120],
  [290, 70],
  [490, 150],
  [690, 80],
  [890, 150],
  [1090, 100],
] as const;

function hPath() {
  const p = H_POINTS;
  let d = `M${p[0][0]},${p[0][1]}`;
  for (let i = 1; i < p.length; i++) {
    const [x0, y0] = p[i - 1];
    const [x1, y1] = p[i];
    const mx = (x0 + x1) / 2;
    d += ` C${mx},${y0} ${mx},${y1} ${x1},${y1}`;
  }
  return d;
}

export default function PainChain({ pains }: { pains: ChainPain[] }) {
  const section = useRef<HTMLDivElement>(null);
  const path = useRef<SVGPathElement>(null);
  const ball = useRef<SVGCircleElement>(null);
  const vBall = useRef<HTMLSpanElement>(null);
  const [open, setOpen] = useState(0);
  const [reached, setReached] = useState(-1);

  const select = (i: number) => {
    setOpen(i);
    track("pain_explored", { pain: pains[i].slug });
  };

  useEffect(() => {
    if (!section.current || prefersReducedMotion()) {
      setReached(5);
      return;
    }
    let kill: (() => void) | undefined;
    let cancelled = false;
    const place = (p: number) => {
      const pathEl = path.current;
      const ballEl = ball.current;
      if (pathEl && ballEl && pathEl.getTotalLength) {
        const len = pathEl.getTotalLength();
        const pt = pathEl.getPointAtLength(len * p);
        ballEl.setAttribute("cx", String(pt.x));
        ballEl.setAttribute("cy", String(pt.y));
        ballEl.setAttribute("r", String(7 + p * 17));
      }
      if (vBall.current) {
        const size = 14 + p * 22;
        vBall.current.style.top = `${p * 100}%`;
        vBall.current.style.width = `${size}px`;
        vBall.current.style.height = `${size}px`;
      }
      setReached(Math.floor(p * 5 + 0.02));
    };
    place(0);
    whenNear(section.current).then(() =>
      loadGsap().then(({ ScrollTrigger }) => {
        if (cancelled || !section.current) return;
        const st = ScrollTrigger.create({
          trigger: section.current,
          start: "top 70%",
          end: "bottom 55%",
          scrub: 0.6,
          onUpdate: (self) => place(self.progress),
        });
        kill = () => st.kill();
      }),
    );
    return () => {
      cancelled = true;
      kill?.();
    };
  }, []);

  const active = pains[open];

  return (
    <section id="six-pains" aria-labelledby="pains-title" className="relative py-20 sm:py-28">
      <div ref={section} className="container-page">
        <SectionHeading
          id="pains-title"
          eyebrow="Six problems, one chain"
          title="Hotel operations problems Mise solves"
          lede="Each one makes the next one worse. Tap a link in the chain."
        />

        {/* Desktop: horizontal chain */}
        <div className="relative mt-14 hidden md:block">
          <svg viewBox="0 0 1180 220" className="h-auto w-full overflow-visible" aria-hidden="true">
            <path d={hPath()} fill="none" stroke="var(--line-strong)" strokeWidth="2" strokeDasharray="4 8" />
            <path ref={path} d={hPath()} fill="none" stroke="transparent" />
            <circle ref={ball} cx={H_POINTS[0][0]} cy={H_POINTS[0][1]} r="7" fill="url(#snow)" className="drop-shadow-[0_0_18px_rgb(255_107_91/0.6)]" />
            <defs>
              <radialGradient id="snow">
                <stop offset="0" stopColor="#ffd2cc" />
                <stop offset="0.6" stopColor="#ff6b5b" />
                <stop offset="1" stopColor="#c23a2b" />
              </radialGradient>
            </defs>
          </svg>
          <ol className="absolute inset-0">
            {pains.map((p, i) => {
              const [x, y] = H_POINTS[i];
              const hit = reached >= i;
              return (
                <li key={p.slug} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${(x / 1180) * 100}%`, top: `${(y / 220) * 100}%` }}>
                  <button
                    type="button"
                    onClick={() => select(i)}
                    onMouseEnter={() => select(i)}
                    onFocus={() => select(i)}
                    aria-expanded={open === i}
                    aria-controls="pain-detail"
                    className={`group flex flex-col items-center gap-2 rounded-2xl px-2 py-1 text-center`}
                  >
                    <span
                      className={`grid size-12 place-items-center rounded-full border font-mono text-[0.8rem] transition-all duration-500 ${
                        open === i
                          ? "scale-110 border-gold bg-gold text-on-gold"
                          : hit
                            ? "border-coral/70 bg-coral/15 text-coral-ink"
                            : "border-line-strong bg-bg text-muted"
                      }`}
                    >
                      {p.index}
                    </span>
                    <span className={`max-w-[9rem] font-display text-[0.92rem] leading-tight font-medium ${open === i ? "text-ink" : "text-muted"}`}>
                      {p.name}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        <div
          id="pain-detail"
          aria-live="polite"
          className="mt-10 hidden items-center justify-between gap-8 rounded-2xl border border-line bg-surface/60 p-7 md:flex"
        >
          <div>
            <p className="font-mono text-[0.72rem] tracking-[0.16em] text-coral-ink uppercase">
              {active.index} · {active.name} · the wound
            </p>
            <p className="mt-2 font-display text-[1.45rem] leading-snug text-ink">{active.wound}</p>
          </div>
          <Link
            href={`/problems/${active.slug}`}
            className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-gold/60 px-5 py-3 text-[0.94rem] font-medium text-gold-ink transition-colors hover:bg-gold hover:text-on-gold"
          >
            How Mise closes the {active.name}
            <Icon name="arrowRight" size={16} />
          </Link>
        </div>

        {/* Mobile: vertical chain, everything visible */}
        <div className="relative mt-10 md:hidden">
          <div aria-hidden="true" className="absolute top-6 bottom-6 left-[23px] w-px border-l-2 border-dashed border-line-strong">
            <span
              ref={vBall}
              className="absolute left-1/2 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,#ffd2cc,#ff6b5b_60%,#c23a2b)] shadow-[0_0_16px_rgb(255_107_91/0.6)]"
              style={{ top: 0 }}
            />
          </div>
          <ol className="relative space-y-4">
            {pains.map((p, i) => (
              <li key={p.slug} className="flex gap-4">
                <span
                  className={`grid size-12 shrink-0 place-items-center rounded-full border font-mono text-[0.8rem] ${
                    reached >= i ? "border-coral/70 bg-coral/15 text-coral-ink" : "border-line-strong bg-bg text-muted"
                  }`}
                >
                  {p.index}
                </span>
                <div className="rounded-2xl border border-line bg-surface/60 p-4">
                  <h3 className="font-display text-[1.05rem] font-semibold text-ink">{p.name}</h3>
                  <p className="mt-1 text-[0.95rem] text-muted">{p.wound}</p>
                  <Link
                    href={`/problems/${p.slug}`}
                    onClick={() => track("pain_explored", { pain: p.slug })}
                    className="mt-2 inline-flex items-center gap-1.5 text-[0.9rem] font-medium text-gold-ink"
                  >
                    How Mise closes it <span className="sr-only">: {p.name}</span>
                    <Icon name="arrowRight" size={14} />
                  </Link>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* All six, as plain links, for keyboard users and crawlers on desktop. */}
        <ul className="mt-6 hidden flex-wrap gap-x-5 gap-y-2 md:flex" aria-label="The six hotel operations problems">
          {pains.map((p) => (
            <li key={p.slug}>
              <Link href={`/problems/${p.slug}`} className="text-[0.88rem] text-muted underline decoration-line-strong underline-offset-4 hover:text-gold-ink">
                The {p.name.toLowerCase()} problem
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
