import { createFileRoute, Link } from "@tanstack/react-router";
import { type ReactNode, type HTMLAttributes, useState } from "react";
import { useReveal } from "@/hooks/use-reveal";
import { SiteNav, SiteFooter } from "@/components/site-chrome";
import { TryAgentSection } from "@/components/try-agent-section";
import { trackEvent } from "@/lib/tracking";

import {
  ArrowRight,
  Bot,
  Calendar,
  Check,
  FileSignature,
  FileText,
  Globe,
  Inbox,
  Instagram,
  Layers,
  LineChart,
  Mail,
  Megaphone,
  MessageSquare,
  ListChecks,
  PhoneCall,
  Send,
  Sparkles,
  Star,
  Users,
  Workflow,
  Zap,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Turn More Leads Into Booked Jobs | RenoMeta Connect" },
      {
        name: "description",
        content:
          "RenoMeta Connect brings AI agents, CRM, messaging, scheduling, estimates, follow-up, and marketing into one system built for remodeling and home-service businesses.",
      },
      { property: "og:title", content: "Turn More Leads Into Booked Jobs | RenoMeta Connect" },
      {
        property: "og:description",
        content:
          "AI agents, CRM, messaging, scheduling, estimates, follow-up, and marketing in one connected system for remodeling and home-service businesses.",
      },
      { property: "og:url", content: "/" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Turn More Leads Into Booked Jobs | RenoMeta Connect" },
      {
        name: "twitter:description",
        content:
          "AI agents, CRM, messaging, scheduling, estimates, follow-up, and marketing in one connected system for remodeling and home-service businesses.",
      },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main>
        <Hero />
        <ProofStrip />
        <LeadWorkflow />
        <CommandCenterSection />
        <AICenterSection />
        <BeforeWithSection />
        <FeatureCategories />
        <TryAgentSection tone="surface" />
        <ResultsSection />
        <PricingPositioning />
        <IntegrationsSection />
        <FinalCTA />
      </main>
      <SiteFooter />
    </div>
  );
}

