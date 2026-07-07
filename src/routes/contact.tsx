import { createFileRoute } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/site-chrome";
import { ContactForm } from "@/components/contact-form";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — RenoMeta" },
      { name: "description", content: "Tell us about your business and where leads, follow-up, or operations are falling through the cracks." },
      { property: "og:title", content: "Contact — RenoMeta" },
      { property: "og:description", content: "Let's build your contractor command center." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <SiteNav />
      <main className="flex-1">
        <section className="relative pt-32 pb-16 overflow-hidden bg-hero-radial">
          <div className="absolute inset-0 bg-grid-fade opacity-70 pointer-events-none" />
          <div className="relative mx-auto max-w-7xl px-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-muted-foreground">
                <span className="h-px w-6 bg-gold" />
                Contact
              </div>
              <h1 className="mt-5 font-display text-balance text-[40px] sm:text-5xl lg:text-[60px] leading-[1.04] tracking-[-0.03em] font-semibold text-foreground">
                Let's Build Your Contractor Command Center
              </h1>
              <p className="mt-6 text-pretty text-[16.5px] sm:text-[17.5px] text-muted-foreground max-w-2xl leading-relaxed">
                Tell us about your business and where leads, follow-up, or operations are falling through the cracks.
              </p>
            </div>
          </div>
        </section>
        <section className="pb-28">
          <div className="mx-auto max-w-3xl px-6">
            <ContactForm />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
