const API = "";

async function loadBalance() {
    try {
        const res = await fetch("/balance");
        const data = await res.json();

        if (data.user) {
            document.getElementById("balance").innerHTML =
                "₦" + data.user.wallet_balance;
        } else {
            document.getElementById("balance").innerHTML = "₦0.00";
        }

    } catch (e) {
        document.getElementById("balance").innerHTML = "Network Error";
        console.log(e);
    }
}

loadBalance();

document.getElementById("refresh").onclick = loadBalance;