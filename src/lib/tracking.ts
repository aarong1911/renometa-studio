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

let consentDefaultSet = false;
let googleTagLoaded = false;
let googleTagConfigured = false;
let metaPixelLoaded = false;
let lastGa4TrackedPath: string | null = null;
let lastMetaTrackedPath: string | null = null;

function ensureDataLayerStub() {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    // Must match Google's documented snippet exactly: push the real
    // `arguments` object, not a plain Array built from rest params.
    // gtag.js's own bootstrap drains this queue expecting Arguments-shaped
    // entries — a rest-param array (`(...args) => push(args)`) is a
    // different structure, which is why commands were visible in
    // dataLayer but never actually processed into a network request.
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params -- intentional: this is Google's canonical pattern and requires the real Arguments object.
      window.dataLayer!.push(arguments);
    };
  }
}

/**
 * Google Consent Mode default. Must run exactly ONCE, as early as possible,
 * before any other gtag command — repeating it (as this used to do on every
 * applyConsent() call) re-queues a fresh "default: denied" command on top of
 * whatever was already granted, which is not what Google's docs recommend
 * and is unnecessary since a single default establishes the floor for the
 * whole page load.
 */
export function setDefaultGoogleConsent(): void {
  if (typeof window === "undefined" || consentDefaultSet) return;
  ensureDataLayerStub();
  window.gtag?.("consent", "default", {
    ad_storage: "denied",
    analytics_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  consentDefaultSet = true;
}

/**
 * Issues the `config` command for every configured Google destination
 * (Ads + GA4). Idempotent — safe to call repeatedly; only ever configures
 * once. `send_page_view` is explicitly disabled on both destinations so
 * gtag never fires its own implicit pageview: trackPageView() below is the
 * single, deterministic source of every page_view event, which is what
 * guarantees exactly one per eligible load/navigation instead of racing
 * gtag's built-in auto-pageview against our own.
 */
function configureGoogleDestinations() {
  if (typeof window === "undefined" || googleTagConfigured) return;
  if (!GOOGLE_ADS_ID && !GA_MEASUREMENT_ID) return;
  ensureDataLayerStub();
  window.gtag?.("js", new Date());
  if (GOOGLE_ADS_ID) window.gtag?.("config", GOOGLE_ADS_ID, { send_page_view: false });
  if (GA_MEASUREMENT_ID) window.gtag?.("config", GA_MEASUREMENT_ID, { send_page_view: false });
  googleTagConfigured = true;
}

function loadGoogleTagScript() {
  if (typeof document === "undefined") return;
  if (!GOOGLE_ADS_ID && !GA_MEASUREMENT_ID) return; // nothing configured — stay disabled

  if (googleTagLoaded || document.getElementById(GOOGLE_TAG_SCRIPT_ID)) {
    googleTagLoaded = true;
    // The script tag already exists (e.g. an earlier call injected it) but
    // config may never have actually been issued for it — always attempt
    // to configure rather than silently returning, since configureGoogleDestinations()
    // is itself idempotent and this is the only place that does so.
    configureGoogleDestinations();
    return;
  }

  ensureDataLayerStub();

  const script = document.createElement("script");
  script.id = GOOGLE_TAG_SCRIPT_ID;
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(
    GA_MEASUREMENT_ID || GOOGLE_ADS_ID!,
  )}`;
  document.head.appendChild(script);
  googleTagLoaded = true;

  configureGoogleDestinations();
}

let lastAppliedConsentSignature: string | null = null;

// Only pushes `consent update` when analytics/advertising actually changed
// since the last call — applyConsent() runs on every SPA navigation (not
// just real consent changes), so without this a nav-only re-run would push
// an identical, redundant update command every single time.
function applyGoogleConsentUpdate(prefs: ConsentPreferences) {
  if (typeof window === "undefined") return;
  const signature = `${prefs.analytics}:${prefs.advertising}`;
  if (signature === lastAppliedConsentSignature) return;
  ensureDataLayerStub();
  window.gtag?.("consent", "update", {
    analytics_storage: prefs.analytics ? "granted" : "denied",
    ad_storage: prefs.advertising ? "granted" : "denied",
    ad_user_data: prefs.advertising ? "granted" : "denied",
    ad_personalization: prefs.advertising ? "granted" : "denied",
  });
  lastAppliedConsentSignature = signature;
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
 * Callers must call trackPageView() immediately afterward (synchronously, in
 * the same effect/handler) rather than independently — this function queues
 * the `config` commands that a page_view event needs to already exist
 * before it does anything useful, so the two must run in that order every
 * time, not race each other across separate React effects.
 */
export function applyConsent(prefs: ConsentPreferences | null): void {
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
}

/**
 * Call on the initial page load and on every SPA route change, always
 * immediately after applyConsent() in the same synchronous call — this is
 * the single, deterministic source of every GA4/Meta page_view (gtag's own
 * implicit per-config pageview is disabled; see configureGoogleDestinations()).
 *
 * The GA4 event is explicitly targeted with `send_to: GA_MEASUREMENT_ID` so
 * it only ever reaches the GA4 property — never the Google Ads destination,
 * which has no use for an ordinary page_view and must not receive one.
 *
 * GA4 and Meta are deduped independently: each is only marked as "tracked
 * for this path" once its own event has actually been queued/sent. If
 * analytics consent is false (or gtag/GA4 aren't available), the GA4 side
 * is simply left untracked for that path rather than being marked done —
 * so it can still fire correctly once consent/config become available,
 * without ever double-firing once it does.
 */
export function trackPageView(pathname: string): void {
  if (typeof window === "undefined") return;

  const prefs = getConsentPreferences();
  if (!prefs) return;

  if (prefs.analytics && GA_MEASUREMENT_ID && window.gtag && lastGa4TrackedPath !== pathname) {
    window.gtag("event", "page_view", { page_path: pathname, send_to: GA_MEASUREMENT_ID });
    lastGa4TrackedPath = pathname;
  }

  if (prefs.advertising && metaPixelLoaded && lastMetaTrackedPath !== pathname) {
    window.fbq?.("track", "PageView");
    lastMetaTrackedPath = pathname;
  }
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
