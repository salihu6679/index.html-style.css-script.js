const API_BASE = "https://indexhtml-stylecss-scriptjs-production.up.railway.app";

async function loadWallet() {
  try {
    const response = await fetch(`${API_BASE}/balance`);
    const data = await response.json();

    if (data.user) {
      document.getElementById("balance").innerText =
        "₦" + data.user.wallet_balance;
    }
  } catch (error) {
    console.error(error);
    document.getElementById("balance").innerText = "Network Error";
  }
}

loadWallet();