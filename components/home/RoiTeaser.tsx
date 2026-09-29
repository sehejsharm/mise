"use client";
import { useRef, useState } from "react";
import { ArrowLink, SectionHeading } from "@/components/ui/primitives";
import { track } from "@/lib/analytics";
import { computeRoi, formatMoney, roiDefaults } from "@/lib/roi";

const sliders = [
  { key: "properties", label: "Properties", min: 1, max: 25, step: 1, suffix: "" },
  { key: "staffPerProperty", label: "Staff per property", min: 20, max: 400, step: 10, suffix: "" },
  { key: "turnoverPct", label: "Annual staff turnover", min: 5, max: 100, step: 1, suffix: "%" },
] as const;

export default function RoiTeaser() {
  const [v, setV] = useState({
    properties: roiDefaults.properties,
    staffPerProperty: roiDefaults.staffPerProperty,
    turnoverPct: roiDefaults.turnoverPct,
  });
  const used = useRef(false);
  const r = computeRoi({ ...roiDefaults, ...v, supervisorsPerProperty: 0, auditsPerYear: 0 });

  const change = (key: keyof typeof v, value: number) => {
    setV((s) => ({ ...s, [key]: value }));
    if (!used.current) {
      used.current = true;
      track("roi_calculator_used", { surface: "home-teaser" });
    }
  };

  return (
    <section aria-labelledby="roi-title" className="relative py-20 sm:py-28">
      <div className="container-page grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <SectionHeading
            id="roi-title"
            eyebrow="Back of the envelope"
            title="What staff turnover costs your hotel"
            lede="Three sliders, your numbers. Every assumption is editable on the full calculator."
          />
          <div className="mt-6">
            <ArrowLink href="/roi">Open the full hotel operations ROI calculator</ArrowLink>
          </div>
        </div>
        <div className="rounded-2xl border border-line bg-surface/70 p-6 sm:p-8">
          <div className="space-y-6">
            {sliders.map((s) => (
              <div key={s.key}>
                <div className="flex items-baseline justify-between">
                  <label htmlFor={`roi-${s.key}`} className="text-[0.95rem] text-ink">
                    {s.label}
                  </label>
                  <output htmlFor={`roi-${s.key}`} className="font-mono text-[0.95rem] text-gold-ink tabular-nums">
                    {v[s.key]}
                    {s.suffix}
                  </output>
                </div>
                <input
                  id={`roi-${s.key}`}
                  type="range"
                  min={s.min}
                  max={s.max}
                  step={s.step}
                  value={v[s.key]}
                  onChange={(e) => change(s.key, Number(e.target.value))}
                  className="mt-3 w-full accent-[#d4a94f]"
                />
              </div>
            ))}
          </div>
          <div className="mt-8 border-t border-line pt-6" aria-live="polite">
            <p className="text-[0.9rem] text-muted">Estimated annual cost of staff turnover</p>
            <p className="mt-1 font-display text-[clamp(2.2rem,5vw,3rem)] leading-none font-semibold text-ink">
              {formatMoney(r.turnoverCost, "INR")}
            </p>
            <p className="mt-3 text-[0.85rem] leading-relaxed text-faint">
              Assumes {formatMoney(roiDefaults.replacementCost, "INR")} to replace one person ({Math.round(r.leavers)} leavers a
              year). That figure is an editable assumption, not an industry statistic.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
