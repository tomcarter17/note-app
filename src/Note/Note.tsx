import styles from "./Note.module.css";

interface NoteProps {
  id: number;
  body: string;
}

export default function Note({ body }: NoteProps) {
  return <div className={styles.container}>{body}</div>;
}
