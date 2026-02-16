import { memo } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "@/icons/lucide";
import { useCookieConsent } from "@/features/cookies/hooks/use-cookie-consent";

const Footer = memo(() => {
  const { showPreferencesPanel } = useCookieConsent();

  return (
    <footer className="w-full bg-surface border-t border-edge">
      <div className="mx-auto max-w-300 px-5 sm:px-8">
        <div className="py-(--space-block) flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-2">
              <span className="status-dot" />
              <span className="text-sm font-heading font-bold tracking-tight text-content">
                Nordic Code Works
              </span>
            </div>

            <div className="ui-label flex flex-col sm:flex-row gap-2 sm:gap-3">
              <span>© {new Date().getFullYear()} Nordic Code Works</span>
              <span className="hidden sm:inline text-edge">·</span>
              <span>Sweden & France</span>
            </div>
          </div>

          <div className="ui-label flex flex-wrap gap-x-6 gap-y-2">
            <Link
              to="/privacy-policy"
              className="hover:text-content transition-colors flex items-center gap-1 group tracking-[0.02em]"
            >
              Privacy
              <ArrowUpRight
                size={10}
                strokeWidth={1.6}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
                aria-hidden="true"
              />
            </Link>

            <Link
              to="/terms-of-service"
              className="hover:text-content transition-colors flex items-center gap-1 group tracking-[0.02em]"
            >
              Terms
              <ArrowUpRight
                size={10}
                strokeWidth={1.6}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
                aria-hidden="true"
              />
            </Link>

            <button
              type="button"
              onClick={showPreferencesPanel}
              aria-label="Open cookie settings"
              className="hover:text-content transition-colors flex items-center gap-1 group tracking-[0.02em]"
            >
              Cookies
              <ArrowUpRight
                size={10}
                strokeWidth={1.6}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";
export default Footer;
