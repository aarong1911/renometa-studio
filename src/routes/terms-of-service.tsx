import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site-chrome";
import { Section, Reveal } from "@/components/page-primitives";

export const Route = createFileRoute("/terms-of-service")({
  head: () => ({
    meta: [
      { title: "Terms of Service — RenoMeta" },
      {
        name: "description",
        content:
          "RenoMeta's Terms of Service govern your access to and use of RenoMeta's software, websites, and services.",
      },
      { property: "og:title", content: "Terms of Service — RenoMeta" },
      {
        property: "og:description",
        content: "RenoMeta's Terms of Service.",
      },
      { property: "og:url", content: "/terms-of-service" },
      { name: "twitter:title", content: "Terms of Service — RenoMeta" },
      { name: "twitter:description", content: "RenoMeta's Terms of Service." },
    ],
    links: [{ rel: "canonical", href: "/terms-of-service" }],
  }),
  component: TermsOfServicePage,
});

function TermsOfServicePage() {
  return (
    <PageShell
      eyebrow="Legal"
      headline="Terms of Service"
      subheading="RenoMeta Inc"
      primaryCta={{ label: "Contact Us", to: "/contact" }}
      secondaryCta={null}
    >
      <Section>
        <Reveal>
          <div className="max-w-3xl mx-auto">
            <p className="text-[14px] text-muted-foreground">
              Effective Date: 08/01/2024
            </p>

            <div className="mt-10 space-y-10 text-[15px] leading-relaxed text-foreground/90">
              <section>
                <h2 className="font-display text-xl font-semibold tracking-tight">1. Acceptance of Terms</h2>
                <p className="mt-3">
                  By accessing or using RenoMeta Inc ("RenoMeta," "we," "us," or "our") software, websites, and services (collectively, the "Services"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree, do not use the Services.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold tracking-tight">2. Use of the Services</h2>
                <p className="mt-3">
                  You may use the Services for your internal business purposes in accordance with these Terms and all applicable laws and regulations. You are responsible for all activity that occurs under your account.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold tracking-tight">3. User Accounts and Security</h2>
                <p className="mt-3">
                  To access certain features, you may need to create an account. You are responsible for maintaining the confidentiality of your login credentials and for all activities under your account. You agree to notify us promptly of any unauthorized use.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold tracking-tight">4. Acceptable Use</h2>
                <p className="mt-3">You agree not to misuse the Services. You may not use the Services to:</p>
                <ul className="mt-3 list-disc pl-5 space-y-1.5">
                  <li>Send spam, unsolicited messages, or messages without appropriate consent.</li>
                  <li>Send illegal, fraudulent, or deceptive content.</li>
                  <li>Transmit malware or attempt to gain unauthorized access to systems or data.</li>
                  <li>Harass, abuse, or harm any person or violate any third-party rights.</li>
                  <li>Violate carrier policies, messaging rules, or applicable communications laws.</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold tracking-tight">5. Intellectual Property</h2>
                <p className="mt-3">
                  The Services, including all content, features, and functionality, are owned by RenoMeta or its licensors and are protected by applicable intellectual property laws. You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, or transmit any part of the Services without our prior written consent, except as allowed by these Terms.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold tracking-tight">6. Data Privacy</h2>
                <p className="mt-3">
                  Our collection and use of information is described in our{" "}
                  <a href="/privacy-policy" className="underline hover:text-foreground">Privacy Policy</a>. By using the Services, you consent to the collection, use, and disclosure of information as described in that policy. Your use of the Services does not constitute consent to receive SMS or MMS messages; SMS consent is collected separately as described in our Privacy Policy.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold tracking-tight">7. SMS/MMS Messaging Terms</h2>

                <h3 className="mt-4 font-medium text-foreground">7a. SMS Messages Sent Directly by RenoMeta</h3>
                <p className="mt-3">
                  RenoMeta may send SMS/MMS messages directly to individuals who provide express written consent through an optional, unchecked checkbox on the contact form at{" "}
                  <a href="https://renometa.com" target="_blank" rel="noreferrer" className="underline hover:text-foreground">https://renometa.com</a>. SMS consent is entirely voluntary and is not required to use the website, submit the contact form, receive services, make a purchase, or complete any transaction.
                </p>
                <p className="mt-3">
                  Messages sent directly by RenoMeta are limited to transactional and customer care purposes, including responses to inquiries, appointment confirmations, service updates, and customer support communications. Message frequency does not exceed 5 messages per month. Recipients may opt out at any time by replying STOP and may request assistance by replying HELP. Message and data rates may apply.
                </p>

                <h3 className="mt-4 font-medium text-foreground">7b. SMS Messages Sent Through the RenoMeta Platform</h3>
                <p className="mt-3">
                  The Services may also enable businesses (our customers) to send or receive SMS/MMS messages to communicate with their own customers for customer care and operational purposes (for example, missed call responses, appointment confirmations, reminders, and follow-ups).
                </p>
                <p className="mt-3">
                  Businesses using the RenoMeta platform are responsible for obtaining and maintaining any required consents from their own message recipients and for complying with all applicable laws and carrier requirements. Businesses must not send messages that are unsolicited, promotional without consent, or otherwise non-compliant.
                </p>
                <p className="mt-3">
                  Message frequency varies based on customer interaction. Recipients may opt out at any time by replying STOP and may request assistance by replying HELP. Message and data rates may apply.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold tracking-tight">8. Limitation of Liability</h2>
                <p className="mt-3">
                  To the maximum extent permitted by law, RenoMeta will not be liable for any indirect, incidental, consequential, special, or punitive damages arising out of or related to your use of the Services. In no event will RenoMeta's total liability exceed the amounts paid by you to RenoMeta for the Services in the twelve (12) months preceding the event giving rise to the claim.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold tracking-tight">9. Termination</h2>
                <p className="mt-3">
                  We may suspend or terminate your access to the Services at any time if we believe you have violated these Terms or if necessary to protect the Services, our users, or third parties.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold tracking-tight">10. Changes to Terms or Services</h2>
                <p className="mt-3">
                  We may modify these Terms from time to time by posting updated Terms on our website. Your continued use of the Services after changes become effective constitutes acceptance of the revised Terms. We may also modify, suspend, or discontinue the Services (in whole or in part) at any time.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold tracking-tight">11. Governing Law</h2>
                <p className="mt-3">
                  These Terms are governed by the laws of the State of Florida, United States, without regard to its conflict of laws principles.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold tracking-tight">12. Contact Us</h2>
                <p className="mt-3">
                  If you have questions or concerns regarding these Terms, please contact us at{" "}
                  <a href="mailto:Support@RenoMeta.com" className="underline hover:text-foreground">Support@RenoMeta.com</a>.
                </p>
                <p className="mt-3">Thank you for using RenoMeta.</p>
              </section>
            </div>
          </div>
        </Reveal>
      </Section>
    </PageShell>
  );
}
