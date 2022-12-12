import Chats from "./chats";
import MessengerNav from "./messengerNav";
import Seacrh from "./search";

export default function MessengerSidebar() {
  return (
    <div className="messenger-sidebar">
      <MessengerNav />
      <Seacrh />
      <Chats />
    </div>
  );
}
