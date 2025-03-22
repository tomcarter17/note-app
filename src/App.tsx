import styles from "./App.module.css";
import { useSessionNotes } from "api/hooks/useSessionNotes";
import Note from "components/Note";
import { useCreateNote } from "api/hooks/useCreateNote";
import { clearSessionId, getSessionId } from "utils/session";
import { useState } from "react";

export default function App() {
  const [sessionId, setSessionId] = useState(getSessionId());

  const { data: notes = [], isLoading } = useSessionNotes(sessionId);
  const { mutate: createNote } = useCreateNote(sessionId);

  const createNewSession = () => {
    clearSessionId();
    setSessionId(getSessionId());
  };

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1>Note app</h1>
      </header>

      <aside className={styles.actionBar}>
        <button onClick={createNewSession}>Create new session</button>
        <button onClick={() => createNote()}>Add note</button>
      </aside>

      <main className={styles.content}>
        {isLoading && (
          <div className={styles.status}>
            <p>Loading...</p>
          </div>
        )}

        {!isLoading && notes.length === 0 && (
          <div className={styles.status}>
            <p>No notes to show.</p>
          </div>
        )}

        {!isLoading && notes.length > 0 && (
          <div className={styles.noteGrid}>
            {notes.map((note) => (
              <div key={note.id} className={styles.note}>
                <Note id={note.id} initialBody={note.body} />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
