# QuantityMeasurementApp


### Use Case - 5:  Save to History

POST /history



Trigger

A calculation completes without error


Preconditions

Record object prepared with: type, action, expression, result, timestamp.

Postconditions

Record persisted in db.json. json-server returns object with auto-assigned id.



### Main Flow

1. export async function saveHistory(record) { }

2. const res = await fetch(`${BASE_URL}/history`, {

     method: "POST",

     headers: { "Content-Type": "application/json" },

     body: JSON.stringify(record)

   })

3. return await res.json()


Alternate Flow

None.


Exception Flow

POST fails: log error. Do NOT block the user — history save is non-critical.
