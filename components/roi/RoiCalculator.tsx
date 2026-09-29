"use client";
import { useMemo, useRef, useState } from "react";
import { track } from "@/lib/analytics";
import { computeRoi, formatMoney, formatNumber, roiDefaults, type Currency, type RoiInputs } from "@/lib/roi";

type Field = { key: keyof RoiInputs; label: string; min: number; max: number; step: number; unit?: string; money?: boolean; help?: string };

const groups: { title: string; note: string; fields: Field[] }[] = [
  {
    title: "Your properties",
    note: "Your scale.",
    fields: [
      { key: "properties", label: "Properties", min: 1, max: 50, step: 1 },
      { key: "staffPerProperty", label: "Staff per property", min: 10, max: 600, step: 5 },
    ],
  },
  {
    title: "Staff turnover",
    note: "Use your HR figures. The defaults are placeholders, not industry statistics.",
    fields: [
      { key: "turnoverPct", label: "Annual staff turnover", min: 0, max: 120, step: 1, unit: "%" },
      { key: "replacementCost", label: "Cost to replace one person", min: 0, max: 300000, step: 1000, money: true, help: "Recruitment, onboarding time and lost productivity." },
    ],
  },
  {
    title: "Supervisor verification time",
    note: "Time supervisors spend walking to check work in person.",
    fields: [
      { key: "supervisorsPerProperty", label: "Supervisors per property", min: 0, max: 30, step: 1 },
      { key: "verifyMinutesPerDay", label: "Minutes per supervisor per day on checks", min: 0, max: 480, step: 10, unit: " min" },
      { key: "supervisorHourlyCost", label: "Supervisor cost per hour", min: 0, max: 5000, step: 25, money: true },
    ],
  },
  {
    title: "Audit preparation",
    note: "Brand audits, inspections and owner reviews.",
    fields: [
      { key: "auditsPerYear", label: "Audits per property per year", min: 0, max: 24, step: 1 },
      { key: "prepPeoplePerAudit", label: "People preparing each audit", min: 0, max: 20, step: 1 },
      { key: "prepDaysPerAudit", label: "Days each spends preparing", min: 0, max: 20, step: 0.5 },
      { key: "prepDayCost", label: "Cost of one person-day", min: 0, max: 50000, step: 250, money: true },
    ],
  },
];

