import { useId, useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";

const SERVICES = [
  "General Inquiry",
  "RenoMeta Connect",
  "AI Website Systems",
  "Custom AI Solutions",
  "Pricing / Demo Request",
  "Support / Existing Customer",
];

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [smsConsent, setSmsConsent] = useState(false);
  const serviceId = useId();
  const messageId = useId();
  const smsId = useId();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-border bg-surface-elevated p-10 text-center">
        <div className="mx-auto h-11 w-11 rounded-full border border-border bg-surface grid place-items-center">
          <Check className="h-5 w-5 text-gold" strokeWidth={2} />
        </div>
        <h2 className="mt-5 font-display text-2xl font-semibold tracking-tight">
          Thanks — we'll be in touch shortly.
        </h2>
        <p className="mt-3 text-[14.5px] text-muted-foreground">
          A member of our team will reach out within one business day.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-border bg-surface-elevated p-6 sm:p-8 space-y-5"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Name" name="name" required />
        <Field label="Company" name="company" />
        <Field label="Email" name="email" type="email" required />
        <Field label="Phone" name="phone" type="tel" />
      </div>
      <div>
        <label
          htmlFor={serviceId}
          className="block text-[12.5px] font-medium text-foreground/80 mb-1.5"
        >
          Service of Interest
        </label>
        <select
          id={serviceId}
          name="service"
          defaultValue="General Inquiry"
          className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-[14px] text-foreground focus:outline-none focus:ring-2 focus:ring-gold/40"
        >
          {SERVICES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label
          htmlFor={messageId}
          className="block text-[12.5px] font-medium text-foreground/80 mb-1.5"
        >
          How can we help?
        </label>
        <textarea
          id={messageId}
          name="message"
          rows={5}
          className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-[14px] text-foreground focus:outline-none focus:ring-2 focus:ring-gold/40"
          placeholder="Tell us where leads, follow-up, or operations are falling through the cracks."
        />
      </div>

      <div className="pt-1 pb-1">
        <label htmlFor={smsId} className="flex items-start gap-3 cursor-pointer">
          <input
            id={smsId}
            name="smsConsent"
            type="checkbox"
            checked={smsConsent}
            onChange={(e) => setSmsConsent(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-border-strong text-gold focus:ring-2 focus:ring-gold/40 accent-[var(--gold-strong)]"
          />
          <span className="text-[12.5px] leading-relaxed text-muted-foreground">
            (Optional) By checking this box, you agree to receive SMS messages from RenoMeta.
            Message frequency varies (up to 5 messages per month). Message and data rates may
            apply. Reply STOP to opt out or HELP for help. Consent is not a condition of
            purchase, receiving services, or completing any transaction. View our{" "}
            <Link to="/" hash="privacy" className="underline hover:text-foreground">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link to="/" hash="terms" className="underline hover:text-foreground">
              Terms of Service
            </Link>
            .
          </span>
        </label>
      </div>

      <button type="submit" className="btn-primary w-full sm:w-auto">
        Send Message
        <ArrowRight className="h-4 w-4" />
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  const id = useId();
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[12.5px] font-medium text-foreground/80 mb-1.5"
      >
        {label}
        {required && <span className="text-gold ml-0.5">*</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-[14px] text-foreground focus:outline-none focus:ring-2 focus:ring-gold/40"
      />
    </div>
  );
}
