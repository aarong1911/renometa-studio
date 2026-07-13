import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site-chrome";
import {
  Section,
  SectionHeader,
  CTASection,
  Reveal,
} from "@/components/page-primitives";
import { ArrowRight, Check } from "lucide-react";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — RenoMeta" },
      {
        name: "description",
        content:
          "Flexible RenoMeta Connect pricing with AI and automation included on every plan. Choose the capacity, usage, and team size that fits your business.",
      },
      { property: "og:title", content: "Pricing — RenoMeta" },
      {
        property: "og:description",
        content:
          "AI and automation included on every plan. RenoMeta Connect pricing scales with your business, usage, and team.",
      },
      { property: "og:url", content: "/pricing" },
      { name: "twitter:title", content: "Pricing — RenoMeta" },
      {
        name: "twitter:description",
        content:
          "AI and automation included on every plan. Plans scale with your business, usage, and team.",
      },
    ],
    links: [{ rel: "canonical", href: "/pricing" }],
  }),
  component: PricingPage,
});

const PLANS = [
  {
    name: "Starter",
    tagline: "For small businesses ready to connect leads, conversations, and follow-up.",
    price: "$79",
    suffix: "/ month",
    scale: "starter",
    highlights: ["2 users", "1,000 contacts", "1,000 SMS / month", "500 AI actions / month"],
    cta: "Start Free",
  },
  {
    name: "Growth",
    tagline: "For growing teams handling more leads, conversations, and automation.",
    price: "$199",
    suffix: "/ month",
    scale: "most popular",
    highlights: ["Up to 5 users", "10,000 contacts", "5,000 SMS / month", "5,000 AI actions / month"],
    cta: "Start Free",
    featured: true,
  },
  {
    name: "Scale",
    tagline: "For established businesses running AI and automation across their operation.",
    price: "$399",
    suffix: "/ month",
    scale: "scale",
    highlights: ["Up to 15 users", "50,000 contacts", "20,000 SMS / month", "20,000 AI actions / month"],
    cta: "Talk to Sales",
  },
];

const FEATURES: { group: string; rows: [string, boolean | string, boolean | string, boolean | string][] }[] = [
  {
    group: "Core platform",
    rows: [
      ["CRM & Contacts", true, true, true],
      ["Unified Inbox", true, true, true],
      ["Sales Pipeline", true, true, true],
      ["Estimates & Proposals", true, true, true],
      ["Invoices & Payments", true, true, true],
      ["Calendar & Booking", true, true, true],
      ["Tasks & Projects", true, true, true],
      ["Customer Portal", true, true, true],
    ],
  },
  {
    group: "AI & automation",
    rows: [
      ["AI Center", true, true, true],
      ["AI Lead Qualification", true, true, true],
      ["AI Estimate Drafting", true, true, true],
      ["AI-Powered Follow-Up", true, true, true],
      ["Workflows & Triggers", "Standard", "Advanced", "Custom"],
      ["Review Automation", true, true, true],
      ["AI Voice", "Pay-per-use", "Pay-per-use", "Custom usage plan"],
    ],
  },
  {
    group: "Communication & integrations",
    rows: [
      ["SMS & Email", true, true, true],
      ["Google Calendar", true, true, true],
      ["Meta Lead Ads", true, true, true],
      ["Facebook Messenger", true, true, true],
      ["Instagram Messaging", true, true, true],
      ["WhatsApp Business", "Included, usage-based messaging", "Included, usage-based messaging", "Included, custom usage plan"],
      ["Custom Integrations", "Not included", "Available as add-on", "Included/custom scope"],
    ],
  },
  {
    group: "Usage & capacity",
    rows: [
      ["Users", "2", "Up to 5", "Up to 15"],
      ["Contacts", "1,000", "10,000", "50,000"],
      ["SMS per month", "1,000", "5,000", "20,000"],
      ["AI actions per month", "500", "5,000", "20,000"],
      ["Storage", "10 GB", "100 GB", "Custom"],
    ],
  },
  {
    group: "Support & scale",
    rows: [
      ["Guided Onboarding", true, true, true],
      ["Standard Support", true, true, true],
      ["Priority Support", false, true, true],
      ["Advanced Reporting", false, true, true],
      ["Multi-Brand Support", false, false, true],
      ["Custom Dashboards", false, false, true],
      ["Custom Workflow Setup", false, false, true],
    ],
  },
];

