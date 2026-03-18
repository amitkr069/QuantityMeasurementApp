document.addEventListener("DOMContentLoaded", async () => {

    const state = {
        type: "Length",
        action: "Conversion",
        fromVal: null,
        fromUnit: "",
        toVal: null,
        toUnit: "",
        operator: "+"
    };

    const fromUnitSelect = document.getElementById("fromUnit");
    const toUnitSelect = document.getElementById("toUnit");

    const typeCards = document.querySelectorAll(".type-card");
    const actionButtons = document.querySelectorAll(".action-btn");

    attachEventListeners();
    await loadUnits("Length");
    setDefaultActive();
    toggleOperators(false);
    loadHistory();

    function attachEventListeners() {
        typeCards.forEach(card => {
            card.addEventListener("click", async () => {
                typeCards.forEach(c => c.classList.remove("active"));
                card.classList.add("active");

                state.type = card.innerText.trim();
                await loadUnits(state.type);
            });
        });

        actionButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                actionButtons.forEach(b => b.classList.remove("active-btn"));
                btn.classList.add("active-btn");

                state.action = btn.innerText.trim();

                if (state.action === "Arithmetic") {
                    toggleOperators(true);
                } else {
                    toggleOperators(false);
                }
            });
        });
    }

    async function loadUnits(type) {
        const units = await getUnits(type);

        if (!units.length) {
            alert("No units found");
            return;
        }

        fromUnitSelect.innerHTML = "";
        toUnitSelect.innerHTML = "";

        units.forEach(unit => {
            fromUnitSelect.innerHTML += `<option value="${unit.symbol}">${unit.label}</option>`;
            toUnitSelect.innerHTML += `<option value="${unit.symbol}">${unit.label}</option>`;
        });

        state.fromUnit = units[0]?.symbol || "";
        state.toUnit = units[0]?.symbol || "";
    }

    function setDefaultActive() {
        typeCards[0].classList.add("active");
        actionButtons[0].classList.add("active-btn");
    }

    function toggleOperators(show) {
        const operatorBox = document.getElementById("operatorBox");
        operatorBox.innerHTML = show ? "+" : "→";
    }

    async function loadHistory() {
        try {
            const res = await fetch("http://localhost:3000/history");
            const history = await res.json();
            console.log("History:", history);
        } catch (error) {
            console.error(error);
        }
    }

});