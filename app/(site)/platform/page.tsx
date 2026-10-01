import type { Metadata } from "next";
import PageHero from "@/components/page/PageHero";
import { FaqList, FinalCta, JsonLd, RelatedLinks, TldrBox } from "@/components/ui/blocks";
import { LaptopFrame, PhoneFrame } from "@/components/ui/DeviceFrame";
import { Icon } from "@/components/ui/Icon";
import { Picture } from "@/components/ui/Picture";
import { ButtonLink, Eyebrow } from "@/components/ui/primitives";
import { platformFaqs, platformMeta, roleInterfaces } from "@/content/platform";
import { brand, demoProperty } from "@/content/site";
import { baseNodes, breadcrumbNode, faqNode, softwareNode, webPageNode, imageUrl } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(platformMeta);

const recordFields = [
  ["Standard & version", "ENG-402 Fault first response · v3"],
  ["Person", "Nimal Perera, duty technician"],
  ["Where", "Room 512 · AC complaint"],
  ["Time", "09:14 → 09:27 · 13 of 15 min"],
  ["Evidence", "Fixed + tested photo, step 5 (gated)"],
  ["Sign-off", "M. Silva · 09:30"],
];

export default function PlatformPage() {
  const crumbs = [{ name: "Platform", path: platformMeta.path }];
  return (
    <>
      <JsonLd
        nodes={[
          ...baseNodes(),
          softwareNode(),
          webPageNode({
            path: platformMeta.path,
            name: platformMeta.title,
            description: platformMeta.description,
            updated: platformMeta.updated,
            primaryImage: imageUrl("product/manager-overview"),
          }),
          breadcrumbNode(platformMeta.path, crumbs),
          faqNode(platformMeta.path, platformFaqs),
        ]}
      />
      <PageHero
        crumbs={crumbs}
        eyebrow="The platform"
        title={platformMeta.h1}
        updated={platformMeta.updated}
        lede={
          <p>
            Mise is hotel operations software built as three separate interfaces: a mobile staff app where SOPs run as
            timed tasks, a desktop manager dashboard where supervisors see the live floor, and a desktop standards
            workspace where standards are written and published. All three share one audit-ready service record. No PMS
            integration, no hardware.
          </p>
        }
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/demo" arrow trackLocation="platform-hero">
            Book a 15-min demo
          </ButtonLink>
          <ButtonLink href={brand.prototypeUrl} variant="ghost">
            Walk the live prototype
          </ButtonLink>
        </div>
      </PageHero>

      <div className="container-page">
        <div className="max-w-3xl">
          <TldrBox>
            Mise is a hotel SOP management system built for execution. Staff run standards as timed tasks on their own
            phones, with photo gates on key steps. Managers see readiness, exceptions and results on a desktop dashboard.
            Standards owners write and publish from a focused workspace. Every task writes to one service record.
          </TldrBox>
        </div>
        <nav aria-label="Interfaces" className="mt-10 flex flex-wrap gap-2">
          {[...roleInterfaces.map((r) => ({ id: r.id, label: r.keyword })), { id: "service-record", label: "Service record" }].map((l) => (
            <a key={l.id} href={`#${l.id}`} className="rounded-full border border-line-strong px-4 py-2 text-[0.9rem] text-muted hover:border-gold hover:text-ink">
              {l.label}
            </a>
          ))}
        </nav>
      </div>

      {roleInterfaces.map((role, idx) => (
        <section key={role.id} id={role.id} aria-labelledby={`${role.id}-title`} className="scroll-mt-24 py-20 sm:py-24">
          <div className="container-page">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
              <div className={idx % 2 ? "lg:order-2" : undefined}>
                <Eyebrow>
                  {role.name} · {role.posture.split(" · ")[0]}
                </Eyebrow>
                <h2 id={`${role.id}-title`} className="mt-4 text-[clamp(1.8rem,3.6vw,2.7rem)] leading-[1.08] font-semibold text-ink">
                  {role.headline}
                </h2>
                <p className="mt-4 text-[1.05rem] leading-relaxed text-muted">{role.summary}</p>
                <p className="mt-3 text-[0.95rem] text-faint">
                  <span className="text-muted">Who:</span> {role.who} <span className="text-muted">Demo persona:</span> {role.persona}.
                </p>
                <ul className="mt-8 grid gap-5 sm:grid-cols-2">
                  {role.capabilities.map((c) => (
                    <li key={c.title}>
                      <h3 className="flex items-center gap-2 font-display text-[1.02rem] font-semibold text-ink">
                        <Icon name="check" size={16} className="text-green-ink" />
                        {c.title}
                      </h3>
                      <p className="mt-1 text-[0.93rem] leading-relaxed text-muted">{c.body}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={idx % 2 ? "lg:order-1" : undefined}>
                {role.device === "phone" ? (
                  <div className="flex justify-center">
                    <PhoneFrame className="w-[min(300px,76vw)]">
                      <Picture image={role.screens[0].image} alt={idx === 0 ? "Mise hotel operations software: the staff app Today screen with Room 208 as the next timed task and 18 minutes left" : role.screens[0].alt} sizes="300px" priority={idx === 0} lead={idx === 0} />
                    </PhoneFrame>
                  </div>
                ) : (
                  <LaptopFrame>
                    <Picture image={role.screens[0].image} alt={role.screens[0].alt} sizes="(min-width: 1024px) 640px, 92vw" />
                  </LaptopFrame>
                )}
                <p className="mt-4 text-center font-mono text-[0.72rem] text-faint">
                  {role.screens[0].title} · {role.screens[0].caption} · {demoProperty.label}
                </p>
              </div>
            </div>

            {role.screens.length > 1 ? (
              <ul
                className={`mt-14 grid gap-6 ${role.device === "phone" ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5" : "sm:grid-cols-2 lg:grid-cols-4"}`}
                aria-label={`More ${role.keyword.toLowerCase()} screens`}
              >
                {role.screens.slice(1).map((s) => (
                  <li key={s.image}>
                    <figure>
                      {role.device === "phone" ? (
                        <PhoneFrame className="mx-auto w-full max-w-[200px] rounded-[1.9rem] p-[6px] [&>div:last-child]:rounded-[1.5rem]">
                          <Picture image={s.image} alt={s.alt} sizes="200px" />
                        </PhoneFrame>
                      ) : (
                        <LaptopFrame>
                          <Picture image={s.image} alt={s.alt} sizes="(min-width: 1024px) 300px, 45vw" />
                        </LaptopFrame>
                      )}
                      <figcaption className="mt-3 text-center">
                        <span className="block font-display text-[0.95rem] font-semibold text-ink">{s.title}</span>
                        <span className="block text-[0.82rem] text-muted">{s.caption}</span>
                      </figcaption>
                    </figure>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </section>
      ))}

      <section id="service-record" aria-labelledby="record-title" className="scroll-mt-24 py-20 sm:py-24">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <Eyebrow>Shared by all three</Eyebrow>
            <h2 id="record-title" className="mt-4 text-[clamp(1.8rem,3.6vw,2.7rem)] leading-[1.08] font-semibold text-ink">
              The service record: one audit trail for every department's SOPs
            </h2>
            <p className="mt-4 text-[1.05rem] leading-relaxed text-muted">
              Every timed task, in every department, writes one attributable entry. Managers use it to see readiness and
              exceptions live; staff see their own verified standards; audits filter and export it. Nobody compiles it,
              because the work writes it.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <ButtonLink href="/audit-readiness" variant="ghost">
                Hotel audit readiness
              </ButtonLink>
              <ButtonLink href="/how-it-works" variant="quiet" arrow>
                How the loop works
              </ButtonLink>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#122d35] p-6 text-[#f2f4ee] shadow-float">
            <p className="font-mono text-[0.7rem] tracking-[0.16em] text-[#e5b35a] uppercase">Service record entry · {demoProperty.label}</p>
            <dl className="mt-5 divide-y divide-white/10">
              {recordFields.map(([k, v]) => (
                <div key={k} className="flex flex-col justify-between gap-1 py-3 sm:flex-row sm:items-center">
                  <dt className="font-mono text-[0.72rem] tracking-wide text-[#a0b0ac] uppercase">{k}</dt>
                  <dd className="text-[0.95rem]">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <div className="container-page pb-20">
        <section aria-labelledby="platform-faq" className="max-w-3xl">
          <h2 id="platform-faq" className="font-display text-[clamp(1.5rem,2.6vw,2rem)] font-semibold text-ink">
            Hotel operations software: frequently asked questions
          </h2>
          <FaqList items={platformFaqs} className="mt-6" />
        </section>
        <div className="max-w-3xl">
          <RelatedLinks
            links={[
              { href: "/how-it-works", label: "How Mise works", note: "Standard → Timed task → Evidence → Service record." },
              { href: "/solutions", label: "Solutions by department", note: "Front office to engineering, one app." },
              { href: "/digital-sop", label: "Digitize hotel SOPs", note: "The step-by-step guide." },
              { href: "/security", label: "Security & data handling", note: "Google Cloud and Firebase, plainly stated." },
            ]}
          />
        </div>
      </div>
      <FinalCta location="platform" />
    </>
  );
}
