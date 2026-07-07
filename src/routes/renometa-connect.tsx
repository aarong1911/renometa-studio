import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site-chrome";
import {
  Section,
  SectionHeader,
  FeatureGrid,
  StepFlow,
  BenefitGrid,
  CTASection,
  MockupFrame,
  Reveal,
} from "@/components/page-primitives";
import {
  ArrowRight,
  Bot,
  Calendar,
  FileText,
  Inbox,
  LineChart,
  MessageSquare,
  Star,
  Users,
  Workflow,
  Zap,
} from "lucide-react";

export const Route = createFileRoute("/renometa-connect")({
  head: () => ({
    meta: [
      { title: "RenoMeta Connect — Business Command Center for Contractors" },
      {
        name: "description",
        content:
          "Manage leads, conversations, estimates, scheduling, marketing, and follow-up in one connected platform built for renovation contractors.",
      },
      { property: "og:title", content: "RenoMeta Connect" },
      {
        property: "og:description",
        content:
          "The business command center for renovation contractors and home service businesses.",
      },
    ],
  }),
  component: ConnectPage,
});

function ConnectPage() {
  return (
    <PageShell
      eyebrow="RenoMeta Connect"
      headline="The Business Command Center for Renovation Contractors"
      subheading="Manage leads, conversations, estimates, scheduling, marketing, and follow-up in one connected platform."
      primaryCta={{ label: "See Connect in Action", to: "/contact" }}
      secondaryCta={{ label: "Explore Solutions", to: "/solutions" }}
      heroVisual={<ConnectMockup />}
    >
      <Section>
        <SectionHeader
          eyebrow="Platform overview"
          title="One platform, every part of the customer journey"
          desc="Connect replaces the patchwork of inbox apps, spreadsheets, booking tools, and follow-up reminders with a single system built for contractors."
        />
        <FeatureGrid
          items={[
            { icon: Users, title: "Leads", desc: "Every inquiry captured, enriched, and assigned automatically." },
            { icon: Inbox, title: "Inbox", desc: "SMS, WhatsApp, Messenger, DM, and voice in one thread." },
            { icon: Workflow, title: "Pipeline", desc: "Move opportunities through a defined sales workflow." },
            { icon: Calendar, title: "Appointments", desc: "Booking and calendar sync with automatic reminders." },
            { icon: Bot, title: "Automations", desc: "AI agents handle qualification, follow-up, and estimates." },
            { icon: Star, title: "Reviews", desc: "Trigger review requests the moment a job is complete." },
            { icon: LineChart, title: "Reports", desc: "See what is working across leads, sales, and marketing." },
            { icon: FileText, title: "Estimates", desc: "Draft, send, sign, and invoice from one document flow." },
          ]}
        />
      </Section>

      <Section tone="bordered">
        <SectionHeader
          eyebrow="System diagram"
          title="Everything connected in one place"
          desc="Leads flow in from every source, land in one inbox, become CRM records, trigger the right follow-up, and close as booked jobs — without leaving the platform."
        />
        <Reveal>
          <ConnectDiagram />
        </Reveal>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Feature pillars"
          title="Built around six connected capabilities"
        />
        <FeatureGrid
          cols={3}
          items={[
            { icon: Bot, title: "AI Center", desc: "Agents that qualify, follow up, and draft estimates.", to: "/ai-center" },
            { icon: Inbox, title: "Multi-Channel Inbox", desc: "Every conversation, every channel, one thread.", to: "/multi-channel-inbox" },
            { icon: Users, title: "CRM & Sales", desc: "Pipeline, estimates, proposals, signatures.", to: "/crm-sales" },
            { icon: MessageSquare, title: "Marketing & Follow-Up", desc: "Nurture, reviews, reactivation, campaigns.", to: "/marketing-follow-up-automation" },
            { icon: Workflow, title: "Growth Operations", desc: "Scheduling, workflows, reporting, insights.", to: "/growth-operations" },
            { icon: LineChart, title: "Insights", desc: "See lead flow, conversion, and revenue in one view.", to: "/growth-operations" },
          ]}
        />
      </Section>

      <Section tone="surface">
        <SectionHeader
          eyebrow="Workflow"
          title="From first inquiry to booked job"
          desc="A single lead moves through Connect end-to-end without a manual handoff."
        />
        <StepFlow
          steps={[
            { title: "Lead lands", desc: "Web form, ad, DM, or missed call — every source flows into one inbox." },
            { title: "AI qualifies", desc: "The Lead Qualifier tags urgency, project type, and readiness." },
            { title: "Conversation opens", desc: "The team picks up in one thread with full context." },
            { title: "Estimate sent", desc: "Draft the estimate, send for e-signature, generate an invoice." },
            { title: "Job booked", desc: "Appointment lands on the calendar with reminders and follow-up." },
          ]}
        />
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Benefits"
          title="What changes when the system is connected"
        />
        <BenefitGrid
          items={[
            "Faster response times on every new lead",
            "One record for every customer, from first inquiry to complete",
            "Fewer missed follow-ups and forgotten estimates",
            "Consistent review requests on every completed job",
            "A pipeline that stays organized without spreadsheets",
            "Clear visibility into what marketing is actually working",
          ]}
        />
      </Section>

      <CTASection
        title="See Connect in Action"
        desc="Book a walkthrough of the platform tailored to your business."
        primary={{ label: "See Connect in Action", to: "/contact" }}
        secondary={{ label: "Explore Solutions", to: "/solutions" }}
      />
    </PageShell>
  );
}

