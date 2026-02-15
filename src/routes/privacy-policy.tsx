import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

const PrivacyPolicyContent = lazy(
  () => import("@/components/sections/privacy-policy"),
);

export const Route = createFileRoute("/privacy-policy")({
  component: PrivacyPolicyPage,
  head: () => ({
    title: "Privacy Policy — Nordic Code Works",
    meta: [
      {
        name: "description",
        content:
          "Privacy policy for Nordic Code Works. Learn how data is collected, used, and protected.",
      },
      { property: "og:title", content: "Privacy Policy — Nordic Code Works" },
    ],
  }),
});


function PrivacyPolicyPage() {
  return (
    <Suspense>
      <PrivacyPolicyContent />
    </Suspense>
  );
}