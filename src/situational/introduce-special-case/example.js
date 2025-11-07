// Example 1: Unknown Customer
// Expected output: Handle unknown customer with special-case object

function example1Before() {
  function getCustomerName(customer) {
    return customer === 'unknown' ? 'occupant' : customer.name;
  }

  function getCustomerBillingPlan(customer) {
    return customer === 'unknown' ? 'basic' : customer.billingPlan;
  }

  function getCustomerPaymentHistory(customer) {
    return customer === 'unknown' ? [] : customer.paymentHistory;
  }

  const customer = 'unknown';
  return {
    name: getCustomerName(customer),
    billingPlan: getCustomerBillingPlan(customer),
    paymentHistory: getCustomerPaymentHistory(customer)
  };
}

function example1After() {
  class Customer {
    constructor(name, billingPlan, paymentHistory) {
      this._name = name;
      this._billingPlan = billingPlan;
      this._paymentHistory = paymentHistory;
    }

    get name() { return this._name; }
    get billingPlan() { return this._billingPlan; }
    get paymentHistory() { return this._paymentHistory; }
    get isUnknown() { return false; }
  }

  class UnknownCustomer {
    get name() { return 'occupant'; }
    get billingPlan() { return 'basic'; }
    get paymentHistory() { return []; }
    get isUnknown() { return true; }
  }

  function getCustomerName(customer) {
    return customer.name;
  }

  function getCustomerBillingPlan(customer) {
    return customer.billingPlan;
  }

  function getCustomerPaymentHistory(customer) {
    return customer.paymentHistory;
  }

  const customer = new UnknownCustomer();
  return {
    name: getCustomerName(customer),
    billingPlan: getCustomerBillingPlan(customer),
    paymentHistory: getCustomerPaymentHistory(customer)
  };
}

// Example 2: Offline Mode
// Expected output: Handle offline connection with special-case object

function example2Before() {
  function fetchData(connection, url) {
    if (connection === null) {
      return { error: 'No connection available' };
    }
    return connection.fetch(url);
  }

  function getConnectionStatus(connection) {
    return connection === null ? 'offline' : connection.status;
  }

  function getLatency(connection) {
    return connection === null ? 0 : connection.latency;
  }

  const connection = null;
  return {
    data: fetchData(connection, '/api/data'),
    status: getConnectionStatus(connection),
    latency: getLatency(connection)
  };
}

function example2After() {
  class Connection {
    constructor(status, latency) {
      this._status = status;
      this._latency = latency;
    }

    get status() { return this._status; }
    get latency() { return this._latency; }
    get isOffline() { return false; }

    fetch(url) {
      return { data: `Data from ${url}` };
    }
  }

  class OfflineConnection {
    get status() { return 'offline'; }
    get latency() { return 0; }
    get isOffline() { return true; }

    fetch(url) {
      return { error: 'No connection available' };
    }
  }

  function fetchData(connection, url) {
    return connection.fetch(url);
  }

  function getConnectionStatus(connection) {
    return connection.status;
  }

  function getLatency(connection) {
    return connection.latency;
  }

  const connection = new OfflineConnection();
  return {
    data: fetchData(connection, '/api/data'),
    status: getConnectionStatus(connection),
    latency: getLatency(connection)
  };
}

// Example 3: Null Order
// Expected output: Handle missing order with special-case object

function example3Before() {
  function getOrderTotal(order) {
    return order === null ? 0 : order.total;
  }

  function getOrderStatus(order) {
    return order === null ? 'not found' : order.status;
  }

  function getOrderItems(order) {
    return order === null ? [] : order.items;
  }

  const order = null;
  return {
    total: getOrderTotal(order),
    status: getOrderStatus(order),
    items: getOrderItems(order)
  };
}

function example3After() {
  class Order {
    constructor(total, status, items) {
      this._total = total;
      this._status = status;
      this._items = items;
    }

    get total() { return this._total; }
    get status() { return this._status; }
    get items() { return this._items; }
    get isNull() { return false; }
  }

  class NullOrder {
    get total() { return 0; }
    get status() { return 'not found'; }
    get items() { return []; }
    get isNull() { return true; }
  }

  function getOrderTotal(order) {
    return order.total;
  }

  function getOrderStatus(order) {
    return order.status;
  }

  function getOrderItems(order) {
    return order.items;
  }

  const order = new NullOrder();
  return {
    total: getOrderTotal(order),
    status: getOrderStatus(order),
    items: getOrderItems(order)
  };
}

export {
  example1Before,
  example1After,
  example2Before,
  example2After,
  example3Before,
  example3After
};
