/**
 * @author Amit
 * @version 17.0
 */

import { getUnits, getConversion, saveHistory, getHistory } from "./api.js";
import { applyConversion, performArithmetic } from "./conversion.js";
import { showResult, renderHistory } from "./ui.js";

document.addEventListener("DOMContentLoaded", async () => {

    const state = {
        type: "Length",
        action: "Conversion", // Default action
        operator: "+"
    };

    let debounceTimer;

    const fromInput = document.getElementById("fromValue");
    const toInput = document.getElementById("toValue");
    const labelFrom = document.getElementById("labelFrom");
    const labelTo = document.getElementById("labelTo");

    const fromUnit = document.getElementById("fromUnit");
    const toUnit = document.getElementById("toUnit");
    const resultUnit = document.getElementById("resultUnit");

    const resultBox = document.getElementById("result-box");
    const typeCards = document.querySelectorAll(".type-card");
    const actionButtons = document.querySelectorAll(".action-btn");

    await loadUnits(state.type);
    setDefaultActive();
    await loadHistory();
    toggleOperators(false);
    attachEvents();

    function attachEvents() {
        typeCards.forEach(card => {
            card.addEventListener("click", async () => {
                state.type = card.dataset.type;
                setActive(typeCards, card);
                clearAll();
                await loadUnits(state.type);
            });
        });

        actionButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                state.action = btn.dataset.action;
                setActive(actionButtons, btn);
                clearAll();
                toggleOperators(state.action === "Arithmetic");

                // Dynamic Labels & Input states
                if (state.action === "Arithmetic" || state.action === "Comparison") {
                    labelFrom.textContent = "VALUE 1";
                    labelTo.textContent = "VALUE 2";
                    toInput.readOnly = false;
                    toInput.style.background = "#fff"; // Make it look editable
                    resultBox.style.display = "block";
                } else {
                    labelFrom.textContent = "FROM";
                    labelTo.textContent = "TO";
                    toInput.readOnly = true;
                    toInput.style.background = "#eef1f5"; // Make it look locked
                    resultBox.style.display = "none";
                }
            });
        });

        fromInput.addEventListener("input", debounceCalculate);
        toInput.addEventListener("input", debounceCalculate);
        fromUnit.addEventListener("change", calculate);
        toUnit.addEventListener("change", calculate);
        resultUnit.addEventListener("change", calculate);
    }

    function debounceCalculate() {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            calculate();
        }, 600); // Waits for user to stop typing
    }

    async function calculate() {
        const fromVal = parseFloat(fromInput.value);
        const toVal = parseFloat(toInput.value);

        if (!fromUnit.value || !toUnit.value || !Number.isFinite(fromVal)) return;

        let result;
        let expression;

        try {
            if (state.action === "Conversion") {
                const conv = await getConversionSafe(fromUnit.value, toUnit.value);
                result = applyConversion(fromVal, conv);

                // Format to 4 decimal places to avoid long float bugs
                result = Math.round(result * 10000) / 10000;
                toInput.value = result;
                expression = `${fromVal} ${fromUnit.value} → ${result} ${toUnit.value}`;
            }
            else if (state.action === "Comparison") {
                if (!Number.isFinite(toVal)) return; // Wait for both inputs

                // Convert right-side value to left-side unit for a fair comparison
                const conv = await getConversionSafe(toUnit.value, fromUnit.value);
                const convertedRightSide = applyConversion(toVal, conv);

                let symbol = "=";
                if (fromVal > convertedRightSide) symbol = ">";
                if (fromVal < convertedRightSide) symbol = "<";

                result = symbol;
                showResult(`Value 1 is ${symbol} Value 2`, "");
                expression = `${fromVal} ${fromUnit.value} ${symbol} ${toVal} ${toUnit.value}`;
            }
            else if (state.action === "Arithmetic") {
                if (!Number.isFinite(toVal)) return;

                // Convert both inputs to the selected Result Unit
                const conv1 = await getConversionSafe(fromUnit.value, resultUnit.value);
                const conv2 = await getConversionSafe(toUnit.value, resultUnit.value);

                const val1Converted = applyConversion(fromVal, conv1);
                const val2Converted = applyConversion(toVal, conv2);

                result = performArithmetic(val1Converted, val2Converted, state.operator);
                result = Math.round(result * 10000) / 10000;

                showResult(result, resultUnit.value);
                expression = `${fromVal} ${fromUnit.value} ${state.operator} ${toVal} ${toUnit.value}`;
            }

            await saveStableHistory(expression, result);
        } catch (err) {
            console.error(err);
        }
    }

    // Prevents API crashes if user selects km -> km
    async function getConversionSafe(from, to) {
        if (from === to) return { factor: 1, formula: null };
        return await getConversion(from, to);
    }

    async function saveStableHistory(expression, result) {
        const record = {
            id: Date.now().toString(),
            type: state.type,
            action: state.action,
            expression,
            result,
            timestamp: new Date().toISOString()
        };
        await saveHistory(record);
        await loadHistory(); // Reload history immediately
    }

    async function loadUnits(type) {
        const units = await getUnits(type);
        fillSelect(fromUnit, units);
        fillSelect(toUnit, units);
        fillSelect(resultUnit, units);
        resultUnit.selectedIndex = 0;
    }

    function fillSelect(select, units) {
        select.innerHTML = "";
        units.forEach(u => {
            const opt = document.createElement("option");
            opt.value = u.symbol;
            opt.textContent = `${u.label} (${u.symbol})`;
            select.appendChild(opt);
        });
    }

    async function loadHistory() {
        const history = await getHistory();
        renderHistory(history);
    }

    function clearAll() {
        fromInput.value = "";
        if (state.action !== "Conversion") {
            toInput.value = "";
        }
        showResult("—", "");
    }

    function setDefaultActive() {
        typeCards[0].classList.add("active");
        actionButtons[1].classList.add("active"); // Index 1 is Conversion
    }

    function setActive(group, selected) {
        group.forEach(el => el.classList.remove("active"));
        selected.classList.add("active");
    }

    function toggleOperators(show) {
        const box = document.getElementById("operatorBox");
        if (show) {
            box.innerHTML = `
                <select id="operatorSelect" class="form-select operator-select">
                    <option value="+">+</option>
                    <option value="-">-</option>
                    <option value="*">*</option>
                    <option value="/">/</option>
                </select>
            `;
            document.getElementById("operatorSelect").addEventListener("change", e => {
                state.operator = e.target.value;
                calculate();
            });
        } else {
            box.innerHTML = "→";
        }
    }
});