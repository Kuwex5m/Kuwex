import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";

// Firebase Config
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
const auth = getAuth(app);

// Tab switching
const loginTab = document.getElementById("loginTab");
const registerTab = document.getElementById("registerTab");
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

loginTab.addEventListener("click", () => {
  loginTab.classList.add("active");
  registerTab.classList.remove("active");
  loginForm.style.display = "block";
  registerForm.style.display = "none";
});

registerTab.addEventListener("click", () => {
  registerTab.classList.add("active");
  loginTab.classList.remove("active");
  registerForm.style.display = "block";
  loginForm.style.display = "none";
});

// Register
registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("registerEmail").value.trim();
  const password = document.getElementById("registerPassword").value;
  const phone = document.getElementById("countryCode").value + document.getElementById("registerPhone").value;

  try {
    if (email) {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Account created successfully!");
      window.location.href = "dashboard.html";
    } else if (phone.length > 6) {
      alert("Phone registration setup coming soon. Please use email for now.");
    } else {
      alert("Please enter a valid email or phone number.");
    }
  } catch (error) {
    alert(error.message);
  }
});

// Login
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const emailPhone = document.getElementById("loginEmailPhone").value.trim();
  const password = document.getElementById("loginPassword").value;

  try {
    if (emailPhone.includes("@")) {
      await signInWithEmailAndPassword(auth, emailPhone, password);
      window.location.href = "dashboard.html";
    } else {
      alert("Phone login setup coming soon. Please use email login for now.");
    }
  } catch (error) {
    alert(error.message);
  }
});

// Forgot Password
document.getElementById("forgotPassword").addEventListener("click", async (e) => {
  e.preventDefault();
  const email = prompt("Enter your registered email to reset your password:");
  if (!email) return;

  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset email sent. Check your inbox.");
  } catch (error) {
    alert(error.message);
  }
});