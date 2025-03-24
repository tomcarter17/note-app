import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

import { mockNotesResponse } from "../mocks/notes";
import { mockUsersResponse } from "utils/mocks/users";

const handlers = [
  http.get("**/notes", () => {
    return HttpResponse.json(mockNotesResponse);
  }),
  http.post<never, { body: string }>("**/notes", async ({ request }) => {
    const { body } = await request.json();
    return HttpResponse.json({ id: 4, body });
  }),
  http.get("**/users", () => HttpResponse.json(mockUsersResponse)),
];

export const mockServer = setupServer(...handlers);
