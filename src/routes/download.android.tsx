import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Download, Info, Smartphone } from "lucide-react";
import { SiteNav, SiteFooter } from "@/components/site-chrome";
import { Section } from "@/components/page-primitives";

// Served as a static file from public/downloads (headers set in netlify.toml).
const APK_URL = "/downloads/RenoMeta-Connect-Android-test.apk";

// Beta distribution page: intentionally noindex, not in the sitemap, and not
// linked from the main navigation.
export const Route = createFileRoute("/download/android")({
  head: () => ({
    meta: [
      { title: "RenoMeta Connect for Android | RenoMeta" },
      {
        name: "description",
        content:
          "Download the RenoMeta Connect Android beta for Founding Contractor Program members.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AndroidDownloadPage,
});

const STEPS = [
  {
    title: "Download the app",
    desc: "Tap Download Android App on your Android phone. The file is about 33 MB.",
  },
  {
    title: "Open the file",
    desc: "When the download finishes, open RenoMeta-Connect-Android-test.apk from your notifications or Downloads folder.",
  },
  {
    title: "Approve installation if prompted",
    desc: "Android may ask you to allow installs from your browser or file manager. Approve it for this install, then tap Install.",
  },
  {
    title: "Sign in",
    desc: "Open RenoMeta Connect and sign in with your existing RenoMeta Connect account.",
  },
];

function AndroidDownloadPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main>
        <section className="relative pt-32 pb-16 sm:pb-20 overflow-hidden bg-hero-radial">
          <div className="absolute inset-0 bg-grid-fade opacity-70 pointer-events-none" />
          <div className="relative mx-auto max-w-7xl px-6">
            <div className="max-w-3xl pt-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold-soft/40 px-3.5 py-1.5 text-[12px] sm:text-[13px] font-medium text-foreground">
                <Smartphone className="h-3.5 w-3.5 text-gold-strong" aria-hidden />
                Founding Contractor Beta
              </div>
              <h1 className="mt-6 font-display text-[34px] sm:text-5xl lg:text-[60px] leading-[1.06] tracking-[-0.03em] font-semibold">
                RenoMeta Connect for Android
              </h1>
              <p className="mt-6 text-pretty text-[16.5px] sm:text-[17.5px] text-muted-foreground max-w-xl leading-relaxed">
                Manage leads, conversations, and jobs from your phone. Install the beta and sign in
                with your existing RenoMeta Connect account.
              </p>
              <div className="mt-9 flex flex-col sm:flex-row sm:items-center gap-3">
                <a
                  href={APK_URL}
                  download="RenoMeta-Connect-Android-test.apk"
                  type="application/vnd.android.package-archive"
                  className="btn-primary w-full sm:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <Download className="h-4 w-4" aria-hidden />
                  Download Android App
                </a>
                <span className="text-[13px] text-muted-foreground">APK · about 33 MB</span>
              </div>
            </div>
          </div>
        </section>

        <Section tone="bordered">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-14">
            <div>
              <div className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-muted-foreground">
                <span className="h-px w-6 bg-gold" />
                How to install
              </div>
              <ol className="mt-6 card-elegant divide-y divide-border">
                {STEPS.map((s, i) => (
                  <li key={s.title} className="flex items-start gap-4 p-5 sm:p-6">
                    <span className="h-8 w-8 shrink-0 rounded-full border border-border bg-surface grid place-items-center text-[13px] font-semibold text-gold-strong">
                      {i + 1}
                    </span>
                    <div>
                      <h2 className="font-display text-[16.5px] font-semibold tracking-tight">
                        {s.title}
                      </h2>
                      <p className="mt-1 text-[14px] text-muted-foreground leading-relaxed">
                        {s.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="space-y-4">
              <div className="rounded-xl border border-border bg-surface-elevated p-5 sm:p-6">
                <div className="flex items-center gap-2 text-[14px] font-semibold">
                  <Info className="h-4 w-4 text-gold-strong" aria-hidden />
                  About this beta
                </div>
                <p className="mt-2 text-[14px] text-muted-foreground leading-relaxed">
                  This is an Android beta distributed directly by RenoMeta, not through the Google
                  Play Store. Features may change as we gather feedback from Founding Contractors.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-surface-elevated p-5 sm:p-6">
                <div className="text-[14px] font-semibold">Prefer your browser?</div>
                <p className="mt-2 text-[14px] text-muted-foreground leading-relaxed">
                  RenoMeta Connect works in any modern browser on desktop or mobile.
                </p>
                <a
                  href="https://connect.renometa.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 rounded-sm text-[14px] font-medium text-foreground hover:text-gold-strong transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  Open connect.renometa.com
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </div>
              <div className="rounded-xl border border-border bg-surface-elevated p-5 sm:p-6">
                <div className="text-[14px] font-semibold">Using an iPhone?</div>
                <p className="mt-2 text-[14px] text-muted-foreground leading-relaxed">
                  The iPhone version is coming later. In the meantime, use RenoMeta Connect in your
                  browser.
                </p>
              </div>
            </div>
          </div>
        </Section>
      </main>
      <SiteFooter />
    </div>
  );
}
