import { StrictMode } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { RouterProvider } from "@tanstack/react-router";
import { ErrorFallback } from "@/components/ui/error-fallback";
import { router } from "./router";

export function AppProviders() {
  return (
    <StrictMode>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </StrictMode>
  );
}
