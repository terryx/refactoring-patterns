# Guard Clauses

## Guideline

- **Guard Clauses**: Handle edge cases early with immediate returns to reduce nesting

## Example 1: Payment Calculation with Status Checks

```javascript
// Before
function getPayAmount(employee) {
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

// After
function getPayAmount(employee) {
  if (employee.isDead) return { amount: 0, reason: 'deceased' };
  if (employee.isSeparated) return { amount: 0, reason: 'separated' };
  if (employee.isRetired) return { amount: 0, reason: 'retired' };

  return calculateNormalPay(employee);
}
```

## Example 2: Data Processing with Validation

```javascript
// Before
function processUserData(userData) {
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

// After
function processUserData(userData) {
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
```

## Example 3: Configuration Validation

```javascript
// Before
function initializeService(config) {
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

// After
function initializeService(config) {
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
```

## Motivation

Guard clauses replace nested conditional logic with early returns, making code easier to read and understand by handling edge cases upfront.

- **Reduce Nesting**: Deep nesting makes code harder to follow. Guard clauses flatten the structure by handling special cases first.
- **Highlight Normal Path**: By moving edge cases to the top, the main logic becomes more prominent and easier to understand.
- **Improve Readability**: Each condition is independent and clear, rather than being buried in nested blocks.
- **Easier Maintenance**: Adding new edge cases is simple—just add another guard clause at the top.
- **Signal Intent**: Early returns clearly communicate "if this condition fails, we're done here."
- **Reduce Cognitive Load**: Readers can mentally dismiss handled cases and focus on the remaining logic.

## Mechanics

- Identify nested conditionals that handle edge cases or exceptional conditions
- Start with the innermost or most exceptional condition
- Replace the conditional with an early return (or throw) that handles the edge case
- Remove the surrounding `else` block and unindent the remaining code
- Repeat for each edge case, working from most exceptional to least exceptional
- Ensure the "happy path" (normal case) is left at the end with minimal nesting
- Test after each transformation to ensure behavior is preserved
- Consider ordering guard clauses by likelihood or severity (most exceptional first)
