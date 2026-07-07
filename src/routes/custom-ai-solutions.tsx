import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site-chrome";

export const Route = createFileRoute("/custom-ai-solutions")({
  head: () => ({
    meta: [
      { title: "Custom AI Solutions — RenoMeta" },
      { name: "description", content: "Advanced workflows, integrations, dashboards, and automations built around unique business needs." },
      { property: "og:title", content: "Custom AI Solutions — RenoMeta" },
      { property: "og:description", content: "Custom AI systems built around your business." },
    ],
  }),
  component: () => (
    <PageShell
      eyebrow="Custom AI Solutions"
      headline="Custom AI Systems Built Around Your Business"
      subheading="Advanced workflows, integrations, dashboards, and automations built around unique business needs."
    />
  ),
});
