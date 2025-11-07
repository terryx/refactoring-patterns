// Example 1: Base Price Comparison
// Expected output: Checks if order price exceeds threshold

function example1Before() {
  const anOrder = { basePrice: 1200, customerType: 'premium' };

  function checkPrice(anOrder) {
    const basePrice = anOrder.basePrice;
    return basePrice > 1000;
  }

  return { isPremiumPrice: checkPrice(anOrder) };
}

function example1After() {
  const anOrder = { basePrice: 1200, customerType: 'premium' };

  function checkPrice(anOrder) {
    return anOrder.basePrice > 1000;
  }

  return { isPremiumPrice: checkPrice(anOrder) };
}

// Example 2: Property Access
// Expected output: Gets user's full name from nested properties

function example2Before() {
  const user = {
    profile: {
      firstName: 'John',
      lastName: 'Doe'
    },
    isActive: true
  };

  function getUserFullName(user) {
    const firstName = user.profile.firstName;
    const lastName = user.profile.lastName;
    return `${firstName} ${lastName}`;
  }

  return { fullName: getUserFullName(user) };
}

function example2After() {
  const user = {
    profile: {
      firstName: 'John',
      lastName: 'Doe'
    },
    isActive: true
  };

  function getUserFullName(user) {
    return `${user.profile.firstName} ${user.profile.lastName}`;
  }

  return { fullName: getUserFullName(user) };
}

// Example 3: Method Result
// Expected output: Processes items with inlined filter result

function example3Before() {
  const items = [
    { name: 'Apple', inStock: true, price: 1.5 },
    { name: 'Banana', inStock: false, price: 0.8 },
    { name: 'Orange', inStock: true, price: 2.0 }
  ];

  function processItems(items) {
    const availableItems = items.filter(item => item.inStock);
    return availableItems.map(item => item.name);
  }

  return { available: processItems(items) };
}

function example3After() {
  const items = [
    { name: 'Apple', inStock: true, price: 1.5 },
    { name: 'Banana', inStock: false, price: 0.8 },
    { name: 'Orange', inStock: true, price: 2.0 }
  ];

  function processItems(items) {
    return items.filter(item => item.inStock).map(item => item.name);
  }

  return { available: processItems(items) };
}

export {
  example1Before,
  example1After,
  example2Before,
  example2After,
  example3Before,
  example3After
};
