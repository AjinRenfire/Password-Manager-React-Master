
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore' ;


const firebaseConfig = {
  apiKey: "AIzaSyBM1YpLQn8wHWuqTEl7Tn4vW_32r02GP28",
  authDomain: "passman-904da.firebaseapp.com",
  projectId: "passman-904da",
  storageBucket: "passman-904da.appspot.com",
  messagingSenderId: "856697772325",
  appId: "1:856697772325:web:4f60ffc0d4d4e40d54a2cc"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore (app) ;

