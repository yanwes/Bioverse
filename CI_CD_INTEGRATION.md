# CI/CD Integration for the Login Project

This document details the configuration and implementation of continuous integration (CI) and continuous delivery (CD) for the login functionality test project.

## Overview

We implemented a CI/CD pipeline using GitHub Actions that automatically runs tests and checks code quality on every push or pull request to the main branches.

## GitHub Actions Configuration

The GitHub Actions configuration file is located at `.github/workflows/ci.yml`. It defines the pipeline behavior.

```yaml
name: CI/CD Pipeline

on:
    push:
        branches: [ main, master ]
    pull_request:
        branches: [ main, master ]

jobs:
    test:
        runs-on: ubuntu-latest

        strategy:
            matrix:
                node-version: [18.x]

        steps:
        - uses: actions/checkout@v3
        
        - name: Use Node.js ${{ matrix.node-version }}
            uses: actions/setup-node@v3
            with:
                node-version: ${{ matrix.node-version }}
                cache: 'npm'
        
        - name: Install dependencies
            run: npm ci
        
        - name: Run linting
            run: npm run lint
        
        - name: Run tests
            run: npm test
        
        - name: Build project
            run: npm run build
        
        - name: Generate coverage report
            run: npm run test:coverage
        
        - name: Upload coverage artifacts
            uses: actions/upload-artifact@v3
            with:
                name: coverage-report
                path: coverage/
                retention-days: 7
```

## How the Pipeline Works

### Triggers

The pipeline runs automatically when:
- A push is made to the `main` or `master` branches
- A pull request is opened, synchronized, or reopened against the `main` or `master` branches

### Execution Environment

- The pipeline runs on the latest Ubuntu Linux environment
- Uses Node.js version 18.x

### Pipeline Steps

1. **Code Checkout**
     - Retrieves the latest version of the code from the repository

2. **Node.js Setup**
     - Installs and configures Node.js to the specified version
     - Sets up npm cache to speed up future installations

3. **Dependency Installation**
     - Runs `npm ci` to install dependencies exactly as defined in the package-lock.json

4. **Code Linting**
     - Runs `npm run lint` to check code quality and style

5. **Test Execution**
     - Runs `npm test` to execute all automated tests

6. **Project Build**
     - Runs `npm run build` to ensure the project can be built successfully

7. **Coverage Report Generation**
     - Runs `npm run test:coverage` to generate a detailed test coverage report

8. **Artifact Upload**
     - Saves the coverage report as an artifact for later review
     - Retains the artifact for 7 days

## Viewing the Results

### Pipeline Status

To check the pipeline status:
1. Go to the repository on GitHub
2. Navigate to the "Actions" tab
3. Select the "CI/CD Pipeline" workflow from the list
4. Click on a specific run to see details

### Coverage Report

To access the coverage report:
1. Go to the specific pipeline run
2. Scroll down to the "Artifacts" section
3. Click on "coverage-report" to download the report
4. Open the `coverage/lcov-report/index.html` file to view the report in HTML format

## Local Setup

To test the pipeline locally before pushing to GitHub:

1. Install GitHub CLI: https://cli.github.com/
2. Run the following commands:
     ```bash
     # Install Act (https://github.com/nektos/act)
     brew install act

     # Run the workflow locally
     act push
     ```

## Future Extensions

The current pipeline mainly focuses on quality checks and testing. Future improvements could include:

1. **Automatic Deployment**
     - Add steps to automatically deploy to development/staging environments when tests pass

2. **Security Checks**
     - Integrate tools like OWASP Dependency-Check or Snyk to check for security vulnerabilities

3. **Automated PR Comments**
     - Configure automatic comments on PRs with test results and code coverage

4. **Cross-Browser Testing**
     - Expand the test matrix to include different browsers/environments

5. **Notifications**
     - Set up notifications for pipeline failures (Slack, email, etc.)