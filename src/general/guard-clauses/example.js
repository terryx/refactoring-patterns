// Example 1: Payment Calculation with Status Checks
// Expected output: Returns payment amount with reason or calculated normal pay

function calculateNormalPay(employee) {
  return { amount: employee.salary || 5000, reason: 'normal' };
}

function example1Before(employee) {
  let result;
  if (employee.isSeparated) {
    result = { amount: 0, reason: 'separated' };
  } else {
    if (employee.isRetired) {
      result = { amount: 0, reason: 'retired' };
    } else {
      if (employee.isDead) {
        result = { amount: 0, reason: 'deceased' };
      } else {
        result = calculateNormalPay(employee);
      }
    }
  }
  return result;
}

function example1After(employee) {
  if (employee.isDead) return { amount: 0, reason: 'deceased' };
  if (employee.isSeparated) return { amount: 0, reason: 'separated' };
  if (employee.isRetired) return { amount: 0, reason: 'retired' };

  return calculateNormalPay(employee);
}

// Example 2: Data Processing with Validation
// Expected output: Returns normalized user object or error object

function validateEmail(email) {
  return email && email.includes('@');
}

function normalizeEmail(email) {
  return email.toLowerCase().trim();
}

function example2Before(userData) {
  let result;
  if (userData) {
    if (userData.id) {
      if (userData.email) {
        if (validateEmail(userData.email)) {
          result = {
            id: userData.id,
            email: normalizeEmail(userData.email),
            name: userData.name || 'Unknown'
          };
        } else {
          result = { error: 'Invalid email format' };
        }
      } else {
        result = { error: 'Email is required' };
      }
    } else {
      result = { error: 'User ID is required' };
    }
  } else {
    result = { error: 'User data is required' };
  }
  return result;
}

function example2After(userData) {
  if (!userData) return { error: 'User data is required' };
  if (!userData.id) return { error: 'User ID is required' };
  if (!userData.email) return { error: 'Email is required' };
  if (!validateEmail(userData.email)) return { error: 'Invalid email format' };

  return {
    id: userData.id,
    email: normalizeEmail(userData.email),
    name: userData.name || 'Unknown'
  };
}

// Example 3: Configuration Validation
// Expected output: Returns initialized service object or throws error

function createClient(service) {
  return { connected: true, service };
}

function example3Before(config) {
  let service;
  if (config.apiKey) {
    if (config.endpoint) {
      if (config.timeout > 0) {
        service = {
          apiKey: config.apiKey,
          endpoint: config.endpoint,
          timeout: config.timeout,
          status: 'initialized'
        };
        service.client = createClient(service);
      } else {
        throw new Error('Timeout must be positive');
      }
    } else {
      throw new Error('Endpoint is required');
    }
  } else {
    throw new Error('API key is required');
  }
  return service;
}

function example3After(config) {
  if (!config.apiKey) throw new Error('API key is required');
  if (!config.endpoint) throw new Error('Endpoint is required');
  if (config.timeout <= 0) throw new Error('Timeout must be positive');

  const service = {
    apiKey: config.apiKey,
    endpoint: config.endpoint,
    timeout: config.timeout,
    status: 'initialized'
  };
  service.client = createClient(service);

  return service;
}

export {
  example1Before,
  example1After,
  example2Before,
  example2After,
  example3Before,
  example3After
};
