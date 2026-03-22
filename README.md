# QuantityMeasurementApp

### Use Case - 13  Toggle Operator Row

Show or hide the +/−/×/÷ buttons based on action mode



Trigger

  User clicks an action tab


Preconditions

  operator-selector exists in DOM.

Postconditions

  Operator row visible if and only if action is "Arithmetic".



### Main Flow

1. function toggleOperators(show) { }

2. document.querySelector("#operator-selector").style.display = show ? "flex" : "none"



Exception Flow

  Element missing: log warning.
