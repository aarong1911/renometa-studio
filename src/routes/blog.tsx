import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site-chrome";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — RenoMeta" },
      { name: "description", content: "Practical articles on lead response, automation, CRM workflows, estimates, marketing, and operations for contractors." },
      { property: "og:title", content: "Blog — RenoMeta" },
      { property: "og:description", content: "Ideas for smarter contractor growth." },
    ],
  }),
  component: () => (
    <PageShell
      eyebrow="Blog"
      headline="Ideas for Smarter Contractor Growth"
      subheading="Practical articles on lead response, automation, CRM workflows, estimates, marketing, and operations."
    >
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="text-[15px] text-muted-foreground">
            New articles are on the way. Check back soon.
          </p>
        </div>
      </section>
    </PageShell>
  ),
});
