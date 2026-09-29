export function LogoMark({ size = 30, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" className={className}>
      <rect width="32" height="32" rx="8" fill="#D4A94F" />
      <path
        d="M8.5 22.5V11l7.5 7.5 7.5-7.5v11.5"
        fill="none"
        stroke="#060B18"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="7.6" r="1.7" fill="#060B18" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <LogoMark />
      <span className="font-display text-[1.35rem] font-semibold tracking-[-0.03em] text-ink">Mise</span>
    </span>
  );
}
