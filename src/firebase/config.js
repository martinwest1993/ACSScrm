import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDFP8Lq7YfCwzZVGv5I-tiekBcbaiHDsvE",
  authDomain: "acsscrm-b5f6f.firebaseapp.com",
  projectId: "acsscrm-b5f6f",
  storageBucket: "acsscrm-b5f6f.appspot.com",
  messagingSenderId: "590885302925",
  appId: "1:590885302925:web:36dea7eeaa8d110784a8c4",
  measurementId: "G-3DFHYR5GQH",
};

//init firebase
firebase.initializeApp(firebaseConfig);

//init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();

// timestamp
const timestamp = firebase.firestore.Timestamp;

export { projectAuth, projectFirestore, projectStorage, timestamp };
