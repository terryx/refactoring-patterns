# Strategy Pattern

## Guideline

**Strategy Pattern**: When you have different algorithms or behaviors that need to be interchangeable and you want to encapsulate each one independently

## Example: Payment Processing

```javascript
// Before
class PaymentProcessor {
  constructor() {
    this.paymentMethod = 'creditCard';
  }

  setPaymentMethod(method) {
    this.paymentMethod = method;
  }

  processPayment(amount) {
    if (this.paymentMethod === 'creditCard') {
      const fee = amount * 0.03;
      return {
        success: true,
        amount,
        fee,
        total: amount + fee,
        message: 'Credit card payment processed'
      };
    } else if (this.paymentMethod === 'paypal') {
      const fee = amount * 0.029 + 0.30;
      return {
        success: true,
        amount,
        fee,
        total: amount + fee,
        message: 'PayPal payment processed'
      };
    } else if (this.paymentMethod === 'crypto') {
      const fee = amount * 0.01;
      return {
        success: true,
        amount,
        fee,
        total: amount + fee,
        message: 'Crypto payment processed'
      };
    }
  }
}

const processor = new PaymentProcessor();
processor.processPayment(100); // Uses credit card

processor.setPaymentMethod('paypal');
processor.processPayment(100); // Uses PayPal

// After
class PaymentStrategy {
  process(amount) {
    throw new Error('process() must be implemented by subclass');
  }
}

class CreditCardStrategy extends PaymentStrategy {
  process(amount) {
    const fee = amount * 0.03;
    return {
      success: true,
      amount,
      fee,
      total: amount + fee,
      message: 'Credit card payment processed'
    };
  }
}

class PayPalStrategy extends PaymentStrategy {
  process(amount) {
    const fee = amount * 0.029 + 0.30;
    return {
      success: true,
      amount,
      fee,
      total: amount + fee,
      message: 'PayPal payment processed'
    };
  }
}

class CryptoStrategy extends PaymentStrategy {
  process(amount) {
    const fee = amount * 0.01;
    return {
      success: true,
      amount,
      fee,
      total: amount + fee,
      message: 'Crypto payment processed'
    };
  }
}

class PaymentProcessor {
  constructor(strategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy) {
    this.strategy = strategy;
  }

  processPayment(amount) {
    return this.strategy.process(amount);
  }
}

const processor = new PaymentProcessor(new CreditCardStrategy());
processor.processPayment(100); // Uses credit card

processor.setStrategy(new PayPalStrategy());
processor.processPayment(100); // Uses PayPal
```

## Motivation

The Strategy pattern removes complex conditional logic by encapsulating different algorithms or behaviors into separate classes that share a common interface. This pattern emphasizes runtime flexibility and interchangeability.

- **Eliminate Complex Conditionals**: Replace nested if/else statements with polymorphic method calls
- **Runtime Flexibility**: Switch between algorithms dynamically without changing the context
- **Open/Closed Principle**: Add new strategies without modifying existing code
- **Single Responsibility**: Each strategy class focuses on one algorithm or behavior
- **Easier Testing**: Test each strategy in isolation
- **Better Encapsulation**: Algorithm-specific logic stays together in one class

## Mechanics

- Identify the algorithm or behavior that varies and has multiple implementations
- Create a strategy base class or interface that defines the common operation
- Create concrete strategy classes for each algorithm, extending the base class
- Add a field to the context class to hold a reference to a strategy object
- Add a method to allow clients to change the strategy at runtime (setter method)
- Replace conditional logic in the context with calls to the strategy's method
- Test after each change
