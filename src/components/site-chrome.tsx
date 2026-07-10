import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import logoAsset from "@/assets/renometa-logo.webp.asset.json";

export const SOLUTIONS: { to: string; label: string; desc: string }[] = [
  { to: "/renometa-connect", label: "RenoMeta Connect", desc: "The business command center for renovation contractors." },
  { to: "/ai-website-systems", label: "AI Website Systems", desc: "Lead-focused websites connected to Connect." },
  { to: "/ai-center", label: "AI Center", desc: "AI agents for lead response, follow-up, and estimates." },
  { to: "/multi-channel-inbox", label: "Multi-Channel Inbox", desc: "Every customer conversation in one inbox." },
  { to: "/crm-sales", label: "CRM & Sales", desc: "Track leads from first inquiry to closed job." },
  { to: "/marketing-follow-up-automation", label: "Marketing & Follow-Up Automation", desc: "Nurture, reviews, campaigns, reactivation." },
  { to: "/growth-operations", label: "Growth Operations", desc: "Scheduling, workflows, reporting, insights." },
  { to: "/custom-ai-solutions", label: "Custom AI Solutions", desc: "Advanced workflows built beyond the platform." },
];

export const LOGO_URL = logoAsset.url;

export function Logo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <img
      src={logoAsset.url}
      alt="RenoMeta"
      className={className}
      width={498}
      height={144}
      loading="eager"
      decoding="async"
      fetchPriority="high"
    />
  );
}

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const links: { to: string; label: string }[] = [
    { to: "/pricing", label: "Pricing" },
    { to: "/about", label: "About" },
    { to: "/blog", label: "Blog" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled || mobileOpen
          ? "bg-background/75 backdrop-blur-xl border-b border-border shadow-[0_1px_0_oklch(0_0_0/0.03),0_8px_24px_-16px_oklch(0_0_0/0.12)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center group"
          aria-label="RenoMeta home"
          onClick={() => {
            setMobileOpen(false);
            setMobileSolutionsOpen(false);
          }}
        >
          <Logo className="h-8 w-auto" />
        </Link>
        <nav className="hidden md:flex items-center gap-7">
          <SolutionsDropdown />
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-[13.5px] text-muted-foreground hover:text-foreground transition-colors"
              activeProps={{ className: "text-[13.5px] text-foreground" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href="https://connect.renometa.com"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex text-[13.5px] px-3 py-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            Login
          </a>
          <Link to="/contact" className="hidden sm:inline-flex btn-primary text-[13.5px] px-4 py-2">
            Contact Us
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center h-10 w-10 -mr-2 rounded-md text-foreground hover:bg-surface transition-colors"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => {
              setMobileOpen((v) => {
                if (v) setMobileSolutionsOpen(false);
                return !v;
              });
            }}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="px-6 py-6 space-y-6">
            <div>
              <button
                type="button"
                className="flex w-full items-center justify-between text-left text-[11px] uppercase tracking-[0.18em] text-muted-foreground"
                aria-expanded={mobileSolutionsOpen}
                aria-controls="mobile-solutions-menu"
                onClick={() => setMobileSolutionsOpen((v) => !v)}
              >
                Solutions
                <ChevronDown className={`h-4 w-4 transition-transform ${mobileSolutionsOpen ? "rotate-180" : ""}`} />
              </button>
              <div
                id="mobile-solutions-menu"
                className={`grid transition-all duration-300 ease-out ${
                  mobileSolutionsOpen ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0 mt-0"
                }`}
              >
                <div className="min-h-0 overflow-hidden space-y-1">
                {SOLUTIONS.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => {
                      setMobileOpen(false);
                      setMobileSolutionsOpen(false);
                    }}
                    className="block rounded-lg px-3 py-2.5 hover:bg-surface transition-colors"
                  >
                    <div className="text-[14px] font-medium text-foreground">{item.label}</div>
                    <div className="mt-0.5 text-[12px] text-muted-foreground leading-snug">
                      {item.desc}
                    </div>
                  </Link>
                ))}
                </div>
              </div>
            </div>
            <div className="border-t border-border pt-5">
              <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                Company
              </div>
              <div className="mt-3 flex flex-col">
                {links.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    onClick={() => {
                      setMobileOpen(false);
                      setMobileSolutionsOpen(false);
                    }}
                    className="py-2.5 text-[15px] text-foreground"
                  >
                    {l.label}
                  </Link>
                ))}
                <a
                  href="https://connect.renometa.com"
                  target="_blank"
                  rel="noreferrer"
                  className="py-2.5 text-[15px] text-foreground"
                  onClick={() => {
                    setMobileOpen(false);
                    setMobileSolutionsOpen(false);
                  }}
                >
                  Login
                </a>
              </div>
            </div>
            <Link
              to="/contact"
              onClick={() => {
                setMobileOpen(false);
                setMobileSolutionsOpen(false);
              }}
              className="btn-primary w-full justify-center text-[14px]"
            >
              Contact Us
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

