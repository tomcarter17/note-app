import { useMutation } from "@tanstack/react-query";
import { createRequest, responseWrapper } from "api/axios";
import { Note } from "types/note";

export const useUpdateNote = (sessionId: string, noteId: number) => {
  return useMutation({
    mutationFn: (body: string) =>
      responseWrapper(
        createRequest<Note>({
          method: "put",
          url: `${sessionId}/notes/${noteId}`,
          data: { body },
        }),
      ),
  });
};
