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
        <div className="py-[calc(var(--space-block)*0.9)] md:py-(--space-block)">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
            {/* LEFT */}
            <div className="md:col-span-6">
              <div className="flex items-center gap-2">
                <span className="status-dot" />
                <span className="text-sm font-heading font-bold tracking-tight text-content">
                  Nordic Code Works
                </span>
              </div>

              <p className="mt-3 text-content-secondary max-w-[52ch] text-sm leading-relaxed">
                Engineering fast, accessible, and scalable web systems — with clean handover and measurable performance.
              </p>

              <div className="mt-5 ui-label flex flex-col sm:flex-row gap-2 sm:gap-3">
                <span>© {new Date().getFullYear()} Nordic Code Works</span>
                <span className="hidden sm:inline text-edge">·</span>
                <span>Sweden & France</span>
              </div>
            </div>

            {/* RIGHT */}
            <div className="md:col-span-6 md:justify-self-end w-full max-w-xl">
              {/* Socials */}
              <div className="flex flex-wrap items-center gap-2">
                {SOCIAL_LINKS.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.title}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={[
                        "inline-flex items-center gap-2 rounded-full border border-edge-subtle",
                        "px-3 py-2 bg-surface-elevated/40 hover:bg-surface-elevated/60",
                        "transition-colors",
                      ].join(" ")}
                    >
                      <Icon size={14} strokeWidth={1.6} className="text-content-faint" aria-hidden="true" />
                      <span className="ui-label normal-case tracking-normal text-content-faint">
                        {link.title}
                      </span>
                      <ArrowUpRight size={12} strokeWidth={1.6} className="text-content-faint" aria-hidden="true" />
                    </a>
                  );
                })}

                {/* Email copy pill */}
                <button
                  type="button"
                  onClick={copyEmail}
                  className={[
  "group inline-flex items-center gap-2 rounded-full border border-edge-subtle",
  "px-3 py-2 bg-surface-elevated/40",
  "lime-hover",
].join(" ")}

                  aria-label="Copy email address"
                >
                  <Mail size={14} strokeWidth={1.6} className="text-content-faint" aria-hidden="true" />
                  <span className="ui-label normal-case tracking-normal text-content-faint">
                    {copied ? "Copied" : "Email"}
                  </span>
                  <Copy size={12} strokeWidth={1.6} className="text-content-faint" aria-hidden="true" />
                </button>
              </div>

              {/* Legal */}
              <div className="mt-6 ui-label flex flex-wrap gap-x-6 gap-y-2">
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

          <div className="mt-10 divider" />
          <p className="mt-6 text-content-faint text-xs">
            Built with performance budgets, WCAG AA patterns, and security-first delivery.
          </p>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";
export default Footer;
