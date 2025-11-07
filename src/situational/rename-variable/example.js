// Example 1: Area Calculation
// Expected output: Calculate area with descriptive variable name

function example1Before() {
  function calculateArea(height, width) {
    const a = height * width;
    return a;
  }

  return { area: calculateArea(5, 10) };
}

function example1After() {
  function calculateArea(height, width) {
    const area = height * width;
    return area;
  }

  return { area: calculateArea(5, 10) };
}

// Example 2: Loop Variables
// Expected output: Process users with descriptive loop variables

function example2Before() {
  const users = [
    { name: 'Alice', age: 25, active: true },
    { name: 'Bob', age: 30, active: false },
    { name: 'Carol', age: 35, active: true }
  ];

  function getActiveUserNames(users) {
    const r = [];
    for (const u of users) {
      if (u.active) {
        r.push(u.name);
      }
    }
    return r;
  }

  return { activeUsers: getActiveUserNames(users) };
}

function example2After() {
  const users = [
    { name: 'Alice', age: 25, active: true },
    { name: 'Bob', age: 30, active: false },
    { name: 'Carol', age: 35, active: true }
  ];

  function getActiveUserNames(users) {
    const activeUserNames = [];
    for (const user of users) {
      if (user.active) {
        activeUserNames.push(user.name);
      }
    }
    return activeUserNames;
  }

  return { activeUsers: getActiveUserNames(users) };
}

// Example 3: Data Transformation
// Expected output: Transform product data with descriptive variable names

function example3Before() {
  const products = [
    { name: 'Widget', price: 10, quantity: 5 },
    { name: 'Gadget', price: 20, quantity: 3 },
    { name: 'Doohickey', price: 15, quantity: 7 }
  ];

  function calculateInventoryValue(products) {
    let t = 0;
    for (const p of products) {
      const v = p.price * p.quantity;
      t += v;
    }
    return t;
  }

  return { totalValue: calculateInventoryValue(products) };
}

function example3After() {
  const products = [
    { name: 'Widget', price: 10, quantity: 5 },
    { name: 'Gadget', price: 20, quantity: 3 },
    { name: 'Doohickey', price: 15, quantity: 7 }
  ];

  function calculateInventoryValue(products) {
    let totalValue = 0;
    for (const product of products) {
      const productValue = product.price * product.quantity;
      totalValue += productValue;
    }
    return totalValue;
  }

  return { totalValue: calculateInventoryValue(products) };
}

export {
  example1Before,
  example1After,
  example2Before,
  example2After,
  example3Before,
  example3After
};
