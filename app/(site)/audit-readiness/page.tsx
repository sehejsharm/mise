import type { Metadata } from "next";
import LongformPage from "@/components/page/LongformPage";
import { auditReadiness } from "@/content/pillars";
import { withSepCopy } from "@/content/sep-copy";
import { buildMetadata } from "@/lib/seo";

const page = withSepCopy(auditReadiness);

export const metadata: Metadata = buildMetadata(page.meta);

export default function Page() {
  return <LongformPage page={page} crumbs={[{ name: "Audit readiness", path: page.meta.path }]} />;
}
