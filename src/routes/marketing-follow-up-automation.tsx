import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site-chrome";
import {
  Section,
  SectionHeader,
  FeatureGrid,
  CTASection,
  MockupFrame,
  Reveal,
  StepFlow,
} from "@/components/page-primitives";
import {
  ArrowRight,
  Instagram,
  LineChart,
  Mail,
  MessageCircle,
  MessageSquare,
  RefreshCw,
  Star,
  Zap,
} from "lucide-react";

export const Route = createFileRoute("/marketing-follow-up-automation")({
  head: () => ({
    meta: [
      { title: "Marketing & Follow-Up Automation — RenoMeta" },
      {
        name: "description",
        content:
          "Run campaigns, nurture opportunities, request reviews, and keep your pipeline moving — all connected to your CRM.",
      },
      { property: "og:title", content: "Marketing & Follow-Up Automation" },
      { property: "og:description", content: "Marketing and follow-up connected to your CRM." },
      { property: "og:url", content: "/marketing-follow-up-automation" },
      { name: "twitter:title", content: "Marketing & Follow-Up Automation" },
      { name: "twitter:description", content: "Marketing and follow-up connected to your CRM." },
    ],
    links: [{ rel: "canonical", href: "/marketing-follow-up-automation" }],
  }),
  component: MarketingPage,
});

function MarketingPage() {
  return (
    <PageShell
      eyebrow="Marketing & Follow-Up Automation"
      headline="Marketing and Follow-Up Connected to Your CRM"
      subheading="Run campaigns, nurture opportunities, request reviews, and keep your pipeline moving from the same platform."
      primaryCta={{ label: "Automate My Follow-Up", to: "/contact" }}
      secondaryCta={{ label: "See CRM & Sales", to: "/crm-sales" }}
      heroVisual={<CampaignFlow />}
    >
      <Section>
        <SectionHeader
          eyebrow="Follow-up automation"
          title="Every lead, on the right cadence"
          desc="Nurture sequences, review requests, reminders, and reactivation — running against real CRM records."
        />
        <FeatureGrid
          cols={3}
          items={[
            { icon: MessageSquare, title: "SMS nurture", desc: "Short, timely texts that keep the conversation warm." },
            { icon: Mail, title: "Email sequences", desc: "Multi-step campaigns that follow up on estimates and proposals." },
            { icon: MessageCircle, title: "WhatsApp follow-up", desc: "Business messages sent on the channel the customer prefers." },
            { icon: Instagram, title: "DM automation", desc: "Instagram and Messenger replies triggered by story and ad interactions." },
            { icon: Star, title: "Review requests", desc: "Automatic ask the moment a job is marked complete." },
            { icon: RefreshCw, title: "Reactivation", desc: "Bring cold opportunities back into the pipeline on a schedule." },
          ]}
        />
      </Section>

      <Section tone="surface">
        <SectionHeader
          eyebrow="Ad connection"
          title="Meta Lead Ads that actually land somewhere"
          desc="Leads from Facebook and Instagram Lead Ads flow directly into the inbox and CRM, triggering the same qualification and follow-up as any other source."
        />
        <Reveal>
          <MetaMockup />
        </Reveal>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Campaign performance"
          title="See what is working"
          desc="Every campaign, every channel — measured against the pipeline it actually generated."
        />
        <Reveal>
          <CampaignPerf />
        </Reveal>
      </Section>

      <Section tone="bordered">
        <SectionHeader
          eyebrow="Example flow"
          title="Lead capture → SMS/email follow-up → review request"
        />
        <StepFlow
          steps={[
            { title: "Lead captured", desc: "Meta Lead Ad form triggers a new CRM record." },
            { title: "Instant SMS", desc: "First reply sent within seconds by the Speed-to-Lead Agent." },
            { title: "Nurture sequence", desc: "Email + SMS drip runs until the lead books or opts out." },
            { title: "Job complete", desc: "Status marked Complete in the CRM." },
            { title: "Review request", desc: "Automatic ask sent 24 hours after completion." },
          ]}
        />
      </Section>

      <CTASection
        title="Automate My Follow-Up"
        desc="Turn your pipeline into a system that keeps moving without manual chase."
        primary={{ label: "Automate My Follow-Up", to: "/contact" }}
        secondary={{ label: "See AI Agents", to: "/ai-center" }}
      />
    </PageShell>
  );
}

