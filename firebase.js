// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyB4yjiRg1GTfS54Z0Z6J0KiFCgo2U_zItU",
  authDomain: "kuwex-7b401.firebaseapp.com",
  projectId: "kuwex-7b401",
  storageBucket: "kuwex-7b401.firebasestorage.app",
  messagingSenderId: "5986214795",
  appId: "1:5986214795:web:e68bff5ec8af2e1bcb858e"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
