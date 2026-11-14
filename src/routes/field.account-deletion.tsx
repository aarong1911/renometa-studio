import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Copy, Info, Mail, ShieldCheck } from "lucide-react";
import { PageShell } from "@/components/site-chrome";
import { Section } from "@/components/page-primitives";

// Public page for Google Play's account-deletion URL requirement (app: com.renometa.field).
// Deletion requests go to support@renometa.com and are verified and processed manually by RenoMeta staff.
// This page must never delete anything itself and must never call Supabase.

const SUPPORT_EMAIL = "support@renometa.com";
const PAGE_URL = "https://renometa.com/field/account-deletion";
const REQUEST_SUBJECT = "RenoMeta Field — Account Deletion Request";
const REQUEST_BODY = [
  "Please delete my RenoMeta Field account.",
  "",
  "Email address I use to sign in to RenoMeta Field:",
  "Full name:",
  "Organization(s) I work with in RenoMeta Field:",
  "",
  "I understand that RenoMeta will verify this request before deleting anything, and that records owned by my organization may be retained as described at " +
    PAGE_URL,
].join("\n");
const MAILTO = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(REQUEST_SUBJECT)}&body=${encodeURIComponent(REQUEST_BODY)}`;

const TITLE = "RenoMeta Field — Account & Data Deletion | RenoMeta";
const DESCRIPTION =
  "How to request deletion of your RenoMeta Field account and associated personal information, what is deleted, and what organization records may be retained.";

export const Route = createFileRoute("/field/account-deletion")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: PAGE_URL },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: PAGE_URL }],
  }),
  component: FieldAccountDeletionPage,
});

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background";
const textLink = `underline hover:text-foreground rounded-sm ${focusRing}`;

const STEPS = [
  {
    title: "Email us from your sign-in address",
    body: (
      <>
        Send an email to{" "}
        <a href={MAILTO} className={textLink}>
          {SUPPORT_EMAIL}
        </a>{" "}
        from the email address you use to sign in to RenoMeta Field, with the subject{" "}
        <span className="font-medium text-foreground">"{REQUEST_SUBJECT}"</span>. You do not need to
        sign in or install the app to make a request.
      </>
    ),
  },
  {
    title: "Tell us which account",
    body: "Include your full name and the organization or organizations you work with in RenoMeta Field. Do not include sign-in codes or other security information. We will never ask for them.",
  },
  {
    title: "We verify the request",
    body: "We confirm that the request comes from the account holder before deleting anything, for example by replying to the email address on the account and asking you to confirm. If you no longer have access to that email address, tell us and we will explain how else we can verify your identity. We may decline a request we cannot verify.",
  },
  {
    title: "We process the deletion and confirm",
    body: "Once verified, your request is reviewed and approved by authorized RenoMeta personnel. We then delete your account and associated personal information as described below, and email you to confirm. If any information is retained or de-identified rather than deleted, we tell you what and why. If you own an organization in RenoMeta Connect, we contact you about the organization's workspace first.",
  },
];

/** Copies text with the Clipboard API, falling back to the older copy command. Resolves false when neither works. */
async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Fall through to the older method (for example, when clipboard access is denied).
  }
  try {
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    const copied = document.execCommand("copy");
    document.body.removeChild(area);
    return copied;
  } catch {
    return false;
  }
}

// One size for both request actions: same fixed height, padding, icon gap and text alignment, full width on phones.
const ACTION_BUTTON = `h-12 px-6 py-0 w-full sm:w-auto whitespace-nowrap leading-none ${focusRing}`;

/**
 * The two ways to make a request. "Compose deletion request" hands a pre-filled email to the device's email app (it needs
 * one); "Copy email address" is the fallback that always works. Neither sends anything, so no message here says a request
 * was submitted. The copy status sits below the buttons so it never shifts them.
 */
function RequestActions() {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  const onCopy = async () => {
    const copied = await copyText(SUPPORT_EMAIL);
    setCopyState(copied ? "copied" : "failed");
    clearTimeout(timer.current);
    if (copied) timer.current = setTimeout(() => setCopyState("idle"), 5000);
  };

  return (
    <div className="mt-7">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <a href={MAILTO} className={`btn-primary ${ACTION_BUTTON}`}>
          <Mail className="h-4 w-4 shrink-0" aria-hidden />
          Compose deletion request
        </a>
        <button
          type="button"
          onClick={() => void onCopy()}
          className={`btn-ghost ${ACTION_BUTTON}`}
        >
          {copyState === "copied" ? (
            <Check className="h-4 w-4 shrink-0" aria-hidden />
          ) : (
            <Copy className="h-4 w-4 shrink-0" aria-hidden />
          )}
          Copy email address
        </button>
      </div>
      <p role="status" aria-live="polite" className="mt-2 min-h-5 text-[13px]">
        {copyState === "copied" ? (
          <span className="text-foreground">
            Email address copied. Paste it into a new email to {SUPPORT_EMAIL}.
          </span>
        ) : copyState === "failed" ? (
          <span className="text-destructive">
            Couldn&apos;t copy automatically. Please copy {SUPPORT_EMAIL} by hand.
          </span>
        ) : null}
      </p>
      <p className="mt-1 text-[13px] text-muted-foreground leading-relaxed">
        <span className="font-medium text-foreground">Compose deletion request</span> opens a
        pre-filled email in your email app. It only works if this device has an email app, or an
        email website set up to handle email links in your browser. If nothing opens, use{" "}
        <span className="font-medium text-foreground">Copy email address</span> and send an email to{" "}
        <span className="font-medium text-foreground break-words">{SUPPORT_EMAIL}</span> from any
        email service, such as Gmail or Outlook on the web, with the subject{" "}
        <span className="font-medium text-foreground">"{REQUEST_SUBJECT}"</span>.
      </p>
    </div>
  );
}

function FieldAccountDeletionPage() {
  return (
    <PageShell
      eyebrow="Legal · RenoMeta Field"
      headline="RenoMeta Field — Account & Data Deletion"
      subheading="How to request deletion of your RenoMeta Field account and the personal information associated with it."
      primaryCta={null}
      secondaryCta={null}
    >
      <Section>
        <div className="max-w-3xl mx-auto space-y-12 text-[15px] leading-relaxed text-foreground/90">
          {/* Summary and request action */}
          <div className="card-elegant p-5 sm:p-7">
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-[14px]">
              <div>
                <dt className="text-[12px] uppercase tracking-[0.16em] text-muted-foreground">
                  App
                </dt>
                <dd className="mt-1 font-medium text-foreground">RenoMeta Field (Android)</dd>
              </div>
              <div>
                <dt className="text-[12px] uppercase tracking-[0.16em] text-muted-foreground">
                  Developer
                </dt>
                <dd className="mt-1 font-medium text-foreground">RenoMeta Inc.</dd>
              </div>
              <div>
                <dt className="text-[12px] uppercase tracking-[0.16em] text-muted-foreground">
                  Request by email
                </dt>
                <dd className="mt-1 font-medium text-foreground break-words">{SUPPORT_EMAIL}</dd>
              </div>
              <div>
                <dt className="text-[12px] uppercase tracking-[0.16em] text-muted-foreground">
                  Email subject
                </dt>
                <dd className="mt-1 font-medium text-foreground">{REQUEST_SUBJECT}</dd>
              </div>
            </dl>
            <RequestActions />
            <p className="mt-5 flex items-start gap-2 text-[13.5px] text-muted-foreground">
              <Info className="h-4 w-4 mt-0.5 shrink-0 text-gold-strong" aria-hidden />
              <span>
                Sending a request does not delete anything immediately. We verify every request
                first, and records owned by your organization are handled as described below.
              </span>
            </p>
          </div>

          <section aria-labelledby="how-to-request">
            <h2
              id="how-to-request"
              className="font-display text-xl font-semibold tracking-tight text-foreground"
            >
              How to request deletion
            </h2>
            <ol className="mt-5 card-elegant divide-y divide-border">
              {STEPS.map((s, i) => (
                <li key={s.title} className="flex items-start gap-4 p-5 sm:p-6">
                  <span className="h-8 w-8 shrink-0 rounded-full border border-border bg-surface grid place-items-center text-[13px] font-semibold text-gold-strong">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-[16.5px] font-semibold tracking-tight text-foreground">
                      {s.title}
                    </h3>
                    <p className="mt-1 text-[14px] text-muted-foreground leading-relaxed">
                      {s.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="what-is-deleted">
            <h2
              id="what-is-deleted"
              className="font-display text-xl font-semibold tracking-tight text-foreground"
            >
              What is deleted
            </h2>
            <p className="mt-3">
              RenoMeta Field and RenoMeta Connect use the same account. When we delete your account,
              we delete:
            </p>
            <ul className="mt-3 list-disc pl-5 space-y-1.5">
              <li>
                Your sign-in account, including your sign-in email address and active sessions.
              </li>
              <li>Your user profile, including your name and contact details.</li>
              <li>Your organization memberships and roles.</li>
            </ul>
            <p className="mt-3">
              Your access to RenoMeta Field, RenoMeta Connect, and every organization workspace
              connected to that account then ends. Where information about you cannot be removed
              without affecting an organization's records, we de-identify it instead so that it is
              no longer associated with you, and we tell you when we do so.
            </p>
          </section>

          <section aria-labelledby="what-may-be-retained">
            <h2
              id="what-may-be-retained"
              className="font-display text-xl font-semibold tracking-tight text-foreground"
            >
              What may be retained, and why
            </h2>
            <p className="mt-3">
              <span className="font-medium text-foreground">Organization business records.</span>{" "}
              Tasks, projects, task activity history, and other records you created or updated for
              an organization belong to that organization. The organization may keep them for its
              operational, contractual, or legal needs after your account is deleted. Retained
              records may still reference an internal identifier for the deleted account, or
              information your organization entered (for example, a task description that mentions
              you), but they are no longer linked to an active account. For questions about
              information your organization entered, contact your organization; we will help where
              we can.
            </p>
            <p className="mt-3">
              <span className="font-medium text-foreground">Legal and security needs.</span> We may
              keep limited information where the law requires it, or where it is needed for
              security, fraud prevention, or resolving disputes, including a record of your deletion
              request.
            </p>
            <p className="mt-3">
              <span className="font-medium text-foreground">Backups.</span> Deleted information may
              remain in backup copies until those backups expire or are deleted.
            </p>
          </section>

          <section aria-labelledby="removal-vs-deletion">
            <h2
              id="removal-vs-deletion"
              className="font-display text-xl font-semibold tracking-tight text-foreground"
            >
              Removal from an organization is not account deletion
            </h2>
            <p className="mt-3">
              An organization can remove you from its workspace in RenoMeta Connect. That ends your
              access to that organization's records in both apps, but it does not by itself delete
              your account if you belong to other organizations. To delete your account, follow the
              steps above.
            </p>
            <p className="mt-3">
              Signing out of RenoMeta Field or uninstalling the app removes the sign-in session
              stored on your device. It does not delete your account.
            </p>
          </section>

          <section aria-labelledby="timing">
            <h2
              id="timing"
              className="font-display text-xl font-semibold tracking-tight text-foreground"
            >
              Timing
            </h2>
            <p className="mt-3">
              We review requests promptly and complete verified requests within a reasonable time,
              and within any period required by applicable law. Verification can take longer if we
              need more information from you.
            </p>
          </section>

          <div className="rounded-xl border border-border bg-surface-elevated p-5 sm:p-6">
            <div className="flex items-center gap-2 text-[14px] font-semibold text-foreground">
              <ShieldCheck className="h-4 w-4 text-gold-strong" aria-hidden />
              More about your privacy
            </div>
            <p className="mt-2 text-[14px] text-muted-foreground leading-relaxed">
              Section 4B of our Privacy Policy describes the information RenoMeta Field processes
              and how deletion works. Questions? Email{" "}
              <a href={`mailto:${SUPPORT_EMAIL}`} className={textLink}>
                {SUPPORT_EMAIL}
              </a>
              .
            </p>
            <Link
              to="/privacy-policy"
              hash="renometa-field"
              className={`mt-3 inline-flex items-center gap-1.5 rounded-sm text-[14px] font-medium text-foreground hover:text-gold-strong transition-colors ${focusRing}`}
            >
              Read the Privacy Policy
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          </div>
        </div>
      </Section>
    </PageShell>
  );
}
