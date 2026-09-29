import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LongformPage from "@/components/page/LongformPage";
import PainAnatomy from "@/components/page/PainAnatomy";
import { painBySlug, pains } from "@/content/pains";
import { buildMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return pains.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const pain = painBySlug((await params).slug);
  return pain ? buildMetadata(pain.meta) : {};
}

export default async function ProblemPage({ params }: { params: Promise<{ slug: string }> }) {
  const pain = painBySlug((await params).slug);
  if (!pain) notFound();
  return (
    <LongformPage
      page={pain}
      crumbs={[
        { name: "Problems", path: "/problems" },
        { name: pain.name, path: pain.meta.path },
      ]}
      before={<PainAnatomy pain={pain} />}
    />
  );
}
