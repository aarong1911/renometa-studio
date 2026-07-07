import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site-chrome";

export const Route = createFileRoute("/ai-center")({
  head: () => ({
    meta: [
      { title: "AI Center — RenoMeta" },
      { name: "description", content: "AI agents that qualify leads, follow up, draft estimates, summarize conversations, update your CRM, request reviews, and uncover insights." },
      { property: "og:title", content: "AI Center — RenoMeta" },
      { property: "og:description", content: "AI agents built for contractor workflows." },
    ],
  }),
  component: () => (
    <PageShell
      eyebrow="AI Center"
      headline="AI Agents Built for Contractor Workflows"
      subheading="Qualify leads, follow up, draft estimates, summarize conversations, update your CRM, request reviews, and uncover insights."
    />
  ),
});