function CampaignFlow() {
  const steps = [
    { title: "Lead capture", desc: "Ad, form, or DM", icon: Zap },
    { title: "SMS + Email", desc: "Nurture sequence", icon: Mail },
    { title: "Booked job", desc: "Deposit collected", icon: LineChart },
    { title: "Review request", desc: "24h after complete", icon: Star },
  ];
  return (
    <div className="rounded-2xl border border-border bg-surface-elevated p-6 sm:p-8 shadow-elegant">
      <div className="grid gap-4 md:grid-cols-4 items-stretch">
        {steps.map((s, i) => (
          <div key={s.title} className="relative">
            <Reveal delay={i * 80} className="card-elegant card-elegant-hover p-5 h-full">
              <div className="h-9 w-9 rounded-lg border border-border bg-surface grid place-items-center">
                <s.icon className="h-4 w-4" />
              </div>
              <div className="mt-4 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                Step {i + 1}
              </div>
              <div className="mt-1.5 text-[15px] font-medium">{s.title}</div>
              <div className="mt-1 text-[13px] text-muted-foreground">{s.desc}</div>
            </Reveal>
            {i < steps.length - 1 && (
              <ArrowRight className="hidden md:block absolute right-[-14px] top-1/2 -translate-y-1/2 h-4 w-4 text-gold" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function MetaMockup() {
  return (
    <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.2fr] items-stretch">
      <MockupFrame url="business.facebook.com / lead-ads">
        <div className="p-5">
          <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Active campaign</div>
          <div className="mt-1.5 text-[13.5px] font-medium">Spring Kitchen Reno — Meta Lead Ads</div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            <Stat label="Spend" value="$1,240" />
            <Stat label="Leads" value="68" />
            <Stat label="CPL" value="$18" gold />
          </div>
          <div className="mt-4 h-24 rounded-lg border border-border bg-background p-3 flex items-end gap-1.5">
            {[3, 5, 4, 6, 5, 8, 7, 9, 8, 10, 9, 11].map((h, i) => (
              <span
                key={i}
                className="flex-1 rounded-sm bg-gold/60 animate-bar-grow"
                style={{ height: `${h * 6}px`, animationDelay: `${i * 40}ms` }}
              />
            ))}
          </div>
        </div>
      </MockupFrame>
      <MockupFrame url="connect.renometa.com / inbox">
        <div className="p-5 space-y-2">
          {[
            { name: "Jenna B.", src: "Meta Lead Ad", note: "Kitchen · budget signal", time: "just now", gold: true },
            { name: "Rafael O.", src: "Meta Lead Ad", note: "Bath · asked for pricing", time: "3m" },
            { name: "Nadia F.", src: "Meta Lead Ad", note: "Whole home · timeline Q3", time: "12m" },
            { name: "Owen S.", src: "Meta Lead Ad", note: "Deck · fast-track", time: "24m" },
          ].map((r) => (
            <div
              key={r.name}
              className={`rounded-lg border px-3 py-2.5 ${
                r.gold
                  ? "bg-gold-soft/40 border-[color:color-mix(in_oklab,var(--gold)_45%,var(--border))]"
                  : "bg-background border-border"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="text-[12.5px] font-medium">{r.name}</div>
                <span className="text-[10.5px] text-muted-foreground">{r.time}</span>
              </div>
              <div className="mt-0.5 text-[11.5px] text-muted-foreground">{r.note}</div>
              <div className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">{r.src}</div>
            </div>
          ))}
        </div>
      </MockupFrame>
    </div>
  );
}

function Stat({ label, value, gold }: { label: string; value: string; gold?: boolean }) {
  return (
    <div className="rounded-lg border border-border bg-background p-3">
      <div className="text-[10.5px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className={`mt-1 font-display text-lg font-semibold ${gold ? "text-foreground" : ""}`}>
        {value}
      </div>
    </div>
  );
}

function CampaignPerf() {
  const rows = [
    { name: "Spring Kitchen — Meta", ch: "Lead Ads", leads: 68, booked: 14, cost: "$18" },
    { name: "Deck season — Google", ch: "Search", leads: 41, booked: 9, cost: "$26" },
    { name: "Post-project review", ch: "Email/SMS", leads: 0, booked: 0, cost: "—" },
    { name: "Reactivate 90-day cold", ch: "SMS", leads: 12, booked: 3, cost: "—" },
  ];
  return (
    <div className="mt-12 rounded-2xl border border-border bg-surface-elevated shadow-elegant overflow-hidden">
      <div className="px-5 py-3 border-b border-border bg-surface flex items-center gap-2">
        <LineChart className="h-3.5 w-3.5" />
        <div className="text-[12.5px] font-medium">Campaign performance · Last 30 days</div>
      </div>
      <div className="divide-y divide-border">
        {rows.map((r) => (
          <div key={r.name} className="px-5 py-3.5 grid grid-cols-[1.4fr_1fr_auto_auto_auto] gap-4 items-center text-[12.5px]">
            <div className="font-medium">{r.name}</div>
            <div className="text-muted-foreground">{r.ch}</div>
            <div>{r.leads} leads</div>
            <div>{r.booked} booked</div>
            <div className="text-muted-foreground w-14 text-right">{r.cost}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
