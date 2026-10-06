/**
 * The hero's isometric property map, drawn as SVG: lobby and front desk, guest
 * rooms, restaurant, kitchen, spa, plant room and fire exits. The active
 * department's zone lights gold tile by tile as its timed tasks close, and
 * evidence streams from that zone into the service-record column. With no
 * active department (reduced motion), every zone is shown lit and labelled.
 * It is also the poster for the 3D scene.
 */
import { departments } from "@/content/departments";

const COLS = 7;
const ROWS = 6;
const W = 58; // tile width
const H = 29; // tile height (2:1 isometric)
const DEPTH = 9;
const OX = 250;
const OY = 70;

function iso(i: number, j: number) {
  return { x: OX + (i - j) * (W / 2), y: OY + (i + j) * (H / 2) };
}

/** Zone (department index) for each tile, by column i and row j. */
export function zoneOf(i: number, j: number): number {
  if (j <= 1) return i <= 1 ? 0 : 1; // front desk | guest rooms
  if (j <= 3) return i <= 2 ? 2 : i <= 4 ? 3 : 6; // restaurant | kitchen | spa
  return i <= 2 ? 4 : 5; // plant room | fire exits
}

const zoneTiles: { i: number; j: number }[][] = departments.map(() => []);
for (let j = 0; j < ROWS; j++) for (let i = 0; i < COLS; i++) zoneTiles[zoneOf(i, j)].push({ i, j });

const BLOCKED = { i: 5, j: 1 }; // room 305, flagged to engineering

