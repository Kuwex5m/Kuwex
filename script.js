body {
  font-family: Poppins, sans-serif;
  background: linear-gradient(120deg, #0a0f1f, #111831);
  color: white;
  text-align: center;
  margin: 0;
  padding: 0;
}

.auth-container {
  margin-top: 80px;
}

.logo {
  font-size: 32px;
  font-weight: bold;
  color: #1f6feb;
  margin-bottom: 20px;
}

.card {
  background-color: #161b22;
  border-radius: 15px;
  padding: 25px;
  margin: 10px auto;
  width: 90%;
  max-width: 380px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
}

input {
  width: 90%;
  padding: 10px;
  margin: 8px 0;
  border: none;
  border-radius: 6px;
}

button {
  background-color: #1f6feb;
  border: none;
  color: white;
  padding: 10px 25px;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 10px;
  transition: 0.3s;
}

button:hover {
  background-color: #388bfd;
}

.dashboard {
  padding: 20px;
}

.plans {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 20px auto;
  max-width: 400px;
}

.plan {
  background-color: #1e2533;
  border-radius: 12px;
  padding: 15px;
  box-shadow: 0 0 10px rgba(0,0,0,0.4);
}

.motivation {
  margin-top: 20px;
  font-size: 18px;
  font-weight: bold;
  animation: pop 4s infinite;
  color: #1f6feb;
}

@keyframes pop {
  0% { color: #1f6feb; transform: scale(1); }
  50% { color: #00ffcc; transform: scale(1.2); }
  100% { color: #1f6feb; transform: scale(1); }
}