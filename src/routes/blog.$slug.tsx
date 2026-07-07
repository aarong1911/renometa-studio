import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/site-chrome";
import { CTASection, Reveal } from "@/components/page-primitives";
import { ARTICLES, getArticle, getRelated, type BlogArticle } from "@/lib/blog-articles";
import { ArrowLeft, ArrowRight, User } from "lucide-react";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const article = getArticle(params.slug);
    if (!article) throw notFound();
    return { article, related: getRelated(params.slug) };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Article not found — RenoMeta" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { article } = loaderData;
    return {
      meta: [
        { title: `${article.title} — RenoMeta Blog` },
        { name: "description", content: article.excerpt },
        { property: "og:title", content: article.title },
        { property: "og:description", content: article.excerpt },
        { property: "og:type", content: "article" },
      ],
    };
  },
  component: ArticlePage,
  notFoundComponent: ArticleNotFound,
});

function ArticlePage() {
  const { article, related } = Route.useLoaderData();
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <SiteNav />
      <main className="flex-1">
        <section className="relative pt-32 pb-12 overflow-hidden bg-hero-radial">
          <div className="absolute inset-0 bg-grid-fade opacity-70 pointer-events-none" />
          <div className="relative mx-auto max-w-3xl px-6">
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to blog
            </Link>
            <div className="mt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              <span className="h-px w-6 bg-gold" />
              {article.category}
            </div>
            <h1 className="mt-4 font-display text-balance text-3xl sm:text-4xl lg:text-[48px] font-semibold tracking-[-0.025em] leading-[1.08]">
              {article.title}
            </h1>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-[13px] text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-full bg-gradient-to-br from-gold-soft to-surface border border-border grid place-items-center">
                  <User className="h-3.5 w-3.5" />
                </div>
                <span className="text-foreground">RenoMeta Team</span>
              </div>
              <span>·</span>
              <span>{article.date}</span>
              <span>·</span>
              <span>{article.readTime}</span>
            </div>
          </div>
        </section>

        <article className="mx-auto max-w-3xl px-6 py-14">
          <div className="prose-body space-y-8">
            {article.content.map((block, i) => (
              <Reveal key={i} delay={i * 40}>
                <div>
                  {block.heading && (
                    <h2 className="font-display text-2xl sm:text-[28px] font-semibold tracking-[-0.02em] leading-snug mt-4">
                      {block.heading}
                    </h2>
                  )}
                  <div className="mt-4 space-y-4">
                    {block.paragraphs.map((p, j) => (
                      <p key={j} className="text-[16.5px] text-foreground/90 leading-[1.75]">
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-14 rounded-2xl border border-border bg-surface-elevated p-6 sm:p-8 shadow-card">
            <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              Try it in practice
            </div>
            <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight leading-tight">
              See how RenoMeta Connect handles this in your business.
            </h3>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link to="/contact" className="btn-primary text-[14px]">
                Contact Us
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link to="/renometa-connect" className="btn-ghost text-[14px]">
                See the Platform
              </Link>
            </div>
          </div>
        </article>

        <section className="mx-auto max-w-6xl px-6 pb-24">
          <div className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-muted-foreground">
            <span className="h-px w-6 bg-gold" />
            Related articles
          </div>
          <h2 className="mt-4 font-display text-2xl sm:text-3xl font-semibold tracking-[-0.02em]">
            More on {article.category.toLowerCase()}
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {related.map((r, i) => (
              <Reveal key={r.slug} delay={i * 60}>
                <Link
                  to="/blog/$slug"
                  params={{ slug: r.slug }}
                  className="block card-elegant card-elegant-hover h-full p-6 group"
                >
                  <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    {r.category}
                  </div>
                  <h4 className="mt-3 text-[15.5px] font-medium leading-snug">{r.title}</h4>
                  <p className="mt-2.5 text-[13.5px] text-muted-foreground leading-relaxed">
                    {r.excerpt}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium group-hover:text-gold transition-colors">
                    Read
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        <CTASection
          title="Ready for a system that actually connects?"
          desc="RenoMeta Connect brings leads, conversations, estimates, and follow-up into one place."
          primary={{ label: "Contact Us", to: "/contact" }}
          secondary={{ label: "See RenoMeta Connect", to: "/renometa-connect" }}
        />
      </main>
      <SiteFooter />
    </div>
  );
}

function ArticleNotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <SiteNav />
      <main className="flex-1 grid place-items-center px-6 pt-32 pb-24">
        <div className="max-w-md text-center">
          <div className="text-[12px] uppercase tracking-[0.18em] text-muted-foreground">
            Article not found
          </div>
          <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight">
            That article moved or never existed.
          </h1>
          <Link to="/blog" className="mt-6 inline-flex btn-primary">
            Back to blog
            <ArrowRight className="h-4 w-4" />
          </Link>
          <div className="mt-8 text-[13px] text-muted-foreground">
            Try one of these:
          </div>
          <ul className="mt-3 space-y-2 text-[14px]">
            {ARTICLES.slice(0, 3).map((a) => (
              <li key={a.slug}>
                <Link
                  to="/blog/$slug"
                  params={{ slug: a.slug }}
                  className="underline decoration-gold/50 underline-offset-4 hover:text-foreground"
                >
                  {a.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
