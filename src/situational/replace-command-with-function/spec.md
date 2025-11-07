# Replace Command with Function

## Guideline

- **Replace Command with Function**: When a command object provides no significant benefit over a simple function

## Example: Charge Calculator

```javascript
// Before
class ChargeCalculator {
  constructor(customer, usage) {
    this._customer = customer;
    this._usage = usage;
  }

  execute() {
    return this._customer.rate * this._usage;
  }
}

const calculator = new ChargeCalculator(customer, usage);
const charge = calculator.execute();

// After
function charge(customer, usage) {
  return customer.rate * usage;
}

const chargeAmount = charge(customer, usage);
```

## Motivation

Command objects provide a powerful mechanism for handling complex computations but that power comes at a cost. If the function isn't too complex, then a command object is more trouble than it's worth.

- **Reduce Complexity**: Simple calculations don't need the overhead of a command class.
- **Improve Readability**: A straightforward function is easier to understand than a command object for simple operations.
- **Eliminate Boilerplate**: Remove unnecessary class structure when there's no shared state or multiple methods.
- **Direct Invocation**: Functions can be called directly without instantiation ceremony.
- **Simplify Testing**: Functions are easier to test than command objects when complexity doesn't justify the structure.
- **Remove Indirection**: When a command has only one method and no complex state management, a function is clearer.

## Mechanics

- Apply Extract Function to the creation of the command and the call to the command's execution method
- For each method called by the command's execution method, apply Inline Function
- Use Change Function Declaration to put all parameters of the constructor into the command's execution method instead
- For each field, alter the references in the command's execution method to use the parameter instead and test after each change
- Inline the constructor call and the command's execution method call into the caller (which is the replacement function)
- Test to ensure behavior is preserved
- Apply Remove Dead Code to the command class
