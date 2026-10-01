import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/forms/ContactForm";
import PageHero from "@/components/page/PageHero";
import { JsonLd } from "@/components/ui/blocks";
import { Icon } from "@/components/ui/Icon";
import { contact } from "@/content/site";
import { baseNodes, breadcrumbNode, webPageNode } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { contactMeta } from "@/content/meta";

const meta = contactMeta;

export const metadata: Metadata = buildMetadata(meta);

export default function ContactPage() {
  const crumbs = [{ name: "Contact", path: "/contact" }];
  return (
    <>
      <JsonLd
        nodes={[
          ...baseNodes(),
          webPageNode({ path: meta.path, name: meta.title, description: meta.description, kind: "ContactPage", updated: meta.updated }),
          breadcrumbNode(meta.path, crumbs),
        ]}
      />
      <PageHero
        crumbs={crumbs}
        eyebrow="Contact"
        title={meta.h1}
        lede={<p>Questions about Mise, a pilot, a partnership or press? Write to the founding team. If you already know the pain, the fastest route is a 15-minute demo.</p>}
      />
      <div className="container-page grid gap-10 pb-24 lg:grid-cols-[1.2fr_0.8fr]">
        <ContactForm />
        <aside className="space-y-4">
          <a href={`mailto:${contact.email}`} data-track-location="contact-page" className="flex items-center gap-4 rounded-2xl border border-line bg-surface/60 p-5 hover:border-gold/50">
            <Icon name="mail" size={22} className="text-gold-ink" />
            <span>
              <span className="block text-[0.85rem] text-muted">Email</span>
              <span className="block font-medium break-all text-ink">{contact.email}</span>
            </span>
          </a>
          <a href={contact.phoneHref} data-track-location="contact-page" className="flex items-center gap-4 rounded-2xl border border-line bg-surface/60 p-5 hover:border-gold/50">
            <Icon name="call" size={22} className="text-gold-ink" />
            <span>
              <span className="block text-[0.85rem] text-muted">Phone</span>
              <span className="block font-medium text-ink">{contact.phone}</span>
            </span>
          </a>
          <Link href="/demo" data-track="demo_cta_click" data-track-location="contact-aside" className="flex items-center justify-between gap-4 rounded-2xl border border-gold/40 bg-gold-soft p-5">
            <span>
              <span className="block font-display text-[1.1rem] font-semibold text-ink">Book a 15-min demo</span>
              <span className="block text-[0.9rem] text-muted">See one of your SOPs become a timed task.</span>
            </span>
            <Icon name="arrowRight" size={20} className="text-gold-ink" />
          </Link>
          <p className="px-1 pt-2 text-[0.9rem] text-muted">
            Comparing tools? Read <Link href="/compare" className="text-ink underline decoration-gold/60 underline-offset-4">how Mise compares</Link> or the{" "}
            <Link href="/faq" className="text-ink underline decoration-gold/60 underline-offset-4">FAQ</Link>.
          </p>
        </aside>
      </div>
    </>
  );
}
