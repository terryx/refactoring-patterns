# Combine functions into Class

```javascript
// before
function base(aReading) {...}
function taxableCharge(aReading) {...}
function calculateBaseCharge(aReading) {...}

// after
class Reading {
    base() {...}
    taxableCharge() {...}
    calculateBaseCharge() {...}
}
```

## Motivation

Using a class makes the common environment that these functions share more explicit, simplifying function calls inside
the object by removing many of the arguments, and provides a reference to pass such an object to other parts of the system.

Languages that don't have classes as a first-class citizen, but do have first-class functions, often use the Function As Object to provide this capability.

## Mechanics

- Apply Encapsulate Record to the common data record that the functions share.
- Take each function that uses the common record and use Move Function to move it into the new class.
- Each bit of logic that manipulates the data can be extracted with Extract Function and then moved into the new class.