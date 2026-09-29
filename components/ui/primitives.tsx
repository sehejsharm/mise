import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";

export function cx(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cx("container-page", className)}>{children}</div>;
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cx("eyebrow flex items-center gap-3", className)}>
      <span aria-hidden="true" className="inline-block h-px w-6 bg-gold" />
      {children}
    </p>
  );
}

/**
 * Section heading: a short creative eyebrow + a keyword-rich H2.
 * Lines passed as `lines` get the line-by-line reveal.
 */
export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  id,
  as: Tag = "h2",
  className,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
  id?: string;
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <div className={cx(align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl", className)}>
      {eyebrow ? (
        <div data-reveal className={align === "center" ? "flex justify-center" : undefined}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </div>
      ) : null}
      <Tag
        id={id}
        data-reveal
        style={{ ["--reveal-delay" as string]: "60ms" }}
        className="mt-4 text-[clamp(1.85rem,4.2vw,3.1rem)] leading-[1.06] font-semibold text-ink"
      >
        {title}
      </Tag>
      {lede ? (
        <p
          data-reveal
          style={{ ["--reveal-delay" as string]: "120ms" }}
          className={cx("mt-5 text-[1.05rem] leading-relaxed text-muted", align === "center" && "mx-auto max-w-2xl")}
        >
          {lede}
        </p>
      ) : null}
    </div>
  );
}

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "quiet";
  size?: "md" | "lg";
  className?: string;
  /** Location label for the demo_cta_click GA4 event (read by ClickTracker). */
  trackLocation?: string;
  arrow?: boolean;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  trackLocation,
  arrow,
  ...rest
}: ButtonProps) {
  const external = /^https?:/.test(href);
  const classes = cx(
    "group relative inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-[background,color,box-shadow,transform] duration-300 ease-(--ease-out-expo) select-none",
    size === "lg" ? "h-13 px-7 text-[1rem]" : "h-11 px-5 text-[0.93rem]",
    variant === "primary" &&
      "bg-gold text-on-gold shadow-[0_10px_40px_-12px_rgb(229_179_90/0.7)] hover:bg-[#eec27a] hover:shadow-[0_14px_50px_-10px_rgb(229_179_90/0.85)]",
    variant === "ghost" && "border border-line-strong text-ink hover:border-gold hover:text-gold-ink",
    variant === "quiet" && "px-0 text-ink hover:text-gold-ink",
    className,
  );
  const dataTrack =
    trackLocation && (href.startsWith("/demo") || href.startsWith("mailto:"))
      ? { "data-track": "demo_cta_click", "data-track-location": trackLocation }
      : {};
  const content = (
    <>
      {children}
      {arrow ? (
        <Icon name="arrowRight" size={17} className="transition-transform duration-300 group-hover:translate-x-0.5" />
      ) : null}
    </>
  );
  if (external) {
    return (
      <a href={href} className={classes} rel="noopener" target="_blank" {...dataTrack}>
        {content}
      </a>
    );
  }
  if (/^(mailto|tel):/.test(href)) {
    return (
      <a href={href} className={classes} {...dataTrack}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...dataTrack} {...rest}>
      {content}
    </Link>
  );
}

/** Descriptive inline link with an arrow, for "see how Mise closes it"-style links. */
export function ArrowLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={cx(
        "group inline-flex items-center gap-1.5 font-medium text-ink underline decoration-gold/60 decoration-1 underline-offset-4 transition-colors hover:text-gold-ink",
        className,
      )}
    >
      {children}
      <Icon name="arrowRight" size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
    </Link>
  );
}

export function Chip({ children, tone = "default" }: { children: ReactNode; tone?: "default" | "gold" | "green" | "cyan" | "coral" }) {
  const tones = {
    default: "border-line-strong text-muted",
    gold: "border-gold/40 text-gold-ink bg-gold-soft",
    green: "border-green/40 text-green-ink",
    cyan: "border-cyan/40 text-cyan-ink",
    coral: "border-coral/40 text-coral-ink",
  };
  return (
    <span className={cx("inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[0.72rem] tracking-wide", tones[tone])}>
      {children}
    </span>
  );
}

export function LiveDot({ tone = "green" }: { tone?: "green" | "cyan" | "gold" | "coral" }) {
  const color = { green: "bg-green", cyan: "bg-cyan", gold: "bg-gold", coral: "bg-coral" }[tone];
  return <span aria-hidden="true" className={cx("inline-block size-2 rounded-full animate-pulse-dot", color)} />;
}
