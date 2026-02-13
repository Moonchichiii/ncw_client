import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

const TermsOfServiceContent = lazy(
  () => import("@/components/sections/terms-of-service"),
);

export const Route = createFileRoute("/terms-of-service")({
  component: TermsOfServicePage,
});

function TermsOfServicePage() {
  return (
    <Suspense>
      <TermsOfServiceContent />
    </Suspense>
  );
}