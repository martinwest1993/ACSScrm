import Avatar from "../../components/avatar/avatar";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function MessengerNav() {
  const { user } = useAuthContext();
  return (
    <div className="messenger-nav">
      <div className="messenger-user">
        <Avatar src={user.photoURL} />
        <span>{user.displayName}</span>
      </div>
    </div>
  );
}
