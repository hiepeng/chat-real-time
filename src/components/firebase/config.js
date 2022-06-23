import firebase from "firebase/compat/app";
import "firebase/compat/analytics";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCh4eXU-vkb6b81_xbAK6s4x1PkVu4ig9s",
  authDomain: "chat-realtime-5ef14.firebaseapp.com",
  projectId: "chat-realtime-5ef14",
  storageBucket: "chat-realtime-5ef14.appspot.com",
  messagingSenderId: "810452043233",
  appId: "1:810452043233:web:159a4b2d98b7fb7925fea0",
  measurementId: "G-G0LBPBGZND",
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export { db, auth };
export default firebase;