export default function IsoPoster({ active, animate = true }: { active: number | null; animate?: boolean }) {
  const tiles = [];
  for (let j = 0; j < ROWS; j++) {
    for (let i = 0; i < COLS; i++) {
      const zone = zoneOf(i, j);
      const { x, y } = iso(i, j);
      const inset = 3;
      const top = `${x},${y + inset} ${x + W / 2 - inset},${y + H / 2} ${x},${y + H - inset} ${x - W / 2 + inset},${y + H / 2}`;
      const left = `${x - W / 2 + inset},${y + H / 2} ${x},${y + H - inset} ${x},${y + H - inset + DEPTH} ${x - W / 2 + inset},${y + H / 2 + DEPTH}`;
      const right = `${x + W / 2 - inset},${y + H / 2} ${x},${y + H - inset} ${x},${y + H - inset + DEPTH} ${x + W / 2 - inset},${y + H / 2 + DEPTH}`;
      const blocked = i === BLOCKED.i && j === BLOCKED.j;
      const isActive = active === zone;
      const order = zoneTiles[zone].findIndex((t) => t.i === i && t.j === j);
      let style: React.CSSProperties | undefined;
      let fill = "var(--iso-room)";
      if (blocked) fill = "rgb(255 107 91 / 0.55)";
      else if (active === null) fill = "rgb(229 179 90 / 0.55)";
      else if (isActive && animate) style = { animation: `zone-glow 500ms ${(0.25 + order * 0.3).toFixed(2)}s var(--ease-out-expo) both` };
      else if (isActive) fill = "var(--gold)";
      else fill = "rgb(229 179 90 / 0.14)";
      tiles.push(
        <g key={`${i}-${j}-${isActive ? active : "x"}`}>
          <polygon points={left} fill="var(--iso-side-l)" />
          <polygon points={right} fill="var(--iso-side-r)" />
          <polygon points={top} fill={fill} stroke="var(--iso-stroke)" strokeWidth="0.8" style={style} />
        </g>,
      );
    }
  }

  // Zone labels at each zone's centroid.
  const labels = departments.map((d, z) => {
    const ts = zoneTiles[z];
    const ci = ts.reduce((s, t) => s + t.i, 0) / ts.length;
    const cj = ts.reduce((s, t) => s + t.j, 0) / ts.length;
    const { x, y } = iso(ci, cj);
    const on = active === null || active === z;
    return (
      <g key={d.id} transform={`translate(${x} ${y + H / 2})`} opacity={on ? 1 : 0.55}>
        <rect x={-d.zone.length * 2.45 - 6} y="-7.5" width={d.zone.length * 4.9 + 12} height="15" rx="7.5" fill="rgb(12 35 41 / 0.88)" stroke={on ? "rgb(229 179 90 / 0.7)" : "rgb(174 223 210 / 0.25)"} strokeWidth="0.8" />
        <text textAnchor="middle" y="3" fontFamily="var(--font-mono)" fontSize="7.6" letterSpacing="0.4" fill={on ? "#f2f4ee" : "#b9c7c3"}>
          {d.zone}
        </text>
      </g>
    );
  });

  // Evidence particles from the active zone toward the record column.
  const column = { x: 505, y: 92 };
  const source = active === null ? zoneTiles.flatMap((z) => z.slice(0, 2)) : zoneTiles[active];
  const particles = Array.from({ length: 8 }, (_, n) => {
    const t = source[(n * 3) % source.length];
    const { x, y } = iso(t.i, t.j);
    const sy = y + H / 2;
    return (
      <circle
        key={`${active}-${n}`}
        cx={x}
        cy={sy}
        r={2.2}
        fill={n % 3 === 0 ? "var(--cyan)" : "var(--gold)"}
        style={
          animate
            ? ({
                ["--dx" as string]: `${column.x - x}px`,
                ["--dy" as string]: `${column.y + (n % 5) * 34 - sy}px`,
                animation: `stream-up 3.6s ${(0.6 + n * 0.45).toFixed(2)}s cubic-bezier(0.4,0,0.2,1) infinite`,
                opacity: 0,
              } as React.CSSProperties)
            : { opacity: 0 }
        }
      />
    );
  });

  const rows = departments.map((d, n) => (
    <g key={d.id} transform={`translate(478 ${96 + n * 30})`} opacity={active === null || active === n ? 1 : 0.6}>
      <rect width="92" height="20" rx="4" fill="var(--iso-row)" stroke={active === n ? "rgb(229 179 90 / 0.8)" : "var(--iso-stroke)"} strokeWidth="0.8" />
      <circle cx="10" cy="10" r="3" fill="var(--green)" />
      <text x="18" y="13" fontFamily="var(--font-mono)" fontSize="7.4" fill="rgb(242 244 238 / 0.85)">
        {d.standardId}
      </text>
      <rect x="54" y="8.5" width={14 + ((n * 7) % 18)} height="2.5" rx="1.25" fill="var(--iso-text-dim)" />
    </g>
  ));

  const label =
    active === null
      ? "Mise, the service execution platform for hotels, on an isometric property map: every department, from front desk and guest rooms to restaurant, kitchen, spa, plant room and fire exits, writes evidence into one service record"
      : `Mise, the service execution platform for hotels, on an isometric property map: ${departments[active].zone} lights up as ${departments[active].standardId} tasks close and evidence streams into the service record`;

  return (
    <svg
      viewBox="0 0 600 340"
      className="h-auto w-full [--iso-room:rgb(174_223_210/0.07)] [--iso-row:rgb(18_45_53/0.9)] [--iso-side-l:rgb(20_48_56)] [--iso-side-r:rgb(14_38_45)] [--iso-stroke:rgb(174_223_210/0.28)] [--iso-text:rgb(242_244_238/0.55)] [--iso-text-dim:rgb(242_244_238/0.25)]"
      role="img"
      data-lead=""
      aria-label={label}
    >
      <defs>
        <linearGradient id="col" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="rgb(229 179 90 / 0.35)" />
          <stop offset="1" stopColor="rgb(229 179 90 / 0)" />
        </linearGradient>
        <radialGradient id="floorGlow" cx="0.45" cy="0.45" r="0.6">
          <stop offset="0" stopColor="rgb(174 223 210 / 0.14)" />
          <stop offset="1" stopColor="rgb(174 223 210 / 0)" />
        </radialGradient>
      </defs>
      <ellipse cx="250" cy="170" rx="250" ry="130" fill="url(#floorGlow)" />
      {tiles}
      {labels}
      <rect x="470" y="70" width="108" height="250" rx="10" fill="url(#col)" stroke="rgb(229 179 90 / 0.45)" strokeWidth="1" />
      <text x="478" y="86" fontFamily="var(--font-mono)" fontSize="8.5" letterSpacing="1.2" fill="rgb(229 179 90)">
        SERVICE RECORD
      </text>
      {rows}
      {particles}
    </svg>
  );
}
