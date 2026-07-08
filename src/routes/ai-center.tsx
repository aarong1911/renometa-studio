import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site-chrome";
import { AgentNetworkVisual } from "@/components/visuals";
import {
  Section,
  SectionHeader,
  FeatureGrid,
  StepFlow,
  BenefitGrid,
  CTASection,
  MockupFrame,
  Reveal,
} from "@/components/page-primitives";
import {
  Bot,
  ClipboardList,
  FileText,
  Inbox,
  ListTodo,
  MessageSquare,
  Search,
  Sparkles,
  Star,
  Users,
  Zap,
} from "lucide-react";

export const Route = createFileRoute("/ai-center")({
  head: () => ({
    meta: [
      { title: "AI Center — RenoMeta" },
      {
        name: "description",
        content:
          "AI agents built for contractor workflows: qualify leads, follow up, draft estimates, summarize conversations, request reviews.",
      },
      { property: "og:title", content: "AI Center" },
      { property: "og:description", content: "AI agents built for contractor workflows." },
    ],
  }),
  component: AiCenterPage,
});

const AGENTS = [
  { icon: Users, title: "Lead Qualifier", desc: "Reads new inquiries and tags urgency, project type, and readiness." },
  { icon: Zap, title: "Speed-to-Lead Agent", desc: "Sends the first reply within seconds of a new inquiry." },
  { icon: MessageSquare, title: "Follow-Up Agent", desc: "Nudges quiet opportunities on the right cadence." },
  { icon: FileText, title: "Estimate Drafter", desc: "Turns notes and photos into a first-draft estimate." },
  { icon: ClipboardList, title: "Proposal Writer", desc: "Builds a clean, on-brand proposal from an approved estimate." },
  { icon: Star, title: "Review Agent", desc: "Requests a review the moment a job is marked complete." },
  { icon: Inbox, title: "Inbox Triage", desc: "Sorts and routes messages so the team sees what matters first." },
  { icon: Sparkles, title: "Conversation Summary", desc: "One-paragraph summary of every long thread." },
  { icon: ListTodo, title: "Task Extractor", desc: "Pulls action items out of calls and messages into the CRM." },
  { icon: Search, title: "AI Insights", desc: "Surfaces trends, bottlenecks, and opportunities across the pipeline." },
];

function AiCenterPage() {
  return (
    <PageShell
      eyebrow="AI Center"
      headline="AI Agents Built for Contractor Workflows"
      subheading="Qualify leads, follow up, draft estimates, summarize conversations, update your CRM, request reviews, and uncover insights."
      primaryCta={{ label: "Explore AI Agents", to: "/contact" }}
      secondaryCta={{ label: "See the Platform", to: "/renometa-connect" }}
      heroVisual={<AgentNetworkVisual size="lg" />}
    >
      <Section>
        <SectionHeader
          eyebrow="What the AI Center does"
          title="Agents that do the repetitive work"
          desc="Every agent runs inside RenoMeta Connect against your real leads, conversations, and jobs — not a sandbox."
        />
        <FeatureGrid items={AGENTS} />
      </Section>

      <Section tone="surface">
        <SectionHeader
          eyebrow="Agent activity"
          title="See every run, on every lead"
          desc="A live log of what the agents did, on which record, and what changed as a result."
        />
        <Reveal>
          <ActivityLog />
        </Reveal>
      </Section>

      <Section tone="bordered">
        <SectionHeader
          eyebrow="Example workflow"
          title="New lead → AI qualifies → CRM updated → appointment booked"
        />
        <StepFlow
          steps={[
            { title: "New lead", desc: "Form submission from a Meta ad hits the inbox." },
            { title: "AI qualifies", desc: "Lead Qualifier tags project type, urgency, and budget signal." },
            { title: "CRM updated", desc: "Record moves from New to Qualified, owner assigned." },
            { title: "Reply sent", desc: "Speed-to-Lead Agent responds with a booking link." },
            { title: "Appointment booked", desc: "Calendar syncs, reminders scheduled, follow-up queued." },
          ]}
        />
      </Section>

      <Section>
        <SectionHeader eyebrow="Benefits" title="Why teams use the AI Center" />
        <BenefitGrid
          items={[
            "First reply on every new lead in under a minute",
            "No forgotten follow-up on cold opportunities",
            "Estimates drafted from photos and voice notes",
            "Every conversation summarized, no re-reading threads",
            "Consistent review requests across every completed job",
            "Insights surfaced without pulling a report",
          ]}
        />
      </Section>

      <CTASection
        title="Explore AI Agents"
        desc="Turn on the agents that fit your workflow — no code, no rebuild."
        primary={{ label: "Explore AI Agents", to: "/contact" }}
        secondary={{ label: "See the Platform", to: "/renometa-connect" }}
      />
    </PageShell>
  );
}

