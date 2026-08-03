import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Globe } from "lucide-react";
import { PageShell } from "@/components/site-chrome";
import { Section, SectionHeader, BenefitGrid } from "@/components/page-primitives";

export const Route = createFileRoute("/try-agent")({
  head: () => ({
    meta: [
      { title: "Try the Agent Live | RenoMeta" },
      {
        name: "description",
        content:
          "Enter your website and RenoMeta creates a customer service agent trained from your website content, so you can see instant answers and lead capture in action.",
      },
      { property: "og:title", content: "Try the Agent Live | RenoMeta" },
      {
        property: "og:description",
        content:
          "See an AI customer service agent trained from your own website content.",
      },
      { property: "og:url", content: "/try-agent" },
      { name: "twitter:title", content: "Try the Agent Live | RenoMeta" },
      {
        name: "twitter:description",
        content:
          "See an AI customer service agent trained from your own website content.",
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
      subheading="Enter your website and RenoMeta will create a customer service agent trained from your website content, so you can see how instant answers and lead capture could work for your business."
      primaryCta={{ label: "Try the Agent Live", to: "/try-agent" }}
      secondaryCta={{ label: "See the AI Center", to: "/ai-center" }}
    >
      <Section>
        <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-surface-elevated shadow-elegant p-6 sm:p-8">
          <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Your website
          </div>
          {/*
            TODO(backend): wire this to the existing Try Agent Live function from the
            current published site once the backend is migrated to this repo.
            Until then the field stays read-only - do not fake a submission,
            crawler, or agent response here.
          */}
          <div className="mt-4 flex flex-col sm:flex-row gap-2.5">
            <div className="relative flex-1">
              <Globe
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
                strokeWidth={1.5}
              />
              <input
                type="url"
                inputMode="url"
                readOnly
                aria-label="Your website URL"
                placeholder="yourcompany.com"
                className="w-full rounded-xl border border-border bg-background pl-10 pr-3 py-3 text-[14px] text-foreground placeholder:text-muted-foreground/80 focus:outline-none focus:ring-2 focus:ring-gold/30"
              />
            </div>
            <Link to="/contact" className="btn-primary justify-center whitespace-nowrap">
              Try the Agent Live
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Section>

      <Section tone="surface">
        <SectionHeader
          eyebrow="What the agent will do"
          title="An agent trained on your own website"
          desc="The agent reads your website content, answers common customer questions, captures lead details, and helps visitors move toward booking."
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
