// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB4yjiRg1GTfS54Z0Z6J0KiFCgo2U_zItU",
  authDomain: "kuwex-7b401.firebaseapp.com",
  projectId: "kuwex-7b401",
  storageBucket: "kuwex-7b401.firebasestorage.app",
  messagingSenderId: "5986214795",
  appId: "1:5986214795:web:e68bff5ec8af2e1bcb858e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, doc, getDoc, setDoc, updateDoc };
