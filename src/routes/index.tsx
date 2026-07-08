import { createFileRoute, Link } from "@tanstack/react-router";
import { type ReactNode, type HTMLAttributes } from "react";
import { useReveal } from "@/hooks/use-reveal";
import { SiteNav, SiteFooter } from "@/components/site-chrome";
import { PillarVisual } from "@/components/visuals";

import {
  ArrowRight,
  Bot,
  Calendar,
  Check,
  Clock,
  FileText,
  Gauge,
  Globe,
  Inbox,
  Layers,
  LineChart,
  MessageSquare,
  PhoneMissed,
  Send,
  Settings2,
  Sparkles,
  Star,
  Users,
  Workflow,
  Zap,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main>
        <Hero />
        <ProblemStrip />
        <PlatformOverview />
        <FeaturePillars />
        <WhyDifferent />
        <WebsiteLayer />
        <HowItWorks />
        <Outcomes />
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
    <section className="relative pt-32 pb-24 overflow-hidden bg-hero-radial">
      <div className="absolute inset-0 bg-grid-fade opacity-70 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="max-w-4xl text-left pt-8">
          <h1
            className="font-display text-[32px] sm:text-5xl lg:text-[64px] leading-[1.08] sm:leading-[1.03] tracking-[-0.03em] font-semibold text-foreground animate-reveal"
            style={{ animationDelay: "60ms" }}
          >
            <span className="block sm:whitespace-nowrap">The Business Command</span>
            <span className="block sm:whitespace-nowrap">Center for Renovation Contractors</span>
          </h1>
          <p
            className="mt-6 text-pretty text-[16.5px] sm:text-[17.5px] text-muted-foreground max-w-xl leading-relaxed animate-reveal"
            style={{ animationDelay: "200ms" }}
          >
            Manage leads, conversations, estimates, scheduling, marketing, and
            follow-up in one connected platform.
          </p>
          <div
            className="mt-9 flex flex-wrap items-center gap-3 animate-reveal"
            style={{ animationDelay: "340ms" }}
          >
            <Link to="/contact" className="btn-primary">
              Contact Us
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/renometa-connect" className="btn-ghost">
              See Connect in Action
            </Link>
          </div>
        </div>

        <div className="mt-16 sm:mt-20 animate-reveal" style={{ animationDelay: "120ms" }}>
          <DashboardMockup />
        </div>

      </div>
    </section>
  );
}

