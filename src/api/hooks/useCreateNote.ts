import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRequest, responseWrapper } from "api/axios";
import { Note } from "types/note";

const DEFAULT_NOTE_BODY = "Insert your note content here!";

export const useCreateNote = (sessionId: string) => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: () =>
      responseWrapper(
        createRequest<Note[]>({
          method: "post",
          url: `${sessionId}/notes`,
          data: { body: DEFAULT_NOTE_BODY },
        }),
      ),
    onSuccess: () =>
      client.invalidateQueries({ queryKey: ["notes", sessionId] }),
  });
};
