export function applyConversion(value, conversion) {
    if (conversion.factor !== null) {
        return value * conversion.factor;
    }

    const x = value;
    return eval(conversion.formula);
}

export function compareValues(v1, u1, v2, u2, converted1, converted2) {
    if (converted1 > converted2) return `${v1} ${u1} > ${v2} ${u2}`;
    if (converted1 < converted2) return `${v1} ${u1} < ${v2} ${u2}`;
    return `${v1} ${u1} = ${v2} ${u2}`;
}

export function performArithmetic(v1, v2, operator) {
    switch (operator) {
        case "+": return v1 + v2;
        case "-": return v1 - v2;
        case "*": return v1 * v2;
        case "/": return v2 !== 0 ? v1 / v2 : "Error";
        default: return "Error";
    }
}