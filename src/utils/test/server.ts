import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

import { mockNotesResponse } from "../mocks/notes";

const handlers = [
  http.get("**/notes", () => {
    return HttpResponse.json(mockNotesResponse);
  }),
  http.post<never, { body: string }>("**/notes", async ({ request }) => {
    const { body } = await request.json();
    return HttpResponse.json({ id: 4, body });
  }),
];

export const mockServer = setupServer(...handlers);
