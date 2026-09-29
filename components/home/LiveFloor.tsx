"use client";
/**
 * Live floor dashboard: an animated SVG recreation of the manager view, not a
 * screenshot. Every figure is Aurora Grand Colombo demo data and is labelled
 * as such. Status colours were validated for CVD separation (green / blue /
 * coral) and always ship with a text label; a data table twin is included.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import CountUp from "@/components/fx/CountUp";
import { SectionHeading } from "@/components/ui/primitives";
import { liveFloor as c } from "@/content/home";
import { demoProperty } from "@/content/site";

type Status = "released" | "progress" | "blocked" | "queued";
const STATUS: Record<Status, { label: string; color: string }> = {
  released: { label: "Released", color: "#4FC59E" },
  progress: { label: "In progress", color: "#5B8CFF" },
  blocked: { label: "Blocked", color: "#FF6B5B" },
  queued: { label: "Queued", color: "#2B4A50" },
};
const FLOORS = 14;
const COLS = 34;
const CELL = 14;
const GAP = 2;

function hash(n: number) {
  let x = (n + 1) * 2654435761;
  x ^= x >>> 13;
  return (x >>> 0) % 1000;
}

type Cell = { floor: number; room: number; status: Status; rank: number };

function buildCells(): Cell[] {
  const cells: { floor: number; room: number; score: number }[] = [];
  for (let f = 1; f <= FLOORS; f++) {
    const rooms = f <= 6 ? 34 : 33;
    for (let r = 1; r <= rooms; r++) cells.push({ floor: f, room: r, score: f * 60 + (hash(f * 100 + r) % 260) });
  }
  const order = [...cells].sort((a, b) => a.score - b.score);
  const blockedIdx = new Set([37, 118, 203, 260, 301, 355, 412]);
  let assigned = 0;
  return order.map((cell, i) => {
    let status: Status;
    if (blockedIdx.has(i)) status = "blocked";
    else {
      status = assigned < 214 ? "released" : assigned < 255 ? "progress" : "queued";
      assigned += 1;
    }
    return { floor: cell.floor, room: cell.room, status, rank: i };
  });
}

export default function LiveFloor() {
  const cells = useMemo(buildCells, []);
  const root = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [tip, setTip] = useState<{ x: number; y: number; text: string; value: string } | null>(null);
  const [hover, setHover] = useState<number | null>(null);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true);
      return;
    }
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const totals = useMemo(() => {
    const t: Record<Status, number> = { released: 0, progress: 0, blocked: 0, queued: 0 };
    cells.forEach((cell) => (t[cell.status] += 1));
    return t;
  }, [cells]);

  const byFloor = useMemo(() => {
    const rows: Record<number, Record<Status, number>> = {};
    cells.forEach((cell) => {
      rows[cell.floor] ??= { released: 0, progress: 0, blocked: 0, queued: 0 };
      rows[cell.floor][cell.status] += 1;
    });
    return rows;
  }, [cells]);

  const W = COLS * (CELL + GAP) + 30;
  const H = FLOORS * (CELL + GAP);

  // Evidence-held line chart geometry.
  const ev = c.evidence;
  const LW = 520;
  const LH = 150;
  const pad = { l: 34, r: 44, t: 12, b: 22 };
  const x = (i: number) => pad.l + (i / (ev.length - 1)) * (LW - pad.l - pad.r);
  const y = (v: number) => pad.t + (1 - (v - 50) / 50) * (LH - pad.t - pad.b);
  const line = ev.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
  const area = `${line} L${x(ev.length - 1)},${y(50)} L${x(0)},${y(50)} Z`;

  const showTip = (e: React.PointerEvent, text: string, value: string) => {
    const box = root.current?.getBoundingClientRect();
    const target = (e.currentTarget as Element).getBoundingClientRect();
    if (!box) return;
    setTip({ x: target.left - box.left + target.width / 2, y: target.top - box.top, text, value });
  };

  return (
    <section aria-labelledby="floor-title" className="relative py-20 sm:py-28">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading id="floor-title" eyebrow={c.eyebrow} title={c.title} />
          <p className="shrink-0 rounded-full border border-line-strong px-3.5 py-1.5 font-mono text-[0.72rem] text-muted">
            {demoProperty.label} · {demoProperty.rooms} rooms · {demoProperty.floors} floors
          </p>
        </div>

        <div
          ref={root}
          data-copy-budget="exclude"
          className="relative mt-10 overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#122d35] p-4 text-[#f2f4ee] shadow-float sm:p-7"
          onPointerLeave={() => {
            setTip(null);
            setHover(null);
          }}
        >
          {/* Stat tiles */}
          <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {c.counters.map((k) => {
              const color = k.tone === "green" ? "#4FC59E" : k.tone === "cyan" ? "#5B8CFF" : k.tone === "coral" ? "#FF6B5B" : "#5e7773";
              return (
                <div key={k.label} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <dt className="flex items-center gap-2 text-[0.82rem] text-[#b9c7c3]">
                    <span className="size-2 rounded-[2px]" style={{ background: color }} aria-hidden="true" />
                    {k.label}
                  </dt>
                  <dd className="mt-1.5 font-display text-[2rem] leading-none font-semibold">
                    <CountUp value={k.value} proportional />
                  </dd>
                </div>
              );
            })}
          </dl>

          <div className="mt-6 grid gap-6 xl:grid-cols-[1.35fr_1fr]">
            {/* Heatmap */}
            <figure className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <figcaption className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-[0.9rem] font-medium">Rooms by floor, this shift</span>
                <ul className="flex flex-wrap gap-x-4 gap-y-1 text-[0.75rem] text-[#b9c7c3]" aria-label="Legend">
                  {(Object.keys(STATUS) as Status[]).map((s) => (
                    <li key={s} className="flex items-center gap-1.5">
                      <span className="size-2.5 rounded-[2px]" style={{ background: STATUS[s].color }} aria-hidden="true" />
                      {STATUS[s].label} {totals[s]}
                    </li>
                  ))}
                </ul>
              </figcaption>
              <div className="mt-4 overflow-x-auto">
                <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full min-w-[520px]" role="img" aria-label={`Heatmap of ${demoProperty.rooms} rooms across ${FLOORS} floors by task status (demo data)`}>
                  {Array.from({ length: FLOORS }, (_, idx) => {
                    const floor = FLOORS - idx;
                    return (
                      <g key={floor}>
                        <text x="0" y={idx * (CELL + GAP) + CELL - 3} fontSize="9" fill="#a0b0ac" fontFamily="var(--font-mono)">
                          F{floor}
                        </text>
                      </g>
                    );
                  })}
                  {cells.map((cell, i) => {
                    const row = FLOORS - cell.floor;
                    const cx = 30 + (cell.room - 1) * (CELL + GAP);
                    const cy = row * (CELL + GAP);
                    const fill = inView ? STATUS[cell.status].color : "#1d3d44";
                    return (
                      <rect
                        key={i}
                        x={cx}
                        y={cy}
                        width={CELL}
                        height={CELL}
                        rx="3"
                        fill={fill}
                        opacity={hover === null || hover === i ? 1 : 0.55}
                        style={{ transition: `fill 400ms ${Math.min(cell.rank * 2.2, 1100)}ms, opacity 150ms` }}
                        onPointerEnter={(e) => {
                          setHover(i);
                          showTip(e, `Floor ${cell.floor} · Room ${cell.floor}${String(cell.room).padStart(2, "0")}`, STATUS[cell.status].label);
                        }}
                      />
                    );
                  })}
                </svg>
              </div>
            </figure>

            <div className="grid gap-6">
              {/* Department readiness bars */}
              <figure className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                <figcaption className="text-[0.9rem] font-medium">Readiness by department</figcaption>
                <ul className="mt-4 space-y-3">
                  {c.departments.map((d, i) => (
                    <li key={d.name} className="grid grid-cols-[7.5rem_1fr] items-center gap-3 text-[0.82rem]">
                      <span className="text-[#b9c7c3]">{d.name}</span>
                      <span className="flex items-center gap-2">
                        <span className="relative h-2.5 flex-1 overflow-hidden rounded-r-[4px] bg-white/[0.06]">
                          <span
                            className="absolute inset-y-0 left-0 rounded-r-[4px] bg-[#e5b35a] transition-[width] duration-1000 ease-(--ease-out-expo)"
                            style={{ width: inView ? `${d.value}%` : "0%", transitionDelay: `${200 + i * 90}ms` }}
                          />
                        </span>
                        <span className="w-9 text-right font-mono text-[#f2f4ee] tabular-nums">{d.value}%</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </figure>

              {/* Evidence held line */}
              <figure className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                <figcaption className="text-[0.9rem] font-medium">Tasks with evidence held, last 14 shifts</figcaption>
                <svg
                  viewBox={`0 0 ${LW} ${LH}`}
                  className="mt-3 h-auto w-full"
                  role="img"
                  aria-label={`Evidence held rose from ${ev[0]}% to ${ev[ev.length - 1]}% over 14 shifts (demo data)`}
                  onPointerMove={(e) => {
                    const svg = e.currentTarget.getBoundingClientRect();
                    const px = ((e.clientX - svg.left) / svg.width) * LW;
                    const i = Math.max(0, Math.min(ev.length - 1, Math.round(((px - pad.l) / (LW - pad.l - pad.r)) * (ev.length - 1))));
                    setHover(1000 + i);
                    const box = root.current!.getBoundingClientRect();
                    setTip({
                      x: svg.left - box.left + (x(i) / LW) * svg.width,
                      y: svg.top - box.top + (y(ev[i]) / LH) * svg.height,
                      text: `Shift ${i + 1}`,
                      value: `${ev[i]}% evidence held`,
                    });
                  }}
                >
                  {[50, 75, 100].map((t) => (
                    <g key={t}>
                      <line x1={pad.l} x2={LW - pad.r} y1={y(t)} y2={y(t)} stroke="rgb(255 255 255 / 0.08)" strokeWidth="1" />
                      <text x={pad.l - 6} y={y(t) + 3} fontSize="9" textAnchor="end" fill="#a0b0ac" fontFamily="var(--font-mono)">
                        {t}%
                      </text>
                    </g>
                  ))}
                  <path d={area} fill="#4FC59E" opacity={inView ? 0.1 : 0} style={{ transition: "opacity 800ms 900ms" }} />
                  <path
                    d={line}
                    fill="none"
                    stroke="#4FC59E"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    pathLength={1}
                    strokeDasharray="1"
                    strokeDashoffset={inView ? 0 : 1}
                    style={{ transition: "stroke-dashoffset 1600ms cubic-bezier(0.22,1,0.36,1) 300ms" }}
                  />
                  {hover !== null && hover >= 1000 ? (
                    <line x1={x(hover - 1000)} x2={x(hover - 1000)} y1={pad.t} y2={LH - pad.b} stroke="rgb(255 255 255 / 0.3)" strokeWidth="1" />
                  ) : null}
                  <circle cx={x(ev.length - 1)} cy={y(ev[ev.length - 1])} r="5" fill="#4FC59E" stroke="#122d35" strokeWidth="2" opacity={inView ? 1 : 0} style={{ transition: "opacity 300ms 1700ms" }} />
                  <text x={x(ev.length - 1) + 9} y={y(ev[ev.length - 1]) + 4} fontSize="11" fill="#f2f4ee" fontFamily="var(--font-mono)">
                    {ev[ev.length - 1]}%
                  </text>
                  <text x={pad.l} y={LH - 4} fontSize="9" fill="#a0b0ac" fontFamily="var(--font-mono)">
                    Shift 1
                  </text>
                  <text x={LW - pad.r} y={LH - 4} fontSize="9" textAnchor="end" fill="#a0b0ac" fontFamily="var(--font-mono)">
                    Shift 14
                  </text>
                </svg>
              </figure>
            </div>
          </div>

          {tip ? (
            <div
              role="status"
              className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[calc(100%+10px)] rounded-lg border border-white/15 bg-[#0c2329]/95 px-3 py-2 text-[0.78rem] shadow-float"
              style={{ left: tip.x, top: tip.y }}
            >
              <p className="font-medium text-[#f2f4ee]">{tip.value}</p>
              <p className="text-[#a0b0ac]">{tip.text}</p>
            </div>
          ) : null}

          <details className="mt-5 text-[0.82rem] text-[#b9c7c3]">
            <summary className="cursor-pointer font-mono text-[0.72rem] tracking-wide text-[#a0b0ac] hover:text-[#f2f4ee]">
              View the floor data as a table
            </summary>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full min-w-[420px] text-left">
                <thead>
                  <tr className="text-[#a0b0ac]">
                    <th scope="col" className="py-1 pr-4 font-normal">Floor</th>
                    <th scope="col" className="py-1 pr-4 font-normal">Released</th>
                    <th scope="col" className="py-1 pr-4 font-normal">In progress</th>
                    <th scope="col" className="py-1 pr-4 font-normal">Blocked</th>
                    <th scope="col" className="py-1 font-normal">Queued</th>
                  </tr>
                </thead>
                <tbody className="tabular-nums">
                  {Object.entries(byFloor).map(([floor, row]) => (
                    <tr key={floor} className="border-t border-white/5">
                      <th scope="row" className="py-1 pr-4 font-normal">{floor}</th>
                      <td className="py-1 pr-4">{row.released}</td>
                      <td className="py-1 pr-4">{row.progress}</td>
                      <td className="py-1 pr-4">{row.blocked}</td>
                      <td className="py-1">{row.queued}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>
          <p className="mt-3 font-mono text-[0.66rem] text-[#a0b0ac]">
            All figures: {demoProperty.label}. A fictional property used to demonstrate the manager view.
          </p>
        </div>
      </div>
    </section>
  );
}
