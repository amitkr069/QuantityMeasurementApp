/**
 * @author Amit
 * @version 9.0
 * the arithmetic operation function is added for use csae 9
 */
export function applyConversion(value, convObj) {
    if (!Number.isFinite(value)) {
        throw new Error("Invalid number");
    }

    if (!convObj) {
        throw new Error("Conversion object missing");
    }

    if (convObj.factor !== null) {
        return parseFloat((value * convObj.factor).toFixed(6));
    }

    if (convObj.formula) {
        try {
            const expr = convObj.formula.replace("x", value);
            return parseFloat(eval(expr).toFixed(6));
        } catch {
            throw new Error("Bad formula");
        }
    }

    throw new Error("Invalid conversion data");
}

export function compareValues(v1, u1, v2, u2, base1, base2) {
    if (!Number.isFinite(v1) || !Number.isFinite(v2)) {
        return "Invalid values — cannot compare";
    }

    if (base1 > base2) {
        return `${v1} ${u1} is GREATER than ${v2} ${u2}`;
    }

    if (base1 < base2) {
        return `${v1} ${u1} is LESS than ${v2} ${u2}`;
    }

    return `${v1} ${u1} is EQUAL to ${v2} ${u2}`;
}


export function performArithmetic(v1, v2normalised, op) {
    switch (op) {
        case "+":
            return parseFloat((v1 + v2normalised).toFixed(6));

        case "-":
            return parseFloat((v1 - v2normalised).toFixed(6));

        case "*":
            return parseFloat((v1 * v2normalised).toFixed(6));

        case "/":
            if (v2normalised === 0) {
                throw new Error("Divide by zero");
            }
            return parseFloat((v1 / v2normalised).toFixed(6));

        default:
            throw new Error("Unknown operator");
    }
}