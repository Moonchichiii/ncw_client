export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly data?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function submitNetlifyForm(
  formName: string,
  data: Record<string, string>,
): Promise<void> {
  const body = new URLSearchParams({
    "form-name": formName,
    ...data,
  });

  const response = await fetch("/", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  });

  if (!response.ok) {
    throw new ApiError(response.status, "Form submission failed");
  }
}
