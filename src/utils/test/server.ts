import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

import { mockNotesResponse } from "../mocks/notes";

const handlers = [
  http.get("**/notes", () => {
    return HttpResponse.json(mockNotesResponse);
  }),
];

export const mockServer = setupServer(...handlers);
