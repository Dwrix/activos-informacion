
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
/* import { getStorage } from 'firebase/storage'; */
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0Kai5JhVtDBhYxRRFSnavLJHS5mKLDLM",
  authDomain: "activos-informacion-a99ea.firebaseapp.com",
  databaseURL: "https://activos-informacion-a99ea-default-rtdb.firebaseio.com",
  projectId: "activos-informacion-a99ea",
  storageBucket: "activos-informacion-a99ea.appspot.com",
  messagingSenderId: "363091086784",
  appId: "1:363091086784:web:c3439959a40231f791cc25"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)



export default  db ;