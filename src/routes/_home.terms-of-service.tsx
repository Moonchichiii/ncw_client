import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_home/terms-of-service")({
  head: () => ({
    title: "Terms of Service — Nordic Code Works",
    meta: [
      {
        name: "description",
        content:
          "Terms of Service for Nordic Code Works. Conditions for using the website and engaging services.",
      },
      {
        property: "og:title",
        content: "Terms of Service — Nordic Code Works",
      },
    ],
  }),
});