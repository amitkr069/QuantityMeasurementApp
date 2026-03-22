# QuantityMeasurementApp

### Use Case - 11  Set Active Button

Highlight selected type card / action tab / operator button



Trigger

User clicks any selectable button


Preconditions

parentEl contains the sibling buttons. clicked is one of those children.

Postconditions

Only the clicked element has the "active" CSS class.



### Main Flow

1. function setActive(parentEl, clickedEl, childSelector) { }

2. parentEl.querySelectorAll(childSelector).forEach(el => el.classList.remove("active"))

3. clickedEl.classList.add("active")





Exception Flow

parentEl is null: return early.
