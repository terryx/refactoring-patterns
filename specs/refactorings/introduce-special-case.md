# Introduce Special Case

```javascript
// Before
if (customer === 'unknown') customerName = 'occupant'

// After
class UnknownCustomer {
    get name() {
        return 'occupant'
    }
}
```

## Motivation

A common case of duplicated code is when many users of a data structure check a specific value, and then most of them do the same thing.
A good mechanism is where you can create a special-case element that captures all the common behavior. 
This allows you to replace most of the special-case checks with a simple call.
The special-case object can be returned by encapsulating class or inserted into a data structure with a transform.

A common value that needs special-case processing is null, which is why this pattern is often called the Null Object pattern.

## Mechanics

- Add a special-case check property to the subject, returning false.
- Create a special-case object with only special-case check property, returning true.
- Apply Extract Function to the special-case comparison code. Ensure that all the clients use the new function instead of directly comparing it.
- Introduce the new special-case subject into the code, either by returning it from a function call or by applying a transform function.
- Change the body of the special-case comparison function so that it uses the special-case check property.
- Test.
- Use Combine Functions into Class or Combine Functions into Transform to move all the common special-case behavior into the new element.
- Use Inline Function on the special-case comparison function for the places where it's still necessary.