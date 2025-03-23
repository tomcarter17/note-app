import { useQuery } from "@tanstack/react-query";
import { createRequest, responseWrapper } from "api/axios";
import { Note } from "types/note";

export const useNotes = (sessionId: string) =>
  useQuery({
    queryKey: ["notes", sessionId],
    queryFn: () =>
      responseWrapper(
        createRequest<Note[]>({
          method: "get",
          url: `${sessionId}/notes`,
        }),
      ),
  });
