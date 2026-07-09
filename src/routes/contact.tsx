import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site-chrome";
import { Section, Reveal } from "@/components/page-primitives";
import { ContactForm } from "@/components/contact-form";
import { Calendar, Clock, Mail, MapPin, MessageSquare } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — RenoMeta" },
      {
        name: "description",
        content:
          "Tell us about your business and where leads, follow-up, or operations are falling through the cracks.",
      },
      { property: "og:title", content: "Contact RenoMeta" },
      { property: "og:description", content: "Let's build your contractor command center." },
      { property: "og:url", content: "/contact" },
      { name: "twitter:title", content: "Contact RenoMeta" },
      { name: "twitter:description", content: "Let's build your contractor command center." },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <PageShell
      eyebrow="Contact"
      headline="Let's Build Your Contractor Command Center"
      subheading="Tell us about your business and where leads, follow-up, or operations are falling through the cracks."
      primaryCta={{ label: "Book a strategy call", to: "/contact" }}
      secondaryCta={null}
    >
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] items-start">
          <Reveal>
            <ContactForm />
          </Reveal>
          <Reveal delay={120}>
            <div className="space-y-5">
              <div className="rounded-2xl border border-border bg-surface-elevated p-6">
                <div className="flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  Prefer a call?
                </div>
                <h2 className="mt-3 font-display text-xl font-semibold tracking-tight">
                  Book a 30-minute strategy call
                </h2>
                <p className="mt-2 text-[14px] text-muted-foreground leading-relaxed">
                  We'll walk through your current lead flow, follow-up process, and where a
                  connected platform would move the needle.
                </p>
                <a
                  href="https://cal.com/renometa"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex btn-primary text-[13.5px]"
                >
                  Pick a time
                </a>
              </div>

              <div className="rounded-2xl border border-border bg-surface-elevated p-6 space-y-4">
                <div className="text-[12px] uppercase tracking-[0.18em] text-muted-foreground">
                  Contact details
                </div>
                <ul className="space-y-3 text-[14px]">
                  <li className="flex items-start gap-3">
                    <Mail className="h-4 w-4 text-gold mt-0.5" />
                    <a href="mailto:support@renometa.com" className="hover:text-foreground">
                      support@renometa.com
                    </a>
                  </li>
                  <li className="flex items-start gap-3">
                    <MessageSquare className="h-4 w-4 text-gold mt-0.5" />
                    <span>Reply time: within one business day</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock className="h-4 w-4 text-gold mt-0.5" />
                    <span>Mon–Fri · 8 AM – 6 PM EST</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 text-gold mt-0.5" />
                    <span>Serving renovation contractors across North America</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-border bg-surface-elevated p-6">
                <div className="text-[12px] uppercase tracking-[0.18em] text-muted-foreground">
                  What happens next
                </div>
                <ol className="mt-4 space-y-3.5 text-[14px]">
                  {[
                    "We review your message within one business day.",
                    "A short discovery call to understand your workflow and gaps.",
                    "A tailored walkthrough of the RenoMeta Connect setup for your business.",
                    "A clear next step — no pressure, no generic pitch.",
                  ].map((s, i) => (
                    <li key={s} className="flex items-start gap-3">
                      <span className="mt-0.5 h-5 w-5 rounded-full border border-border bg-surface grid place-items-center text-[11px] font-medium shrink-0">
                        {i + 1}
                      </span>
                      <span className="leading-relaxed">{s}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>
    </PageShell>
  );
}
