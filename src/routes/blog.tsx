import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/site-chrome";
import {
  Section,
  CTASection,
  Reveal,
} from "@/components/page-primitives";
import { ARTICLES, CATEGORIES } from "@/lib/blog-articles";
import { ArrowRight, Mail } from "lucide-react";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — RenoMeta" },
      {
        name: "description",
        content:
          "Practical articles on lead response, automation, CRM workflows, estimates, marketing, and operations for contractors.",
      },
      { property: "og:title", content: "Blog — RenoMeta" },
      { property: "og:description", content: "Ideas for smarter contractor growth." },
    ],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  return (
    <PageShell
      eyebrow="Blog"
      headline="Ideas for Smarter Contractor Growth"
      subheading="Practical articles on lead response, automation, CRM workflows, estimates, marketing, and operations."
      primaryCta={{ label: "Talk to RenoMeta", to: "/contact" }}
      secondaryCta={{ label: "See the Platform", to: "/renometa-connect" }}
    >
      <Section>
        <BlogGrid />
      </Section>

      <Section tone="surface">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] items-center">
          <Reveal>
            <div>
              <div className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-muted-foreground">
                <span className="h-px w-6 bg-gold" />
                Newsletter
              </div>
              <h2 className="mt-4 font-display text-3xl sm:text-4xl font-semibold tracking-[-0.02em] leading-tight">
                One practical article, once a month.
              </h2>
              <p className="mt-4 text-[16px] text-muted-foreground max-w-lg leading-relaxed">
                Ideas on lead response, automation, and operations for renovation contractors.
                No fluff, no promotional filler.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="rounded-2xl border border-border bg-surface-elevated p-6 shadow-card"
            >
              <label className="text-[12.5px] font-medium text-foreground/80">Email</label>
              <div className="mt-2 flex gap-2">
                <input
                  type="email"
                  placeholder="you@company.com"
                  className="flex-1 rounded-lg border border-border bg-background px-3.5 py-2.5 text-[14px] focus:outline-none focus:ring-2 focus:ring-gold/40"
                />
                <button className="btn-primary text-[13.5px] px-4 py-2.5">
                  <Mail className="h-3.5 w-3.5" />
                  Subscribe
                </button>
              </div>
              <p className="mt-3 text-[11.5px] text-muted-foreground">
                We'll never share your email. Unsubscribe any time.
              </p>
            </form>
          </Reveal>
        </div>
      </Section>

      <Section>
        <div className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-muted-foreground">
          <span className="h-px w-6 bg-gold" />
          Related resources
        </div>
        <h2 className="mt-4 font-display text-3xl sm:text-4xl font-semibold tracking-[-0.02em] leading-tight">
          Go deeper on the platform
        </h2>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            { to: "/renometa-connect", label: "RenoMeta Connect", desc: "The business command center for contractors." },
            { to: "/ai-center", label: "AI Center", desc: "AI agents that qualify, follow up, and draft estimates." },
            { to: "/crm-sales", label: "CRM & Sales", desc: "Track every lead from inquiry to closed job." },
          ].map((r, i) => (
            <Reveal key={r.to} delay={i * 60}>
              <Link to={r.to} className="block card-elegant card-elegant-hover p-6 group">
                <div className="text-[15px] font-medium">{r.label}</div>
                <p className="mt-2 text-[13.5px] text-muted-foreground leading-relaxed">{r.desc}</p>
                <div className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium group-hover:text-gold transition-colors">
                  Explore
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <CTASection
        title="Turn Ideas Into a Working System"
        desc="See how RenoMeta Connect brings the moves in these articles into one platform."
        primary={{ label: "Contact Us", to: "/contact" }}
        secondary={{ label: "See the Platform", to: "/renometa-connect" }}
      />
    </PageShell>
  );
}

function BlogGrid() {
  const [cat, setCat] = useState<string>("All");
  const featured = ARTICLES.find((a) => a.featured) ?? ARTICLES[0];
  const rest = ARTICLES.filter((a) => a.slug !== featured.slug);
  const filtered = cat === "All" ? rest : rest.filter((a) => a.category === cat);

  return (
    <div>
      <Reveal>
        <Link
          to="/blog/$slug"
          params={{ slug: featured.slug }}
          className="block group rounded-2xl border border-border bg-surface-elevated p-8 sm:p-12 shadow-card hover:shadow-elegant transition-shadow"
        >
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            <span className="h-px w-6 bg-gold" />
            Featured · {featured.category}
          </div>
          <h3 className="mt-4 font-display text-2xl sm:text-3xl lg:text-[36px] font-semibold tracking-[-0.02em] leading-tight text-balance max-w-3xl">
            {featured.title}
          </h3>
          <p className="mt-4 text-[15px] text-muted-foreground leading-relaxed max-w-2xl">
            {featured.excerpt}
          </p>
          <div className="mt-6 flex items-center gap-3 text-[12.5px] text-muted-foreground">
            <span>{featured.date}</span>
            <span>·</span>
            <span>{featured.readTime}</span>
          </div>
          <div className="mt-6 inline-flex items-center gap-1.5 text-[13.5px] font-medium group-hover:text-gold transition-colors">
            Read article
            <ArrowRight className="h-3.5 w-3.5" />
          </div>
        </Link>
      </Reveal>

      <div className="mt-12 flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`text-[12.5px] px-3.5 py-1.5 rounded-full border transition-colors ${
              cat === c
                ? "border-foreground bg-foreground text-background"
                : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/40"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((a, i) => (
          <Reveal key={a.slug} delay={(i % 6) * 50}>
            <Link
              to="/blog/$slug"
              params={{ slug: a.slug }}
              className="block group card-elegant card-elegant-hover h-full p-6"
            >
              <div>
                <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  {a.category}
                </div>
                <h4 className="mt-3 text-[16px] font-medium leading-snug group-hover:text-foreground">
                  {a.title}
                </h4>
                <p className="mt-2.5 text-[13.5px] text-muted-foreground leading-relaxed">
                  {a.excerpt}
                </p>
                <div className="mt-4 flex items-center gap-3 text-[11.5px] text-muted-foreground">
                  <span>{a.date}</span>
                  <span>·</span>
                  <span>{a.readTime}</span>
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
