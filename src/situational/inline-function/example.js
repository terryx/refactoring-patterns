// Example 1: Driver Rating
// Expected output: Calculate driver rating based on late deliveries

function example1Before() {
  function moreThanFiveLateDeliveries(driver) {
    return driver.numberOfLateDeliveries > 5;
  }

  function getRating(driver) {
    return moreThanFiveLateDeliveries(driver) ? 2 : 1;
  }

  const driver = { name: 'John', numberOfLateDeliveries: 7 };
  return { rating: getRating(driver) };
}

function example1After() {
  function getRating(driver) {
    return driver.numberOfLateDeliveries > 5 ? 2 : 1;
  }

  const driver = { name: 'John', numberOfLateDeliveries: 7 };
  return { rating: getRating(driver) };
}

// Example 2: Boolean Wrapper
// Expected output: Check if user is eligible with inlined boolean check

function example2Before() {
  function isAdult(age) {
    return age >= 18;
  }

  function isEligible(user) {
    return isAdult(user.age) && user.hasAccount;
  }

  const user = { name: 'Alice', age: 25, hasAccount: true };
  return { eligible: isEligible(user) };
}

function example2After() {
  function isEligible(user) {
    return user.age >= 18 && user.hasAccount;
  }

  const user = { name: 'Alice', age: 25, hasAccount: true };
  return { eligible: isEligible(user) };
}

// Example 3: Delegation Overhead
// Expected output: Process order with inlined delegation

function example3Before() {
  function calculateTax(amount, rate) {
    return amount * rate;
  }

  function calculateOrderTax(order) {
    return calculateTax(order.amount, order.taxRate);
  }

  function processOrder(order) {
    const tax = calculateOrderTax(order);
    const total = order.amount + tax;
    return { subtotal: order.amount, tax, total };
  }

  const order = { amount: 100, taxRate: 0.08 };
  return processOrder(order);
}

function example3After() {
  function calculateTax(amount, rate) {
    return amount * rate;
  }

  function processOrder(order) {
    const tax = calculateTax(order.amount, order.taxRate);
    const total = order.amount + tax;
    return { subtotal: order.amount, tax, total };
  }

  const order = { amount: 100, taxRate: 0.08 };
  return processOrder(order);
}

export {
  example1Before,
  example1After,
  example2Before,
  example2After,
  example3Before,
  example3After
};
