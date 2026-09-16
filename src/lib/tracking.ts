// src/lib/tracking.ts
//
// Centralized, consent-aware tracking for Google (gtag.js: Google Ads
// remarketing + optional GA4) and Meta Pixel. Nothing in this file loads a
// third-party script or sends an event until the visitor's consent allows
// it — see applyConsent() below, which is the only place that decides what
// gets initialized.
//
// Safe with zero env vars configured: every exported function becomes a
// no-op if its corresponding ID is missing, and nothing here throws.

import type { ConsentPreferences } from "./consent";
import { getConsentPreferences } from "./consent";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: FbqFunction;
    _fbq?: FbqFunction;
  }
}

type FbqFunction = {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  queue?: unknown[];
  loaded?: boolean;
  version?: string;
  push?: FbqFunction;
};

const GOOGLE_ADS_ID =
  (import.meta.env.VITE_GOOGLE_ADS_ID as string | undefined)?.trim() || undefined;
const GA_MEASUREMENT_ID =
  (import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined)?.trim() || undefined;
const META_PIXEL_ID =
  (import.meta.env.VITE_META_PIXEL_ID as string | undefined)?.trim() || undefined;

const GOOGLE_TAG_SCRIPT_ID = "renometa-gtag-js";

let googleTagLoaded = false;
let metaPixelLoaded = false;
let lastTrackedPath: string | null = null;

function ensureDataLayerStub() {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer!.push(args);
    };
  }
}

/**
 * Google Consent Mode default. Safe/cheap to call unconditionally and
 * repeatedly — it only ever queues a `consent default` command, it never
 * loads a script or sends data anywhere. Establishing this before any
 * config/event call is what keeps ad/analytics storage denied until the
 * visitor actually grants it.
 */