/* -------------------- REVEAL WRAPPER -------------------- */
function Reveal({
  as: Tag = "div",
  delay = 0,
  className = "",
  children,
  ...rest
}: {
  as?: "div" | "section" | "li" | "article";
  delay?: number;
  className?: string;
  children: ReactNode;
} & HTMLAttributes<HTMLElement>) {
  const ref = useReveal<HTMLElement>();
  return (
    <Tag
      ref={ref as never}
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* Nav, Logo, NavDropdown moved to src/components/site-chrome.tsx */

/* -------------------- HERO -------------------- */
function Hero() {
  return (
    <section className="relative pt-32 pb-20 sm:pb-24 overflow-hidden bg-hero-radial">
      <div className="absolute inset-0 bg-grid-fade opacity-70 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="max-w-3xl text-left pt-8">
          <h1
            className="font-display text-[32px] sm:text-5xl lg:text-[58px] leading-[1.1] sm:leading-[1.06] tracking-[-0.03em] font-semibold text-foreground animate-reveal"
            style={{ animationDelay: "60ms" }}
          >
            Turn More Leads Into Booked Jobs — Without Adding More Admin Work
          </h1>
          <p
            className="mt-6 text-pretty text-[16.5px] sm:text-[17.5px] text-muted-foreground max-w-xl leading-relaxed animate-reveal"
            style={{ animationDelay: "200ms" }}
          >
            RenoMeta Connect brings AI agents, CRM, messaging, scheduling, estimates, follow-up, and
            marketing into one system built for remodeling and home-service businesses.
          </p>
          <div
            className="mt-9 flex flex-wrap items-center gap-3 animate-reveal"
            style={{ animationDelay: "340ms" }}
          >
            <a
              href="https://connect.renometa.com/signup"
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
              onClick={() => trackEvent("trial_start", { page: "/", plan: "hero" })}
            >
              Start Free Trial
              <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              to="/try-agent"
              className="btn-ghost"
              onClick={() => trackEvent("try_agent", { source: "hero" })}
            >
              Try Agent Live
            </Link>
          </div>
          <p
            className="mt-5 text-[13.5px] text-muted-foreground animate-reveal"
            style={{ animationDelay: "420ms" }}
          >
            From first inquiry to booked job, RenoMeta keeps the entire customer journey moving.
          </p>
        </div>

        <div className="mt-14 sm:mt-16 animate-reveal" style={{ animationDelay: "120ms" }}>
          <DashboardMockup />
        </div>
      </div>
    </section>
  );
}

/* -------------------- PROOF / POSITIONING STRIP -------------------- */
function ProofStrip() {
  const points = [
    { icon: Zap, text: "Faster lead response" },
    { icon: Workflow, text: "Automated follow-up" },
    { icon: Layers, text: "Fewer disconnected tools" },
    { icon: ArrowRight, text: "One customer journey from inquiry to booked job" },
  ];
  return (
    <section className="border-y border-border bg-surface/60">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-muted-foreground">
          <span className="h-px w-6 bg-gold" />
          Built for remodeling and home-service businesses
        </div>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {points.map((p) => (
            <div key={p.text} className="flex items-start gap-2.5">
              <p.icon className="h-4 w-4 text-gold mt-0.5 shrink-0" strokeWidth={1.75} />
              <span className="text-[13.5px] text-foreground/85 leading-relaxed">{p.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- SECTION HEADER -------------------- */
function SectionHeader({
  eyebrow,
  title,
  desc,
  center = false,
}: {
  eyebrow?: string;
  title: string;
  desc?: string;
  center?: boolean;
}) {
  return (
    <div className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <div
          className={`inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-muted-foreground ${center ? "justify-center" : ""}`}
        >
          <span className="h-px w-6 bg-gold" />
          {eyebrow}
        </div>
      )}
      <h2 className="mt-4 font-display text-balance text-4xl sm:text-5xl lg:text-[52px] leading-[1.08] tracking-[-0.025em] font-semibold">
        {title}
      </h2>
      {desc && (
        <p
          className={`mt-5 text-[16px] text-muted-foreground leading-relaxed ${center ? "mx-auto" : ""} max-w-2xl`}
        >
          {desc}
        </p>
      )}
    </div>
  );
}

/* -------------------- LEAD WORKFLOW -------------------- */
function LeadWorkflow() {
  const steps = [
    { icon: Inbox, title: "Lead Captured", desc: "Website, ads, calls, social, or forms" },
    { icon: Bot, title: "AI Responds", desc: "Fast first response across supported channels" },
    {
      icon: ListChecks,
      title: "Lead Qualified",
      desc: "Project details, intent, budget, timing, and context organized",
    },
    {
      icon: Calendar,
      title: "Appointment Booked",
      desc: "Scheduling and reminders move the opportunity forward",
    },
    {
      icon: Users,
      title: "Team Follows Through",
      desc: "CRM, estimates, follow-up, reporting, and next actions stay connected",
    },
  ];
  return (
    <section className="py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="The lead lifecycle"
          title="What happens when a new lead comes in?"
          desc="RenoMeta keeps the process moving automatically while your team stays in control."
        />
        <div className="mt-14 relative">
          <div
            className="hidden lg:block absolute top-6 left-[10%] right-[10%] h-px bg-border"
            aria-hidden
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4">
            {steps.map((s, idx) => (
              <Reveal
                key={s.title}
                delay={idx * 80}
                className="relative flex flex-col items-start lg:items-center lg:text-center"
              >
                <div className="relative z-10 h-12 w-12 rounded-full border border-border bg-surface-elevated grid place-items-center shrink-0">
                  <s.icon className="h-5 w-5 text-gold" strokeWidth={1.75} />
                </div>
                <div className="mt-4 font-mono text-[11px] uppercase tracking-wider text-gold-strong">
                  Step {idx + 1}
                </div>
                <h3 className="mt-1.5 font-display text-[16.5px] font-semibold tracking-tight">
                  {s.title}
                </h3>
                <p className="mt-1.5 text-[13px] text-muted-foreground leading-relaxed">{s.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------- COMMAND CENTER -------------------- */
const COMMAND_TABS = [
  {
    key: "inbox",
    label: "Inbox",
    desc: "Every conversation — SMS, WhatsApp, Messenger, Instagram, and voice — stays in one place.",
  },
  {
    key: "pipeline",
    label: "Pipeline",
    desc: "See exactly where each opportunity stands, from new lead to booked job.",
  },
  {
    key: "ai",
    label: "AI Agents",
    desc: "AI-assisted agents help qualify leads, draft estimates, and keep follow-up moving.",
  },
  {
    key: "estimates",
    label: "Estimates",
    desc: "Draft and track estimates without leaving the conversation.",
  },
  {
    key: "campaigns",
    label: "Campaigns",
    desc: "See how marketing activity connects back to leads and booked jobs.",
  },
] as const;

type CommandTabKey = (typeof COMMAND_TABS)[number]["key"];

function CommandCenterSection() {
  const [active, setActive] = useState<CommandTabKey>("inbox");
  const activeTab = COMMAND_TABS.find((t) => t.key === active) ?? COMMAND_TABS[0];

  return (
    <section className="py-24 sm:py-28 bg-surface/50 border-y border-border">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Command Center"
          title="One place to see what needs attention"
          desc="Leads, conversations, pipeline activity, AI actions, estimates, appointments, campaigns, and follow-up stay visible in one operating view."
        />
        <div className="mt-10 flex flex-wrap gap-2">
          {COMMAND_TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setActive(t.key)}
              aria-pressed={active === t.key}
              className={`text-[12.5px] px-3.5 py-2 rounded-full border transition-colors ${
                active === t.key
                  ? "border-[color:color-mix(in_oklab,var(--gold)_50%,var(--border))] bg-gold-soft text-foreground"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <p className="mt-4 max-w-2xl text-[14px] text-muted-foreground leading-relaxed">
          {activeTab.desc}
        </p>
        <div className="mt-8">
          <DashboardMockup highlight={active} />
        </div>
        <p className="mt-4 text-[11.5px] text-muted-foreground">
          Example workspace — illustrative data shown for demonstration.
        </p>
      </div>
    </section>
  );
}

/* -------------------- DASHBOARD MOCKUP -------------------- */
function DashboardMockup({ highlight }: { highlight?: CommandTabKey }) {
  // The mockup renders at a fixed intrinsic size and is uniformly scaled to
  // fill an aspect-ratio box. This guarantees identical framing, cropping,
  // and internal proportions across every breakpoint.
  const ring = (...keys: CommandTabKey[]) =>
    highlight && keys.includes(highlight)
      ? "ring-2 ring-[color:var(--gold)] ring-offset-2 ring-offset-background"
      : "";

  return (
    <div className="relative mx-auto w-full max-w-6xl [container-type:inline-size]">
      <div
        aria-hidden
        className="absolute -inset-x-10 -top-10 h-40 blur-3xl opacity-60 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, color-mix(in oklab, var(--gold) 35%, transparent), transparent 70%)",
        }}
      />
      <div className="relative w-full aspect-[1200/760] overflow-hidden rounded-2xl border border-border bg-surface-elevated shadow-elegant transition-transform duration-700 hover:-translate-y-1 hover:shadow-[0_20px_60px_-24px_oklch(0_0_0/0.18)]">
        <div
          className="absolute inset-x-0 top-0 h-px animate-shimmer pointer-events-none z-10"
          aria-hidden
        />
        <div
          className="absolute top-0 left-0 origin-top-left"
          style={{
            width: "1200px",
            height: "760px",
            transform: "scale(calc(100cqi / 1200px))",
          }}
        >
          <div className="flex h-full w-full flex-col">
            <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-surface shrink-0">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.85_0.02_30)]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.88_0.02_80)]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.86_0.05_150)]" />
              </div>
              <div className="text-[11px] text-muted-foreground font-mono">
                connect.renometa.com / command-center
              </div>
              <div className="text-[11px] text-muted-foreground">Today</div>
            </div>

            <div className="grid grid-cols-12 flex-1 min-h-0">
              <div
                className="col-span-2 flex flex-col gap-1 border-r border-border p-4 bg-surface/60"
                aria-hidden="true"
              >
                <SidebarItem icon={<Zap className="h-3.5 w-3.5" />} label="Command Center" active />
                <SidebarItem icon={<Inbox className="h-3.5 w-3.5" />} label="Inbox" />
                <SidebarItem icon={<Users className="h-3.5 w-3.5" />} label="Pipeline" />
                <SidebarItem icon={<FileText className="h-3.5 w-3.5" />} label="Estimates" />
                <SidebarItem icon={<Calendar className="h-3.5 w-3.5" />} label="Scheduling" />
                <SidebarItem icon={<Bot className="h-3.5 w-3.5" />} label="AI Agents" />
                <SidebarItem icon={<Workflow className="h-3.5 w-3.5" />} label="Workflows" />
                <SidebarItem icon={<LineChart className="h-3.5 w-3.5" />} label="Insights" />
              </div>

              <div className="col-span-10 p-6 grid grid-cols-12 gap-4">
                <Kpi className="col-span-3" label="New Leads" value="184" delta="+24%" />
                <Kpi className="col-span-3" label="Booked Jobs" value="62" delta="+18%" />
                <Kpi className="col-span-3" label="AI Agent Runs" value="1,247" delta="+41%" />
                <Kpi
                  className="col-span-3"
                  label="Response Time"
                  value="0:42"
                  delta="-63%"
                  positive
                />

                {/* Unified inbox */}
                <div
                  className={`col-span-5 rounded-xl border border-border bg-background p-4 transition-shadow duration-300 ${ring("inbox")}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Inbox className="h-3.5 w-3.5 text-foreground" />
                      <div className="text-[13px] font-medium">Unified Inbox</div>
                    </div>
                    <span className="text-[11px] text-muted-foreground">5 open</span>
                  </div>
                  <div className="mt-4 space-y-2">
                    {[
                      {
                        name: "Sarah M.",
                        msg: "Thursday afternoon works.",
                        ch: "SMS",
                        active: true,
                      },
                      { name: "Daniel R.", msg: "Availability this week?", ch: "WhatsApp" },
                      { name: "Priya K.", msg: "Thanks for the quote!", ch: "Messenger" },
                      { name: "Marcus L.", msg: "Missed call - auto reply", ch: "Voice" },
                    ].map((c) => (
                      <div
                        key={c.name}
                        className={`rounded-lg px-3 py-2 border ${
                          c.active
                            ? "border-[color:color-mix(in_oklab,var(--gold)_35%,var(--border))] bg-gold-soft/40"
                            : "border-border bg-surface"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="text-[12px] font-medium">{c.name}</div>
                          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                            {c.ch}
                          </span>
                        </div>
                        <div className="mt-0.5 text-[11.5px] text-muted-foreground truncate">
                          {c.msg}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pipeline */}
                <div
                  className={`col-span-4 rounded-xl border border-border bg-background p-4 flex flex-col transition-shadow duration-300 ${ring("pipeline")}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="text-[13px] font-medium">Lead Pipeline</div>
                    <span className="text-[11px] text-muted-foreground">This week</span>
                  </div>
                  <div className="mt-4 space-y-3 flex-1">
                    <PipelineRow name="Sarah M." stage="Booked" gold />
                    <PipelineRow name="Daniel R." stage="Estimate" />
                    <PipelineRow name="Priya K." stage="Qualified" />
                    <PipelineRow name="Marcus L." stage="New Lead" />
                  </div>
                </div>

                {/* AI Agents + Estimate */}
                <div
                  className={`col-span-3 rounded-xl border border-border bg-background p-4 flex flex-col gap-4 transition-shadow duration-300 ${ring("ai", "estimates")}`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-[12.5px] font-medium">
                        <Bot className="h-3.5 w-3.5" /> AI Agents
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-[10.5px] text-muted-foreground">
                        <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.7_0.14_150)] animate-pulse-dot" />
                        Active
                      </span>
                    </div>
                    <ul className="mt-2.5 space-y-1.5 text-[11.5px] text-muted-foreground">
                      <li className="flex justify-between">
                        <span>Lead Qualifier</span>
                        <span className="text-foreground">18</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Speed-to-Lead</span>
                        <span className="text-foreground">42</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Follow-Up</span>
                        <span className="text-foreground">31</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Estimate Drafter</span>
                        <span className="text-foreground">9</span>
                      </li>
                    </ul>
                  </div>
                  <div className="rounded-lg border border-border bg-surface p-3">
                    <div className="flex items-center gap-1.5 text-[11.5px] font-medium">
                      <FileText className="h-3.5 w-3.5" /> Estimate draft
                    </div>
                    <div className="mt-1.5 text-[10.5px] text-muted-foreground">
                      Kitchen · Sarah M.
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-[10.5px] text-muted-foreground">Total</span>
                      <span className="font-display text-[15px] font-semibold">$24,800</span>
                    </div>
                  </div>
                </div>

                {/* Bottom row: booking, review, campaigns, workflows */}
                <div className="col-span-3 rounded-xl border border-border bg-background p-4">
                  <div className="flex items-center gap-1.5 text-[12.5px] font-medium">
                    <Calendar className="h-3.5 w-3.5" /> Booking
                  </div>
                  <div className="mt-2 text-[11.5px] text-muted-foreground">Thu · 2:00 PM</div>
                  <div className="text-[12.5px] font-medium mt-0.5">
                    Sarah M. · Kitchen estimate
                  </div>
                  <button className="mt-3 w-full text-[11px] px-2 py-1.5 rounded-md border border-border hover:border-foreground transition-colors">
                    Confirm
                  </button>
                </div>
                <div className="col-span-3 rounded-xl border border-border bg-background p-4">
                  <div className="flex items-center gap-1.5 text-[12.5px] font-medium">
                    <Star className="h-3.5 w-3.5" /> Review Requests
                  </div>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="font-display text-2xl font-semibold">12</span>
                    <span className="text-[11px] text-[oklch(0.55_0.14_150)]">sent today</span>
                  </div>
                  <div className="mt-2 text-[11px] text-muted-foreground">
                    4.9 avg · last 30 days
                  </div>
                </div>
                <div
                  className={`col-span-3 rounded-xl border border-border bg-background p-4 transition-shadow duration-300 ${ring("campaigns")}`}
                >
                  <div className="flex items-center gap-1.5 text-[12.5px] font-medium">
                    <LineChart className="h-3.5 w-3.5" /> Campaigns
                  </div>
                  <div className="mt-2 text-[11.5px] text-muted-foreground">Meta Lead Ads</div>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="font-display text-lg font-semibold">$18</span>
                    <span className="text-[10.5px] text-muted-foreground">CPL · –22%</span>
                  </div>
                </div>
                <div className="col-span-3 rounded-xl border border-border bg-background p-4">
                  <div className="flex items-center gap-1.5 text-[12.5px] font-medium">
                    <Workflow className="h-3.5 w-3.5" /> Workflows
                  </div>
                  <div className="mt-2 inline-flex items-center gap-1.5 text-[11.5px] text-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.7_0.13_150)] animate-pulse-dot" />
                    8 running
                  </div>
                  <div className="mt-2 text-[11px] text-muted-foreground">
                    Missed-call text-back · Nurture · Reviews
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SidebarItem({
  icon,
  label,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-2 px-2.5 py-1.5 rounded-md text-[12.5px] cursor-default ${
        active
          ? "bg-surface-elevated text-foreground border border-border shadow-sm"
          : "text-muted-foreground"
      }`}
    >
      {icon}
      {label}
    </div>
  );
}

function Kpi({
  label,
  value,
  delta,
  positive,
  className = "",
}: {
  label: string;
  value: string;
  delta: string;
  positive?: boolean;
  className?: string;
}) {
  return (
    <div className={`rounded-xl border border-border bg-background p-4 ${className}`}>
      <div className="text-[11.5px] text-muted-foreground">{label}</div>
      <div className="mt-1.5 flex items-baseline gap-2">
        <div className="font-display text-2xl font-semibold tracking-tight">{value}</div>
        <span
          className={`text-[11px] font-medium ${
            positive || !delta.startsWith("-")
              ? "text-[oklch(0.55_0.14_150)]"
              : "text-[oklch(0.55_0.14_150)]"
          }`}
        >
          {delta}
        </span>
      </div>
      <div className="mt-3 h-6 flex items-end gap-0.5">
        {[3, 4, 3, 5, 4, 6, 5, 7, 6, 8, 7, 9].map((h, i) => (
          <span
            key={i}
            className="w-1 rounded-sm bg-border animate-bar-grow"
            style={{
              height: `${h * 3}px`,
              animationDelay: `${i * 60}ms`,
              background: i > 8 ? "color-mix(in oklab, var(--gold) 70%, transparent)" : undefined,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function PipelineRow({ name, stage, gold }: { name: string; stage: string; gold?: boolean }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-border bg-surface px-3 py-2">
      <div className="flex items-center gap-2.5">
        <div className="h-6 w-6 rounded-full bg-gradient-to-br from-[color:var(--gold-soft)] to-surface-elevated border border-border grid place-items-center text-[10px] font-medium text-muted-foreground">
          {name[0]}
        </div>
        <div className="text-[12.5px] font-medium">{name}</div>
      </div>
      <span
        className={`text-[10.5px] px-2 py-0.5 rounded-full border ${
          gold
            ? "bg-gold-soft border-[color:color-mix(in_oklab,var(--gold)_50%,var(--border))] text-foreground"
            : "bg-background border-border text-muted-foreground"
        }`}
      >
        {stage}
      </span>
    </div>
  );
}

/* -------------------- AI CENTER -------------------- */
function AICenterSection() {
  const agents = [
    {
      icon: ListChecks,
      title: "Lead Qualification",
      desc: "Organizes project details, intent, budget, and timing.",
    },
    {
      icon: Zap,
      title: "Speed-to-Lead",
      desc: "Helps send a fast first response so leads don't go cold.",
    },
    { icon: Send, title: "Follow-Up", desc: "Keeps outreach moving without manual reminders." },
    { icon: Inbox, title: "Inbox Triage", desc: "Sorts and prioritizes incoming conversations." },
    {
      icon: FileText,
      title: "Estimate Assistance",
      desc: "Helps draft estimates from conversation details.",
    },
    {
      icon: Star,
      title: "Review Requests",
      desc: "Sends review requests after a job is complete.",
    },
  ];
  const handoff = ["New Lead", "Lead Qualification", "CRM Update", "Follow-Up", "Appointment"];

  return (
    <section id="ai-center-preview" className="py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="AI Center"
          title="Your AI team works inside your CRM"
          desc="RenoMeta AI agents help handle repetitive customer and operational work while staying connected to the same leads, conversations, pipeline, and business context your team uses."
        />
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {agents.map((a, idx) => (
            <Reveal
              key={a.title}
              delay={(idx % 3) * 80}
              className="card-elegant card-elegant-hover p-6 flex flex-col"
            >
              <div className="h-10 w-10 rounded-xl border border-border bg-surface grid place-items-center">
                <a.icon className="h-4 w-4 text-gold" strokeWidth={1.75} />
              </div>
              <h3 className="mt-4 font-display text-[16px] font-semibold tracking-tight">
                {a.title}
              </h3>
              <p className="mt-1.5 text-[13px] text-muted-foreground leading-relaxed">{a.desc}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 rounded-2xl border border-border bg-surface-elevated p-6 sm:p-8">
          <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-5">
            Example handoff
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {handoff.map((h, idx) => (
              <div key={h} className="flex items-center gap-2">
                <span className="text-[13px] font-medium px-3 py-1.5 rounded-full border border-border bg-background">
                  {h}
                </span>
                {idx < handoff.length - 1 && (
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                )}
              </div>
            ))}
          </div>
        </Reveal>

        <div className="mt-8">
          <Link
            to="/ai-center"
            className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-foreground hover:text-gold transition-colors"
          >
            Explore the AI Center
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* -------------------- BEFORE / WITH RENOMETA -------------------- */
function BeforeWithSection() {
  const without = [
    "Leads scattered across apps",
    "Missed calls require manual follow-up",
    "Separate messaging channels",
    "CRM updates depend on staff",
    "Quotes and follow-up are disconnected",
    "Marketing performance is hard to trace",
  ];
  const withRenoMeta = [
    "One CRM and customer record",
    "Missed-call and follow-up automation",
    "Unified messaging workflow",
    "AI-assisted updates and next actions",
    "Estimates and follow-up stay connected",
    "Campaign activity connects back to leads and jobs",
  ];
  return (
    <section className="py-24 sm:py-28 bg-surface/50 border-y border-border">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader eyebrow="Before and after" title="Replace the patchwork" />
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Reveal className="rounded-2xl border border-border bg-background p-7">
            <div className="text-[12px] uppercase tracking-[0.16em] text-muted-foreground">
              Without RenoMeta
            </div>
            <ul className="mt-5 space-y-3">
              {without.map((w) => (
                <li
                  key={w}
                  className="flex items-start gap-2.5 text-[14px] text-muted-foreground leading-relaxed"
                >
                  <span className="mt-2 h-1 w-1 rounded-full bg-border-strong shrink-0" />
                  {w}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal
            delay={80}
            className="rounded-2xl border border-[color:color-mix(in_oklab,var(--gold)_35%,var(--border))] bg-gradient-to-b from-[color:var(--gold-soft)]/50 to-surface-elevated p-7"
          >
            <div className="text-[12px] uppercase tracking-[0.16em] text-gold-strong">
              With RenoMeta
            </div>
            <ul className="mt-5 space-y-3">
              {withRenoMeta.map((w) => (
                <li
                  key={w}
                  className="flex items-start gap-2.5 text-[14px] text-foreground leading-relaxed"
                >
                  <Check className="mt-0.5 h-4 w-4 text-gold shrink-0" strokeWidth={2.25} />
                  {w}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* -------------------- FEATURE CATEGORIES -------------------- */
function FeatureCategories() {
  const categories = [
    {
      icon: Globe,
      title: "Get Leads",
      items: [
        "Website lead capture",
        "Meta lead workflows",
        "Calls and forms",
        "Campaign tracking",
      ],
      link: { to: "/ai-website-systems", label: "Website Systems" },
    },
    {
      icon: MessageSquare,
      title: "Convert Leads",
      items: [
        "AI qualification",
        "Unified inbox",
        "CRM pipeline",
        "Scheduling",
        "Automated follow-up",
      ],
      link: { to: "/multi-channel-inbox", label: "Multi-Channel Inbox" },
    },
    {
      icon: FileText,
      title: "Close Jobs",
      items: [
        "Estimates",
        "Proposals",
        "E-signature workflows",
        "Reminders",
        "Customer communication",
      ],
      link: { to: "/crm-sales", label: "CRM & Sales" },
    },
    {
      icon: Workflow,
      title: "Run the Business",
      items: ["Workflow automation", "Reporting", "Reviews", "Customer history", "AI insights"],
      link: { to: "/growth-operations", label: "Growth Operations" },
    },
  ];
  return (
    <section className="py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="The platform"
          title="Everything the customer journey needs, organized simply"
        />
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((c, idx) => (
            <Reveal
              key={c.title}
              delay={idx * 70}
              className="card-elegant card-elegant-hover p-6 flex flex-col"
            >
              <div className="h-10 w-10 rounded-xl border border-border bg-surface grid place-items-center">
                <c.icon className="h-4 w-4 text-foreground" strokeWidth={1.5} />
              </div>
              <h3 className="mt-4 font-display text-[17px] font-semibold tracking-tight">
                {c.title}
              </h3>
              <ul className="mt-3 space-y-1.5 flex-1">
                {c.items.map((f) => (
                  <li key={f} className="text-[12.5px] text-muted-foreground leading-relaxed">
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                to={c.link.to}
                className="mt-4 inline-flex items-center gap-1.5 text-[12.5px] font-medium text-foreground hover:text-gold transition-colors"
              >
                {c.link.label}
                <ArrowRight className="h-3 w-3" />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- RESULTS / CASE STUDY --------------------
 * No approved, published case study with verified figures currently exists
 * in this repo/site. Do not fill this in with invented statistics — replace
 * the placeholder copy below only once a real, approved client result is
 * published elsewhere on the site, and keep the "performance varies"
 * context line alongside any figures used.
 * ---------------------------------------------------------------- */
function ResultsSection() {
  return (
    <section className="py-24 sm:py-28 bg-surface/50 border-y border-border">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeader eyebrow="Results" title="Real client results, coming soon" center />
        <Reveal className="mt-10 rounded-2xl border border-dashed border-border bg-background p-10 text-center">
          <p className="text-[14.5px] text-muted-foreground leading-relaxed max-w-xl mx-auto">
            {/* PLACEHOLDER — replace with an approved, published case study
                (client name + verified figures) when available. */}
            A case study with verified client results will be featured here once published. Example
            client result. Performance varies by market, spend, offer, and implementation.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------- PRICING POSITIONING -------------------- */
function PricingPositioning() {
  return (
    <section className="py-24 sm:py-28">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <SectionHeader
          eyebrow="Pricing"
          title="AI should not be locked behind another upgrade"
          desc="Every RenoMeta Connect plan includes the core platform and AI Center. Plans scale primarily with usage as your business grows."
          center
        />
        <div className="mt-8 flex justify-center">
          <Link to="/pricing" className="btn-primary">
            View Pricing
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* -------------------- INTEGRATIONS -------------------- */
function IntegrationsSection() {
  const integrations = [
    { icon: MessageSquare, label: "WhatsApp Business" },
    { icon: Send, label: "Facebook Messenger" },
    { icon: Instagram, label: "Instagram" },
    { icon: Megaphone, label: "Meta Lead Ads" },
    { icon: Mail, label: "Gmail" },
    { icon: Calendar, label: "Google Calendar" },
    { icon: PhoneCall, label: "Twilio" },
    { icon: FileSignature, label: "DocuSign" },
  ];
  return (
    <section className="py-20 sm:py-24 border-y border-border bg-surface/40">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Integrations"
          title="Works with the tools your business already uses"
          center
        />
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {integrations.map((i) => (
            <div
              key={i.label}
              className="flex items-center gap-2 rounded-full border border-border bg-surface-elevated px-4 py-2"
            >
              <i.icon className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.5} />
              <span className="text-[12.5px] text-foreground/85">{i.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- FINAL CTA -------------------- */
function FinalCTA() {
  return (
    <section id="contact" className="py-28">
      <div className="mx-auto max-w-5xl px-6">
        <div className="relative rounded-3xl border border-border bg-hero-radial p-10 sm:p-16 text-center overflow-hidden">
          <div className="absolute inset-0 bg-grid-fade opacity-60 pointer-events-none" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-muted-foreground justify-center">
              <span className="h-px w-6 bg-gold" />
              <Sparkles className="h-3 w-3 text-gold" />
              RenoMeta Connect
            </div>
            <h2 className="mt-4 font-display text-balance text-4xl sm:text-5xl lg:text-[56px] leading-[1.05] tracking-[-0.025em] font-semibold">
              See what RenoMeta can do with your next lead.
            </h2>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://connect.renometa.com/signup"
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
                onClick={() => trackEvent("trial_start", { page: "/", plan: "final_cta" })}
              >
                Start Free Trial
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                to="/try-agent"
                className="btn-ghost"
                onClick={() => trackEvent("try_agent", { source: "final_cta" })}
              >
                Try Agent Live
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
