import { memo, useState, useCallback } from "react";
import { CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";


interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormStatus {
  type: "idle" | "submitting" | "success" | "error";
  message?: string;
}

const ContactForm = memo(() => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>({
    type: "idle",
  });

  const handleChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement
      >,
    ) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    [],
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setStatus({ type: "submitting" });

      try {
        const body = new URLSearchParams({
          "form-name": "contact",
          ...formData,
        }).toString();

        const response = await fetch("/", {
          method: "POST",
          headers: {
            "Content-Type":
              "application/x-www-form-urlencoded",
          },
          body,
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        setStatus({
          type: "success",
          message: "Message sent successfully.",
        });
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } catch {
        setStatus({
          type: "error",
          message: "Failed to send. Please try again.",
        });
      }
    },
    [formData],
  );

  const inputClasses =
    "w-full bg-transparent border border-edge rounded-lg px-4 py-3 text-sm text-content placeholder:text-content-faint/60 focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime/30 transition-all";

  return (
    <form
      name="contact"
      method="POST"
      onSubmit={handleSubmit}
      className="space-y-6"
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
            className={inputClasses}
            placeholder="Your name"
          />
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
            className={inputClasses}
            placeholder="you@example.com"
          />
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
          className={inputClasses}
          placeholder="Project type or inquiry"
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
          className={`${inputClasses} resize-none`}
          placeholder="Tell me about your project..."
        />
      </div>

      {status.message && (
        <div
          className={`flex items-center gap-3 p-3.5 rounded-lg text-sm ${
            status.type === "success"
              ? "bg-lime/10 border border-lime/20 text-lime"
              : "bg-red-500/10 border border-red-500/20 text-red-400"
          }`}
        >
          {status.type === "success" ? (
            <CheckCircle2 size={16} />
          ) : (
            <AlertCircle size={16} />
          )}
          <span className="font-medium">
            {status.message}
          </span>
        </div>
      )}

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