const ADDONS: { title: string; desc: string; label: string; link?: { label: string; to: string } }[] = [
  {
    title: "AI Voice",
    desc: "AI-powered calling for lead response, qualification, follow-up, and appointment booking.",
    label: "Usage-based",
  },
  {
    title: "Additional AI Actions",
    desc: "Add more AI agent and automation capacity when your included monthly usage is not enough.",
    label: "Flexible capacity",
  },
  {
    title: "Additional Messaging",
    desc: "Increase SMS and communication capacity for higher-volume teams and campaigns.",
    label: "Usage-based",
  },
  {
    title: "Additional Users",
    desc: "Add team members as your operation grows without immediately changing plans.",
    label: "Available on demand",
  },
  {
    title: "Additional Phone Numbers",
    desc: "Dedicated numbers for locations, departments, teams, or campaigns.",
    label: "Available on demand",
  },
  {
    title: "Custom AI Solutions",
    desc: "Custom AI agents, integrations, internal tools, and business automation built around your operation.",
    label: "Custom pricing",
    link: { label: "Talk to us", to: "/contact" },
  },
];

function PricingPage() {
  return (
    <PageShell
      eyebrow="Pricing"
      headline="AI and Automation Included on Every Plan"
      subheading="Start with the tools you need today. As your business grows, your plan scales with your team, contacts, messaging, and AI usage."
      primaryCta={{ label: "Find the Right Plan", to: "/contact" }}
      secondaryCta={{ label: "See the Platform", to: "/renometa-connect" }}
    >
      <Section>
        <h2 className="sr-only">Pricing Plans</h2>
        <div className="grid gap-6 lg:grid-cols-3">
          {PLANS.map((p, i) => (
            <Reveal key={p.name} delay={i * 70}>
              <div
                className={`relative rounded-2xl border p-8 h-full flex flex-col ${
                  p.featured
                    ? "border-[color:color-mix(in_oklab,var(--gold)_55%,var(--border))] bg-surface-elevated shadow-elegant"
                    : "border-border bg-surface-elevated shadow-card"
                }`}
              >
                {p.featured && (
                  <span className="absolute -top-3 left-8 text-[10.5px] uppercase tracking-[0.18em] px-2.5 py-1 rounded-full bg-gold text-foreground border border-[color:color-mix(in_oklab,var(--gold)_60%,black)]">
                    Most Popular
                  </span>
                )}
                <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  {p.scale}
                </div>
                <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight">{p.name}</h3>
                <p className="mt-2 text-[14px] text-muted-foreground leading-relaxed">{p.tagline}</p>
                <div className="mt-6 flex items-baseline gap-2">
                  <div className="font-display text-4xl font-semibold tracking-tight">{p.price}</div>
                  <div className="text-[13px] text-muted-foreground">{p.suffix}</div>
                </div>
                <ul className="mt-6 space-y-2.5 flex-1">
                  {p.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2.5 text-[14px]">
                      <Check className="h-4 w-4 text-gold mt-0.5 shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className={`mt-8 w-full text-center ${p.featured ? "btn-primary" : "btn-ghost"}`}
                  aria-label={`${p.cta} for the ${p.name} plan — contact sales`}
                >
                  {p.cta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={220}>
          <p className="mt-10 text-center text-[13.5px] text-muted-foreground max-w-2xl mx-auto">
            AI and automation are included on every plan. Plans scale with your business,
            usage, and team — so you can start lean and add capacity as you grow.
          </p>
        </Reveal>
      </Section>

      <Section tone="surface">
        <SectionHeader
          eyebrow="Comparison"
          title="Compare RenoMeta Connect plans"
        />
        <Reveal>
          <ComparisonTable />
          <p className="mt-4 text-[13px] text-muted-foreground max-w-3xl">
            <span className="font-medium text-foreground">Custom Integrations</span> means custom connections to third-party tools, internal systems, APIs, webhooks, or business-specific workflows beyond the standard built-in integrations.
          </p>
        </Reveal>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Add-ons"
          title="Extend RenoMeta Connect as you grow"
          desc="Add capacity and specialized AI capabilities without rebuilding your entire system."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {ADDONS.map((a, i) => (
            <Reveal key={a.title} delay={i * 50}>
              <div className="card-elegant card-elegant-hover h-full p-6 flex flex-col">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-[15.5px] font-medium">{a.title}</h3>
                  <span className="text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground border border-border rounded-full px-2.5 py-1 whitespace-nowrap">
                    {a.label}
                  </span>
                </div>
                <p className="mt-3.5 text-[14px] text-muted-foreground leading-relaxed flex-1">
                  {a.desc}
                </p>
                {a.link && (
                  <Link
                    to={a.link.to}
                    className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-foreground hover:text-gold transition-colors"
                    aria-label={`${a.link.label} about ${a.title}`}
                  >
                    {a.link.label}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="surface">
        <SectionHeader eyebrow="FAQ" title="Common questions" />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {[
            {
              q: "Are AI and automation included on every plan?",
              a: "Yes. AI and automation are core to RenoMeta Connect. Every plan includes AI-powered tools and workflow automation, with monthly capacity increasing as your business grows.",
            },
            {
              q: "What happens if I exceed my monthly usage?",
              a: "We'll let you know as you approach your included capacity. You can add additional usage or move to a higher plan without interrupting your workflows or lead follow-up.",
            },
            {
              q: "Can I move between plans?",
              a: "Yes. Upgrade or downgrade as your team, lead volume, and usage change. Billing adjustments are handled based on your current plan and billing cycle.",
            },
            {
              q: "Are onboarding and setup included?",
              a: "Guided onboarding is included on every plan. Custom workflow setup, advanced integrations, and specialized AI implementation may be quoted separately.",
            },
            {
              q: "Is AI Voice included?",
              a: "AI Voice is available as an add-on on Starter and Growth. Scale includes an AI Voice allowance, with additional usage available based on calling volume.",
            },
            {
              q: "Is there a contract?",
              a: "Plans are month-to-month by default. Annual billing options may be available with discounted pricing.",
            },
          ].map((f, i) => (
            <Reveal key={f.q} delay={i * 50}>
              <div className="rounded-2xl border border-border bg-surface-elevated p-6 h-full">
                <h4 className="text-[15px] font-medium leading-snug">{f.q}</h4>
                <p className="mt-2.5 text-[14px] text-muted-foreground leading-relaxed">{f.a}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <CTASection
        title="Find the Right Plan"
        desc="Tell us about your team, lead volume, and automation needs — we'll help you choose the right starting point."
        primary={{ label: "Find the Right Plan", to: "/contact" }}
      />
    </PageShell>
  );
}

function ComparisonTable() {
  const cell = (v: boolean | string) =>
    typeof v === "boolean" ? (
      v ? (
        <Check className="h-4 w-4 text-gold mx-auto" />
      ) : (
        <span className="text-muted-foreground/40">—</span>
      )
    ) : (
      <span className="text-[13px]">{v}</span>
    );

  return (
    <div className="mt-12 rounded-2xl border border-border bg-surface-elevated overflow-hidden shadow-card">
      <div className="grid grid-cols-[1.6fr_1fr_1fr_1fr] px-5 py-3.5 border-b border-border bg-surface text-[11.5px] uppercase tracking-[0.16em] text-muted-foreground">
        <div>Feature</div>
        <div className="text-center">Starter</div>
        <div className="text-center">Growth</div>
        <div className="text-center">Scale</div>
      </div>
      {FEATURES.map((g) => (
        <div key={g.group}>
          <div className="px-5 py-2.5 text-[11.5px] font-medium bg-surface/40 border-b border-border">
            {g.group}
          </div>
          {g.rows.map(([label, a, b, c]) => (
            <div
              key={label}
              className="grid grid-cols-[1.6fr_1fr_1fr_1fr] px-5 py-3 items-center border-b border-border last:border-b-0 text-[13.5px]"
            >
              <div>{label}</div>
              <div className="text-center">{cell(a)}</div>
              <div className="text-center">{cell(b)}</div>
              <div className="text-center">{cell(c)}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
