import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site-chrome";
import { WebsiteToCrmVisual } from "@/components/visuals";
import {
  Section,
  SectionHeader,
  FeatureGrid,
  StepFlow,
  CTASection,
  MockupFrame,
  SplitCallout,
} from "@/components/page-primitives";
import {
  Bot,
  Calendar,
  FileText,
  Globe,
  Inbox,
  MessageSquare,
  Phone,
  Smartphone,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";

export const Route = createFileRoute("/ai-website-systems")({
  head: () => ({
    meta: [
      { title: "AI Website Systems — RenoMeta" },
      {
        name: "description",
        content:
          "Conversion-focused contractor websites that capture leads and send them directly into RenoMeta Connect.",
      },
      { property: "og:title", content: "AI Website Systems" },
      {
        property: "og:description",
        content:
          "Websites that feed your contractor growth system.",
      },
    ],
  }),
  component: AiWebsitePage,
});

function AiWebsitePage() {
  return (
    <PageShell
      eyebrow="AI Website Systems"
      headline="Websites That Feed Your Contractor Growth System"
      subheading="Conversion-focused websites built to capture leads and send them directly into RenoMeta Connect."
      primaryCta={{ label: "Build My Website System", to: "/contact" }}
      secondaryCta={{ label: "See RenoMeta Connect", to: "/renometa-connect" }}
      heroVisual={<WebsiteToCrmVisual size="lg" />}
    >
      <Section>
        <SectionHeader
          eyebrow="Built for lead capture"
          title="Every page designed around one job: capture the lead"
          desc="Layouts, forms, and calls to action structured around the moment a homeowner decides to reach out."
        />
        <FeatureGrid
          cols={3}
          items={[
            { icon: Globe, title: "Conversion layouts", desc: "Hero, service pages, and case studies structured to drive action, not scroll." },
            { icon: Phone, title: "Call tracking", desc: "Every call captured, attributed, and pushed into the CRM." },
            { icon: FileText, title: "Smart forms", desc: "Multi-step forms that qualify while feeling effortless." },
            { icon: Calendar, title: "Booking on the page", desc: "Homeowners pick a time without leaving the site." },
            { icon: Bot, title: "AI chat", desc: "An agent that answers common questions and captures the lead." },
            { icon: Smartphone, title: "Mobile-first", desc: "Fast, clean, and built for how homeowners actually browse." },
          ]}
        />
      </Section>

      <Section tone="surface">
        <SectionHeader
          eyebrow="Booking-focused service pages"
          title="Turn service pages into booked appointments"
          desc="Every service page is structured around a single next step — book, request an estimate, or start a conversation."
        />
        <SplitCallout
          eyebrow="Structure"
          title="A page layout tuned for contractor sales"
          desc="Value proposition, proof, scope, pricing framing, and a booking module — in that order, on every page."
          bullets={[
            "Above-the-fold form or booking widget",
            "Trust signals: reviews, badges, past projects",
            "Clear scope breakdown for each service",
            "Sticky mobile CTA on every page",
          ]}
          visual={<ServicePageMockup />}
        />
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Case studies & proof"
          title="Project sections that sell"
          desc="Case studies and past work sections built to be scannable, credible, and easy to update as your portfolio grows."
        />
        <FeatureGrid
          cols={3}
          items={[
            { icon: Sparkles, title: "Before / after", desc: "Photo comparisons that speak for themselves." },
            { icon: Users, title: "Homeowner quotes", desc: "Short, specific testimonials attached to real projects." },
            { icon: FileText, title: "Scope summaries", desc: "Clear notes on what was done, timeline, and budget range." },
          ]}
        />
      </Section>

      <Section tone="bordered">
        <SectionHeader
          eyebrow="How it connects"
          title="From website visit to booked job"
          desc="Every lead a website generates flows straight into RenoMeta Connect — no exports, no manual entry."
        />
        <StepFlow
          steps={[
            { title: "Visitor lands", desc: "Search, ad, or referral traffic hits a service page." },
            { title: "Lead captured", desc: "Form, chat, call, or booking widget starts the record." },
            { title: "Connect receives", desc: "The lead lands in the inbox and CRM instantly." },
            { title: "AI qualifies", desc: "The Lead Qualifier tags and routes the opportunity." },
            { title: "Job booked", desc: "Appointment reminder, follow-up, and review all automated." },
          ]}
        />
      </Section>

      <CTASection
        title="Build My Website System"
        desc="A contractor website that actually feeds your pipeline."
        primary={{ label: "Build My Website System", to: "/contact" }}
        secondary={{ label: "See RenoMeta Connect", to: "/renometa-connect" }}
      />
    </PageShell>
  );
}

function WebsiteMockup() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] items-stretch">
      <MockupFrame url="yourcontractorsite.com / kitchen-remodel">
        <div className="p-6 sm:p-8">
          <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Kitchen renovation
          </div>
          <h3 className="mt-3 font-display text-2xl sm:text-3xl font-semibold tracking-tight leading-tight">
            Custom kitchen builds, delivered on time.
          </h3>
          <p className="mt-3 text-[13.5px] text-muted-foreground max-w-md leading-relaxed">
            Design, permitting, and installation from a single team. Fixed timeline. Fixed price.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="btn-primary text-[12.5px] px-4 py-2">Book a site visit</span>
            <span className="btn-ghost text-[12.5px] px-4 py-2">See past kitchens</span>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="aspect-[4/3] rounded-lg border border-border bg-gradient-to-br from-gold-soft/50 to-surface" />
            ))}
          </div>
        </div>
      </MockupFrame>
      <div className="rounded-2xl border border-border bg-surface-elevated p-5 shadow-elegant flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-[12px] font-medium">
            <Zap className="h-3.5 w-3.5 text-gold" /> Connected to Connect
          </div>
          <div className="mt-4 space-y-2.5">
            {[
              { icon: Inbox, label: "Form submission → Inbox" },
              { icon: Phone, label: "Call tracked → Contact record" },
              { icon: Calendar, label: "Booking → Calendar" },
              { icon: Bot, label: "Chat → AI qualifier" },
            ].map((r) => (
              <div key={r.label} className="flex items-center gap-3 rounded-lg border border-border bg-background px-3 py-2.5">
                <r.icon className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-[12.5px]">{r.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-5 rounded-lg border border-border bg-surface p-3">
          <div className="text-[10.5px] uppercase tracking-wider text-muted-foreground">Last 7 days</div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="font-display text-xl font-semibold">42</span>
            <span className="text-[11px] text-muted-foreground">website leads → Connect</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ServicePageMockup() {
  return (
    <MockupFrame url="yourcontractorsite.com / bathroom-remodel">
      <div className="p-6 space-y-4">
        <div className="rounded-lg border border-border bg-background p-4">
          <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Book a site visit</div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="rounded-md border border-border bg-surface h-8" />
            <div className="rounded-md border border-border bg-surface h-8" />
          </div>
          <div className="mt-2 rounded-md border border-border bg-surface h-8" />
          <div className="mt-3 flex items-center justify-between">
            <div className="text-[11px] text-muted-foreground">Preferred: Thu 2–4 PM</div>
            <span className="btn-primary text-[11px] px-3 py-1.5">Book</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-md border border-border bg-surface p-2 text-center">
            <div className="font-display text-sm font-semibold">4.9</div>
            <div className="text-[10px] text-muted-foreground">rating</div>
          </div>
          <div className="rounded-md border border-border bg-surface p-2 text-center">
            <div className="font-display text-sm font-semibold">180+</div>
            <div className="text-[10px] text-muted-foreground">projects</div>
          </div>
          <div className="rounded-md border border-border bg-surface p-2 text-center">
            <div className="font-display text-sm font-semibold">12yr</div>
            <div className="text-[10px] text-muted-foreground">licensed</div>
          </div>
        </div>
      </div>
    </MockupFrame>
  );
}
