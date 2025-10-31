# Replace Magic Literal

```javascript
// Before
function calculateDiscount(order) {
  if (order.quantity > 100) {
    return order.total * 0.1
  }
  return 0
}

function isEligibleForFreeShipping(order) {
  return order.quantity > 100
}

// After
const BULK_ORDER_THRESHOLD = 100
const BULK_DISCOUNT_RATE = 0.1

function calculateDiscount(order) {
  if (order.quantity > BULK_ORDER_THRESHOLD) {
    return order.total * BULK_DISCOUNT_RATE
  }
  return 0
}

function isEligibleForFreeShipping(order) {
  return order.quantity > BULK_ORDER_THRESHOLD
}
```

## Motivation

A magic literal is a literal value (number, string, boolean) that has special meaning but isn't given a name.
When the same literal appears in multiple places, it becomes hard to understand what it represents and difficult to change consistently.
Even a single occurrence can benefit from a descriptive name if the literal's purpose isn't immediately obvious.

Replacing magic literals with named constants makes code more readable by documenting the literal's purpose.
It also makes the code easier to maintain—when the value needs to change, you only need to update it in one place.

## Mechanics

- Declare a constant with a descriptive name and assign it the literal value.
- Find all occurrences of the literal that represent the same logical concept.
- Replace each occurrence with the new constant.
- Test after each replacement, or after all replacements if you're confident they're all equivalent.

## Notes

- Not all literals are magic. Simple values like 0, 1, -1, empty strings, true, and false are often self-explanatory in context.
- A literal only needs a name if its meaning isn't immediately clear or if it represents a business concept that might change.
- If the literal appears only once, consider whether a descriptive name would still improve readability.
- Consider the scope of the constant—it might belong in a configuration file, class constant, or local constant depending on its use.
