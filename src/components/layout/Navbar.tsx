import { memo, useState, useEffect, useCallback } from "react";
import { Menu, X, ArrowUpRight } from "@/icons/lucide";

const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Process", href: "#process" },
  { label: "FAQ", href: "#faq" },
] as const;

const Navbar = memo(() => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, {
      passive: true,
    });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen
      ? "hidden"
      : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  const closeMobile = useCallback(
    () => setIsMobileOpen(false),
    [],
  );

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-surface/70 backdrop-blur-md border-b border-edge"
          : "bg-transparent border-b border-transparent"
      }`}
      aria-label="Main navigation"
    >
      <div className="mx-auto max-w-300 px-5 sm:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo */}
          <a
            href="#hero"
            className="flex items-center gap-2.5 group"
          >
            <span className="status-dot" />
            <span className="text-sm font-heading font-bold tracking-tight text-content group-hover:text-lime transition-colors">
              NCW
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[clamp(0.9rem,0.86rem+0.15vw,0.98rem)] font-medium text-content-faint hover:text-content transition-colors tracking-[-0.01em]"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="btn-lime h-9! px-4! text-[12px]! gap-1.5!"
            >
              Let&apos;s talk
              <ArrowUpRight
                size={13}
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </a>

            {/* Mobile toggle */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="md:hidden w-9 h-9 flex items-center justify-center border border-edge rounded-md text-content hover:bg-surface-elevated transition-colors"
              aria-label={
                isMobileOpen ? "Close menu" : "Open menu"
              }
              aria-expanded={isMobileOpen}
            >
              {isMobileOpen ? (
                <X
                  size={16}
                  strokeWidth={1.6}
                  aria-hidden="true"
                />
              ) : (
                <Menu
                  size={16}
                  strokeWidth={1.6}
                  aria-hidden="true"
                />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {isMobileOpen && (
        <div className="md:hidden border-t border-edge bg-surface/95 backdrop-blur-md">
          <div className="mx-auto max-w-300 px-5 py-6 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={closeMobile}
                className="text-lg font-heading font-semibold text-content hover:text-lime transition-colors py-1"
              >
                {link.label}
              </a>
            ))}
            <div className="divider mt-2" />
            <a
              href="#contact"
              onClick={closeMobile}
              className="btn-lime w-fit mt-2 h-9! px-4! text-[12px]!"
            >
              Let&apos;s talk
              <ArrowUpRight
                size={13}
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </a>
          </div>
        </div>
      )}
    </nav>
  );
});

Navbar.displayName = "Navbar";
export default Navbar;