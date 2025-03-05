import { authenticate, isAuthenticated, setAuthState, clearAuthState } from '../../utils/auth';

const localStorageMock = (() => {
  let store = {};
  return {
    getItem: jest.fn(key => store[key]),
    setItem: jest.fn((key, value) => {
      store[key] = value;
    }),
    removeItem: jest.fn(key => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    })
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

describe('Authentication Utilities', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.clear();
  });

  describe('authenticate function', () => {
    test('returns true for valid credentials', () => {
      const result = authenticate('testuser', 'Password123');
      expect(result).toBe(true);
    });

    test('returns false for invalid username', () => {
      const result = authenticate('wronguser', 'Password123');
      expect(result).toBe(false);
    });

    test('returns false for invalid password', () => {
      const result = authenticate('testuser', 'wrongpassword');
      expect(result).toBe(false);
    });

    test('returns false for empty credentials', () => {
      const result = authenticate('', '');
      expect(result).toBe(false);
    });
  });

  describe('isAuthenticated function', () => {
    test('returns true when authenticated in localStorage', () => {
      localStorageMock.setItem('isAuthenticated', 'true');
      const result = isAuthenticated();
      expect(result).toBe(true);
      expect(localStorageMock.getItem).toHaveBeenCalledWith('isAuthenticated');
    });

    test('returns false when not authenticated in localStorage', () => {
      const result = isAuthenticated();
      expect(result).toBe(false);
      expect(localStorageMock.getItem).toHaveBeenCalledWith('isAuthenticated');
    });
  });

  describe('setAuthState function', () => {
    test('sets authentication state in localStorage', () => {
      setAuthState();
      expect(localStorageMock.setItem).toHaveBeenCalledWith('isAuthenticated', 'true');
    });
  });

  describe('clearAuthState function', () => {
    test('removes authentication state from localStorage', () => {
      localStorageMock.setItem('isAuthenticated', 'true');
      clearAuthState();
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('isAuthenticated');
    });
  });
});