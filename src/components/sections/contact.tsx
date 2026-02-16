import { memo } from "react";
import ContactForm from "@/features/contact/components/contact-form";
import { CONTACT_EMAIL } from "@/data/social-links";
import { Mail } from "@/icons/lucide";

const Contact = memo(() => {
  return (
    <section
      id="contact"
      className="py-(--space-section) bg-surface border-t border-edge"
      aria-label="Contact"
    >
      <div className="mx-auto max-w-300 px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-(--space-block)">
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
              Currently open for new opportunities and collaborations.
              Reach out and let&apos;s talk about your project.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Form */}
          <div className="lg:col-span-8 card p-8 md:p-10">
            <ContactForm />

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <p className="ui-label">Reply within 24–48h</p>

              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="inline-flex items-center gap-2 text-sm text-content-faint hover:text-content transition-colors"
              >
                <Mail size={14} strokeWidth={1.6} aria-hidden="true" />
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>

          {/* Trust / availability */}
          <div className="lg:col-span-4">
            <div className="card p-6 bg-surface-accent/40">
              <div className="flex items-center gap-2 mb-3">
                <span className="status-dot" />
                <span className="ui-label text-lime">Available</span>
              </div>

              <p className="text-content-secondary leading-relaxed text-[clamp(0.95rem,0.92rem+0.2vw,1.03rem)]">
                Open for freelance &amp; contract work. Based in Sweden &amp; France, working globally.
              </p>

              <div className="mt-5 divider" />

              <p className="mt-5 text-content-faint text-sm leading-relaxed">
                Clear milestones. Performance-first builds. Clean handover.
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
