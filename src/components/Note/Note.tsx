import { type ChangeEvent, useState } from "react";
import styles from "./Note.module.css";

interface NoteProps {
  id: number;
  initialBody: string;
}

export default function Note({ initialBody }: NoteProps) {
  const [body, setBody] = useState(initialBody);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setBody(e.target.value);

  return (
    <div className={styles.container}>
      <textarea className={styles.textArea} onChange={handleChange}>
        {body}
      </textarea>
    </div>
  );
}
