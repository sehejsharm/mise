import type { Metadata } from "next";
import { PostCard } from "@/components/blog/PostCard";
import FiveSeconds from "@/components/home/FiveSeconds";
import FivePlaces from "@/components/home/FivePlaces";
import Hero from "@/components/home/Hero";
import HowItWorksPinned from "@/components/home/HowItWorksPinned";
import LiveFloor from "@/components/home/LiveFloor";
import PainChain from "@/components/home/PainChain";
import ProofStrip from "@/components/home/ProofStrip";
import RoiTeaser from "@/components/home/RoiTeaser";
import RoleShowcase from "@/components/home/RoleShowcase";
import { PeoplePreview, RunsOn, WhoFor } from "@/components/home/StaticSections";
import { FaqList, FinalCta, JsonLd } from "@/components/ui/blocks";
import { ArrowLink, SectionHeading } from "@/components/ui/primitives";
import { homeFaqs } from "@/content/faq";
import { homeMeta } from "@/content/home";
import { pains } from "@/content/pains";
import { roleInterfaces } from "@/content/platform";
import { founders } from "@/content/site";
import { getAdvisors } from "@/lib/advisors";
import { getAllPosts } from "@/lib/blog";
import {
  advisorNode,
  baseNodes,
  faqNode,
  founderNode,
  softwareNode,
  webPageNode,
} from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(homeMeta);

export default async function HomePage() {
  const posts = (await getAllPosts()).slice(0, 3);
  const advisors = getAdvisors();
  const faqs = homeFaqs.map((f) => ({ q: f.q, a: f.homeAnswer ?? f.a, allowLms: f.allowLms }));

  return (
    <>
      <JsonLd
        nodes={[
          ...baseNodes(),
          softwareNode(),
          webPageNode({
            path: "/",
            name: homeMeta.title,
            description: homeMeta.description,
            updated: homeMeta.updated,
            hasBreadcrumb: false,
          }),
          faqNode("/", faqs),
          ...founders.map(founderNode),
          ...advisors.map(advisorNode),
        ]}
      />

      <Hero />
      <ProofStrip />
      <FiveSeconds />
      <HowItWorksPinned />
      <PainChain pains={pains.map(({ slug, index, name, wound }) => ({ slug, index, name, wound }))} />
      <FivePlaces />
      <RoleShowcase roles={roleInterfaces} />
      <LiveFloor />
      <RunsOn />
      <RoiTeaser />
      <WhoFor />
      <PeoplePreview advisors={advisors} />

      {posts.length ? (
        <section aria-labelledby="blog-title" className="relative py-20 sm:py-24">
          <div className="container-page">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <SectionHeading id="blog-title" eyebrow="Field notes" title="Hotel service execution guides" />
              <ArrowLink href="/blog">All Mise articles</ArrowLink>
            </div>
            <ul className="mt-10 grid gap-5 md:grid-cols-3">
              {posts.map((post, i) => (
                <li key={post.slug} data-reveal style={{ ["--reveal-delay" as string]: `${i * 100}ms` }}>
                  <PostCard post={post} compact />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section aria-labelledby="faq-title" className="relative py-20 sm:py-24">
        <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeading id="faq-title" eyebrow="Straight answers" title="Service execution platform FAQ" />
            <div className="mt-6">
              <ArrowLink href="/faq">Every question about Mise, answered</ArrowLink>
            </div>
          </div>
          <FaqList items={faqs} openFirst={false} />
        </div>
      </section>

      <FinalCta location="home" />
    </>
  );
}
