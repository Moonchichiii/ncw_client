import { createLazyFileRoute } from "@tanstack/react-router";
import Hero from "@/components/sections/hero";
import Work from "@/components/sections/work";
import About from "@/components/sections/about";
import Process from "@/components/sections/process";
import Faq from "@/components/sections/faq";
import Contact from "@/components/sections/contact";

export const Route = createLazyFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Hero />
      <Work />
      <About />
      <Process />
      <Faq />
      <Contact />
    </>
  );
}
