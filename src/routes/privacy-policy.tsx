import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site-chrome";
import { Section, Reveal } from "@/components/page-primitives";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — RenoMeta" },
      {
        name: "description",
        content:
          "RenoMeta's Privacy Policy explains how we collect, use, disclose, and safeguard information when you use our software, websites, and services.",
      },
      { property: "og:title", content: "Privacy Policy — RenoMeta" },
      {
        property: "og:description",
        content:
          "RenoMeta's Privacy Policy explains how we collect, use, disclose, and safeguard information when you use our services.",
      },
      { property: "og:url", content: "/privacy-policy" },
      { name: "twitter:title", content: "Privacy Policy — RenoMeta" },
      { name: "twitter:description", content: "RenoMeta's Privacy Policy." },
    ],
    links: [{ rel: "canonical", href: "/privacy-policy" }],
  }),
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
  return (
    <PageShell
      eyebrow="Legal"
      headline="Privacy Policy"
      subheading="RenoMeta Inc"
      primaryCta={{ label: "Contact Us", to: "/contact" }}
      secondaryCta={null}
    >
      <Section>
        <Reveal>
          <div className="max-w-3xl mx-auto prose prose-neutral">
            <p className="text-[14px] text-muted-foreground">
              Effective Date: 08/01/2024
            </p>

            <div className="mt-10 space-y-10 text-[15px] leading-relaxed text-foreground/90">
              <section>
                <h2 className="font-display text-xl font-semibold tracking-tight">1. Introduction</h2>
                <p className="mt-3">
                  Welcome to RenoMeta Inc ("RenoMeta," "we," "us," or "our"). This Privacy Policy explains how we collect, use, disclose, and safeguard information when you use our software, websites, and services (collectively, the "Services").
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold tracking-tight">2. Information We Collect</h2>
                <p className="mt-3">
                  We collect information you provide directly to us, such as your name, email address, phone number, company name, and other information you choose to share when using our Services.
                </p>
                <p className="mt-3">
                  We may also collect information automatically when you use the Services, such as device information, log data, usage information, and analytics.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold tracking-tight">3. How We Use Your Information</h2>
                <p className="mt-3">We use the information we collect to:</p>
                <ul className="mt-3 list-disc pl-5 space-y-1.5">
                  <li>Provide, operate, and maintain our Services.</li>
                  <li>Send important notices, such as updates, security alerts, and support messages.</li>
                  <li>Improve and customize the Services based on feedback and usage patterns.</li>
                  <li>Analyze trends and user behavior to enhance our products and services.</li>
                  <li>Detect, prevent, and address fraud, abuse, security incidents, and technical issues.</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold tracking-tight">4. Information Sharing and Disclosure</h2>
                <p className="mt-3">
                  We do not sell, trade, or rent your personal information. We may share information with trusted third-party service providers who help us deliver the Services (for example, hosting, analytics, communications, and customer support).
                </p>
                <p className="mt-3">
                  We may also disclose information to comply with legal obligations, enforce our policies, or protect the rights, property, and safety of RenoMeta, our users, or others.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold tracking-tight">5. Security</h2>
                <p className="mt-3">
                  We use reasonable administrative, technical, and physical safeguards designed to protect information against unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold tracking-tight">6. Your Choices</h2>
                <p className="mt-3">
                  You may request access, correction, updating, or deletion of your personal information by contacting us at{" "}
                  <a href="mailto:Support@RenoMeta.com" className="underline hover:text-foreground">Support@RenoMeta.com</a>. We will respond within a reasonable timeframe, subject to applicable law.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold tracking-tight">7. SMS/MMS Communications and Consent</h2>

                <h3 className="mt-4 font-medium text-foreground">7a. SMS Messages Sent Directly by RenoMeta</h3>
                <p className="mt-3">
                  RenoMeta may send SMS/MMS messages directly to individuals who provide express written consent through the contact form on our website at{" "}
                  <a href="https://renometa.com" target="_blank" rel="noreferrer" className="underline hover:text-foreground">https://renometa.com</a>. Consent is collected via a separate, optional, unchecked checkbox on the contact form. Providing a phone number alone does not constitute consent to receive SMS messages. Users who do not check the SMS opt-in checkbox will not receive any text messages from RenoMeta.
                </p>
                <p className="mt-3">
                  The opt-in checkbox states: "(Optional) By checking this box, you agree to receive SMS messages from RenoMeta. Message frequency varies (up to 5 messages per month). Message and data rates may apply. Reply STOP to opt out or HELP for help. Consent is not a condition of purchase, receiving services, or completing any transaction. View our Privacy Policy and Terms of Service."
                </p>
                <p className="mt-3">
                  SMS consent is entirely voluntary. You are not required to consent to SMS messaging in order to use our Services, submit a contact form, receive customer support, make a purchase, or complete any transaction with RenoMeta. The contact form can be submitted without providing a phone number and without opting in to SMS.
                </p>
                <p className="mt-3">
                  Messages sent directly by RenoMeta include responses to inquiries, account notifications, appointment confirmations, service updates, and customer support communications. These messages are not marketing or promotional in nature. Message frequency does not exceed 5 messages per month.
                </p>
                <p className="mt-3">
                  Recipients may opt out at any time by replying STOP to any message. For help, reply HELP or contact us at{" "}
                  <a href="mailto:Support@RenoMeta.com" className="underline hover:text-foreground">Support@RenoMeta.com</a>. Message and data rates may apply.
                </p>

                <h3 className="mt-4 font-medium text-foreground">7b. SMS Messages Sent Through the RenoMeta Platform</h3>
                <p className="mt-3">
                  RenoMeta also provides a software platform that enables businesses (our customers) to communicate with their own end users via SMS/MMS for customer care and operational purposes, such as missed call responses, appointment confirmations, reminders, and follow-ups.
                </p>
                <p className="mt-3">
                  Businesses using the RenoMeta platform are solely responsible for obtaining and maintaining appropriate consent from their own message recipients and for complying with all applicable laws, regulations, and carrier requirements.
                </p>

                <h3 className="mt-4 font-medium text-foreground">7c. General SMS Policies</h3>
                <p className="mt-3">
                  RenoMeta will not share, sell, or distribute your mobile phone number or SMS consent data to any third parties or affiliates for their own marketing or promotional purposes. RenoMeta does not sell, share, or distribute opt-in information to any third parties for their own marketing or promotional purposes.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold tracking-tight">8. Changes to This Privacy Policy</h2>
                <p className="mt-3">
                  We may update this Privacy Policy from time to time. Changes are effective when posted on our website. We encourage you to review this policy periodically.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold tracking-tight">9. Contact Us</h2>
                <p className="mt-3">
                  If you have questions, concerns, or requests regarding this Privacy Policy or our practices, contact us at{" "}
                  <a href="mailto:Support@RenoMeta.com" className="underline hover:text-foreground">Support@RenoMeta.com</a>.
                </p>
                <p className="mt-3">
                  By using our Services, you acknowledge and agree to the data collection and usage practices described in this Privacy Policy. This acknowledgment does not constitute consent to receive SMS or MMS messages. SMS consent is collected separately and independently as described in Section 7a above.
                </p>
              </section>
            </div>
          </div>
        </Reveal>
      </Section>
    </PageShell>
  );
}
