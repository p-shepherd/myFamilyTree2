import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAICeE7Sj8orulK03ZGFmkRmXojEaovdBs",
  authDomain: "myfamilytree-c0588.firebaseapp.com",
  projectId: "myfamilytree-c0588",
  storageBucket: "myfamilytree-c0588.appspot.com",
  messagingSenderId: "248444141831",
  appId: "1:248444141831:web:bdc8a354b8b8997a8b45a2",
  measurementId: "G-PGRLQYP9Q4",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
