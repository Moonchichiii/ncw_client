import { useState, useCallback, type ChangeEvent, type FormEvent } from "react";
import { contactSchema, type ContactFormData } from "@/features/contact/schemas/contact.schema";
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

export function useContactForm() {
  const [formData, setFormData] = useState<ContactFormData>(INITIAL_DATA);
  const [status, setStatus] = useState<FormStatus>({ type: "idle" });

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
  }, []);

const handleSubmit = useCallback(
  async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
      await submitNetlifyForm("contact", result.data);

      setStatus({
        type: "success",
        message: "Message sent successfully.",
      });
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
