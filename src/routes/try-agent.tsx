import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site-chrome";
import { Section, SectionHeader, BenefitGrid } from "@/components/page-primitives";

export const Route = createFileRoute("/try-agent")({
  head: () => ({
    meta: [
      { title: "Try the Agent Live | RenoMeta" },
      {
        name: "description",
        content:
          "The RenoMeta interactive AI agent demo is being connected to the new website. Contact us to see an agent trained on your site.",
      },
      { property: "og:title", content: "Try the Agent Live | RenoMeta" },
      {
        property: "og:description",
        content: "The interactive AI agent demo is being connected to the new RenoMeta website.",
      },
      { property: "og:url", content: "/try-agent" },
      { name: "twitter:title", content: "Try the Agent Live | RenoMeta" },
      {
        name: "twitter:description",
        content: "The interactive AI agent demo is being connected to the new RenoMeta website.",
      },
    ],
    links: [{ rel: "canonical", href: "/try-agent" }],
  }),
  component: TryAgentPage,
});

function TryAgentPage() {
  return (
    <PageShell
      eyebrow="AI agent demo"
      headline="Try the Agent Live"
      subheading="This interactive AI agent demo is being connected to the new RenoMeta website."
      primaryCta={{ label: "Contact Us", to: "/contact" }}
      secondaryCta={{ label: "See the AI Center", to: "/ai-center" }}
    >
      <Section>
        <SectionHeader
          eyebrow="What the agent will do"
          title="An agent trained on your own website"
          desc="Once connected, the demo will read your website content and answer as your business would."
        />
        <BenefitGrid
          items={[
            "Trains from your website content",
            "Answers common customer questions",
            "Helps capture lead details",
            "Built for renovation and home service businesses",
          ]}
        />
      </Section>
    </PageShell>
  );
}