function SolutionsDropdown() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={dropdownRef}
      className="relative"
      data-solutions-dropdown
      onPointerEnter={() => setOpen(true)}
      onPointerLeave={() => setOpen(false)}
      onFocusCapture={() => setOpen(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="inline-flex items-center gap-1 text-[13.5px] text-muted-foreground hover:text-foreground transition-colors"
      >
        Solutions
        <ChevronDown className={`h-3 w-3 opacity-60 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <div
        className={`absolute left-1/2 -translate-x-1/2 top-full pt-3 z-50 transition-all duration-200 ${
          open ? "opacity-100 visible pointer-events-auto" : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <div className="w-[380px] rounded-2xl border border-border bg-surface-elevated shadow-elegant p-2" role="menu">
          {SOLUTIONS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              role="menuitem"
              className="block rounded-xl px-4 py-3 hover:bg-surface transition-colors"
            >
              <div className="text-[13.5px] font-medium text-foreground">{item.label}</div>
              <div className="mt-0.5 text-[12px] text-muted-foreground leading-snug">
                {item.desc}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}


export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface/60">
      <div className="mx-auto max-w-7xl px-6 py-16 grid grid-cols-2 md:grid-cols-5 gap-10">
        <div className="col-span-2 md:col-span-2">
          <Link to="/" className="flex items-center" aria-label="RenoMeta home">
            <Logo className="h-9 w-auto" />
          </Link>
          <p className="mt-4 text-[14px] text-muted-foreground max-w-sm leading-relaxed">
            RenoMeta Connect is a business command center for renovation
            contractors and home service businesses — bringing leads,
            conversations, estimates, follow-up, scheduling, marketing,
            automation, and insights into one connected platform.
          </p>
          <Link
            to="/contact"
            className="mt-6 inline-flex items-center gap-1.5 text-[13.5px] font-medium text-foreground hover:text-gold transition-colors"
          >
            Contact us
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <FooterCol
          title="Solutions"
          links={SOLUTIONS.map((s) => ({ to: s.to, label: s.label }))}
        />
        <FooterCol
          title="Company"
          links={[
            { to: "/pricing", label: "Pricing" },
            { to: "/about", label: "About" },
            { to: "/blog", label: "Blog" },
            { to: "/contact", label: "Contact" },
          ]}
        />
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-[12.5px] text-muted-foreground">
            © {new Date().getFullYear()} RenoMeta. All rights reserved.
          </div>
          <div className="text-[12.5px] text-muted-foreground">
            Built for renovation contractors and home service businesses
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { to: string; label: string }[];
}) {
  return (
    <div>
      <div className="text-[12px] uppercase tracking-[0.16em] text-muted-foreground">
        {title}
      </div>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.to}>
            <Link
              to={l.to}
              className="text-[13.5px] text-foreground/80 hover:text-foreground transition-colors"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function PageShell({
  eyebrow,
  headline,
  subheading,
  primaryCta = { label: "Contact Us", to: "/contact" },
  secondaryCta = { label: "Explore Solutions", to: "/solutions" },
  heroVisual,
  children,
}: {
  eyebrow?: string;
  headline: string;
  subheading: string;
  primaryCta?: { label: string; to: string };
  secondaryCta?: { label: string; to: string } | null;
  heroVisual?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <SiteNav />
      <main className="flex-1">
        <section className="relative pt-32 pb-20 overflow-hidden bg-hero-radial">
          <div className="absolute inset-0 bg-grid-fade opacity-70 pointer-events-none" />
          <div className="relative mx-auto max-w-7xl px-6">
            <div className="max-w-4xl">
              {eyebrow && (
                <div className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-muted-foreground animate-reveal">
                  <span className="h-px w-6 bg-gold" />
                  {eyebrow}
                </div>
              )}
              <h1
                className="mt-5 font-display text-balance text-[40px] sm:text-5xl lg:text-[60px] leading-[1.04] tracking-[-0.03em] font-semibold text-foreground animate-reveal"
                style={{ animationDelay: "80ms" }}
              >
                {headline}
              </h1>
              <p
                className="mt-6 text-pretty text-[16.5px] sm:text-[17.5px] text-muted-foreground max-w-2xl leading-relaxed animate-reveal"
                style={{ animationDelay: "180ms" }}
              >
                {subheading}
              </p>
              <div
                className="mt-9 flex flex-wrap items-center gap-3 animate-reveal"
                style={{ animationDelay: "280ms" }}
              >
                <Link to={primaryCta.to} className="btn-primary">
                  {primaryCta.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                {secondaryCta && (
                  <Link to={secondaryCta.to} className="btn-ghost">
                    {secondaryCta.label}
                  </Link>
                )}
              </div>
            </div>
            {heroVisual && (
              <div className="mt-14 animate-reveal" style={{ animationDelay: "360ms" }}>
                {heroVisual}
              </div>
            )}
          </div>
        </section>
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}

