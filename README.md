# QuantityMeasurementApp

### Use Case - 2  Initialise App on Page Load

Wired up event listeners and loaded default data



Trigger

DOMContentLoaded event fires

Preconditions

json-server is running. All JS files are loaded.

Postconditions

Unit dropdowns are populated. History is rendered. All event listeners are attached.

#### Main Flow

1. Wraped all code in: document.addEventListener("DOMContentLoaded", async () => { ... })

2. Declared state = { type:"Length", action:"Conversion", fromVal:null, fromUnit:"", toVal:null, toUnit:"", operator:"+" }

3. Called attachEventListeners().

4. Called loadUnits("Length") to populate FROM and TO dropdowns.

5. Set first type-card and first action-button as active.

6. Hide operator row: toggleOperators(false).


Alternate Flow

If loadUnits fails, show an error banner; remaining UI still loads.

Exception Flow

json-server offline: fetch throws TypeError. Catch and display "Server unavailable" message.
