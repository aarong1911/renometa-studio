import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site-chrome";
import {
  Section,
  SectionHeader,
  FeatureGrid,
  CTASection,
  Reveal,
  BenefitGrid,
} from "@/components/page-primitives";
import {
  Boxes,
  Bot,
  Building2,
  Cog,
  Database,
  GitBranch,
  LayoutDashboard,
  Plug,
  Route as RouteIcon,
  Sparkles,
} from "lucide-react";

export const Route = createFileRoute("/custom-ai-solutions")({
  head: () => ({
    meta: [
      { title: "Custom AI Solutions — RenoMeta" },
      {
        name: "description",
        content:
          "Advanced workflows, integrations, dashboards, and automations built around unique business needs.",
      },
      { property: "og:title", content: "Custom AI Solutions" },
      { property: "og:description", content: "Custom AI systems built around your business." },
      { property: "og:url", content: "/custom-ai-solutions" },
      { name: "twitter:title", content: "Custom AI Solutions" },
      { name: "twitter:description", content: "Custom AI systems built around your business." },
    ],
    links: [{ rel: "canonical", href: "/custom-ai-solutions" }],
  }),
  component: CustomPage,
});

function CustomPage() {
  return (
    <PageShell
      eyebrow="Custom AI Solutions"
      headline="Custom AI Systems Built Around Your Business"
      subheading="Advanced workflows, integrations, dashboards, and automations built around unique business needs."
      primaryCta={{ label: "Discuss a Custom Build", to: "/contact" }}
      secondaryCta={{ label: "See the AI Center", to: "/ai-center" }}
      heroVisual={<WorkflowBuilder />}
    >
      <Section>
        <SectionHeader
          eyebrow="Custom AI overview"
          title="When the standard platform is not enough"
          desc="For teams with unusual operations, custom job types, or existing systems that need to stay in place, we build tailored workflows on top of Connect."
        />
        <FeatureGrid
          cols={3}
          items={[
            { icon: GitBranch, title: "Custom workflows", desc: "Multi-branch logic, conditional routing, and human review steps." },
            { icon: Building2, title: "Industry-specific automations", desc: "Built for niche trades, service categories, or regulated work." },
            { icon: Plug, title: "Third-party integrations", desc: "Accounting, ERP, field-service, and legacy systems." },
            { icon: Cog, title: "Internal process automation", desc: "Payroll prep, subcontractor coordination, procurement." },
            { icon: LayoutDashboard, title: "Custom dashboards", desc: "Owner and ops views tailored to how you actually run the business." },
            { icon: RouteIcon, title: "Custom lead routing", desc: "Distribute leads across teams, regions, or brands by rules you define." },
            { icon: Bot, title: "Special AI agents", desc: "Agents trained on your voice, your scope, and your process." },
            { icon: Database, title: "Structured data extraction", desc: "Turn photos, PDFs, and calls into clean records automatically." },
            { icon: Boxes, title: "Multi-brand support", desc: "Run several brands or divisions from one connected backend." },
          ]}
        />
      </Section>

      <Section tone="surface">
        <SectionHeader
          eyebrow="Example use cases"
          title="What custom actually looks like"
        />
        <UseCases />
      </Section>

      <Section>
        <SectionHeader eyebrow="Benefits" title="Why teams commission custom builds" />
        <BenefitGrid
          items={[
            "Keep existing accounting and ERP systems in place",
            "Automate work that does not fit a generic template",
            "Support multiple brands from a single command center",
            "Route leads by geography, service, or sales team",
            "Turn field notes into structured CRM data automatically",
            "Give owners a dashboard tuned to their real KPIs",
          ]}
        />
      </Section>

      <CTASection
        title="Discuss a Custom Build"
        desc="Bring us your workflow — we'll show you what's possible on top of Connect."
        primary={{ label: "Discuss a Custom Build", to: "/contact" }}
        secondary={{ label: "See AI Agents", to: "/ai-center" }}
      />
    </PageShell>
  );
}

function WorkflowBuilder() {
  const nodes = [
    { title: "Trigger", label: "New lead from Meta Ad", tone: "gold" },
    { title: "AI step", label: "Qualify · scope · budget signal" },
    { title: "Branch", label: "Kitchen? → Team A · Bath? → Team B" },
    { title: "Automation", label: "Send SMS + create CRM record" },
    { title: "Integration", label: "Push to QuickBooks · sync calendar" },
  ];
  return (
    <div className="rounded-2xl border border-border bg-surface-elevated p-6 sm:p-8 shadow-elegant">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-gold" />
          <div className="text-[13px] font-medium">Custom workflow: North-region leads</div>
        </div>
        <span className="text-[11px] text-muted-foreground">v3 · Active</span>
      </div>
      <div className="mt-6 grid gap-3">
        {nodes.map((n, i) => (
          <Reveal key={n.title} delay={i * 70}>
            <div
              className={`rounded-xl border p-4 flex items-center gap-4 ${
                n.tone === "gold"
                  ? "border-[color:color-mix(in_oklab,var(--gold)_45%,var(--border))] bg-gold-soft/40"
                  : "border-border bg-background"
              }`}
            >
              <div className="text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground w-24 shrink-0">
                {n.title}
              </div>
              <div className="text-[13.5px] font-medium flex-1">{n.label}</div>
              <div className="h-6 w-6 rounded-md border border-border bg-surface grid place-items-center text-[10px] text-muted-foreground">
                {i + 1}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function UseCases() {
  const cases = [
    {
      title: "Multi-brand contractor group",
      desc: "Three brands, one backend. Leads route to the right brand's inbox with matching auto-replies and CRM tags.",
    },
    {
      title: "Insurance restoration",
      desc: "Custom intake for claim-driven work, adjuster coordination, and photo-based scope extraction.",
    },
    {
      title: "Commercial + residential split",
      desc: "Separate pipelines and follow-up cadences for commercial and residential jobs, running side by side.",
    },
    {
      title: "Field-note automation",
      desc: "Voice notes from the job site are transcribed, structured, and pushed into the estimate as line items.",
    },
    {
      title: "Subcontractor coordination",
      desc: "Auto-dispatch to preferred subs based on job type, availability, and location.",
    },
    {
      title: "Owner dashboard",
      desc: "One custom view combining pipeline, cash, crew utilization, and marketing performance.",
    },
  ];
  return (
    <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {cases.map((c, i) => (
        <Reveal key={c.title} delay={i * 60}>
          <div className="card-elegant card-elegant-hover p-6 h-full">
            <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Case</div>
            <h4 className="mt-3 text-[15.5px] font-medium leading-snug">{c.title}</h4>
            <p className="mt-3 text-[14px] text-muted-foreground leading-relaxed">{c.desc}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
