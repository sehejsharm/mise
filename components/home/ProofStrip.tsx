import PauseMotion from "@/components/fx/PauseMotion";
import { clients } from "@/content/site";

/**
 * Hospitality clients as a slow grayscale-to-colour marquee. Official logos are
 * pending (TODO(sehej) in content/site.ts); until then each client renders as a
 * typographic wordmark, which keeps the name in the HTML for crawlers.
 */
export default function ProofStrip() {
  const items = [...clients, ...clients, ...clients];
  return (
    <section aria-labelledby="proof-title" className="relative border-y border-line bg-surface/30 py-10">
      <div className="container-page flex flex-col gap-8 lg:flex-row lg:items-center">
        <h2 id="proof-title" className="sr-only">
          Hospitality clients
        </h2>
        <PauseMotion label="client names" className="relative min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
          <ul className="animate-marquee flex w-max items-center gap-14 pr-14 [--marquee-duration:34s]">
            {[...items, ...items].map((c, n) => (
              <li
                key={`${c.name}-${n}`}
                aria-hidden={n >= clients.length ? true : undefined}
                className="group flex items-baseline gap-3 whitespace-nowrap grayscale transition duration-500 hover:grayscale-0"
              >
                <span className="font-display text-[1.45rem] font-semibold tracking-[-0.02em] text-muted transition-colors duration-500 group-hover:text-gold-ink">
                  {c.name}
                </span>
                <span className="font-mono text-[0.7rem] tracking-wide text-faint uppercase">{c.segment}</span>
              </li>
            ))}
          </ul>
        </PauseMotion>
      </div>
      <div className="container-page mt-8">
        <ul className="flex flex-wrap gap-2.5" aria-label="Deployment facts">
          {["0 integrations required", "Any phone", "1-property pilot"].map((chip) => (
            <li
              key={chip}
              className="rounded-full border border-line-strong px-3.5 py-1.5 font-mono text-[0.74rem] tracking-wide text-muted"
            >
              {chip}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
