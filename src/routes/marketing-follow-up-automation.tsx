import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site-chrome";

export const Route = createFileRoute("/marketing-follow-up-automation")({
  head: () => ({
    meta: [
      { title: "Marketing & Follow-Up Automation — RenoMeta" },
      { name: "description", content: "Run campaigns, nurture opportunities, request reviews, and keep your pipeline moving from the same platform." },
      { property: "og:title", content: "Marketing & Follow-Up Automation — RenoMeta" },
      { property: "og:description", content: "Marketing and follow-up connected to your CRM." },
    ],
  }),
  component: () => (
    <PageShell
      eyebrow="Marketing & Follow-Up Automation"
      headline="Marketing and Follow-Up Connected to Your CRM"
      subheading="Run campaigns, nurture opportunities, request reviews, and keep your pipeline moving from the same platform."
    />
  ),
});
