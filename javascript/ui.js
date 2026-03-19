export function showResult(value, unitSymbol) {
    const resultValue = document.querySelector("#result-value");
    const resultUnit = document.querySelector("#result-unit");

    if (!resultValue || !resultUnit) return;

    resultValue.textContent = value ?? "—";
    resultUnit.textContent = unitSymbol || "";

    resultValue.classList.add("highlight");
    resultUnit.classList.add("highlight");

    setTimeout(() => {
        resultValue.classList.remove("highlight");
        resultUnit.classList.remove("highlight");
    }, 1500);
}