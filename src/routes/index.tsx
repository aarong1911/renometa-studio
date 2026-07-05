import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode, type HTMLAttributes } from "react";
import { useReveal } from "@/hooks/use-reveal";

import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Calendar,
  Check,
  Globe,
  LineChart,
  MessageSquare,
  Mic,
  PhoneMissed,
  Search,
  Send,
  Sparkles,
  Star,
  Users,
  Workflow,
  Zap,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <Credibility />
        <Solutions />
        <ConnectProduct />
        <HowItWorks />
        <Benefits />
        <FeaturedGrid />
        <Proof />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

/* -------------------- REVEAL WRAPPER -------------------- */
function Reveal({
  as: Tag = "div",
  delay = 0,
  className = "",
  children,
  ...rest
}: {
  as?: "div" | "section" | "li" | "article";
  delay?: number;
  className?: string;
  children: ReactNode;
} & HTMLAttributes<HTMLElement>) {
  const ref = useReveal<HTMLElement>();
  return (
    <Tag
      ref={ref as never}
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* -------------------- NAV -------------------- */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#solutions", label: "Solutions" },
    { href: "#connect", label: "RenoMeta Connect" },
    { href: "#how", label: "How It Works" },
    { href: "#proof", label: "Case Studies" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/75 backdrop-blur-xl border-b border-border shadow-[0_1px_0_oklch(0_0_0/0.03),0_8px_24px_-16px_oklch(0_0_0/0.12)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group">
          <Logo />
          <span className="font-display text-[15px] font-semibold tracking-tight">
            RenoMeta
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[13.5px] text-muted-foreground hover:text-foreground transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href="#contact" className="hidden sm:inline-flex btn-primary text-[13.5px] px-4 py-2">
            Book a Call
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </header>
  );
}

function Logo() {
  return (
    <div className="relative h-7 w-7 rounded-md bg-foreground grid place-items-center overflow-hidden">
      <div
        className="absolute inset-0 opacity-90"
        style={{
          background:
            "linear-gradient(135deg, var(--gold) 0%, oklch(0.35 0.02 80) 60%, oklch(0.18 0.01 80) 100%)",
        }}
      />
      <span className="relative font-display text-[13px] font-bold text-white">R</span>
    </div>
  );
}

/* -------------------- HERO -------------------- */
function Hero() {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden bg-hero-radial">
      <div className="absolute inset-0 bg-grid-fade opacity-70 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-4xl text-center animate-reveal">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-elevated/70 backdrop-blur px-3 py-1.5 text-[12.5px] text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse-dot" />
            AI systems for modern service businesses
          </div>
          <h1 className="mt-6 font-display text-balance text-[38px] sm:text-5xl lg:text-[60px] leading-[1.05] tracking-[-0.03em] font-semibold max-w-3xl mx-auto">
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(180deg, oklch(0.28 0.02 80), var(--gold))",
              }}
            >
              AI Growth Systems
            </span>{" "}
            for Service Businesses
          </h1>
          <p className="mt-6 text-pretty text-[16.5px] sm:text-[17px] text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Websites, automation, and AI agents that help you capture leads,
            respond faster, and book more appointments.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a href="#contact" className="btn-primary">
              Book a Free Strategy Call
              <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#solutions" className="btn-ghost">
              Explore Solutions
            </a>
          </div>
        </div>

        <div className="mt-20 animate-reveal" style={{ animationDelay: "120ms" }}>
          <DashboardMockup />
        </div>
      </div>
    </section>
  );
}

