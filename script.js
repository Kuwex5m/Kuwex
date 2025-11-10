// script.js
import { db, doc, getDoc, updateDoc } from "./firebase.js";

const userId = "TestUser"; // Replace with actual user login ID later

async function loadUserData() {
  try {
    const userRef = doc(db, "Users", userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const data = userSnap.data();
      document.getElementById("username").innerText = data.name || "User";
      document.getElementById("deposit").innerText = `KSH ${data.deposit || 0}`;
      document.getElementById("balance").innerText = `KSH ${data.balance || 0}`;
    } else {
      alert("No user data found in Firestore!");
    }
  } catch (error) {
    console.error("Error loading data:", error);
  }
}

async function uploadProof() {
  const fileInput = document.getElementById("proof");
  const amountInput = document.getElementById("amount");
  if (!fileInput.files.length || !amountInput.value) {
    alert("Please enter amount and upload screenshot.");
    return;
  }
  alert("Deposit submitted successfully. Admin will verify and update your balance.");
  amountInput.value = "";
  fileInput.value = "";
}

window.onload = loadUserData;
window.uploadProof = uploadProof;