function ConnectMockup() {
  return (
    <MockupFrame url="connect.renometa.com / command-center">
      <div className="grid grid-cols-12 min-h-[420px] sm:min-h-[480px]">
        <aside className="hidden md:flex md:col-span-2 flex-col gap-1 border-r border-border p-4 bg-surface/60">
          {[
            { icon: <Zap className="h-3.5 w-3.5" />, label: "Command Center", active: true },
            { icon: <Inbox className="h-3.5 w-3.5" />, label: "Inbox" },
            { icon: <Users className="h-3.5 w-3.5" />, label: "Pipeline" },
            { icon: <FileText className="h-3.5 w-3.5" />, label: "Estimates" },
            { icon: <Calendar className="h-3.5 w-3.5" />, label: "Scheduling" },
            { icon: <Bot className="h-3.5 w-3.5" />, label: "AI Agents" },
            { icon: <Star className="h-3.5 w-3.5" />, label: "Reviews" },
            { icon: <LineChart className="h-3.5 w-3.5" />, label: "Reports" },
          ].map((it) => (
            <div
              key={it.label}
              className={`flex items-center gap-2 px-2.5 py-1.5 rounded-md text-[12.5px] ${
                it.active
                  ? "bg-surface-elevated text-foreground border border-border shadow-sm"
                  : "text-muted-foreground"
              }`}
            >
              {it.icon}
              {it.label}
            </div>
          ))}
        </aside>
        <div className="col-span-12 md:col-span-10 p-5 sm:p-6 grid grid-cols-12 gap-4">
          {[
            { l: "New Leads", v: "184", d: "+24%" },
            { l: "Booked Jobs", v: "62", d: "+18%" },
            { l: "Estimates Sent", v: "38", d: "+11%" },
            { l: "Reviews", v: "24", d: "+9" },
          ].map((k) => (
            <div key={k.l} className="col-span-6 lg:col-span-3 rounded-xl border border-border bg-background p-4">
              <div className="text-[11.5px] text-muted-foreground">{k.l}</div>
              <div className="mt-1.5 flex items-baseline gap-2">
                <div className="font-display text-2xl font-semibold tracking-tight">{k.v}</div>
                <span className="text-[11px] font-medium text-[oklch(0.55_0.14_150)]">{k.d}</span>
              </div>
            </div>
          ))}
          <div className="col-span-12 lg:col-span-7 rounded-xl border border-border bg-background p-4">
            <div className="flex items-center justify-between">
              <div className="text-[13px] font-medium">Lead Pipeline</div>
              <span className="text-[11px] text-muted-foreground">This week</span>
            </div>
            <div className="mt-4 grid grid-cols-4 gap-2 text-[11px]">
              {["New", "Qualified", "Estimate", "Booked"].map((s, i) => (
                <div key={s} className="rounded-lg border border-border bg-surface p-2.5">
                  <div className="text-muted-foreground text-[10.5px] uppercase tracking-wider">{s}</div>
                  <div className="mt-1.5 font-display text-lg font-semibold">{[12, 8, 5, 4][i]}</div>
                  <div className="mt-2 h-1 rounded-full bg-border overflow-hidden">
                    <div
                      className="h-full bg-gold animate-bar-grow"
                      style={{ width: `${[85, 60, 40, 30][i]}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-12 lg:col-span-5 rounded-xl border border-border bg-background p-4">
            <div className="flex items-center gap-1.5 text-[12.5px] font-medium">
              <Bot className="h-3.5 w-3.5" /> AI Agents
              <span className="ml-auto inline-flex items-center gap-1.5 text-[10.5px] text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.7_0.14_150)] animate-pulse-dot" />
                Active
              </span>
            </div>
            <ul className="mt-3 space-y-1.5 text-[11.5px] text-muted-foreground">
              <li className="flex justify-between"><span>Lead Qualifier</span><span className="text-foreground">18 today</span></li>
              <li className="flex justify-between"><span>Speed-to-Lead</span><span className="text-foreground">42 today</span></li>
              <li className="flex justify-between"><span>Follow-Up</span><span className="text-foreground">31 today</span></li>
              <li className="flex justify-between"><span>Estimate Drafter</span><span className="text-foreground">9 today</span></li>
            </ul>
          </div>
        </div>
      </div>
    </MockupFrame>
  );
}

function ConnectDiagram() {
  const nodes = [
    { label: "Website", icon: Inbox },
    { label: "Ads", icon: LineChart },
    { label: "Missed Calls", icon: MessageSquare },
    { label: "Social DMs", icon: MessageSquare },
  ];
  const outputs = [
    { label: "Booked Jobs", icon: Calendar },
    { label: "Signed Proposals", icon: FileText },
    { label: "Reviews", icon: Star },
  ];
  return (
    <div className="mt-12 rounded-2xl border border-border bg-surface-elevated p-6 sm:p-10 shadow-elegant">
      <div className="grid gap-8 lg:grid-cols-[1fr_auto_1fr] items-center">
        <div className="space-y-2.5">
          {nodes.map((n, i) => (
            <Reveal
              key={n.label}
              delay={i * 60}
              className="flex items-center gap-3 rounded-lg border border-border bg-background px-4 py-3"
            >
              <n.icon className="h-4 w-4 text-muted-foreground" />
              <span className="text-[13.5px]">{n.label}</span>
              <ArrowRight className="ml-auto h-3.5 w-3.5 text-gold" />
            </Reveal>
          ))}
        </div>
        <Reveal delay={280} className="mx-auto">
          <div className="rounded-2xl border border-border bg-background p-6 shadow-elegant text-center min-w-[220px]">
            <div className="mx-auto h-10 w-10 rounded-xl bg-gold-soft border border-[color:color-mix(in_oklab,var(--gold)_50%,var(--border))] grid place-items-center">
              <Zap className="h-4 w-4 text-foreground" />
            </div>
            <div className="mt-3 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              Command Center
            </div>
            <div className="mt-1 font-display text-lg font-semibold">RenoMeta Connect</div>
            <div className="mt-3 text-[12px] text-muted-foreground">
              Inbox · CRM · AI · Automation
            </div>
          </div>
        </Reveal>
        <div className="space-y-2.5">
          {outputs.map((n, i) => (
            <Reveal
              key={n.label}
              delay={i * 60}
              className="flex items-center gap-3 rounded-lg border border-border bg-background px-4 py-3"
            >
              <ArrowRight className="h-3.5 w-3.5 text-gold" />
              <span className="text-[13.5px]">{n.label}</span>
              <n.icon className="ml-auto h-4 w-4 text-muted-foreground" />
            </Reveal>
          ))}
        </div>
      </div>
      <div className="mt-6 text-center text-[12.5px] text-muted-foreground">
        <Link to="/solutions" className="underline decoration-gold/50 underline-offset-4 hover:text-foreground">
          Explore each capability →
        </Link>
      </div>
    </div>
  );
}
