# Replace Primitive with Object

## Guideline

- **Replace Primitive with Object**: When a primitive value needs validation, behavior, or the same validation appears in multiple places

## Example: Email Validation

```javascript
// Before
function createUser(email) {
  if (!email.includes('@') || !email.includes('.')) {
    throw new Error('Invalid email')
  }
  return { email, verified: false }
}

// After
function createUser(email) {
  const emailObj = new Email(email)
  return { email: emailObj, verified: false }
}

class Email {
  constructor(value) {
    if (!value.includes('@') || !value.includes('.')) {
      throw new Error('Invalid email')
    }
    this.value = value
  }

  toString() {
    return this.value
  }
}
```

## Motivation

Simple data items start as primitive values like strings or numbers. As development continues, these primitives often grow additional responsibilities like validation or formatting. When this happens, replace the primitive with an object.

- **Centralized Validation**: Validation logic lives in one place rather than scattered across the codebase, ensuring consistency
- **Type Safety**: The object type signals intent better than a generic string or number, making code more self-documenting
- **Encapsulated Behavior**: Related operations (formatting, parsing, comparison) can be methods on the object instead of separate utility functions
- **Prevent Invalid States**: The constructor ensures the object is always in a valid state, eliminating defensive checks elsewhere
- **Easier Refactoring**: When requirements change, you update the class in one place rather than hunting down all uses of the primitive
- **Rich Domain Model**: Objects better represent domain concepts (Email, PhoneNumber, Money) than raw primitives

## Mechanics

- Create a new class for the primitive value
- Add a field to hold the primitive value
- Create a constructor that accepts the primitive value and stores it in the field
- Add validation logic to the constructor if needed
- Add any behavior methods (formatting, parsing, etc.) to the class
- Find all uses of the primitive and replace with the new object
- Update any code that accesses the primitive to use the object's methods or properties
- Test after each change
