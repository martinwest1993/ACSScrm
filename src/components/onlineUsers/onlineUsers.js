import { useState } from "react";
import { useCollection } from "../../hooks/useCollection";
import Avatar from "../avatar/avatar";

// styles
import "./onlineUsers.css";

export default function OnlineUsers() {
  const { error, documents } = useCollection("users");
  const [showUsers, setShowUsers] = useState(true);

  const handleClick = () => {
    showUsers ? setShowUsers(false) : setShowUsers(true);
  };
  return (
    <div className={!showUsers ? "user-list" : "user-list-closed"}>
      <button className="usersOnline-close btn" onClick={handleClick}>
        {!showUsers ? "x" : "Users"}
      </button>
      {!showUsers && <h2>All Users</h2>}
      {error && <div className="error"> {error}</div>}
      <div className="user-list-item-container">
        {documents &&
          documents.map((user) => (
            <div key={user.id} className="user-list-item">
              {user.online && !showUsers && (
                <span className="online-user"></span>
              )}
              {!showUsers && <span>{user.displayName}</span>}
              {!showUsers && <Avatar src={user.photoURL} />}
            </div>
          ))}
      </div>
    </div>
  );
}
