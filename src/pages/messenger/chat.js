import { useContext } from "react";
import { ChatContext } from "../../context/chatContext";

//images
import Video from "../../assets/cam.png";
import Input from "./input";
import Messages from "./messages";

export default function Chat() {
  const { data } = useContext(ChatContext);

  return (
    <div className="chat">
      <div className="chat-info">
        <span>{data.chatUser?.displayName}</span>
        <div className="chat-icons">
          <img src={Video} alt="video chat icon" />
          <button className="chat-extra-btn">...</button>
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
}
