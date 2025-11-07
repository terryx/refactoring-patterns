# Inline Variable

## Guideline

- **Inline Variable**: When the variable name doesn't communicate more than the expression itself

## Example: Base Price Comparison

```javascript
// Before
function checkPrice(anOrder) {
  const basePrice = anOrder.basePrice;
  return basePrice > 1000;
}

// After
function checkPrice(anOrder) {
  return anOrder.basePrice > 1000;
}
```

## Motivation

Variables provide names for expressions within a function and as such they are usually a good thing. However, sometimes the name doesn't communicate more than the expression itself.

- **Remove Redundancy**: When a variable name simply repeats what the expression already says, it adds no value.
- **Reduce Clutter**: Unnecessary variables make code longer without adding clarity.
- **Simplify Reading**: Fewer variables mean less mental tracking of what each name represents.
- **Expose Opportunities**: Inlining can reveal better refactoring opportunities or show that the variable wasn't needed.
- **Improve Flow**: Direct expressions can make the code flow more naturally when the variable adds no semantic value.

## Mechanics

- Check that the right-hand side of the assignment is free of side effects
- If the variable isn't already declared immutable, do so and test
- Find the first reference to the variable and replace it with the right-hand side of the assignment
- Test to ensure behavior is preserved
- Repeat replacing references to the variable until you've replaced all of them
- Remove the declaration and assignment of the variable
- Test again to confirm everything still works