export default function RoiCalculator() {
  const [v, setV] = useState<RoiInputs>(roiDefaults);
  const used = useRef(false);
  const r = useMemo(() => computeRoi(v), [v]);

  const set = (key: keyof RoiInputs, value: number | Currency) => {
    setV((s) => ({ ...s, [key]: value }));
    if (!used.current) {
      used.current = true;
      track("roi_calculator_used", { surface: "roi-page" });
    }
  };

  const money = (n: number) => formatMoney(n, v.currency);

  return (
    <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
      <form className="space-y-6" onSubmit={(e) => e.preventDefault()} aria-label="ROI assumptions">
        <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-line bg-surface/60 p-5">
          <label htmlFor="roi-currency" className="text-[0.95rem] text-ink">
            Currency
          </label>
          <select
            id="roi-currency"
            value={v.currency}
            onChange={(e) => set("currency", e.target.value as Currency)}
            className="h-10 rounded-full border border-line-strong bg-surface px-4 text-[0.92rem] text-ink"
          >
            <option value="INR">Indian rupee (₹)</option>
            <option value="LKR">Sri Lankan rupee (Rs)</option>
            <option value="USD">US dollar ($)</option>
          </select>
          <button type="button" onClick={() => setV(roiDefaults)} className="ml-auto text-[0.88rem] text-muted underline underline-offset-4 hover:text-ink">
            Reset assumptions
          </button>
        </div>
        {groups.map((g) => (
          <fieldset key={g.title} className="rounded-2xl border border-line bg-surface/60 p-5 sm:p-6">
            <legend className="px-1 font-display text-[1.1rem] font-semibold text-ink">{g.title}</legend>
            <p className="text-[0.88rem] text-faint">{g.note}</p>
            <div className="mt-5 space-y-5">
              {g.fields.map((f) => {
                const value = v[f.key] as number;
                return (
                  <div key={f.key}>
                    <div className="flex items-baseline justify-between gap-4">
                      <label htmlFor={`roi-${f.key}`} className="text-[0.95rem] text-ink">
                        {f.label}
                      </label>
                      <input
                        type="number"
                        aria-label={`${f.label} value`}
                        min={f.min}
                        max={f.max}
                        step={f.step}
                        value={value}
                        onChange={(e) => set(f.key, Math.max(0, Number(e.target.value) || 0))}
                        className="h-9 w-32 rounded-lg border border-line-strong bg-surface px-3 text-right font-mono text-[0.9rem] text-gold-ink"
                      />
                    </div>
                    <input
                      id={`roi-${f.key}`}
                      type="range"
                      min={f.min}
                      max={f.max}
                      step={f.step}
                      value={Math.min(value, f.max)}
                      onChange={(e) => set(f.key, Number(e.target.value))}
                      className="mt-2 w-full accent-[#e5b35a]"
                    />
                    {f.help ? <p className="mt-1 text-[0.82rem] text-faint">{f.help}</p> : null}
                  </div>
                );
              })}
            </div>
          </fieldset>
        ))}
      </form>

      <div className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-2xl border border-gold/35 bg-[linear-gradient(160deg,rgb(229_179_90/0.14),transparent_60%)] p-6 sm:p-7" aria-live="polite">
          <p className="eyebrow">Annual cost pools, on your assumptions</p>
          <dl className="mt-5 divide-y divide-line">
            <div className="flex items-baseline justify-between gap-4 py-3">
              <dt className="text-[0.95rem] text-muted">
                Staff turnover
                <span className="block text-[0.8rem] text-faint">{formatNumber(r.leavers)} leavers of {formatNumber(r.headcount)} staff</span>
              </dt>
              <dd className="font-mono text-[1rem] text-ink">{money(r.turnoverCost)}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-4 py-3">
              <dt className="text-[0.95rem] text-muted">
                Supervisor verification
                <span className="block text-[0.8rem] text-faint">{formatNumber(r.supervisorHours)} hours a year</span>
              </dt>
              <dd className="font-mono text-[1rem] text-ink">{money(r.supervisorCost)}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-4 py-3">
              <dt className="text-[0.95rem] text-muted">
                Audit preparation
                <span className="block text-[0.8rem] text-faint">{formatNumber(r.auditDays)} person-days a year</span>
              </dt>
              <dd className="font-mono text-[1rem] text-ink">{money(r.auditCost)}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-4 py-4">
              <dt className="font-medium text-ink">Total cost pool</dt>
              <dd className="font-display text-[1.6rem] font-semibold text-ink">{money(r.total)}</dd>
            </div>
          </dl>
          <div className="mt-4 rounded-xl border border-line bg-surface/70 p-4">
            <div className="flex items-baseline justify-between gap-4">
              <label htmlFor="roi-scenario" className="text-[0.92rem] text-ink">
                Your scenario: share you expect to recover
              </label>
              <span className="font-mono text-[0.95rem] text-gold-ink">{v.scenarioPct}%</span>
            </div>
            <input
              id="roi-scenario"
              type="range"
              min={0}
              max={60}
              step={1}
              value={v.scenarioPct}
              onChange={(e) => set("scenarioPct", Number(e.target.value))}
              className="mt-2 w-full accent-[#e5b35a]"
            />
            <p className="mt-3 text-[0.9rem] text-muted">
              Scenario value: <strong className="font-display text-[1.25rem] text-ink">{money(r.scenarioValue)}</strong> a year
            </p>
            <p className="mt-2 text-[0.8rem] leading-relaxed text-faint">
              This percentage is your assumption. Mise does not claim a specific reduction; a pilot measures the real
              effect on your property from the service record.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
