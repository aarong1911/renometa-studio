import { createFileRoute } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowRight,
  Building,
  CheckCircle2,
  Globe,
  Loader2,
  Mail,
  Phone,
  Send,
  User,
} from "lucide-react";
import { useEffect, useRef, useState, type FormEvent, type RefObject } from "react";
import { PageShell } from "@/components/site-chrome";
import { BenefitGrid, Section, SectionHeader } from "@/components/page-primitives";

export const Route = createFileRoute("/try-agent")({
  head: () => ({
    meta: [
      { title: "Try the Agent Live | RenoMeta" },
      {
        name: "description",
        content:
          "Enter your website and RenoMeta creates a customer service agent trained from your website content, so you can see instant answers and lead capture in action.",
      },
      { property: "og:title", content: "Try the Agent Live | RenoMeta" },
      {
        property: "og:description",
        content: "See an AI customer service agent trained from your own website content.",
      },
      { property: "og:url", content: "/try-agent" },
      { name: "twitter:title", content: "Try the Agent Live | RenoMeta" },
      {
        name: "twitter:description",
        content: "See an AI customer service agent trained from your own website content.",
      },
    ],
    links: [{ rel: "canonical", href: "/try-agent" }],
  }),
  component: TryAgentPage,
});

type AgentForm = {
  name: string;
  email: string;
  company: string;
  phone: string;
  website: string;
};

type ChatMessage = { role: "user" | "agent"; content: string; quickReplies?: string[] };
type Step = "form" | "training" | "chat";
type BackendStatus = "pending" | "crawling" | "indexing" | "ready" | "failed";

const EMPTY_FORM: AgentForm = { name: "", email: "", company: "", phone: "", website: "http://" };

const TERMINAL_FAILURE_STATUSES = ["failed", "no_content", "crawling_initiation_failed"];

const STAGE_LABELS: Record<BackendStatus, string> = {
  pending: "Preparing your agent...",
  crawling: "Reading your website...",
  indexing: "Building your knowledge base...",
  ready: "Agent training complete!",
  failed: "Something went wrong.",
};

// The bar may creep forward within a stage while waiting for the next
// confirmed backend value, but never past this stage's estimated ceiling.
const STAGE_CEILING: Record<BackendStatus, number> = {
  pending: 9,
  crawling: 49,
  indexing: 94,
  ready: 100,
  failed: 100,
};

function clampPercent(value: unknown): number {
  const n = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(n)) return 0;
  const pct = n <= 1 ? n * 100 : n;
  return Math.min(100, Math.max(0, pct));
}

function statusToStage(status: string | undefined): BackendStatus {
  if (status === "ready") return "ready";
  if (status === "indexing") return "indexing";
  if (status === "crawling") return "crawling";
  if (TERMINAL_FAILURE_STATUSES.includes(status || "")) return "failed";
  return "pending";
}

