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

export function renderHistory(records) {
    const list = document.querySelector("#history-list");

    if (!list) return;

    records = records || [];

    list.innerHTML = "";

    if (!records.length) {
        list.innerHTML = "<li class='list-group-item'>No history yet.</li>";
        return;
    }

    records.forEach(r => {
        const li = document.createElement("li");

        li.className = "list-group-item";

        li.textContent =
            `${r.expression} = ${r.result} (${new Date(r.timestamp).toLocaleString()})`;

        list.appendChild(li);
    });
}