# Replace Temp with Query

## Guideline

- **Replace Temp with Query**: When breaking up large functions or when the same calculation appears in multiple places

## Example: Price Calculation

```javascript
// Before
function calculateTotal(order) {
  const basePrice = order.quantity * order.itemPrice
  const discountFactor = basePrice > 1000 ? 0.95 : 0.98
  return basePrice * discountFactor
}

// After
function calculateTotal(order) {
  return basePrice(order) * discountFactor(order)
}

function basePrice(order) {
  return order.quantity * order.itemPrice
}

function discountFactor(order) {
  return basePrice(order) > 1000 ? 0.95 : 0.98
}
```

## Motivation

Temporary variables can make code harder to understand by hiding calculations behind names. Extracting these calculations into query functions makes the logic reusable and often reveals opportunities for further refactoring.

- **Reusability**: Query functions can be called from multiple places instead of duplicating the calculation logic
- **Break Up Large Functions**: Extracting temps into queries is often the first step in decomposing complex functions
- **Reveal Dependencies**: Moving calculations into functions makes data dependencies explicit through parameters
- **Enable Further Refactoring**: Once extracted, related query functions often suggest opportunities for Extract Class
- **Self-Documentation**: Well-named query functions communicate intent better than temporary variable assignments
- **Testability**: Query functions can be tested independently, making verification easier

## Mechanics

- Identify a temporary variable that is assigned once and never modified after assignment
- Extract the right-hand side of the assignment into a function
- Name the function after what it calculates, not how it calculates it
- Replace references to the temporary variable with calls to the new function
- Test after each replacement
- Remove the temporary variable declaration once all references are replaced
- If the temp is used in multiple methods, consider making it a class method
