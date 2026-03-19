/**
 * @author Amit
 * @version 10.0
 * populating drop down has been added in this version
 */
import { getUnits } from "..javascript/api.js";
import { getConversion } from "./api.js";
import { applyConversion } from "./conversion.js";

const convObj = await getConversion(from, to);
const result = applyConversion(value, convObj);

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

        populateDropdown(fromUnitSelect, units);
        populateDropdown(toUnitSelect, units);

        state.fromUnit = "";
        state.toUnit = "";
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

    function populateDropdown(selectEl, units) {
    if (!selectEl) {
        console.warn("Dropdown element not found");
        return;
    }

    selectEl.innerHTML = "";

    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "-- Select Unit --";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    selectEl.appendChild(defaultOption);

    units.forEach(u => {
        const opt = document.createElement("option");
        opt.value = u.symbol;
        opt.textContent = `${u.label} (${u.symbol})`;
        selectEl.appendChild(opt);
    });
}

});