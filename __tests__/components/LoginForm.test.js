import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from '../../components/LoginForm';
import { authenticate } from '../../utils/auth';

jest.mock('../../utils/auth', () => ({
  authenticate: jest.fn()
}));

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn()
  })
}));

describe('LoginForm Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    test('renders the login form with all expected elements', () => {
      render(<LoginForm />);
      expect(screen.getByTestId('login-form')).toBeInTheDocument();
      expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
      expect(screen.getByTestId('login-button')).toBeInTheDocument();
      expect(screen.getByRole('button')).toHaveTextContent(/login/i);
    });
  });

  describe('Form Validation', () => {
    test('displays error when submitting with empty username', async () => {
      render(<LoginForm />);
      await userEvent.type(screen.getByLabelText(/password/i), 'testpassword');
      fireEvent.click(screen.getByTestId('login-button'));
      expect(screen.getByTestId('username-error')).toBeInTheDocument();
      expect(screen.getByTestId('username-error')).toHaveTextContent(/required/i);
    });

    test('displays error when submitting with empty password', async () => {
      render(<LoginForm />);
      await userEvent.type(screen.getByLabelText(/username/i), 'testuser');
      fireEvent.click(screen.getByTestId('login-button'));
      expect(screen.getByTestId('password-error')).toBeInTheDocument();
      expect(screen.getByTestId('password-error')).toHaveTextContent(/required/i);
    });

    test('displays errors when submitting with both fields empty', () => {
      render(<LoginForm />);
      fireEvent.click(screen.getByTestId('login-button'));
      expect(screen.getByTestId('username-error')).toBeInTheDocument();
      expect(screen.getByTestId('password-error')).toBeInTheDocument();
    });

    test('displays error when submitting with whitespace-only username', async () => {
      render(<LoginForm />);
      await userEvent.type(screen.getByLabelText(/username/i), '   ');
      await userEvent.type(screen.getByLabelText(/password/i), 'testpassword');
      fireEvent.click(screen.getByTestId('login-button'));
      expect(screen.getByTestId('username-error')).toBeInTheDocument();
    });

    test('displays error when submitting with whitespace-only password', async () => {
      render(<LoginForm />);
      await userEvent.type(screen.getByLabelText(/username/i), 'testuser');
      await userEvent.type(screen.getByLabelText(/password/i), '   ');
      fireEvent.click(screen.getByTestId('login-button'));
      expect(screen.getByTestId('password-error')).toBeInTheDocument();
    });

    test('does not show validation errors with valid inputs', async () => {
      render(<LoginForm />);
      await userEvent.type(screen.getByLabelText(/username/i), 'testuser');
      await userEvent.type(screen.getByLabelText(/password/i), 'password123');
      fireEvent.click(screen.getByTestId('login-button'));
      expect(screen.queryByTestId('username-error')).not.toBeInTheDocument();
      expect(screen.queryByTestId('password-error')).not.toBeInTheDocument();
    });
  });

  describe('Authentication Flow', () => {
    test('redirects to dashboard on successful login', async () => {
      authenticate.mockReturnValue(true);
      const { router } = require('next/router');
      render(<LoginForm />);
      await userEvent.type(screen.getByLabelText(/username/i), 'testuser');
      await userEvent.type(screen.getByLabelText(/password/i), 'password123');
      fireEvent.click(screen.getByTestId('login-button'));
      expect(authenticate).toHaveBeenCalledWith('testuser', 'password123');
      await waitFor(() => {
        expect(router.push).toHaveBeenCalledWith('/dashboard');
      });
    });

    test('shows error message on failed login', async () => {
      authenticate.mockReturnValue(false);
      render(<LoginForm />);
      await userEvent.type(screen.getByLabelText(/username/i), 'wronguser');
      await userEvent.type(screen.getByLabelText(/password/i), 'wrongpass');
      fireEvent.click(screen.getByTestId('login-button'));
      expect(authenticate).toHaveBeenCalledWith('wronguser', 'wrongpass');
      await waitFor(() => {
        expect(screen.getByTestId('auth-error')).toBeInTheDocument();
        expect(screen.getByTestId('auth-error')).toHaveTextContent(/invalid username or password/i);
      });
    });
  });

  describe('Special Input Handling', () => {
    test('handles special characters in username', async () => {
      render(<LoginForm />);
      await userEvent.type(screen.getByLabelText(/username/i), 'test@user!123');
      await userEvent.type(screen.getByLabelText(/password/i), 'password123');
      fireEvent.click(screen.getByTestId('login-button'));
      expect(authenticate).toHaveBeenCalledWith('test@user!123', 'password123');
    });

    test('handles long inputs in form fields', async () => {
      render(<LoginForm />);
      const longUsername = 'a'.repeat(100);
      const longPassword = 'b'.repeat(100);
      await userEvent.type(screen.getByLabelText(/username/i), longUsername);
      await userEvent.type(screen.getByLabelText(/password/i), longPassword);
      fireEvent.click(screen.getByTestId('login-button'));
      expect(authenticate).toHaveBeenCalledWith(longUsername, longPassword);
    });
  });
});