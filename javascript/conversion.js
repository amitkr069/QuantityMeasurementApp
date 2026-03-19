/**
 * @author Amit
 * @version 7.0
 *  
 * this conversion.js file is added for use csae 7
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