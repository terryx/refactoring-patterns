# Replace Temp With Query

```javascript
// Before
const basePrice = this._quantity * this._itemPrice
if (basePrice > 1000) {
    return basePrice * 0.95
} else {
    return basePrice * 0.98
}

// After
get basePrice() { this._quantity * this._itemPrice }

...

if (basePrice > 1000) {
    return basePrice * 0.95
} else {
    return basePrice * 0.98
}
```

## Motivation

When working on breaking up a large function, turning variables into their own functions makes
it easier to extract parts of the function. Putting this logic into functions often also sets up a 
stronger boundary between the extacted logic and the original function. Whenever we see variables 
calculated in the same way in different places, look to turn them into a single function.


## Mechanics

- Check that the variable is determined entirely before it's used, and the code that calculates it does not yield a different value whenever it is used.
- If the variable isn't read-only and can be made read-only, do so.
- Test.
- Extract the assignment of the variable into a function.
- Test.
- Use Inline Variable to remove the temp.
