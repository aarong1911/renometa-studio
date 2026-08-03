import { Link } from "@tanstack/react-router";
import { ArrowRight, Bot, Check, Sparkles } from "lucide-react";
import { Reveal } from "@/components/page-primitives";

const POINTS = [
  "Trains from your website content",
  "Answers common customer questions",
  "Helps capture lead details",
  "Built for renovation and home service businesses",
];

/**
 * Marketing-only promo for the AI agent demo.
 * The real website-details form lives on /try-agent; this card only links there.
 */

export function TryAgentSection({ tone = "default" }: { tone?: "default" | "surface" }) {
  return (
    <section
      id="try-agent"
      className={`relative ${tone === "surface" ? "bg-surface/50 border-y border-border" : ""}`}
    >
      <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
        <Reveal>
          <div className="rounded-3xl border border-border bg-surface-elevated shadow-elegant overflow-hidden">
            <div className="grid lg:grid-cols-[1.05fr_1fr]">
              {/* Copy */}
              <div className="p-8 sm:p-10 lg:p-12">
                <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  <span className="h-px w-6 bg-gold" />
                  Live demo
                </div>
                <h2 className="mt-5 font-display text-3xl sm:text-4xl leading-[1.08] tracking-[-0.025em] font-semibold text-balance">
                  Try an AI Agent on Your Website
                </h2>
                <p className="mt-4 text-[15.5px] text-muted-foreground leading-relaxed max-w-xl">
                  See how a RenoMeta customer service agent can answer questions,
                  capture lead details, and help visitors move toward booking.
                </p>

                <div className="mt-7">
                  <Link
                    to="/try-agent"
                    className="btn-primary justify-center"
                    aria-label="Try the Agent Live - go to the AI agent demo"
                  >
                    Try the Agent Live
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>


                <ul className="mt-8 grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
                  {POINTS.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-[13.5px] text-muted-foreground">
                      <Check className="mt-0.5 h-3.5 w-3.5 text-gold shrink-0" strokeWidth={2} />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Visual */}
              <div className="relative border-t lg:border-t-0 lg:border-l border-border bg-surface/60 p-6 sm:p-8">
                <div className="absolute inset-0 bg-grid-fade opacity-40 pointer-events-none" aria-hidden />
                <div className="relative rounded-2xl border border-border bg-background shadow-elegant overflow-hidden">
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-surface">
                    <div className="h-7 w-7 rounded-lg border border-border bg-surface-elevated grid place-items-center">
                      <Bot className="h-3.5 w-3.5" strokeWidth={1.6} />
                    </div>
                    <div className="text-[12.5px] font-medium">RenoMeta Agent</div>
                    <span className="ml-auto inline-flex items-center gap-1.5 text-[10.5px] text-muted-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.7_0.14_150)] animate-pulse-dot" />
                      Online
                    </span>
                  </div>
                  <div className="p-4 space-y-3" aria-hidden>
                    <ChatBubble side="in">Do you handle full kitchen remodels?</ChatBubble>
                    <ChatBubble side="out">
                      Yes - kitchens are one of our core projects. What is the approximate
                      size of your space?
                    </ChatBubble>
                    <ChatBubble side="in">About 200 sq ft, hoping to start in spring.</ChatBubble>
                    <ChatBubble side="out">
                      Great. What is the best number to send a few available consultation
                      times?
                    </ChatBubble>
                    <div className="flex items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2.5">
                      <Sparkles className="h-3.5 w-3.5 text-gold" strokeWidth={1.6} />
                      <span className="text-[11.5px] text-muted-foreground">
                        Lead details captured - project type, timeline, contact
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ChatBubble({ side, children }: { side: "in" | "out"; children: React.ReactNode }) {
  const out = side === "out";
  return (
    <div className={`flex ${out ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[12.5px] leading-relaxed border ${
          out
            ? "border-[color:color-mix(in_oklab,var(--gold)_45%,var(--border))] bg-gold-soft text-foreground"
            : "border-border bg-surface text-muted-foreground"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
