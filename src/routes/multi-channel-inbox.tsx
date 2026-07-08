import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site-chrome";
import {
  Section,
  SectionHeader,
  FeatureGrid,
  StepFlow,
  CTASection,
  MockupFrame,
  Reveal,
  SplitCallout,
} from "@/components/page-primitives";
import {
  Inbox,
  Instagram,
  MessageCircle,
  MessageSquare,
  PhoneMissed,
  Phone,
  Users,
  Voicemail,
} from "lucide-react";

export const Route = createFileRoute("/multi-channel-inbox")({
  head: () => ({
    meta: [
      { title: "Multi-Channel Inbox — RenoMeta" },
      {
        name: "description",
        content:
          "SMS, WhatsApp, Messenger, Instagram DMs, missed calls, and voice conversations in one connected inbox.",
      },
      { property: "og:title", content: "Multi-Channel Inbox" },
      { property: "og:description", content: "Every customer conversation in one inbox." },
    ],
  }),
  component: InboxPage,
});

function InboxPage() {
  return (
    <PageShell
      eyebrow="Multi-Channel Inbox"
      headline="Every Customer Conversation in One Inbox"
      subheading="Manage SMS, WhatsApp, Messenger, Instagram Direct, missed calls, and voice conversations from one connected inbox."
      primaryCta={{ label: "Unify My Inbox", to: "/contact" }}
      secondaryCta={{ label: "See the Platform", to: "/renometa-connect" }}
      heroVisual={<InboxMockup />}
    >
      <Section>
        <SectionHeader
          eyebrow="One inbox, every channel"
          title="Stop switching apps to answer customers"
          desc="The inbox pulls every conversation into one thread per contact, no matter which channel it started on."
        />
        <FeatureGrid
          cols={3}
          items={[
            { icon: MessageSquare, title: "SMS", desc: "Two-way texting from a business number with delivery visibility." },
            { icon: MessageCircle, title: "WhatsApp", desc: "Business messages with templates and quick replies." },
            { icon: MessageSquare, title: "Messenger", desc: "Facebook Page messages tied to CRM records." },
            { icon: Instagram, title: "Instagram Direct", desc: "DMs answered from the same thread as everything else." },
            { icon: Voicemail, title: "Voice threads", desc: "Call notes, transcripts, and follow-up in the same view." },
            { icon: PhoneMissed, title: "Missed-call text-back", desc: "Automatic text reply within seconds of a missed call." },
          ]}
        />
      </Section>

      <Section tone="surface">
        <SplitCallout
          eyebrow="Connected to CRM"
          title="Every conversation, on the right lead record"
          desc="Threads are tied to the contact, not a phone or an app. Anyone on the team can pick up any conversation with full context in seconds."
          bullets={[
            "Complete history across every channel",
            "Team assignments and read receipts",
            "Internal notes without leaving the thread",
            "Search across every conversation instantly",
          ]}
          visual={<CrmThreadMockup />}
        />
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Team visibility"
          title="No more asking who replied to Sarah"
          desc="Assignments, unread status, and internal notes make it obvious who owns what — even across a team spread over multiple crews."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {[
            { title: "Assignments", desc: "Every conversation has an owner. Auto-route by service, region, or team." },
            { title: "Internal notes", desc: "Tag a teammate directly in the thread without exposing it to the customer." },
            { title: "Read receipts", desc: "See when a message was read, replied to, or is going stale." },
          ].map((c, i) => (
            <Reveal key={c.title} delay={i * 60}>
              <div className="card-elegant card-elegant-hover p-6 h-full">
                <h4 className="text-[15px] font-medium">{c.title}</h4>
                <p className="mt-3 text-[14px] text-muted-foreground leading-relaxed">{c.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="bordered">
        <SectionHeader
          eyebrow="Example flow"
          title="Missed call → text conversation → booked appointment"
        />
        <StepFlow
          steps={[
            { title: "Call missed", desc: "Homeowner calls, no one available to pick up." },
            { title: "Text-back sent", desc: "Automated reply offers to continue by text or book a time." },
            { title: "Reply received", desc: "Conversation opens in the inbox with the caller's number." },
            { title: "AI qualifies", desc: "Lead Qualifier tags the project type and urgency." },
            { title: "Appointment booked", desc: "Booking link accepted, calendar updated, reminders queued." },
          ]}
        />
      </Section>

      <CTASection
        title="Unify My Inbox"
        desc="Every channel, every conversation, one place."
        primary={{ label: "Unify My Inbox", to: "/contact" }}
        secondary={{ label: "See CRM & Sales", to: "/crm-sales" }}
      />
    </PageShell>
  );
}

function InboxMockup() {
  const threads = [
    { name: "Sarah M.", msg: "Thursday afternoon works.", ch: "SMS", active: true, time: "2m" },
    { name: "Daniel R.", msg: "Availability this week?", ch: "WhatsApp", time: "8m" },
    { name: "Priya K.", msg: "Thanks for the quote!", ch: "Messenger", time: "24m" },
    { name: "Marcus L.", msg: "Missed call — auto reply sent", ch: "Voice", time: "1h" },
    { name: "Ellie T.", msg: "Can we push to next week?", ch: "Instagram", time: "2h" },
  ];
  return (
    <MockupFrame url="connect.renometa.com / inbox">
      <div className="grid grid-cols-12 min-h-[420px]">
        <div className="col-span-12 md:col-span-4 border-r border-border bg-surface/60 p-3">
          <div className="flex items-center justify-between px-2 py-1">
            <div className="text-[12px] font-medium">All conversations</div>
            <span className="text-[11px] text-muted-foreground">5 open</span>
          </div>
          <div className="mt-3 space-y-1.5">
            {threads.map((t) => (
              <div
                key={t.name}
                className={`rounded-lg px-3 py-2.5 border ${
                  t.active
                    ? "border-[color:color-mix(in_oklab,var(--gold)_35%,var(--border))] bg-gold-soft/40"
                    : "border-border bg-surface"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="text-[12.5px] font-medium">{t.name}</div>
                  <span className="text-[10px] text-muted-foreground">{t.time}</span>
                </div>
                <div className="mt-0.5 text-[11.5px] text-muted-foreground truncate">{t.msg}</div>
                <div className="mt-1.5 text-[9.5px] uppercase tracking-wider text-muted-foreground">{t.ch}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-12 md:col-span-8 p-5">
          <div className="flex items-center gap-3 pb-3 border-b border-border">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-gold-soft to-surface border border-border grid place-items-center text-[11px] font-medium">
              S
            </div>
            <div>
              <div className="text-[13.5px] font-medium">Sarah M.</div>
              <div className="text-[11px] text-muted-foreground">SMS · Kitchen remodel · Qualified</div>
            </div>
            <span className="ml-auto text-[10.5px] px-2 py-0.5 rounded-full bg-gold-soft border border-[color:color-mix(in_oklab,var(--gold)_50%,var(--border))]">
              Booking
            </span>
          </div>
          <div className="mt-4 space-y-3">
            <Bubble side="them">Hey — do you handle full kitchen renos in the north end?</Bubble>
            <Bubble side="us">Yes, that's most of what we do. Do you have a rough timeline?</Bubble>
            <Bubble side="them">Hoping to start by April. What's next?</Bubble>
            <Bubble side="us" gold>
              We can book a 30-min site visit — Thursday 2 PM works. Confirm?
            </Bubble>
            <Bubble side="them">Thursday afternoon works.</Bubble>
          </div>
          <div className="mt-5 rounded-lg border border-border bg-background p-2 flex items-center gap-2">
            <input
              className="flex-1 bg-transparent text-[13px] outline-none px-2 py-1.5"
              placeholder="Reply to Sarah…"
              readOnly
            />
            <span className="btn-primary text-[11.5px] px-3 py-1.5">Send</span>
          </div>
        </div>
      </div>
    </MockupFrame>
  );
}

function Bubble({ side, gold, children }: { side: "us" | "them"; gold?: boolean; children: React.ReactNode }) {
  const us = side === "us";
  return (
    <div className={`flex ${us ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-[12.5px] border ${
          us
            ? gold
              ? "bg-gold-soft border-[color:color-mix(in_oklab,var(--gold)_45%,var(--border))]"
              : "bg-foreground text-background border-foreground"
            : "bg-background border-border"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

function CrmThreadMockup() {
  return (
    <MockupFrame url="connect.renometa.com / contacts / sarah-m">
      <div className="p-5 space-y-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-gold-soft to-surface border border-border grid place-items-center text-[12px] font-medium">
            S
          </div>
          <div>
            <div className="text-[13.5px] font-medium">Sarah M.</div>
            <div className="text-[11px] text-muted-foreground">Qualified · Kitchen remodel · Owner: Alex</div>
          </div>
        </div>
        <div className="rounded-lg border border-border bg-background p-3">
          <div className="flex items-center gap-2 text-[11.5px] font-medium">
            <Inbox className="h-3.5 w-3.5" /> Conversation history
          </div>
          <ul className="mt-2.5 space-y-1.5 text-[11.5px] text-muted-foreground">
            <li className="flex justify-between"><span>SMS · Booking confirmed</span><span>Today</span></li>
            <li className="flex justify-between"><span>Messenger · First inquiry</span><span>Mon</span></li>
            <li className="flex justify-between"><span>Missed call · Auto text sent</span><span>Sun</span></li>
          </ul>
        </div>
        <div className="rounded-lg border border-border bg-surface p-3 text-[11.5px]">
          <div className="flex items-center gap-2 font-medium">
            <Users className="h-3.5 w-3.5" /> Internal note
          </div>
          <div className="mt-1.5 text-muted-foreground">
            @maya bring the kitchen sample kit — she mentioned quartz.
          </div>
        </div>
        <div className="rounded-lg border border-border bg-background p-3">
          <div className="flex items-center gap-2 text-[11.5px] font-medium">
            <Phone className="h-3.5 w-3.5" /> Next step
          </div>
          <div className="mt-1.5 text-[11.5px] text-muted-foreground">Site visit — Thursday 2:00 PM</div>
        </div>
      </div>
    </MockupFrame>
  );
}
