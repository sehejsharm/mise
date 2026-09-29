import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/primitives";
import { fiveSeconds as c } from "@/content/home";

/**
 * Split-screen: five calls cascade and fail on the left; one filter on the
 * service record resolves on the right. Driven by the CSS reveal observer,
 * so it costs no JavaScript.
 */
export default function FiveSeconds() {
  return (
    <section aria-labelledby="five-seconds-title" className="relative py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading id="five-seconds-title" eyebrow={c.eyebrow} title={c.title} />
        <p
          data-reveal
          style={{ ["--reveal-delay" as string]: "140ms" }}
          className="mt-6 max-w-3xl font-display text-[clamp(1.3rem,2.6vw,1.85rem)] leading-snug text-ink"
        >
          “{c.question}”
        </p>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <div className="rounded-2xl border border-coral/25 bg-[linear-gradient(180deg,rgb(255_107_91/0.06),transparent)] p-6 sm:p-7">
            <p className="font-mono text-[0.72rem] tracking-[0.16em] text-coral-ink uppercase">{c.without.label}</p>
            <ol className="mt-5 space-y-2.5">
              {c.without.steps.map((s, n) => (
                <li
                  key={s.call}
                  data-reveal
                  style={{ ["--reveal-delay" as string]: `${120 + n * 160}ms` }}
                  className="flex items-center gap-3 rounded-xl border border-line bg-surface/70 px-4 py-3"
                >
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-coral/12 text-coral-ink" aria-hidden="true">
                    <Icon name={n === 4 ? "ledger" : "call"} size={15} />
                  </span>
                  <span className="min-w-0 flex-1 text-[0.95rem] text-ink">{s.call}</span>
                  <span
                    className={`shrink-0 text-right font-mono text-[0.74rem] ${n === 4 ? "font-medium text-coral-ink" : "text-muted"}`}
                  >
                    {s.result}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div
            data-reveal
            style={{ ["--reveal-delay" as string]: "900ms" }}
            className="relative overflow-hidden rounded-2xl border border-green/30 bg-[linear-gradient(180deg,rgb(61_220_151/0.07),transparent)] p-6 sm:p-7"
          >
            <p className="font-mono text-[0.72rem] tracking-[0.16em] text-green-ink uppercase">{c.with.label}</p>
            <div className="mt-5 flex items-center gap-3 rounded-xl border border-line-strong bg-surface px-4 py-3 font-mono text-[0.86rem] text-ink">
              <Icon name="search" size={16} className="text-muted" />
              <span>{c.with.filter}</span>
            </div>
            <dl className="mt-4 divide-y divide-line rounded-xl border border-line bg-surface/70">
              {c.with.record.map((r) => (
                <div key={r.k} className="flex items-center justify-between gap-4 px-4 py-3">
                  <dt className="font-mono text-[0.72rem] tracking-wide text-faint uppercase">{r.k}</dt>
                  <dd className="flex items-center gap-2 text-right text-[0.93rem] text-ink">
                    {r.v}
                    <Icon name="check" size={15} className="text-green-ink" />
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 font-display text-[1.2rem] font-medium text-green-ink">{c.with.verdict}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
