# Decompose Conditional

## Guideline

- **Decompose Conditional**: Extract complex conditional logic into well-named functions that clearly communicate intent

## Example: Seasonal Pricing

```javascript
// Before
function getCharge(date, quantity, plan) {
  if (date.isBefore(SUMMER_START) || date.isAfter(SUMMER_END)) {
    return quantity * plan.regularRate + plan.regularServiceCharge
  } else {
    return quantity * plan.summerRate
  }
}

// After
function getCharge(date, quantity, plan) {
  if (isNotSummer(date)) {
    return winterCharge(quantity, plan)
  } else {
    return summerCharge(quantity, plan)
  }
}

function isNotSummer(date) {
  return date.isBefore(SUMMER_START) || date.isAfter(SUMMER_END)
}

function winterCharge(quantity, plan) {
  return quantity * plan.regularRate + plan.regularServiceCharge
}

function summerCharge(quantity, plan) {
  return quantity * plan.summerRate
}
```

## Motivation

Complex conditionals obscure the intent of your code. Both the condition check and the resulting actions are often cryptic expressions that hide what they're really testing or calculating.

- **Clear Intent**: Well-named functions immediately communicate what the condition is checking without requiring readers to parse boolean logic
- **Self-Documenting**: The function name serves as documentation, eliminating the need for comments to explain the condition
- **Reusability**: Extracted conditions can be reused elsewhere in the codebase instead of duplicating complex boolean expressions
- **Easier Testing**: Conditional logic and resulting actions can be tested independently
- **Reduce Cognitive Load**: Readers can understand the high-level flow without diving into implementation details
- **Consistent Pattern**: Applying this everywhere creates a predictable codebase structure

## Mechanics

- Extract the condition into its own function with a name that explains the intent
- Extract each branch of the conditional into separate functions named after what they calculate or do
- Replace the original condition with a call to the extracted condition function
- Replace each branch with a call to its corresponding extracted function
- Test after each extraction to ensure behavior is preserved
