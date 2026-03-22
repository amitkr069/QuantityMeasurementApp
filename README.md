# QuantityMeasurementApp


 ### Use Case - 6  Load History

GET /history?_sort=timestamp&_order=desc


Trigger

Page initialises OR a new calculation is saved


Preconditions

json-server running.

Postconditions

Returns array sorted newest-first. Empty array if no records.



### Main Flow

1. export async function getHistory() { }

2. const res = await fetch(`${BASE_URL}/history?_sort=timestamp&_order=desc`)

3. return await res.json()


Alternate Flow

No records: return [].


Exception Flow

Network error: return [] and log. UI shows "No history yet."
