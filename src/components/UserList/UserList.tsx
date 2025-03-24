import { useUsers } from "api/hooks/userUsers";
import styles from "./UserList.module.css";
export default function UserList() {
  const { data: users = [], isLoading } = useUsers();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      {users.map((user) => (
        <button key={user.username} className={styles.item}>
          {user.first_name} {user.last_name}
        </button>
      ))}
    </div>
  );
}
