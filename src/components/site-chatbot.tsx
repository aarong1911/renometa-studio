import { CalendarDays, MessageSquare, Send, X } from "lucide-react";
import { useState, type FormEvent } from "react";

type Message = { role: "user" | "agent"; text: string };

const ANSWERS = [
  {
    words: ["price", "pricing", "cost", "plan"],
    answer:
      "RenoMeta Connect plans scale by users, contacts, messaging, and AI usage. I can help you choose a plan, or you can view the full pricing page.",
  },
  {
    words: ["service", "offer", "solution"],
    answer:
      "RenoMeta provides RenoMeta Connect, AI website systems, marketing and follow-up automation, and custom AI solutions for renovation contractors and home service businesses.",
  },
  {
    words: ["crm", "connect", "pipeline", "lead"],
    answer:
      "RenoMeta Connect brings leads, conversations, estimates, scheduling, marketing, and follow-up into one command center built for contractor workflows.",
  },
  {
    words: ["agent", "ai", "chat", "voice"],
    answer:
      "RenoMeta's AI agents can answer leads, qualify opportunities, help book appointments, and keep follow-up moving across the customer journey.",
  },
];

export function SiteChatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [booking, setBooking] = useState(false);
  const [booked, setBooked] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    { role: "agent", text: "Hi! How can I help you learn about RenoMeta today?" },
  ]);

  const reply = (question: string) => {
    const lower = question.toLowerCase();
    if (
      ["book", "schedule", "appointment", "consultation", "demo"].some((word) =>
        lower.includes(word),
      )
    ) {
      setBooking(true);
      return "Absolutely. Share your details below and our team will contact you to confirm a time.";
    }
    return (
      ANSWERS.find(({ words }) => words.some((word) => lower.includes(word)))?.answer ??
      "I can help with RenoMeta Connect, AI agents, websites, automation, pricing, or booking a strategy call. What would you like to explore?"
    );
  };

  const send = (event: FormEvent) => {
    event.preventDefault();
    const question = input.trim();
    if (!question) return;
    setMessages((current) => [
      ...current,
      { role: "user", text: question },
      { role: "agent", text: reply(question) },
    ]);
    setInput("");
  };

  const submitBooking = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    const data = new FormData(event.currentTarget);
    try {
      const response = await fetch("/.netlify/functions/book-appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          notes: data.get("notes"),
          source: "website-chatbot",
        }),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload.error || "Unable to send your request.");
      setBooked(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to send your request.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? "Close chat" : "Open chat"}
        className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-foreground text-background shadow-elegant transition-transform hover:scale-105"
      >
        {open ? <X className="h-5 w-5" /> : <MessageSquare className="h-5 w-5" />}
      </button>
      {open && (
        <aside
          aria-label="RenoMeta chat"
          className="fixed bottom-24 right-4 z-50 flex max-h-[min(620px,calc(100vh-7rem))] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-elegant"
        >
          <header className="flex items-center justify-between border-b border-border px-5 py-4">
            <div>
              <p className="text-sm font-semibold">RenoMeta Assistant</p>
              <p className="mt-0.5 text-xs text-muted-foreground">Online now</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-lg p-2 hover:bg-surface"
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </button>
          </header>
          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <p
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${message.role === "user" ? "bg-foreground text-background rounded-tr-sm" : "bg-surface rounded-tl-sm"}`}
                >
                  {message.text}
                </p>
              </div>
            ))}
            {!booking && (
              <div className="flex flex-wrap gap-2 pt-1">
                {["RenoMeta Connect", "Pricing", "Book a strategy call"].map((item) => (
                  <button
                    type="button"
                    key={item}
                    onClick={() => {
                      setMessages((current) => [
                        ...current,
                        { role: "user", text: item },
                        { role: "agent", text: reply(item) },
                      ]);
                    }}
                    className="rounded-full border border-border px-3 py-1.5 text-xs hover:border-gold/60"
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
            {booking && !booked && (
              <form
                onSubmit={submitBooking}
                className="mt-3 space-y-2 rounded-xl border border-border bg-surface p-3"
              >
                <div className="mb-2 flex items-center gap-2 text-sm font-medium">
                  <CalendarDays className="h-4 w-4 text-gold" />
                  Request a strategy call
                </div>
                <input
                  name="name"
                  required
                  placeholder="Name"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
                />
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="Email"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
                />
                <input
                  name="phone"
                  type="tel"
                  placeholder="Phone"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
                />
                <textarea
                  name="notes"
                  rows={2}
                  placeholder="What would you like to discuss?"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
                />
                <button disabled={submitting} className="btn-primary w-full justify-center text-xs">
                  {submitting ? "Sending..." : "Request call"}
                </button>
                {error && <p className="text-xs text-red-600">{error}</p>}
              </form>
            )}
            {booked && (
              <p className="rounded-xl bg-surface p-3 text-sm">
                Thanks! Your request was sent. Our team will contact you shortly.
              </p>
            )}
          </div>
          {!booking && (
            <form onSubmit={send} className="flex gap-2 border-t border-border p-3">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Type your question..."
                className="min-w-0 flex-1 rounded-lg border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/30"
              />
              <button type="submit" className="btn-primary px-3" aria-label="Send">
                <Send className="h-4 w-4" />
              </button>
            </form>
          )}
        </aside>
      )}
    </>
  );
}
