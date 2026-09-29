import Magnetic from "@/components/fx/Magnetic";
import HeroVisual from "@/components/home/HeroVisual";
import ServiceTicker from "@/components/home/ServiceTicker";
import { ButtonLink, Eyebrow } from "@/components/ui/primitives";
import { brand, demoProperty } from "@/content/site";
import { homeMeta, ticker } from "@/content/home";

export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden pt-28 pb-16 sm:pt-36 lg:pb-24">
      {/* Animated gradient mesh + grid, purely decorative. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="grid-lines absolute inset-0 [mask-image:radial-gradient(ellipse_at_60%_30%,#000_20%,transparent_70%)]" />
        <div
          className="absolute -top-40 left-[35%] size-[720px] rounded-full opacity-60 blur-3xl [animation:mesh_22s_ease-in-out_infinite]"
          style={{ background: "radial-gradient(circle, rgb(229 179 90 / 0.22), transparent 60%)" }}
        />
        <div
          className="absolute top-24 -right-40 size-[620px] rounded-full opacity-50 blur-3xl [animation:mesh_28s_ease-in-out_infinite_reverse]"
          style={{ background: "radial-gradient(circle, rgb(174 223 210 / 0.14), transparent 60%)" }}
        />
      </div>

      <div className="container-page relative grid grid-cols-[minmax(0,1fr)] items-center gap-12 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,1fr)] lg:gap-10">
        <div>
          <Eyebrow>{homeMeta.eyebrow}</Eyebrow>
          {/* LCP element: plain text, never animated from opacity 0. */}
          <h1
            id="hero-title"
            className="mt-6 text-[clamp(2.5rem,6.2vw,4.6rem)] leading-[0.98] font-semibold tracking-[-0.04em] text-ink"
          >
            Hotel SOP software that runs inside <span className="text-gradient-gold">every shift.</span>
          </h1>
          <p className="mt-6 font-display text-[1.25rem] font-medium text-gold-ink">{brand.tagline}</p>
          <p className="mt-4 max-w-xl text-[1.08rem] leading-relaxed text-muted">{brand.definitionShort}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Magnetic>
              <ButtonLink href="/demo" size="lg" arrow trackLocation="hero">
                Book a 15-min demo
              </ButtonLink>
            </Magnetic>
            <Magnetic strength={8}>
              <ButtonLink href="/platform" size="lg" variant="ghost">
                See the platform
              </ButtonLink>
            </Magnetic>
          </div>
        </div>

        <div className="relative" data-copy-budget="exclude">
          <div className="relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#0a1f24] shadow-float">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
              <p className="font-mono text-[0.68rem] tracking-[0.16em] text-[#a0b0ac] uppercase">
                {demoProperty.name} · Floor plan
              </p>
              <p className="flex items-center gap-2 font-mono text-[0.68rem] tracking-[0.12em] text-[#4fc59e] uppercase">
                <span className="size-1.5 animate-pulse-dot rounded-full bg-[#4fc59e]" aria-hidden="true" />
                Live
              </p>
            </div>
            <div className="px-2 pt-3 sm:px-4">
              <HeroVisual />
            </div>
            <div className="border-t border-white/10 bg-[#0c2329]/70">
              <ServiceTicker items={ticker} label={`Service record entries, ${demoProperty.label}`} />
            </div>
          </div>
          <p className="mt-3 text-right font-mono text-[0.66rem] tracking-wide text-faint">{demoProperty.label}</p>
        </div>
      </div>
    </section>
  );
}
