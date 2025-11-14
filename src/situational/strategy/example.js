// Example 1: Payment Processing
// Expected output: Process payments with interchangeable strategies at runtime

function example1Before() {
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
          method: 'creditCard',
          amount,
          fee,
          total: amount + fee
        };
      } else if (this.paymentMethod === 'paypal') {
        const fee = amount * 0.029 + 0.30;
        return {
          method: 'paypal',
          amount,
          fee,
          total: amount + fee
        };
      } else if (this.paymentMethod === 'crypto') {
        const fee = amount * 0.01;
        return {
          method: 'crypto',
          amount,
          fee,
          total: amount + fee
        };
      }
    }
  }

  const processor = new PaymentProcessor();
  const results = [];

  results.push(processor.processPayment(100));

  processor.setPaymentMethod('paypal');
  results.push(processor.processPayment(50));

  processor.setPaymentMethod('crypto');
  results.push(processor.processPayment(200));

  return results;
}

function example1After() {
  class PaymentStrategy {
    process(amount) {
      throw new Error('process() must be implemented by subclass');
    }
  }

  class CreditCardStrategy extends PaymentStrategy {
    process(amount) {
      const fee = amount * 0.03;
      return {
        method: 'creditCard',
        amount,
        fee,
        total: amount + fee
      };
    }
  }

  class PayPalStrategy extends PaymentStrategy {
    process(amount) {
      const fee = amount * 0.029 + 0.30;
      return {
        method: 'paypal',
        amount,
        fee,
        total: amount + fee
      };
    }
  }

  class CryptoStrategy extends PaymentStrategy {
    process(amount) {
      const fee = amount * 0.01;
      return {
        method: 'crypto',
        amount,
        fee,
        total: amount + fee
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
  const results = [];

  results.push(processor.processPayment(100));

  processor.setStrategy(new PayPalStrategy());
  results.push(processor.processPayment(50));

  processor.setStrategy(new CryptoStrategy());
  results.push(processor.processPayment(200));

  return results;
}

// Example 2: Compression Algorithms
// Expected output: Compress data using different interchangeable algorithms

function example2Before() {
  class FileCompressor {
    constructor() {
      this.algorithm = 'zip';
    }

    setAlgorithm(algorithm) {
      this.algorithm = algorithm;
    }

    compress(data) {
      if (this.algorithm === 'zip') {
        return {
          algorithm: 'zip',
          original: data.length,
          compressed: Math.floor(data.length * 0.6),
          ratio: '40%'
        };
      } else if (this.algorithm === 'gzip') {
        return {
          algorithm: 'gzip',
          original: data.length,
          compressed: Math.floor(data.length * 0.5),
          ratio: '50%'
        };
      } else if (this.algorithm === 'bzip2') {
        return {
          algorithm: 'bzip2',
          original: data.length,
          compressed: Math.floor(data.length * 0.4),
          ratio: '60%'
        };
      }
    }
  }

  const compressor = new FileCompressor();
  const data = 'x'.repeat(1000);
  const results = [];

  results.push(compressor.compress(data));

  compressor.setAlgorithm('gzip');
  results.push(compressor.compress(data));

  compressor.setAlgorithm('bzip2');
  results.push(compressor.compress(data));

  return results;
}

function example2After() {
  class CompressionStrategy {
    compress(data) {
      throw new Error('compress() must be implemented by subclass');
    }
  }

  class ZipStrategy extends CompressionStrategy {
    compress(data) {
      return {
        algorithm: 'zip',
        original: data.length,
        compressed: Math.floor(data.length * 0.6),
        ratio: '40%'
      };
    }
  }

  class GzipStrategy extends CompressionStrategy {
    compress(data) {
      return {
        algorithm: 'gzip',
        original: data.length,
        compressed: Math.floor(data.length * 0.5),
        ratio: '50%'
      };
    }
  }

  class Bzip2Strategy extends CompressionStrategy {
    compress(data) {
      return {
        algorithm: 'bzip2',
        original: data.length,
        compressed: Math.floor(data.length * 0.4),
        ratio: '60%'
      };
    }
  }

  class FileCompressor {
    constructor(strategy) {
      this.strategy = strategy;
    }

    setStrategy(strategy) {
      this.strategy = strategy;
    }

    compress(data) {
      return this.strategy.compress(data);
    }
  }

  const compressor = new FileCompressor(new ZipStrategy());
  const data = 'x'.repeat(1000);
  const results = [];

  results.push(compressor.compress(data));

  compressor.setStrategy(new GzipStrategy());
  results.push(compressor.compress(data));

  compressor.setStrategy(new Bzip2Strategy());
  results.push(compressor.compress(data));

  return results;
}

// Example 3: Shipping Cost Calculator
// Expected output: Calculate shipping costs using different interchangeable strategies

function example3Before() {
  class ShippingCalculator {
    constructor() {
      this.method = 'standard';
    }

    setMethod(method) {
      this.method = method;
    }

    calculateCost(weight, distance) {
      if (this.method === 'standard') {
        return {
          method: 'standard',
          cost: weight * 0.5 + distance * 0.1,
          estimatedDays: 5
        };
      } else if (this.method === 'express') {
        return {
          method: 'express',
          cost: weight * 1.0 + distance * 0.2,
          estimatedDays: 2
        };
      } else if (this.method === 'overnight') {
        return {
          method: 'overnight',
          cost: weight * 2.0 + distance * 0.5,
          estimatedDays: 1
        };
      }
    }
  }

  const calculator = new ShippingCalculator();
  const results = [];

  results.push(calculator.calculateCost(10, 100));

  calculator.setMethod('express');
  results.push(calculator.calculateCost(10, 100));

  calculator.setMethod('overnight');
  results.push(calculator.calculateCost(10, 100));

  return results;
}

function example3After() {
  class ShippingStrategy {
    calculateCost(weight, distance) {
      throw new Error('calculateCost() must be implemented by subclass');
    }
  }

  class StandardShipping extends ShippingStrategy {
    calculateCost(weight, distance) {
      return {
        method: 'standard',
        cost: weight * 0.5 + distance * 0.1,
        estimatedDays: 5
      };
    }
  }

  class ExpressShipping extends ShippingStrategy {
    calculateCost(weight, distance) {
      return {
        method: 'express',
        cost: weight * 1.0 + distance * 0.2,
        estimatedDays: 2
      };
    }
  }

  class OvernightShipping extends ShippingStrategy {
    calculateCost(weight, distance) {
      return {
        method: 'overnight',
        cost: weight * 2.0 + distance * 0.5,
        estimatedDays: 1
      };
    }
  }

  class ShippingCalculator {
    constructor(strategy) {
      this.strategy = strategy;
    }

    setStrategy(strategy) {
      this.strategy = strategy;
    }

    calculateCost(weight, distance) {
      return this.strategy.calculateCost(weight, distance);
    }
  }

  const calculator = new ShippingCalculator(new StandardShipping());
  const results = [];

  results.push(calculator.calculateCost(10, 100));

  calculator.setStrategy(new ExpressShipping());
  results.push(calculator.calculateCost(10, 100));

  calculator.setStrategy(new OvernightShipping());
  results.push(calculator.calculateCost(10, 100));

  return results;
}

export {
  example1Before,
  example1After,
  example2Before,
  example2After,
  example3Before,
  example3After
};
