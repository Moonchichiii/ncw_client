import {
  useState,
  useRef,
  useCallback,
  type ChangeEvent,
  type FormEvent,
} from "react";
import {
  contactSchema,
  type ContactFormData,
} from "@/features/contact/schemas/contact.schema";
import { submitNetlifyForm } from "@/lib/api-client";

interface FormStatus {
  type: "idle" | "submitting" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<keyof ContactFormData, string>>;
}

const INITIAL_DATA: ContactFormData = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

/**
 * Minimum realistic time (ms) between form mount and submission.
 * Faster than this is almost certainly automated. We respond with the
 * same generic success as a real send — never reveal bot detection.
 */
const MIN_FILL_TIME_MS = 3000;

const SUCCESS_STATUS: FormStatus = {
  type: "success",
  message: "Message sent successfully.",
};

export function useContactForm() {
  const [formData, setFormData] = useState<ContactFormData>(INITIAL_DATA);
  const [status, setStatus] = useState<FormStatus>({ type: "idle" });
  const mountedAt = useRef<number>(Date.now());

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;

      setFormData((prev) => ({ ...prev, [name]: value }));

      // Clear that specific field error on change
      setStatus((prev) =>
        prev.fieldErrors
          ? {
              ...prev,
              fieldErrors: {
                ...prev.fieldErrors,
                [name]: undefined,
              },
            }
          : prev,
      );
    },
    [],
  );

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const form = e.currentTarget;
      const botField =
        (form.elements.namedItem("bot-field") as HTMLInputElement | null)
          ?.value ?? "";
      const elapsed = Date.now() - mountedAt.current;

      // Honeypot filled or unrealistically fast: silently drop the
      // submission and show the generic success response.
      if (botField !== "" || elapsed < MIN_FILL_TIME_MS) {
        setStatus(SUCCESS_STATUS);
        setFormData(INITIAL_DATA);
        return;
      }

      const result = contactSchema.safeParse(formData);
      if (!result.success) {
        const fieldErrors: FormStatus["fieldErrors"] = {};

        for (const issue of result.error.issues) {
          const field = issue.path[0] as keyof ContactFormData;

          // Only set the first error per field
          fieldErrors[field] ??= issue.message;
        }

        setStatus({
          type: "error",
          message: "Please fix the errors below.",
          fieldErrors,
        });
        return;
      }

      setStatus({ type: "submitting" });

      try {
        // Include bot-field so Netlify's server-side honeypot check
        // applies to the AJAX submission path as well.
        await submitNetlifyForm("contact", {
          ...result.data,
          "bot-field": botField,
        });

        setStatus(SUCCESS_STATUS);
        setFormData(INITIAL_DATA);
      } catch {
        setStatus({
          type: "error",
          message: "Failed to send. Please try again.",
        });
      }
    },
    [formData],
  );

  return { formData, status, handleChange, handleSubmit };
}
