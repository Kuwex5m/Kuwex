import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB4yjiRg1GTfS54Z0Z6J0KiFCgo2U_zItU",
  authDomain: "kuwex-7b401.firebaseapp.com",
  projectId: "kuwex-7b401",
  storageBucket: "kuwex-7b401.firebasestorage.app",
  messagingSenderId: "5986214795",
  appId: "1:5986214795:web:e68bff5ec8af2e1bcb858e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

document.getElementById('registerBtn').addEventListener('click', async () => {
  const email = document.getElementById('email').value;
  const pass = document.getElementById('password').value;
  const phone = document.getElementById('phone').value;
  try {
    const user = await createUserWithEmailAndPassword(auth, email, pass);
    await setDoc(doc(db, "users", user.user.uid), {
      email, phone, deposit: 0, dailyEarnings: 0
    });
    alert("Registration successful!");
    window.location.href = "dashboard.html";
  } catch (err) {
    alert(err.message);
  }
});

document.getElementById('loginBtn').addEventListener('click', async () => {
  const email = document.getElementById('email').value;
  const pass = document.getElementById('password').value;
  try {
    await signInWithEmailAndPassword(auth, email, pass);
    window.location.href = "dashboard.html";
  } catch (err) {
    alert(err.message);
  }
});

document.getElementById('forgotPassword').addEventListener('click', async () => {
  const email = prompt("Enter your email to reset password:");
  if (!email) return;
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset email sent!");
  } catch (err) {
    alert(err.message);
  }
});
