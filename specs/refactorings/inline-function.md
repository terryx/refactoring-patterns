# Inline Function

```javascript
// before
function getRating(driver) {
    return moreThanFiveLateDeliveries(driver) ? 2 : 1
}

function moreThanFiveLateDeliveries(driver) {
    return driver.numberOfLateDeliveries > 5
}

// after
function getRating(driver) {
    return driver.numberOfLateDeliveries > 5 ? 2 : 1
}
```

## Motivation

Use Inline Function when the code is using too much indirection.
Short functions named to show intent are easier to understand.

## Mechanics

- Check that this isn't a polymorphic method.
- Find all the callers of the function.
- Replace each call with the function's body.
- Test after each replacement.
- Remove the function definition.