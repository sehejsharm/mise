import type { Metadata } from "next";
import BookingEmbed from "@/components/forms/BookingEmbed";
import DemoForm from "@/components/forms/DemoForm";
import { Breadcrumbs, FaqList, JsonLd, RelatedLinks } from "@/components/ui/blocks";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Eyebrow } from "@/components/ui/primitives";
import { contact } from "@/content/site";
import { baseNodes, breadcrumbNode, faqNode, webPageNode } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { demoMeta } from "@/content/meta";

const meta = demoMeta;

export const metadata: Metadata = buildMetadata(meta);

const seeItems: { icon: IconName; title: string; body: string }[] = [
  { icon: "phone", title: "Three interfaces on a live demo property", body: "The staff app, manager dashboard and standards workspace, running on Aurora Grand Colombo." },
  { icon: "clock", title: "One of your SOPs as a timed task", body: "Bring a standard nobody follows. We turn it into steps, a target time and photo gates while you watch." },
  { icon: "building", title: "How a one-property pilot is scoped", body: "Which department, which standards, what the first weeks of evidence look like, and what it costs." },
];

const next = [
  { title: "You send the form", body: "Takes under a minute. No sales sequence." },
  { title: "We fix a time", body: "A founder replies to set up 15 minutes that suit your shift." },
  { title: "You see it on a real shift", body: "No feature tour. Your standard, your questions." },
];

const faqs = [
  { q: "What happens in the 15-minute demo?", a: "We show the three Mise interfaces on a live demo property, convert one of your SOPs into a timed task with steps, a target time and photo gates, and explain how a one-property pilot is scoped for your hotel." },
  { q: "Do I need to prepare anything?", a: "Only if you want to: bring one SOP you would like to see running as a timed task. There is nothing to install and no PMS access needed." },
  { q: "Who should join the demo?", a: "Whoever owns service standards and their outcomes: a GM, HR Director, L&D or quality lead, or a rooms division head. One person is enough to start." },
  { q: "Is there a cost for the demo?", a: "No. The demo is free. Pilots are scoped per property, and pricing is agreed after the demo rather than from a rate card." },
];

export default function DemoPage() {
  const crumbs = [{ name: "Book a demo", path: "/demo" }];
  return (
    <>
      <JsonLd
        nodes={[
          ...baseNodes(),
          webPageNode({ path: meta.path, name: meta.title, description: meta.description, updated: meta.updated }),
          breadcrumbNode(meta.path, crumbs),
          faqNode(meta.path, faqs),
        ]}
      />
      <section className="relative overflow-hidden pt-28 pb-20 sm:pt-36">
        <div aria-hidden="true" className="grid-lines pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_20%_0%,#000_10%,transparent_60%)]" />
        <div className="container-page relative grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <div>
            <Breadcrumbs items={crumbs} />
            <div className="mt-8">
              <Eyebrow>15 minutes · no feature tour</Eyebrow>
            </div>
            <h1 className="mt-5 text-[clamp(2.3rem,5vw,3.8rem)] leading-[1.02] font-semibold tracking-[-0.035em] text-ink">{meta.h1}</h1>
            <p className="mt-5 max-w-xl text-[1.1rem] leading-relaxed text-muted">
              See Mise, the SOP app for hotels, running on a real shift in the department you choose. Short, specific, and about your
              standards rather than our slides.
            </p>
            <section id="what-you-see" aria-labelledby="see-title" className="mt-10 scroll-mt-28">
              <h2 id="see-title" className="font-display text-[1.3rem] font-semibold text-ink">
                What you'll see in 15 minutes
              </h2>
              <ul className="mt-5 space-y-4">
                {seeItems.map((s) => (
                  <li key={s.title} className="flex gap-4">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-gold/40 bg-gold-soft text-gold-ink">
                      <Icon name={s.icon} size={19} />
                    </span>
                    <span>
                      <span className="block font-medium text-ink">{s.title}</span>
                      <span className="block text-[0.95rem] text-muted">{s.body}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </section>
            <p className="mt-10 text-[0.95rem] text-muted">
              Prefer to talk first? Email{" "}
              <a href={`mailto:${contact.email}`} data-track-location="demo-page" className="text-ink underline decoration-gold/60 underline-offset-4">
                {contact.email}
              </a>{" "}
              or call{" "}
              <a href={contact.phoneHref} data-track-location="demo-page" className="text-ink underline decoration-gold/60 underline-offset-4">
                {contact.phone}
              </a>
              .
            </p>
          </div>
          <div className="space-y-6">
            <DemoForm bookingUrl={contact.bookingUrl || undefined} />
            {contact.bookingUrl ? (
              <div>
                <p className="mb-3 font-display text-[1.1rem] font-semibold text-ink">Or pick a time now</p>
                <BookingEmbed url={contact.bookingUrl} location="demo-inline" />
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section aria-labelledby="next-title" className="py-16">
        <div className="container-page">
          <h2 id="next-title" className="font-display text-[clamp(1.6rem,3vw,2.2rem)] font-semibold text-ink">
            What happens next
          </h2>
          <ol className="mt-8 grid gap-4 md:grid-cols-3">
            {next.map((s, i) => (
              <li key={s.title} className="rounded-2xl border border-line bg-surface/60 p-6">
                <span className="font-mono text-[0.8rem] text-gold-ink">0{i + 1}</span>
                <h3 className="mt-2 font-display text-[1.15rem] font-semibold text-ink">{s.title}</h3>
                <p className="mt-1.5 text-[0.95rem] text-muted">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="demo-faq" className="py-16 pb-24">
        <div className="container-page max-w-3xl">
          <h2 id="demo-faq" className="font-display text-[clamp(1.6rem,3vw,2.2rem)] font-semibold text-ink">
            Demo questions
          </h2>
          <FaqList items={faqs} className="mt-6" />
          <RelatedLinks
            title="Before the demo"
            links={[
              { href: "/how-it-works", label: "How Mise works", note: "The loop in four moves." },
              { href: "/platform", label: "The three interfaces", note: "Staff, manager, standards." },
              { href: "/how-it-works#pilot", label: "How a one-property pilot works", note: "Scope, setup, first shifts." },
              { href: "/security", label: "Security & data handling", note: "What we hold and where." },
            ]}
          />
        </div>
      </section>
    </>
  );
}
