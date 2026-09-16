import { useSyncExternalStore } from "react";
import { getConsentState, subscribeConsent, type ConsentState } from "@/lib/consent";

const SERVER_SNAPSHOT: ConsentState = { status: "unknown" };

/** SSR-safe subscription to the global consent store. */
export function useConsentState(): ConsentState {
  return useSyncExternalStore(subscribeConsent, getConsentState, () => SERVER_SNAPSHOT);
}
