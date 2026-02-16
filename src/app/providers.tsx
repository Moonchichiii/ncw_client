import { StrictMode } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { RouterProvider } from "@tanstack/react-router";
import { ErrorFallback } from "@/components/ui/error-fallback";
import { CookieConsentProvider } from "@/features/cookies/hooks/use-cookie-consent";
import { router } from "./router";

export function AppProviders() {
  return (
    <StrictMode>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <CookieConsentProvider>
          <RouterProvider router={router} />
        </CookieConsentProvider>
      </ErrorBoundary>
    </StrictMode>
  );
}