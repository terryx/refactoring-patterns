# Consolidate Conditional Expression

## Guideline

- **Consolidate Conditional Expression**: Combine multiple conditionals that produce the same result into a single expression with clear naming

## Example: Disability Benefits Check

```javascript
// Before
function getDisabilityAmount(employee) {
  if (employee.seniority < 2) return 0
  if (employee.monthsDisabled > 12) return 0
  if (employee.isPartTime) return 0
  return calculateDisabilityAmount(employee)
}

// After
function getDisabilityAmount(employee) {
  if (isNotEligibleForDisability(employee)) return 0
  return calculateDisabilityAmount(employee)
}

function isNotEligibleForDisability(employee) {
  return employee.seniority < 2 ||
         employee.monthsDisabled > 12 ||
         employee.isPartTime
}
```

## Motivation

When multiple conditional checks all lead to the same outcome, they are really checking for the same logical condition. Combining them makes the intent clear and reduces duplication.

- **Reveal Intent**: A single well-named function communicates what all the checks are really testing
- **Reduce Duplication**: The same outcome (return value, action) appears only once instead of being repeated
- **Single Point of Change**: If the eligibility criteria change, update one function instead of multiple scattered conditions
- **Easier Testing**: The combined condition can be tested independently with clear test cases
- **Better Readability**: Readers see one decision point instead of mentally tracking multiple separate conditions
- **Consistent Pattern**: This creates a predictable structure that's easier to scan and understand

## Mechanics

- Identify multiple conditional checks that all produce the same result
- Use AND (&&) to combine conditions where all must be true, or OR (||) where any can be true
- Extract the combined conditional expression into a well-named function
- Replace the original multiple conditions with a single call to the extracted function
- Test to ensure the logic produces the same results
- Consider inverting the logic if it reads more naturally (e.g., isEligible vs isNotEligible)
