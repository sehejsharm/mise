import type { Metadata } from "next";
import Link from "next/link";
import SiteChrome from "@/components/site/SiteChrome";
import SiteSearch from "@/components/site/SiteSearch";
import { ButtonLink, Eyebrow } from "@/components/ui/primitives";
import { DEMO_HREF } from "@/lib/demo-mail";

export const metadata: Metadata = {
  title: "Page not found | Mise",
  description: "This page does not exist on misehotel.com. Search the site, or start from the platform, the six hotel operations problems or the demo page.",
  robots: { index: false, follow: true },
};

const links = [
  { href: "/", label: "Home" },
  { href: "/platform", label: "The platform" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/problems", label: "The six hotel operations problems" },
  { href: "/digital-sop", label: "Digitize hotel SOPs" },
  { href: "/blog", label: "Blog" },
];

export default function NotFound() {
  return (
    <SiteChrome>
      <section className="relative pt-36 pb-24">
        <div className="container-page max-w-3xl">
          <Eyebrow>404 · Page not found</Eyebrow>
          <h1 className="mt-5 text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.04] font-semibold tracking-[-0.035em] text-ink">
            This room isn't on the floor plan.
          </h1>
          <p className="mt-5 text-[1.1rem] text-muted">The page you asked for has moved or never existed. Search the site, or pick up from one of these.</p>
          <div className="mt-8">
            <SiteSearch compact />
          </div>
          <ul className="mt-8 flex flex-wrap gap-2">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-block rounded-full border border-line-strong px-4 py-2 text-[0.92rem] text-ink hover:border-gold">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <ButtonLink href={DEMO_HREF} arrow trackLocation="404">
              Book a 15-min demo
            </ButtonLink>
          </div>
        </div>
      </section>
    </SiteChrome>
  );
}
