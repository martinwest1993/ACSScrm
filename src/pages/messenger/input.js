import { useAuthContext } from "../../hooks/useAuthContext";
import { useContext, useState } from "react";
import { ChatContext } from "../../context/chatContext";
import {
  projectFirestore,
  timestamp,
  projectStorage,
} from "../../firebase/config";
import firebase from "firebase";
import { v4 as uuid } from "uuid";

//images
import Img from "../../assets/img.png";
import Attach from "../../assets/attach.png";

export default function Input() {
  const { user } = useAuthContext();
  const { data } = useContext(ChatContext);

  //form field values
  const [text, setText] = useState("");
  const [media, setMedia] = useState(null);

  const handleClick = async () => {
    const docRefUser = projectFirestore.collection("chats").doc(data.chatID);
    if (media) {
      const uploadPath = `chatMedia/${data.chatID}/${media.name}`;
      const img = await projectStorage.ref(uploadPath).put(media);
      const imgUrl = await img.ref.getDownloadURL();

      await docRefUser.update({
        messages: firebase.firestore.FieldValue.arrayUnion({
          id: uuid(),
          text,
          sender: user.uid,
          Date: timestamp.now(),
          image: imgUrl,
        }),
      });
    } else {
      await docRefUser.update({
        messages: firebase.firestore.FieldValue.arrayUnion({
          id: uuid(),
          text,
          sender: user.uid,
          Date: timestamp.now(),
        }),
      });
    }

    setText("");
    setMedia(null);
  };

  return (
    <div className="chat-input">
      <input
        type="text"
        placeholder="Type Something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="send">
        <img src={Attach} alt="attach file" />
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setMedia(e.target.files[0])}
        />
        <label htmlFor="file">
          <img src={Img} alt="add img icon" />
        </label>
        <button onClick={handleClick}> Send </button>
      </div>
    </div>
  );
}
