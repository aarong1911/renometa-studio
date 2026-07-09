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
          "Simple plans built around usage, not locked features. Every plan includes the full RenoMeta Connect platform.",
      },
      { property: "og:title", content: "Pricing — RenoMeta" },
      {
        property: "og:description",
        content: "Every plan includes the full platform. Pricing scales by usage.",
      },
      { property: "og:url", content: "/pricing" },
      { name: "twitter:title", content: "Pricing — RenoMeta" },
      { name: "twitter:description", content: "Every plan includes the full platform. Pricing scales by usage." },
    ],
    links: [{ rel: "canonical", href: "/pricing" }],
  }),
  component: PricingPage,
});

const PLANS = [
  {
    name: "Foundation",
    tagline: "For small contractor teams getting organized.",
    price: "$",
    scale: "starting",
    highlights: ["1 seat", "500 contacts", "1,000 SMS / mo", "500 AI runs / mo"],
    cta: "Start with Foundation",
  },
  {
    name: "Crew",
    tagline: "For growing teams running consistent lead volume.",
    price: "$$",
    scale: "recommended",
    highlights: ["Up to 5 seats", "5,000 contacts", "5,000 SMS / mo", "5,000 AI runs / mo"],
    cta: "Choose Crew",
    featured: true,
  },
  {
    name: "Operation",
    tagline: "For multi-crew operations and multi-brand businesses.",
    price: "$$$",
    scale: "custom usage",
    highlights: ["Unlimited seats", "50,000+ contacts", "Custom SMS pool", "Priority AI capacity"],
    cta: "Talk to Sales",
  },
];

const FEATURES: { group: string; rows: [string, boolean | string, boolean | string, boolean | string][] }[] = [
  {
    group: "Core platform",
    rows: [
      ["RenoMeta Connect (full platform)", true, true, true],
      ["Multi-channel inbox", true, true, true],
      ["CRM & pipeline", true, true, true],
      ["Estimates, proposals, e-signature", true, true, true],
      ["Booking & calendar sync", true, true, true],
      ["Automations & follow-up", true, true, true],
      ["AI Center — core agents", true, true, true],
      ["Review request automation", true, true, true],
    ],
  },
  {
    group: "Usage limits",
    rows: [
      ["Seats", "1", "Up to 5", "Unlimited"],
      ["Contacts", "500", "5,000", "50,000+"],
      ["SMS per month", "1,000", "5,000", "Custom"],
      ["AI agent runs per month", "500", "5,000", "Priority"],
      ["Storage", "10 GB", "100 GB", "Custom"],
    ],
  },
  {
    group: "Advanced",
    rows: [
      ["Custom workflows", false, true, true],
      ["Advanced integrations", false, true, true],
      ["Custom dashboards", false, false, true],
      ["Multi-brand support", false, false, true],
      ["Dedicated success manager", false, false, true],
    ],
  },
];

function PricingPage() {
  return (
    <PageShell
      eyebrow="Pricing"
      headline="Simple Plans Built Around Usage, Not Locked Features"
      subheading="Get the core RenoMeta Connect experience across every plan, with pricing that scales by seats, contacts, SMS, AI runs, and business needs."
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
                    Recommended
                  </span>
                )}
                <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  {p.scale}
                </div>
                <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight">{p.name}</h3>
                <p className="mt-2 text-[14px] text-muted-foreground leading-relaxed">{p.tagline}</p>
                <div className="mt-6 flex items-baseline gap-2">
                  <div className="font-display text-4xl font-semibold tracking-tight">{p.price}</div>
                  <div className="text-[13px] text-muted-foreground">/ month + usage</div>
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
            Every plan includes the full RenoMeta Connect platform. Plans differ by how much
            you use it — seats, contacts, SMS, and AI runs — not by which features are unlocked.
          </p>
        </Reveal>
      </Section>

      <Section tone="surface">
        <SectionHeader
          eyebrow="Comparison"
          title="What is included on each plan"
        />
        <Reveal>
          <ComparisonTable />
        </Reveal>
      </Section>

      <Section>
        <SectionHeader eyebrow="FAQ" title="Common questions" />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {[
            {
              q: "Do lower plans hide important features?",
              a: "No. Every plan includes the full RenoMeta Connect platform. Plans differ by usage — seats, contacts, SMS, AI runs — not by locked capabilities.",
            },
            {
              q: "What happens if I go over a usage limit?",
              a: "You're notified in advance and can add capacity or upgrade. Nothing breaks, and no leads get dropped.",
            },
            {
              q: "Can I move between plans?",
              a: "Yes. Upgrade or downgrade at any time. Billing is pro-rated.",
            },
            {
              q: "Are onboarding and setup included?",
              a: "Guided onboarding is included on every plan. Custom setup and integrations are quoted separately.",
            },
            {
              q: "Do I need the AI Website Systems service?",
              a: "It's optional. Connect works with any website. AI Website Systems is for teams that want a lead-focused site tuned to feed the platform.",
            },
            {
              q: "Is there a contract?",
              a: "Month-to-month by default. Annual plans available with a discount.",
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
        desc="Tell us about your team and lead volume — we'll recommend the plan that fits."
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
        <div className="text-center">Foundation</div>
        <div className="text-center">Crew</div>
        <div className="text-center">Operation</div>
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
