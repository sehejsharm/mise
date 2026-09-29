/**
 * The hero's isometric floor plan, drawn as SVG. It is the poster for the 3D
 * scene and the permanent visual for low-power devices, Save-Data and reduced
 * motion. Rooms light gold in sequence as their tasks close, and evidence
 * particles stream into the service-record column on the right.
 */
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

// Deterministic "closing order" so SSR and client agree.
const order = Array.from({ length: COLS * ROWS }, (_, k) => k).sort(
  (a, b) => ((a * 37) % 43) - ((b * 37) % 43),
);
const closeIndex = new Map(order.map((room, idx) => [room, idx]));

export default function IsoPoster({ animate = true }: { animate?: boolean }) {
  const rooms = [];
  for (let j = 0; j < ROWS; j++) {
    for (let i = 0; i < COLS; i++) {
      const k = j * COLS + i;
      const { x, y } = iso(i, j);
      const inset = 3;
      const top = `${x},${y + inset} ${x + W / 2 - inset},${y + H / 2} ${x},${y + H - inset} ${x - W / 2 + inset},${y + H / 2}`;
      const left = `${x - W / 2 + inset},${y + H / 2} ${x},${y + H - inset} ${x},${y + H - inset + DEPTH} ${x - W / 2 + inset},${y + H / 2 + DEPTH}`;
      const right = `${x + W / 2 - inset},${y + H / 2} ${x},${y + H - inset} ${x},${y + H - inset + DEPTH} ${x + W / 2 - inset},${y + H / 2 + DEPTH}`;
      const idx = closeIndex.get(k) ?? 0;
      const lit = idx < 26; // most rooms close during the loop; a few stay pending
      const blocked = k === 17 || k === 30;
      const delay = (idx * 0.34).toFixed(2);
      rooms.push(
        <g key={k}>
          <polygon points={left} fill="var(--iso-side-l)" />
          <polygon points={right} fill="var(--iso-side-r)" />
          <polygon
            points={top}
            fill={blocked ? "rgb(255 107 91 / 0.55)" : "var(--iso-room)"}
            stroke="var(--iso-stroke)"
            strokeWidth="0.8"
            style={
              lit && !blocked && animate
                ? { animation: `room-glow 14s ${delay}s var(--ease-out-expo) infinite` }
                : lit && !blocked
                  ? { fill: "var(--gold)" }
                  : undefined
            }
          />
        </g>,
      );
    }
  }

  // Particles: from a handful of rooms toward the record column.
  const column = { x: 505, y: 92 };
  const particles = [3, 9, 15, 22, 27, 33, 38, 11, 25, 40].map((k, n) => {
    const i = k % COLS;
    const j = Math.floor(k / COLS);
    const { x, y } = iso(i, j);
    const sx = x;
    const sy = y + H / 2;
    const dx = column.x - sx;
    const dy = column.y + (n % 5) * 34 - sy;
    return (
      <circle
        key={k}
        cx={sx}
        cy={sy}
        r={2.2}
        fill={n % 3 === 0 ? "var(--cyan)" : "var(--gold)"}
        style={
          animate
            ? ({
                ["--dx" as string]: `${dx}px`,
                ["--dy" as string]: `${dy}px`,
                animation: `stream-up 3.6s ${(n * 0.55).toFixed(2)}s cubic-bezier(0.4,0,0.2,1) infinite`,
                opacity: 0,
              } as React.CSSProperties)
            : { opacity: 0 }
        }
      />
    );
  });

  const rows = Array.from({ length: 7 }, (_, n) => (
    <g key={n} transform={`translate(478 ${96 + n * 30})`}>
      <rect width="92" height="20" rx="4" fill="var(--iso-row)" stroke="var(--iso-stroke)" strokeWidth="0.8" />
      <circle cx="10" cy="10" r="3" fill={n === 2 ? "var(--coral)" : "var(--green)"} />
      <rect x="20" y="7" width={36 + ((n * 13) % 24)} height="2.5" rx="1.25" fill="var(--iso-text)" />
      <rect x="20" y="12" width={22 + ((n * 7) % 18)} height="2" rx="1" fill="var(--iso-text-dim)" />
    </g>
  ));

  return (
    <svg
      viewBox="0 0 600 340"
      className="h-auto w-full [--iso-room:rgb(56_225_255/0.07)] [--iso-row:rgb(11_19_40/0.9)] [--iso-side-l:rgb(12_22_48)] [--iso-side-r:rgb(9_16_36)] [--iso-stroke:rgb(56_225_255/0.28)] [--iso-text:rgb(238_242_250/0.55)] [--iso-text-dim:rgb(238_242_250/0.25)]"
      role="img"
      aria-label="Isometric hotel floor plan: rooms light up gold as their timed tasks close, and evidence streams into the service record"
    >
      <defs>
        <linearGradient id="col" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="rgb(212 169 79 / 0.35)" />
          <stop offset="1" stopColor="rgb(212 169 79 / 0)" />
        </linearGradient>
        <radialGradient id="floorGlow" cx="0.45" cy="0.45" r="0.6">
          <stop offset="0" stopColor="rgb(56 225 255 / 0.14)" />
          <stop offset="1" stopColor="rgb(56 225 255 / 0)" />
        </radialGradient>
      </defs>
      <ellipse cx="250" cy="170" rx="250" ry="130" fill="url(#floorGlow)" />
      {rooms}
      <rect x="470" y="70" width="108" height="250" rx="10" fill="url(#col)" stroke="rgb(212 169 79 / 0.45)" strokeWidth="1" />
      <text x="478" y="86" fontFamily="var(--font-mono)" fontSize="8.5" letterSpacing="1.2" fill="rgb(212 169 79)">
        SERVICE RECORD
      </text>
      {rows}
      {particles}
    </svg>
  );
}
