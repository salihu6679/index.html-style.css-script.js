const API = "https://YOUR-BACKEND-URL.onrender.com";

async function loadBalance() {
  const balance = document.getElementById("balance");

  balance.innerText = "Loading...";

  try {
    const res = await fetch(`${API}/balance`);
    const data = await res.json();

    if (data.balance !== undefined) {
      balance.innerText = "₦" + data.balance;
    } else if (data.wallet_balance !== undefined) {
      balance.innerText = "₦" + data.wallet_balance;
    } else {
      balance.innerText = "₦0.00";
    }
  } catch (err) {
    balance.innerText = "Error";
    console.log(err);
  }
}

document.getElementById("refreshBtn").addEventListener("click", loadBalance);

window.onload = loadBalance;