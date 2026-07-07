import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site-chrome";

export const Route = createFileRoute("/growth-operations")({
  head: () => ({
    meta: [
      { title: "Growth Operations — RenoMeta" },
      { name: "description", content: "Optimize lead flow, response time, follow-up performance, conversion tracking, reporting, and workflow efficiency over time." },
      { property: "og:title", content: "Growth Operations — RenoMeta" },
      { property: "og:description", content: "Improve the system behind your growth." },
    ],
  }),
  component: () => (
    <PageShell
      eyebrow="Growth Operations"
      headline="Improve the System Behind Your Growth"
      subheading="Optimize lead flow, response time, follow-up performance, conversion tracking, reporting, and workflow efficiency over time."
    />
  ),
});
