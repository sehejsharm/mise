import type { Metadata } from "next";
import PageHero from "@/components/page/PageHero";
import SiteSearch from "@/components/site/SiteSearch";
import { RelatedLinks } from "@/components/ui/blocks";
import { searchMeta } from "@/content/meta";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(searchMeta);

export default function SearchPage() {
  return (
    <>
      <PageHero crumbs={[{ name: "Search", path: "/search" }]} eyebrow="Search" title={searchMeta.h1} />
      <div className="container-page max-w-3xl pb-24">
        <SiteSearch autoFocus />
        <RelatedLinks
          title="Popular"
          links={[
            { href: "/standards-to-execution", label: "Standards to execution" },
            { href: "/audit-readiness", label: "Hotel audit readiness" },
            { href: "/problems", label: "The six hotel operations problems" },
            { href: "/platform", label: "The Mise platform" },
          ]}
        />
      </div>
    </>
  );
}
