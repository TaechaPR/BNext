// Import Firebase SDK
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 
import { getAuth } from "firebase/auth";  // If using authentication

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBiRvZjHT_7yiuRFOBBFNud0EvlDE9rCAE",
  authDomain: "b-sync-a60f2.firebaseapp.com",
  projectId: "b-sync-a60f2",
  storageBucket: "b-sync-a60f2.appspot.com",
  messagingSenderId: "271827409082",
  appId: "1:271827409082:web:5ca0b80fe636a9ad5e4a83",
  measurementId: "G-RC05MZ5YLR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore & Authentication
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
