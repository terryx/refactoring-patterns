// Example 1: Temperature Range Check
// Expected output: Check if temperature range is within plan limits

function example1Before() {
  class HeatingPlan {
    constructor(temperatureRange) {
      this._temperatureRange = temperatureRange;
    }

    withinRange(bottom, top) {
      return (bottom >= this._temperatureRange.low) && (top <= this._temperatureRange.high);
    }
  }

  const room = {
    daysTempRange: { low: 18, high: 24 }
  };

  const plan = new HeatingPlan({ low: 15, high: 28 });

  const low = room.daysTempRange.low;
  const high = room.daysTempRange.high;
  const isWithinRange = plan.withinRange(low, high);

  return { isWithinRange };
}

function example1After() {
  class HeatingPlan {
    constructor(temperatureRange) {
      this._temperatureRange = temperatureRange;
    }

    withinRange(tempRange) {
      return (tempRange.low >= this._temperatureRange.low) &&
             (tempRange.high <= this._temperatureRange.high);
    }
  }

  const room = {
    daysTempRange: { low: 18, high: 24 }
  };

  const plan = new HeatingPlan({ low: 15, high: 28 });

  const isWithinRange = plan.withinRange(room.daysTempRange);

  return { isWithinRange };
}

// Example 2: Order Creation
// Expected output: Create order with customer information

function example2Before() {
  function createOrder(customerName, customerEmail, customerAddress, items) {
    return {
      customer: {
        name: customerName,
        email: customerEmail,
        address: customerAddress
      },
      items: items,
      total: items.reduce((sum, item) => sum + item.price, 0)
    };
  }

  const customer = {
    name: 'Alice Johnson',
    email: 'alice@example.com',
    address: '123 Main St'
  };

  const items = [
    { name: 'Widget', price: 10 },
    { name: 'Gadget', price: 20 }
  ];

  const order = createOrder(customer.name, customer.email, customer.address, items);

  return order;
}

function example2After() {
  function createOrder(customer, items) {
    return {
      customer: {
        name: customer.name,
        email: customer.email,
        address: customer.address
      },
      items: items,
      total: items.reduce((sum, item) => sum + item.price, 0)
    };
  }

  const customer = {
    name: 'Alice Johnson',
    email: 'alice@example.com',
    address: '123 Main St'
  };

  const items = [
    { name: 'Widget', price: 10 },
    { name: 'Gadget', price: 20 }
  ];

  const order = createOrder(customer, items);

  return order;
}

// Example 3: Point Within Bounds
// Expected output: Check if point is within rectangular bounds

function example3Before() {
  class Rectangle {
    constructor(left, top, right, bottom) {
      this._left = left;
      this._top = top;
      this._right = right;
      this._bottom = bottom;
    }

    contains(x, y) {
      return x >= this._left && x <= this._right &&
             y >= this._top && y <= this._bottom;
    }
  }

  const point = { x: 5, y: 10 };
  const rect = new Rectangle(0, 0, 10, 20);

  const isInside = rect.contains(point.x, point.y);

  return { isInside };
}

function example3After() {
  class Rectangle {
    constructor(left, top, right, bottom) {
      this._left = left;
      this._top = top;
      this._right = right;
      this._bottom = bottom;
    }

    contains(point) {
      return point.x >= this._left && point.x <= this._right &&
             point.y >= this._top && point.y <= this._bottom;
    }
  }

  const point = { x: 5, y: 10 };
  const rect = new Rectangle(0, 0, 10, 20);

  const isInside = rect.contains(point);

  return { isInside };
}

export {
  example1Before,
  example1After,
  example2Before,
  example2After,
  example3Before,
  example3After
};
