import Link from "next/link";
import { CookiePreferencesButton } from "@/components/site/ConsentBanner";
import { Logo } from "@/components/site/Logo";
import NewsletterForm from "@/components/site/NewsletterForm";
import ThemeToggle from "@/components/site/ThemeToggle";
import { Icon } from "@/components/ui/Icon";
import { brand, contact, footerColumns, legalNav } from "@/content/site";

const linkClass = "text-[0.9rem] text-muted transition-colors hover:text-ink";

export default function Footer() {
  return (
    <footer className="relative border-t border-line bg-surface/40" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Mise site footer
      </h2>
      <div className="container-page pt-16 pb-10">
        <div className="flex flex-col justify-between gap-10 border-b border-line pb-12 lg:flex-row lg:items-end">
          <div className="max-w-md">
            <Logo />
            <p className="mt-5 text-[0.98rem] leading-relaxed text-muted">
              {brand.definition}
            </p>
          </div>
          <NewsletterForm />
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-12 md:grid-cols-3 lg:grid-cols-5">
          {footerColumns.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <p className="eyebrow !text-faint">{col.heading}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    {l.external ? (
                      <a href={l.href} className={linkClass} rel="noopener" target="_blank">
                        {l.label}
                        <Icon name="arrowUpRight" size={13} className="ml-1 inline" />
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    ) : (
                      <Link href={l.href} className={linkClass}>
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <nav aria-label="Get started">
            <p className="eyebrow !text-faint">Get started</p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link href="/demo" data-track="demo_cta_click" data-track-location="footer" className="text-[0.9rem] font-medium text-gold-ink hover:text-ink">
                  Book a 15-min demo
                </Link>
              </li>
              <li>
                <Link href="/demo#what-you-see" className={linkClass}>
                  What a demo covers
                </Link>
              </li>
              <li>
                <a href={brand.prototypeUrl} className={linkClass} rel="noopener" target="_blank">
                  Live prototype
                  <Icon name="arrowUpRight" size={13} className="ml-1 inline" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`} data-track-location="footer" className={`${linkClass} break-all`}>
                  {contact.email}
                </a>
              </li>
              <li>
                <a href={contact.phoneHref} data-track-location="footer" className={linkClass}>
                  {contact.phone}
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="flex flex-col gap-6 border-t border-line pt-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2">
            <p className="text-[0.9rem] text-ink">
              Mise — a{" "}
              <a href={brand.parent.url} rel="noopener" target="_blank" className="underline decoration-gold/50 underline-offset-4 hover:text-gold-ink">
                Focus Realm
              </a>{" "}
              company · {brand.tagline}
            </p>
            <p className="text-[0.85rem] text-faint">{brand.notAnLms}</p>
            <p className="text-[0.85rem] text-faint">© 2026 Mise. All rights reserved.</p>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {legalNav.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[0.85rem] text-muted hover:text-ink" prefetch={false}>
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <CookiePreferencesButton className="text-[0.85rem] text-muted hover:text-ink" />
              </li>
            </ul>
            <div className="flex items-center gap-2">
              <a
                href="https://www.linkedin.com/company/misehotel"
                aria-label="Mise on LinkedIn (opens in a new tab)"
                rel="noopener"
                target="_blank"
                className="grid size-10 place-items-center rounded-full border border-line-strong text-muted hover:border-gold hover:text-gold-ink"
              >
                <Icon name="linkedin" size={17} />
              </a>
              <Link
                href="/blog/rss.xml"
                prefetch={false}
                aria-label="Mise blog RSS feed"
                className="grid size-10 place-items-center rounded-full border border-line-strong text-muted hover:border-gold hover:text-gold-ink"
              >
                <Icon name="rss" size={17} />
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
