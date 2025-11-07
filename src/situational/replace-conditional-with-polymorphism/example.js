// Example 1: Bird Types
// Expected output: Get bird plumage and air speed velocity using polymorphism

function example1Before() {
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

  const birds = [
    { type: 'EuropeanSwallow', name: 'Swifty' },
    { type: 'AfricanSwallow', name: 'Coco', numberOfCoconuts: 3 },
    { type: 'NorwegianBlueParrot', name: 'Blue', voltage: 150, isNailed: false }
  ];

  return birds.map(bird => ({
    name: bird.name,
    plumage: plumage(bird),
    airSpeedVelocity: airSpeedVelocity(bird)
  }));
}

function example1After() {
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

  const birds = [
    { type: 'EuropeanSwallow', name: 'Swifty' },
    { type: 'AfricanSwallow', name: 'Coco', numberOfCoconuts: 3 },
    { type: 'NorwegianBlueParrot', name: 'Blue', voltage: 150, isNailed: false }
  ].map(createBird);

  return birds.map(bird => ({
    name: bird.name,
    plumage: bird.plumage,
    airSpeedVelocity: bird.airSpeedVelocity
  }));
}

// Example 2: Payment Methods
// Expected output: Process payments using polymorphic payment classes

function example2Before() {
  function processPayment(payment) {
    switch (payment.type) {
      case 'creditCard':
        return {
          fee: payment.amount * 0.03,
          processingTime: '1 day',
          message: `Credit card payment of $${payment.amount} processed`
        };
      case 'paypal':
        return {
          fee: payment.amount * 0.029 + 0.30,
          processingTime: 'instant',
          message: `PayPal payment of $${payment.amount} processed`
        };
      case 'bankTransfer':
        return {
          fee: 0,
          processingTime: '3 days',
          message: `Bank transfer of $${payment.amount} processed`
        };
      default:
        return {
          fee: 0,
          processingTime: 'unknown',
          message: 'Unknown payment method'
        };
    }
  }

  function canRefund(payment) {
    switch (payment.type) {
      case 'creditCard':
        return payment.amount <= 5000;
      case 'paypal':
        return true;
      case 'bankTransfer':
        return false;
      default:
        return false;
    }
  }

  const payments = [
    { type: 'creditCard', amount: 100 },
    { type: 'paypal', amount: 50 },
    { type: 'bankTransfer', amount: 200 }
  ];

  return payments.map(payment => ({
    ...processPayment(payment),
    canRefund: canRefund(payment)
  }));
}

function example2After() {
  class Payment {
    constructor(amount) {
      this.amount = amount;
    }

    get fee() {
      return 0;
    }

    get processingTime() {
      return 'unknown';
    }

    get message() {
      return 'Unknown payment method';
    }

    get canRefund() {
      return false;
    }
  }

  class CreditCardPayment extends Payment {
    get fee() {
      return this.amount * 0.03;
    }

    get processingTime() {
      return '1 day';
    }

    get message() {
      return `Credit card payment of $${this.amount} processed`;
    }

    get canRefund() {
      return this.amount <= 5000;
    }
  }

  class PayPalPayment extends Payment {
    get fee() {
      return this.amount * 0.029 + 0.30;
    }

    get processingTime() {
      return 'instant';
    }

    get message() {
      return `PayPal payment of $${this.amount} processed`;
    }

    get canRefund() {
      return true;
    }
  }

  class BankTransferPayment extends Payment {
    get fee() {
      return 0;
    }

    get processingTime() {
      return '3 days';
    }

    get message() {
      return `Bank transfer of $${this.amount} processed`;
    }

    get canRefund() {
      return false;
    }
  }

  function createPayment(type, amount) {
    switch (type) {
      case 'creditCard':
        return new CreditCardPayment(amount);
      case 'paypal':
        return new PayPalPayment(amount);
      case 'bankTransfer':
        return new BankTransferPayment(amount);
      default:
        return new Payment(amount);
    }
  }

  const payments = [
    createPayment('creditCard', 100),
    createPayment('paypal', 50),
    createPayment('bankTransfer', 200)
  ];

  return payments.map(payment => ({
    fee: payment.fee,
    processingTime: payment.processingTime,
    message: payment.message,
    canRefund: payment.canRefund
  }));
}

// Example 3: Pricing Strategies
// Expected output: Calculate product prices using polymorphic pricing classes

function example3Before() {
  function calculatePrice(product) {
    switch (product.pricingType) {
      case 'standard':
        return product.basePrice;
      case 'premium':
        return product.basePrice * 1.5;
      case 'seasonal':
        return product.inSeason ? product.basePrice * 0.8 : product.basePrice * 1.2;
      case 'bulk':
        return product.quantity > 10 ? product.basePrice * 0.9 : product.basePrice;
      default:
        return product.basePrice;
    }
  }

  function getDiscount(product) {
    switch (product.pricingType) {
      case 'standard':
        return 0;
      case 'premium':
        return 0;
      case 'seasonal':
        return product.inSeason ? 20 : 0;
      case 'bulk':
        return product.quantity > 10 ? 10 : 0;
      default:
        return 0;
    }
  }

  const products = [
    { name: 'Widget', basePrice: 100, pricingType: 'standard' },
    { name: 'Gadget', basePrice: 200, pricingType: 'premium' },
    { name: 'Apple', basePrice: 50, pricingType: 'seasonal', inSeason: true },
    { name: 'Screws', basePrice: 1, pricingType: 'bulk', quantity: 15 }
  ];

  return products.map(product => ({
    name: product.name,
    price: calculatePrice(product),
    discount: getDiscount(product)
  }));
}

function example3After() {
  class PricingStrategy {
    constructor(product) {
      Object.assign(this, product);
    }

    get price() {
      return this.basePrice;
    }

    get discount() {
      return 0;
    }
  }

  class StandardPricing extends PricingStrategy {
    get price() {
      return this.basePrice;
    }

    get discount() {
      return 0;
    }
  }

  class PremiumPricing extends PricingStrategy {
    get price() {
      return this.basePrice * 1.5;
    }

    get discount() {
      return 0;
    }
  }

  class SeasonalPricing extends PricingStrategy {
    get price() {
      return this.inSeason ? this.basePrice * 0.8 : this.basePrice * 1.2;
    }

    get discount() {
      return this.inSeason ? 20 : 0;
    }
  }

  class BulkPricing extends PricingStrategy {
    get price() {
      return this.quantity > 10 ? this.basePrice * 0.9 : this.basePrice;
    }

    get discount() {
      return this.quantity > 10 ? 10 : 0;
    }
  }

  function createPricingStrategy(product) {
    switch (product.pricingType) {
      case 'standard':
        return new StandardPricing(product);
      case 'premium':
        return new PremiumPricing(product);
      case 'seasonal':
        return new SeasonalPricing(product);
      case 'bulk':
        return new BulkPricing(product);
      default:
        return new PricingStrategy(product);
    }
  }

  const products = [
    { name: 'Widget', basePrice: 100, pricingType: 'standard' },
    { name: 'Gadget', basePrice: 200, pricingType: 'premium' },
    { name: 'Apple', basePrice: 50, pricingType: 'seasonal', inSeason: true },
    { name: 'Screws', basePrice: 1, pricingType: 'bulk', quantity: 15 }
  ].map(createPricingStrategy);

  return products.map(product => ({
    name: product.name,
    price: product.price,
    discount: product.discount
  }));
}

export {
  example1Before,
  example1After,
  example2Before,
  example2After,
  example3Before,
  example3After
};
