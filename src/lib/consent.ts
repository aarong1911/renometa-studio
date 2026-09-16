// src/lib/consent.ts
//
// Single source of truth for cookie-consent state. Framework-agnostic (no
// React import) so it can be read from both React components and the
// tracking module without prop-drilling. Persists to localStorage under
// `renometa_consent_preferences`.

export type ConsentPreferences = {
  essential: true;
  analytics: boolean;
  advertising: boolean;
  updatedAt: string;
};

export type ConsentState =
  | { status: "unknown" } // not yet hydrated (SSR, or before the client effect runs)
  | { status: "unset" } // hydrated; no valid stored decision — banner should show
  | { status: "set"; preferences: ConsentPreferences };

const STORAGE_KEY = "renometa_consent_preferences";
// Bump this if the stored shape ever changes in a way that should force a
// fresh decision from visitors (their old consent record becomes invalid).
const STORAGE_VERSION = 1;

let state: ConsentState = { status: "unknown" };
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

export function subscribeConsent(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getConsentState(): ConsentState {
  return state;
}

export function getConsentPreferences(): ConsentPreferences | null {
  return state.status === "set" ? state.preferences : null;
}

function readStoredConsent(): ConsentPreferences | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<ConsentPreferences & { version: number }>;
    if (
      parsed &&
      parsed.essential === true &&
      typeof parsed.analytics === "boolean" &&
      typeof parsed.advertising === "boolean" &&
      typeof parsed.updatedAt === "string" &&
      parsed.version === STORAGE_VERSION
    ) {
      return {
        essential: true,
        analytics: parsed.analytics,
        advertising: parsed.advertising,
        updatedAt: parsed.updatedAt,
      };
    }
    return null;
  } catch {
    // Malformed JSON or storage access blocked — treat as "no valid consent".
    return null;
  }
}

/**
 * Reads localStorage and updates in-memory state. Call once on the client
 * after mount. Idempotent and safe to call more than once (e.g. StrictMode).
 */
export function hydrateConsent(): void {
  if (typeof window === "undefined") return;
  const stored = readStoredConsent();
  state = stored ? { status: "set", preferences: stored } : { status: "unset" };
  emit();
}

export function setConsent(partial: {
  analytics: boolean;
  advertising: boolean;
}): ConsentPreferences {
  const preferences: ConsentPreferences = {
    essential: true,
    analytics: partial.analytics,
    advertising: partial.advertising,
    updatedAt: new Date().toISOString(),
  };
  state = { status: "set", preferences };
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ ...preferences, version: STORAGE_VERSION }),
      );
    } catch {
      // Private browsing / quota exceeded — the in-memory decision still
      // applies for the rest of this session, it just won't persist.
    }
  }
  emit();
  return preferences;
}

// Lets the footer (or anything else) reopen the Preferences dialog without
// needing context/prop-drilling to reach the manager mounted at the root.
let openHandler: (() => void) | null = null;

export function registerOpenPreferencesHandler(fn: (() => void) | null): void {
  openHandler = fn;
}

export function openCookiePreferences(): void {
  openHandler?.();
}
