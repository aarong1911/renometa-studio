import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site-chrome";
import {
  Section,
  SectionHeader,
  FeatureGrid,
  CTASection,
  MockupFrame,
  SplitCallout,
  Reveal,
} from "@/components/page-primitives";
import {
  Calendar,
  FileText,
  PenLine,
  Receipt,
  Users,
  Workflow,
} from "lucide-react";

export const Route = createFileRoute("/crm-sales")({
  head: () => ({
    meta: [
      { title: "CRM & Sales — RenoMeta" },
      {
        name: "description",
        content:
          "Track every lead from first inquiry to closed job with a CRM built for renovation contractors.",
      },
      { property: "og:title", content: "CRM & Sales" },
      {
        property: "og:description",
        content:
          "Customers, deals, estimates, proposals, invoices, signatures, bookings, and client communication in one workflow.",
      },
      { property: "og:url", content: "/crm-sales" },
      { name: "twitter:title", content: "CRM & Sales" },
      { name: "twitter:description", content: "Customers, deals, estimates, proposals, invoices, signatures, bookings, and client communication in one workflow." },
    ],
    links: [{ rel: "canonical", href: "/crm-sales" }],
  }),
  component: CrmPage,
});

function CrmPage() {
  return (
    <PageShell
      eyebrow="CRM & Sales"
      headline="Track Every Lead From First Inquiry to Closed Job"
      subheading="Manage customers, deals, estimates, proposals, invoices, signatures, bookings, and client communication in one sales workflow."
      primaryCta={{ label: "Organize My Sales Process", to: "/contact" }}
      secondaryCta={{ label: "See the Inbox", to: "/multi-channel-inbox" }}
      heroVisual={<PipelineMockup />}
    >
      <Section>
        <SectionHeader
          eyebrow="CRM overview"
          title="A sales workflow shaped like a contractor job"
          desc="Every stage, artifact, and next step in one record — not spread across a spreadsheet, a document tool, and a booking app."
        />
        <FeatureGrid
          cols={3}
          items={[
            { icon: Users, title: "Lead & customer records", desc: "One profile, every conversation, every job, every document." },
            { icon: Workflow, title: "Visual pipeline", desc: "Drag opportunities through stages built for renovation sales." },
            { icon: FileText, title: "Estimates", desc: "Draft, template, and version estimates without leaving the platform." },
            { icon: PenLine, title: "Proposals & e-sign", desc: "Turn approved estimates into proposals and capture DocuSign signatures." },
            { icon: Receipt, title: "Quote-to-invoice", desc: "Convert signed proposals into invoices with deposits and terms." },
            { icon: Calendar, title: "Booking & calendar", desc: "Online booking synced with your team's calendars and reminders." },
          ]}
        />
      </Section>

      <Section tone="surface">
        <SplitCallout
          eyebrow="Estimate & proposal workflow"
          title="From site notes to a signed proposal in one flow"
          desc="Draft the estimate from templates, adjust line items, generate the proposal, and send for signature — without exporting anything to a separate document tool."
          bullets={[
            "Reusable line items and pricing templates",
            "Automatic totals, taxes, and deposits",
            "Proposal generation from an approved estimate",
            "DocuSign e-signature built in",
          ]}
          visual={<EstimateMockup />}
        />
      </Section>

      <Section>
        <SplitCallout
          reverse
          eyebrow="Booking & client portal"
          title="A calendar homeowners actually use"
          desc="Homeowners book their own site visit from a link, see updates in a simple portal, and sign documents without an email chain."
          bullets={[
            "Real-time availability across the team",
            "Automated reminders and reschedule links",
            "Client portal for documents, updates, and invoices",
            "Two-way sync with Google and Outlook calendars",
          ]}
          visual={<PortalMockup />}
        />
      </Section>

      <Section tone="bordered">
        <SectionHeader
          eyebrow="Reporting"
          title="See the pipeline like a business owner"
          desc="Close rate, average deal size, response time, and lead source — all in one view, without pulling a report."
        />
        <Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-4">
            {[
              { label: "Open pipeline", value: "$486K" },
              { label: "Close rate", value: "32%" },
              { label: "Avg deal", value: "$18.4K" },
              { label: "Avg response", value: "0:42" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border border-border bg-surface-elevated p-6">
                <div className="text-[12px] text-muted-foreground">{s.label}</div>
                <div className="mt-2 font-display text-3xl font-semibold tracking-tight">{s.value}</div>
                <div className="mt-4 h-1 rounded-full bg-border overflow-hidden">
                  <div className="h-full bg-gold animate-bar-grow" style={{ width: "72%" }} />
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      <CTASection
        title="Organize My Sales Process"
        desc="Every deal, every document, every next step — in one system."
        primary={{ label: "Organize My Sales Process", to: "/contact" }}
        secondary={{ label: "See RenoMeta Connect", to: "/renometa-connect" }}
      />
    </PageShell>
  );
}

function PipelineMockup() {
  type Card = { n: string; s: string; gold?: boolean };
  const cols: { title: string; items: Card[] }[] = [
    { title: "New", items: [{ n: "Ben H.", s: "Roofing" }, { n: "Nora J.", s: "Kitchen" }, { n: "Ava P.", s: "Deck" }] },
    { title: "Qualified", items: [{ n: "Daniel R.", s: "Bath" }, { n: "Ellie T.", s: "Basement" }] },
    { title: "Estimate", items: [{ n: "Priya K.", s: "Whole home" }, { n: "Marcus L.", s: "Reno" }] },
    { title: "Proposal", items: [{ n: "Josh C.", s: "Kitchen", gold: true }] },
    { title: "Booked", items: [{ n: "Sarah M.", s: "Kitchen", gold: true }] },
  ];
  return (
    <MockupFrame url="connect.renometa.com / pipeline">
      <div className="p-4 sm:p-5 overflow-x-auto">
        <div className="grid grid-cols-5 gap-3 min-w-[720px]">
          {cols.map((c) => (
            <div key={c.title} className="rounded-xl border border-border bg-surface/60 p-3">
              <div className="flex items-center justify-between">
                <div className="text-[11.5px] font-medium">{c.title}</div>
                <span className="text-[10.5px] text-muted-foreground">{c.items.length}</span>
              </div>
              <div className="mt-3 space-y-2">
                {c.items.map((it) => (
                  <div
                    key={it.n}
                    className={`rounded-lg border p-2.5 ${
                      it.gold
                        ? "bg-gold-soft/40 border-[color:color-mix(in_oklab,var(--gold)_45%,var(--border))]"
                        : "bg-background border-border"
                    }`}
                  >
                    <div className="text-[12px] font-medium">{it.n}</div>
                    <div className="text-[10.5px] text-muted-foreground">{it.s}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </MockupFrame>
  );
}

function EstimateMockup() {
  const lines = [
    { l: "Demo & disposal", q: 1, p: "$1,800" },
    { l: "Cabinetry — custom", q: 1, p: "$9,400" },
    { l: "Quartz countertop", q: 1, p: "$4,200" },
    { l: "Plumbing rough-in", q: 1, p: "$2,100" },
    { l: "Electrical & lighting", q: 1, p: "$2,600" },
  ];
  return (
    <MockupFrame url="connect.renometa.com / estimates / sarah-m">
      <div className="p-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Estimate #1042</div>
            <div className="text-[13.5px] font-medium">Sarah M. · Kitchen remodel</div>
          </div>
          <span className="text-[10.5px] px-2 py-0.5 rounded-full bg-gold-soft border border-[color:color-mix(in_oklab,var(--gold)_45%,var(--border))]">
            Draft
          </span>
        </div>
        <div className="mt-4 rounded-lg border border-border bg-background overflow-hidden">
          <div className="grid grid-cols-[1fr_auto_auto] gap-4 px-3 py-2 text-[10.5px] uppercase tracking-wider text-muted-foreground border-b border-border">
            <div>Item</div><div>Qty</div><div>Price</div>
          </div>
          {lines.map((r) => (
            <div key={r.l} className="grid grid-cols-[1fr_auto_auto] gap-4 px-3 py-2 text-[12.5px] border-b border-border last:border-b-0">
              <div>{r.l}</div>
              <div className="text-muted-foreground">{r.q}</div>
              <div className="font-medium">{r.p}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="text-[11.5px] text-muted-foreground">Deposit 25% · Terms Net-15</div>
          <div className="font-display text-lg font-semibold">$24,800</div>
        </div>
        <div className="mt-4 flex gap-2">
          <span className="btn-primary text-[11.5px] px-3 py-1.5">Send for signature</span>
          <span className="btn-ghost text-[11.5px] px-3 py-1.5">Save draft</span>
        </div>
      </div>
    </MockupFrame>
  );
}

function PortalMockup() {
  return (
    <MockupFrame url="portal.renometa.com / sarah-m">
      <div className="p-5 space-y-3">
        <div className="rounded-lg border border-border bg-background p-3">
          <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Upcoming</div>
          <div className="mt-1.5 text-[13px] font-medium">Site visit · Thursday 2:00 PM</div>
          <div className="mt-3 flex gap-2">
            <span className="text-[11px] px-2.5 py-1 rounded-full border border-border">Reschedule</span>
            <span className="text-[11px] px-2.5 py-1 rounded-full border border-border">Add to calendar</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-border bg-background p-3">
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Proposal</div>
            <div className="mt-1.5 text-[12.5px] font-medium">Signed · Mar 2</div>
          </div>
          <div className="rounded-lg border border-border bg-background p-3">
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Deposit</div>
            <div className="mt-1.5 text-[12.5px] font-medium">$6,200 paid</div>
          </div>
        </div>
      </div>
    </MockupFrame>
  );
}
