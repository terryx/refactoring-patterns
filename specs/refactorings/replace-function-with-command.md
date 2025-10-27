# Replace Function with Command

```javascript
// Before
function score(candidate, medicalExam, scoringGuide) {
    let result = 0
    let healthLevel = 0
    // long body code
}

// After
class Scorer {
    constructor(candidate, medicalExam, scoringGuide) {
        this._candidate = candidate
        this._medicalExam = medicalExam
        this._scoringGuide = scoringGuide
    }
    
    execute() {
        this._result = 0
        this._healthLevel = 0
        // long body code
    }
}
```

## Motivation

Functions - either freestanding or attached to objects as methods - are one of the fundamental building blocks of programming.
But there are times when it's useful to encapsulate a function into its own object. 
Such an object is mostly built around a single method, whose request and execution is the purpose of the object.

A command offers greater flexibility for the control and expression of a function than the plain function mechanism.
Commands can have complimentary operations, such as undo.
Only use command when a simpler approach is not possible to break down a complex function.

## Mechanics

- Create an empty class for the function. Name it based on the function.
- Use Move Function to move the function the the empty class.
- Consider making a field for each argument, and move these arguments to the constructor.