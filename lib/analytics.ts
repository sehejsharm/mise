/**
 * The only module that talks to gtag. Components call `track(...)`; nothing
 * else in the codebase references window.gtag.
 *
 * Events are dropped (not queued) until the visitor grants analytics consent,
 * so no hit is ever sent without consent.
 */
import { readConsent } from "@/lib/consent";

/**
 * GA4 measurement ID. Fixed in code on purpose: a stale NEXT_PUBLIC_GA_ID left
 * in hosting settings must never send data to a retired property.
 */
export const GA_ID = "G-KVTTR7P7BY";

type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    gtag?: Gtag;
    dataLayer?: unknown[];
    __miseGaConfigured?: boolean;
  }
}

export type AnalyticsEvent =
  | { name: "demo_cta_click"; params: { location: string } }
  | { name: "demo_form_submit"; params?: { form?: string } }
  | { name: "booking_opened"; params?: { location?: string } }
  | { name: "roi_calculator_used"; params?: { surface?: string } }
  | { name: "pain_explored"; params: { pain: string } }
  | { name: "blog_read_75"; params: { slug: string } }
  | { name: "outbound_click"; params: { url: string } }
  | { name: "contact_email_click"; params?: { location?: string } }
  | { name: "phone_click"; params?: { location?: string } }
  | { name: "newsletter_signup"; params?: { location?: string } };

function gtag(): Gtag | undefined {
  return typeof window === "undefined" ? undefined : window.gtag;
}

export function analyticsAllowed() {
  return readConsent()?.analytics === true;
}

export function track<E extends AnalyticsEvent>(name: E["name"], params?: E["params"]) {
  const g = gtag();
  if (!g || !analyticsAllowed()) return;
  g("event", name, params ?? {});
}

/** Called by the consent banner after the visitor saves a choice. */
export function applyConsent(state: { analytics: boolean; marketing: boolean }) {
  const g = gtag();
  if (!g) return;
  g("consent", "update", {
    analytics_storage: state.analytics ? "granted" : "denied",
    ad_storage: state.marketing ? "granted" : "denied",
    ad_user_data: state.marketing ? "granted" : "denied",
    ad_personalization: state.marketing ? "granted" : "denied",
  });
  if (state.analytics && !window.__miseGaConfigured) {
    window.__miseGaConfigured = true;
    // Issues the first page_view for this page, now that consent exists.
    g("config", GA_ID);
  }
}
