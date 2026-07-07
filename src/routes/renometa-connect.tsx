import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site-chrome";

export const Route = createFileRoute("/renometa-connect")({
  head: () => ({
    meta: [
      { title: "RenoMeta Connect — Business Command Center for Contractors" },
      { name: "description", content: "Manage leads, conversations, estimates, scheduling, marketing, and follow-up in one connected platform." },
      { property: "og:title", content: "RenoMeta Connect" },
      { property: "og:description", content: "The business command center for renovation contractors." },
    ],
  }),
  component: () => (
    <PageShell
      eyebrow="RenoMeta Connect"
      headline="RenoMeta Connect: The Business Command Center for Renovation Contractors"
      subheading="Manage leads, conversations, estimates, scheduling, marketing, and follow-up in one connected platform."
    />
  ),
});
