import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

const TermsOfServiceContent = lazy(
  () => import("@/components/sections/terms-of-service"),
);

export const Route = createFileRoute("/terms-of-service")({
  component: TermsOfServicePage,
  head: () => ({
    title: "Terms of Service — Nordic Code Works",
    meta: [
      {
        name: "description",
        content:
          "Terms of Service for Nordic Code Works. Conditions for using the website and engaging services.",
      },
      { property: "og:title", content: "Terms of Service — Nordic Code Works" },
    ],
  }),
});


function TermsOfServicePage() {
  return (
    <Suspense>
      <TermsOfServiceContent />
    </Suspense>
  );
}