# Inline Function

## Guideline

- **Inline Function**: When the function body is as clear as the function name (excessive indirection)

## Example: Driver Rating

```javascript
// Before
function getRating(driver) {
  return moreThanFiveLateDeliveries(driver) ? 2 : 1;
}

function moreThanFiveLateDeliveries(driver) {
  return driver.numberOfLateDeliveries > 5;
}

// After
function getRating(driver) {
  return driver.numberOfLateDeliveries > 5 ? 2 : 1;
}
```

## Motivation

Use Inline Function when the code is using too much indirection and the function body is just as clear as the function name.

- **Remove Needless Indirection**: When a function doesn't add clarity, removing it reduces unnecessary abstraction layers.
- **Improve Readability**: Sometimes the function body is clearer than reading the function name and mentally jumping to its definition.
- **Simplify Code**: Fewer functions mean less code to navigate and maintain when the abstraction doesn't justify itself.
- **Reduce Overhead**: Eliminate functions that are only called once and don't provide meaningful abstraction.
- **Flatten Structure**: Too many small functions can make code harder to follow when the logic is actually simple.
- **Enable Further Refactoring**: Inlining functions can reveal opportunities for better abstractions by exposing the actual implementation.

## Mechanics

- Check that this isn't a polymorphic method (if it's overridden in subclasses, you can't safely inline it)
- Find all the callers of the function
- Replace each call with the function's body
- Test after each replacement to ensure behavior is preserved
- Remove the function definition once all calls have been replaced
