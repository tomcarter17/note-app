import { type ChangeEvent, useState } from "react";
import styles from "./Note.module.css";

interface NoteProps {
  id: number;
  initialBody: string;
  onDelete: (id: number) => void;
}

export default function Note({ id, initialBody, onDelete }: NoteProps) {
  const [body, setBody] = useState(initialBody);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setBody(e.target.value);

  const handleDelete = () => onDelete(id);

  return (
    <div className={styles.container}>
      <textarea className={styles.textArea} onChange={handleChange}>
        {body}
      </textarea>
      <div className={styles.toolbar}>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}
