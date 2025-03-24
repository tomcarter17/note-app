import { describe, expect, it } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import App from "App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@testing-library/jest-dom";
import { mockServer } from "utils/test/server";
import { http, HttpResponse } from "msw";
import userEvent from "@testing-library/user-event";

// Don't retry requests in tests as this can lead to false positives
const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

describe("App", () => {
  it("should show no notes when session is empty", async () => {
    mockServer.use(
      http.get("**/notes", () => {
        return HttpResponse.json([]);
      }),
    );

    render(
      <QueryClientProvider client={client}>
        <App />
      </QueryClientProvider>,
    );

    await waitFor(() =>
      expect(screen.getByText("No notes to show.")).toBeInTheDocument(),
    );
    expect(screen.queryByRole("article")).not.toBeInTheDocument();
  });

  it("should show notes when session is not empty", async () => {
    render(
      <QueryClientProvider client={client}>
        <App />
      </QueryClientProvider>,
    );

    await waitFor(() => expect(screen.getAllByRole("article")).toHaveLength(3));
    expect(screen.getByText("Note 1")).toBeInTheDocument();
    expect(screen.getByText("Note 2")).toBeInTheDocument();
    expect(screen.getByText("Note 3")).toBeInTheDocument();
  });

  it("should create a new note with default content", async () => {
    render(
      <QueryClientProvider client={client}>
        <App />
      </QueryClientProvider>,
    );

    await waitFor(() => expect(screen.getAllByRole("article")).toHaveLength(3));

    await userEvent.click(screen.getByText("Add note"));

    await waitFor(() => expect(screen.getAllByRole("article")).toHaveLength(4));
    expect(
      screen.getByText("Insert your note content here!"),
    ).toBeInTheDocument();
  });

  it("should correctly update the note", async () => {
    mockServer.use(
      http.put("**/notes/**", () => {
        return HttpResponse.json({ id: 1, body: "Note 1 has been updated" });
      }),
    );

    render(
      <QueryClientProvider client={client}>
        <App />
      </QueryClientProvider>,
    );

    await userEvent.type(screen.getByText("Note 1"), " has been updated");
  });

  it("should correctly tag a user when @ is typed", async () => {
    render(
      <QueryClientProvider client={client}>
        <App />
      </QueryClientProvider>,
    );

    await userEvent.type(screen.getByText("Note 1"), " @");

    // User menu is open after typing @
    expect(screen.getByText("first user")).toBeInTheDocument();
    expect(screen.getByText("second user")).toBeInTheDocument();

    await userEvent.click(screen.getByText("first user"));

    // The user menu should be closed after a user is selected
    expect(screen.queryByText("first user")).not.toBeInTheDocument();
    expect(screen.queryByText("second user")).not.toBeInTheDocument();

    expect(screen.getByText("Note 1 @user1")).toBeInTheDocument();
  });
});
