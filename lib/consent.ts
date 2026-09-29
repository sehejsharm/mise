/**
 * First-party consent cookie + Google Consent Mode v2 wiring.
 *
 * Cookie `mise_consent` holds "a:1|m:0" (analytics granted, marketing denied).
 * The defaults snippet in the root layout reads it before gtag.js loads, so a
 * returning visitor's choice applies from the first hit.
 */
export const CONSENT_COOKIE = "mise_consent";
export const CONSENT_EVENT = "mise:consent";
export const OPEN_PREFERENCES_EVENT = "mise:open-consent";

export type ConsentState = { analytics: boolean; marketing: boolean };

export function readConsent(): ConsentState | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${CONSENT_COOKIE}=([^;]*)`));
  if (!match) return null;
  const value = decodeURIComponent(match[1]);
  return { analytics: value.includes("a:1"), marketing: value.includes("m:1") };
}

export function writeConsent(state: ConsentState) {
  const value = `a:${state.analytics ? 1 : 0}|m:${state.marketing ? 1 : 0}`;
  const maxAge = 60 * 60 * 24 * 180; // 6 months
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_COOKIE}=${encodeURIComponent(value)}; Path=/; Max-Age=${maxAge}; SameSite=Lax${secure}`;
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: state }));
}

/**
 * Inline script for <head>, run before gtag.js (next/script beforeInteractive).
 * Defaults every Consent Mode v2 signal to denied, then grants what the cookie
 * allows. `gtag('config')` is only issued once analytics is granted — see
 * lib/analytics.ts — so nothing is measured before a visitor accepts.
 */
export function consentDefaultsScript(gaId: string) {
  return `
window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
window.gtag=gtag;
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',functionality_storage:'granted',security_storage:'granted',wait_for_update:500});
gtag('set','ads_data_redaction',true);
gtag('js',new Date());
(function(){try{
var m=document.cookie.match(/(?:^|; )${CONSENT_COOKIE}=([^;]*)/);
var v=m?decodeURIComponent(m[1]):'';
var a=v.indexOf('a:1')>-1, k=v.indexOf('m:1')>-1;
if(a||k){gtag('consent','update',{analytics_storage:a?'granted':'denied',ad_storage:k?'granted':'denied',ad_user_data:k?'granted':'denied',ad_personalization:k?'granted':'denied'});}
if(a){window.__miseGaConfigured=true;gtag('config','${gaId}');}
}catch(e){}})();
`.trim();
}
