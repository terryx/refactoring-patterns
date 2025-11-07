// Example 1: Date Calculation
// Expected output: Checks eligibility based on age and membership years

function example1Before() {
  const user = {
    name: 'Alice',
    birthDate: '2000-01-15',
    joinDate: '2020-06-01'
  };

  function isEligible(user) {
    return (new Date().getFullYear() - new Date(user.birthDate).getFullYear()) >= 18 &&
      (new Date().getFullYear() - new Date(user.joinDate).getFullYear()) >= 2;
  }

  return { eligible: isEligible(user) };
}

function example1After() {
  const user = {
    name: 'Alice',
    birthDate: '2000-01-15',
    joinDate: '2020-06-01'
  };

  function isEligible(user) {
    const currentYear = new Date().getFullYear();
    const age = currentYear - new Date(user.birthDate).getFullYear();
    const yearsOfMembership = currentYear - new Date(user.joinDate).getFullYear();

    return age >= 18 && yearsOfMembership >= 2;
  }

  return { eligible: isEligible(user) };
}

// Example 2: Boolean Condition
// Expected output: Validates user access with extracted condition variables

function example2Before() {
  const user = {
    role: 'admin',
    isActive: true,
    lastLogin: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
    permissions: ['read', 'write', 'delete']
  };

  function canAccessResource(user) {
    return user.role === 'admin' && user.isActive &&
      (Date.now() - user.lastLogin.getTime()) < 1000 * 60 * 60 * 24 * 30 &&
      user.permissions.includes('write') && user.permissions.includes('delete');
  }

  return { canAccess: canAccessResource(user) };
}

function example2After() {
  const user = {
    role: 'admin',
    isActive: true,
    lastLogin: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
    permissions: ['read', 'write', 'delete']
  };

  function canAccessResource(user) {
    const isAdmin = user.role === 'admin';
    const daysSinceLastLogin = (Date.now() - user.lastLogin.getTime()) / (1000 * 60 * 60 * 24);
    const hasRecentActivity = daysSinceLastLogin < 30;
    const hasWritePermission = user.permissions.includes('write');
    const hasDeletePermission = user.permissions.includes('delete');

    return isAdmin && user.isActive && hasRecentActivity &&
      hasWritePermission && hasDeletePermission;
  }

  return { canAccess: canAccessResource(user) };
}

// Example 3: API URL Building
// Expected output: Constructs API URL with extracted components

function example3Before() {
  const config = {
    protocol: 'https',
    domain: 'api.example.com',
    version: 'v2',
    endpoint: 'users',
    id: 123,
    params: { include: 'profile', format: 'json' }
  };

  function buildApiUrl(config) {
    return config.protocol + '://' + config.domain + '/api/' + config.version + '/' +
      config.endpoint + '/' + config.id + '?' +
      Object.keys(config.params).map(key => key + '=' + config.params[key]).join('&');
  }

  return { url: buildApiUrl(config) };
}

function example3After() {
  const config = {
    protocol: 'https',
    domain: 'api.example.com',
    version: 'v2',
    endpoint: 'users',
    id: 123,
    params: { include: 'profile', format: 'json' }
  };

  function buildApiUrl(config) {
    const baseUrl = `${config.protocol}://${config.domain}`;
    const apiPath = `/api/${config.version}`;
    const resourcePath = `/${config.endpoint}/${config.id}`;
    const queryString = Object.keys(config.params)
      .map(key => `${key}=${config.params[key]}`)
      .join('&');

    return `${baseUrl}${apiPath}${resourcePath}?${queryString}`;
  }

  return { url: buildApiUrl(config) };
}

export {
  example1Before,
  example1After,
  example2Before,
  example2After,
  example3Before,
  example3After
};
