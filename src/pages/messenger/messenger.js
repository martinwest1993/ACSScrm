//styles
import "./messenger.css";

import Chat from "./chat";
import MessengerSidebar from "./messengerSidebar";

export default function Messenger() {
  return (
    <div className="messenger">
      <div className="messenger-container">
        <MessengerSidebar />
        <Chat />
      </div>
    </div>
  );
}
