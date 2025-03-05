# Login Feature Testing Project

This project demonstrates a comprehensive implementation of tests for a login feature in a Next.js application, as requested in the coding exercise for QA Engineer.

## Project Structure

```
login-test-project/
├── .github/workflows/     # CI/CD Configuration
├── components/            # React Components
├── pages/                 # Next.js Application Pages
├── styles/                # CSS Styles
├── utils/                 # Utilities and Helper Functions
├── __tests__/             # Automated Tests
├── jest.config.js         # Jest Configuration
├── package.json           # Dependencies and Scripts
└── README.md              # This file
```

## Local Setup

### Prerequisites

- Node.js (version 18.x or higher)
- npm or yarn

### Installation

1. Clone the repository:
    ```bash
    git clone git@github.com:yanwes/Bioverse.git
    cd login-test-project
    ```

2. Install the dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

### Running the Application

To start the application in development mode:

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`.

### Test Credentials

To log in to the application, use the following credentials:

- Username: `testuser`
- Password: `Password123`

## Running the Tests

### Run all tests

```bash
npm test
# or
yarn test
```

### Run tests in watch mode

```bash
npm run test:watch
# or
yarn test:watch
```

### Generate test coverage report

```bash
npm run test:coverage
# or
yarn test:coverage
```

The coverage report will be generated in the `coverage/` directory.

## Overview of Implemented Tests

### Component Tests (`__tests__/components/`)

- **LoginForm.test.js**: Tests the login form component, including:
  - Correct rendering of all elements
  - Validation of required fields
  - Validation of fields with only whitespace
  - Successful authentication process and redirection
  - Error messages for failed login attempts
  - Handling of special characters and long inputs

### Utility Tests (`__tests__/utils/`)

- **auth.test.js**: Tests the authentication functions, including:
  - Validation of correct and incorrect credentials
  - Checking the authentication state
  - Setting and clearing the authentication state in localStorage

### Page Tests (`__tests__/pages/`)

- **index.test.js**: Tests the home page, verifying:
  - Rendering of the page title
  - Inclusion of the login form component
  - Presence of correct metadata

## CI/CD Integration

This project includes a CI/CD pipeline configured with GitHub Actions. The pipeline runs automatically on each push or pull request to the `main` or `master` branches.

### What the pipeline does:

1. Sets up the Node.js environment
2. Installs the dependencies
3. Runs linting checks
4. Runs all tests
5. Builds the project
6. Generates a test coverage report
7. Saves the coverage report as an artifact

### Viewing CI Results

The pipeline results can be viewed in the "Actions" tab of the GitHub repository. Coverage reports are available as artifacts of each successful run.

For more detailed documentation on CI/CD integration, see the [CI_CD_INTEGRATION.md](./CI_CD_INTEGRATION.md) file.

## Implementation Considerations

- We implemented tests covering both positive and negative scenarios
- Included boundary tests for invalid and special inputs
- Verified form validations and error messages
- Ensured the authentication flow works correctly
- Added tests for UI behaviors and user interactions

## Tools and Technologies Used

- **Next.js**: React framework for building the application
- **Jest**: Testing framework
- **React Testing Library**: Library for testing React components
- **user-event**: Library for simulating user events in tests
- **GitHub Actions**: For the CI/CD pipeline