import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site-chrome";

export const Route = createFileRoute("/multi-channel-inbox")({
  head: () => ({
    meta: [
      { title: "Multi-Channel Inbox — RenoMeta" },
      { name: "description", content: "Manage SMS, WhatsApp, Messenger, Instagram Direct, missed calls, and voice conversations from one connected inbox." },
      { property: "og:title", content: "Multi-Channel Inbox — RenoMeta" },
      { property: "og:description", content: "Every customer conversation in one inbox." },
    ],
  }),
  component: () => (
    <PageShell
      eyebrow="Multi-Channel Inbox"
      headline="Every Customer Conversation in One Inbox"
      subheading="Manage SMS, WhatsApp, Messenger, Instagram Direct, missed calls, and voice conversations from one connected inbox."
    />
  ),
});
