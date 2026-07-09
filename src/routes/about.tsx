import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site-chrome";
import {
  Section,
  SectionHeader,
  FeatureGrid,
  CTASection,
  BenefitGrid,
  Reveal,
  StatRow,
} from "@/components/page-primitives";
import { Compass, Layers, Sparkles, Users, Workflow, Zap } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — RenoMeta" },
      {
        name: "description",
        content:
          "RenoMeta helps renovation and home service businesses organize leads, automate follow-up, and manage growth from one connected platform.",
      },
      { property: "og:title", content: "About — RenoMeta" },
      {
        property: "og:description",
        content: "Built for contractors who need better systems.",
      },
      { property: "og:url", content: "/about" },
      { name: "twitter:title", content: "About — RenoMeta" },
      { name: "twitter:description", content: "Built for contractors who need better systems." },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PageShell
      eyebrow="About"
      headline="Built for Contractors Who Need Better Systems"
      subheading="RenoMeta helps renovation and home service businesses organize leads, automate follow-up, and manage growth from one connected platform."
      primaryCta={{ label: "Talk to RenoMeta", to: "/contact" }}
      secondaryCta={{ label: "See the Platform", to: "/renometa-connect" }}
    >
      <Section>
        <SectionHeader
          eyebrow="Mission"
          title="Give contractors the operational system big companies take for granted"
          desc="Most renovation businesses run on a patchwork of phones, spreadsheets, group chats, and paper. The result is missed leads, forgotten follow-up, and a business that never fully steps into the owner's vision. RenoMeta exists to change that."
        />
      </Section>

      <Section tone="surface">
        <SectionHeader
          eyebrow="Why connected systems"
          title="A stack of tools is not the same as a system"
          desc="Adding another app to the pile rarely fixes anything. What contractors actually need is a single platform where the pieces already know about each other."
        />
        <FeatureGrid
          cols={3}
          items={[
            { icon: Layers, title: "One record", desc: "The lead, the conversation, and the job live on one profile — not spread across five apps." },
            { icon: Workflow, title: "One workflow", desc: "A defined path from first inquiry to booked job that anyone on the team can follow." },
            { icon: Zap, title: "One system of record", desc: "Owners see the real state of the business without pulling numbers from four tools." },
          ]}
        />
      </Section>

      <Section>
        <SectionHeader
          eyebrow="What makes RenoMeta different"
          title="Built for the way renovation businesses actually run"
        />
        <BenefitGrid
          items={[
            "Designed around renovation and home service workflows, not generic B2B sales",
            "Multi-channel inbox that includes voice and missed-call text-back",
            "AI agents shaped for contractor scenarios — not chatbot demos",
            "Estimate, proposal, and signature in one flow",
            "Marketing and follow-up sitting on the same record as the CRM",
            "A pricing model that includes the platform on every plan",
          ]}
        />
      </Section>

      <Section tone="bordered">
        <SectionHeader
          eyebrow="Platform first"
          title="A platform, not a marketing agency"
          desc="RenoMeta is not a done-for-you agency in a hoodie. The core product is a platform contractors run their business inside. Services exist to help teams get the most out of it."
        />
        <StatRow
          stats={[
            { value: "10+", label: "AI agents built for contractor workflows" },
            { value: "6", label: "Feature pillars from inbox to insights" },
            { value: "1", label: "Connected system replacing 5–7 tools" },
            { value: "24/7", label: "Automations working in the background" },
          ]}
        />
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Company story"
          title="Why we built RenoMeta"
        />
        <Reveal>
          <div className="mt-10 rounded-2xl border border-border bg-surface-elevated p-8 sm:p-10 shadow-card max-w-4xl">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-gold-soft to-surface border border-border grid place-items-center">
                <Compass className="h-4 w-4" />
              </div>
              <div>
                <div className="text-[13px] font-medium">RenoMeta Team</div>
                <div className="text-[11.5px] text-muted-foreground">Founders' note</div>
              </div>
            </div>
            <div className="mt-6 space-y-4 text-[15px] text-foreground/90 leading-relaxed">
              <p>
                RenoMeta started inside real renovation businesses — the kind where the phone rings
                at 8 AM, four crews are on four job sites, and the owner is trying to send an
                estimate from a truck. The tools we used did not fit that reality.
              </p>
              <p>
                We built RenoMeta Connect because the contractors we worked with kept asking for
                the same thing: one place. One inbox, one pipeline, one system of record — with
                automation and AI doing the parts that never should have been manual in the first
                place.
              </p>
              <p>
                Today, RenoMeta is a command center for renovation contractors and home service
                businesses. If your business is one of them, we would like to hear from you.
              </p>
            </div>
          </div>
        </Reveal>
      </Section>

      <CTASection
        title="Talk to RenoMeta"
        desc="Tell us where your business needs a better system."
        primary={{ label: "Talk to RenoMeta", to: "/contact" }}
        secondary={{ label: "Explore Solutions", to: "/solutions" }}
      />
    </PageShell>
  );
}