export function setDefaultGoogleConsent(): void {
  if (typeof window === "undefined") return;
  ensureDataLayerStub();
  window.gtag?.("consent", "default", {
    ad_storage: "denied",
    analytics_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
}

function loadGoogleTagScript() {
  if (typeof document === "undefined" || googleTagLoaded) return;
  if (!GOOGLE_ADS_ID && !GA_MEASUREMENT_ID) return; // nothing configured — stay disabled
  if (document.getElementById(GOOGLE_TAG_SCRIPT_ID)) {
    googleTagLoaded = true;
    return;
  }

  ensureDataLayerStub();

  const script = document.createElement("script");
  script.id = GOOGLE_TAG_SCRIPT_ID;
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(
    GOOGLE_ADS_ID || GA_MEASUREMENT_ID!,
  )}`;
  document.head.appendChild(script);
  googleTagLoaded = true;

  window.gtag?.("js", new Date());
  if (GOOGLE_ADS_ID) window.gtag?.("config", GOOGLE_ADS_ID);
  if (GA_MEASUREMENT_ID) window.gtag?.("config", GA_MEASUREMENT_ID);
}

function applyGoogleConsentUpdate(prefs: ConsentPreferences) {
  if (typeof window === "undefined") return;
  ensureDataLayerStub();
  window.gtag?.("consent", "update", {
    analytics_storage: prefs.analytics ? "granted" : "denied",
    ad_storage: prefs.advertising ? "granted" : "denied",
    ad_user_data: prefs.advertising ? "granted" : "denied",
    ad_personalization: prefs.advertising ? "granted" : "denied",
  });
}

function loadMetaPixel() {
  if (typeof window === "undefined" || metaPixelLoaded || !META_PIXEL_ID) return;
  metaPixelLoaded = true;

  // Standard Meta Pixel bootstrap. No advanced matching (email/phone/name)
  // is configured — only the base pixel ID and PageView.
  (function (win: Window, doc: Document, src: string) {
    if (win.fbq) return;
    const fbq: FbqFunction = function (...args: unknown[]) {
      if (fbq.callMethod) fbq.callMethod(...args);
      else fbq.queue?.push(args);
    };
    win.fbq = fbq;
    if (!win._fbq) win._fbq = fbq;
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = "2.0";
    fbq.queue = [];
    const script = doc.createElement("script");
    script.async = true;
    script.src = src;
    const firstScript = doc.getElementsByTagName("script")[0];
    firstScript?.parentNode?.insertBefore(script, firstScript);
  })(window, document, "https://connect.facebook.net/en_US/fbevents.js");

  window.fbq?.("init", META_PIXEL_ID);
  window.fbq?.("track", "PageView");
}

/**
 * Applies the visitor's consent decision: updates Google Consent Mode
 * signals, and only NOW (never before) loads the gtag.js tag and/or the
 * Meta Pixel library if the relevant category was granted. Call this once
 * after hydrating stored consent, and again every time consent changes.
 *
 * `pathname` is used to seed page-view dedup so the initial load's implicit
 * pageview (from the Google config call / Meta's init PageView) isn't
 * immediately duplicated by the next trackPageView() call for the same path.
 */
export function applyConsent(prefs: ConsentPreferences | null, pathname: string): void {
  if (typeof window === "undefined") return;

  // Always establish (or re-establish) the default first — cheap, and
  // guarantees denied-by-default even if this is the very first call this
  // page load has made into the tracking module.
  setDefaultGoogleConsent();

  if (!prefs) return; // no decision yet — everything stays denied/uninitialized

  applyGoogleConsentUpdate(prefs);

  // Google Consent Mode is designed so the tag itself can load once any
  // non-essential category is granted — it will honor the denied/granted
  // signals above internally (e.g. it won't set ad cookies while
  // ad_storage is denied). This is different from Meta Pixel below, which
  // has no built-in consent gating and must not be loaded at all pre-consent.
  if (prefs.analytics || prefs.advertising) {
    loadGoogleTagScript();
  }

  if (prefs.advertising) {
    loadMetaPixel();
  }

  lastTrackedPath = pathname;
}

/**
 * Call on the initial page load and on every SPA route change. No-ops
 * entirely until consent has been granted for analytics or advertising, and
 * de-dupes so the same pathname never fires twice in a row (e.g. the
 * initial "config"/"init" calls already send the first pageview).
 */
export function trackPageView(pathname: string): void {
  if (typeof window === "undefined") return;
  if (lastTrackedPath === pathname) return;

  const prefs = getConsentPreferences();
  if (!prefs) return;

  if (
    (prefs.analytics || prefs.advertising) &&
    window.gtag &&
    (GOOGLE_ADS_ID || GA_MEASUREMENT_ID)
  ) {
    window.gtag("event", "page_view", { page_path: pathname });
  }

  if (prefs.advertising && metaPixelLoaded) {
    window.fbq?.("track", "PageView");
  }

  lastTrackedPath = pathname;
}

export type RenoMetaEventName =
  "pricing_view" | "try_agent" | "contact_submit" | "trial_start" | "trial_complete";

export type EventProperties = Record<string, string | number | boolean | null | undefined>;

// Fields that look identity-related are dropped as a defense-in-depth
// safety net — callers should never pass these in the first place (see
// EventProperties usage sites), but this keeps a mistake from ever reaching
// an advertising provider.
const PII_KEY_PATTERN = /email|phone|name|address|message|company|contact|street|zip|postal/i;

function sanitizeProperties(properties?: EventProperties): EventProperties | undefined {
  if (!properties) return undefined;
  const safe: EventProperties = {};
  for (const [key, value] of Object.entries(properties)) {
    if (PII_KEY_PATTERN.test(key)) continue;
    if (value === undefined) continue;
    safe[key] = value;
  }
  return safe;
}

const GOOGLE_EVENT_NAMES: Record<RenoMetaEventName, string> = {
  pricing_view: "pricing_view",
  try_agent: "try_agent",
  contact_submit: "contact_submit",
  trial_start: "trial_start",
  trial_complete: "trial_complete",
};

// `standard: true` events use fbq('track', ...) (Meta's predefined event
// names); `standard: false` uses fbq('trackCustom', ...) since "TrialStart"
// isn't one of Meta's standard events and InitiateCheckout would misrepresent
// a free, no-payment trial signup.
const META_EVENT_MAP: Record<RenoMetaEventName, { name: string; standard: boolean }> = {
  pricing_view: { name: "ViewContent", standard: true },
  try_agent: { name: "Lead", standard: true },
  contact_submit: { name: "Lead", standard: true },
  trial_start: { name: "TrialStart", standard: false },
  trial_complete: { name: "CompleteRegistration", standard: true },
};

/**
 * Fires a RenoMeta product event to whichever providers the visitor has
 * consented to. No-ops entirely until a consent decision has been made —
 * pre-consent, nothing is sent anywhere.
 */
export function trackEvent(name: RenoMetaEventName, properties?: EventProperties): void {
  if (typeof window === "undefined") return;
  const prefs = getConsentPreferences();
  if (!prefs) return;

  const safeProperties = sanitizeProperties(properties);

  if (
    (prefs.analytics || prefs.advertising) &&
    window.gtag &&
    (GOOGLE_ADS_ID || GA_MEASUREMENT_ID)
  ) {
    window.gtag("event", GOOGLE_EVENT_NAMES[name], safeProperties);
  }

  if (prefs.advertising && metaPixelLoaded) {
    const meta = META_EVENT_MAP[name];
    window.fbq?.(meta.standard ? "track" : "trackCustom", meta.name, safeProperties);
  }
}
