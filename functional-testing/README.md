# functional-testing
This directories purpose is for automated functional testing. Tests will run automatically on each merge to the main branch. 
Test files are located under `cypress/e2e`.

# Prereqs
- Node.js LTS - https://nodejs.org/en/
- Yarn via NPM (which is automatically installed with node) using: `$ npm install --global yarn`
    - if issues running npm or yarn commands on Windows you may need to update your execution policy by opening powershell with
      admin privileges and running: `$ Set-ExecutionPolicy -ExecutionPolicy RemoteSigned`

# Running tests
From the 'functional-testing' directory:
- `$ yarn install`
    - this will install all project dependencies needed to run Cypress.
- `$ yarn cypress open`
    - opens Cypress application to run tests in browser of choice.
- `$ yarn cypress run`
    - this will run all tests (cy.js files) in the project via the command line headlessly
- `$ yarn cypress run --spec path/to/file.cy.js`
    - runs individual test file

# Notes
The test folders `1-getting-started` `2-advanced-examples` contain example tests for our team to get familiar with Cypress and are not 
related to our project.

