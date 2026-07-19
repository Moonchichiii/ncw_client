import { describe, expect, it } from "vitest";
import { contactSchema } from "@/features/contact/schemas/contact.schema";

const VALID = {
  name: "Mats Gustafsson",
  email: "mats@example.com",
  subject: "Project inquiry",
  message: "I would like to talk about a Django project.",
};

describe("contactSchema", () => {
  it("accepts a valid submission", () => {
    expect(contactSchema.safeParse(VALID).success).toBe(true);
  });

  it("trims surrounding whitespace", () => {
    const result = contactSchema.safeParse({
      ...VALID,
      name: "  Mats  ",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe("Mats");
    }
  });

  it("rejects an invalid email", () => {
    expect(
      contactSchema.safeParse({ ...VALID, email: "not-an-email" }).success,
    ).toBe(false);
  });

  it("rejects empty required fields", () => {
    expect(
      contactSchema.safeParse({ ...VALID, message: "" }).success,
    ).toBe(false);
    expect(contactSchema.safeParse({ ...VALID, name: "" }).success).toBe(
      false,
    );
  });

  it("rejects excessive input lengths", () => {
    expect(
      contactSchema.safeParse({ ...VALID, name: "x".repeat(101) }).success,
    ).toBe(false);
    expect(
      contactSchema.safeParse({ ...VALID, subject: "x".repeat(201) })
        .success,
    ).toBe(false);
    expect(
      contactSchema.safeParse({ ...VALID, message: "x".repeat(5001) })
        .success,
    ).toBe(false);
  });
});
