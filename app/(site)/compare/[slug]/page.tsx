import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LongformPage from "@/components/page/LongformPage";
import { comparisonBySlug, comparisons } from "@/content/compare";
import { buildMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return comparisons.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const c = comparisonBySlug((await params).slug);
  return c ? buildMetadata(c.meta) : {};
}

export default async function ComparisonPage({ params }: { params: Promise<{ slug: string }> }) {
  const c = comparisonBySlug((await params).slug);
  if (!c) notFound();
  return (
    <LongformPage
      page={c}
      crumbs={[
        { name: "Compare", path: "/compare" },
        { name: c.name, path: c.meta.path },
      ]}
    />
  );
}
