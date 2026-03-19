/**
 * @author Amit
 * @version 12.0
 */

import { getUnits } from "./api.js";
import { getConversion } from "./api.js";
import { applyConversion } from "./conversion.js";
import { showResult } from "./ui.js";

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

    const typeContainer = document.querySelector(".row.text-center");
    const actionContainer = document.querySelector(".action-button");

    setDefaultActive();
    await loadUnits("Length");
    toggleOperators(false);
    loadHistory();
    showResult(25, "km");
    attachEventListeners();

    function attachEventListeners() {

        typeCards.forEach(card => {
            card.addEventListener("click", async () => {
                setActive(typeContainer, card, ".type-card");

                state.type = card.innerText.trim();
                await loadUnits(state.type);
            });
        });

        actionButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                setActive(actionContainer, btn, ".action-btn");

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
        actionButtons[0].classList.add("active");
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
        if (!selectEl) return;

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

    function setActive(parentEl, clickedEl, childSelector) {
        parentEl.querySelectorAll(childSelector).forEach(el => {
            el.classList.remove("active");
        });

        clickedEl.classList.add("active");
    }

});