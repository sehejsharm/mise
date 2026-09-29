import type { SVGProps } from "react";

const paths = {
  arrowRight: "M5 12h14M13 6l6 6-6 6",
  arrowUpRight: "M7 17 17 7M8 7h9v9",
  check: "m5 12.5 4.2 4.2L19 7",
  close: "M6 6l12 12M18 6 6 18",
  menu: "M4 7h16M4 12h16M4 17h16",
  plus: "M12 5v14M5 12h14",
  minus: "M5 12h14",
  sun: "M12 4V2m0 20v-2m8-8h2M2 12h2m13.66-5.66 1.41-1.41M4.93 19.07l1.41-1.41m0-11.32L4.93 4.93m14.14 14.14-1.41-1.41M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z",
  moon: "M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z",
  globe: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 0c2.5 2.6 3.7 5.6 3.7 9s-1.2 6.4-3.7 9m0-18C9.5 5.6 8.3 8.6 8.3 12s1.2 6.4 3.7 9M3.5 9h17M3.5 15h17",
  signal: "M4 18v-2m5 2v-6m5 6V8m5 10V4",
  plug: "M9 3v5m6-5v5M7 8h10v3a5 5 0 0 1-10 0V8Zm5 8v5",
  plugOff: "M3 3l18 18M9 3v3m6-3v5M7 8h3m7 0v3a5 5 0 0 1-1.5 3.6M12 16v5",
  chip: "M8 3v3m8-3v3M8 18v3m8-3v3M3 8h3m-3 8h3m12-8h3m-3 8h3M7 6h10a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Z",
  camera: "M4 8h3l2-3h6l2 3h3v11H4V8Zm8 3a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z",
  lock: "M7 11V8a5 5 0 0 1 10 0v3M5 11h14v10H5V11Z",
  unlock: "M7 11V8a5 5 0 0 1 9.6-2M5 11h14v10H5V11Z",
  clock: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 4v5l3.5 2",
  book: "M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5v-15Zm0 15A2.5 2.5 0 0 0 6.5 23H20",
  ledger: "M5 4h14v16H5V4Zm4 4h6m-6 4h6m-6 4h4",
  phone: "M8 3h8a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm3 15h2",
  laptop: "M5 5h14v10H5V5Zm-2 12h18l-1 2H4l-1-2Z",
  mail: "M4 6h16v12H4V6Zm0 0 8 7 8-7",
  call: "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z",
  linkedin: "M6.5 9.5V18M6.5 6v.01M10.5 18v-5a3 3 0 0 1 6 0v5m-6-8.5V18",
  pause: "M8 5v14m8-14v14",
  play: "M7 5l12 7-12 7V5Z",
  search: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14Zm9 16-4-4",
  shield: "M12 3 5 6v6c0 4.2 3 7.7 7 9 4-1.3 7-4.8 7-9V6l-7-3Z",
  users: "M16 19v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1m6.5-9a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM21 19v-1a4 4 0 0 0-3-3.9M16 3.1a3.5 3.5 0 0 1 0 6.8",
  building: "M4 21V5l8-2v18m0 0h8V9l-8-2M8 8h.01M8 12h.01M8 16h.01M16 12h.01M16 16h.01",
  compass: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm3.5 5.5-2 5-5 2 2-5 5-2Z",
  spark: "M12 3v4m0 10v4M3 12h4m10 0h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6",
  whatsapp: "M4 20l1.3-3.9A8 8 0 1 1 8 19l-4 1Zm5-11.5c0 3.5 3 6.5 6.5 6.5l1-1.6-2-1-1 1a4 4 0 0 1-2.9-2.9l1-1-1-2L9 8.5Z",
  x: "M4 4l16 16M20 4 4 20",
  copy: "M9 9h11v11H9V9Zm-5 6V4h11",
  rss: "M5 5a14 14 0 0 1 14 14M5 11a8 8 0 0 1 8 8M6 18.5h.01",
  binder: "M6 3h12v18H6V3Zm3 0v18M12 8h4m-4 4h4",
  memory: "M9 18a6 6 0 1 1 6 0v3H9v-3Zm0-3h6",
  photos: "M4 5h16v14H4V5Zm0 11 5-5 4 4 3-3 4 4",
  calendar: "M5 5h14v15H5V5Zm0 5h14M9 3v4m6-4v4",
  chart: "M4 20V4m0 16h16M8 16l4-5 3 3 5-7",
  grid: "M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z",
} as const;

export type IconName = keyof typeof paths;

export function Icon({ name, size = 20, ...rest }: { name: IconName; size?: number } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <path d={paths[name]} />
    </svg>
  );
}
