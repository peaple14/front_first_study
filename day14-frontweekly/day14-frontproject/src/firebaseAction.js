import { addDoc, collection, getDocs, onSnapshot, query } from "firebase/firestore"; 
import { db } from "./firebaseApi";
import { useEffect, useState } from "react";


export async function addRowData(collectionName, rowData) {
    try {
      const docRef = await addDoc(collection(db, collectionName), rowData);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
}

export async function getUserList() {
}