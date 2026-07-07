import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site-chrome";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — RenoMeta" },
      { name: "description", content: "Choose the plan that fits your team, contact volume, automation usage, and growth needs." },
      { property: "og:title", content: "Pricing — RenoMeta" },
      { property: "og:description", content: "Simple plans built around usage, not locked features." },
    ],
  }),
  component: () => (
    <PageShell
      eyebrow="Pricing"
      headline="Simple Plans Built Around Usage, Not Locked Features"
      subheading="Choose the plan that fits your team, contact volume, automation usage, and growth needs."
    />
  ),
});
