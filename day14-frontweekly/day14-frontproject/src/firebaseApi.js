import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
apiKey: "AIzaSyB1mTY8dw4BNQy_vjoYWKeLs-9HZsj45bQ",
authDomain: "swedujo111.firebaseapp.com",
projectId: "swedujo111",
storageBucket: "swedujo111.appspot.com",
messagingSenderId: "198788349220",
appId: "1:198788349220:web:bdb3f87683d6aeadda07b1",
measurementId: "G-EHNQSZ3GRN"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
