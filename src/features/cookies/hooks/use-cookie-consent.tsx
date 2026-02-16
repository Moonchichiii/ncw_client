/* eslint-disable react-refresh/only-export-components */

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";


/*  Types */


export type CookieCategory =
  | "necessary"
  | "analytics"
  | "marketing"
  | "preferences";

export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

interface CookieConsentState {
  hasConsented: boolean;
  preferences: CookiePreferences;
  consentDate: string | null;
  showBanner: boolean;
  showPreferences: boolean;
}

interface CookieConsentActions {
  acceptAll: () => void;
  rejectAll: () => void;
  saveCustomPreferences: (prefs: CookiePreferences) => void;
  showPreferencesPanel: () => void;
  hideModals: () => void;
  resetConsent: () => void;
  isCategoryEnabled: (category: CookieCategory) => boolean;
  getConsentStatus: () => {
    hasConsented: boolean;
    analytics: boolean;
    marketing: boolean;
    preferences: boolean;
    consentDate: string | null;
  };
}

type CookieConsentContextValue = CookieConsentState &
  CookieConsentActions;


/*  Constants */


const STORAGE_KEY = "ncw-cookie-consent";
const CONSENT_VERSION = "1.0";

const DEFAULT_PREFERENCES: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
  preferences: false,
};

const DEFAULT_STATE: CookieConsentState = {
  hasConsented: false,
  preferences: DEFAULT_PREFERENCES,
  consentDate: null,
  showBanner: true,
  showPreferences: false,
};


/*  Lazy initializer — synchronous, zero flicker, SSR-safe */


function getInitialState(): CookieConsentState {
  if (typeof window === "undefined") {return DEFAULT_STATE;}

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved) as {
        version?: string;
        preferences?: Partial<CookiePreferences>;
        consentDate?: string | null;
      };
      if (parsed.version === CONSENT_VERSION) {
        return {
          hasConsented: true,
          preferences: {
            ...DEFAULT_PREFERENCES,
            ...(parsed.preferences ?? {}),
          },
          consentDate: parsed.consentDate ?? null,
          showBanner: false,
          showPreferences: false,
        };
      }
    }
  } catch {
    /* localStorage unavailable — fall through to banner */
  }

  return DEFAULT_STATE;
}

/*  Persist helper — pure function, no hook overhead                   */

function persistConsent(preferences: CookiePreferences): void {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        version: CONSENT_VERSION,
        preferences,
        consentDate: new Date().toISOString(),
      }),
    );
  } catch {
    /* ignore */
  }
}
/*  Context */

const CookieConsentContext =
  createContext<CookieConsentContextValue | null>(null);

  /*  Provider  */


export function CookieConsentProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [state, setState] =
    useState<CookieConsentState>(getInitialState);

  const acceptAll = useCallback(() => {
    const prefs: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    };
    setState({
      hasConsented: true,
      preferences: prefs,
      consentDate: new Date().toISOString(),
      showBanner: false,
      showPreferences: false,
    });
    persistConsent(prefs);
  }, []);

  const rejectAll = useCallback(() => {
    const prefs: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
    };
    setState({
      hasConsented: true,
      preferences: prefs,
      consentDate: new Date().toISOString(),
      showBanner: false,
      showPreferences: false,
    });
    persistConsent(prefs);
  }, []);

  const saveCustomPreferences = useCallback(
    (prefs: CookiePreferences) => {
      const safe: CookiePreferences = {
        ...prefs,
        necessary: true,
      };
      setState({
        hasConsented: true,
        preferences: safe,
        consentDate: new Date().toISOString(),
        showBanner: false,
        showPreferences: false,
      });
      persistConsent(safe);
    },
    [],
  );

  const showPreferencesPanel = useCallback(() => {
    setState((prev) => ({
      ...prev,
      showPreferences: true,
      showBanner: false,
    }));
  }, []);

  const hideModals = useCallback(() => {
    setState((prev) => ({
      ...prev,
      showBanner: false,
      showPreferences: false,
    }));
  }, []);

  const resetConsent = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    setState({
      hasConsented: false,
      preferences: DEFAULT_PREFERENCES,
      consentDate: null,
      showBanner: true,
      showPreferences: false,
    });
  }, []);

  const isCategoryEnabled = useCallback(
    (category: CookieCategory) => state.preferences[category],
    [state.preferences],
  );

  const getConsentStatus = useCallback(
    () => ({
      hasConsented: state.hasConsented,
      analytics: state.preferences.analytics,
      marketing: state.preferences.marketing,
      preferences: state.preferences.preferences,
      consentDate: state.consentDate,
    }),
    [state.hasConsented, state.preferences, state.consentDate],
  );

  const value = useMemo<CookieConsentContextValue>(
    () => ({
      ...state,
      acceptAll,
      rejectAll,
      saveCustomPreferences,
      showPreferencesPanel,
      hideModals,
      resetConsent,
      isCategoryEnabled,
      getConsentStatus,
    }),
    [
      state,
      acceptAll,
      rejectAll,
      saveCustomPreferences,
      showPreferencesPanel,
      hideModals,
      resetConsent,
      isCategoryEnabled,
      getConsentStatus,
    ],
  );

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
    </CookieConsentContext.Provider>
  );
}

/*  Hook  */
export function useCookieConsent(): CookieConsentContextValue {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) {
    throw new Error(
      "useCookieConsent must be used within <CookieConsentProvider>",
    );
  }
  return ctx;
}