function TryAgentPage() {
  const [form, setForm] = useState<AgentForm>(EMPTY_FORM);
  const [step, setStep] = useState<Step>("form");
  const [requestId, setRequestId] = useState<string | null>(null);
  const [capabilityToken, setCapabilityToken] = useState<string | null>(null);
  const [displayProgress, setDisplayProgress] = useState(0);
  const [stage, setStage] = useState<BackendStatus>("pending");
  const [estimated, setEstimated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [queriesRemaining, setQueriesRemaining] = useState<number | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [turnstileReady, setTurnstileReady] = useState(false);
  const chatHistory = useRef<Array<{ role: string; content: string }>>([]);

  const stageRef = useRef<BackendStatus>("pending");
  const pollAbortRef = useRef<AbortController | null>(null);
  const pollTimeoutRef = useRef<number | null>(null);
  const creepIntervalRef = useRef<number | null>(null);
  const pollingActiveRef = useRef(false);
  const turnstileWidgetIdRef = useRef<string | null>(null);
  const turnstileTokenRef = useRef<string>("");
  const turnstileContainerRef = useRef<HTMLDivElement | null>(null);

  const update = (field: keyof AgentForm, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const clearTimers = () => {
    pollingActiveRef.current = false;
    if (pollTimeoutRef.current) window.clearTimeout(pollTimeoutRef.current);
    if (creepIntervalRef.current) window.clearInterval(creepIntervalRef.current);
    pollAbortRef.current?.abort();
    pollTimeoutRef.current = null;
    creepIntervalRef.current = null;
    pollAbortRef.current = null;
  };

  const reset = () => {
    clearTimers();
    setForm(EMPTY_FORM);
    setStep("form");
    setRequestId(null);
    setCapabilityToken(null);
    setDisplayProgress(0);
    setStage("pending");
    setEstimated(false);
    setError(null);
    setInput("");
    setMessages([]);
    setQueriesRemaining(null);
    chatHistory.current = [];
    turnstileTokenRef.current = "";
    if (turnstileWidgetIdRef.current && window.turnstile) {
      window.turnstile.reset(turnstileWidgetIdRef.current);
    }
  };

  useEffect(() => clearTimers, []);

  // Load the Cloudflare Turnstile script once and render a managed widget.
  useEffect(() => {
    if (step !== "form") return;
    const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined;
    if (!siteKey) return;

    function renderWidget() {
      if (!turnstileContainerRef.current || !window.turnstile) return;
      if (turnstileWidgetIdRef.current) return;
      turnstileWidgetIdRef.current = window.turnstile.render(turnstileContainerRef.current, {
        sitekey: siteKey,
        appearance: "interaction-only",
        callback: (token: string) => {
          turnstileTokenRef.current = token;
        },
        "expired-callback": () => {
          turnstileTokenRef.current = "";
        },
        "error-callback": () => {
          turnstileTokenRef.current = "";
        },
      });
    }

    if (window.turnstile) {
      setTurnstileReady(true);
      renderWidget();
      return;
    }

    const existing = document.getElementById("cf-turnstile-script");
    if (!existing) {
      const script = document.createElement("script");
      script.id = "cf-turnstile-script";
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
      script.async = true;
      script.defer = true;
      script.onload = () => {
        setTurnstileReady(true);
        renderWidget();
      };
      document.head.appendChild(script);
    } else {
      existing.addEventListener("load", () => {
        setTurnstileReady(true);
        renderWidget();
      });
    }
  }, [step]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);

    const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined;
    if (siteKey && !turnstileTokenRef.current) {
      setError("Please complete the verification challenge and try again.");
      return;
    }

    setStep("training");
    setStage("pending");
    setDisplayProgress(5);
    setEstimated(true);

    try {
      const response = await fetch("/.netlify/functions/setup-agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, turnstileToken: turnstileTokenRef.current }),
        credentials: "include",
      });
      const payload = await response
        .json()
        .catch(async () => ({ message: await response.text().catch(() => "") }));
      if (!response.ok) {
        throw new Error(payload.message || payload.error || "Unable to create the agent.");
      }
      setRequestId(payload.requestId);
      setCapabilityToken(payload.capabilityToken || null);
    } catch (err) {
      if (turnstileWidgetIdRef.current && window.turnstile) {
        window.turnstile.reset(turnstileWidgetIdRef.current);
      }
      turnstileTokenRef.current = "";
      setError(err instanceof Error ? err.message : "Unable to create the agent.");
      setStep("form");
      setDisplayProgress(0);
    }
  };

  // Poll agent-status: immediately, then every 2s, with an in-flight guard
  // (AbortController) so overlapping requests can't race each other, plus a
  // slow "creep" so the bar visibly moves between confirmed backend values.
  useEffect(() => {
    if (step !== "training" || !requestId) return;
    pollingActiveRef.current = true;
    stageRef.current = "pending";

    const poll = async () => {
      if (!pollingActiveRef.current) return;
      pollAbortRef.current?.abort();
      const controller = new AbortController();
      pollAbortRef.current = controller;

      try {
        const url = `/.netlify/functions/agent-status?id=${encodeURIComponent(requestId)}&_=${Date.now()}`;
        const response = await fetch(url, {
          cache: "no-store",
          signal: controller.signal,
          headers: capabilityToken ? { "X-Agent-Token": capabilityToken } : {},
        });
        const payload = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(payload.error || "Unable to check training status.");

        const nextStage = statusToStage(payload.status);
        const nextPercent = clampPercent(payload.progress);

        stageRef.current = nextStage;
        setStage(nextStage);
        setEstimated(false);
        setDisplayProgress((current) => Math.max(current, nextPercent));

        if (nextStage === "ready") {
          setDisplayProgress(100);
          pollingActiveRef.current = false;
          setMessages([
            {
              role: "agent",
              content: `Hi ${form.name}! I'm the customer service agent for ${form.company}. What can I help you with today?`,
              quickReplies: [
                "What services do you offer?",
                "How much does it cost?",
                "Schedule a consultation",
              ],
            },
          ]);
          window.setTimeout(() => setStep("chat"), 500);
          return;
        }

        if (nextStage === "failed") {
          pollingActiveRef.current = false;
          throw new Error(
            payload.error_message || "We couldn't train the agent from this website.",
          );
        }
      } catch (err) {
        if (controller.signal.aborted) return;
        pollingActiveRef.current = false;
        setError(err instanceof Error ? err.message : "Unable to finish training the agent.");
        setStep("form");
        return;
      }

      if (pollingActiveRef.current) {
        pollTimeoutRef.current = window.setTimeout(() => void poll(), 2000);
      }
    };

    void poll();

    // Slow estimated creep within the current stage's ceiling while waiting
    // for the next confirmed value.
    creepIntervalRef.current = window.setInterval(() => {
      setDisplayProgress((current) => {
        const ceiling = STAGE_CEILING[stageRef.current];
        if (current >= ceiling) return current;
        setEstimated(true);
        return Math.min(ceiling, current + 1);
      });
    }, 900);

    return () => {
      pollingActiveRef.current = false;
      if (pollTimeoutRef.current) window.clearTimeout(pollTimeoutRef.current);
      if (creepIntervalRef.current) window.clearInterval(creepIntervalRef.current);
      pollAbortRef.current?.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, requestId, capabilityToken]);

  const sendMessage = async (value = input) => {
    const question = value.trim();
    if (!question || !requestId || sending) return;
    const userMessage: ChatMessage = { role: "user", content: question };
    setMessages((current) => [...current, userMessage]);
    setInput("");
    setSending(true);
    chatHistory.current = [...chatHistory.current, { role: "user", content: question }].slice(-10);

    try {
      const response = await fetch("/.netlify/functions/query-agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_request_id: requestId,
          token: capabilityToken,
          question,
          chat_history: chatHistory.current,
        }),
      });
      const payload = await response.json();
      if (!response.ok)
        throw new Error(
          payload.message ||
            payload.answer ||
            payload.error ||
            "The agent couldn't answer right now.",
        );

      const answer = htmlToText(payload.answer || "");
      chatHistory.current = [...chatHistory.current, { role: "agent", content: answer }].slice(-10);
      setQueriesRemaining(
        typeof payload.queriesRemaining === "number" ? payload.queriesRemaining : null,
      );
      setMessages((current) => [
        ...current,
        { role: "agent", content: answer, quickReplies: payload.quickReplies || [] },
      ]);
    } catch (err) {
      setMessages((current) => [
        ...current,
        {
          role: "agent",
          content: err instanceof Error ? err.message : "Please try again in a moment.",
        },
      ]);
    } finally {
      setSending(false);
    }
  };

  return (
    <PageShell
      eyebrow="AI agent demo"
      headline="Try the Agent Live"
      subheading="Enter your website and RenoMeta will create a customer service agent trained from your website content, so you can see how instant answers and lead capture could work for your business."
      primaryCta={null}
      secondaryCta={{ label: "See the AI Center", to: "/ai-center" }}
    >
      <Section className="!pt-6">
        <div className="mx-auto w-full max-w-3xl rounded-3xl border border-border bg-surface-elevated shadow-elegant p-6 sm:p-10 lg:p-12">
          {step === "form" && (
            <AgentForm
              form={form}
              update={update}
              submit={handleSubmit}
              reset={reset}
              error={error}
              turnstileContainerRef={turnstileContainerRef}
              showTurnstile={Boolean(import.meta.env.VITE_TURNSTILE_SITE_KEY)}
              turnstileReady={turnstileReady}
            />
          )}
          {step === "training" && (
            <Training
              website={form.website}
              progress={displayProgress}
              status={STAGE_LABELS[stage]}
              estimated={estimated}
            />
          )}
          {step === "chat" && (
            <AgentChat
              company={form.company}
              messages={messages}
              input={input}
              setInput={setInput}
              sendMessage={sendMessage}
              sending={sending}
              queriesRemaining={queriesRemaining}
              reset={reset}
            />
          )}
        </div>
      </Section>

      <Section tone="surface">
        <SectionHeader
          eyebrow="What the agent will do"
          title="An agent trained on your own website"
          desc="The agent reads your website content, answers common customer questions, captures lead details, and helps visitors move toward booking."
        />
        <BenefitGrid
          items={[
            "Trains from your website content",
            "Answers common customer questions",
            "Helps capture lead details",
            "Built for renovation and home service businesses",
          ]}
        />
      </Section>
    </PageShell>
  );
}