/* -------------------- DASHBOARD MOCKUP -------------------- */
function DashboardMockup() {
  return (
    <div className="relative mx-auto max-w-6xl">
      {/* gold glow */}
      <div
        aria-hidden
        className="absolute -inset-x-10 -top-10 h-40 blur-3xl opacity-60 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, color-mix(in oklab, var(--gold) 35%, transparent), transparent 70%)",
        }}
      />
      <div className="relative rounded-2xl border border-border bg-surface-elevated shadow-elegant overflow-hidden transition-transform duration-700 hover:-translate-y-1 hover:shadow-[0_20px_60px_-24px_oklch(0_0_0/0.18)]">
        {/* animated top accent */}
        <div className="absolute inset-x-0 top-0 h-px animate-shimmer pointer-events-none" aria-hidden />
        {/* window bar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-surface">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.85_0.02_30)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.88_0.02_80)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.86_0.05_150)]" />
          </div>
          <div className="text-[11px] text-muted-foreground font-mono">
            connect.renometa.com / overview
          </div>
          <div className="text-[11px] text-muted-foreground hidden sm:block">Today</div>
        </div>

        <div className="grid grid-cols-12 min-h-[520px]">
          {/* Sidebar */}
          <aside className="hidden md:flex md:col-span-2 flex-col gap-1 border-r border-border p-4 bg-surface/60">
            <SidebarItem icon={<Zap className="h-3.5 w-3.5" />} label="Overview" active />
            <SidebarItem icon={<Users className="h-3.5 w-3.5" />} label="Leads" />
            <SidebarItem icon={<MessageSquare className="h-3.5 w-3.5" />} label="Inbox" />
            <SidebarItem icon={<Calendar className="h-3.5 w-3.5" />} label="Bookings" />
            <SidebarItem icon={<Workflow className="h-3.5 w-3.5" />} label="Automations" />
            <SidebarItem icon={<Star className="h-3.5 w-3.5" />} label="Reviews" />
            <SidebarItem icon={<LineChart className="h-3.5 w-3.5" />} label="Reports" />
          </aside>

          {/* Main */}
          <div className="col-span-12 md:col-span-10 p-5 sm:p-6 grid grid-cols-12 gap-4">
            {/* KPI row */}
            <Kpi
              className="col-span-6 lg:col-span-3"
              label="New Leads"
              value="184"
              delta="+24%"
            />
            <Kpi
              className="col-span-6 lg:col-span-3"
              label="Appointments"
              value="62"
              delta="+18%"
            />
            <Kpi
              className="col-span-6 lg:col-span-3"
              label="AI Chats"
              value="1,247"
              delta="+41%"
            />
            <Kpi
              className="col-span-6 lg:col-span-3"
              label="Response Time"
              value="0:42"
              delta="-63%"
              positive
            />

            {/* Chat + Pipeline */}
            <div className="col-span-12 lg:col-span-7 rounded-xl border border-border bg-background p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-md grid place-items-center bg-gold-soft">
                    <Bot className="h-3.5 w-3.5 text-foreground" />
                  </div>
                  <div className="text-[13px] font-medium">AI Chat — Sarah, kitchen remodel</div>
                </div>
                <span className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.7_0.14_150)] animate-pulse-dot" />
                  Live
                </span>
              </div>
              <div className="mt-4 space-y-2.5">
                <ChatBubble side="in">
                  Hi, I'm looking to remodel my kitchen. Do you offer free estimates?
                </ChatBubble>
                <ChatBubble side="out">
                  Absolutely, Sarah. I can pencil you in this week — do Tuesday 10:30 or
                  Thursday 2:00 work better?
                </ChatBubble>
                <ChatBubble side="in">Thursday afternoon is perfect.</ChatBubble>
                <ChatBubble side="out" gold>
                  Booked. You'll receive a confirmation SMS shortly.
                </ChatBubble>
                <div className="flex justify-start">
                  <div className="inline-flex items-center gap-1 rounded-2xl border border-border bg-surface px-3 py-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60 animate-typing" style={{ animationDelay: "0ms" }} />
                    <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60 animate-typing" style={{ animationDelay: "150ms" }} />
                    <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60 animate-typing" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 rounded-full border border-border px-3 py-2">
                <input
                  disabled
                  placeholder="Message..."
                  className="flex-1 bg-transparent text-[12.5px] outline-none placeholder:text-muted-foreground"
                />
                <Send className="h-3.5 w-3.5 text-muted-foreground" />
              </div>
            </div>

            <div className="col-span-12 lg:col-span-5 rounded-xl border border-border bg-background p-4 flex flex-col">
              <div className="flex items-center justify-between">
                <div className="text-[13px] font-medium">Pipeline</div>
                <span className="text-[11px] text-muted-foreground">This week</span>
              </div>
              <div className="mt-4 space-y-3 flex-1">
                <PipelineRow name="Sarah M." stage="Booked" gold />
                <PipelineRow name="Daniel R." stage="Qualified" />
                <PipelineRow name="Priya K." stage="Contacted" />
                <PipelineRow name="Marcus L." stage="New Lead" />
              </div>

              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center justify-between text-[12px]">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <PhoneMissed className="h-3.5 w-3.5" />
                    Missed call text-back
                  </div>
                  <span className="text-foreground font-medium">Sent · 2m ago</span>
                </div>
                <div className="mt-2 flex items-center justify-between text-[12px]">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Star className="h-3.5 w-3.5" />
                    Review requests
                  </div>
                  <span className="text-foreground font-medium">12 today</span>
                </div>
                <div className="mt-2 flex items-center justify-between text-[12px]">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Workflow className="h-3.5 w-3.5" />
                    Automations
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-foreground font-medium">
                    <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.7_0.13_150)] animate-pulse-dot" />
                    8 running
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SidebarItem({
  icon,
  label,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-2 px-2.5 py-1.5 rounded-md text-[12.5px] cursor-default ${
        active
          ? "bg-surface-elevated text-foreground border border-border shadow-sm"
          : "text-muted-foreground"
      }`}
    >
      {icon}
      {label}
    </div>
  );
}

function Kpi({
  label,
  value,
  delta,
  positive,
  className = "",
}: {
  label: string;
  value: string;
  delta: string;
  positive?: boolean;
  className?: string;
}) {
  return (
    <div className={`rounded-xl border border-border bg-background p-4 ${className}`}>
      <div className="text-[11.5px] text-muted-foreground">{label}</div>
      <div className="mt-1.5 flex items-baseline gap-2">
        <div className="font-display text-2xl font-semibold tracking-tight">{value}</div>
        <span
          className={`text-[11px] font-medium ${
            positive || !delta.startsWith("-") ? "text-[oklch(0.55_0.14_150)]" : "text-[oklch(0.55_0.14_150)]"
          }`}
        >
          {delta}
        </span>
      </div>
      <div className="mt-3 h-6 flex items-end gap-0.5">
        {[3, 4, 3, 5, 4, 6, 5, 7, 6, 8, 7, 9].map((h, i) => (
          <span
            key={i}
            className="w-1 rounded-sm bg-border animate-bar-grow"
            style={{
              height: `${h * 3}px`,
              animationDelay: `${i * 60}ms`,
              background:
                i > 8
                  ? "color-mix(in oklab, var(--gold) 70%, transparent)"
                  : undefined,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function ChatBubble({
  side,
  gold,
  children,
}: {
  side: "in" | "out";
  gold?: boolean;
  children: React.ReactNode;
}) {
  const isOut = side === "out";
  return (
    <div className={`flex ${isOut ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-3 py-2 text-[12.5px] leading-snug border ${
          isOut
            ? gold
              ? "bg-gold-soft border-[color:color-mix(in_oklab,var(--gold)_50%,var(--border))] text-foreground"
              : "bg-foreground text-background border-foreground"
            : "bg-surface border-border text-foreground"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

function PipelineRow({
  name,
  stage,
  gold,
}: {
  name: string;
  stage: string;
  gold?: boolean;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-border bg-surface px-3 py-2">
      <div className="flex items-center gap-2.5">
        <div className="h-6 w-6 rounded-full bg-gradient-to-br from-[color:var(--gold-soft)] to-surface-elevated border border-border grid place-items-center text-[10px] font-medium text-muted-foreground">
          {name[0]}
        </div>
        <div className="text-[12.5px] font-medium">{name}</div>
      </div>
      <span
        className={`text-[10.5px] px-2 py-0.5 rounded-full border ${
          gold
            ? "bg-gold-soft border-[color:color-mix(in_oklab,var(--gold)_50%,var(--border))] text-foreground"
            : "bg-background border-border text-muted-foreground"
        }`}
      >
        {stage}
      </span>
    </div>
  );
}

/* -------------------- CREDIBILITY -------------------- */
function Credibility() {
  const items = [
    "Built for service businesses",
    "AI-powered customer engagement",
    "Automation-first systems",
    "Designed to increase booked appointments",
  ];
  return (
    <section className="border-y border-border bg-surface/60">
      <div className="mx-auto max-w-7xl px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
        {items.map((t) => (
          <div key={t} className="flex items-center gap-2.5 text-[13px] text-muted-foreground">
            <Check className="h-3.5 w-3.5 text-gold shrink-0" />
            <span className="text-foreground/80">{t}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* -------------------- SOLUTIONS -------------------- */
function Solutions() {
  const cards = [
    {
      icon: Globe,
      title: "AI Website Systems",
      desc: "High-converting websites built to capture leads, answer questions, and guide visitors toward booking.",
    },
    {
      icon: Bot,
      title: "AI Customer Service Agents",
      desc: "Smart chat and voice agents that respond instantly, qualify leads, and help schedule appointments.",
    },
    {
      icon: Workflow,
      title: "Marketing Automation",
      desc: "Automated follow-ups, missed call text-back, SMS/email campaigns, and lead nurturing workflows.",
    },
    {
      icon: Search,
      title: "Growth & SEO Systems",
      desc: "Search visibility, content structure, local SEO, tracking, and performance optimization.",
    },
  ];

  return (
    <section id="solutions" className="py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Solutions"
          title="A complete AI growth stack for service businesses."
          desc="Every system is built to reduce manual work and increase booked revenue."
        />
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-4">
          {cards.map((c, idx) => (
            <Reveal
              key={c.title}
              delay={idx * 80}
              className="card-elegant card-elegant-hover group p-8 relative overflow-hidden"
            >
              <div
                className="absolute top-0 left-8 right-8 h-px gold-line opacity-0 group-hover:opacity-100 transition-opacity"
                aria-hidden
              />
              <div className="flex items-start justify-between">
                <div className="h-11 w-11 rounded-xl border border-border bg-surface grid place-items-center">
                  <c.icon className="h-5 w-5 text-foreground" strokeWidth={1.5} />
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </div>
              <h3 className="mt-6 font-display text-[22px] font-semibold tracking-tight">
                {c.title}
              </h3>
              <p className="mt-2.5 text-[15px] text-muted-foreground leading-relaxed max-w-md">
                {c.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionHeader({
  eyebrow,
  title,
  desc,
  center = false,
}: {
  eyebrow?: string;
  title: string;
  desc?: string;
  center?: boolean;
}) {
  return (
    <div className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <div className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-muted-foreground">
          <span className="h-px w-6 bg-gold" />
          {eyebrow}
        </div>
      )}
      <h2 className="mt-4 font-display text-balance text-4xl sm:text-5xl lg:text-[56px] leading-[1.05] tracking-[-0.025em] font-semibold">
        {title}
      </h2>
      {desc && (
        <p className="mt-5 text-[17px] text-muted-foreground max-w-2xl leading-relaxed">
          {desc}
        </p>
      )}
    </div>
  );
}

/* -------------------- CONNECT PRODUCT -------------------- */
function ConnectProduct() {
  const features = [
    "Universal inbox for customer messages",
    "AI chat and voice automation",
    "Online booking and calendar tools",
    "Lead pipeline and follow-up automation",
    "Reviews, reminders, and reporting",
  ];
  return (
    <section id="connect" className="py-28 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <div className="rounded-3xl border border-border bg-charcoal text-charcoal-foreground overflow-hidden relative">
          <div
            className="absolute inset-0 opacity-40 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 40% at 20% 0%, color-mix(in oklab, var(--gold) 35%, transparent), transparent 70%)",
            }}
          />
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 p-10 sm:p-14 lg:p-16">
            <div>
              <div className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-white/50">
                <span className="h-px w-6 bg-gold" />
                RenoMeta Connect
              </div>
              <h2 className="mt-4 font-display text-balance text-4xl sm:text-5xl leading-[1.05] tracking-[-0.025em] font-semibold">
                One platform to manage leads, conversations, appointments, and growth.
              </h2>
              <p className="mt-5 text-[16.5px] text-white/60 leading-relaxed max-w-lg">
                RenoMeta Connect brings your customer communication, automation, scheduling,
                pipeline, and reporting into one simple platform.
              </p>
              <ul className="mt-8 space-y-3.5">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-[14.5px] text-white/85">
                    <span className="mt-1 h-4 w-4 rounded-full border border-white/20 grid place-items-center shrink-0">
                      <Check className="h-2.5 w-2.5 text-gold" strokeWidth={3} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex flex-wrap gap-3">
                <a href="#contact" className="btn-gold">
                  See Connect in action
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="relative">
              <ConnectMockup />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ConnectMockup() {
  return (
    <div className="rounded-2xl border border-white/10 bg-[oklch(0.14_0.008_260)] shadow-2xl overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/10">
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="ml-3 text-[11px] text-white/40 font-mono">inbox</span>
      </div>
      <div className="grid grid-cols-12 min-h-[420px]">
        <div className="col-span-5 border-r border-white/10 p-3 space-y-1.5">
          {[
            { name: "Sarah M.", msg: "Thursday afternoon is perfect.", channel: "AI Chat", active: true },
            { name: "Daniel R.", msg: "What's your soonest availability?", channel: "SMS" },
            { name: "Priya K.", msg: "Thanks for the quote!", channel: "Email" },
            { name: "Marcus L.", msg: "Missed call — auto reply sent", channel: "Voice" },
            { name: "Alex T.", msg: "Booking confirmed for Fri.", channel: "AI Chat" },
          ].map((c) => (
            <div
              key={c.name}
              className={`rounded-lg px-3 py-2.5 border ${
                c.active
                  ? "bg-white/[0.06] border-white/10"
                  : "bg-transparent border-transparent hover:bg-white/[0.03]"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="text-[12.5px] font-medium text-white">{c.name}</div>
                <span className="text-[9.5px] uppercase tracking-wider text-gold/80">
                  {c.channel}
                </span>
              </div>
              <div className="mt-0.5 text-[11.5px] text-white/50 truncate">{c.msg}</div>
            </div>
          ))}
        </div>
        <div className="col-span-7 p-4 flex flex-col">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="h-7 w-7 rounded-full bg-gradient-to-br from-gold-soft to-white/10 border border-white/10" />
              <div>
                <div className="text-[12.5px] font-medium text-white">Sarah M.</div>
                <div className="text-[10.5px] text-white/40">Kitchen remodel · Lead</div>
              </div>
            </div>
            <button className="text-[11px] px-2.5 py-1 rounded-full border border-white/15 text-white/80">
              Book appointment
            </button>
          </div>
          <div className="flex-1 py-4 space-y-2">
            <div className="max-w-[80%] rounded-2xl px-3 py-2 text-[12px] bg-white/[0.06] text-white/90 border border-white/10">
              Hi, do you offer free estimates?
            </div>
            <div className="ml-auto max-w-[80%] rounded-2xl px-3 py-2 text-[12px] bg-gold-soft text-foreground border border-[color:color-mix(in_oklab,var(--gold)_45%,white)]">
              Yes — Tuesday 10:30 or Thursday 2:00?
            </div>
            <div className="max-w-[80%] rounded-2xl px-3 py-2 text-[12px] bg-white/[0.06] text-white/90 border border-white/10">
              Thursday afternoon works.
            </div>
            <div className="ml-auto inline-flex items-center gap-1 rounded-2xl px-3 py-2 bg-gold-soft border border-[color:color-mix(in_oklab,var(--gold)_45%,white)]">
              <span className="h-1.5 w-1.5 rounded-full bg-foreground/50 animate-typing" style={{ animationDelay: "0ms" }} />
              <span className="h-1.5 w-1.5 rounded-full bg-foreground/50 animate-typing" style={{ animationDelay: "150ms" }} />
              <span className="h-1.5 w-1.5 rounded-full bg-foreground/50 animate-typing" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-white/15 px-3 py-2 transition-colors hover:border-white/30">
            <Sparkles className="h-3.5 w-3.5 text-gold animate-pulse-dot" />
            <input
              disabled
              placeholder="AI-suggested reply — Booking Thursday 2:00pm…"
              className="flex-1 bg-transparent text-[12px] outline-none text-white/70 placeholder:text-white/40"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------- HOW IT WORKS -------------------- */
function HowItWorks() {
  const steps = [
    {
      n: "01",
      title: "Identify growth gaps",
      desc: "We review your website, lead flow, customer response process, and automation opportunities.",
    },
    {
      n: "02",
      title: "Build your AI system",
      desc: "We create the website, automations, AI agents, CRM workflows, and tracking systems your business needs.",
    },
    {
      n: "03",
      title: "Launch, optimize, and scale",
      desc: "We monitor performance, improve conversions, and keep your systems running smoothly.",
    },
  ];
  return (
    <section id="how" className="py-28 bg-surface/50 border-y border-border">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="How it works"
          title="From growth audit to launched AI system."
        />
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-4">
          {steps.map((s) => (
            <div key={s.n} className="card-elegant card-elegant-hover p-8">
              <div className="flex items-center justify-between">
                <div className="font-mono text-[12px] text-gold tracking-wider">
                  STEP {s.n}
                </div>
                <div className="h-8 w-8 rounded-full border border-border grid place-items-center text-[13px] font-display font-semibold">
                  {s.n[1]}
                </div>
              </div>
              <h3 className="mt-6 font-display text-[22px] font-semibold tracking-tight">
                {s.title}
              </h3>
              <p className="mt-2.5 text-[14.5px] text-muted-foreground leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- BENEFITS -------------------- */
function Benefits() {
  const items = [
    {
      icon: Zap,
      title: "Respond faster",
      desc: "Never miss high-intent leads because of slow replies or missed calls.",
    },
    {
      icon: Calendar,
      title: "Book more appointments",
      desc: "Guide visitors and prospects toward scheduling with smart automation.",
    },
    {
      icon: Workflow,
      title: "Scale with less manual work",
      desc: "Automate repetitive follow-up, communication, and lead management tasks.",
    },
  ];
  return (
    <section className="py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader eyebrow="Why RenoMeta" title="Built for measurable outcomes." />
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-4">
          {items.map((i) => (
            <div key={i.title} className="card-elegant card-elegant-hover p-8">
              <div className="h-11 w-11 rounded-xl bg-gold-soft border border-[color:color-mix(in_oklab,var(--gold)_35%,var(--border))] grid place-items-center">
                <i.icon className="h-5 w-5 text-foreground" strokeWidth={1.5} />
              </div>
              <h3 className="mt-6 font-display text-xl font-semibold tracking-tight">
                {i.title}
              </h3>
              <p className="mt-2 text-[14.5px] text-muted-foreground leading-relaxed">
                {i.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- FEATURED GRID -------------------- */
function FeaturedGrid() {
  const items = [
    { icon: MessageSquare, title: "AI Chat Assistant", desc: "24/7 lead capture and qualification." },
    { icon: Mic, title: "AI Voice Assistant", desc: "Answer calls, book jobs, route requests." },
    { icon: PhoneMissed, title: "Missed Call Text-Back", desc: "Instant SMS the moment a call is missed." },
    { icon: Globe, title: "Website Design", desc: "High-converting conversion-first websites." },
    { icon: Search, title: "SEO Optimization", desc: "Local visibility and technical SEO." },
    { icon: Star, title: "Review Automation", desc: "Request, monitor, and reply automatically." },
    { icon: Calendar, title: "Appointment Booking", desc: "Real-time scheduling and reminders." },
    { icon: Send, title: "Lead Nurturing", desc: "Personalized long-cycle follow-up." },
    { icon: Users, title: "CRM & Pipeline", desc: "See every deal, stage, and next step." },
    { icon: Workflow, title: "SMS & Email Automation", desc: "Trigger-based cross-channel workflows." },
  ];
  return (
    <section className="py-28 bg-surface/50 border-y border-border">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Capabilities"
          title="Every touchpoint, automated."
          desc="Composable modules that plug into your existing tools or run inside RenoMeta Connect."
        />
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {items.map((i) => (
            <div
              key={i.title}
              className="group rounded-xl border border-border bg-surface-elevated p-5 hover:border-border-strong hover:-translate-y-0.5 transition-all duration-300"
            >
              <i.icon
                className="h-4 w-4 text-muted-foreground group-hover:text-gold transition-colors"
                strokeWidth={1.5}
              />
              <div className="mt-4 text-[14px] font-medium tracking-tight">{i.title}</div>
              <div className="mt-1 text-[12.5px] text-muted-foreground leading-relaxed">
                {i.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- PROOF -------------------- */
function Proof() {
  const metrics = [
    { value: "103%", label: "Increase in qualified leads" },
    { value: "32%", label: "Lower cost per lead" },
    { value: "<1m", label: "Average response time" },
    { value: "3.4x", label: "More booked appointments" },
  ];
  return (
    <section id="proof" className="py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <SectionHeader
              eyebrow="Proof"
              title="Built to turn more visitors into booked opportunities."
              desc="Sample outcomes across service businesses running RenoMeta systems."
            />
          </div>
          <div className="lg:col-span-5 flex lg:justify-end">
            <a href="#contact" className="btn-ghost">
              Request a case study
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 rounded-2xl border border-border bg-surface-elevated overflow-hidden">
          {metrics.map((m, i) => (
            <div
              key={m.label}
              className={`p-8 ${i !== 0 ? "border-l border-border" : ""} ${
                i >= 2 ? "border-t lg:border-t-0" : ""
              }`}
            >
              <div className="font-display text-5xl font-semibold tracking-[-0.03em]">
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(180deg, oklch(0.22 0.01 80), var(--gold))",
                  }}
                >
                  {m.value}
                </span>
              </div>
              <div className="mt-3 text-[13px] text-muted-foreground">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- FINAL CTA -------------------- */
function FinalCTA() {
  return (
    <section id="contact" className="py-28">
      <div className="mx-auto max-w-5xl px-6">
        <div className="relative rounded-3xl border border-border bg-hero-radial p-10 sm:p-16 text-center overflow-hidden">
          <div className="absolute inset-0 bg-grid-fade opacity-60 pointer-events-none" />
          <div className="relative">
            <h2 className="font-display text-balance text-4xl sm:text-5xl lg:text-[56px] leading-[1.05] tracking-[-0.025em] font-semibold">
              Ready to build an AI growth system for your business?
            </h2>
            <p className="mt-5 text-[16.5px] text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Let's create a smarter website, stronger follow-up system, and AI-powered
              customer experience built to help your business grow.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <a href="#" className="btn-primary">
                Book a Free Strategy Call
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#solutions" className="btn-ghost">
                Explore Solutions
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------- FOOTER -------------------- */
function Footer() {
  return (
    <footer className="border-t border-border bg-surface/60">
      <div className="mx-auto max-w-7xl px-6 py-16 grid grid-cols-2 md:grid-cols-5 gap-10">
        <div className="col-span-2 md:col-span-2">
          <div className="flex items-center gap-2">
            <Logo />
            <span className="font-display text-[15px] font-semibold tracking-tight">
              RenoMeta
            </span>
          </div>
          <p className="mt-4 text-[14px] text-muted-foreground max-w-xs leading-relaxed">
            AI systems and marketing automation for modern service businesses.
          </p>
          <a
            href="#contact"
            className="mt-6 inline-flex items-center gap-1.5 text-[13.5px] font-medium text-foreground hover:text-gold transition-colors"
          >
            Book a call
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
        <FooterCol
          title="Services"
          links={[
            "AI Website Systems",
            "AI Customer Service",
            "Marketing Automation",
            "Growth & SEO",
          ]}
        />
        <FooterCol
          title="Company"
          links={["About", "RenoMeta Connect", "Case Studies", "Contact"]}
        />
        <FooterCol title="Contact" links={["hello@renometa.com", "Book a Call", "LinkedIn"]} />
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-[12.5px] text-muted-foreground">
            © {new Date().getFullYear()} RenoMeta. All rights reserved.
          </div>
          <div className="text-[12.5px] text-muted-foreground">
            Crafted with care · Built for service businesses
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <div className="text-[12px] uppercase tracking-[0.16em] text-muted-foreground">
        {title}
      </div>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l}>
            <a
              href="#"
              className="text-[13.5px] text-foreground/80 hover:text-foreground transition-colors"
            >
              {l}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
