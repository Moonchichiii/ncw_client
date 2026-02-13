import { memo, type ReactNode } from "react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout = memo<LayoutProps>(({ children }) => (
  <div className="min-h-screen bg-surface selection:bg-accent/20 selection:text-content">
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[9999] bg-accent text-accent-contrast px-6 py-3 font-mono text-sm font-bold uppercase tracking-widest rounded-md"
    >
      Skip to content
    </a>

    <Navbar />

    <main id="main-content" className="flex flex-col">
      {children}
    </main>

    <Footer />
  </div>
));

Layout.displayName = "Layout";
export default Layout;