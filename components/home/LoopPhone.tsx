"use client";
/**
 * The phone mockup used by the pinned "how it works" section. One screen per
 * move of the loop; `step` selects which is visible. Micro-interactions run
 * only while their screen is active:
 *  0 Standard      – steps and photo markers drawn in
 *  1 Timed task    – countdown ring ticks down
 *  2 Evidence      – camera shutter, photo-gate lock clicks open
 *  3 Service record – ledger row slides in, timestamp types itself
 */
import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { departments, type Department } from "@/content/departments";

function Countdown({ active, minutes }: { active: boolean; minutes: number }) {
  const [secs, setSecs] = useState(minutes * 60);
  useEffect(() => {
    if (!active) return;
    setSecs(minutes * 60);
    const id = setInterval(() => setSecs((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, [active, minutes]);
  const mm = String(Math.floor(secs / 60)).padStart(2, "0");
  const ss = String(secs % 60).padStart(2, "0");
  return (
    <span className="font-mono text-[1.9rem] font-medium text-[#f2f4ee] tabular-nums" aria-hidden="true">
      {mm}:{ss}
    </span>
  );
}

function Typed({ text, active }: { text: string; active: boolean }) {
  const [n, setN] = useState(text.length);
  useEffect(() => {
    if (!active) return;
    setN(0);
    const id = setInterval(() => setN((v) => (v < text.length ? v + 1 : v)), 55);
    return () => clearInterval(id);
  }, [active, text]);
  return (
    <span className="tabular-nums">
      {text.slice(0, n)}
      <span className={`ml-px inline-block w-px bg-[#e5b35a] ${n < text.length ? "opacity-100" : "opacity-0"}`}>&nbsp;</span>
    </span>
  );
}

export default function LoopPhone({ step, dept = departments[0] }: { step: number; dept?: Department }) {
  const steps = dept.steps;
  const photoSteps = new Set(dept.photoSteps);
  const gate = dept.photoSteps[0] ?? 0;
  const screen = (i: number) =>
    `absolute inset-0 px-4 pt-10 pb-5 transition-[opacity,transform] duration-500 ease-(--ease-out-expo) ${
      step === i ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-3"
    }`;

  return (
    <div className="relative h-[520px] w-[272px] text-[#f2f4ee]" aria-hidden="true">
      {/* 0 · Standard */}
      <div className={screen(0)}>
        <p className="font-mono text-[0.62rem] tracking-[0.16em] text-[#e5b35a] uppercase">Standard · v6</p>
        <p className="mt-1.5 font-display text-[1.05rem] leading-tight font-semibold">
          {dept.standardId} {dept.standardName}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {["Prepare", "Perform", "Verify", "Release"].map((p, i) => (
            <span
              key={p}
              className={`rounded-full px-2 py-0.5 font-mono text-[0.6rem] ${i === 0 ? "bg-[#e5b35a] text-[#0c2329]" : "border border-white/15 text-[#b9c7c3]"}`}
            >
              {p}
            </span>
          ))}
        </div>
        <ol className="mt-4 space-y-1.5">
          {steps.map((s, i) => (
            <li
              key={s}
              className="flex items-center gap-2 rounded-lg bg-white/[0.04] px-2.5 py-1.5 text-[0.74rem] transition-[opacity,transform] duration-500"
              style={{ transitionDelay: step === 0 ? `${i * 60}ms` : "0ms", opacity: step === 0 ? 1 : 0, transform: step === 0 ? "none" : "translateX(-6px)" }}
            >
              <span className="w-4 font-mono text-[0.62rem] text-[#a0b0ac]">{i + 1}</span>
              <span className="flex-1">{s}</span>
              {photoSteps.has(i) ? <Icon name="camera" size={13} className="text-[#aedfd2]" /> : null}
            </li>
          ))}
        </ol>
        <p className="mt-3 font-mono text-[0.64rem] text-[#a0b0ac]">
          {dept.target} · {dept.photoSteps.length} photo gate{dept.photoSteps.length > 1 ? "s" : ""}
        </p>
      </div>

      {/* 1 · Timed task */}
      <div className={screen(1)}>
        <p className="font-mono text-[0.62rem] tracking-[0.16em] text-[#aedfd2] uppercase">Next timed task</p>
        <p className="mt-1.5 font-display text-[1.25rem] leading-tight font-semibold">{dept.where}</p>
        <p className="text-[0.78rem] text-[#a0b0ac]">
          {dept.task} · {dept.target}
        </p>
        <div className="relative mx-auto mt-6 grid size-[172px] place-items-center">
          <svg viewBox="0 0 120 120" className="absolute inset-0 -rotate-90">
            <circle cx="60" cy="60" r="52" fill="none" stroke="rgb(255 255 255 / 0.08)" strokeWidth="7" />
            <circle
              cx="60"
              cy="60"
              r="52"
              fill="none"
              stroke="url(#ring)"
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray="326.7"
              style={{
                strokeDashoffset: step === 1 ? 110 : 0,
                transition: step === 1 ? "stroke-dashoffset 9s linear" : "none",
              }}
            />
            <defs>
              <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#aedfd2" />
                <stop offset="1" stopColor="#e5b35a" />
              </linearGradient>
            </defs>
          </svg>
          <div className="text-center">
            <Countdown active={step === 1} minutes={dept.targetMin} />
            <p className="font-mono text-[0.6rem] tracking-[0.14em] text-[#a0b0ac] uppercase">remaining</p>
          </div>
        </div>
        <div className="mt-6 rounded-xl bg-white/[0.05] p-3">
          <div className="flex justify-between font-mono text-[0.64rem] text-[#a0b0ac]">
            <span>
              Step {gate + 1} of {steps.length}
            </span>
            <span>On time</span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-1/2 rounded-full bg-[#aedfd2]" />
          </div>
        </div>
      </div>

      {/* 2 · Evidence */}
      <div className={screen(2)}>
        <p className="font-mono text-[0.62rem] tracking-[0.16em] text-[#4fc59e] uppercase">Photo gate · step {gate + 1}</p>
        <p className="mt-1.5 font-display text-[1.05rem] leading-tight font-semibold">{dept.photoGate}</p>
        <div className="relative mt-4 aspect-[4/5] overflow-hidden rounded-xl border border-white/10 bg-[linear-gradient(160deg,#1f3d44,#122d35)]">
          <div className="absolute inset-4 rounded-lg border border-dashed border-white/25" />
          <div className="absolute inset-x-0 bottom-6 flex justify-center">
            <span
              className="grid size-14 place-items-center rounded-full border-4 border-white/80 bg-white/10"
              style={{ animation: step === 2 ? "shutter 900ms 700ms var(--ease-out-expo) both" : "none" }}
            >
              <Icon name="camera" size={20} />
            </span>
          </div>
          <div
            className="absolute inset-0 bg-white"
            style={{ opacity: 0, animation: step === 2 ? "blink-flash 500ms 1100ms both" : "none" }}
          />
        </div>
        <div className="mt-4 flex items-center gap-3 rounded-xl bg-white/[0.05] px-3 py-2.5">
          <span
            className={`grid size-8 place-items-center rounded-full transition-colors duration-500 ${step === 2 ? "bg-[#4fc59e]/20 text-[#4fc59e] delay-[1500ms]" : "bg-[#ff6b5b]/15 text-[#ff8a7d]"}`}
          >
            <Icon name={step === 2 ? "unlock" : "lock"} size={15} />
          </span>
          <p className="text-[0.74rem] leading-snug text-[#cdd8d4]">
            Step won't close until the photo lands.
          </p>
        </div>
      </div>

      {/* 3 · Service record */}
      <div className={screen(3)}>
        <p className="font-mono text-[0.62rem] tracking-[0.16em] text-[#e5b35a] uppercase">Service record</p>
        <p className="mt-1.5 font-display text-[1.05rem] leading-tight font-semibold">Aurora Grand · today</p>
        <ul className="mt-4 space-y-1.5 font-mono text-[0.66rem]">
          <li
            className="rounded-lg border border-[#e5b35a]/50 bg-[#e5b35a]/10 px-2.5 py-2 text-[#f2f4ee] transition-[opacity,transform] duration-700 ease-(--ease-out-expo)"
            style={{ opacity: step === 3 ? 1 : 0, transform: step === 3 ? "none" : "translateY(-12px)" }}
          >
            <Typed text={`${dept.completed.split(" · ")[0]} · ${dept.where} · ${dept.standardId} evidence held`} active={step === 3} />
          </li>
          {[
            ...dept.recordRows,
          ].map((row) => (
            <li key={row} className="rounded-lg bg-white/[0.04] px-2.5 py-2 text-[#b9c7c3]">
              {row}
            </li>
          ))}
        </ul>
        <div className="mt-4 grid grid-cols-3 gap-1.5 text-center">
          {[
            [dept.completed.split(" · ")[1] ?? "on time", ""],
            [`${dept.photoSteps.length}/${dept.photoSteps.length}`, "photos"],
            ["✓", "sign-off"],
          ].map(([v, l]) => (
            <div key={l} className="rounded-lg bg-white/[0.05] py-2">
              <p className="font-mono text-[0.8rem] text-[#4fc59e]">{v}</p>
              <p className="font-mono text-[0.56rem] text-[#a0b0ac] uppercase">{l}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
