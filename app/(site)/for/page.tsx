import type { Metadata } from "next";
import HubPage from "@/components/page/HubPage";
import { audiences, audiencesHubMeta } from "@/content/audiences";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(audiencesHubMeta);

const body = `
## Different questions, one record

HR Directors ask whether people know and follow the current standard. General Managers ask where service is slipping right now. L&D Heads ask whether standards change what happens on the floor. Hotel-group founders ask whether every property runs the same way. Mise answers all four from the same [service record](/glossary/service-record), built from the timed tasks staff complete during their shifts.

Because the record is created by the work itself, nobody compiles reports for anyone else. Each role sees the view it needs: acknowledgements and readiness, the live floor, execution per standard, or consistency across properties.
`;

export default function AudiencesHub() {
  return (
    <HubPage
      meta={audiencesHubMeta}
      lede="Mise is hotel operations software for hotel leaders, the people who answer for service: HR Directors, General Managers, L&D Heads and hotel-group founders. Each gets a different view of the same evidence, captured as the work happens on every shift."
      tldr="HR Directors get acknowledgement and readiness evidence per person. General Managers get a live service picture. L&D Heads get execution evidence and floor feedback per standard. Hotel-group founders get one standards library, evidenced at every property. All of it comes from one service record."
      cardsTitle="Hotel operations software for hotel leaders, by role"
      cards={[
        ...audiences.map((a) => ({ href: a.meta.path, eyebrow: `For ${a.name}`, title: a.meta.h1, body: a.card })),
        {
          href: "/solutions/hotel-chains",
          eyebrow: "For hotel-group founders",
          title: "Multi-property service execution for groups and chains",
          body: "One standards library, executed and evidenced at every property.",
        },
      ]}
      body={body}
    />
  );
}
