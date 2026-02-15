import { memo } from "react";
import { CheckCircle2, AlertCircle, ArrowRight } from "@/icons/lucide";
import { useContactForm } from "../hooks/use-contact-form";

const INPUT_CLASS =
  "w-full bg-transparent border border-edge rounded-lg px-4 py-3 text-sm text-content placeholder:text-content-faint/60 focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime/30 transition-all";

/* ─── Extracted helpers ─── */

function FieldError({ message }: { message?: string | undefined }) {
  if (!message) {return null;}
  return (
    <p className="mt-1 text-xs text-red-400">{message}</p>
  );
}

function StatusBanner({
  type,
  message,
  hasFieldErrors,
}: {
  type: "idle" | "submitting" | "success" | "error";
  message?: string | undefined;
  hasFieldErrors: boolean;
}) {
  if (!message || hasFieldErrors) {return null;}

  const isSuccess = type === "success";

  return (
    <div
      className={`flex items-center gap-3 p-3.5 rounded-lg text-sm ${
        isSuccess
          ? "bg-lime/10 border border-lime/20 text-lime"
          : "bg-red-500/10 border border-red-500/20 text-red-400"
      }`}
    >
      {isSuccess ? (
        <CheckCircle2 size={16} />
      ) : (
        <AlertCircle size={16} />
      )}
      <span className="font-medium">{message}</span>
    </div>
  );
}

/* ─── Main component ─── */

const ContactForm = memo(() => {
  const { formData, status, handleChange, handleSubmit } =
    useContactForm();

  return (
    <form
      name="contact"
      method="POST"
      onSubmit={handleSubmit}
      className="space-y-6"
      noValidate
    >
      <input
        type="hidden"
        name="form-name"
        value="contact"
      />
      <p hidden>
        <label>
          Don&apos;t fill this out if you&apos;re human:{" "}
          <input name="bot-field" />
        </label>
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="name"
            className="block text-[11px] font-mono font-medium text-content-faint uppercase tracking-[0.08em] mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            autoComplete="name"
            value={formData.name}
            onChange={handleChange}
            className={INPUT_CLASS}
            placeholder="Your name"
          />
          <FieldError message={status.fieldErrors?.name} />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-[11px] font-mono font-medium text-content-faint uppercase tracking-[0.08em] mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            className={INPUT_CLASS}
            placeholder="you@example.com"
          />
          <FieldError message={status.fieldErrors?.email} />
        </div>
      </div>

      <div>
        <label
          htmlFor="subject"
          className="block text-[11px] font-mono font-medium text-content-faint uppercase tracking-[0.08em] mb-2"
        >
          Subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          required
          autoComplete="off"
          value={formData.subject}
          onChange={handleChange}
          className={INPUT_CLASS}
          placeholder="Project type or inquiry"
        />
        <FieldError
          message={status.fieldErrors?.subject}
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-[11px] font-mono font-medium text-content-faint uppercase tracking-[0.08em] mb-2"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className={`${INPUT_CLASS} resize-none`}
          placeholder="Tell me about your project..."
        />
        <FieldError
          message={status.fieldErrors?.message}
        />
      </div>

      <StatusBanner
        type={status.type}
        message={status.message}
        hasFieldErrors={Boolean(status.fieldErrors)}
      />

      <button
        type="submit"
        disabled={status.type === "submitting"}
        className="btn-lime w-full md:w-auto"
      >
        {status.type === "submitting" ? (
          "Sending..."
        ) : (
          <>
            Send message
            <ArrowRight
              size={14}
              className="group-hover:translate-x-0.5 transition-transform"
              aria-hidden="true"
            />
          </>
        )}
      </button>
    </form>
  );
});

ContactForm.displayName = "ContactForm";
export default ContactForm;