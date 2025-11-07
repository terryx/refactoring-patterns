# Extract Variable

## Guideline

- **Extract Variable**: When expressions are complex or used multiple times

## Example: Date Calculation

```javascript
// Before
function isEligible(user) {
  return (new Date().getFullYear() - new Date(user.birthDate).getFullYear()) >= 18 &&
    (new Date().getFullYear() - new Date(user.joinDate).getFullYear()) >= 2;
}

// After
function isEligible(user) {
  const currentYear = new Date().getFullYear();
  const age = currentYear - new Date(user.birthDate).getFullYear();
  const yearsOfMembership = currentYear - new Date(user.joinDate).getFullYear();

  return age >= 18 && yearsOfMembership >= 2;
}
```

## Motivation

Expressions can become very complex and hard to read. Local variables can help break down expressions into something more manageable.

- **Clarify Intent**: Well-named variables explain what the expression represents making the code self-documenting.
- **Reduce Duplication**: When the same subexpression appears multiple times, extracting it avoids recalculation and reduces duplication.
- **Simplify Debugging**: Variables provide convenient breakpoints and inspection points for debugging.
- **Enable Modification**: It's easier to modify or enhance logic when intermediate values are named and accessible.
- **Break Down Complexity**: Complex nested expressions become a series of simple, understandable steps.
- **Improve Testability**: Named intermediate values can help verify that each calculation step is correct.

## Mechanics

- Ensure that expressions you want to extract do not have side effects
- Declare an immutable variable and set it to a copy of the expression you want to name
- Replace the original expression with the new variable
- Test to ensure behavior is preserved
- If the expression appears in multiple places, replace each occurrence one at a time, testing after each replacement
