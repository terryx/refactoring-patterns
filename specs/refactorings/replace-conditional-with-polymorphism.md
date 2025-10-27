# Replace Conditional with Polymorphism

```javascript
// Before
switch (bird.type) {
    case 'EuropeanSwallow':
        return 'average'
    case 'AfricanSwallow':
        return (bird.numberOfCoconuts > 2) ? 'tired' : 'average'
    case 'NorwegianBlueParrot':
        return (bird.voltage > 100) ? 'scorched' : 'beautiful'
    default:
        return 'unknown'
}

// After
class EuropeanSwallow {
    get plumage() { return 'average' }
}
class AfricanSwallow {
    get plumage() { return (this.numberOfCoconuts > 2) ? 'tired' : 'average' }  
}
class NorwegianBlueParrot {
    get plumage() { return (this.voltage > 100) ? 'scorched' : 'beautiful' }  
}
```

## Motivation

This is made most obvious when there are several functions that have a switch statement on a type code. 
Remove the duplication of the common switch logic by creating classes for each case and using polymorphism
to bring out the type-specific behavior. 

Another situation is where the logic as a base case with variants. The base case may be the most common or straightforward
where this logic can be a superclass.


## Mechanics

- If classes do not exist for polymorphic behavior, create them together with a factory function to return the correct instance.
- Use the factory function in calling code.
- Move the conditional function to be the superclass.
- Pick one of the subclasses. Create a subclass method that overrides the conditional statement method. Copy the body of that leg of the conditional statement into the subclass method and adjust it to fit.
- Repeat fo each leg of the conditional.
- Leave a default case for the superclass method. Or, if superclass should be abstract, declare that method as abstract or throw and error to show it should be the responsibility of a subclass.
