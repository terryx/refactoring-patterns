# Replace Command with Function

```javascript
// Before
class ChargeCalculator {
    constructor(customer, usage) {
        this._customer = customer
        this._usage = usage
    }
    
    execute() {
        return this._customer.rate * this._usage
    }
}

// After
function charge(customer, usage) {
    return customer.rate * usage
}
```

## Motivation

Command objects provide a powerful mechanism for handling complex computations.
They can easily be broken down into separate methods sharing commmon state through the fields;
they can be invoked via different methods for different effects;
they can have their data built up in stages. But that power comes at a cost.
If the function isn't too complex, then a command object is more trouble than its worth and should be turned into a regular function.

## Mechanics

- Apply Extract Function to the creation of the comamnd and the call to the command's execution method.
- For each method called by the command's execution method, apply Inline Function.
- Use Change Function Declaration to put all parameters of the constructor into the command's execution method instead.
- For each field, alter the references in the command's execution method to use parameter instead. Test after each change.
- Inline the constructor calls the command's execution method call into the caller (which is the replacement function).
- Test.
- Apply Remove Dead Code to the command class.