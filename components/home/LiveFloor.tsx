"use client";
/**
 * Live floor dashboard: an animated SVG recreation of the manager view, not a
 * screenshot. Tasks are shown by department (front office to spa), and a
 * department switcher focuses the counters and the heatmap row. Every figure is Aurora Grand Colombo demo data and is labelled
 * as such. Status colours were validated for CVD separation (green / blue /
 * coral) and always ship with a text label; a data table twin is included.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import DeptSwitcher, { useDepartmentRotation } from "@/components/home/DeptSwitcher";
import { SectionHeading } from "@/components/ui/primitives";
import { departments } from "@/content/departments";
import { liveFloor as c } from "@/content/home";
import { demoProperty } from "@/content/site";

type Status = "released" | "progress" | "blocked" | "queued";
const STATUS: Record<Status, { label: string; color: string }> = {
  released: { label: "Closed", color: "#4FC59E" },
  progress: { label: "In progress", color: "#5B8CFF" },
  blocked: { label: "Blocked", color: "#FF6B5B" },
  queued: { label: "Queued", color: "#2B4A50" },
};
const ROWS = departments.length;
const CELL = 11;
const GAP = 2;
const LABEL = 84;

type Cell = { dept: number; n: number; status: Status; rank: number };

/** One row per department; cells are this shift's tasks, closed first. */
function buildCells(): Cell[] {
  const cells: Cell[] = [];
  departments.forEach((d, row) => {
    const seq: Status[] = [
      ...Array<Status>(d.shift.closed).fill("released"),
      ...Array<Status>(d.shift.progress).fill("progress"),
      ...Array<Status>(d.shift.blocked).fill("blocked"),
      ...Array<Status>(d.shift.queued).fill("queued"),
    ];
    seq.forEach((status, n) => cells.push({ dept: row, n, status, rank: n * 3 + row }));
  });
  return cells;
}

const MAX = Math.max(...departments.map((d) => d.shift.closed + d.shift.progress + d.shift.blocked + d.shift.queued));

