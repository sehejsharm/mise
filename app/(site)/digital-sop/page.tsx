import type { Metadata } from "next";
import LongformPage from "@/components/page/LongformPage";
import { digitalSop as page } from "@/content/pillars";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(page.meta);

export default function Page() {
  return <LongformPage page={page} crumbs={[{ name: "Digital SOP guide", path: page.meta.path }]} />;
}
