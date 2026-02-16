import { useCallback, useEffect, useRef, useState } from "react";
import { Cookie, Settings, X } from "@/icons/lucide";
import { COOKIE_CATEGORIES } from "@/features/cookies/constants/cookie-categories";
import CookieCategoryToggle from "@/features/cookies/components/cookie-category-toggle";
import {
  useCookieConsent,
  type CookieCategory,
  type CookiePreferences,
} from "@/features/cookies/hooks/use-cookie-consent";

function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) {return;}
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [locked]);
}

function getFocusable(container: HTMLElement) {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href],button:not([disabled]),textarea,input,select,[tabindex]:not([tabindex="-1"])',
    ),
  ).filter(
    (el) =>
      !el.hasAttribute("disabled") &&
      el.getAttribute("aria-hidden") !== "true",
  );
}

export default function CookieConsent() {
  const {
    showBanner,
    showPreferences,
    preferences,
    acceptAll,
    rejectAll,
    saveCustomPreferences,
    showPreferencesPanel,
    hideModals,
  } = useCookieConsent();

  const modalRef = useRef<HTMLDivElement>(null);
  const prevActiveRef = useRef<HTMLElement | null>(null);

  const [visible, setVisible] = useState(false);
  const [localPrefs, setLocalPrefs] =
    useState<CookiePreferences>(preferences);

  useEffect(() => setLocalPrefs(preferences), [preferences]);

  useEffect(() => {
    if (!showBanner) {
      setVisible(false);
      return;
    }
    const frame = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(frame);
  }, [showBanner]);

  useScrollLock(showPreferences);

  useEffect(() => {
    if (!showPreferences) {return;}

    prevActiveRef.current = document.activeElement as HTMLElement | null;

    const modal = modalRef.current;
    if (!modal) {return;}

    const focusable = getFocusable(modal);
    (focusable[0] ?? modal).focus();

    function handleTabKey(e: KeyboardEvent, modal: HTMLElement) {
      const items = getFocusable(modal);
      if (items.length === 0) {return;}

      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (!active) {return;}

      if (e.shiftKey && active === first) {
        e.preventDefault();
        if (last) {
          last.focus();
        }
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        if (first) {
          first.focus();
        }
      }
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        hideModals();
        return;
      }
      if (e.key === "Tab") {
        handleTabKey(e, modal);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      const prev = prevActiveRef.current;
      if (prev && typeof prev.focus === "function") {prev.focus();}
    };
  }, [showPreferences, hideModals]);

  const onToggle = useCallback((id: CookieCategory, enabled: boolean) => {
    setLocalPrefs((p) => ({ ...p, [id]: enabled }));
  }, []);

  if (!showBanner && !showPreferences) {return null;}

  return (
    <>
      {showBanner && (
        <div
          className={[
            "fixed bottom-4 left-4 z-2000",
            "w-[min(420px,calc(100vw-2rem))]",
            "transition-all duration-300 ease-out",
            visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
          ].join(" ")}
          aria-live="polite"
        >
          <div className="card p-5 md:p-6 shadow-2xl bg-surface-elevated/85 backdrop-blur-md">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full border border-edge bg-surface/60 flex items-center justify-center">
                  <Cookie
                    size={16}
                    strokeWidth={1.8}
                    className="text-lime"
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <p className="section-label mb-0!">Privacy</p>
                  <p className="text-[11px] text-content-faint mt-1">
                    Cookies &amp; preferences
                  </p>
                </div>
              </div>

              <button
                onClick={hideModals}
                className="text-content-faint hover:text-content transition-colors p-1"
                aria-label="Dismiss cookie banner"
                type="button"
              >
                <X size={18} strokeWidth={1.6} aria-hidden="true" />
              </button>
            </div>

            <p className="mt-4 text-sm text-content-secondary leading-relaxed">
              We use cookies to improve performance and understand traffic. Choose what you allow.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button onClick={rejectAll} className="btn-outline h-10 text-xs" type="button">
                Reject all
              </button>
              <button onClick={acceptAll} className="btn-lime h-10 text-xs" type="button">
                Accept all
              </button>
              <button
                onClick={showPreferencesPanel}
                className="ml-auto inline-flex items-center gap-1.5 text-[11px] font-medium text-content-faint hover:text-content transition-colors"
                type="button"
              >
                <Settings size={12} strokeWidth={1.6} aria-hidden="true" />
                Preferences
              </button>
            </div>
          </div>
        </div>
      )}

      {showPreferences && (
        <div
          className="fixed inset-0 z-2001 bg-surface/90 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Cookie preferences"
        >
          <div
            ref={modalRef}
            tabIndex={-1}
            className="w-full max-w-2xl card shadow-2xl flex flex-col max-h-[85vh] overflow-hidden bg-surface outline-none"
          >
            <div className="p-6 border-b border-edge flex justify-between items-center bg-surface-alt">
              <h2 className="text-lg font-heading font-bold text-content tracking-tight">
                Cookie preferences
              </h2>
              <button
                onClick={hideModals}
                className="text-content-faint hover:text-content transition-colors p-1"
                aria-label="Close preferences"
                type="button"
              >
                <X size={18} strokeWidth={1.6} aria-hidden="true" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-3">
              {COOKIE_CATEGORIES.map((category) => (
                <CookieCategoryToggle
                  key={category.id}
                  category={category}
                  enabled={localPrefs[category.id]}
                  onChange={onToggle}
                  disabled={category.required}
                />
              ))}
            </div>

            <div className="p-6 border-t border-edge bg-surface-alt flex items-center justify-between gap-3">
              <button onClick={rejectAll} className="btn-outline h-10 text-xs" type="button">
                Reject all
              </button>
              <button
                onClick={() => saveCustomPreferences(localPrefs)}
                className="btn-lime h-10 text-xs"
                type="button"
              >
                Save preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
