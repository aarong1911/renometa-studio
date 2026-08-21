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
import { useEffect, useRef, useState, type FormEvent } from "react";
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

const EMPTY_FORM: AgentForm = { name: "", email: "", company: "", phone: "", website: "http://" };

function TryAgentPage() {
  const [form, setForm] = useState<AgentForm>(EMPTY_FORM);
  const [step, setStep] = useState<Step>("form");
  const [requestId, setRequestId] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Initializing crawler...");
  const [error, setError] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [queriesRemaining, setQueriesRemaining] = useState<number | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const chatHistory = useRef<Array<{ role: string; content: string }>>([]);

  const update = (field: keyof AgentForm, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const reset = () => {
    setForm(EMPTY_FORM);
    setStep("form");
    setRequestId(null);
    setProgress(0);
    setStatus("Initializing crawler...");
    setError(null);
    setInput("");
    setMessages([]);
    setQueriesRemaining(null);
    chatHistory.current = [];
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setStep("training");
    const id = crypto.randomUUID();

    try {
      const response = await fetch("/.netlify/functions/setup-agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, userRequestId: id }),
      });
      const payload = await response
        .json()
        .catch(async () => ({ message: await response.text().catch(() => "") }));
      if (!response.ok)
        throw new Error(payload.message || payload.error || "Unable to create the agent.");
      setRequestId(payload.requestId || id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to create the agent.");
      setStep("form");
    }
  };

  useEffect(() => {
    if (step !== "training" || !requestId) return;

    const messagesByProgress = [
      "Initializing crawler...",
      "Analyzing website structure...",
      "Extracting service information...",
      "Building the knowledge base...",
      "Finalizing agent capabilities...",
    ];

    const poll = async () => {
      try {
        const response = await fetch(
          `/.netlify/functions/agent-status?id=${encodeURIComponent(requestId)}`,
        );
        const payload = await response.json();
        if (!response.ok) throw new Error(payload.error || "Unable to check training status.");

        const nextProgress = Math.round((payload.progress || 0) * 100);
        setProgress((current) => Math.max(current, nextProgress));
        setStatus(
          messagesByProgress[
            Math.min(Math.floor(nextProgress / 20), messagesByProgress.length - 1)
          ],
        );

        if (payload.status === "ready") {
          setProgress(100);
          setStatus("Agent training complete!");
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
        } else if (
          ["failed", "no_content", "crawling_initiation_failed"].includes(payload.status)
        ) {
          throw new Error(
            payload.error_message || "We couldn't train the agent from this website.",
          );
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unable to finish training the agent.");
        setStep("form");
      }
    };

    void poll();
    const interval = window.setInterval(() => void poll(), 4000);
    return () => window.clearInterval(interval);
  }, [step, requestId, form.company, form.name]);

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
          question,
          chat_history: chatHistory.current,
        }),
      });
      const payload = await response.json();
      if (!response.ok)
        throw new Error(payload.answer || payload.error || "The agent couldn't answer right now.");

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
            />
          )}
          {step === "training" && (
            <Training website={form.website} progress={progress} status={status} />
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
}: {
  form: AgentForm;
  update: (field: keyof AgentForm, value: string) => void;
  submit: (event: FormEvent) => void;
  reset: () => void;
  error: string | null;
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
}: {
  website: string;
  progress: number;
  status: string;
}) {
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
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="mt-3 flex justify-between text-xs text-muted-foreground">
        <span>{status}</span>
        <span>{progress}%</span>
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
