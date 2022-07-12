// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBij9nYTmAmbnEyy3GzGt3ZpSbrS7XPSpI",
    authDomain: "social-media-app-prac.firebaseapp.com",
    projectId: "social-media-app-prac",
    storageBucket: "social-media-app-prac.appspot.com",
    messagingSenderId: "310053164939",
    appId: "1:310053164939:web:eb5b43cb902e653e22c18e"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };