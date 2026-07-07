import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site-chrome";
import {
  Section,
  SectionHeader,
  FeatureGrid,
  CTASection,
  MockupFrame,
  Reveal,
  BenefitGrid,
} from "@/components/page-primitives";
import {
  Activity,
  BarChart3,
  Calendar,
  Clock,
  LineChart,
  Settings2,
  Sparkles,
  Workflow,
} from "lucide-react";

export const Route = createFileRoute("/growth-operations")({
  head: () => ({
    meta: [
      { title: "Growth Operations — RenoMeta" },
      {
        name: "description",
        content:
          "Optimize lead flow, response time, follow-up performance, conversion tracking, reporting, and workflow efficiency over time.",
      },
      { property: "og:title", content: "Growth Operations" },
      { property: "og:description", content: "Improve the system behind your growth." },
    ],
  }),
  component: GrowthOpsPage,
});

function GrowthOpsPage() {
  return (
    <PageShell
      eyebrow="Growth Operations"
      headline="Improve the System Behind Your Growth"
      subheading="Optimize lead flow, response time, follow-up performance, conversion tracking, reporting, and workflow efficiency over time."
      primaryCta={{ label: "Improve My Growth System", to: "/contact" }}
      secondaryCta={{ label: "See the Platform", to: "/renometa-connect" }}
      heroVisual={<OpsDashboard />}
    >
      <Section>
        <SectionHeader
          eyebrow="Growth Operations overview"
          title="Optimize the pipeline, not just the pieces"
          desc="A working system beats a stack of tools. Growth Operations tunes the flow between lead, inbox, CRM, and follow-up so the whole business gets faster over time."
        />
        <FeatureGrid
          cols={3}
          items={[
            { icon: Activity, title: "Lead flow analysis", desc: "See where leads enter, stall, and drop out — by source and stage." },
            { icon: Clock, title: "Response time tracking", desc: "Measure first-touch time on every channel." },
            { icon: Workflow, title: "Workflow optimization", desc: "Refine automations against real conversion data." },
            { icon: Sparkles, title: "Automation review", desc: "Audit which agents and sequences are actually earning their keep." },
            { icon: Calendar, title: "Appointment conversion", desc: "Track booked → attended → closed on every job type." },
            { icon: BarChart3, title: "Reporting", desc: "Owner-level reports that don't require a data team." },
          ]}
        />
      </Section>

      <Section tone="surface">
        <SectionHeader
          eyebrow="Reporting & recommendations"
          title="Not just numbers — the next move"
          desc="Growth Operations pairs live metrics with a set of recommended actions each cycle."
        />
        <Reveal>
          <RecoBoard />
        </Reveal>
      </Section>

      <Section>
        <SectionHeader eyebrow="Benefits" title="What compounding operational improvements look like" />
        <BenefitGrid
          items={[
            "Response time trending down quarter over quarter",
            "Higher contact rate on inbound leads",
            "More appointments actually booked and attended",
            "Follow-up sequences that convert, not annoy",
            "Cleaner data on what marketing actually returns",
            "A team that can scale without adding chaos",
          ]}
        />
      </Section>

      <CTASection
        title="Improve My Growth System"
        desc="Turn your platform into a system that gets sharper every quarter."
        primary={{ label: "Improve My Growth System", to: "/contact" }}
        secondary={{ label: "See Custom AI Solutions", to: "/custom-ai-solutions" }}
      />
    </PageShell>
  );
}

