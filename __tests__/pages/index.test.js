import { render, screen } from '@testing-library/react';
import Home from '../../pages/index';

jest.mock('../../components/LoginForm', () => {
  return function MockLoginForm() {
    return <div data-testid="mock-login-form">Login Form Mock</div>;
  };
});

describe('Home Page', () => {
  test('renders the page title', () => {
    render(<Home />);
    expect(document.title).toBe('Login Page');
  });

  test('renders the login form component', () => {
    render(<Home />);
    expect(screen.getByTestId('mock-login-form')).toBeInTheDocument();
  });

  test('has the correct meta description', () => {
    render(<Home />);
    const metaDescription = document.querySelector('meta[name="description"]');
    expect(metaDescription).toHaveAttribute('content', 'Login page for testing');
  });
});