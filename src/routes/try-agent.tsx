import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Building, Globe, Mail, Phone, User } from "lucide-react";
import { useState } from "react";
import { PageShell } from "@/components/site-chrome";
import { Section, SectionHeader, BenefitGrid } from "@/components/page-primitives";

export const Route = createFileRoute("/try-agent")({
  head: () => ({
    meta: [
      { title: "Try the Agent Live | RenoMeta" },
      {
        name: "description",
        content:
          "Enter your website and RenoMeta creates a customer service agent trained from your website content, so you can see instant answers and lead capture in action.",
      },
      { property: "og:title", content: "Try the Agent Live | RenoMeta" },
      {
        property: "og:description",
        content:
          "See an AI customer service agent trained from your own website content.",
      },
      { property: "og:url", content: "/try-agent" },
      { name: "twitter:title", content: "Try the Agent Live | RenoMeta" },
      {
        name: "twitter:description",
        content:
          "See an AI customer service agent trained from your own website content.",
      },
    ],
    links: [{ rel: "canonical", href: "/try-agent" }],
  }),
  component: TryAgentPage,
});

function TryAgentPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    website: "http://",
  });

  const update = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO(backend): connect the existing Try Agent Live function from the
    // published site. Pass form fields (name, email, company, phone, website)
    // to the crawler/agent endpoint and surface the result to the user.
    // Do not fake a submission or crawler response here.
  };

  const handleCancel = () => {
    setForm({ name: "", email: "", company: "", phone: "", website: "http://" });
  };

  return (
    <PageShell
      eyebrow="AI agent demo"
      headline="Try the Agent Live"
      subheading="Enter your website and RenoMeta will create a customer service agent trained from your website content, so you can see how instant answers and lead capture could work for your business."
      primaryCta={null}
      secondaryCta={{ label: "See the AI Center", to: "/ai-center" }}
    >
      <Section className="!pt-6">
        <div className="mx-auto w-full max-w-3xl rounded-3xl border border-border bg-surface-elevated shadow-elegant p-6 sm:p-10 lg:p-12">
          <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Provide Website Details
          </div>
          <h2 className="mt-3 font-display text-2xl sm:text-3xl font-semibold tracking-[-0.02em] text-foreground">
            Tell us where to build your customer service agent from.
          </h2>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="relative">
                <User
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
                  strokeWidth={1.5}
                />
                <input
                  type="text"
                  required
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="Full Name"
                  aria-label="Your Name"
                  className="w-full rounded-xl border border-border bg-background pl-10 pr-3 py-3 text-[14px] text-foreground placeholder:text-muted-foreground/80 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/40"
                />
              </div>
              <div className="relative">
                <Mail
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
                  strokeWidth={1.5}
                />
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="Email Address"
                  aria-label="Your Email"
                  className="w-full rounded-xl border border-border bg-background pl-10 pr-3 py-3 text-[14px] text-foreground placeholder:text-muted-foreground/80 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/40"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="relative">
                <Building
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
                  strokeWidth={1.5}
                />
                <input
                  type="text"
                  required
                  autoComplete="organization"
                  value={form.company}
                  onChange={(e) => update("company", e.target.value)}
                  placeholder="Your Business"
                  aria-label="Company Name"
                  className="w-full rounded-xl border border-border bg-background pl-10 pr-3 py-3 text-[14px] text-foreground placeholder:text-muted-foreground/80 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/40"
                />
              </div>
              <div className="relative">
                <Phone
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
                  strokeWidth={1.5}
                />
                <input
                  type="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="(XXX) XXX-XXXX"
                  aria-label="Company Phone Number"
                  className="w-full rounded-xl border border-border bg-background pl-10 pr-3 py-3 text-[14px] text-foreground placeholder:text-muted-foreground/80 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/40"
                />
              </div>
            </div>

            <div className="relative">
              <Globe
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
                strokeWidth={1.5}
              />
              <input
                type="url"
                inputMode="url"
                required
                autoComplete="url"
                value={form.website}
                onChange={(e) => update("website", e.target.value)}
                placeholder="http://yourcompany.com"
                aria-label="Company Website"
                className="w-full rounded-xl border border-border bg-background pl-10 pr-3 py-3 text-[14px] text-foreground placeholder:text-muted-foreground/80 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/40"
              />
            </div>

            <div className="pt-4 flex flex-col-reverse sm:flex-row items-stretch sm:items-center gap-3">
              <button
                type="button"
                onClick={handleCancel}
                className="btn-ghost justify-center"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary justify-center"
              >
                Submit
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      </Section>

      <Section tone="surface">
        <SectionHeader
          eyebrow="What the agent will do"
          title="An agent trained on your own website"
          desc="The agent reads your website content, answers common customer questions, captures lead details, and helps visitors move toward booking."
        />
        <BenefitGrid
          items={[
            "Trains from your website content",
            "Answers common customer questions",
            "Helps capture lead details",
            "Built for renovation and home service businesses",
          ]}
        />
      </Section>
    </PageShell>
  );
}
