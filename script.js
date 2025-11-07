// Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Switching cards
const loginCard = document.getElementById("loginCard");
const registerCard = document.getElementById("registerCard");

if (document.getElementById("showLogin")) {
  document.getElementById("showLogin").onclick = () => {
    registerCard.style.display = "none";
    loginCard.style.display = "block";
  };
}

if (document.getElementById("showRegister")) {
  document.getElementById("showRegister").onclick = () => {
    loginCard.style.display = "none";
    registerCard.style.display = "block";
  };
}

// Registration
if (document.getElementById("registerBtn")) {
  document.getElementById("registerBtn").onclick = async () => {
    const email = document.getElementById("registerEmail").value.trim();
    const password = document.getElementById("registerPassword").value.trim();
    if (!email || !password) return alert("Please fill all fields");

    try {
      await auth.createUserWithEmailAndPassword(email, password);
      alert("Registration successful! Redirecting...");
      window.location.href = "dashboard.html";
    } catch (err) {
      alert(err.message);
    }
  };
}

// Login
if (document.getElementById("loginBtn")) {
  document.getElementById("loginBtn").onclick = async () => {
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();
    if (!email || !password) return alert("Please enter your credentials");

    try {
      await auth.signInWithEmailAndPassword(email, password);
      alert("Login successful!");
      window.location.href = "dashboard.html";
    } catch (err) {
      alert(err.message);
    }
  };
}

// Phone authentication setup
if (document.getElementById("sendCodeBtn")) {
  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier("recaptcha-container", {
    size: "normal",
    callback: () => console.log("reCAPTCHA verified")
  });

  document.getElementById("sendCodeBtn").onclick = () => {
    const phoneNumber = document.getElementById("phoneNumber").value.trim();
    const appVerifier = window.recaptchaVerifier;
    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        alert("Verification code sent!");
      })
      .catch((err) => alert(err.message));
  };

  document.getElementById("verifyCodeBtn").onclick = () => {
    const code = document.getElementById("verificationCode").value.trim();
    confirmationResult.confirm(code)
      .then(() => {
        alert("Phone verified successfully!");
        window.location.href = "dashboard.html";
      })
      .catch(() => alert("Invalid verification code"));
  };
}

// Dashboard features
if (document.getElementById("motivationBox")) {
  const messages = [
    "💪 Stay consistent — your wealth is growing!",
    "🚀 Every task you do moves you closer to financial freedom!",
    "🌟 Your dedication today brings rewards tomorrow!",
    "💼 Kuwex — where smart investing meets daily growth!"
  ];

  const box = document.getElementById("motivationBox");
  let i = 0;
  setInterval(() => {
    box.innerText = messages[i % messages.length];
    i++;
  }, 4000);
}

// Logout
function logoutUser() {
  firebase.auth().signOut().then(() => {
    alert("Logged out successfully!");
    window.location.href = "index.html";
  });
}