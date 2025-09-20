// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwAIwU_-Emq1yPZ9LMU4ydueQ28nH4RuM",
  authDomain: "week7-jing-f99a5.firebaseapp.com",
  projectId: "week7-jing-f99a5",
  storageBucket: "week7-jing-f99a5.firebasestorage.app",
  messagingSenderId: "1006597253207",
  appId: "1:1006597253207:web:562956adc4172130415b12"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore();
export default db;
