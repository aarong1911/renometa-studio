import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site-chrome";
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
      { title: "AI Website Systems | RenoMeta" },
      {
        name: "description",
        content:
          "Conversion-focused contractor websites that capture leads and send them directly into RenoMeta Connect.",
      },
      { property: "og:title", content: "AI Website Systems | RenoMeta" },
      {
        property: "og:description",
        content:
          "Websites that feed your contractor growth system.",
      },
      { property: "og:url", content: "/ai-website-systems" },
      { name: "twitter:title", content: "AI Website Systems | RenoMeta" },
      { name: "twitter:description", content: "Websites that feed your contractor growth system." },
    ],
    links: [{ rel: "canonical", href: "/ai-website-systems" }],
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
      heroVisual={<WebsiteMockup />}
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
          desc="Every service page is structured around a single next step - book, request an estimate, or start a conversation."
        />
        <SplitCallout
          eyebrow="Structure"
          title="A page layout tuned for contractor sales"
          desc="Value proposition, proof, scope, pricing framing, and a booking module - in that order, on every page."
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
          desc="Every lead a website generates flows straight into RenoMeta Connect - no exports, no manual entry."
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
        <div className="relative overflow-hidden bg-background">
          <div className="flex items-center justify-between border-b border-border px-5 py-3 sm:px-7">
            <div className="font-display text-[13px] font-semibold tracking-tight">
              NORTHLINE <span className="text-gold">BUILDERS</span>
            </div>
            <div className="hidden items-center gap-4 text-[10.5px] text-muted-foreground sm:flex">
              <span>Services</span>
              <span>Projects</span>
              <span>Reviews</span>
              <span className="font-medium text-foreground">(555) 014-2026</span>
            </div>
          </div>

          <div className="grid min-h-[255px] sm:grid-cols-[1.08fr_.92fr]">
            <div className="p-6 sm:p-7">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-2.5 py-1 text-[9.5px] font-medium uppercase tracking-[0.13em] text-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                Design-build remodeling
              </div>
              <h3 className="mt-4 font-display text-2xl font-semibold leading-[1.08] tracking-tight sm:text-[28px]">
                A kitchen designed around the way you live.
              </h3>
              <p className="mt-3 max-w-sm text-[12.5px] leading-relaxed text-muted-foreground">
                Thoughtful design, transparent planning, and expert construction—from the first sketch to the final detail.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <span className="btn-primary px-4 py-2 text-[11.5px]">Plan my remodel</span>
                <span className="btn-ghost px-4 py-2 text-[11.5px]">View our work</span>
              </div>
              <div className="mt-5 flex items-center gap-3 text-[10.5px] text-muted-foreground">
                <span className="font-semibold text-gold">★★★★★</span>
                <span><strong className="text-foreground">4.9</strong> from 120+ homeowners</span>
              </div>
            </div>

            <div className="relative m-4 min-h-[210px] overflow-hidden rounded-xl border border-border bg-[linear-gradient(145deg,#e8e0d3_0%,#c9b49b_48%,#75614e_100%)] sm:ml-0">
              <div className="absolute inset-x-4 bottom-4 rounded-lg border border-white/30 bg-black/55 p-3 text-white backdrop-blur-sm">
                <div className="text-[9px] uppercase tracking-[0.15em] text-white/65">Featured project</div>
                <div className="mt-1 text-[12px] font-medium">Warm modern kitchen · Austin, TX</div>
                <div className="mt-1 text-[9.5px] text-white/70">Custom millwork · Natural stone · 9 weeks</div>
              </div>
              <div className="absolute right-3 top-3 rounded-full border border-white/30 bg-black/35 px-2 py-1 text-[9px] text-white backdrop-blur-sm">
                View project →
              </div>
            </div>
          </div>

          <div className="absolute bottom-4 right-4 flex items-center gap-2">
            <span className="rounded-full border border-border bg-background/95 px-3 py-2 text-[10.5px] text-muted-foreground shadow-elegant backdrop-blur">
              Ask about your project
            </span>
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 bg-background shadow-elegant">
              <img
                src="/chatbot-icon-gold.png"
                alt="Open AI project assistant"
                className="h-9 w-9 object-contain"
              />
            </span>
          </div>
        </div>
      </MockupFrame>
      <div className="rounded-2xl border border-border bg-surface-elevated p-5 shadow-elegant flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-[12px] font-medium">
            <Zap className="h-3.5 w-3.5 text-gold" /> Connected to RenoMeta Connect
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
