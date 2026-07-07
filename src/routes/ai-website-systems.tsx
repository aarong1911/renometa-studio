import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site-chrome";

export const Route = createFileRoute("/ai-website-systems")({
  head: () => ({
    meta: [
      { title: "AI Website Systems — RenoMeta" },
      { name: "description", content: "Conversion-focused websites built to capture leads and send them directly into RenoMeta Connect." },
      { property: "og:title", content: "AI Website Systems — RenoMeta" },
      { property: "og:description", content: "Websites that feed your contractor growth system." },
    ],
  }),
  component: () => (
    <PageShell
      eyebrow="AI Website Systems"
      headline="Websites That Feed Your Contractor Growth System"
      subheading="Conversion-focused websites built to capture leads and send them directly into RenoMeta Connect."
    />
  ),
});
