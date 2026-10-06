import type { Metadata } from "next";
import LongformPage from "@/components/page/LongformPage";
import { indiaPage as page } from "@/content/geo";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(page.meta);

export default function Page() {
  return <LongformPage page={page} crumbs={[{ name: "Hotel service execution platform India", path: page.meta.path }]} />;
}
