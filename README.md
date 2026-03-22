# QuantityMeasurementApp

### Use Case - 3  Fetch Units by Type

GET /units?type=X from json-server


Trigger

User clicks a type card OR app initialises


Preconditions

json-server running. "units" collection is populated.

Postconditions

Returns array of unit objects for the requested type.


### Main Flow

1. export async function getUnits(type) { }

2. const res = await fetch(`http://localhost:3000/units?type=${type}`)

3. if (!res.ok) throw new Error(`HTTP ${res.status}`)

4. return await res.json()


Alternate Flow

Empty array returned if no units exist for that type.

Exception Flow

Network error: catch block fires. Caller receives null/empty and shows error banner.
