import {
  auth,
  db
} from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
import { setDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

// Switch tabs
document.getElementById("loginTab").onclick = () => {
  document.getElementById("loginForm").style.display = "block";
  document.getElementById("registerForm").style.display = "none";
  document.getElementById("loginTab").classList.add("active");
  document.getElementById("registerTab").classList.remove("active");
};

document.getElementById("registerTab").onclick = () => {
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("registerForm").style.display = "block";
  document.getElementById("registerTab").classList.add("active");
  document.getElementById("loginTab").classList.remove("active");
};

// REGISTER
document.getElementById("registerFormContent").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("registerName").value;
  const identifier = document.getElementById("registerIdentifier").value;
  const password = document.getElementById("registerPassword").value;

  try {
    let email = identifier.includes("@") ? identifier : `${identifier}@kuwex-users.com`;
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "users", userCredential.user.uid), {
      name,
      identifier,
      createdAt: new Date()
    });
    alert("Registration successful!");
  } catch (error) {
    alert(error.message);
  }
});

// LOGIN
document.getElementById("loginFormContent").addEventListener("submit", async (e) => {
  e.preventDefault();
  const identifier = document.getElementById("loginIdentifier").value;
  const password = document.getElementById("loginPassword").value;

  try {
    let email = identifier.includes("@") ? identifier : `${identifier}@kuwex-users.com`;
    await signInWithEmailAndPassword(auth, email, password);
    alert("Login successful!");
  } catch (error) {
    alert(error.message);
  }
});

// RESET PASSWORD
document.getElementById("resetLink").addEventListener("click", async (e) => {
  e.preventDefault();
  const email = prompt("Enter your email to reset password:");
  if (!email) return;
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset email sent!");
  } catch (error) {
    alert(error.message);
  }
});