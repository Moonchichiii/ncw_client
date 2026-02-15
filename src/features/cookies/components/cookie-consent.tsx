import { memo, useEffect, useState, useCallback } from "react";
import { X, Settings } from "@/icons/lucide";
import type {
  CookieCategory,
  CookiePreferences,
} from "@/features/cookies/hooks/use-cookie-consent";
import CookieCategoryToggle from "@/features/cookies/components/cookie-category-toggle";
import { COOKIE_CATEGORIES } from "@/features/cookies/constants/cookie-categories";

interface CookieConsentProps {
  showBanner: boolean;
  showPreferences: boolean;
  preferences: CookiePreferences;
  acceptAll: () => void;
  rejectAll: () => void;
  saveCustomPreferences: (prefs: CookiePreferences) => void;
  showPreferencesPanel: () => void;
  hideModals: () => void;
}

const CookieConsent = memo<CookieConsentProps>((props) => {
  const {
    showBanner,
    showPreferences,
    preferences,
    acceptAll,
    rejectAll,
    saveCustomPreferences,
    showPreferencesPanel,
    hideModals,
  } = props;

  const [isVisible, setIsVisible] = useState(false);
  const [localPreferences, setLocalPreferences] =
    useState<CookiePreferences>(preferences);

  useEffect(() => {
    setLocalPreferences(preferences);
  }, [preferences]);

  useEffect(() => {
    if (showBanner) {
      const timer = setTimeout(() => setIsVisible(true), 500);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [showBanner]);

  const handleCategoryChange = useCallback(
    (id: CookieCategory, enabled: boolean) => {
      setLocalPreferences((prev) => ({
        ...prev,
        [id]: enabled,
      }));
    },
    [],
  );

  if (!showBanner && !showPreferences) {
    return null;
  }

  return (
    <>
      {/* BANNER */}
      {showBanner && (
        <div
          className={`fixed bottom-0 right-0 z-2000 w-full max-w-md p-4 transition-transform duration-500 ${
            isVisible ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="card p-6 relative shadow-2xl">
            <div className="flex justify-between items-start mb-4">
              <p className="section-label text-[10px]">
                Privacy
              </p>
              <button
                onClick={hideModals}
                className="text-content-faint hover:text-content transition-colors"
                aria-label="Close cookie banner"
              >
                <X size={16} strokeWidth={1.6} />
              </button>
            </div>

            <p className="text-sm text-content-secondary mb-6 leading-relaxed">
              We use cookies to enhance performance and
              analyze traffic. You can customize your
              preferences below.
            </p>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={rejectAll}
                className="btn-outline h-10 text-xs"
              >
                Reject all
              </button>
              <button
                onClick={acceptAll}
                className="btn-lime h-10 text-xs"
              >
                Accept all
              </button>
            </div>

            <button
              onClick={showPreferencesPanel}
              className="mt-4 w-full text-center text-[11px] font-medium text-content-faint hover:text-content transition-colors flex items-center justify-center gap-1.5"
            >
              <Settings
                size={12}
                strokeWidth={1.6}
                aria-hidden="true"
              />
              Customize preferences
            </button>
          </div>
        </div>
      )}

      {/* PREFERENCES MODAL */}
      {showPreferences && (
        <div className="fixed inset-0 z-2001 bg-surface/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl card shadow-2xl flex flex-col max-h-[85vh] overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-edge flex justify-between items-center bg-surface-alt">
              <h2 className="text-sm font-heading font-bold text-content tracking-tight">
                Privacy Preferences
              </h2>
              <button
                onClick={hideModals}
                className="text-content-faint hover:text-content transition-colors"
                aria-label="Close preferences panel"
              >
                <X size={18} strokeWidth={1.6} />
              </button>
            </div>

            {/* Categories */}
            <div className="p-6 overflow-y-auto space-y-3">
              {COOKIE_CATEGORIES.map((category) => (
                <CookieCategoryToggle
                  key={category.id}
                  category={category}
                  enabled={
                    localPreferences[
                      category.id as keyof CookiePreferences
                    ]
                  }
                  onChange={handleCategoryChange}
                  disabled={category.required}
                />
              ))}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-edge bg-surface-alt flex justify-end">
              <button
                onClick={() =>
                  saveCustomPreferences(localPreferences)
                }
                className="btn-lime h-10 text-xs"
              >
                Save preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
});

CookieConsent.displayName = "CookieConsent";
export default CookieConsent;