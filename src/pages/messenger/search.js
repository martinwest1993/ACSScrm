import { useState } from "react";
import { projectFirestore, timestamp } from "../../firebase/config";
import { useAuthContext } from "../../hooks/useAuthContext";
import firebase from "firebase";

export default function Seacrh() {
  const { user } = useAuthContext();

  // search values
  const [username, setUsername] = useState("");
  const [searchUser, setSearchUser] = useState("");
  const [err, setErr] = useState("");

  const handleSearch = () => {
    projectFirestore
      .collection("users")
      .where("displayName", "==", username)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          setSearchUser(doc.data());
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
        setErr(error);
      });
  };

  const handleKeyDown = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    //check wether chats in firestore exists if not create
    const combinedID =
      user.uid > searchUser.uid
        ? user.uid + searchUser.uid
        : searchUser.uid + user.uid;
    try {
      const docRef = projectFirestore.collection("chats").doc(combinedID);

      const docRefUser = projectFirestore.collection("userChats").doc(user.uid);

      const docRefSearchUser = projectFirestore
        .collection("userChats")
        .doc(searchUser.uid);

      docRef.get().then((doc) => {
        if (doc.exists) {
          console.log("Document data:", doc.data());
        } else {
          // doc.data() will be undefined in this case
          projectFirestore
            .collection("chats")
            .doc(combinedID)
            .set({ messages: [] })
            .then(
              //create user chats
              docRefUser.update({
                data: firebase.firestore.FieldValue.arrayUnion({
                  combinedID,
                  userInfo: {
                    uid: searchUser.uid,
                    displayName: searchUser.displayName,
                    photoURL: searchUser.photoURL,
                  },
                  date: timestamp.fromDate(new Date()),
                }),
              })
            )
            .then(
              docRefSearchUser.update({
                data: firebase.firestore.FieldValue.arrayUnion({
                  combinedID,
                  userInfo: {
                    uid: user.uid,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                  },
                  date: timestamp.fromDate(new Date()),
                }),
              })
            );
        }
      });
    } catch (error) {
      return <p className="error">{error}</p>;
    }
    setSearchUser(null);
    setUsername("");
  };
  return (
    <div className="search">
      <div className="search-form">
        <input
          type="text"
          className="search-input"
          placeholder="Find A User"
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKeyDown}
          value={username}
        />
      </div>
      {err && <span className="error">{err}</span>}
      {searchUser && (
        <div className="user-chat" onClick={handleSelect}>
          <img src={searchUser.photoURL} alt="user" className="img" />
          <div className="user-chat-info">
            <span className="user-chat-info-span">
              {searchUser.displayName}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
