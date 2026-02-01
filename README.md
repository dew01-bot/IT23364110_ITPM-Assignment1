# IT23364110_ITPM-Assignment1
ITPM Assignment1
1️⃣ Requirement Understanding

First, I analyzed the SwiftTranslator website to understand:

How user input is entered

How translation output is displayed

Real-time translation behavior

Common user scenarios and edge cases

Based on this analysis, I identified:

Positive functional scenarios

Negative and edge-case scenarios

UI real-time update scenarios

2️⃣ Test Case Preparation

Test cases were designed before automation and documented in an Excel sheet.
These test cases included:

Input text (Singlish)

Expected output (Sinhala)

Test type (Positive / Negative / UI)

Test case ID and description

This Excel sheet was used as the reference source for automation.

3️⃣ Environment Setup

The automation environment was set up using:

Node.js

Playwright

VS Code

Steps followed:

npm init -y
npm install -D @playwright/test
npx playwright install


Playwright configuration was handled using playwright.config.js.

4️⃣ Test Automation Implementation

Automation scripts were written using Playwright Test Runner with JavaScript / TypeScript.

Key implementation steps:

Used Playwright locators to identify input and output fields

Implemented sequential typing to test real-time conversion

Used assertions to validate expected Sinhala output

Added wait conditions to handle dynamic UI updates

Organized test cases using loops for maintainability

Test cases were categorized as:

Positive Functional Tests

Negative Functional Tests

UI Real-Time Update Tests

5️⃣ Handling Negative Test Cases

Negative test cases were intentionally written to:

Detect known system limitations

Validate incorrect formatting behavior

Observe failures related to spacing, punctuation, and segmentation

These tests help document existing defects in the application.

6️⃣ Test Execution & Validation

Tests were executed using:

npx playwright test


Results were validated using:

Console logs

Playwright HTML report

Pass/fail behavior against expected outputs

7️⃣ Version Control Using GitHub

The project was version-controlled using Git and hosted on GitHub.

Steps followed:

Initialized Git repository

Committed all automation files

Pushed project to GitHub

Added GitHub Actions workflow for CI

This ensures:

Code backup

Version tracking

Automatic test execution on push

8️⃣ Continuous Integration (CI)

A GitHub Actions workflow was configured to:

Install dependencies

Run Playwright tests automatically

Generate test results on every push

This demonstrates real-world automation practices.

📂 Project Structure
IT23364110/
├── .github/workflows/playwright.yml
├── tests/
│   ├── example.spec.js
│   └── test-1.spec.ts
├── playwright.config.js
├── package.json
├── package-lock.json
├── test-results/
├── playwright-report/
└── README.md

✅ Conclusion

Through this assignment, I learned:

How to design test cases before automation

How to automate functional and UI tests using Playwright

How to handle positive and negative test scenarios

How to use GitHub for version control and CI

How automation helps identify system defects efficiently

This assignment improved my practical understanding of software test automation.
