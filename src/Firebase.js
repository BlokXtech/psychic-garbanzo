// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsaXY21UbS8OEvVR5HLa9SeqWUB6KLxAw",
  authDomain: "hospital-management-syst-7e672.firebaseapp.com",
  projectId: "hospital-management-syst-7e672",
  storageBucket: "hospital-management-syst-7e672.firebasestorage.app",
  messagingSenderId: "32386815643",
  appId: "1:32386815643:web:538b107d9e7dd18f83583e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);