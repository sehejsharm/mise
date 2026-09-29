import type { Metadata } from "next";
import LegalPage from "@/components/page/LegalPage";
import { privacy as page } from "@/content/legal";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(page.meta);

export default function Page() {
  return <LegalPage page={page} />;
}
