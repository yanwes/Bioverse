// Hardcoded credentials for testing purposes
const VALID_USERNAME = 'testuser';
const VALID_PASSWORD = 'Password123';

/**
 * Authenticate a user with username and password
 * 
 * @param {string} username - The username to authenticate
 * @param {string} password - The password to authenticate
 * @returns {boolean} - True if authentication is successful, false otherwise
 */
export const authenticate = (username, password) => {
  return username === VALID_USERNAME && password === VALID_PASSWORD;
};

/**
 * Check if user is currently authenticated (for protected routes)
 *
 * @returns {boolean} - True if the user is authenticated
 */
export const isAuthenticated = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('isAuthenticated') === 'true';
  }
  return false;
};

export const setAuthState = () => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('isAuthenticated', 'true');
  }
};

export const clearAuthState = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('isAuthenticated');
  }
};