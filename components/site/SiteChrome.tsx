import Script from "next/script";
import type { ReactNode } from "react";
import Enhancements from "@/components/fx/Enhancements";
import ConsentBanner from "@/components/site/ConsentBanner";
import Footer from "@/components/site/Footer";
import Header from "@/components/site/Header";
import { GA_ID } from "@/lib/analytics";

/**
 * Marks [data-reveal] elements as they enter the viewport. Runs as soon as the
 * HTML is parsed (before hydration) and watches for nodes added by client
 * navigation. It sets a data attribute React does not manage, so hydration is
 * unaffected.
 */
const revealScript = `(function(){if(!('IntersectionObserver' in window))return;var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.setAttribute('data-in','');io.unobserve(e.target);}})},{rootMargin:'0px 0px -6% 0px',threshold:0.01});function scan(r){r.querySelectorAll('[data-reveal]:not([data-in]),[data-reveal-lines]:not([data-in])').forEach(function(el){io.observe(el)})}scan(document);new MutationObserver(function(ms){ms.forEach(function(m){m.addedNodes.forEach(function(n){if(n.nodeType===1){if(n.matches('[data-reveal],[data-reveal-lines]'))io.observe(n);scan(n);}})})}).observe(document.body,{childList:true,subtree:true});})();`;

/** Header, main, footer, consent, GA4 (loaded once, after hydration) and motion helpers. */
export default function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <>
      <Script id="ga4" src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Header />
      <main id="main" tabIndex={-1} className="relative z-[2] outline-none">
        {children}
      </main>
      <Footer />
      <ConsentBanner />
      <Enhancements />
      <script dangerouslySetInnerHTML={{ __html: revealScript }} />
    </>
  );
}
