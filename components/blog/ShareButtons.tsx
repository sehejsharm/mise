"use client";
import { useState } from "react";
import { Icon } from "@/components/ui/Icon";

export default function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const links = [
    { label: "Share on LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`, icon: "linkedin" as const },
    { label: "Share on WhatsApp", href: `https://wa.me/?text=${t}%20${u}`, icon: "whatsapp" as const },
    { label: "Share on X", href: `https://twitter.com/intent/tweet?url=${u}&text=${t}`, icon: "x" as const },
  ];
  return (
    <div className="flex flex-wrap items-center gap-2">
      {links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noopener"
          aria-label={`${l.label} (opens in a new tab)`}
          className="grid size-10 place-items-center rounded-full border border-line-strong text-muted transition-colors hover:border-gold hover:text-gold-ink"
        >
          <Icon name={l.icon} size={17} />
        </a>
      ))}
      <button
        type="button"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          } catch {
            /* clipboard blocked */
          }
        }}
        className="inline-flex h-10 items-center gap-2 rounded-full border border-line-strong px-3.5 text-[0.85rem] text-muted transition-colors hover:border-gold hover:text-gold-ink"
      >
        <Icon name={copied ? "check" : "copy"} size={15} />
        <span aria-live="polite">{copied ? "Copied" : "Copy link"}</span>
      </button>
    </div>
  );
}
