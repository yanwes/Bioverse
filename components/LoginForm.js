import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Login.module.css';
import { authenticate } from '../utils/auth';

const LoginForm = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');

    if (validateForm()) {
      setIsSubmitting(true);

      try {
        const isAuthenticated = authenticate(username, password);

        if (isAuthenticated) {
          router.push('/dashboard');
        } else {
          setAuthError('Invalid username or password');
        }
      } catch (error) {
        setAuthError('An error occurred during login');
        console.error('Login error:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className={styles.formContainer}>
      <h1>Login</h1>

      <form onSubmit={handleSubmit} className={styles.loginForm} data-testid="login-form">
        {authError && (
          <div className={styles.authError} data-testid="auth-error">
            {authError}
          </div>
        )}

        <div className={styles.formGroup}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            aria-describedby={errors.username ? "username-error" : undefined}
            data-testid="username-input"
          />
          {errors.username && (
            <span id="username-error" className={styles.error} data-testid="username-error">
              {errors.username}
            </span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-describedby={errors.password ? "password-error" : undefined}
            data-testid="password-input"
          />
          {errors.password && (
            <span id="password-error" className={styles.error} data-testid="password-error">
              {errors.password}
            </span>
          )}
        </div>

        <button 
          type="submit" 
          className={styles.submitButton}
          disabled={isSubmitting}
          data-testid="login-button"
        >
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;