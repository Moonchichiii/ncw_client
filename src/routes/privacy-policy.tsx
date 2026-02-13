import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

const PrivacyPolicyContent = lazy(
  () => import("@/components/sections/privacy-policy"),
);

export const Route = createFileRoute("/privacy-policy")({
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
  return (
    <Suspense>
      <PrivacyPolicyContent />
    </Suspense>
  );
}