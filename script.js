// script.js (module)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";

/* ---------- FIREBASE CONFIG ---------- */
/* Replace with your project config (this is the one you provided earlier) */
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

/* ---------- UI HOOKS ---------- */
const tabLogin = document.getElementById('tab-login');
const tabRegister = document.getElementById('tab-register');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

function showLogin(){
  tabLogin.classList.add('active');
  tabRegister.classList.remove('active');
  loginForm.classList.remove('hidden');
  registerForm.classList.add('hidden');
}
function showRegister(){
  tabRegister.classList.add('active');
  tabLogin.classList.remove('active');
  registerForm.classList.remove('hidden');
  loginForm.classList.add('hidden');
}
tabLogin.addEventListener('click', showLogin);
tabRegister.addEventListener('click', showRegister);

/* ---------- REGISTER ---------- */
registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('registerName').value.trim();
  const code = document.getElementById('countryCode').value;
  const phone = (document.getElementById('registerPhone').value || '').trim();
  const email = (document.getElementById('registerEmail').value || '').trim();
  const password = document.getElementById('registerPassword').value;

  // prefer email if present
  try{
    if(email){
      // Create account with email/password
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Account created. Redirecting to dashboard...');
      window.location.href = 'dashboard.html';
      return;
    }

    // If no email but phone provided — note: phone OTP requires Firebase phone auth setup
    if(!email && phone.length>5){
      alert('Phone registration requires OTP setup. For now please register using email.');
      return;
    }

    alert('Please provide an email address (recommended).');
  }catch(err){
    alert(err.message || 'Registration failed');
  }
});

/* ---------- LOGIN ---------- */
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const identifier = document.getElementById('loginEmailPhone').value.trim();
  const password = document.getElementById('loginPassword').value;

  try{
    if(!identifier) return alert('Enter email or phone');
    // simple check: email contains @
    if(identifier.includes('@')){
      await signInWithEmailAndPassword(auth, identifier, password);
      window.location.href = 'dashboard.html';
    } else {
      // phone sign-in requires OTP workflow (not implemented here)
      alert('Phone login is not activated here yet — please login with email for now.');
    }
  }catch(err){
    alert(err.message || 'Login failed');
  }
});

/* ---------- PASSWORD RESET ---------- */
document.getElementById('forgotPassword').addEventListener('click', async (e) => {
  e.preventDefault();
  const email = prompt('Enter your registered email to receive reset instructions:');
  if(!email) return;
  try{
    await sendPasswordResetEmail(auth, email);
    alert('Password reset email sent. Check your inbox (and spam).');
  }catch(err){
    alert(err.message || 'Could not send reset email');
  }
});

/* ---------- Auth state guard (keeps user on index if logged in) ---------- */
onAuthStateChanged(auth, user => {
  // If user already signed in and they are on index.html, redirect to dashboard
  if(user && location.pathname.endsWith('index.html') || user && location.pathname.endsWith('/Kuwex/') || user && location.pathname.endsWith('/Kuwex')){
    try { window.location.href = 'dashboard.html'; } catch(e){}
  }
});
