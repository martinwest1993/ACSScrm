import Message from "./message";
import { useContext } from "react";
import { ChatContext } from "../../context/chatContext";
import { useDocument } from "../../hooks/useDocument";

export default function Messages() {
  const { data } = useContext(ChatContext);
  const { document, error } = useDocument("chats", data.chatID);

  if (error) {
    return <div className="messages"> No User Selected</div>;
  }

  if (!document) {
    return <span> Loading... </span>;
  }

  return (
    <div className="messages">
      {document.messages.length === 0 && <span>Send A Message</span>}
      {document.messages.length > 0 &&
        document.messages.map((message) => (
          <Message message={message} key={message.id} />
        ))}
    </div>
  );
}
