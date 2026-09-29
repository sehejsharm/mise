import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LongformPage from "@/components/page/LongformPage";
import { solutionBySlug, solutions } from "@/content/solutions";
import { buildMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const s = solutionBySlug((await params).slug);
  return s ? buildMetadata(s.meta) : {};
}

export default async function SolutionPage({ params }: { params: Promise<{ slug: string }> }) {
  const s = solutionBySlug((await params).slug);
  if (!s) notFound();
  return (
    <LongformPage
      page={s}
      crumbs={[
        { name: "Solutions", path: "/solutions" },
        { name: s.name, path: s.meta.path },
      ]}
    />
  );
}
