import { useCallback, useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Cookie } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { useConsentState } from "@/hooks/use-consent";
import { hydrateConsent, registerOpenPreferencesHandler, setConsent } from "@/lib/consent";
import { applyConsent, trackPageView } from "@/lib/tracking";

type Draft = { analytics: boolean; advertising: boolean };

const DEFAULT_DRAFT: Draft = { analytics: false, advertising: false };

/**
 * Mounted once at the app root. Owns the consent banner + preferences
 * dialog, hydrates stored consent on mount, and is the only place that
 * calls applyConsent()/trackPageView() so tracking stays centralized.
 */
export function CookieConsentManager({ pathname }: { pathname: string }) {
  const state = useConsentState();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [draft, setDraft] = useState<Draft>(DEFAULT_DRAFT);

  // Hydrate stored consent from localStorage once on the client.
  useEffect(() => {
    hydrateConsent();
  }, []);

  // Apply consent and track the page view in ONE effect, in that exact
  // order, every time either the consent decision OR the route changes.
  //
  // These used to be two separate effects (one keyed on `state`, one keyed
  // on `pathname`). That let them fire out of order across renders: on a
  // returning visitor, consent hydrates synchronously on mount, so
  // getConsentPreferences() already returned granted by the time the
  // pathname-keyed effect ran in that SAME commit — but the state-keyed
  // effect hadn't run yet (React only re-renders with the new `state` value
  // on a later commit), so trackPageView() fired first, found `window.gtag`
  // didn't exist yet (applyConsent/loadGoogleTagScript hadn't run), silently
  // sent nothing, and still marked the pathname as "already tracked" —
  // permanently swallowing the initial GA4 page_view. Combining them into
  // one effect guarantees applyConsent() (which queues the `config` calls)
  // always completes before trackPageView() (which queues the page_view
  // event) runs, so the event is never queued ahead of the config it needs.
  // applyConsent() re-runs on every navigation (pathname is a dependency),
  // not just on real consent changes — that's intentional, for the ordering
  // guarantee above. It's safe to call repeatedly with unchanged values:
  // script/pixel loading is guarded idempotent, and applyGoogleConsentUpdate()
  // (tracking.ts) skips re-issuing `consent update` when analytics/advertising
  // haven't actually changed since the last call.
  useEffect(() => {
    if (state.status === "unknown") return;
    applyConsent(state.status === "set" ? state.preferences : null);
    trackPageView(pathname);
  }, [state, pathname]);

  const openPreferences = useCallback(() => {
    setDraft(
      state.status === "set"
        ? { analytics: state.preferences.analytics, advertising: state.preferences.advertising }
        : DEFAULT_DRAFT,
    );
    setDialogOpen(true);
  }, [state]);

  // Let the footer (or anything else) reopen preferences without prop-drilling.
  useEffect(() => {
    registerOpenPreferencesHandler(openPreferences);
    return () => registerOpenPreferencesHandler(null);
  }, [openPreferences]);

  const acceptAll = useCallback(() => {
    setConsent({ analytics: true, advertising: true });
    setDialogOpen(false);
  }, []);

  const rejectNonEssential = useCallback(() => {
    setConsent({ analytics: false, advertising: false });
    setDialogOpen(false);
  }, []);

  const savePreferences = useCallback(() => {
    setConsent(draft);
    setDialogOpen(false);
  }, [draft]);

  const showBanner = state.status === "unset" && !dialogOpen;

  return (
    <>
      {showBanner && (
        <ConsentBanner
          onAcceptAll={acceptAll}
          onRejectNonEssential={rejectNonEssential}
          onOpenPreferences={openPreferences}
        />
      )}
      <PreferencesDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        draft={draft}
        onChangeDraft={setDraft}
        onSave={savePreferences}
        onAcceptAll={acceptAll}
        onRejectNonEssential={rejectNonEssential}
      />
    </>
  );
}

