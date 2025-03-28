import { useUsers } from "api/hooks/userUsers";
import styles from "./UserList.module.css";
import { User } from "types/user";

interface UserListProps {
  onSelect: (user: User) => void;
}

export default function UserList({ onSelect }: UserListProps) {
  const { data: users = [], isLoading } = useUsers();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      {users.map((user) => (
        <button
          key={user.username}
          className={styles.item}
          onClick={() => onSelect(user)}
        >
          {user.first_name} {user.last_name}
        </button>
      ))}
    </div>
  );
}
