module.exports = {
    extends: [
      'next',
      'next/core-web-vitals',
      'eslint:recommended',
    ],
    env: {
      browser: true,
      node: true,
      es6: true,
      jest: true,
    },
    rules: {
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  };