import { useAuthContext } from "../../hooks/useAuthContext";
import { useContext, useEffect, useRef } from "react";
import { ChatContext } from "../../context/chatContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

export default function Message({ message }) {
  const { user } = useAuthContext();
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behaviour: "smooth" });
  }, [message]);

  return (
    <div
      className={`message ${message.sender === user.uid && "owner"}`}
      ref={ref}
    >
      <div className="message-info">
        <img
          src={
            message.sender === user.uid ? user.photoURL : data.chatUser.photoURL
          }
          alt="sender avatar"
        />
        <span className="date-display-message">
          {" "}
          {formatDistanceToNow(message.Date.toDate(), {
            addSuffix: true,
          })}{" "}
        </span>
      </div>
      <div className="message-content">
        <p>{message.text}</p>
        {message.image && <img src={message.image} alt="sent media" />}
      </div>
    </div>
  );
}
