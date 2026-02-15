import { memo, useState } from "react";
import { Mail, ArrowUpRight, Copy } from "@/icons/lucide";
import ContactForm from "@/features/contact/components/contact-form";
import {
  SOCIAL_LINKS,
  CONTACT_EMAIL,
  type SocialLinkData,
} from "@/data/social-links";
import type { IconComponent } from "@/types";

const SocialRow = memo<{
  icon: IconComponent;
  title: string;
  href: string;
  label: string;
}>(({ icon: Icon, title, href, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="group flex items-center justify-between py-3 border-b border-edge-subtle last:border-0 hover:px-2 transition-all"
  >
    <div className="flex items-center gap-3">
      <Icon
        size={16}
        strokeWidth={1.6}
        className="text-content-faint group-hover:text-lime transition-colors"
        aria-hidden="true"
      />
      <div>
        <span className="text-[10px] font-mono text-content-faint block">
          {label}
        </span>
        <span className="font-medium text-content text-[clamp(0.95rem,0.92rem+0.2vw,1.02rem)]">
          {title}
        </span>
      </div>
    </div>
    <ArrowUpRight
      size={14}
      strokeWidth={1.6}
      className="text-content-faint group-hover:text-lime transition-colors"
      aria-hidden="true"
    />
  </a>
));

SocialRow.displayName = "SocialRow";

const Contact = memo(() => {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(CONTACT_EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      className="py-[var(--space-section)] bg-surface border-t border-edge"
      aria-label="Contact"
    >
      <div className="mx-auto max-w-300 px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-[var(--space-block)]">
          <div>
            <p className="section-label mb-4">Contact</p>
            <h2 className="font-heading font-bold tracking-[-0.04em] leading-[0.98] md:leading-[0.95] text-content text-[clamp(2rem,1.4rem+2.2vw,3.2rem)]">
              Let&apos;s build
              <br />
              something great
            </h2>
          </div>
          <div className="flex flex-col justify-end">
            <p className="text-content-secondary leading-relaxed max-w-[52ch] text-[clamp(0.95rem,0.92rem+0.2vw,1.05rem)]">
              Currently open for new opportunities and
              collaborations. Reach out and let&apos;s talk about
              your project.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 card p-8 md:p-10">
            <ContactForm />
            <p className="mt-4 text-content-faint text-[var(--text-label)]">
              Reply within 24–48h
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="card p-6">
              <h3 className="text-xs font-mono font-medium text-content-faint uppercase tracking-widest mb-4">
                Connect
              </h3>
              {SOCIAL_LINKS.map((link: SocialLinkData) => (
                <SocialRow
                  key={link.title}
                  icon={link.icon}
                  title={link.title}
                  label={link.label}
                  href={link.href}
                />
              ))}

              <button
                onClick={copyEmail}
                className="group flex items-center justify-between w-full pt-3 mt-3 border-t border-edge-subtle text-left"
                aria-label="Copy email address"
              >
                <div className="flex items-center gap-3">
                  <Mail
                    size={16}
                    strokeWidth={1.6}
                    className="text-content-faint group-hover:text-lime transition-colors"
                    aria-hidden="true"
                  />
                  <div>
                    <span className="text-[10px] font-mono text-content-faint block">
                      {copied ? "Copied!" : "Email"}
                    </span>
                    <span className="font-medium text-content truncate block max-w-50 text-[clamp(0.95rem,0.92rem+0.2vw,1.02rem)]">
                      {CONTACT_EMAIL}
                    </span>
                  </div>
                </div>
                <Copy
                  size={14}
                  strokeWidth={1.6}
                  className="text-content-faint group-hover:text-lime transition-colors"
                  aria-hidden="true"
                />
              </button>
            </div>

            <div className="card p-6 bg-surface-accent/40">
              <div className="flex items-center gap-2 mb-3">
                <span className="status-dot" />
                <span className="text-xs font-mono font-medium text-lime uppercase tracking-wide">
                  Available
                </span>
              </div>
              <p className="text-content-secondary leading-relaxed text-[clamp(0.95rem,0.92rem+0.2vw,1.03rem)]">
                Open for freelance & contract work. Based in
                Sweden & France, working globally.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

Contact.displayName = "Contact";
export default Contact;