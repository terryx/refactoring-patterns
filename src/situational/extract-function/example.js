// Example 1: Print Owing with Details
// Expected output: Prints invoice details with extracted print function

function printBanner() {
  console.log('***********************');
  console.log('**** Customer Owes ****');
  console.log('***********************');
}

function calculateOutstanding(invoice) {
  return invoice.orders.reduce((sum, order) => sum + order.amount, 0);
}

function example1Before() {
  const invoice = {
    customer: 'BigCo',
    orders: [{ amount: 100 }, { amount: 200 }]
  };

  const output = [];
  const originalLog = console.log;
  console.log = (msg) => output.push(msg);

  printBanner();
  const outstanding = calculateOutstanding(invoice);
  console.log(`name: ${invoice.customer}`);
  console.log(`amount: ${outstanding}`);

  console.log = originalLog;
  return output;
}

function example1After() {
  const invoice = {
    customer: 'BigCo',
    orders: [{ amount: 100 }, { amount: 200 }]
  };

  const output = [];
  const originalLog = console.log;
  console.log = (msg) => output.push(msg);

  function printDetails(invoice, outstanding) {
    console.log(`name: ${invoice.customer}`);
    console.log(`amount: ${outstanding}`);
  }

  printBanner();
  const outstanding = calculateOutstanding(invoice);
  printDetails(invoice, outstanding);

  console.log = originalLog;
  return output;
}

// Example 2: Loop Processing
// Expected output: Processes users with extracted validation logic

function example2Before() {
  const users = [
    { name: 'Alice', age: 25, email: 'alice@example.com' },
    { name: 'Bob', age: 17, email: 'invalid-email' },
    { name: 'Carol', age: 30, email: 'carol@example.com' }
  ];

  const validUsers = [];
  for (const user of users) {
    if (user.age >= 18 && user.email.includes('@') && user.email.includes('.')) {
      validUsers.push(user);
    }
  }

  return validUsers;
}

function example2After() {
  const users = [
    { name: 'Alice', age: 25, email: 'alice@example.com' },
    { name: 'Bob', age: 17, email: 'invalid-email' },
    { name: 'Carol', age: 30, email: 'carol@example.com' }
  ];

  function isValidUser(user) {
    return user.age >= 18 && user.email.includes('@') && user.email.includes('.');
  }

  const validUsers = [];
  for (const user of users) {
    if (isValidUser(user)) {
      validUsers.push(user);
    }
  }

  return validUsers;
}

// Example 3: API Response Handling
// Expected output: Processes API response with extracted error handling and data transformation

function example3Before() {
  const apiResponse = {
    status: 200,
    data: {
      items: [
        { id: 1, name: 'Item 1', price: 10 },
        { id: 2, name: 'Item 2', price: 20 }
      ]
    }
  };

  if (apiResponse.status !== 200) {
    return { success: false, error: 'API request failed' };
  }

  if (!apiResponse.data || !apiResponse.data.items) {
    return { success: false, error: 'Invalid response format' };
  }

  const items = apiResponse.data.items.map(item => ({
    id: item.id,
    name: item.name.toUpperCase(),
    price: item.price * 1.1
  }));

  return { success: true, items };
}

function example3After() {
  const apiResponse = {
    status: 200,
    data: {
      items: [
        { id: 1, name: 'Item 1', price: 10 },
        { id: 2, name: 'Item 2', price: 20 }
      ]
    }
  };

  function validateResponse(response) {
    if (response.status !== 200) {
      return { valid: false, error: 'API request failed' };
    }
    if (!response.data || !response.data.items) {
      return { valid: false, error: 'Invalid response format' };
    }
    return { valid: true };
  }

  function transformItems(items) {
    return items.map(item => ({
      id: item.id,
      name: item.name.toUpperCase(),
      price: item.price * 1.1
    }));
  }

  const validation = validateResponse(apiResponse);
  if (!validation.valid) {
    return { success: false, error: validation.error };
  }

  const items = transformItems(apiResponse.data.items);
  return { success: true, items };
}

export {
  example1Before,
  example1After,
  example2Before,
  example2After,
  example3Before,
  example3After
};
