import { afterAll, afterEach, beforeAll } from "vitest";

import { mockServer } from "./src/utils/test/server";
import { QueryClient } from "@tanstack/react-query";

const queryCache = new QueryClient();

beforeAll(() => {
  // This means that a test fails if there is an unhandled request, rather than only logging a warning
  mockServer.listen({ onUnhandledRequest: "error" });
});

afterEach(() => {
  mockServer.resetHandlers();
  queryCache.clear();
});

afterAll(() => {
  mockServer.close();
});
