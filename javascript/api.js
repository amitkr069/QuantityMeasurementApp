const BASE_URL = "http://localhost:3000";

export async function getUnits(type) {
    const res = await fetch(`${BASE_URL}/units?type=${type}`);
    return await res.json();
}

export async function getConversion(from, to) {
    const res = await fetch(`${BASE_URL}/conversions?from=${from}&to=${to}`);
    const data = await res.json();
    return data[0];
}

export async function saveHistory(record) {
    const res = await fetch(`${BASE_URL}/history`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(record)
    });
    
    
    return await res.json(); 
}

export async function getHistory() {
    const res = await fetch(`${BASE_URL}/history`);
    const data = await res.json();
    
    return data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
}