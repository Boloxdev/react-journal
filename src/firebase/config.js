// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// Import the functions you need from the SDKs you need

const firebaseConfig = {
  apiKey: "AIzaSyA79GljNq9ql8Vf5BC4d-IvCL13vsT0exk",
  authDomain: "react-journal-3a9fa.firebaseapp.com",
  projectId: "react-journal-3a9fa",
  storageBucket: "react-journal-3a9fa.appspot.com",
  messagingSenderId: "652364216697",
  appId: "1:652364216697:web:924c5ac1b8115514ac97a8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase
export const FirebaseApp  = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB   = getFirestore( FirebaseApp );