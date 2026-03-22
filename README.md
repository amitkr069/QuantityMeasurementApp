# QuantityMeasurementApp


### Use Case - 7  Apply Conversion

Multiply by factor OR evaluate formula string



Trigger

Action is Conversion; all inputs valid



Preconditions

value is a finite number. convObj has either factor (number) or formula (string).

Postconditions

Returns the converted number rounded to 6 decimal places.



### Main Flow

1. function applyConversion(value, convObj) { }

2. if (convObj.factor !== null)

     return parseFloat((value * convObj.factor).toFixed(6))

3. else (formula path):

     const expr = convObj.formula.replace("x", value)

     return parseFloat(eval(expr).toFixed(6))



Alternate Flow

fromUnit === toUnit: return value unchanged.



Exception Flow

value is NaN: throw Error("Invalid number"). eval throws: throw Error("Bad formula").
