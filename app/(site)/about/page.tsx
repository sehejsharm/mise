import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/page/PageHero";
import { FinalCta, JsonLd, TldrBox } from "@/components/ui/blocks";
import { Icon } from "@/components/ui/Icon";
import { Picture } from "@/components/ui/Picture";
import { Eyebrow } from "@/components/ui/primitives";
import { LogoMark } from "@/components/site/Logo";
import { brand, contact, founders } from "@/content/site";
import { getAdvisors } from "@/lib/advisors";
import { advisorNode, baseNodes, breadcrumbNode, founderNode, ids, softwareNode, webPageNode } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { aboutMeta } from "@/content/meta";
import manifest from "@/lib/images.manifest.json";

const meta = aboutMeta;

export const metadata: Metadata = buildMetadata(meta);

const principles = [
  {
    title: "Subtraction first",
    body: "Removing a feature is a feature. Every screen has to help someone finish the task in front of them, or it goes. Authoring is a form, not a page builder, on purpose.",
  },
  {
    title: "Built for the 340px screen held in one hand",
    body: "The staff app is designed for one thumb, a budget Android phone, mobile data and bright daylight. If it does not work there, it does not work. Managers and standards owners get their own desktop tools instead of a compromise.",
  },
  {
    title: "Evidence over anecdote",
    body: "A standard that leaves no trace cannot be managed, coached or defended in an audit. Proof is a gate inside the task, not a report assembled afterwards.",
  },
];

const boilerplate = `${brand.definition} Mise is built by Focus Realm and founded by Sehej Sharma, Ali Electricwala and Aditya Mishra. Its name comes from mise en place, the kitchen discipline of having everything in its place before service starts.`;

type ManifestEntry = { src: string };

