# Guard Clauses

> **Note**: This guideline is sourced from `.claude/claude.md`. The source file is the authoritative reference.

## Example 1: Payment Calculation with Status Checks

```javascript
// Before
function getPayAmount(employee) {
  let result;
  if (employee.isSeparated) {
    result = { amount: 0, reason: 'separated' };
  } else {
    if (employee.isRetired) {
      result = { amount: 0, reason: 'retired' };
    } else {
      if (employee.isDead) {
        result = { amount: 0, reason: 'deceased' };
      } else {
        result = calculateNormalPay(employee);
      }
    }
  }
  return result;
}

// After
function getPayAmount(employee) {
  if (employee.isSeparated) return { amount: 0, reason: 'separated' };
  if (employee.isRetired) return { amount: 0, reason: 'retired' };
  if (employee.isDead) return { amount: 0, reason: 'deceased' };

  return calculateNormalPay(employee);
}
```

## Motivation

Guard clauses replace nested conditional logic with early returns, making code easier to read and understand by handling edge cases upfront.

- **Reduce Nesting**: Deep nesting makes code harder to follow. Guard clauses flatten the structure by handling special cases first.
- **Highlight Normal Path**: By moving edge cases to the top, the main logic becomes more prominent and easier to understand.
- **Improve Readability**: Each condition is independent and clear, rather than being buried in nested blocks.
- **Easier Maintenance**: Adding new edge cases is simple—just add another guard clause at the top.
- **Signal Intent**: Early returns clearly communicate "if this condition fails, we're done here."
- **Reduce Cognitive Load**: Readers can mentally dismiss handled cases and focus on the remaining logic.

## Mechanics

- Identify nested conditionals that handle edge cases or exceptional conditions
- Start with the innermost or most exceptional condition
- Replace the conditional with an early return (or throw) that handles the edge case
- Remove the surrounding `else` block and unindent the remaining code
- Repeat for each edge case, working from most exceptional to least exceptional
- Ensure the "happy path" (normal case) is left at the end with minimal nesting
- Test after each transformation to ensure behavior is preserved
- Consider ordering guard clauses by likelihood or severity (most exceptional first)
