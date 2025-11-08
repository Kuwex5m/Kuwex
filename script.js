// NOTE: this file must be loaded as a module in the HTML
// <script type="module" src="script.js"></script>

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";

/* ---------- Your Firebase config (provided) ---------- */
const firebaseConfig = {
  apiKey: "AIzaSyB4yjiRg1GTfS54Z0Z6J0KiFCgo2U_zItU",
  authDomain: "kuwex-7b401.firebaseapp.com",
  projectId: "kuwex-7b401",
  storageBucket: "kuwex-7b401.firebasestorage.app",
  messagingSenderId: "5986214795",
  appId: "1:5986214795:web:e68bff5ec8af2e1bcb858e"
};

/* ---------- Initialize Firebase ---------- */
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

/* ---------- DOM references ---------- */
const registerCard = document.getElementById('registerCard');
const loginCard = document.getElementById('loginCard');
const tabRegister = document.getElementById('tabRegister');
const tabLogin = document.getElementById('tabLogin');
const gotoLogin = document.getElementById('gotoLogin');
const gotoRegister = document.getElementById('gotoRegister');
const messageBox = document.getElementById('messageBox');

/* Utilities */
function showMsg(text, timeout = 3500) {
  if (!messageBox) return;
  messageBox.textContent = text;
  messageBox.classList.remove('hidden');
  clearTimeout(messageBox._t);
  messageBox._t = setTimeout(()=> messageBox.classList.add('hidden'), timeout);
}
function showError(err) {
  console.error(err);
  showMsg(err?.message || String(err) || 'Something went wrong');
}

/* Tab switching */
function showRegisterCard() {
  registerCard.classList.remove('hidden');
  loginCard.classList.add('hidden');
  tabRegister.classList.add('active');
  tabLogin.classList.remove('active');
}
function showLoginCard() {
  registerCard.classList.add('hidden');
  loginCard.classList.remove('hidden');
  tabRegister.classList.remove('active');
  tabLogin.classList.add('active');
}
tabRegister?.addEventListener('click', showRegisterCard);
tabLogin?.addEventListener('click', showLoginCard);
gotoLogin?.addEventListener('click', (e)=>{ e.preventDefault(); showLoginCard(); });
gotoRegister?.addEventListener('click', (e)=>{ e.preventDefault(); showRegisterCard(); });

/* ---------- Registration ---------- */
const registerBtn = document.getElementById('registerBtn');
registerBtn?.addEventListener('click', async () => {
  const email = (document.getElementById('registerEmail') || {}).value?.trim();
  const password = (document.getElementById('registerPassword') || {}).value?.trim();
  if (!email || !password) return showMsg('Fill email and password');

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    showMsg('Registration successful — redirecting...');
    setTimeout(()=> window.location.href = 'dashboard.html', 900);
  } catch (err) {
    showError(err);
  }
});

/* ---------- Email login ---------- */
const loginBtn = document.getElementById('loginBtn');
loginBtn?.addEventListener('click', async () => {
  const email = (document.getElementById('loginEmail') || {}).value?.trim();
  const password = (document.getElementById('loginPassword') || {}).value?.trim();
  if (!email || !password) return showMsg('Enter email and password');

  try {
    await signInWithEmailAndPassword(auth, email, password);
    showMsg('Login successful — redirecting...');
    setTimeout(()=> window.location.href = 'dashboard.html', 700);
  } catch (err) {
    showError(err);
  }
});

/* ---------- Password reset ---------- */
const forgotBtn = document.getElementById('forgotBtn');
forgotBtn?.addEventListener('click', async () => {
  const email = prompt('Enter your email to receive reset link:');
  if (!email) return;
  try {
    await sendPasswordResetEmail(auth, email);
    showMsg('Password reset email sent — check your inbox');
  } catch (err) {
    showError(err);
  }
});

/* ---------- Phone auth (reCAPTCHA + SMS) ---------- */
let recaptchaVerifier;
try {
  // Use visible reCAPTCHA if you want, set 'size: "invisible"' to hide
  recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', { size: 'invisible' }, auth);
  // render the widget
  recaptchaVerifier.render().catch(()=>{});
} catch(e){
  console.warn('reCAPTCHA init: ', e);
}

const sendCodeBtn = document.getElementById('sendCodeBtn');
const verifyCodeBtn = document.getElementById('verifyCodeBtn');
const verificationCodeInput = document.getElementById('verificationCode');

sendCodeBtn?.addEventListener('click', async () => {
  const phoneNumber = (document.getElementById('phoneNumber') || {}).value?.trim();
  if (!phoneNumber) return showMsg('Enter phone number with country code e.g. +2547...');
  try {
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
    window.confirmationResult = confirmationResult;
    showMsg('Verification code sent — check SMS');
    verificationCodeInput.style.display = 'block';
    verifyCodeBtn.style.display = 'inline-block';
  } catch (err) {
    // reset reCAPTCHA sometimes needed
    try { recaptchaVerifier.clear(); recaptchaVerifier.render(); } catch(e){}
    showError(err);
  }
});

verifyCodeBtn?.addEventListener('click', async () => {
  const code = (document.getElementById('verificationCode') || {}).value?.trim();
  if (!code) return showMsg('Enter verification code');
  try {
    await window.confirmationResult.confirm(code);
    showMsg('Phone verified — redirecting...');
    setTimeout(()=> window.location.href = 'dashboard.html', 700);
  } catch (err) {
    showError(err);
  }
});

/* ---------- Auth state (redirect safe-guards) ---------- */
onAuthStateChanged(auth, (user) => {
  // If user is on login/register and already signed in, send to dashboard
  const path = location.pathname.split('/').pop();
  if (user && (path === 'index.html' || path === '' || path === '')) {
    // optionally: set welcome display name in dashboard on login
    console.log('User signed in:', user.uid, user.phoneNumber || user.email);
  }
});

/* ---------- Dashboard helpers (logout + motivational messages) ---------- */
export function logoutUser() {
  signOut(auth).then(() => {
    window.location.href = 'index.html';
  }).catch(err => showError(err));
}

// attach logout handler if present on page
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', async () => {
    try {
      await signOut(auth);
      window.location.href = 'index.html';
    } catch (err) { showError(err) }
  });
}

// Motivation messages if element exists
const motBox = document.getElementById('motivationBox');
if (motBox) {
  const quotes = [
    "💪 Stay consistent — your wealth is growing!",
    "🚀 Small daily actions become big results.",
    "🌟 Your deposit is the seed — tasks make it grow.",
    "💼 Invest smart, earn daily, repeat."
  ];
  let i = 0;
  setInterval(() => {
    motBox.textContent = quotes[i % quotes.length];
    i++;
  }, 3500);
}

// Expose logout for HTML inline calls if needed
window.logoutUser = logoutUser;