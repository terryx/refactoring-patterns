// Example 1: Charge Calculator
// Expected output: Calculate charge using simple function instead of command object

function example1Before() {
  class ChargeCalculator {
    constructor(customer, usage) {
      this._customer = customer;
      this._usage = usage;
    }

    execute() {
      return this._customer.rate * this._usage;
    }
  }

  const customer = { name: 'Acme Corp', rate: 0.15 };
  const usage = 100;

  const calculator = new ChargeCalculator(customer, usage);
  const charge = calculator.execute();

  return { charge };
}

function example1After() {
  function charge(customer, usage) {
    return customer.rate * usage;
  }

  const customer = { name: 'Acme Corp', rate: 0.15 };
  const usage = 100;

  const chargeAmount = charge(customer, usage);

  return { charge: chargeAmount };
}

// Example 2: Data Validator
// Expected output: Validate data using simple function instead of command object

function example2Before() {
  class DataValidator {
    constructor(data, rules) {
      this._data = data;
      this._rules = rules;
    }

    execute() {
      const errors = [];
      for (const rule of this._rules) {
        if (!rule.test(this._data)) {
          errors.push(rule.message);
        }
      }
      return errors.length === 0 ? { valid: true } : { valid: false, errors };
    }
  }

  const data = { email: 'test@example.com', age: 25 };
  const rules = [
    { test: (d) => d.email.includes('@'), message: 'Invalid email' },
    { test: (d) => d.age >= 18, message: 'Must be 18 or older' }
  ];

  const validator = new DataValidator(data, rules);
  const result = validator.execute();

  return result;
}

function example2After() {
  function validateData(data, rules) {
    const errors = [];
    for (const rule of rules) {
      if (!rule.test(data)) {
        errors.push(rule.message);
      }
    }
    return errors.length === 0 ? { valid: true } : { valid: false, errors };
  }

  const data = { email: 'test@example.com', age: 25 };
  const rules = [
    { test: (d) => d.email.includes('@'), message: 'Invalid email' },
    { test: (d) => d.age >= 18, message: 'Must be 18 or older' }
  ];

  const result = validateData(data, rules);

  return result;
}

// Example 3: Report Generator
// Expected output: Generate report using simple function instead of command object

function example3Before() {
  class ReportGenerator {
    constructor(data, format) {
      this._data = data;
      this._format = format;
    }

    execute() {
      if (this._format === 'csv') {
        return this._data.map(row => Object.values(row).join(',')).join('\n');
      } else if (this._format === 'json') {
        return JSON.stringify(this._data);
      }
      return this._data.map(row => `${row.name}: ${row.value}`).join('\n');
    }
  }

  const data = [
    { name: 'Alice', value: 100 },
    { name: 'Bob', value: 200 }
  ];

  const generator = new ReportGenerator(data, 'csv');
  const report = generator.execute();

  return { report };
}

function example3After() {
  function generateReport(data, format) {
    if (format === 'csv') {
      return data.map(row => Object.values(row).join(',')).join('\n');
    } else if (format === 'json') {
      return JSON.stringify(data);
    }
    return data.map(row => `${row.name}: ${row.value}`).join('\n');
  }

  const data = [
    { name: 'Alice', value: 100 },
    { name: 'Bob', value: 200 }
  ];

  const report = generateReport(data, 'csv');

  return { report };
}

export {
  example1Before,
  example1After,
  example2Before,
  example2After,
  example3Before,
  example3After
};
