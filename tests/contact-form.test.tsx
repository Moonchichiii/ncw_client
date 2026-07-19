import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { server } from "./mocks/server";
import ContactForm from "@/features/contact/components/contact-form";

const MOUNT_TIME = 1_000_000_000;

function fillValidForm() {
  fireEvent.change(screen.getByLabelText(/name/i), {
    target: { value: "Mats Gustafsson" },
  });
  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: "mats@example.com" },
  });
  fireEvent.change(screen.getByLabelText(/subject/i), {
    target: { value: "Project inquiry" },
  });
  fireEvent.change(screen.getByLabelText(/message/i), {
    target: { value: "I would like to discuss a Django project." },
  });
}

describe("ContactForm abuse protection", () => {
  let requestCount: number;
  let lastBody: string;
  let nowSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    requestCount = 0;
    lastBody = "";
    server.use(
      http.post("/", async ({ request }) => {
        requestCount += 1;
        lastBody = await request.text();
        return new HttpResponse(null, { status: 200 });
      }),
    );
    nowSpy = vi.spyOn(Date, "now").mockReturnValue(MOUNT_TIME);
  });

  afterEach(() => {
    nowSpy.mockRestore();
  });

  it("silently drops submissions when the honeypot is filled", async () => {
    render(<ContactForm />);
    nowSpy.mockReturnValue(MOUNT_TIME + 10_000);

    fillValidForm();
    fireEvent.change(
      screen.getByLabelText(/don't fill this out/i, { selector: "input" }),
      { target: { value: "spam-bot-value" } },
    );
    fireEvent.submit(screen.getByRole("button", { name: /send message/i }));

    // Generic success shown, nothing sent, no bot-detection reveal.
    expect(
      await screen.findByText(/message sent successfully/i),
    ).toBeInTheDocument();
    expect(requestCount).toBe(0);
  });

  it("silently drops unrealistically fast submissions", async () => {
    render(<ContactForm />);
    // No time advance: submitted "instantly" after mount.
    fillValidForm();
    fireEvent.submit(screen.getByRole("button", { name: /send message/i }));

    expect(
      await screen.findByText(/message sent successfully/i),
    ).toBeInTheDocument();
    expect(requestCount).toBe(0);
  });

  it("submits a valid form after a realistic fill time", async () => {
    render(<ContactForm />);
    nowSpy.mockReturnValue(MOUNT_TIME + 10_000);

    fillValidForm();
    fireEvent.submit(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      expect(requestCount).toBe(1);
    });
    expect(lastBody).toContain("form-name=contact");
    expect(lastBody).toContain("mats%40example.com");
    expect(
      await screen.findByText(/message sent successfully/i),
    ).toBeInTheDocument();
  });

  it("shows accessible field errors for invalid input and sends nothing", async () => {
    render(<ContactForm />);
    nowSpy.mockReturnValue(MOUNT_TIME + 10_000);

    fillValidForm();
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "not-an-email" },
    });
    fireEvent.submit(screen.getByRole("button", { name: /send message/i }));

    expect(
      await screen.findByText(/please enter a valid email/i),
    ).toBeInTheDocument();
    expect(requestCount).toBe(0);
  });
});