function AgentForm({
  form,
  update,
  submit,
  reset,
  error,
  turnstileContainerRef,
  showTurnstile,
  turnstileReady,
}: {
  form: AgentForm;
  update: (field: keyof AgentForm, value: string) => void;
  submit: (event: FormEvent) => void;
  reset: () => void;
  error: string | null;
  turnstileContainerRef: RefObject<HTMLDivElement | null>;
  showTurnstile: boolean;
  turnstileReady: boolean;
}) {
  const fields = [
    {
      field: "name" as const,
      type: "text",
      placeholder: "Full Name",
      label: "Your Name",
      icon: User,
      required: true,
      autoComplete: "name",
    },
    {
      field: "email" as const,
      type: "email",
      placeholder: "Email Address",
      label: "Your Email",
      icon: Mail,
      required: true,
      autoComplete: "email",
    },
    {
      field: "company" as const,
      type: "text",
      placeholder: "Your Business",
      label: "Company Name",
      icon: Building,
      required: true,
      autoComplete: "organization",
    },
    {
      field: "phone" as const,
      type: "tel",
      placeholder: "(XXX) XXX-XXXX",
      label: "Company Phone Number",
      icon: Phone,
      required: false,
      autoComplete: "tel",
    },
  ];
  return (
    <>
      <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
        Provide Website Details
      </div>
      <h2 className="mt-3 font-display text-2xl sm:text-3xl font-semibold tracking-[-0.02em] text-foreground">
        Tell us where to build your customer service agent from.
      </h2>
      <form onSubmit={submit} className="mt-8 space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          {fields.map(({ field, icon: Icon, ...props }) => (
            <div className="relative" key={field}>
              <Icon
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
                strokeWidth={1.5}
              />
              <input
                {...props}
                value={form[field]}
                onChange={(event) => update(field, event.target.value)}
                aria-label={props.label}
                className="w-full rounded-xl border border-border bg-background pl-10 pr-3 py-3 text-[14px] text-foreground placeholder:text-muted-foreground/80 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/40"
              />
            </div>
          ))}
        </div>
        <div className="relative">
          <Globe
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
            strokeWidth={1.5}
          />
          <input
            type="url"
            inputMode="url"
            required
            autoComplete="url"
            value={form.website}
            onChange={(event) => update("website", event.target.value)}
            placeholder="http://yourcompany.com"
            aria-label="Company Website"
            className="w-full rounded-xl border border-border bg-background pl-10 pr-3 py-3 text-[14px] text-foreground placeholder:text-muted-foreground/80 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/40"
          />
        </div>
        {showTurnstile && (
          <div ref={turnstileContainerRef} aria-hidden={!turnstileReady} className="min-h-0" />
        )}
        {error && (
          <p role="alert" className="flex gap-2 text-sm text-red-600">
            <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
            {error}
          </p>
        )}
        <div className="pt-4 flex flex-col-reverse sm:flex-row items-stretch sm:items-center gap-3">
          <button type="button" onClick={reset} className="btn-ghost justify-center">
            Cancel
          </button>
          <button type="submit" className="btn-primary justify-center">
            Submit <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </form>
    </>
  );
}

