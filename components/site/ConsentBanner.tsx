"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { applyConsent } from "@/lib/analytics";
import { OPEN_PREFERENCES_EVENT, readConsent, writeConsent, type ConsentState } from "@/lib/consent";

/**
 * Consent Mode v2 banner: Accept / Reject / Preferences. The choice is stored
 * in a first-party cookie and pushed to gtag as a consent update. Reopened
 * from the footer's "Cookie preferences" button.
 */
export default function ConsentBanner() {
  const [visible, setVisible] = useState(false);
  const [prefsOpen, setPrefsOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const firstButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const existing = readConsent();
    if (!existing) {
      // Wait a beat so the banner never competes with the hero for LCP.
      const t = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(t);
    }
    setAnalytics(existing.analytics);
    setMarketing(existing.marketing);
  }, []);

  useEffect(() => {
    const open = () => {
      const current = readConsent();
      setAnalytics(current?.analytics ?? false);
      setMarketing(current?.marketing ?? false);
      setPrefsOpen(true);
      setVisible(true);
      requestAnimationFrame(() => firstButton.current?.focus());
    };
    window.addEventListener(OPEN_PREFERENCES_EVENT, open);
    return () => window.removeEventListener(OPEN_PREFERENCES_EVENT, open);
  }, []);

  const save = (state: ConsentState) => {
    writeConsent(state);
    applyConsent(state);
    setVisible(false);
    setPrefsOpen(false);
  };

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed inset-x-3 bottom-3 z-[70] sm:inset-x-auto sm:right-5 sm:bottom-5 sm:w-[420px]"
    >
      <div className="glass rounded-2xl border border-line-strong p-5 shadow-float">
        <p className="font-display text-[1.02rem] font-medium text-ink">Cookies, only with your say-so</p>
        <p className="mt-2 text-[0.9rem] leading-relaxed text-muted">
          We use Google Analytics to see which pages help hotel teams. Nothing is measured until you accept.{" "}
          <Link href="/cookies" className="text-ink underline decoration-gold/60 underline-offset-4">
            Cookie policy
          </Link>
          .
        </p>

        {prefsOpen ? (
          <fieldset className="mt-4 space-y-3 border-t border-line pt-4">
            <legend className="sr-only">Cookie preferences</legend>
            <label className="flex items-start justify-between gap-4 text-[0.9rem]">
              <span>
                <span className="block font-medium text-ink">Strictly necessary</span>
                <span className="text-muted">Consent choice and theme. Always on.</span>
              </span>
              <input type="checkbox" checked disabled className="mt-1 size-4 accent-[#d4a94f]" />
            </label>
            <label className="flex items-start justify-between gap-4 text-[0.9rem]">
              <span>
                <span className="block font-medium text-ink">Analytics</span>
                <span className="text-muted">Google Analytics 4: which pages are read, and which links are used.</span>
              </span>
              <input
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
                className="mt-1 size-4 accent-[#d4a94f]"
              />
            </label>
            <label className="flex items-start justify-between gap-4 text-[0.9rem]">
              <span>
                <span className="block font-medium text-ink">Advertising</span>
                <span className="text-muted">Not used today. Stays off unless you switch it on.</span>
              </span>
              <input
                type="checkbox"
                checked={marketing}
                onChange={(e) => setMarketing(e.target.checked)}
                className="mt-1 size-4 accent-[#d4a94f]"
              />
            </label>
          </fieldset>
        ) : null}

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            ref={firstButton}
            type="button"
            onClick={() => save({ analytics: true, marketing: prefsOpen ? marketing : false })}
            className="h-10 flex-1 rounded-full bg-gold px-4 text-[0.9rem] font-medium text-on-gold transition-colors hover:bg-[#e2bb66]"
          >
            Accept
          </button>
          <button
            type="button"
            onClick={() => save({ analytics: false, marketing: false })}
            className="h-10 flex-1 rounded-full border border-line-strong px-4 text-[0.9rem] text-ink transition-colors hover:border-gold"
          >
            Reject
          </button>
          {prefsOpen ? (
            <button
              type="button"
              onClick={() => save({ analytics, marketing })}
              className="h-10 w-full rounded-full border border-line-strong px-4 text-[0.9rem] text-ink transition-colors hover:border-gold"
            >
              Save preferences
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setPrefsOpen(true)}
              className="h-10 w-full rounded-full px-4 text-[0.88rem] text-muted underline decoration-line-strong underline-offset-4 hover:text-ink"
            >
              Preferences
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export function CookiePreferencesButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_PREFERENCES_EVENT))}
      className={className}
    >
      Cookie preferences
    </button>
  );
}
