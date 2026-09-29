import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LongformPage from "@/components/page/LongformPage";
import { audienceBySlug, audiences } from "@/content/audiences";
import { buildMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return audiences.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const a = audienceBySlug((await params).slug);
  return a ? buildMetadata(a.meta) : {};
}

export default async function AudiencePage({ params }: { params: Promise<{ slug: string }> }) {
  const a = audienceBySlug((await params).slug);
  if (!a) notFound();
  return (
    <LongformPage
      page={a}
      crumbs={[
        { name: "Who it's for", path: "/for" },
        { name: a.name, path: a.meta.path },
      ]}
    />
  );
}