function ConsentBanner({
  onAcceptAll,
  onRejectNonEssential,
  onOpenPreferences,
}: {
  onAcceptAll: () => void;
  onRejectNonEssential: () => void;
  onOpenPreferences: () => void;
}) {
  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[60] sm:inset-x-auto sm:bottom-6 sm:left-6 sm:max-w-sm animate-reveal"
    >
      <div className="rounded-t-2xl border border-border bg-surface-elevated p-5 shadow-elegant sm:rounded-2xl sm:p-6">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-surface">
            <Cookie className="h-4 w-4 text-gold" strokeWidth={1.75} />
          </div>
          <p className="text-[13.5px] leading-relaxed text-muted-foreground">
            We use cookies to understand site usage and personalize advertising. You can accept all
            cookies, reject non-essential cookies, or manage your preferences.{" "}
            <Link to="/privacy-policy" className="underline hover:text-foreground">
              Privacy Policy
            </Link>
          </p>
        </div>
        <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:flex-wrap">
          <button
            type="button"
            onClick={onRejectNonEssential}
            className="btn-ghost flex-1 justify-center text-[13px] px-3 py-2"
          >
            Reject Non-Essential
          </button>
          <button
            type="button"
            onClick={onOpenPreferences}
            className="btn-ghost flex-1 justify-center text-[13px] px-3 py-2"
          >
            Preferences
          </button>
          <button
            type="button"
            onClick={onAcceptAll}
            className="btn-primary flex-1 justify-center text-[13px] px-3 py-2"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}

function PreferencesDialog({
  open,
  onOpenChange,
  draft,
  onChangeDraft,
  onSave,
  onAcceptAll,
  onRejectNonEssential,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  draft: Draft;
  onChangeDraft: (draft: Draft) => void;
  onSave: () => void;
  onAcceptAll: () => void;
  onRejectNonEssential: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-2xl border-border bg-surface-elevated shadow-elegant sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display text-xl font-semibold tracking-tight text-foreground">
            Cookie Preferences
          </DialogTitle>
          <DialogDescription className="text-[13.5px] leading-relaxed text-muted-foreground">
            Choose which optional cookies RenoMeta can use. Essential cookies are always active
            because the site can't function without them. See our{" "}
            <Link to="/privacy-policy" className="underline hover:text-foreground">
              Privacy Policy
            </Link>{" "}
            for details.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <PreferenceRow
            title="Essential"
            description="Required for core site functionality like navigation and security. These cannot be disabled."
            checked={true}
            disabled
            onCheckedChange={() => {}}
            labelSuffix="Always active"
          />
          <PreferenceRow
            title="Analytics"
            description="Helps us understand how visitors use the site so we can improve it. Controls GA4 analytics storage, when configured."
            checked={draft.analytics}
            onCheckedChange={(checked) => onChangeDraft({ ...draft, analytics: checked })}
          />
          <PreferenceRow
            title="Advertising"
            description="Used for advertising, retargeting, and campaign measurement with Meta (Facebook/Instagram) and Google Ads. Partners may receive limited identifiers, which may be hashed, to match audiences and measure results."
            checked={draft.advertising}
            onCheckedChange={(checked) => onChangeDraft({ ...draft, advertising: checked })}
          />
        </div>

        <DialogFooter className="flex-col-reverse gap-2 sm:flex-row sm:justify-between sm:space-x-0">
          <div className="flex flex-col-reverse gap-2 sm:flex-row">
            <button
              type="button"
              onClick={onRejectNonEssential}
              className="btn-ghost justify-center text-[13px] px-3.5 py-2"
            >
              Reject Non-Essential
            </button>
            <button
              type="button"
              onClick={onAcceptAll}
              className="btn-ghost justify-center text-[13px] px-3.5 py-2"
            >
              Accept All
            </button>
          </div>
          <button
            type="button"
            onClick={onSave}
            className="btn-primary justify-center text-[13px] px-4 py-2"
          >
            Save Preferences
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function PreferenceRow({
  title,
  description,
  checked,
  disabled,
  onCheckedChange,
  labelSuffix,
}: {
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onCheckedChange: (checked: boolean) => void;
  labelSuffix?: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-xl border border-border bg-background p-4">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-[14px] font-medium text-foreground">{title}</span>
          {labelSuffix && (
            <span className="text-[10.5px] uppercase tracking-[0.12em] text-muted-foreground">
              {labelSuffix}
            </span>
          )}
        </div>
        <p className="mt-1 text-[12.5px] leading-relaxed text-muted-foreground">{description}</p>
      </div>
      <Switch
        checked={checked}
        disabled={disabled}
        onCheckedChange={onCheckedChange}
        aria-label={`${title} cookies`}
        className="mt-0.5 shrink-0 data-[state=checked]:bg-gold"
      />
    </div>
  );
}
