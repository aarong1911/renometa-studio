import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageShell, SOLUTIONS } from "@/components/site-chrome";

export const Route = createFileRoute("/solutions")({
  head: () => ({
    meta: [
      { title: "Solutions — RenoMeta" },
      { name: "description", content: "Explore RenoMeta's connected solutions for renovation contractors: Connect, AI Website Systems, AI Center, Inbox, CRM & Sales, Marketing, Growth Operations, and Custom AI." },
      { property: "og:title", content: "Solutions — RenoMeta" },
      { property: "og:description", content: "Connected solutions built for renovation contractors and home service businesses." },
      { property: "og:url", content: "/solutions" },
      { name: "twitter:title", content: "Solutions — RenoMeta" },
      { name: "twitter:description", content: "Connected solutions built for renovation contractors and home service businesses." },
    ],
    links: [{ rel: "canonical", href: "/solutions" }],
  }),
  component: SolutionsPage,
});

function SolutionsPage() {
  return (
    <PageShell
      eyebrow="Solutions"
      headline="Connected Solutions for Renovation Contractors"
      subheading="Every RenoMeta solution plugs into the same command center — from lead capture and conversations to estimates, marketing, and operations."
    >
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="sr-only">All Solutions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SOLUTIONS.map((s) => (
              <Link
                key={s.to}
                to={s.to}
                className="card-elegant card-elegant-hover group p-7 flex flex-col"
              >
                <h3 className="font-display text-[20px] font-semibold tracking-tight">
                  {s.label}
                </h3>
                <p className="mt-2.5 text-[14px] text-muted-foreground leading-relaxed flex-1">
                  {s.desc}
                </p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-medium text-foreground group-hover:text-gold transition-colors">
                  Explore {s.label} <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
