import Link from "next/link";

/**
 * The blog before its first post: a kitchen ticket for the blog itself,
 * still at mise en place. Pure CSS motion; static under reduced motion.
 */
const prep = [
  { label: "Knives sharpened", done: true },
  { label: "Stations wiped, twice", done: true },
  { label: "Every claim sourced and linked", done: true },
  { label: "First article plated", done: false },
  { label: "Supervisor sign-off", done: false },
];

export default function BlogEmpty() {
  return (
    <section aria-labelledby="blog-empty-title" className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
      <div>
        <p className="eyebrow">Nothing on the pass yet</p>
        <h2
          id="blog-empty-title"
          className="mt-4 font-display text-[clamp(1.8rem,3.6vw,2.8rem)] leading-[1.05] font-semibold text-ink"
        >
          The Mise blog is still at <span className="text-gradient-gold">mise en place.</span>
        </h2>
        <p className="mt-5 max-w-xl text-[1.05rem] leading-relaxed text-muted">
          Stations are set, knives are sharp, and the first articles are being plated. We hold them to the
          same rule as every room on every shift: nothing leaves the kitchen until it&apos;s five-star.
        </p>
        <p className="mt-4 max-w-xl text-[1.05rem] leading-relaxed text-muted">
          Hungry now? The guides below are already served.
        </p>
        <ul className="mt-7 flex flex-wrap gap-3">
          {[
            { href: "/digital-sop", label: "Digital SOPs, explained" },
            { href: "/problems/ghost-sop", label: "The ghost SOP" },
            { href: "/audit-readiness", label: "Audit readiness" },
            { href: "/glossary", label: "The Mise glossary" },
          ].map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="inline-flex rounded-full border border-line-strong px-4 py-2 text-[0.92rem] text-ink transition-colors hover:border-gold hover:text-gold-ink"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="relative mx-auto w-full max-w-sm">
        {/* Ticket rail */}
        <div aria-hidden="true" className="absolute -top-3 right-6 left-6 h-2 rounded-full bg-line-strong" />
        <article
          aria-label="Blog launch ticket"
          className="blog-ticket relative rounded-b-2xl border border-line bg-surface px-6 pt-7 pb-6 shadow-float [clip-path:polygon(0_0,4%_2%,8%_0,12%_2%,16%_0,20%_2%,24%_0,28%_2%,32%_0,36%_2%,40%_0,44%_2%,48%_0,52%_2%,56%_0,60%_2%,64%_0,68%_2%,72%_0,76%_2%,80%_0,84%_2%,88%_0,92%_2%,96%_0,100%_2%,100%_100%,0_100%)]"
        >
          <div className="flex items-baseline justify-between font-mono text-[0.72rem] tracking-[0.14em] text-faint uppercase">
            <span>Order #001</span>
            <span>Table: Blog</span>
          </div>
          <p className="mt-4 font-display text-[1.35rem] font-semibold text-ink">
            Timed task · First article
          </p>
          <div className="mt-3 flex items-center gap-2 font-mono text-[0.78rem] text-gold-ink">
            <span className="blog-ticket-dot size-2 rounded-full bg-gold" />
            In prep · target time: worth the wait
          </div>
          <ul className="mt-5 space-y-2.5">
            {prep.map((p, i) => (
              <li key={p.label} className="flex items-center gap-3 text-[0.95rem]">
                <span
                  aria-hidden="true"
                  className={`grid size-5 shrink-0 place-items-center rounded-md border text-[0.7rem] ${
                    p.done
                      ? "border-green/60 bg-green/15 text-green-ink"
                      : "border-line-strong text-transparent"
                  }`}
                  style={p.done ? { animationDelay: `${i * 180}ms` } : undefined}
                >
                  ✓
                </span>
                <span className={p.done ? "text-muted line-through decoration-line-strong" : "text-ink"}>
                  {p.label}
                  <span className="sr-only">{p.done ? " (done)" : " (to do)"}</span>
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-6 border-t border-dashed border-line-strong pt-4 font-mono text-[0.72rem] leading-relaxed text-faint">
            Chef&apos;s note: no filler, no fluff, no &ldquo;10 hacks&rdquo;. Evidence attached or it goes
            back.
          </div>
        </article>
      </div>
    </section>
  );
}
