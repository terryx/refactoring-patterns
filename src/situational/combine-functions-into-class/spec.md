# Combine Functions into Class

## Guideline

- **Combine Functions into Class**: When multiple functions operate on the same data structure

## Example 1: Utility Reading Calculations

```javascript
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
```

## Example 2: Invoice Calculations

```javascript
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
```

## Example 3: Date Formatting

```javascript
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
```

## Motivation

When multiple functions operate on the same data structure, grouping them into a class creates a more cohesive and maintainable design.

- **Explicit Shared Environment**: A class makes the common data environment explicit, showing which functions naturally belong together.
- **Simplified Function Calls**: Methods inside the class can access shared data directly without passing it as arguments repeatedly.
- **Better Encapsulation**: The class provides a clear boundary around related functionality and data.
- **Easier to Pass Around**: Instead of passing raw data, you pass a rich object that carries both data and behavior.
- **Single Responsibility**: Grouping related functions helps identify when a concept deserves its own abstraction.
- **Discoverability**: All related operations are in one place, making it easier to find and understand available functionality.
- **State Management**: When functions share complex state or need memoization, a class provides a natural home for that state.

## Mechanics

- Identify a group of functions that all operate on the same data record or share a common data structure
- Create a new class to hold the shared data
- Apply Encapsulate Record to move the common data into the class constructor and create getters for the fields
- Take each function that uses the common record and use Move Function to move it into the new class as a method
- Remove the data parameter from each moved function since it can now access the data as instance properties
- Update all call sites to create an instance of the class and call methods on it
- Each bit of logic that manipulates the data can be extracted with Extract Function and then moved into the class
- Consider using getters for computed properties that don't take parameters
- Test after each function is moved to ensure behavior is preserved
