import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, memo } from "react";
import Hero from "@/components/sections/hero";

// Lazy sections
const Work = lazy(() => import("@/components/sections/work"));
const About = lazy(() => import("@/components/sections/about"));
const Process = lazy(() => import("@/components/sections/process"));
const Faq = lazy(() => import("@/components/sections/faq"));
const Contact = lazy(() => import("@/components/sections/contact"));

export const Route = createFileRoute("/")({
  component: HomePage,
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


const SectionFallback = memo(({ height = 420 }: { height?: number }) => (
  <div
    aria-hidden="true"
    className="mx-auto max-w-6xl px-5 sm:px-8 py-24"
  >
    <div
      className="rounded-2xl border border-edge bg-surface/50 animate-pulse"
      style={{ height }}
    />
  </div>
));
SectionFallback.displayName = "SectionFallback";

function HomePage() {
  return (
    <>
      <Hero />

      <Suspense fallback={<SectionFallback height={560} />}>
        <Work />
      </Suspense>

      <Suspense fallback={<SectionFallback height={520} />}>
        <About />
      </Suspense>

      <Suspense fallback={<SectionFallback height={460} />}>
        <Process />
      </Suspense>

      <Suspense fallback={<SectionFallback height={360} />}>
        <Faq />
      </Suspense>

      <Suspense fallback={<SectionFallback height={520} />}>
        <Contact />
      </Suspense>
    </>
  );
}
