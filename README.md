# QuantityMeasurementApp


### Use Case - 12  Show Result

Write calculated value and unit to the RESULT panel



Trigger

A calculation succeeds


Preconditions

#result-value and #result-unit exist in DOM.

Postconditions

Result panel displays new value and unit. Highlight animation plays.



### Main Flow

1. function showResult(value, unitSymbol) { }

2. document.querySelector("#result-value").textContent = value

3. document.querySelector("#result-unit").textContent = unitSymbol

4. Add "highlight" class; setTimeout 1500 ms to remove it



Alternate Flow

Comparison mode: value is a sentence string; unitSymbol = "".



Exception Flow

value is null: display "—".  