export default function AboutPage() {
  const crumbs = [{ name: "About", path: "/about" }];
  const advisors = getAdvisors();
  return (
    <>
      <JsonLd
        nodes={[
          ...baseNodes(),
          softwareNode(),
          webPageNode({ path: "/about", name: meta.title, description: meta.description, updated: meta.updated, kind: "AboutPage", about: ids.org }),
          breadcrumbNode("/about", crumbs),
          ...founders.map(founderNode),
          ...advisors.map(advisorNode),
        ]}
      />
      <PageHero
        crumbs={crumbs}
        eyebrow={meta.eyebrow ?? ""}
        title={meta.h1}
        updated={meta.updated}
        lede={
          <p>
            Mise hospitality exists because hotels do not have a documentation problem. They have an execution problem.
            The standards are written; the question is whether they run on this shift, in this room, and whether anyone
            can prove it. Mise by Focus Realm is built to answer that question.
          </p>
        }
      />

      <div className="container-page pb-6">
        <div className="max-w-3xl">
          <TldrBox label="In one paragraph">{brand.definition}</TldrBox>
        </div>
      </div>

      <section aria-labelledby="story" className="py-16">
        <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Eyebrow>The story</Eyebrow>
            <h2 id="story" className="mt-4 text-[clamp(1.8rem,3.4vw,2.6rem)] leading-[1.08] font-semibold text-ink">
              Why hotels need execution, not more documents
            </h2>
          </div>
          <div className="prose-mise max-w-2xl">
            <p>
              Every hotel we met had standards. Many had excellent ones: sequenced, photographed, signed off. And almost
              every one of them had the same gap. Between the binder and the floor, the standard turned into whatever the
              most senior person on shift did. Supervisors spent their days walking corridors to check work nobody had
              recorded. Audits meant a week of rebuilding evidence that should have existed already.
            </p>
            <p>
              More documents did not fix that. More sessions did not fix it either. What was missing was a way for the
              standard to <strong>run</strong>: to be the task a room attendant is doing right now, on the phone in their
              hand, with the proof captured as part of the work.
            </p>
            <p>
              So that is what we built. A standard in Mise is written once, arrives as a timed task, will not close its
              key steps without a photo, and writes an attributable line to the property's service record every time it
              is completed. One loop, <strong>Standard → Timed task → Evidence → Service record</strong>, underneath
              everything else.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="name" className="py-16">
        <div className="container-page">
          <div className="relative overflow-hidden rounded-[1.6rem] border border-gold/30 bg-[linear-gradient(140deg,rgb(212_169_79/0.14),transparent_60%)] p-8 sm:p-12">
            <Eyebrow>The name</Eyebrow>
            <h2 id="name" className="mt-4 max-w-3xl text-[clamp(1.8rem,3.4vw,2.6rem)] leading-[1.08] font-semibold text-ink">
              Mise, from <em className="text-gold-ink not-italic">mise en place</em>
            </h2>
            <p className="mt-5 max-w-2xl text-[1.1rem] leading-relaxed text-muted">{brand.nameOrigin}</p>
            <p className="mt-4 max-w-2xl text-[1rem] leading-relaxed text-muted">
              In a professional kitchen, mise en place is what lets a team deliver the same dish to the same standard under
              pressure. Everything is prepared, positioned and checked before the first order arrives. {brand.tagline}
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="principles" className="py-16">
        <div className="container-page">
          <Eyebrow>How we build</Eyebrow>
          <h2 id="principles" className="mt-4 text-[clamp(1.8rem,3.4vw,2.6rem)] leading-[1.08] font-semibold text-ink">
            Three principles we keep
          </h2>
          <ol className="mt-10 grid gap-4 md:grid-cols-3">
            {principles.map((p, i) => (
              <li key={p.title} className="rounded-2xl border border-line bg-surface/60 p-6">
                <span className="font-mono text-[0.78rem] text-gold-ink">0{i + 1}</span>
                <h3 className="mt-3 font-display text-[1.2rem] leading-snug font-semibold text-ink">{p.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="founders" aria-labelledby="founders-title" className="scroll-mt-24 py-16">
        <div className="container-page">
          <Eyebrow>Founders</Eyebrow>
          <h2 id="founders-title" className="mt-4 text-[clamp(1.8rem,3.4vw,2.6rem)] leading-[1.08] font-semibold text-ink">
            The founders of Mise
          </h2>
          <ul className="mt-10 grid gap-5 md:grid-cols-3">
            {founders.map((f) => (
              <li key={f.slug} className="overflow-hidden rounded-2xl border border-line bg-surface/60">
                <Link href={`/team/${f.slug}`} className="group block">
                  <div className="aspect-[4/5] overflow-hidden">
                    <Picture
                      image={f.photo}
                      alt={`${f.name}, ${f.role} of Mise`}
                      sizes="(min-width: 768px) 30vw, 92vw"
                      className="block h-full"
                      imgClassName="h-full object-cover grayscale transition-[filter] duration-700 group-hover:grayscale-0"
                    />
                  </div>
                  <div className="p-5">
                    <p className="font-mono text-[0.7rem] tracking-[0.14em] text-gold-ink uppercase">{f.role}</p>
                    <h3 className="mt-1 font-display text-[1.3rem] font-semibold text-ink">{f.name}</h3>
                    <p className="mt-2 text-[0.92rem] text-muted">{f.focus.join(" · ")}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="advisors-title" className="py-16">
        <div className="container-page">
          <Eyebrow>Advisory board</Eyebrow>
          <h2 id="advisors-title" className="mt-4 text-[clamp(1.8rem,3.4vw,2.6rem)] leading-[1.08] font-semibold text-ink">
            Advisors who know the floor
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {advisors.map((a) => (
              <li key={a.slug} className="flex items-center gap-4 rounded-2xl border border-line bg-surface/60 p-4">
                {a.photo ? (
                  <span className="block size-20 shrink-0 overflow-hidden rounded-xl">
                    <Picture image={a.photo} alt={`${a.name}, Mise advisory board`} sizes="80px" className="block h-full" imgClassName="h-full object-cover" />
                  </span>
                ) : null}
                <span>
                  <span className="block font-display text-[1.1rem] font-semibold text-ink">{a.name}</span>
                  {a.title ? <span className="block text-[0.9rem] text-muted">{a.title}</span> : null}
                </span>
              </li>
            ))}
          </ul>
          <Link href="/advisors" className="mt-6 inline-flex items-center gap-1.5 font-medium text-ink underline decoration-gold/60 underline-offset-4 hover:text-gold-ink">
            Meet the Mise advisory board <Icon name="arrowRight" size={15} />
          </Link>
        </div>
      </section>

      <section aria-labelledby="parent" className="py-16">
        <div className="container-page">
          <div className="flex flex-col gap-6 rounded-2xl border border-line p-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-2xl">
              <Eyebrow>A Focus Realm company</Eyebrow>
              <h2 id="parent" className="mt-3 font-display text-[1.6rem] font-semibold text-ink">
                Mise is built by Focus Realm
              </h2>
              <p className="mt-3 text-[1rem] leading-relaxed text-muted">
                Focus Realm is the parent company behind Mise. Mise is its hospitality platform, with its own name,
                product and team focus. Mise is not affiliated with Focus Softnet or its Focus e-RMS product.
              </p>
            </div>
            <a href={brand.parent.url} rel="noopener" target="_blank" className="inline-flex shrink-0 items-center gap-2 rounded-full border border-line-strong px-5 py-3 text-[0.94rem] text-ink hover:border-gold">
              Visit Focus Realm <Icon name="arrowUpRight" size={15} />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>
      </section>

      <section id="media-kit" aria-labelledby="media-title" className="scroll-mt-24 py-16">
        <div className="container-page">
          <Eyebrow>Press</Eyebrow>
          <h2 id="media-title" className="mt-4 text-[clamp(1.8rem,3.4vw,2.6rem)] leading-[1.08] font-semibold text-ink">
            Media kit
          </h2>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            <div className="rounded-2xl border border-line bg-surface/60 p-6">
              <div className="flex items-center gap-3">
                <LogoMark size={40} />
                <span className="font-display text-[1.5rem] font-semibold text-ink">Mise</span>
              </div>
              <h3 className="mt-5 font-display text-[1.1rem] font-semibold text-ink">Logo pack</h3>
              <p className="mt-1 text-[0.92rem] text-muted">SVG and PNG, light and dark, plus the mark on its own.</p>
              <a href="/brand/mise-logo-pack.zip" download className="mt-4 inline-flex items-center gap-2 font-medium text-gold-ink hover:text-ink">
                Download the Mise logo pack (ZIP) <Icon name="arrowRight" size={15} />
              </a>
            </div>
            <div className="rounded-2xl border border-line bg-surface/60 p-6">
              <h3 className="font-display text-[1.1rem] font-semibold text-ink">Boilerplate</h3>
              <p className="mt-3 text-[0.92rem] leading-relaxed text-muted">{boilerplate}</p>
              <p className="mt-3 text-[0.85rem] text-faint">
                Press contact:{" "}
                <a href={`mailto:${contact.email}`} data-track-location="media-kit" className="text-ink underline decoration-gold/60 underline-offset-4">
                  {contact.email}
                </a>
              </p>
            </div>
            <div className="rounded-2xl border border-line bg-surface/60 p-6">
              <h3 className="font-display text-[1.1rem] font-semibold text-ink">Founder headshots</h3>
              <ul className="mt-3 space-y-2 text-[0.92rem]">
                {founders.map((f) => (
                  <li key={f.slug}>
                    <a
                      href={(manifest as Record<string, ManifestEntry>)[f.photo].src}
                      download
                      className="text-ink underline decoration-gold/60 underline-offset-4 hover:text-gold-ink"
                    >
                      {f.name}, {f.role} (WebP)
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <FinalCta location="about" />
    </>
  );
}
