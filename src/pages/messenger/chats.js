import { useDocument } from "../../hooks/useDocument";
import { useAuthContext } from "../../hooks/useAuthContext";
import { ChatContext } from "../../context/chatContext";
import { useContext } from "react";

export default function Chats() {
  const { user } = useAuthContext();
  const { dispatch } = useContext(ChatContext);
  const { document, error } = useDocument("userChats", user.uid);

  if (!document) {
    return <span>No Chats</span>;
  }

  if (error) {
    return <span className="error"> {error}</span>;
  }

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };
  return (
    <div className="chats">
      {document &&
        document.data.map((chat) => (
          <div
            className="user-chat"
            key={chat.userInfo.uid}
            onClick={() => handleSelect(chat.userInfo)}
          >
            {console.log(chat)}
            <img
              src={chat.userInfo.photoURL}
              alt="chat avatar"
              className="img"
            />
            <div className="user-chat-info">
              <span className="user-chat-info-span">
                {chat.userInfo.displayName}
              </span>
              <p className="user-chat-info-p">{chat.lastMessage?.text}</p>
            </div>
          </div>
        ))}
    </div>
  );
}
