import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_home/privacy-policy")({
  head: () => ({
    title: "Privacy Policy — Nordic Code Works",
    meta: [
      {
        name: "description",
        content:
          "Privacy policy for Nordic Code Works. Learn how data is collected, used, and protected.",
      },
      {
        property: "og:title",
        content: "Privacy Policy — Nordic Code Works",
      },
    ],
  }),
});