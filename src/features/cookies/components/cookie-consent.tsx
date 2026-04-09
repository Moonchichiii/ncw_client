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
    if (!locked) {
      return;
    }
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
      !el.hasAttribute("disabled") && el.getAttribute("aria-hidden") !== "true",
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
  const [localPrefs, setLocalPrefs] = useState<CookiePreferences>(preferences);

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
    if (!showPreferences) {
      return;
    }

    // Reset local preferences when the modal opens
    setLocalPrefs(preferences);

    prevActiveRef.current = document.activeElement as HTMLElement | null;

    const modal = modalRef.current;
    if (!modal) {
      return;
    }

    const focusable = getFocusable(modal);
    (focusable[0] ?? modal).focus();

    function handleTabKey(e: KeyboardEvent, modal: HTMLElement) {
      const items = getFocusable(modal);
      if (items.length === 0) {
        return;
      }

      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (!active) {
        return;
      }

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
      if (prev && typeof prev.focus === "function") {
        prev.focus();
      }
    };
  }, [showPreferences, preferences, hideModals]);

  const onToggle = useCallback((id: CookieCategory, enabled: boolean) => {
    setLocalPrefs((p) => ({ ...p, [id]: enabled }));
  }, []);

  if (!showBanner && !showPreferences) {
    return null;
  }

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
          <div className="card bg-surface-elevated/85 shadow-2xl backdrop-blur-md p-5 md:p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="border-edge bg-surface/60 flex h-9 w-9 items-center justify-center rounded-full border">
                  <Cookie
                    size={16}
                    strokeWidth={1.8}
                    className="text-lime"
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <p className="section-label mb-0!">Privacy</p>
                  <p className="text-content-faint mt-1 text-[11px]">
                    Cookies &amp; preferences
                  </p>
                </div>
              </div>

              <button
                onClick={hideModals}
                className="text-content-faint hover:text-content p-1 transition-colors"
                aria-label="Dismiss cookie banner"
                type="button"
              >
                <X size={18} strokeWidth={1.6} aria-hidden="true" />
              </button>
            </div>

            <p className="text-content-secondary mt-4 text-sm leading-relaxed">
              We use cookies to improve performance and understand traffic.
              Choose what you allow.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button
                onClick={rejectAll}
                className="btn-outline h-10 text-xs"
                type="button"
              >
                Reject all
              </button>
              <button
                onClick={acceptAll}
                className="btn-lime h-10 text-xs"
                type="button"
              >
                Accept all
              </button>
              <button
                onClick={showPreferencesPanel}
                className="text-content-faint hover:text-content ml-auto inline-flex items-center gap-1.5 text-[11px] font-medium transition-colors"
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
          className="bg-surface/90 fixed inset-0 z-2001 flex items-center justify-center p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Cookie preferences"
        >
          <div
            ref={modalRef}
            tabIndex={-1}
            className="card bg-surface flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden shadow-2xl outline-none"
          >
            <div className="border-edge bg-surface-alt flex items-center justify-between border-b p-6">
              <h2 className="font-heading text-content text-lg font-bold tracking-tight">
                Cookie preferences
              </h2>
              <button
                onClick={hideModals}
                className="text-content-faint hover:text-content p-1 transition-colors"
                aria-label="Close preferences"
                type="button"
              >
                <X size={18} strokeWidth={1.6} aria-hidden="true" />
              </button>
            </div>

            <div className="space-y-3 overflow-y-auto p-6">
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

            <div className="border-edge bg-surface-alt flex items-center justify-between gap-3 border-t p-6">
              <button
                onClick={rejectAll}
                className="btn-outline h-10 text-xs"
                type="button"
              >
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