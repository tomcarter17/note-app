import { type ChangeEvent, useEffect, useRef, useState } from "react";
import styles from "./Note.module.css";
import { useUpdateNote } from "api/hooks/useUpdateNote";
import { useDebounce } from "use-debounce";

interface NoteProps {
  id: number;
  initialBody: string;
  sessionId: string;
}

const SAVE_INTERVAL = 2000;

export default function Note({ id, initialBody, sessionId }: NoteProps) {
  const [body, setBody] = useState(initialBody);
  const [debouncedBody] = useDebounce(body, SAVE_INTERVAL);

  const { mutate: saveNote, isPending: isSaving } = useUpdateNote(
    sessionId,
    id,
  );

  const firstUpdate = useRef(true);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    saveNote(debouncedBody);
  }, [debouncedBody]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
  };

  return (
    <article className={styles.container}>
      <textarea
        className={styles.textArea}
        onChange={handleChange}
        value={body}
      />
      <div className={styles.toolbar}>{isSaving && <div>Saving...</div>}</div>
    </article>
  );
}