/* -------------------- DASHBOARD MOCKUP -------------------- */
function DashboardMockup() {
  // The mockup renders at a fixed intrinsic size and is uniformly scaled to
  // fill an aspect-ratio box. This guarantees identical framing, cropping,
  // and internal proportions across every breakpoint.
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
        <div className="absolute inset-x-0 top-0 h-px animate-shimmer pointer-events-none z-10" aria-hidden />
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
              <aside className="col-span-2 flex flex-col gap-1 border-r border-border p-4 bg-surface/60">
                <SidebarItem icon={<Zap className="h-3.5 w-3.5" />} label="Command Center" active />
                <SidebarItem icon={<Inbox className="h-3.5 w-3.5" />} label="Inbox" />
                <SidebarItem icon={<Users className="h-3.5 w-3.5" />} label="Pipeline" />
                <SidebarItem icon={<FileText className="h-3.5 w-3.5" />} label="Estimates" />
                <SidebarItem icon={<Calendar className="h-3.5 w-3.5" />} label="Scheduling" />
                <SidebarItem icon={<Bot className="h-3.5 w-3.5" />} label="AI Agents" />
                <SidebarItem icon={<Workflow className="h-3.5 w-3.5" />} label="Workflows" />
                <SidebarItem icon={<LineChart className="h-3.5 w-3.5" />} label="Insights" />
              </aside>

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
                <div className="col-span-5 rounded-xl border border-border bg-background p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Inbox className="h-3.5 w-3.5 text-foreground" />
                      <div className="text-[13px] font-medium">Unified Inbox</div>
                    </div>
                    <span className="text-[11px] text-muted-foreground">5 open</span>
                  </div>
                  <div className="mt-4 space-y-2">
                    {[
                      { name: "Sarah M.", msg: "Thursday afternoon works.", ch: "SMS", active: true },
                      { name: "Daniel R.", msg: "Availability this week?", ch: "WhatsApp" },
                      { name: "Priya K.", msg: "Thanks for the quote!", ch: "Messenger" },
                      { name: "Marcus L.", msg: "Missed call — auto reply", ch: "Voice" },
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
                <div className="col-span-4 rounded-xl border border-border bg-background p-4 flex flex-col">
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
                <div className="col-span-3 rounded-xl border border-border bg-background p-4 flex flex-col gap-4">
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
                      <li className="flex justify-between"><span>Lead Qualifier</span><span className="text-foreground">18</span></li>
                      <li className="flex justify-between"><span>Speed-to-Lead</span><span className="text-foreground">42</span></li>
                      <li className="flex justify-between"><span>Follow-Up</span><span className="text-foreground">31</span></li>
                      <li className="flex justify-between"><span>Estimate Drafter</span><span className="text-foreground">9</span></li>
                    </ul>
                  </div>
                  <div className="rounded-lg border border-border bg-surface p-3">
                    <div className="flex items-center gap-1.5 text-[11.5px] font-medium">
                      <FileText className="h-3.5 w-3.5" /> Estimate draft
                    </div>
                    <div className="mt-1.5 text-[10.5px] text-muted-foreground">Kitchen · Sarah M.</div>
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
                  <div className="text-[12.5px] font-medium mt-0.5">Sarah M. · Kitchen estimate</div>
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
                  <div className="mt-2 text-[11px] text-muted-foreground">4.9 avg · last 30 days</div>
                </div>
                <div className="col-span-3 rounded-xl border border-border bg-background p-4">
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
                  <div className="mt-2 text-[11px] text-muted-foreground">Missed-call text-back · Nurture · Reviews</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


function MobileHeroCard() {
  return (
    <div className="relative mx-auto max-w-sm">
      <div
        aria-hidden
        className="absolute -inset-x-6 -top-6 h-32 blur-3xl opacity-60 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, color-mix(in oklab, var(--gold) 35%, transparent), transparent 70%)",
        }}
      />
      <div className="relative rounded-2xl border border-border bg-surface-elevated shadow-elegant overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px animate-shimmer pointer-events-none" aria-hidden />
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-surface">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[oklch(0.85_0.02_30)]" />
            <span className="h-2 w-2 rounded-full bg-[oklch(0.88_0.02_80)]" />
            <span className="h-2 w-2 rounded-full bg-[oklch(0.86_0.05_150)]" />
          </div>
          <div className="text-[10px] text-muted-foreground font-mono">connect.renometa.com</div>
        </div>
        <div className="p-4 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-lg border border-border bg-background p-3">
              <div className="text-[10px] text-muted-foreground">New Leads</div>
              <div className="mt-1 font-display text-lg font-semibold">184</div>
              <div className="text-[10px] text-[oklch(0.55_0.14_150)]">+24%</div>
            </div>
            <div className="rounded-lg border border-border bg-background p-3">
              <div className="text-[10px] text-muted-foreground">Booked</div>
              <div className="mt-1 font-display text-lg font-semibold">62</div>
              <div className="text-[10px] text-[oklch(0.55_0.14_150)]">+18%</div>
            </div>
          </div>
          <div className="rounded-lg border border-border bg-background p-3">
            <div className="flex items-center gap-1.5 text-[11.5px] font-medium">
              <Inbox className="h-3 w-3" /> Unified Inbox
            </div>
            <div className="mt-2 space-y-1.5">
              {[
                { name: "Sarah M.", ch: "SMS", active: true },
                { name: "Daniel R.", ch: "WhatsApp" },
                { name: "Priya K.", ch: "Messenger" },
              ].map((c) => (
                <div
                  key={c.name}
                  className={`flex items-center justify-between rounded-md px-2 py-1.5 border ${
                    c.active
                      ? "border-[color:color-mix(in_oklab,var(--gold)_35%,var(--border))] bg-gold-soft/40"
                      : "border-border bg-surface"
                  }`}
                >
                  <span className="text-[11px] font-medium">{c.name}</span>
                  <span className="text-[9.5px] uppercase tracking-wider text-muted-foreground">
                    {c.ch}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-border bg-background p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[11.5px] font-medium">
                <Bot className="h-3 w-3" /> AI Agents
              </div>
              <span className="inline-flex items-center gap-1.5 text-[10px] text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.7_0.14_150)] animate-pulse-dot" />
                Active
              </span>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1 text-[10.5px] text-muted-foreground">
              <div className="flex justify-between"><span>Speed-to-Lead</span><span className="text-foreground">42</span></div>
              <div className="flex justify-between"><span>Follow-Up</span><span className="text-foreground">31</span></div>
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
            positive || !delta.startsWith("-") ? "text-[oklch(0.55_0.14_150)]" : "text-[oklch(0.55_0.14_150)]"
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
              background:
                i > 8
                  ? "color-mix(in oklab, var(--gold) 70%, transparent)"
                  : undefined,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function PipelineRow({
  name,
  stage,
  gold,
}: {
  name: string;
  stage: string;
  gold?: boolean;
}) {
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
        <div className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-muted-foreground">
          <span className="h-px w-6 bg-gold" />
          {eyebrow}
        </div>
      )}
      <h2 className="mt-4 font-display text-balance text-4xl sm:text-5xl lg:text-[56px] leading-[1.05] tracking-[-0.025em] font-semibold">
        {title}
      </h2>
      {desc && (
        <p className="mt-5 text-[17px] text-muted-foreground max-w-2xl leading-relaxed">
          {desc}
        </p>
      )}
    </div>
  );
}

/* -------------------- PROBLEM / SOLUTION -------------------- */
function ProblemStrip() {
  const items = [
    { icon: Clock, text: "Missed leads from slow response times" },
    { icon: MessageSquare, text: "Conversations spread across too many channels" },
    { icon: FileText, text: "Estimates, follow-up, and scheduling handled manually" },
    { icon: Gauge, text: "No clear visibility into what is working" },
  ];
  return (
    <section className="border-y border-border bg-surface/60">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-muted-foreground">
          <span className="h-px w-6 bg-gold" />
          Problems contractors face daily
        </div>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((i) => (
            <div key={i.text} className="flex items-start gap-3">
              <div className="mt-0.5 h-7 w-7 rounded-lg border border-border bg-surface-elevated grid place-items-center shrink-0">
                <i.icon className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.5} />
              </div>
              <p className="text-[13.5px] text-foreground/85 leading-relaxed">{i.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-14 pt-10 border-t border-border max-w-3xl">
          <div className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-muted-foreground">
            <span className="h-px w-6 bg-gold" />
            The Solution
          </div>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-[44px] leading-[1.08] tracking-[-0.025em] font-semibold text-balance">
            One connected platform for the full customer journey.
          </h2>
          <p className="mt-5 text-[16px] text-muted-foreground leading-relaxed">
            RenoMeta Connect brings your leads, conversations, estimates,
            scheduling, marketing, and follow-up into one connected platform
            built for renovation and home service businesses.
          </p>
        </div>
      </div>
    </section>
  );
}

/* -------------------- PLATFORM OVERVIEW -------------------- */
function PlatformOverview() {
  const chips = [
    "Unified inbox",
    "Lead pipeline",
    "AI agent activity",
    "Estimate draft",
    "Appointment booking",
    "Review request",
    "Campaign performance",
    "Workflow automation",
  ];
  return (
    <section id="platform" className="py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="RenoMeta Connect"
          title="One command center for leads, sales, marketing, and operations."
          desc="AI agents, sales tools, marketing, and operations — unified in one command center built for renovation contractors."
        />

        <Reveal className="mt-10 max-w-3xl">
          <p className="text-[15.5px] text-muted-foreground leading-relaxed">
            RenoMeta Connect gives renovation and home service businesses one place
            to manage customer conversations, automate follow-up, create estimates,
            schedule jobs, track performance, and keep every opportunity moving.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {chips.map((c) => (
              <span
                key={c}
                className="text-[12px] px-3 py-1.5 rounded-full border border-border bg-surface-elevated text-foreground/80"
              >
                {c}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------- FEATURE PILLARS -------------------- */
function FeaturePillars() {
  const pillars = [
    {
      icon: Bot,
      title: "AI Center",
      desc: "Autonomous agents and AI tools that help qualify leads, follow up, draft estimates, summarize conversations, update the CRM, request reviews, and surface business insights.",
      features: [
        "Lead Qualifier",
        "Speed-to-Lead Agent",
        "Follow-Up Agent",
        "Estimate Drafter",
        "Proposal Writer",
        "Review Agent",
        "Inbox Triage",
        "Conversation Summary",
        "Task Extractor",
        "AI Insights",
      ],
    },
    {
      icon: MessageSquare,
      title: "Multi-Channel Inbox",
      desc: "One inbox for customer conversations across SMS, WhatsApp, Messenger, Instagram Direct, and voice threads.",
      features: [
        "SMS conversations",
        "WhatsApp messaging",
        "Facebook Messenger",
        "Instagram Direct",
        "Voice conversations grouped by phone number",
        "Missed-call text-back",
      ],
    },
    {
      icon: Users,
      title: "CRM & Sales",
      desc: "Track leads, manage opportunities, create proposals, send quotes, collect signatures, and move jobs through the sales process.",
      features: [
        "Lead and customer records",
        "Visual pipeline",
        "Deal tracking",
        "Forecasting",
        "Proposal and quote workflow",
        "Invoice workflow",
        "DocuSign e-signature",
        "Client portal",
      ],
    },
    {
      icon: Send,
      title: "Marketing & Lead Generation",
      desc: "Run follow-up, lead nurture, reputation, and Meta-powered marketing workflows from the same connected system.",
      features: [
        "Meta Lead Ads",
        "WhatsApp Business",
        "Messenger",
        "Instagram Direct",
        "Meta Ads campaign creation",
        "Twilio SMS marketing",
        "Review requests",
        "Lead nurturing campaigns",
      ],
    },
    {
      icon: Workflow,
      title: "Operations & Workflow Automation",
      desc: "Automate the work behind the work — from scheduling and dispatching to custom workflows and Google Workspace integration.",
      features: [
        "Visual workflow builder",
        "Custom automations",
        "Job scheduling",
        "Dispatching",
        "Job costing",
        "Mobile field management",
        "Gmail integration",
        "Google Calendar",
        "Google Drive",
      ],
    },
    {
      icon: LineChart,
      title: "Insights & Reporting",
      desc: "See what is happening across leads, sales, communication, campaigns, operations, and team performance.",
      features: [
        "Real-time dashboards",
        "Response time tracking",
        "Pipeline analytics",
        "Campaign performance",
        "AI agent activity logs",
        "Business efficiency tracking",
      ],
    },
  ];

  return (
    <section id="pillars" className="py-28 bg-surface/50 border-y border-border">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Feature Pillars"
          title="Everything a contractor needs to run the customer journey."
          desc="Six connected pillars that replace the disconnected tools most contractors are stitching together today."
        />
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pillars.map((p, idx) => (
            <Reveal
              key={p.title}
              delay={(idx % 3) * 80}
              className="card-elegant card-elegant-hover group p-7 relative overflow-hidden flex flex-col"
            >
              <div
                className="absolute top-0 left-7 right-7 h-px gold-line opacity-0 group-hover:opacity-100 transition-opacity"
                aria-hidden
              />
              <PillarVisual name={p.title} size="sm" className="mb-6" />
              <div className="h-11 w-11 rounded-xl border border-border bg-surface grid place-items-center">
                <p.icon className="h-5 w-5 text-foreground" strokeWidth={1.5} />
              </div>
              <h3 className="mt-6 font-display text-[20px] font-semibold tracking-tight">
                {p.title}
              </h3>
              <p className="mt-2.5 text-[14px] text-muted-foreground leading-relaxed">
                {p.desc}
              </p>
              <ul className="mt-5 pt-5 border-t border-border grid grid-cols-1 gap-1.5">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-[12.5px] text-foreground/80">
                    <Check className="h-3 w-3 text-gold shrink-0 mt-1" strokeWidth={2.5} />
                    {f}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- WHY DIFFERENT -------------------- */
function WhyDifferent() {
  const cards = [
    {
      title: "Built for contractors, not generic sales teams",
      desc: "RenoMeta Connect is designed around renovation, construction, and home service workflows — from first inquiry to estimate, booking, follow-up, and project communication.",
    },
    {
      title: "Everything talks to everything",
      desc: "Your inbox, CRM, estimates, calendar, campaigns, automations, and AI agents work together, reducing double-entry and disconnected tools.",
    },
    {
      title: "AI Center included across plans",
      desc: "Core AI agents and tools are part of the platform experience. Pricing tiers differ by usage limits like seats, contacts, SMS, and AI runs — not by locking away the core system.",
    },
    {
      title: "True organization-level separation",
      desc: "Each contractor organization operates in its own isolated workspace, keeping customer data, messages, automations, and reports separated.",
    },
  ];
  return (
    <section className="py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Why RenoMeta Connect is different"
          title="Built for the way renovation and home service businesses actually work."
        />
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-4">
          {cards.map((c, idx) => (
            <Reveal key={c.title} delay={(idx % 2) * 90} className="card-elegant card-elegant-hover p-8">
              <h3 className="font-display text-[22px] font-semibold tracking-tight">
                {c.title}
              </h3>
              <p className="mt-3 text-[14.5px] text-muted-foreground leading-relaxed">
                {c.desc}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- WEBSITE LAYER -------------------- */
function WebsiteLayer() {
  const layers = [
    {
      icon: Globe,
      tag: "Front door",
      title: "Web Design",
      desc: "Conversion-focused websites that capture leads and route them into RenoMeta Connect.",
    },
    {
      icon: Layers,
      tag: "Command center",
      title: "RenoMeta Connect",
      desc: "The platform that manages and converts the lead — inbox, CRM, estimates, scheduling, automation.",
      highlight: true,
    },
    {
      icon: Settings2,
      tag: "Advanced",
      title: "Custom AI Solutions",
      desc: "Advanced workflows and integrations built beyond the standard platform for unique operations.",
    },
  ];
  return (
    <section id="website-layer" className="py-28 bg-surface/50 border-y border-border">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Website Layer"
          title="Your website becomes the front door to RenoMeta Connect."
          desc="RenoMeta can build conversion-focused websites that capture leads and send them directly into your CRM, inbox, booking, and follow-up workflows."
        />

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-4">
          {layers.map((l, idx) => (
            <Reveal
              key={l.title}
              delay={idx * 90}
              className={`relative rounded-2xl border p-7 overflow-hidden transition-all duration-500 ${
                l.highlight
                  ? "border-[color:color-mix(in_oklab,var(--gold)_45%,var(--border))] bg-gradient-to-b from-[color:var(--gold-soft)]/60 to-surface-elevated shadow-[0_10px_40px_-20px_oklch(0.75_0.13_75/0.35)]"
                  : "border-border bg-surface-elevated hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-16px_oklch(0_0_0/0.15)]"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="font-mono text-[11px] tracking-wider text-gold uppercase">
                  {l.tag}
                </div>
                <l.icon className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
              </div>
              <h3 className="mt-5 font-display text-[19px] font-semibold tracking-tight">
                {l.title}
              </h3>
              <p className="mt-2 text-[13.5px] text-muted-foreground leading-relaxed">{l.desc}</p>
              {l.highlight && (
                <div className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-[color:color-mix(in_oklab,var(--gold)_45%,var(--border))] bg-surface-elevated px-2.5 py-1 text-[10.5px] uppercase tracking-wider text-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse-dot" />
                  Core platform
                </div>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- HOW IT WORKS -------------------- */
function HowItWorks() {
  const steps = [
    {
      n: "01",
      title: "Capture the lead",
      desc: "Website forms, calls, messages, Meta leads, and inbound inquiries enter RenoMeta Connect.",
    },
    {
      n: "02",
      title: "Respond instantly",
      desc: "AI agents, missed-call text-back, inbox automation, and follow-up workflows help keep leads warm.",
    },
    {
      n: "03",
      title: "Manage the opportunity",
      desc: "Track conversations, pipeline stage, estimates, proposals, appointments, and next steps in one place.",
    },
    {
      n: "04",
      title: "Automate follow-up",
      desc: "SMS, email, review requests, reminders, reactivation, and lead nurturing workflows keep opportunities moving.",
    },
    {
      n: "05",
      title: "Measure and improve",
      desc: "Dashboards, insights, and agent activity logs show what is working and where to improve.",
    },
  ];
  return (
    <section id="how" className="py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader eyebrow="How it works" title="From first inquiry to booked job." />
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {steps.map((s, idx) => (
            <Reveal key={s.n} delay={idx * 90} className="card-elegant card-elegant-hover p-6 flex flex-col">
              <div className="font-mono text-[11px] text-gold tracking-wider">STEP {s.n}</div>
              <h3 className="mt-4 font-display text-[18px] font-semibold tracking-tight leading-snug">
                {s.title}
              </h3>
              <p className="mt-2 text-[13.5px] text-muted-foreground leading-relaxed">
                {s.desc}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- OUTCOMES -------------------- */
function Outcomes() {
  const items = [
    { icon: Zap, title: "Respond faster to new leads" },
    { icon: PhoneMissed, title: "Reduce missed opportunities" },
    { icon: Inbox, title: "Keep conversations organized" },
    { icon: Workflow, title: "Automate repetitive follow-up" },
    { icon: FileText, title: "Create estimates and proposals faster" },
    { icon: Gauge, title: "Improve visibility across the business" },
    { icon: Layers, title: "Reduce double-entry between tools" },
    { icon: Calendar, title: "Book more appointments and jobs" },
  ];
  return (
    <section id="proof" className="py-28 bg-surface/50 border-y border-border">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Outcomes"
          title="Designed to help contractors move faster and win more work."
        />
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {items.map((i, idx) => (
            <Reveal
              key={i.title}
              delay={(idx % 4) * 60}
              className="group rounded-xl border border-border bg-surface-elevated p-5 hover:border-border-strong hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-16px_oklch(0_0_0/0.15)] transition-all duration-300"
            >
              <i.icon
                className="h-4 w-4 text-muted-foreground group-hover:text-gold transition-all duration-300 group-hover:scale-110"
                strokeWidth={1.5}
              />
              <div className="mt-4 text-[14px] font-medium tracking-tight leading-snug">
                {i.title}
              </div>
            </Reveal>
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
              Run your customer journey from one command center.
            </h2>
            <p className="mt-5 text-[16.5px] text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Bring leads, conversations, estimates, scheduling, marketing, and
              follow-up into one connected platform built for renovation contractors.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link to="/contact" className="btn-primary">
                Contact Us
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/renometa-connect" className="btn-ghost">
                See Connect in Action
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
