# QuantityMeasurementApp


### UC-JS-15  Handle Type Card Click

Update state, reload units, reset result



Trigger

    User clicks a type card


Preconditions

    Event listeners attached.


Postconditions

    State updated. Dropdowns repopulated. Inputs + result cleared.



### Main Flow

1. querySelectorAll(".type-card").forEach(card => card.addEventListener("click", async () => {

2.   state.type = card.dataset.type

3.   setActive(typeSelector, card, ".type-card")

4.   fromInput.value = ""; toInput.value = ""; showResult(0, "")

5.   const units = await getUnits(state.type)

6.   populateDropdown(fromSelect, units)

7.   populateDropdown(toSelect, units)

8.   state.fromUnit = ""; state.toUnit = "" }))



Alternate Flow

    Clicking already-active card: safe to re-run.

Exception Flow

    getUnits fails: show error banner; do not clear existing dropdowns.

