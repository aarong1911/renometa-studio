import { Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import type { ComponentType, ReactNode } from "react";
import { useReveal } from "@/hooks/use-reveal";

/* -------- Reveal wrapper -------- */
export function Reveal({
  as: Tag = "div",
  delay = 0,
  className = "",
  children,
}: {
  as?: "div" | "section" | "li" | "article";
  delay?: number;
  className?: string;
  children: ReactNode;
}) {
  const ref = useReveal<HTMLElement>();
  return (
    <Tag
      ref={ref as never}
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

/* -------- Section wrapper -------- */
export function Section({
  id,
  className = "",
  tone = "default",
  children,
}: {
  id?: string;
  className?: string;
  tone?: "default" | "surface" | "bordered";
  children: ReactNode;
}) {
  const bg =
    tone === "surface"
      ? "bg-surface/50"
      : tone === "bordered"
        ? "border-y border-border bg-surface/60"
        : "";
  return (
    <section id={id} className={`relative ${bg}`}>
      <div className={`mx-auto max-w-7xl px-6 py-20 sm:py-24 ${className}`}>
        {children}
      </div>
    </section>
  );
}

/* -------- Section header -------- */
export function SectionHeader({
  eyebrow,
  title,
  desc,
  center = false,
  size = "lg",
}: {
  eyebrow?: string;
  title: string;
  desc?: string;
  center?: boolean;
  size?: "md" | "lg";
}) {
  const titleClass =
    size === "lg"
      ? "font-display text-balance text-3xl sm:text-4xl lg:text-[44px] leading-[1.08] tracking-[-0.025em] font-semibold"
      : "font-display text-balance text-2xl sm:text-3xl lg:text-[34px] leading-[1.12] tracking-[-0.02em] font-semibold";
  return (
    <Reveal className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <div className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-muted-foreground">
          <span className="h-px w-6 bg-gold" />
          {eyebrow}
        </div>
      )}
      <h2 className={`mt-4 ${titleClass}`}>{title}</h2>
      {desc && (
        <p className="mt-5 text-[16px] sm:text-[17px] text-muted-foreground leading-relaxed">
          {desc}
        </p>
      )}
    </Reveal>
  );
}

/* -------- Feature card -------- */
export type FeatureItem = {
  icon: ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  to?: string;
};

export function FeatureGrid({
  items,
  cols = 3,
}: {
  items: FeatureItem[];
  cols?: 2 | 3;
}) {
  const grid =
    cols === 2
      ? "grid gap-5 md:grid-cols-2"
      : "grid gap-5 md:grid-cols-2 lg:grid-cols-3";
  return (
    <div className={`mt-12 ${grid}`}>
      {items.map((f, i) => (
        <Reveal key={f.title} delay={i * 60}>
          <FeatureCard {...f} />
        </Reveal>
      ))}
    </div>
  );
}

export function FeatureCard({ icon: Icon, title, desc, to }: FeatureItem) {
  const inner = (
    <div className="card-elegant card-elegant-hover h-full p-6 group">
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-lg border border-border bg-surface grid place-items-center">
          <Icon className="h-4 w-4 text-foreground" />
        </div>
        <h3 className="text-[15.5px] font-medium">{title}</h3>
      </div>
      <p className="mt-3.5 text-[14px] text-muted-foreground leading-relaxed">
        {desc}
      </p>
      {to && (
        <div className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-foreground group-hover:text-gold transition-colors">
          Explore {title}
          <ArrowRight className="h-3.5 w-3.5" />
        </div>
      )}
    </div>
  );
  if (to) {
    return (
      <Link to={to} className="block h-full" aria-label={`Explore ${title}`}>
        {inner}
      </Link>
    );
  }
  return inner;
}

/* -------- Numbered step flow -------- */
export function StepFlow({
  steps,
}: {
  steps: { title: string; desc: string }[];
}) {
  return (
    <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
      {steps.map((s, i) => (
        <Reveal key={s.title} delay={i * 70}>
          <div className="relative card-elegant card-elegant-hover h-full p-5">
            <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              Step {String(i + 1).padStart(2, "0")}
            </div>
            <h4 className="mt-2.5 text-[15px] font-medium">{s.title}</h4>
            <p className="mt-2 text-[13.5px] text-muted-foreground leading-relaxed">
              {s.desc}
            </p>
            <div className="mt-4 h-px w-8 bg-gold" />
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/* -------- Benefit / bullet grid -------- */
export function BenefitGrid({ items }: { items: string[] }) {
  return (
    <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((b, i) => (
        <Reveal
          key={b}
          delay={i * 40}
          className="flex items-start gap-3 rounded-xl border border-border bg-surface-elevated p-4"
        >
          <div className="mt-0.5 h-5 w-5 rounded-full bg-gold-soft border border-[color:color-mix(in_oklab,var(--gold)_50%,var(--border))] grid place-items-center shrink-0">
            <Check className="h-3 w-3 text-foreground" strokeWidth={2.5} />
          </div>
          <div className="text-[14px] text-foreground leading-relaxed">{b}</div>
        </Reveal>
      ))}
    </div>
  );
}

/* -------- Mockup browser chrome -------- */
export function MockupFrame({
  url,
  children,
  className = "",
}: {
  url?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative rounded-2xl border border-border bg-surface-elevated shadow-elegant overflow-hidden transition-transform duration-700 hover:-translate-y-1 ${className}`}
    >
      <div
        className="absolute inset-x-0 top-0 h-px animate-shimmer pointer-events-none"
        aria-hidden
      />
      <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-surface">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.85_0.02_30)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.88_0.02_80)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.86_0.05_150)]" />
        </div>
        {url && (
          <div className="text-[11px] text-muted-foreground font-mono truncate">
            {url}
          </div>
        )}
        <div className="w-10" />
      </div>
      {children}
    </div>
  );
}

/* -------- Final CTA section -------- */
export function CTASection({
  eyebrow = "Get started",
  title,
  desc,
  primary = { label: "Contact Us", to: "/contact" },
  secondary,
}: {
  eyebrow?: string;
  title: string;
  desc?: string;
  primary?: { label: string; to: string };
  secondary?: { label: string; to: string };
}) {
  return (
    <section className="relative overflow-hidden bg-hero-radial border-t border-border">
      <div className="absolute inset-0 bg-grid-fade opacity-50 pointer-events-none" />
      <div className="relative mx-auto max-w-5xl px-6 py-24 text-center">
        <Reveal>
          <div className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-muted-foreground">
            <span className="h-px w-6 bg-gold" />
            {eyebrow}
            <span className="h-px w-6 bg-gold" />
          </div>
          <h2 className="mt-5 font-display text-balance text-3xl sm:text-4xl lg:text-[50px] leading-[1.05] tracking-[-0.025em] font-semibold">
            {title}
          </h2>
          {desc && (
            <p className="mt-5 text-[16.5px] text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {desc}
            </p>
          )}
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link
              to={primary.to}
              className="btn-primary"
              aria-label={`${primary.label} — go to ${primary.to}`}
            >
              {primary.label}
              <ArrowRight className="h-4 w-4" />
            </Link>
            {secondary && (
              <Link
                to={secondary.to}
                className="btn-ghost"
                aria-label={`${secondary.label} — go to ${secondary.to}`}
              >
                {secondary.label}
              </Link>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------- Split callout with visual on the side -------- */
export function SplitCallout({
  eyebrow,
  title,
  desc,
  bullets,
  visual,
  reverse = false,
}: {
  eyebrow?: string;
  title: string;
  desc?: string;
  bullets?: string[];
  visual: ReactNode;
  reverse?: boolean;
}) {
  return (
    <div
      className={`mt-12 grid gap-10 lg:grid-cols-2 items-center ${
        reverse ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      <Reveal>
        <div>
          {eyebrow && (
            <div className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-muted-foreground">
              <span className="h-px w-6 bg-gold" />
              {eyebrow}
            </div>
          )}
          <h3 className="mt-4 font-display text-2xl sm:text-3xl font-semibold tracking-[-0.02em] leading-tight">
            {title}
          </h3>
          {desc && (
            <p className="mt-4 text-[15.5px] text-muted-foreground leading-relaxed">
              {desc}
            </p>
          )}
          {bullets && (
            <ul className="mt-5 space-y-2.5">
              {bullets.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-2.5 text-[14.5px] text-foreground/90"
                >
                  <Check className="h-4 w-4 text-gold mt-0.5 shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
          )}
        </div>
      </Reveal>
      <Reveal delay={120}>{visual}</Reveal>
    </div>
  );
}

/* -------- Stat row -------- */
export function StatRow({
  stats,
}: {
  stats: { value: string; label: string }[];
}) {
  return (
    <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((s, i) => (
        <Reveal
          key={s.label}
          delay={i * 60}
          className="border-l border-border pl-4"
        >
          <div className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">
            {s.value}
          </div>
          <div className="mt-2 text-[13px] text-muted-foreground">{s.label}</div>
        </Reveal>
      ))}
    </div>
  );
}
