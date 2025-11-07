# Preserve Whole Object

## Guideline

**Preserve Whole Object**: When you're passing multiple values from the same object as parameters

## Example: Temperature Range Check

```javascript
// Before
const low = room.daysTempRange.low;
const high = room.daysTempRange.high;
const isWithinRange = plan.withinRange(low, high);

function withinRange(bottom, top) {
  return (bottom >= this._temperatureRange.low) && (top <= this._temperatureRange.high);
}

// After
const isWithinRange = plan.withinRange(room.daysTempRange);

function withinRange(tempRange) {
  return (tempRange.low >= this._temperatureRange.low) &&
         (tempRange.high <= this._temperatureRange.high);
}
```

## Motivation

If you see code that derives several values from an object and then passes these values as parameters to a method, you can instead pass the whole object and let the method derive the values it needs.

- **Reduce Parameter List**: Passing the whole object shortens parameter lists.
- **Resilience to Change**: If the function needs more data from the object later, you don't need to change the parameter list.
- **Readability**: Makes the relationship between the data source and the function clearer.
- **Consistency**: The function extracts what it needs rather than relying on the caller to extract correctly.

**Trade-offs:**
- Increases coupling between the function and the object structure
- May not be appropriate when you want to minimize dependencies (e.g., for DTOs or cross-module boundaries)
- If the function only needs one or two values, explicit parameters might be clearer

## Mechanics

- Create an empty function with the desired parameters (the whole object)
- Fill the body of the new function by calling the old function and mapping the whole object to the parameters needed by the old function
- Run static checks
- Adjust each caller to pass the whole object instead of individual values
- Test after each change
- Once all callers are updated, use Inline Function on the old function
- Rename the new function to the original name
