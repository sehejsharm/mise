import type { Metadata } from "next";
import LongformPage from "@/components/page/LongformPage";
import { digitalSop } from "@/content/pillars";
import { withSepCopy } from "@/content/sep-copy";
import { buildMetadata } from "@/lib/seo";

const page = withSepCopy(digitalSop);

export const metadata: Metadata = buildMetadata(page.meta);

export default function Page() {
  return <LongformPage page={page} crumbs={[{ name: "Standards to execution", path: page.meta.path }]} />;
}
