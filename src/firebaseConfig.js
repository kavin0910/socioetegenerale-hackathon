import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCtz2RhsfDPCKszVcioHtY9_x17p9HBZQ",
  authDomain: "project-ethereum-664dd.firebaseapp.com",
  projectId: "project-ethereum-664dd",
  storageBucket: "project-ethereum-664dd.appspot.com",
  messagingSenderId: "96680563967",
  appId: "1:96680563967:web:d1f0bb1cc24880b4b6a8ca",
  measurementId: "G-RQZF9KXGCJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };
