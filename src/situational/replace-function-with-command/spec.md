# Replace Function with Command

## Guideline

- **Replace Function with Command**: When a function needs additional operations like undo, queuing, lifecycle management, or complex parameterization that simple functions cannot provide

## Example: Undoable Calculation

```javascript
// Before
function calculate(value) {
  const previous = state.value
  state.value = state.value + value
  return state.value
}

// After
class CalculateCommand {
  constructor(value) {
    this.value = value
    this.previousValue = null
  }

  execute() {
    this.previousValue = state.value
    state.value = state.value + this.value
    return state.value
  }

  undo() {
    state.value = this.previousValue
  }
}
```

## Motivation

Functions are straightforward, but sometimes you need more control over the function's execution. A command object gives you that control.

- **Undo Operations**: Commands can store state needed to reverse their effects, enabling undo/redo functionality
- **Lifecycle Management**: Commands can have methods for setup, execution, teardown, and validation that run at different times
- **Queuing and Logging**: Command objects can be stored in queues, logged for auditing, or deferred for later execution
- **Complex Parameterization**: Commands can build up parameters over time before execution, making complex configurations easier to manage
- **Composition**: Multiple commands can be composed together to create macro commands that execute in sequence
- **Testing**: Command objects are easier to test in isolation and can be mocked or stubbed more easily than function calls

## Mechanics

- Create a class for the command with a method for execution (typically called execute)
- Move the body of the function into the execute method
- Add fields to the command class for any parameters that the function needs
- Create a constructor that accepts these parameters and stores them in the fields
- Replace calls to the function with creation of the command object and calling execute
- Add any additional methods needed (undo, validate, etc.)
- Test after each change
