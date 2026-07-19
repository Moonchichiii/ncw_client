import { createLazyFileRoute, Outlet } from "@tanstack/react-router";
import { useSectionReveals } from "@/hooks/use-section-reveals";
import Hero from "@/components/sections/hero";
import Work from "@/components/sections/work";
import About from "@/components/sections/about";
import Process from "@/components/sections/process";
import PaperBreak from "@/components/sections/paper-break";
import Faq from "@/components/sections/faq";
import Contact from "@/components/sections/contact";

export const Route = createLazyFileRoute("/_home")({
  component: HomeLayout,
});

function HomeLayout() {
  useSectionReveals();

  return (
    <>
      <Hero />
      <PaperBreak variant="stats" />
      <Work />
      <About />
      <Process />
      <Faq />
      <Contact />
      <Outlet />
    </>
  );
}