import { initializeApp } from "firebase/app";
import { getFirestore, writeBatch } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCGusKqWovYRSuYI8dF5JVYBuZBED13UN4",
  authDomain: "circle-devs.firebaseapp.com",
  projectId: "circle-devs",
  storageBucket: "circle-devs.firebasestorage.app",
  messagingSenderId: "279487439769",
  appId: "1:279487439769:web:efc7ac7393153185d52908"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const batch = writeBatch(db);

export {db};