function AiCenterMockup() {
  return (
    <MockupFrame url="connect.renometa.com / ai-center">
      <div className="p-5 sm:p-6 grid grid-cols-12 gap-4">
        {[
          { label: "Agents active", value: "10", tone: "gold" },
          { label: "Runs today", value: "1,247", tone: "default" },
          { label: "Avg response", value: "0:42", tone: "default" },
          { label: "Leads qualified", value: "84", tone: "default" },
        ].map((k) => (
          <div key={k.label} className="col-span-6 lg:col-span-3 rounded-xl border border-border bg-background p-4">
            <div className="text-[11.5px] text-muted-foreground">{k.label}</div>
            <div className="mt-1.5 font-display text-2xl font-semibold tracking-tight">{k.value}</div>
            <div className="mt-3 h-1 rounded-full bg-border overflow-hidden">
              <div className={`h-full ${k.tone === "gold" ? "bg-gold" : "bg-foreground/40"} animate-bar-grow`} style={{ width: "72%" }} />
            </div>
          </div>
        ))}
        {AGENTS.slice(0, 6).map((a) => (
          <div key={a.title} className="col-span-12 sm:col-span-6 lg:col-span-4 rounded-xl border border-border bg-background p-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg border border-border bg-surface grid place-items-center">
                <a.icon className="h-4 w-4" />
              </div>
              <div>
                <div className="text-[12.5px] font-medium">{a.title}</div>
                <div className="text-[10.5px] text-muted-foreground">Active</div>
              </div>
              <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[oklch(0.7_0.14_150)] animate-pulse-dot" />
            </div>
            <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground">
              <span>Runs today</span>
              <span className="text-foreground font-medium">{[18, 42, 31, 9, 12, 6][AGENTS.indexOf(a)]}</span>
            </div>
          </div>
        ))}
      </div>
    </MockupFrame>
  );
}

function ActivityLog() {
  const rows = [
    { agent: "Speed-to-Lead", record: "Sarah M. · Kitchen remodel", action: "Sent first reply", time: "2m ago", gold: true },
    { agent: "Lead Qualifier", record: "Daniel R. · Bathroom", action: "Tagged as ready-to-book", time: "6m ago" },
    { agent: "Estimate Drafter", record: "Priya K. · Whole home", action: "Draft estimate created", time: "14m ago" },
    { agent: "Follow-Up", record: "Marcus L. · Basement", action: "Sent nurture message", time: "28m ago" },
    { agent: "Review Agent", record: "Ellie T. · Deck", action: "Requested review", time: "42m ago" },
    { agent: "Conversation Summary", record: "Ben H. · Roof", action: "Summarized 32-msg thread", time: "1h ago" },
  ];
  return (
    <div className="mt-12 rounded-2xl border border-border bg-surface-elevated shadow-elegant overflow-hidden">
      <div className="px-5 py-3 border-b border-border bg-surface flex items-center gap-2">
        <Bot className="h-3.5 w-3.5" />
        <div className="text-[12.5px] font-medium">Agent activity</div>
        <span className="ml-auto text-[11px] text-muted-foreground">Live</span>
      </div>
      <div className="divide-y divide-border">
        {rows.map((r) => (
          <div key={r.time} className="px-5 py-3.5 flex items-center gap-4">
            <div className={`h-1.5 w-1.5 rounded-full ${r.gold ? "bg-gold" : "bg-foreground/30"} shrink-0`} />
            <div className="text-[12.5px] font-medium w-40 shrink-0">{r.agent}</div>
            <div className="text-[12.5px] text-muted-foreground truncate flex-1">{r.record}</div>
            <div className="text-[12.5px] text-foreground hidden md:block">{r.action}</div>
            <div className="text-[11px] text-muted-foreground w-16 text-right">{r.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
