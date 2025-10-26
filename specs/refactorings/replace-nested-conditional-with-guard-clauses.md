# Replace Nested Conditional with Guard Clauses

```javascript
// Before
function getPayAmount() {
    let result
    if (isDead) {
        result = deadAmount()
    } else {
        if (isSeparated) {
            result = separatedAmount()
        } 
        else {
            if (isRetired) {
                result = retiredAmount()
        } else {
            result = normalAmount()
        }
    }
    return result
    }
}

// After
function getPayAmount() {
    if (isDead) {
        return deadAmount()
    }
    if (isSeparated) {
        return separatedAmount()
    }
    if (isRetired) {
        return retiredAmount()
    }
    return normalAmount()
}
```

## Motivation

If the condition is an unusual condition, check the condition and return if it's true. 
When this isn't the core to the function, and if it happens, do something and get out.

If the method is clearer with one exit point, use one exit point; otherwise don't.

## Mechanics

- Select the outermost condition that needs to be replaced and change it into a guard clause.
- Test
- Repeat as needed
- If all the guard clauses return the same result, use Consolidate Conditional Expression.