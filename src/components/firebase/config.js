// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/analytics";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCh4eXU-vkb6b81_xbAK6s4x1PkVu4ig9s",
  authDomain: "chat-realtime-5ef14.firebaseapp.com",
  projectId: "chat-realtime-5ef14",
  storageBucket: "chat-realtime-5ef14.appsp ot.com",
  messagingSenderId: "810452043233",
  appId: "1:810452043233:web:159a4b2d98b7fb7925fea0",
  measurementId: "G-G0LBPBGZND",
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();

// auth.useEmulator("http://localhost:9099");
// if (window.location.hostname === "localhost") {
//   db.useEmulator("localhost", "8081");
// }

export { db, auth };
export default firebase;
