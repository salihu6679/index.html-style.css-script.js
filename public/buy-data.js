async function loadPlans() {
    const network = document.getElementById("network").value;
    const plan = document.getElementById("plan");

    plan.innerHTML = "<option>Loading...</option>";

    try {
        const res = await fetch("/balance");
        const data = await res.json();

        let plans = [];

        if (network === "MTN") {
            plans = data.Dataplans.MTN_PLAN.ALL;
        } else if (network === "AIRTEL") {
            plans = data.Dataplans.AIRTEL_PLAN.ALL;
        } else if (network === "GLO") {
            plans = data.Dataplans.GLO_PLAN.ALL;
        } else if (network === "9MOBILE") {
            plans = data.Dataplans["9MOBILE_PLAN"].ALL;
        }

        plan.innerHTML = "";

        plans.forEach(item => {
            plan.innerHTML += `
            <option value="${item.dataplan_id}">
                ${item.plan} - ₦${item.plan_amount}
            </option>`;
        });

    } catch (err) {
        plan.innerHTML = "<option>Error Loading Plans</option>";
        console.log(err);
    }
}

document.getElementById("network").addEventListener("change", loadPlans);

loadPlans();

document.getElementById("buyBtn").addEventListener("click", () => {

    const phone = document.getElementById("phone").value;
    const plan = document.getElementById("plan").value;

    if (phone === "") {
        alert("Enter Phone Number");
        return;
    }

    alert(
        "Buy Data feature is the next step.\n\nPhone: " +
        phone +
        "\nPlan ID: " +
        plan
    );

});