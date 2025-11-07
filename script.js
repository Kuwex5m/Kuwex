// --- Logout function ---
document.getElementById("logoutBtn").addEventListener("click", () => {
  alert("You have been logged out successfully!");
  window.location.href = "index.html"; // Redirect back to login
});

// --- Investment plans ---
const plans = [
  {
    title: "Starter Plan",
    min: "$100",
    cashback: "10% instant cashback",
    tasks: "5 ads + 1 research + 1 video daily",
    earning: "Up to 28% daily returns on engagement"
  },
  {
    title: "Pro Plan",
    min: "$500",
    cashback: "10% instant cashback",
    tasks: "10 ads + 2 research + 2 videos daily",
    earning: "Up to 35% daily returns on engagement"
  },
  {
    title: "Elite Plan",
    min: "$1,000+",
    cashback: "10% instant cashback",
    tasks: "Unlimited daily tasks",
    earning: "Up to 45% daily returns on engagement"
  }
];

function loadPlans() {
  const plansContainer = document.getElementById("investmentPlans");
  plansContainer.innerHTML = "";

  plans.forEach(plan => {
    const planCard = document.createElement("div");
    planCard.classList.add("plan-card");
    planCard.innerHTML = `
      <h3>${plan.title}</h3>
      <p><strong>Minimum Deposit:</strong> ${plan.min}</p>
      <p><strong>Cashback:</strong> ${plan.cashback}</p>
      <p><strong>Daily Tasks:</strong> ${plan.tasks}</p>
      <p><strong>Potential Earnings:</strong> ${plan.earning}</p>
      <button onclick="investInPlan('${plan.title}')">Invest Now</button>
    `;
    plansContainer.appendChild(planCard);
  });
}

function investInPlan(planName) {
  alert(`You selected the ${planName}. Please proceed to deposit to activate this plan.`);
}

loadPlans();

// --- Motivational messages ---
const messages = [
  "💰 Your investment is growing — keep earning with today’s tasks!",
  "🔥 Watch 5 ads today to unlock a 5% bonus!",
  "🎉 Kuwex Tip: Complete your research tasks for higher rewards!",
  "📈 Stay active for 30 days to maximize your profit!",
  "🚀 Every click brings you closer to your financial goals!"
];

function showPopup(message) {
  const popup = document.getElementById("motivationalPopup");
  popup.textContent = message;
  popup.classList.add("show");

  setTimeout(() => {
    popup.classList.remove("show");
  }, 4000);
}

function startPopups() {
  setInterval(() => {
    const msg = messages[Math.floor(Math.random() * messages.length)];
    showPopup(msg);
  }, 8000);
}

startPopups();