import Link from "next/link";
import Tilt from "@/components/fx/Tilt";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Picture } from "@/components/ui/Picture";
import { ArrowLink, SectionHeading } from "@/components/ui/primitives";
import { foundersCentered } from "@/content/site";
import { runsOn, whoFor } from "@/content/home";
import type { Advisor } from "@/lib/advisors";

export function RunsOn() {
  return (
    <section aria-labelledby="runs-title" className="relative py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading id="runs-title" eyebrow={runsOn.eyebrow} title={runsOn.title} />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {runsOn.tiles.map((t, i) => (
            <li
              key={t.title}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}
              className="rounded-2xl border border-line bg-surface/60 p-6"
            >
              <span className="grid size-11 place-items-center rounded-xl border border-gold/40 bg-gold-soft text-gold-ink">
                <Icon name={t.icon as IconName} size={21} />
              </span>
              <h3 className="mt-5 font-display text-[1.15rem] font-semibold text-ink">{t.title}</h3>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function WhoFor() {
  const icons: IconName[] = ["users", "building", "book", "grid"];
  return (
    <section aria-labelledby="who-title" className="relative py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading id="who-title" eyebrow={whoFor.eyebrow} title={whoFor.title} />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {whoFor.cards.map((card, i) => (
            <li key={card.href} data-reveal style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}>
              <Tilt className="h-full rounded-2xl">
                <Link
                  href={card.href}
                  className="group flex h-full flex-col rounded-2xl border border-line bg-surface/60 p-6 transition-colors hover:border-gold/50"
                >
                  <Icon name={icons[i]} size={22} className="text-gold-ink" />
                  <h3 className="mt-5 font-display text-[1.2rem] font-semibold text-ink">{card.who}</h3>
                  <p className="mt-1.5 flex-1 text-[0.95rem] text-muted">{card.line}</p>
                  <Icon name="arrowRight" size={18} className="mt-5 text-gold-ink transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Tilt>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function PeoplePreview({ advisors }: { advisors: Advisor[] }) {
  return (
    <section aria-labelledby="people-title" className="relative py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading id="people-title" eyebrow="The people behind it" title="Mise founders and advisory board" />
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {foundersCentered.map((f, i) => (
            <li key={f.slug} data-reveal style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}>
              <Link href={`/team/${f.slug}`} className="group block overflow-hidden rounded-2xl border border-line bg-surface/60">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Picture
                    image={f.photo}
                    alt={`${f.name}, ${f.role} of Mise`}
                    sizes="(min-width: 768px) 30vw, 92vw"
                    imgClassName="h-full object-cover grayscale contrast-[1.05] transition-[filter,transform] duration-700 ease-(--ease-out-expo) group-hover:scale-[1.03] group-hover:grayscale-0"
                    className="block h-full"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-[linear-gradient(180deg,rgb(18_45_53/0.1),rgb(12_35_41/0.85)),linear-gradient(135deg,rgb(229_179_90/0.35),rgb(174_223_210/0.15))] mix-blend-multiply transition-opacity duration-700 group-hover:opacity-40"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="font-mono text-[0.7rem] tracking-[0.14em] text-[#e5b35a] uppercase">{f.role}</p>
                    <h3 className="mt-1 font-display text-[1.4rem] font-semibold text-[#f2f4ee]">{f.name}</h3>
                  </div>
                </div>
                <p className="p-5 text-[0.95rem] leading-relaxed text-muted">“{f.thesis}”</p>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-col gap-6 rounded-2xl border border-line p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="eyebrow">Advisory board</p>
            <ul className="mt-3 flex flex-wrap gap-x-8 gap-y-3">
              {advisors.map((a) => (
                <li key={a.slug} className="flex items-center gap-3">
                  {a.photo ? (
                    <span className="block size-11 overflow-hidden rounded-full">
                      <Picture image={a.photo} alt={`${a.name}, Mise advisory board`} sizes="44px" imgClassName="h-full object-cover grayscale" className="block h-full" />
                    </span>
                  ) : null}
                  <span>
                    <span className="block font-display text-[1.02rem] font-semibold text-ink">{a.name}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex shrink-0 flex-col gap-2">
            <ArrowLink href="/advisors">Meet the Mise advisory board</ArrowLink>
          </div>
        </div>
      </div>
    </section>
  );
}
