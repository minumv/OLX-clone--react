import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDxkp22IPpWfNL3T-gyDjLIpOlBvWXCUCs",
  authDomain: "react-olx-clone-ea45b.firebaseapp.com",
  projectId: "react-olx-clone-ea45b",
  storageBucket: "react-olx-clone-ea45b.appspot.com",
  messagingSenderId: "600623263124",
  appId: "1:600623263124:web:3972c2a944af9a21d63381"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export const googleProvider = new GoogleAuthProvider();