import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site-chrome";
import { Section, Reveal } from "@/components/page-primitives";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | RenoMeta" },
      {
        name: "description",
        content:
          "RenoMeta's Privacy Policy explains how we collect, use, disclose, and safeguard information when you use our software, websites, and services.",
      },
      { property: "og:title", content: "Privacy Policy | RenoMeta" },
      {
        property: "og:description",
        content:
          "RenoMeta's Privacy Policy explains how we collect, use, disclose, and safeguard information when you use our services.",
      },
      { property: "og:url", content: "/privacy-policy" },
      { name: "twitter:title", content: "Privacy Policy | RenoMeta" },
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
            <p className="text-[14px] text-muted-foreground">Effective Date: 08/01/2024</p>

            <div className="mt-10 space-y-10 text-[15px] leading-relaxed text-foreground/90">
              <section>
                <h2 className="font-display text-xl font-semibold tracking-tight">
                  1. Introduction
                </h2>
                <p className="mt-3">
                  Welcome to RenoMeta Inc ("RenoMeta," "we," "us," or "our"). This Privacy Policy
                  explains how we collect, use, disclose, and safeguard information when you use our
                  software, websites, and services, including RenoMeta Connect (collectively, the
                  "Services").
                </p>
                <p className="mt-3">
                  Section 4A governs the use and sharing of data obtained through the Gmail API
                  and information derived from it. Its restrictions apply throughout this Privacy
                  Policy, including the general provisions on information use and sharing.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold tracking-tight">
                  2. Information We Collect
                </h2>
                <p className="mt-3">
                  We collect information you provide directly to us, such as your name, email
                  address, phone number, company name, and other information you choose to share
                  when using our Services.
                </p>
                <p className="mt-3">
                  We may also collect information automatically when you use the Services, such as
                  device information, log data, usage information, and analytics.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold tracking-tight">
                  3. How We Use Your Information
                </h2>
                <p className="mt-3">We use the information we collect to:</p>
                <ul className="mt-3 list-disc pl-5 space-y-1.5">
                  <li>Provide, operate, and maintain our Services.</li>
                  <li>
                    Send important notices, such as updates, security alerts, and support messages.
                  </li>
                  <li>Improve and customize the Services based on feedback and usage patterns.</li>
                  <li>Analyze trends and user behavior to enhance our products and services.</li>
                  <li>
                    Detect, prevent, and address fraud, abuse, security incidents, and technical
                    issues.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold tracking-tight">
                  4. Information Sharing and Disclosure
                </h2>
                <p className="mt-3">
                  We do not sell, trade, or rent your personal information. We may share information
                  with trusted third-party service providers who help us deliver the Services (for
                  example, hosting, analytics, communications, and customer support).
                </p>
                <p className="mt-3">
                  We may also disclose information to comply with legal obligations, enforce our
                  policies, or protect the rights, property, and safety of RenoMeta, our users, or
                  others.
                </p>
              </section>

              <section id="google-user-data">
                <h2 className="font-display text-xl font-semibold tracking-tight">
                  4A. Google User Data and Gmail Integration
                </h2>

                <h3 className="mt-4 font-medium text-foreground">Data we access</h3>
                <p className="mt-3">
                  When you authorize RenoMeta Connect to connect to Gmail, we access the connected
                  account's email address and the messages we sync. This includes sender and
                  recipient addresses, subjects, timestamps, Gmail labels, message and thread
                  identifiers, message snippets, and message text. We receive Google OAuth tokens
                  to maintain the connection you authorize.
                </p>

                <h3 className="mt-4 font-medium text-foreground">How we use this data</h3>
                <p className="mt-3">
                  We use Gmail data and information derived from it only to provide or improve the
                  user-facing features for which you granted access. RenoMeta Connect uses this
                  data to connect your Gmail account and to sync, organize, and display email
                  conversations in your workspace.
                </p>
                <p className="mt-3">
                  We do not use or share Gmail data or information derived from it for advertising,
                  retargeting, audience matching, unrelated analytics, credit decisions, or lending.
                  We do not sell this data or provide it to advertising platforms, data brokers, or
                  information resellers. We do not use Google Workspace APIs or data obtained through
                  them to develop, improve, or train non-personalized AI or machine learning models.
                </p>

                <h3 className="mt-4 font-medium text-foreground">Storage, safeguards, and sharing</h3>
                <p className="mt-3">
                  RenoMeta Connect stores synced message data in Supabase for the workspace
                  that connected the account. We encrypt stored OAuth tokens and use encrypted
                  connections when communicating with Google. Authorized workspace users can view
                  synced messages through RenoMeta Connect.
                </p>
                <p className="mt-3">
                  Our hosting and database providers process Gmail data to run the integration.
                  We limit transfers to those permitted by Google's Limited Use requirements,
                  including transfers needed to provide authorized features with your consent,
                  protect security, or comply with applicable law. RenoMeta personnel may access
                  specific messages only with your affirmative consent or when necessary for
                  security or legal compliance.
                </p>

                <h3 className="mt-4 font-medium text-foreground">Retention, disconnect, and deletion</h3>
                <p className="mt-3">
                  We retain synced copies so authorized users can view their email conversations in
                  RenoMeta Connect. Disconnecting Gmail stops future sync and clears the OAuth
                  tokens stored for the connection. Previously synced messages remain in the
                  workspace after disconnection until removed.
                </p>
                <p className="mt-3">
                  To request deletion of Gmail data stored by RenoMeta Connect, contact{" "}
                  <a href="mailto:support@renometa.com" className="underline hover:text-foreground">
                    support@renometa.com
                  </a>
                  {" "}and identify the connected account and workspace. The request covers copies
                  held by RenoMeta Connect. Original messages in Gmail are managed in your Google
                  account.
                </p>

                <h3 className="mt-4 font-medium text-foreground">Google Limited Use</h3>
                <p className="mt-3">
                  RenoMeta Connect's use and transfer of information received from Google APIs
                  adheres to the{" "}
                  <a
                    href="https://developers.google.com/terms/api-services-user-data-policy"
                    className="underline hover:text-foreground"
                  >
                    Google API Services User Data Policy
                  </a>
                  , including its Limited Use requirements.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold tracking-tight">5. Security</h2>
                <p className="mt-3">
                  We use reasonable administrative, technical, and physical safeguards designed to
                  protect information against unauthorized access, disclosure, alteration, or
                  destruction. However, no method of transmission over the internet or electronic
                  storage is completely secure, and we cannot guarantee absolute security.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold tracking-tight">
                  6. Your Choices
                </h2>
                <p className="mt-3">
                  You may request access, correction, updating, or deletion of your personal
                  information by contacting us at{" "}
                  <a href="mailto:Support@RenoMeta.com" className="underline hover:text-foreground">
                    Support@RenoMeta.com
                  </a>
                  . We will respond within a reasonable timeframe, subject to applicable law.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold tracking-tight">
                  7. Cookies, Analytics, Advertising, and Audience Matching
                </h2>
                <p className="mt-3">
                  The advertising, analytics, and audience matching practices in this section
                  exclude data obtained through the Gmail API and information derived from that
                  data.
                </p>
                <p className="mt-3">
                  When you visit our website, we and our advertising and analytics partners may use
                  cookies, pixels, and similar technologies. We group these technologies into the
                  categories below, consistent with the choices available through our Cookie
                  Preferences control (available at any time, including in the site footer).
                </p>

                <h3 className="mt-4 font-medium text-foreground">
                  7a. Categories of Technologies We Use
                </h3>
                <p className="mt-3">
                  <span className="font-medium text-foreground">Essential technologies</span> are
                  required for the website to function, such as remembering your cookie preference
                  and supporting basic site security and navigation. Essential technologies are
                  always active and cannot be turned off through Cookie Preferences.
                </p>
                <p className="mt-3">
                  <span className="font-medium text-foreground">Analytics technologies.</span> With
                  your consent, we use Google Analytics (GA4) to understand how visitors use our
                  website, such as which pages are viewed and how the site is navigated, so we can
                  improve our website and services.
                </p>
                <p className="mt-3">
                  <span className="font-medium text-foreground">
                    Advertising and retargeting technologies.
                  </span>{" "}
                  With your consent, we use the Meta Pixel (Facebook/Instagram) and Google Ads to
                  show you relevant ads on other websites and platforms after you visit our website,
                  and to measure the performance of our advertising campaigns.
                </p>

                <h3 className="mt-4 font-medium text-foreground">
                  7b. Meta Pixel and Meta Advanced Matching
                </h3>
                <p className="mt-3">
                  When you grant Advertising consent, the Meta Pixel may use a feature Meta calls
                  Advanced Matching. Advanced Matching allows us to send Meta certain first-party
                  information you have provided to us — such as your email address, phone number,
                  first name, last name, or similar identifiers — in hashed form, for purposes such
                  as audience matching, advertising, retargeting, attribution, conversion
                  measurement, and campaign optimization.
                </p>
                <p className="mt-3">
                  Hashing changes the format of this information before it is sent, but hashing does
                  not make the information anonymous. We do not represent or guarantee that Meta,
                  Google, or any other advertising partner is unable to identify you or link this
                  information back to you through hashing, matching, or other means available to
                  them.
                </p>

                <h3 className="mt-4 font-medium text-foreground">
                  7c. Advertising Technologies Used for Customer Campaigns
                </h3>
                <p className="mt-3">
                  RenoMeta may also use the Meta Pixel, Meta Advanced Matching, Google Ads, Google
                  Analytics, or similar advertising and measurement technologies when managing
                  advertising campaigns on behalf of RenoMeta's own customers. Any such use is
                  subject to the applicable advertising platform's terms, the permissions granted to
                  RenoMeta, and the relevant customer's own privacy obligations to its end users.
                </p>

                <h3 className="mt-4 font-medium text-foreground">7d. Your Choices</h3>
                <p className="mt-3">
                  Analytics and Advertising technologies are used only according to the choices you
                  make through our Cookie Preferences control. You can accept, reject, or change
                  these choices at any time. Changing your preferences applies to technologies going
                  forward; it does not necessarily remove or delete information that was already
                  collected or processed by us or by our advertising and analytics partners before
                  you changed your preferences.
                </p>
                <p className="mt-3">
                  We do not control how Meta, Google, or other third-party advertising and analytics
                  providers use information once it has been shared with them, and this Privacy
                  Policy does not describe their practices. Please review Meta's and Google's own
                  privacy policies for information about how they handle data.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold tracking-tight">
                  8. SMS/MMS Communications and Consent
                </h2>

                <h3 className="mt-4 font-medium text-foreground">
                  8a. SMS Messages Sent Directly by RenoMeta
                </h3>
                <p className="mt-3">
                  RenoMeta may send SMS/MMS messages directly to individuals who provide express
                  written consent through the contact form on our website at{" "}
                  <a
                    href="https://renometa.com"
                    target="_blank"
                    rel="noreferrer"
                    className="underline hover:text-foreground"
                  >
                    https://renometa.com
                  </a>
                  . Consent is collected via a separate, optional, unchecked checkbox on the contact
                  form. Providing a phone number alone does not constitute consent to receive SMS
                  messages. Users who do not check the SMS opt-in checkbox will not receive any text
                  messages from RenoMeta.
                </p>
                <p className="mt-3">
                  The opt-in checkbox states: "(Optional) By checking this box, you agree to receive
                  SMS messages from RenoMeta. Message frequency varies (up to 5 messages per month).
                  Message and data rates may apply. Reply STOP to opt out or HELP for help. Consent
                  is not a condition of purchase, receiving services, or completing any transaction.
                  View our Privacy Policy and Terms of Service."
                </p>
                <p className="mt-3">
                  SMS consent is entirely voluntary. You are not required to consent to SMS
                  messaging in order to use our Services, submit a contact form, receive customer
                  support, make a purchase, or complete any transaction with RenoMeta. The contact
                  form can be submitted without providing a phone number and without opting in to
                  SMS.
                </p>
                <p className="mt-3">
                  Messages sent directly by RenoMeta include responses to inquiries, account
                  notifications, appointment confirmations, service updates, and customer support
                  communications. These messages are not marketing or promotional in nature. Message
                  frequency does not exceed 5 messages per month.
                </p>
                <p className="mt-3">
                  Recipients may opt out at any time by replying STOP to any message. For help,
                  reply HELP or contact us at{" "}
                  <a href="mailto:Support@RenoMeta.com" className="underline hover:text-foreground">
                    Support@RenoMeta.com
                  </a>
                  . Message and data rates may apply.
                </p>

                <h3 className="mt-4 font-medium text-foreground">
                  8b. SMS Messages Sent Through the RenoMeta Platform
                </h3>
                <p className="mt-3">
                  RenoMeta also provides a software platform that enables businesses (our customers)
                  to communicate with their own end users via SMS/MMS for customer care and
                  operational purposes, such as missed call responses, appointment confirmations,
                  reminders, and follow-ups.
                </p>
                <p className="mt-3">
                  Businesses using the RenoMeta platform are solely responsible for obtaining and
                  maintaining appropriate consent from their own message recipients and for
                  complying with all applicable laws, regulations, and carrier requirements.
                </p>

                <h3 className="mt-4 font-medium text-foreground">8c. General SMS Policies</h3>
                <p className="mt-3">
                  RenoMeta will not share, sell, or distribute your mobile phone number or SMS
                  consent data to any third parties or affiliates for their own marketing or
                  promotional purposes. RenoMeta does not sell, share, or distribute opt-in
                  information to any third parties for their own marketing or promotional purposes.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold tracking-tight">
                  9. Changes to This Privacy Policy
                </h2>
                <p className="mt-3">
                  We may update this Privacy Policy from time to time. Changes are effective when
                  posted on our website. We encourage you to review this policy periodically.
                  If we change how we use Google user data, we will notify affected users and ask
                  them to consent before using that data for a new purpose.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold tracking-tight">
                  10. Contact Us
                </h2>
                <p className="mt-3">
                  If you have questions, concerns, or requests regarding this Privacy Policy or our
                  practices, contact us at{" "}
                  <a href="mailto:Support@RenoMeta.com" className="underline hover:text-foreground">
                    Support@RenoMeta.com
                  </a>
                  .
                </p>
                <p className="mt-3">
                  By using our Services, you acknowledge and agree to the data collection and usage
                  practices described in this Privacy Policy. This acknowledgment does not
                  constitute consent to receive SMS or MMS messages. SMS consent is collected
                  separately and independently as described in Section 8a above.
                </p>
              </section>
            </div>
          </div>
        </Reveal>
      </Section>
    </PageShell>
  );
}