function OpsDashboard() {
  return (
    <MockupFrame url="connect.renometa.com / operations">
      <div className="p-5 sm:p-6 grid grid-cols-12 gap-4">
        {[
          { l: "Avg response", v: "0:42", d: "-63%" },
          { l: "Contact rate", v: "78%", d: "+14pt" },
          { l: "Booked appts", v: "62", d: "+18%" },
          { l: "Show rate", v: "84%", d: "+6pt" },
        ].map((k) => (
          <div key={k.l} className="col-span-6 lg:col-span-3 rounded-xl border border-border bg-background p-4">
            <div className="text-[11.5px] text-muted-foreground">{k.l}</div>
            <div className="mt-1.5 flex items-baseline gap-2">
              <div className="font-display text-2xl font-semibold tracking-tight">{k.v}</div>
              <span className="text-[11px] font-medium text-[oklch(0.55_0.14_150)]">{k.d}</span>
            </div>
            <div className="mt-3 h-6 flex items-end gap-0.5">
              {[3, 4, 3, 5, 4, 6, 5, 7, 6, 8, 7, 9].map((h, i) => (
                <span key={i} className="w-1 rounded-sm bg-border animate-bar-grow" style={{ height: `${h * 3}px`, animationDelay: `${i * 50}ms` }} />
              ))}
            </div>
          </div>
        ))}
        <div className="col-span-12 lg:col-span-8 rounded-xl border border-border bg-background p-4">
          <div className="flex items-center justify-between">
            <div className="text-[13px] font-medium">Pipeline movement · Last 30 days</div>
            <span className="text-[11px] text-muted-foreground"><LineChart className="inline h-3 w-3 mr-1" />Trending up</span>
          </div>
          <div className="mt-4 h-32 flex items-end gap-1">
            {Array.from({ length: 30 }).map((_, i) => {
              const h = 30 + Math.sin(i / 3) * 15 + i * 1.2;
              return (
                <span
                  key={i}
                  className="flex-1 rounded-sm animate-bar-grow"
                  style={{
                    height: `${Math.min(h, 100)}%`,
                    background: i > 22 ? "color-mix(in oklab, var(--gold) 70%, transparent)" : "oklch(0.85 0.01 85)",
                    animationDelay: `${i * 30}ms`,
                  }}
                />
              );
            })}
          </div>
        </div>
        <div className="col-span-12 lg:col-span-4 rounded-xl border border-border bg-background p-4">
          <div className="flex items-center gap-1.5 text-[12.5px] font-medium">
            <Settings2 className="h-3.5 w-3.5" /> Automations
          </div>
          <ul className="mt-2.5 space-y-1.5 text-[11.5px] text-muted-foreground">
            <li className="flex justify-between"><span>Missed-call text-back</span><span className="text-foreground">Active</span></li>
            <li className="flex justify-between"><span>New-lead qualifier</span><span className="text-foreground">Active</span></li>
            <li className="flex justify-between"><span>Estimate follow-up</span><span className="text-foreground">Active</span></li>
            <li className="flex justify-between"><span>Post-job reviews</span><span className="text-foreground">Active</span></li>
          </ul>
        </div>
      </div>
    </MockupFrame>
  );
}

function RecoBoard() {
  const items = [
    { title: "Response time on Instagram is 8× SMS", note: "Route DMs through the same first-reply agent to cut it below 60s.", tag: "Impact: high" },
    { title: "Estimate → proposal takes 4.2 days", note: "Auto-generate proposals from approved estimates to shave 2 days.", tag: "Impact: high" },
    { title: "Cold leads not being reactivated", note: "Turn on the 90-day reactivation sequence for 340 dormant contacts.", tag: "Impact: medium" },
    { title: "Show rate dips on Fridays", note: "Add an SMS reminder 2 hours before Friday appointments.", tag: "Impact: medium" },
  ];
  return (
    <div className="mt-12 grid gap-4 md:grid-cols-2">
      {items.map((r, i) => (
        <Reveal key={r.title} delay={i * 60}>
          <div className="card-elegant card-elegant-hover p-5 h-full">
            <div className="flex items-center justify-between">
              <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{r.tag}</div>
              <span className="text-[10.5px] px-2 py-0.5 rounded-full bg-gold-soft border border-[color:color-mix(in_oklab,var(--gold)_45%,var(--border))]">
                Recommended
              </span>
            </div>
            <h4 className="mt-3 text-[15px] font-medium leading-snug">{r.title}</h4>
            <p className="mt-2 text-[13.5px] text-muted-foreground leading-relaxed">{r.note}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
