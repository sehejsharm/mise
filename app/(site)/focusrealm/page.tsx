import type { Metadata } from "next";
import LongformPage from "@/components/page/LongformPage";
import { Icon } from "@/components/ui/Icon";
import { focusRealmPage } from "@/content/focusrealm";
import { brand, founders } from "@/content/site";
import { ids } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(focusRealmPage.meta);

/** The parent company, described in full here and linked to its own @id on focusrealm.org. */
const parentNode = {
  "@type": "Organization",
  "@id": ids.parent,
  name: brand.parent.name,
  url: brand.parent.url,
  foundingDate: brand.founded,
  foundingLocation: { "@type": "Place", name: "India" },
  description:
    "Focus Realm is a software company building learning and operations platforms for institutions. Its product lines are Mise, the service execution platform for hotels, and the Focus Realm education platform for schools, colleges and universities.",
  founder: founders.map((f) => ({ "@id": ids.person(f.slug) })),
  subOrganization: { "@id": ids.org },
  sameAs: [brand.parent.url],
};

export default function FocusRealmPage() {
  return (
    <LongformPage
      page={focusRealmPage}
      crumbs={[
        { name: "About", path: "/about" },
        { name: "Mise by Focus Realm", path: focusRealmPage.meta.path },
      ]}
      pageKind="AboutPage"
      about={ids.parent}
      extraNodes={[parentNode]}
      heroExtra={
        <a
          href={brand.parent.url}
          rel="noopener"
          target="_blank"
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-3 text-[0.94rem] text-ink hover:border-gold"
        >
          Visit Focus Realm at focusrealm.org <Icon name="arrowUpRight" size={15} />
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      }
    />
  );
}
