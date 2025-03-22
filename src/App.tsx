import { v4 as uuidv4 } from "uuid";
import styles from "./App.module.css";
import { useSessionNotes } from "api/hooks/useSessionNotes";
import Note from "Note";

const SESSION_ID = uuidv4();

export default function App() {
  const { data: notes = [], isLoading } = useSessionNotes(SESSION_ID);

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1>Note app</h1>
      </header>

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
                <Note
                  id={note.id}
                  initialBody={note.body}
                  onDelete={() => {}}
                />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
