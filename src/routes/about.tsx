import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site-chrome";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — RenoMeta" },
      { name: "description", content: "RenoMeta helps renovation and home service businesses organize leads, automate follow-up, and manage growth from one connected platform." },
      { property: "og:title", content: "About — RenoMeta" },
      { property: "og:description", content: "Built for contractors who need better systems." },
    ],
  }),
  component: () => (
    <PageShell
      eyebrow="About"
      headline="Built for Contractors Who Need Better Systems"
      subheading="RenoMeta helps renovation and home service businesses organize leads, automate follow-up, and manage growth from one connected platform."
    />
  ),
});
