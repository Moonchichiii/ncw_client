import { useEffect } from "react";
import { useCookieConsent } from "@/features/cookies/hooks/use-cookie-consent";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

const GA_ID = "GA_MEASUREMENT_ID";

export const initializeAnalytics = (consentStatus: {
  analytics: boolean;
  marketing: boolean;
}) => {
  removeAnalyticsScripts();

  if (consentStatus.analytics) {
    loadGoogleAnalytics();
  }

  if (consentStatus.marketing) {
    loadMarketingPixels();
  }
};

const loadGoogleAnalytics = () => {
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer ?? [];
  window.gtag = function (...args: unknown[]) {
    window.dataLayer?.push(args);
  };

  window.gtag("js", new Date());
  window.gtag("config", GA_ID, {
    anonymize_ip: true,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });
};

const loadMarketingPixels = () => {
  // Replace with actual marketing pixels
};

const removeAnalyticsScripts = () => {
  const gaScripts = document.querySelectorAll(
    'script[src*="googletagmanager.com"]'
  );
  gaScripts.forEach((script) => script.remove());

  if (window.dataLayer) {
    window.dataLayer.length = 0;
  }

  delete window.gtag;
};

export const trackEvent = (
  eventName: string,
  parameters: Record<string, unknown> = {}
) => {
  if (window.gtag) {
    window.gtag("event", eventName, {
      ...parameters,
      anonymize_ip: true,
    });
  }
};

export const useAnalytics = () => {
  const { getConsentStatus, isCategoryEnabled } = useCookieConsent();

  useEffect(() => {
    const consentStatus = getConsentStatus();
    if (consentStatus.hasConsented) {
      initializeAnalytics({
        analytics: consentStatus.analytics,
        marketing: consentStatus.marketing,
      });
    }
  }, [getConsentStatus]);

  return {
    trackEvent: (
      eventName: string,
      parameters?: Record<string, unknown>
    ) => {
      if (isCategoryEnabled("analytics")) {
        trackEvent(eventName, parameters);
      }
    },
    trackPageView: (pagePath: string) => {
      if (isCategoryEnabled("analytics") && window.gtag) {
        window.gtag("config", GA_ID, {
          page_path: pagePath,
          anonymize_ip: true,
        });
      }
    },
    isAnalyticsEnabled: () => isCategoryEnabled("analytics"),
    isMarketingEnabled: () => isCategoryEnabled("marketing"),
  };
};