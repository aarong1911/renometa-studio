// src/lib/attribution.ts
//
// Lightweight first-party attribution capture: on a visitor's first
// relevant visit, records UTM params + referrer + landing page so RenoMeta
// can later learn where trials/customers originated. First-party
// localStorage only — nothing here is sent to Google or Meta.

export type Attribution = {
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmContent: string | null;
  utmTerm: string | null;
  referrer: string | null;
  landingPage: string;
  capturedAt: string;
};

const STORAGE_KEY = "renometa_attribution";

function readParam(params: URLSearchParams, key: string): string | null {
  const value = params.get(key);
  return value && value.trim().length > 0 ? value.trim() : null;
}

/**
 * Captures attribution once per visitor and never overwrites it — later
 * visits (including ones with different or no UTM params) leave the
 * original attribution record untouched. Safe to call on every page load;
 * it's a no-op after the first successful capture.
 */
export function captureAttributionOnce(): void {
  if (typeof window === "undefined") return;
  try {
    if (window.localStorage.getItem(STORAGE_KEY)) return;

    const params = new URLSearchParams(window.location.search);
    const attribution: Attribution = {
      utmSource: readParam(params, "utm_source"),
      utmMedium: readParam(params, "utm_medium"),
      utmCampaign: readParam(params, "utm_campaign"),
      utmContent: readParam(params, "utm_content"),
      utmTerm: readParam(params, "utm_term"),
      referrer: document.referrer || null,
      landingPage: window.location.pathname + window.location.search,
      capturedAt: new Date().toISOString(),
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
  } catch {
    // Storage unavailable (private browsing, quota) — attribution simply
    // won't be available this session; nothing else depends on it.
  }
}

export function getAttribution(): Attribution | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Attribution) : null;
  } catch {
    return null;
  }
}
