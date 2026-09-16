# Retargeting & Cookie Consent

Consent-gated retargeting for Meta/Facebook/Instagram and Google Ads, plus
optional GA4 and first-party UTM attribution. No visitor names, emails,
phone numbers, or form contents are ever sent to any advertising provider —
this is deliberately not an identity-matching system.

## 1. Environment variables

All three are public, browser-side IDs (not secrets) but are still read only
from env vars — never hardcoded. Each is independently optional; the
corresponding integration simply stays disabled if its ID is unset, with no
errors anywhere.

```env
VITE_META_PIXEL_ID=       # Meta Events Manager pixel ID
VITE_GOOGLE_ADS_ID=       # Google Ads tag, format AW-XXXXXXXXX
VITE_GA_MEASUREMENT_ID=   # Optional GA4 property, format G-XXXXXXXXXX
```

Set these as Netlify build environment variables (they're `VITE_`-prefixed,
so they're inlined at build time, same as `VITE_TURNSTILE_SITE_KEY`).

**Note:** this replaces a previously hardcoded, unconditional Google Ads tag
(`AW-18404601190`) that lived directly in `src/routes/__root.tsx` and loaded
with no consent gating at all. That ID must now be set via
`VITE_GOOGLE_ADS_ID` in Netlify's environment — the old hardcoded value has
been removed from source.

## 2. Where tracking is initialized

- `src/lib/tracking.ts` — the only place that ever loads `gtag.js` or Meta's
  `fbevents.js`, ever calls `gtag(...)`/`fbq(...)`, or knows the env vars.
  Everything else in the app calls its exported functions instead of
  touching `window.gtag`/`window.fbq` directly.
- `src/lib/consent.ts` — the consent store (localStorage-backed, framework
  agnostic). Single source of truth for what the visitor has agreed to.
- `src/lib/attribution.ts` — first-party UTM/referrer capture, independent
  of the consent/tracking system (see §7).
- `src/components/cookie-consent.tsx` — `CookieConsentManager`, mounted
  once in `src/routes/__root.tsx`'s `RootComponent`. Owns the banner +
  preferences dialog, hydrates stored consent on mount, and is the only
  component that calls `applyConsent()` / `trackPageView()`.
- Everywhere else (nav links, pricing page, contact form) only ever calls
  `trackEvent(name, properties)` from `src/lib/tracking.ts`.

## 3. Event names

| RenoMeta event    | Fires when                                              | Google (custom event) | Meta                          |
| ------------------ | -------------------------------------------------------- | ---------------------- | ------------------------------ |
| `pricing_view`      | `/pricing` route mounts                                  | `pricing_view`         | `ViewContent` (standard)       |
| `try_agent`         | Visitor clicks a "Try Agent Live" CTA (nav, mobile nav, homepage section) | `try_agent`             | `Lead` (standard)              |
| `contact_submit`    | Contact form's POST to `/.netlify/functions/contact` succeeds — never on click | `contact_submit`       | `Lead` (standard)              |
| `trial_start`       | Visitor clicks "Start Free" on `/pricing` (opens `connect.renometa.com/signup`) | `trial_start`           | `TrialStart` (**custom** — `InitiateCheckout` would misrepresent a free, no-payment signup) |
| `trial_complete`    | **Not wired — see §6**                                   | `trial_complete`       | `CompleteRegistration` (standard) |

Event properties are non-identifying only (`{ page, source, plan }`-shaped).
`trackEvent()` also strips any property whose key matches
`/email|phone|name|address|message|company|contact|street|zip|postal/i` as a
defense-in-depth safety net, even though callers shouldn't pass those in the
first place.

## 4. How consent works

Three categories, stored as:

```ts
type ConsentPreferences = {
  essential: true; // always on, not user-toggleable
  analytics: boolean;
  advertising: boolean;
  updatedAt: string;
};
```

in `localStorage` under **`renometa_consent_preferences`**.

- **New visitor** (nothing stored, or a malformed/invalid stored value):
  banner shows. Google Consent Mode defaults to fully `denied`
  (`ad_storage`, `analytics_storage`, `ad_user_data`, `ad_personalization`)
  before anything else happens. Neither `gtag.js` nor Meta's pixel script is
  loaded yet.
- **Accept All**: `analytics: true, advertising: true` saved; `gtag.js`
  loads (if an ID is configured) with consent updated to granted; Meta
  Pixel loads (if configured) and fires its first `PageView`.
- **Reject Non-Essential**: `analytics: false, advertising: false` saved.
  Consent stays denied; neither script loads.
- **Preferences → Save**: same as above but per-category, independently.
- Returning visitors with a valid stored decision never see the banner
  again; `applyConsent()` re-establishes their choice on every load.
- **Cookie Preferences** in the footer reopens the dialog at any time via
  `openCookiePreferences()` (`src/lib/consent.ts`), pre-filled with the
  visitor's current choice.
- Turning Advertising back **off** stops our application from sending any
  further Meta/Google-ad events (every `trackEvent`/`trackPageView` call
  checks current consent first) and sets Google's ad-related consent
  signals back to `denied`. It does **not** retroactively delete any
  cookies the pixel may have already set while it was on — that's outside
  what a client-side toggle can do; see Meta's own cookie-deletion guidance
  if that's ever required.

Google Consent Mode is designed so `gtag.js` itself can load once
*either* Analytics or Advertising is granted — the script honors the
per-signal denied/granted state internally rather than needing to be kept
unloaded. Meta Pixel has no equivalent built-in gating, so it is only ever
loaded after **Advertising** is specifically granted (never Analytics
alone).

## 5. How to test Meta Pixel

1. Set `VITE_META_PIXEL_ID` locally (`.env`) and run `npm run dev`.
2. Install the [Meta Pixel Helper](https://chromewebstore.google.com/detail/meta-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc) Chrome extension.
3. Load the site — Pixel Helper should show **no pixel firing** yet.
4. Accept All (or Preferences → Advertising on → Save). Pixel Helper should
   now show the base pixel + one `PageView`.
5. Navigate to another route client-side (no full reload) — Pixel Helper
   should show exactly one more `PageView`, not zero and not duplicated.
6. Trigger `contact_submit`/`try_agent`/`trial_start` (submit the contact
   form, click a Try Agent CTA, click Start Free on pricing) and confirm
   the matching event appears (`Lead`, `Lead`, `TrialStart` respectively).
7. In Meta Events Manager (Test Events tab, using the Pixel Helper's/browser
   session), confirm the same events arrive server-side.

## 6. How to test Google tags / Consent Mode

1. Set `VITE_GOOGLE_ADS_ID` (and optionally `VITE_GA_MEASUREMENT_ID`)
   locally and run `npm run dev`.
2. Open DevTools → Network, filter for `gtag/js` — it should **not** load
   until you accept Analytics or Advertising.
3. Open DevTools → Console and inspect `window.dataLayer` — the very first
   entries should be a `consent`/`default` command with everything
   `denied`, pushed before any `config` call.
4. Accept All → `gtag/js` loads, and a `consent`/`update` command with the
   granted fields appears in `dataLayer`.
5. Use the [Tag Assistant](https://tagassistant.google.com/) or GA4
   DebugView to confirm `pricing_view` / `try_agent` / `contact_submit` /
   `trial_start` custom events arrive, and that Consent Mode shows
   `ad_storage`/`analytics_storage` matching what you accepted.
6. Reject Non-Essential → reload → confirm `gtag/js` never loads and no
   events fire.

## 7. Where UTM attribution is stored

`src/lib/attribution.ts` — captured once, client-side, into `localStorage`
under **`renometa_attribution`**:

```ts
type Attribution = {
  utmSource, utmMedium, utmCampaign, utmContent, utmTerm: string | null;
  referrer: string | null;
  landingPage: string;
  capturedAt: string;
};
```

It captures on first relevant visit and is **never overwritten** by later
visits/navigations. This is independent of the cookie-consent system (it's
first-party storage, never sent to Google/Meta) and is captured
unconditionally in `RootComponent` via `captureAttributionOnce()`.

**Wired in:** the contact form (`src/components/contact-form.tsx`) now
includes `attribution: getAttribution()` in its POST body to
`/.netlify/functions/contact`, and `netlify/functions/contact.js` forwards
it as an additional `attribution` field in the payload sent to the Make.com
webhook (purely additive — existing fields/behavior for any other caller of
that function are unchanged).

**Not wired in (documented, not fabricated):** the actual trial signup form
lives on `connect.renometa.com`, a separate app/domain outside this
repository, so there is no local form to attach attribution to. When that
signup flow is ready to accept it, the cleanest approach is: read
`localStorage["renometa_attribution"]` from that app (if same top-level
site/cookie policy allows), or pass it via query params on the "Start Free"
link. The link is `https://connect.renometa.com/signup` in
`src/routes/pricing.tsx`.

## 8. Manual configuration required

### Meta Events Manager
- Create/confirm the Pixel in Events Manager, get its ID for
  `VITE_META_PIXEL_ID`.
- Confirm the standard events used here (`ViewContent`, `Lead`,
  `CompleteRegistration`) and the custom `TrialStart` event show up under
  Test Events once traffic flows, and map them to Ads campaigns as needed.
- No Advanced Matching (email/phone/name) is configured — if that's wanted
  later it's a deliberate, separate decision (it sends hashed PII to Meta).

### Google Ads / GA4
- Confirm `VITE_GOOGLE_ADS_ID` matches the Google Ads account's tag.
- In Google Ads → Goals → Conversions, mark which custom events
  (`try_agent`, `contact_submit`, `trial_start`, `trial_complete`) should
  count as conversions, and set values if desired.
- If GA4 is used, link the GA4 property to the same Google Ads account for
  audience sharing.
- Existing note preserved from the code: qualified-lead conversions are
  uploaded separately from RenoMeta Connect through the Google Ads API —
  this client-side tag intentionally does not duplicate that pipeline.

### `trial_complete` — integration point, not implemented
Actual signup completion happens on `connect.renometa.com`, outside this
repository, so there is no reliable signal here to confirm a trial actually
completed. Rather than fabricate a conversion, `trackEvent("trial_complete", ...)`
is fully implemented and mapped (`CompleteRegistration` on Meta, custom
`trial_complete` on Google) but is **never called** anywhere in this repo.
Wire it in from wherever the Connect app can confirm a completed signup —
options, roughly in order of reliability:
  - Server-side: Google Ads [Conversion Uploads API](https://developers.google.com/google-ads/api/docs/conversions/upload-clicks) /
    Meta [Conversions API](https://developers.facebook.com/docs/marketing-api/conversions-api) from the Connect backend once a trial is confirmed
    (most reliable — matches the existing "conversions uploaded separately via the Google Ads API" pipeline already noted in `__root.tsx`).
  - Client-side: if Connect redirects back to a RenoMeta.com confirmation
    route after a verified signup, that route could call `trackEvent("trial_complete", ...)`.

## 9. Explicitly out of scope / not added

Per the implementation brief: no Hotjar, Clarity, PostHog, Segment,
Mixpanel, or other analytics products; no consent-management npm package
(this is a native React implementation reusing the existing `Dialog`/
`Switch` primitives); no browser fingerprinting or hidden identification;
no advanced matching.
