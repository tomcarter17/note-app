import { afterAll, afterEach, beforeAll } from "vitest";

import { mockServer } from "./src/utils/test/server";

beforeAll(() => {
  // This means that a test fails if there is an unhandled request, rather than only logging a warning
  mockServer.listen({ onUnhandledRequest: "error" });
});

afterEach(() => {
  mockServer.resetHandlers();
});

afterAll(() => {
  mockServer.close();
});
