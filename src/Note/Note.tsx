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
    <textarea className={styles.container} onChange={handleChange}>
      {body}
    </textarea>
  );
}
