import { memo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Copy, Mail } from "@/icons/lucide";
import { useCookieConsent } from "@/features/cookies/hooks/use-cookie-consent";
import { SOCIAL_LINKS, CONTACT_EMAIL } from "@/data/social-links";

const Footer = memo(() => {
  const { showPreferencesPanel } = useCookieConsent();
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(CONTACT_EMAIL);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <footer className="w-full bg-surface border-t border-edge">
      <div className="mx-auto max-w-300 px-5 sm:px-8">
        <div className="py-(--space-block)">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4">
              <div className="flex items-center gap-2">
                <span className="status-dot" />
                <span className="text-sm font-heading font-bold tracking-tight text-content">
                  Nordic Code Works
                </span>
              </div>

              <p className="mt-4 text-content-secondary text-sm leading-relaxed max-w-[40ch]">
                Full-stack web engineering — clean architecture, measurable
                performance, and secure delivery.
              </p>

              <div className="mt-6 ui-label flex flex-col gap-1">
                <span>© {new Date().getFullYear()} Nordic Code Works</span>
                <span>Sweden & France</span>
              </div>
            </div>

            <div className="lg:col-span-8 lg:justify-self-end w-full max-w-2xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                <div>
                  <p className="ui-label mb-4">Connect</p>
                  <div className="flex flex-wrap gap-2">
                    {SOCIAL_LINKS.map((link) => {
                      const Icon = link.icon;
                      return (
                        <a
                          key={link.title}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group lime-hover"
                        >
                          <Icon
                            size={14}
                            strokeWidth={1.6}
                            className="text-current opacity-80 group-hover:opacity-100 transition-opacity"
                            aria-hidden="true"
                          />
                          <span className="ui-label normal-case tracking-normal opacity-80 group-hover:opacity-100 transition-opacity">
                            {link.title}
                          </span>
                          <ArrowUpRight
                            size={12}
                            strokeWidth={1.6}
                            className="text-current opacity-80 group-hover:opacity-100 transition-opacity"
                            aria-hidden="true"
                          />
                        </a>
                      );
                    })}

                    <button
                      type="button"
                      onClick={copyEmail}
                      className="group lime-hover"
                      aria-label="Copy email address"
                    >
                      <Mail
                        size={14}
                        strokeWidth={1.6}
                        className="text-current opacity-80 group-hover:opacity-100 transition-opacity"
                        aria-hidden="true"
                      />
                      <span className="ui-label normal-case tracking-normal opacity-80 group-hover:opacity-100 transition-opacity">
                        {copied ? "Copied" : "Email"}
                      </span>
                      <Copy
                        size={12}
                        strokeWidth={1.6}
                        className="text-current opacity-80 group-hover:opacity-100 transition-opacity"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </div>

                <div>
                  <p className="ui-label mb-4">Legal</p>
                  <div className="flex flex-col gap-3">
                    <Link
                      to="/privacy-policy"
                      className="inline-flex items-center gap-2 text-content-faint hover:text-content transition-colors group"
                    >
                      Privacy
                      <ArrowUpRight
                        size={12}
                        strokeWidth={1.6}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-hidden="true"
                      />
                    </Link>

                    <Link
                      to="/terms-of-service"
                      className="inline-flex items-center gap-2 text-content-faint hover:text-content transition-colors group"
                    >
                      Terms
                      <ArrowUpRight
                        size={12}
                        strokeWidth={1.6}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-hidden="true"
                      />
                    </Link>

                    <button
                      type="button"
                      onClick={showPreferencesPanel}
                      className="inline-flex items-center gap-2 text-content-faint hover:text-content transition-colors group text-left"
                    >
                      Cookies
                      <ArrowUpRight
                        size={12}
                        strokeWidth={1.6}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-10 divider" />
              <p className="mt-6 text-content-faint text-xs max-w-[80ch]">
                Built with performance budgets, WCAG AA patterns, and
                security-first delivery.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";
export default Footer;
