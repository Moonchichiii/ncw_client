import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    title: "Nordic Code Works — Full-Stack Developer",
    meta: [
      {
        name: "description",
        content:
          "Full-stack developer focused on performance, accessibility, and secure delivery.",
      },
      {
        property: "og:title",
        content: "Nordic Code Works — Full-Stack Developer",
      },
      {
        property: "og:description",
        content:
          "High-performance web applications built with precision, accessibility, and lasting quality.",
      },
      {
        property: "og:type",
        content: "website",
      },
    ],
  }),
});
