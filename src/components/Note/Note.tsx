import { type ChangeEvent, useEffect, useRef, useState } from "react";
import styles from "./Note.module.css";
import { useUpdateNote } from "api/hooks/useUpdateNote";
import { useDebounce } from "use-debounce";
import UserList from "components/UserList";
import { User } from "types/user";

interface NoteProps {
  id: number;
  initialBody: string;
  sessionId: string;
}

const SAVE_INTERVAL = 2000;

export default function Note({ id, initialBody, sessionId }: NoteProps) {
  const [body, setBody] = useState(initialBody);
  const [debouncedBody] = useDebounce(body, SAVE_INTERVAL);
  const [isShowingUsers, setIsShowingUsers] = useState(false);

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
    if (e.target.value.includes("@")) {
      setIsShowingUsers(true);
    }

    setBody(e.target.value);
  };

  const handleSelectUser = (user: User) => {
    setIsShowingUsers(false);
    // This currently only works for the first @ mention
    setBody(body.replace("@", `@${user.username} `));
  };

  return (
    <article className={styles.container}>
      <textarea
        className={styles.textArea}
        onChange={handleChange}
        value={body}
      />
      <div className={styles.toolbar}>{isSaving && <div>Saving...</div>}</div>
      {isShowingUsers && <UserList onSelect={handleSelectUser} />}
    </article>
  );
}
