import { type ChangeEvent, useEffect, useState } from "react";
import styles from "./Note.module.css";
import { useUpdateNote } from "api/hooks/useUpdateNote";
import { useDebounce } from "use-debounce";

interface NoteProps {
  id: number;
  initialBody: string;
  sessionId: string;
}

export default function Note({ id, initialBody, sessionId }: NoteProps) {
  const [body, setBody] = useState(initialBody);
  const [debouncedBody] = useDebounce(body, 2000);
  const { mutate: updateNote } = useUpdateNote(sessionId, id);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
  };

  useEffect(() => {
    updateNote(debouncedBody);
  }, [debouncedBody]);

  return (
    <article className={styles.container}>
      <textarea
        className={styles.textArea}
        onChange={handleChange}
        value={body}
      />
    </article>
  );
}
