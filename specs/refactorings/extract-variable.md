# Extract Variable

```javascript
// before
return order.quantity * order.itemPrice - 
    Math.max(0, order.quantity - 500) * order.itemPrice * 0.05 +
    Math.min(order.quantity * order.itemPrice * 0.1, 100)

// after
const basePrice = order.quantity * order.itemPrice
const quantityDiscount = Math.max(0, order.quantity - 500) * order.itemPrice * 0.05
const shipping = Math.min(basePrice * 0.1, 100)
return basePrice - quantityDiscount + shipping
```

## Motivation

Expressions can become very complex and hard to read.
In such situations, local variables can help break the expression down into something more manageable.
Such variables are also handy for debugging since they provide an easy hook for a debugger to stop at.

## Mechanics

- Ensure that expressions you want to extract do not have side effects.
- Declare an immutable variable. Set it to a copy of the expression you want to name.
- Replace the original expression with the new variable.
- Test.