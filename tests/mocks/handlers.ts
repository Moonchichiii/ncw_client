import { http, HttpResponse } from "msw";

/** Netlify Forms accepts POST / with urlencoded body. */
export const handlers = [
  http.post("/", () => new HttpResponse(null, { status: 200 })),
];
