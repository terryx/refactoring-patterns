# Introduce Special Case

## Guideline

- **Introduce Special Case**: When many users of a data structure check for a specific value and most do the same thing

## Example: Unknown Customer

```javascript
// Before
function getCustomerName(customer) {
  return customer === 'unknown' ? 'occupant' : customer.name;
}

function getCustomerBillingPlan(customer) {
  return customer === 'unknown' ? 'basic' : customer.billingPlan;
}

function getCustomerPaymentHistory(customer) {
  return customer === 'unknown' ? [] : customer.paymentHistory;
}

// After
class Customer {
  constructor(name, billingPlan, paymentHistory) {
    this._name = name;
    this._billingPlan = billingPlan;
    this._paymentHistory = paymentHistory;
  }

  get name() { return this._name; }
  get billingPlan() { return this._billingPlan; }
  get paymentHistory() { return this._paymentHistory; }
  get isUnknown() { return false; }
}

class UnknownCustomer {
  get name() { return 'occupant'; }
  get billingPlan() { return 'basic'; }
  get paymentHistory() { return []; }
  get isUnknown() { return true; }
}

function getCustomerName(customer) {
  return customer.name;
}

function getCustomerBillingPlan(customer) {
  return customer.billingPlan;
}

function getCustomerPaymentHistory(customer) {
  return customer.paymentHistory;
}
```

## Motivation

A common case of duplicated code is when many users of a data structure check a specific value and then most do the same thing. A special-case object captures all the common behavior.

- **Remove Duplication**: Eliminate repeated special-case checks scattered throughout the codebase.
- **Centralize Behavior**: All special-case logic lives in one place making it easier to maintain and update.
- **Simplify Client Code**: Clients can treat special cases and normal cases uniformly through polymorphism.
- **Null Object Pattern**: A common variant where null values are replaced with special-case objects that provide default behavior.
- **Improve Testability**: Special-case behavior is encapsulated and can be tested independently.
- **Reduce Errors**: No more forgotten null checks or inconsistent special-case handling.

## Mechanics

- Add a special-case check property to the subject returning false
- Create a special-case object with only the special-case check property returning true
- Apply Extract Function to the special-case comparison code and ensure all clients use the new function instead of directly comparing
- Introduce the new special-case subject into the code either by returning it from a function call or by applying a transform function
- Change the body of the special-case comparison function so that it uses the special-case check property
- Test to ensure behavior is preserved
- Use Combine Functions into Class or Combine Functions into Transform to move all common special-case behavior into the new element
- Use Inline Function on the special-case comparison function for places where it's still necessary
