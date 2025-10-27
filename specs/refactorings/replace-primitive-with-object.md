# Replace Primitive with Object

```javascript
// Before
orders.filter(o => 'high' === o.priority || 'rush' === o.priority)

// After
ordres.filter(o => o.priority.higherThank(new Priority('high')))
```

## Motivation

The simple data items, such as numbers or strings, can quickly end up being duplicated around the code base, 
increasing the effort whenever it needs to be used.


## Mechanics

- Apply Encapsulate Variable if it isn't ready
- Create a simple value class for the data value. It should take the existing value in its constructor and provide a getter for that value.
- Run static checks.
- Change the setter to create new a new instance of the value class and store that in the field, changing the type of the field if present.
- Change the getter to return the result of invoking the getter of the new class.
- Test.
- Consider using Rename Function on the original accessors to better reflect what they do.
- Consider clarifying the role of the new object as a value or reference object by applying Change Reference to Value or Change Value to Reference.
