# Replace Conditional with Polymorphism

## Guideline

**Replace Conditional with Polymorphism**: When you have switch statements on type codes that appear in multiple functions

## Example: Bird Plumage

```javascript
// Before
function plumage(bird) {
  switch (bird.type) {
    case 'EuropeanSwallow':
      return 'average';
    case 'AfricanSwallow':
      return (bird.numberOfCoconuts > 2) ? 'tired' : 'average';
    case 'NorwegianBlueParrot':
      return (bird.voltage > 100) ? 'scorched' : 'beautiful';
    default:
      return 'unknown';
  }
}

function airSpeedVelocity(bird) {
  switch (bird.type) {
    case 'EuropeanSwallow':
      return 35;
    case 'AfricanSwallow':
      return 40 - 2 * bird.numberOfCoconuts;
    case 'NorwegianBlueParrot':
      return (bird.isNailed) ? 0 : 10 + bird.voltage / 10;
    default:
      return null;
  }
}

// After
class Bird {
  constructor(birdObject) {
    Object.assign(this, birdObject);
  }

  get plumage() {
    return 'unknown';
  }

  get airSpeedVelocity() {
    return null;
  }
}

class EuropeanSwallow extends Bird {
  get plumage() {
    return 'average';
  }

  get airSpeedVelocity() {
    return 35;
  }
}

class AfricanSwallow extends Bird {
  get plumage() {
    return (this.numberOfCoconuts > 2) ? 'tired' : 'average';
  }

  get airSpeedVelocity() {
    return 40 - 2 * this.numberOfCoconuts;
  }
}

class NorwegianBlueParrot extends Bird {
  get plumage() {
    return (this.voltage > 100) ? 'scorched' : 'beautiful';
  }

  get airSpeedVelocity() {
    return (this.isNailed) ? 0 : 10 + this.voltage / 10;
  }
}

function createBird(birdObject) {
  switch (birdObject.type) {
    case 'EuropeanSwallow':
      return new EuropeanSwallow(birdObject);
    case 'AfricanSwallow':
      return new AfricanSwallow(birdObject);
    case 'NorwegianBlueParrot':
      return new NorwegianBlueParrot(birdObject);
    default:
      return new Bird(birdObject);
  }
}
```

## Motivation

This is made most obvious when there are several functions that have a switch statement on a type code. Remove the duplication of the common switch logic by creating classes for each case and using polymorphism to bring out the type-specific behavior.

Another situation is where the logic has a base case with variants. The base case may be the most common or straightforward where this logic can be a superclass.

- **Eliminate Duplicate Conditionals**: Multiple functions with the same switch/case structure violate DRY principle.
- **Type-Specific Behavior**: Polymorphism naturally expresses different behavior for different types.
- **Easier to Extend**: Adding new types requires creating a new class rather than modifying multiple switch statements.
- **Encapsulation**: Each type's behavior is encapsulated in its own class.
- **Default Behavior**: Base class can provide sensible defaults for common cases.

## Mechanics

- If classes do not exist for polymorphic behavior, create them together with a factory function to return the correct instance
- Use the factory function in calling code
- Move the conditional function to be the superclass
- Pick one of the subclasses and create a subclass method that overrides the conditional statement method. Copy the body of that leg of the conditional statement into the subclass method and adjust it to fit
- Repeat for each leg of the conditional
- Leave a default case for the superclass method. Or if superclass should be abstract, declare that method as abstract or throw an error to show it should be the responsibility of a subclass
