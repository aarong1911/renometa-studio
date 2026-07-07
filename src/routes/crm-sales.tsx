import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site-chrome";

export const Route = createFileRoute("/crm-sales")({
  head: () => ({
    meta: [
      { title: "CRM & Sales — RenoMeta" },
      { name: "description", content: "Manage customers, deals, estimates, proposals, invoices, signatures, bookings, and client communication in one sales workflow." },
      { property: "og:title", content: "CRM & Sales — RenoMeta" },
      { property: "og:description", content: "Track every lead from first inquiry to closed job." },
    ],
  }),
  component: () => (
    <PageShell
      eyebrow="CRM & Sales"
      headline="Track Every Lead From First Inquiry to Closed Job"
      subheading="Manage customers, deals, estimates, proposals, invoices, signatures, bookings, and client communication in one sales workflow."
    />
  ),
});