function Training({
  website,
  progress,
  status,
  estimated,
}: {
  website: string;
  progress: number;
  status: string;
  estimated: boolean;
}) {
  const rounded = Math.round(progress);
  return (
    <div className="py-8 text-center">
      <Loader2 className="mx-auto h-9 w-9 animate-spin text-gold" />
      <h2 className="mt-5 font-display text-2xl font-semibold">
        Training your customer service agent
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Reading {website} and building a focused knowledge base.
      </p>
      <div className="mt-8 h-2 overflow-hidden rounded-full bg-surface">
        <div
          className="h-full rounded-full bg-gold transition-all duration-500"
          style={{ width: `${rounded}%` }}
        />
      </div>
      <div className="mt-3 flex justify-between text-xs text-muted-foreground">
        <span>{status}</span>
        <span>
          {rounded}%{estimated && rounded < 100 ? " (estimated)" : ""}
        </span>
      </div>
    </div>
  );
}

function AgentChat({
  company,
  messages,
  input,
  setInput,
  sendMessage,
  sending,
  queriesRemaining,
  reset,
}: {
  company: string;
  messages: ChatMessage[];
  input: string;
  setInput: (value: string) => void;
  sendMessage: (value?: string) => void;
  sending: boolean;
  queriesRemaining: number | null;
  reset: () => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <div className="flex items-center gap-2 font-medium">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            {company} Customer Service
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Online now{queriesRemaining !== null ? ` · ${queriesRemaining} questions left` : ""}
          </p>
        </div>
        <button type="button" className="btn-ghost text-xs" onClick={reset}>
          Start over
        </button>
      </div>
      <div className="h-[420px] overflow-y-auto py-5 space-y-4" aria-live="polite">
        {messages.map((message, index) => (
          <div key={index}>
            <div className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${message.role === "user" ? "bg-foreground text-background rounded-tr-sm" : "bg-surface text-foreground rounded-tl-sm"}`}
              >
                {message.content}
              </div>
            </div>
            {message.role === "agent" && message.quickReplies && (
              <div className="mt-2 flex flex-wrap gap-2">
                {message.quickReplies.map((reply) => (
                  <button
                    type="button"
                    key={reply}
                    onClick={() => void sendMessage(reply)}
                    className="rounded-full border border-border px-3 py-1.5 text-xs hover:border-gold/60 hover:bg-gold/5"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
        {sending && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            Agent is typing...
          </div>
        )}
      </div>
      <form
        className="flex gap-2 border-t border-border pt-4"
        onSubmit={(event) => {
          event.preventDefault();
          void sendMessage();
        }}
      >
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ask about services, pricing, or booking..."
          className="min-w-0 flex-1 rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold/30"
        />
        <button
          type="submit"
          disabled={sending || !input.trim()}
          className="btn-primary px-4"
          aria-label="Send message"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}

function htmlToText(html: string) {
  if (typeof document === "undefined")
    return html
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  const container = document.createElement("div");
  container.innerHTML = html;
  return container.textContent?.replace(/\s+/g, " ").trim() || "";
}

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          appearance?: string;
          callback?: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
        },
      ) => string;
      reset: (widgetId?: string) => void;
    };
  }
}
