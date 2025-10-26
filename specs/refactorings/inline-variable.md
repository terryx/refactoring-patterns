# Inline Variable

```javascript
// before
let basePrice = anOrder.basePrice
return (basePrice > 1000)

// after
return anOrder.basePrice > 1000
```

## Motivation

Variables provide names for expressions within a function, and as such they are usually a good thing.
But sometimes, the name doesn't really communication more than the expression itself.

## Mechanics

- Check that the right-hand side of the assignment is free of side effects.
- If the variable isn't already declared immutable, do so and test.
- Find the first reference to the variable and replace it with the right-hand side of the assignment.
- Test.
- Repeat replacing references to the variable until you've replaced all of them.
- Remove the declaration and assignment of the variable.
- Test.