"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Magnetic from "@/components/fx/Magnetic";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "@/components/site/Logo";
import ThemeToggle from "@/components/site/ThemeToggle";
import { primaryNav } from "@/content/site";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const bar = useRef<HTMLDivElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cssProgress = CSS.supports("animation-timeline: scroll()");
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        setScrolled(y > 24);
        if (!cssProgress && bar.current) {
          const max = document.documentElement.scrollHeight - window.innerHeight;
          bar.current.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
        }
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Close the mobile menu on navigation.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel.current?.querySelector<HTMLElement>("a, button")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
      if (e.key === "Tab" && panel.current) {
        const items = [...panel.current.querySelectorAll<HTMLElement>("a, button")];
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string, match?: string) => pathname === href || pathname.startsWith(`${match ?? href}/`) || (match ? pathname.startsWith(match) : false);

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[80] rounded-full bg-gold px-4 py-2 text-on-gold focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <header
        data-scrolled={scrolled || undefined}
        className="group/header fixed inset-x-0 top-0 z-50 transition-[background,border-color] duration-500"
      >
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[2px] overflow-hidden"
        >
          <div ref={bar} className="scroll-progress h-full w-full bg-gradient-to-r from-[#b7862f] via-gold to-[#f3d48f]" />
        </div>
        <div className="border-b border-transparent transition-[background,border-color,backdrop-filter] duration-500 group-data-[scrolled]/header:glass group-data-[scrolled]/header:border-line">
          <div className="container-page flex h-18 items-center justify-between gap-6 transition-[height] duration-500 ease-(--ease-out-expo) group-data-[scrolled]/header:h-14">
            <Link href="/" aria-label="Mise home" className="shrink-0">
              <Logo />
            </Link>
            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-1">
                {primaryNav.map((item) => {
                  const active = isActive(item.href, "match" in item ? item.match : undefined);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={`rounded-full px-3.5 py-2 text-[0.92rem] transition-colors hover:text-ink ${active ? "text-ink" : "text-muted"}`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <div className="flex items-center gap-2.5">
              <ThemeToggle className="hidden sm:grid" />
              <Magnetic className="hidden sm:inline-flex">
                <Link
                  href="/demo"
                  data-track="demo_cta_click"
                  data-track-location="header"
                  className="inline-flex h-10 items-center gap-2 rounded-full bg-gold px-4.5 text-[0.9rem] font-medium text-on-gold shadow-[0_8px_30px_-10px_rgb(229_179_90/0.7)] transition-colors hover:bg-[#eec27a]"
                >
                  Book a 15-min demo
                  <Icon name="arrowRight" size={16} />
                </Link>
              </Magnetic>
              <button
                ref={menuButton}
                type="button"
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? "Close menu" : "Open menu"}
                onClick={() => setOpen((v) => !v)}
                className="grid size-10 place-items-center rounded-full border border-line-strong text-ink lg:hidden"
              >
                <Icon name={open ? "close" : "menu"} size={18} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        hidden={!open}
        className="fixed inset-0 z-40 overflow-y-auto bg-bg/97 px-4 pt-24 pb-10 backdrop-blur-xl lg:hidden"
      >
        <nav aria-label="Mobile">
          <ul className="space-y-1">
            {[...primaryNav, { href: "/faq", label: "FAQ" }, { href: "/contact", label: "Contact" }].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center justify-between border-b border-line py-4 font-display text-[1.6rem] font-medium text-ink"
                >
                  {item.label}
                  <Icon name="arrowRight" size={20} className="text-gold-ink" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-8 flex items-center gap-3">
          <Link
            href="/demo"
            data-track="demo_cta_click"
            data-track-location="mobile-menu"
            className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-gold font-medium text-on-gold"
          >
            Book a 15-min demo
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </>
  );
}
