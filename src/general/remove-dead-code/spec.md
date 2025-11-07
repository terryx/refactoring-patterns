# Remove Dead Code

## Guideline

- **Remove Dead Code**: Delete any code that is never executed or used

## Example: Unused Helper Function

```javascript
// Before
function processOrder(order) {
  const total = calculateTotal(order.items)
  return { orderId: order.id, total }
}

function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0)
}

function formatCurrency(amount) {
  return `$${amount.toFixed(2)}`
}

// After
function processOrder(order) {
  const total = calculateTotal(order.items)
  return { orderId: order.id, total }
}

function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0)
}
```

## Motivation

Dead code serves no purpose but still costs you. It clutters your codebase, wastes developer time, and creates maintenance burden.

- **Reduce Cognitive Load**: Readers don't waste time understanding code that never runs
- **Easier Navigation**: Less code means faster searching and easier code comprehension
- **Lower Maintenance Cost**: Dead code still needs to be updated when refactoring, wasting effort on something that provides no value
- **Prevent Confusion**: Developers might assume dead code serves a purpose and waste time trying to understand its role
- **Reduce Bugs**: Code that doesn't run can't have bugs, and removing it eliminates potential future issues
- **Faster Builds**: Less code means faster compilation and smaller bundle sizes
- **Version Control**: If you need the code later, it's always available in git history

## Mechanics

- Use static analysis tools or IDE features to identify unused code
- Verify that the code is truly unused by searching for all references
- Delete the unused code
- Run tests to ensure nothing broke
- Commit the deletion separately so it's easy to revert if needed
- If unsure whether code is used, comment it out temporarily and wait for feedback
- Remove commented-out code blocks that have been sitting unused
