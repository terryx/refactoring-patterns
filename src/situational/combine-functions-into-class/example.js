// Example 1: Utility Reading Calculations
// Expected output: Calculates base and taxable charges from utility readings

function baseRate(month, year) {
  // Simplified rate calculation
  return 0.15;
}

function taxThreshold(year) {
  return 20;
}

function acquireReading() {
  return { customer: 'ivan', quantity: 150, month: 5, year: 2024 };
}

// Before
function baseCharge(aReading) {
  return baseRate(aReading.month, aReading.year) * aReading.quantity;
}

function taxableCharge(aReading) {
  return Math.max(0, baseCharge(aReading) - taxThreshold(aReading.year));
}

function calculateBaseCharge(aReading) {
  return baseCharge(aReading);
}

function example1Before() {
  const rawReading = acquireReading();
  const base = baseCharge(rawReading);
  const taxable = taxableCharge(rawReading);
  return { base, taxable };
}

// After
class Reading {
  constructor(data) {
    this._customer = data.customer;
    this._quantity = data.quantity;
    this._month = data.month;
    this._year = data.year;
  }

  get customer() { return this._customer; }
  get quantity() { return this._quantity; }
  get month() { return this._month; }
  get year() { return this._year; }

  get baseCharge() {
    return baseRate(this.month, this.year) * this.quantity;
  }

  get taxableCharge() {
    return Math.max(0, this.baseCharge - taxThreshold(this.year));
  }

  get calculateBaseCharge() {
    return this.baseCharge;
  }
}

function example1After() {
  const rawReading = acquireReading();
  const aReading = new Reading(rawReading);
  const base = aReading.baseCharge;
  const taxable = aReading.taxableCharge;
  return { base, taxable };
}

// Example 2: Invoice Calculations
// Expected output: Calculates invoice subtotal, tax, and total

// Before
function calculateSubtotal(invoice) {
  return invoice.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function calculateTax(invoice) {
  const subtotal = calculateSubtotal(invoice);
  return subtotal * invoice.taxRate;
}

function calculateTotal(invoice) {
  return calculateSubtotal(invoice) + calculateTax(invoice) + invoice.shippingFee;
}

function formatInvoice(invoice) {
  return {
    subtotal: calculateSubtotal(invoice),
    tax: calculateTax(invoice),
    total: calculateTotal(invoice),
    dueDate: invoice.dueDate
  };
}

function example2Before() {
  const invoice = {
    items: [
      { price: 10, quantity: 2 },
      { price: 15, quantity: 1 }
    ],
    taxRate: 0.08,
    shippingFee: 10,
    dueDate: '2025-12-01'
  };
  const total = calculateTotal(invoice);
  const formatted = formatInvoice(invoice);
  return { total, formatted };
}

// After
class Invoice {
  constructor(data) {
    this._items = data.items;
    this._taxRate = data.taxRate;
    this._shippingFee = data.shippingFee;
    this._dueDate = data.dueDate;
  }

  get items() { return this._items; }
  get taxRate() { return this._taxRate; }
  get shippingFee() { return this._shippingFee; }
  get dueDate() { return this._dueDate; }

  get subtotal() {
    return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  get tax() {
    return this.subtotal * this.taxRate;
  }

  get total() {
    return this.subtotal + this.tax + this.shippingFee;
  }

  format() {
    return {
      subtotal: this.subtotal,
      tax: this.tax,
      total: this.total,
      dueDate: this.dueDate
    };
  }
}

function example2After() {
  const invoice = new Invoice({
    items: [
      { price: 10, quantity: 2 },
      { price: 15, quantity: 1 }
    ],
    taxRate: 0.08,
    shippingFee: 10,
    dueDate: '2025-12-01'
  });
  const total = invoice.total;
  const formatted = invoice.format();
  return { total, formatted };
}

// Example 3: Date Formatting
// Expected output: Formats dates and calculates date-related information

// Before
function formatShortDate(dateData) {
  return `${dateData.month}/${dateData.day}/${dateData.year}`;
}

function formatLongDate(dateData) {
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  return `${monthNames[dateData.month - 1]} ${dateData.day}, ${dateData.year}`;
}

function isLeapYear(dateData) {
  return (dateData.year % 4 === 0 && dateData.year % 100 !== 0) || (dateData.year % 400 === 0);
}

function daysInMonth(dateData) {
  const daysPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (dateData.month === 2 && isLeapYear(dateData)) {
    return 29;
  }
  return daysPerMonth[dateData.month - 1];
}

function example3Before() {
  const date = { month: 2, day: 15, year: 2024 };
  const short = formatShortDate(date);
  const long = formatLongDate(date);
  const days = daysInMonth(date);
  return { short, long, days };
}

// After
class DateFormatter {
  constructor(data) {
    this._month = data.month;
    this._day = data.day;
    this._year = data.year;
  }

  get month() { return this._month; }
  get day() { return this._day; }
  get year() { return this._year; }

  get shortFormat() {
    return `${this.month}/${this.day}/${this.year}`;
  }

  get longFormat() {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];
    return `${monthNames[this.month - 1]} ${this.day}, ${this.year}`;
  }

  get isLeapYear() {
    return (this.year % 4 === 0 && this.year % 100 !== 0) || (this.year % 400 === 0);
  }

  get daysInMonth() {
    const daysPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (this.month === 2 && this.isLeapYear) {
      return 29;
    }
    return daysPerMonth[this.month - 1];
  }
}

function example3After() {
  const date = new DateFormatter({ month: 2, day: 15, year: 2024 });
  const short = date.shortFormat;
  const long = date.longFormat;
  const days = date.daysInMonth;
  return { short, long, days };
}

export {
  example1Before,
  example1After,
  example2Before,
  example2After,
  example3Before,
  example3After
};