export default function LiveFloor() {
  const cells = useMemo(buildCells, []);
  const rot = useDepartmentRotation(5200);
  const sel = rot.index;
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

  const W = LABEL + MAX * (CELL + GAP);
  const H = ROWS * (CELL + GAP) * 1.6;

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
            {demoProperty.label} · {departments.length} departments · {cells.length} tasks this shift
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
          <div ref={rot.ref} {...rot.pauseProps}>
            <DeptSwitcher
              index={sel}
              select={rot.select}
              reduced={rot.reduced}
              rotating={rot.rotating}
              label="Focus the dashboard on a department"
              className="mb-4"
            />
          </div>
          {/* Stat tiles for the selected department */}
          <p className="mb-3 font-mono text-[0.7rem] tracking-[0.12em] text-[#a0b0ac] uppercase" aria-live="polite">
            {departments[sel].label} · {departments[sel].standardId} {departments[sel].standardName} · this shift
          </p>
          <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {(Object.keys(STATUS) as Status[]).map((k) => {
              const value = { released: departments[sel].shift.closed, progress: departments[sel].shift.progress, blocked: departments[sel].shift.blocked, queued: departments[sel].shift.queued }[k];
              return (
                <div key={k} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <dt className="flex items-center gap-2 text-[0.82rem] text-[#b9c7c3]">
                    <span className="size-2 rounded-[2px]" style={{ background: k === "queued" ? "#5e7773" : STATUS[k].color }} aria-hidden="true" />
                    {STATUS[k].label}
                  </dt>
                  <dd key={`${sel}-${k}`} className="mt-1.5 animate-[fade-in_400ms_var(--ease-out-expo)] font-display text-[2rem] leading-none font-semibold tabular-nums">
                    {value}
                  </dd>
                </div>
              );
            })}
          </dl>

          <div className="mt-6 grid gap-6 xl:grid-cols-[1.35fr_1fr]">
            {/* Heatmap */}
            <figure className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <figcaption className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-[0.9rem] font-medium">Tasks by department, this shift</span>
                <ul className="flex flex-wrap gap-x-4 gap-y-1 text-[0.75rem] text-[#b9c7c3]" aria-label="Legend">
                  {(Object.keys(STATUS) as Status[]).map((s) => (
                    <li key={s} className="flex items-center gap-1.5">
                      <span className="size-2.5 rounded-[2px]" style={{ background: STATUS[s].color }} aria-hidden="true" />
                      {STATUS[s].label} {totals[s]}
                    </li>
                  ))}
                </ul>
              </figcaption>
              <div className="mt-4 overflow-x-auto" tabIndex={0} role="region" aria-label="Tasks by department heatmap, scrollable">
                <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full min-w-[520px]" role="img" aria-label={`Heatmap of ${cells.length} tasks across ${ROWS} departments by status (demo data)`}>
                  {departments.map((d, row) => (
                    <text
                      key={d.id}
                      x="0"
                      y={row * (CELL + GAP) * 1.6 + CELL - 2}
                      fontSize="9"
                      fill={row === sel ? "#e5b35a" : "#a0b0ac"}
                      fontFamily="var(--font-mono)"
                    >
                      {d.label}
                    </text>
                  ))}
                  {cells.map((cell, i) => {
                    const cx = LABEL + cell.n * (CELL + GAP);
                    const cy = cell.dept * (CELL + GAP) * 1.6;
                    const fill = inView ? STATUS[cell.status].color : "#1d3d44";
                    const focus = cell.dept === sel;
                    return (
                      <rect
                        key={i}
                        x={cx}
                        y={cy}
                        width={CELL}
                        height={CELL}
                        rx="2.5"
                        fill={fill}
                        opacity={hover === i ? 1 : focus ? 1 : 0.38}
                        style={{ transition: `fill 400ms ${Math.min(cell.rank * 4, 1100)}ms, opacity 250ms` }}
                        onPointerEnter={(e) => {
                          setHover(i);
                          showTip(e, `${departments[cell.dept].label} · task ${cell.n + 1}`, STATUS[cell.status].label);
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
                  {departments.map((d, i) => (
                    <li key={d.id} className="grid grid-cols-[7.5rem_1fr] items-center gap-3 text-[0.82rem]">
                      <span className={i === sel ? "text-[#e5b35a]" : "text-[#b9c7c3]"}>{d.label}</span>
                      <span className="flex items-center gap-2">
                        <span className="relative h-2.5 flex-1 overflow-hidden rounded-r-[4px] bg-white/[0.06]">
                          <span
                            className="absolute inset-y-0 left-0 rounded-r-[4px] bg-[#e5b35a] transition-[width] duration-1000 ease-(--ease-out-expo)"
                            style={{ width: inView ? `${d.readiness}%` : "0%", transitionDelay: `${200 + i * 90}ms`, opacity: i === sel ? 1 : 0.55 }}
                          />
                        </span>
                        <span className="w-9 text-right font-mono text-[#f2f4ee] tabular-nums">{d.readiness}%</span>
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
              View the department data as a table
            </summary>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full min-w-[420px] text-left">
                <thead>
                  <tr className="text-[#a0b0ac]">
                    <th scope="col" className="py-1 pr-4 font-normal">Department</th>
                    <th scope="col" className="py-1 pr-4 font-normal">Closed</th>
                    <th scope="col" className="py-1 pr-4 font-normal">In progress</th>
                    <th scope="col" className="py-1 pr-4 font-normal">Blocked</th>
                    <th scope="col" className="py-1 pr-4 font-normal">Queued</th>
                    <th scope="col" className="py-1 font-normal">Readiness</th>
                  </tr>
                </thead>
                <tbody className="tabular-nums">
                  {departments.map((d) => (
                    <tr key={d.id} className="border-t border-white/5">
                      <th scope="row" className="py-1 pr-4 font-normal">{d.label}</th>
                      <td className="py-1 pr-4">{d.shift.closed}</td>
                      <td className="py-1 pr-4">{d.shift.progress}</td>
                      <td className="py-1 pr-4">{d.shift.blocked}</td>
                      <td className="py-1 pr-4">{d.shift.queued}</td>
                      <td className="py-1">{d.readiness}%</td>
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
