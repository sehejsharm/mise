import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import type { Pain } from "@/content/pains";
import { pains } from "@/content/pains";

/** Status quo → Impact chain → The wound → How Mise closes it. */
export default function PainAnatomy({ pain }: { pain: Pain }) {
  const next = pain.feeds ? pains.find((p) => p.slug === pain.feeds) : undefined;
  const prevIndex = pains.findIndex((p) => p.slug === pain.slug) - 1;
  const prev = prevIndex >= 0 ? pains[prevIndex] : undefined;
  return (
    <section aria-label={`Anatomy of the ${pain.name}`} className="mt-14">
      <ol className="grid gap-4 lg:grid-cols-3">
        <li className="rounded-2xl border border-line bg-surface/60 p-6">
          <p className="font-mono text-[0.72rem] tracking-[0.16em] text-faint uppercase">01 · Status quo</p>
          <p className="mt-3 text-[1rem] leading-relaxed text-ink">{pain.statusQuo}</p>
        </li>
        <li className="rounded-2xl border border-line bg-surface/60 p-6">
          <p className="font-mono text-[0.72rem] tracking-[0.16em] text-faint uppercase">02 · Impact chain</p>
          <ol className="mt-3 space-y-2">
            {pain.impactChain.map((step, i) => (
              <li key={step} className="flex gap-2.5 text-[0.95rem] leading-snug text-muted">
                <span className="mt-0.5 font-mono text-[0.72rem] text-coral-ink">{i + 1}</span>
                {step}
              </li>
            ))}
          </ol>
        </li>
        <li className="rounded-2xl border border-coral/35 bg-[linear-gradient(180deg,rgb(255_107_91/0.08),transparent)] p-6">
          <p className="font-mono text-[0.72rem] tracking-[0.16em] text-coral-ink uppercase">03 · The wound</p>
          <p className="mt-3 font-display text-[1.25rem] leading-snug text-ink">{pain.woundLong}</p>
        </li>
      </ol>

      <div className="mt-4 rounded-2xl border border-green/30 bg-[linear-gradient(180deg,rgb(79_197_158/0.07),transparent)] p-6 sm:p-8">
        <p className="font-mono text-[0.72rem] tracking-[0.16em] text-green-ink uppercase">04 · How Mise closes it</p>
        <ul className="mt-5 grid gap-6 md:grid-cols-3">
          {pain.closes.map((c) => (
            <li key={c.title}>
              <p className="flex items-center gap-2 font-display text-[1.08rem] font-semibold text-ink">
                <Icon name="check" size={17} className="text-green-ink" />
                {c.title}
              </p>
              <p className="mt-1.5 text-[0.95rem] leading-relaxed text-muted">{c.body}</p>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-5 text-[0.92rem]">
          <Link href={pain.solution.href} className="font-medium text-ink underline decoration-gold/60 underline-offset-4 hover:text-gold-ink">
            {pain.solution.label}
          </Link>
          <Link href={pain.pillar.href} className="font-medium text-ink underline decoration-gold/60 underline-offset-4 hover:text-gold-ink">
            {pain.pillar.label}
          </Link>
        </div>
      </div>

      <nav aria-label="The chain" className="mt-4 flex flex-col justify-between gap-3 text-[0.9rem] sm:flex-row">
        {prev ? (
          <Link href={`/problems/${prev.slug}`} className="text-muted hover:text-ink">
            ← Fed by: {prev.name}
          </Link>
        ) : (
          <span className="text-faint">The first link in the chain</span>
        )}
        {next ? (
          <Link href={`/problems/${next.slug}`} className="text-muted hover:text-ink">
            Feeds: {next.name} →
          </Link>
        ) : (
          <Link href="/problems" className="text-muted hover:text-ink">
            The last link. See the whole chain →
          </Link>
        )}
      </nav>
    </section>
  );
}
