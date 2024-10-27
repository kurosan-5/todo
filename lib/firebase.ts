// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHGnc9bVpCL498IRYsY9iQTjbU-uX0kW0",
  authDomain: "react-to-do-6082b.firebaseapp.com",
  projectId: "react-to-do-6082b",
  storageBucket: "react-to-do-6082b.appspot.com",
  messagingSenderId: "178024563489",
  appId: "1:178024563489:web:6b409e5d36885561bdf460"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {auth, provider};

const db = getFirestore(app);

export { db }