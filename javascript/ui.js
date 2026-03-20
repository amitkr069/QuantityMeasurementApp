export function showResult(value, unit = "") {
    document.getElementById("result-value").textContent = `${value} ${unit}`.trim();
}

export function renderHistory(records) {
    const list = document.getElementById("history-list");
    list.innerHTML = "";

    if (!records || !records.length) {
        list.innerHTML = "<li class='list-group-item'>No history yet.</li>";
        return;
    }

    records.forEach(r => {
        const li = document.createElement("li");
        li.className = "list-group-item";
        // Make the history look cleaner with bold tags
        li.innerHTML = `<strong>[${r.action}]</strong> ${r.expression} = <span class="text-primary fw-bold">${r.result}</span>`;
        list.appendChild(li);
    });
}
