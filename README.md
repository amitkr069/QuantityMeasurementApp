# QuantityMeasurementApp


### Use Case - 10  Populate Unit Dropdown

Fill a <select> with unit options after getUnits()



Trigger

getUnits() returns data


Preconditions

selectEl is a valid <select> element. units is an array.

Postconditions

Dropdown contains one <option> per unit plus a disabled default prompt.



### Main Flow

1. function populateDropdown(selectEl, units) { }

2. selectEl.innerHTML = ""

3. Append disabled+selected default option: "-- Select Unit --"

4. units.forEach(u => {

     const opt = document.createElement("option")

     opt.value = u.symbol

     opt.textContent = "${u.label} (${u.symbol})"

     selectEl.appendChild(opt) })



Alternate Flow

Empty array: show only the default prompt.


Exception Flow

selectEl is null: log warning and return early.

