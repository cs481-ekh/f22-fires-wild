// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//

// fields -  fields we are requesting
// resObj -  response object from endpoint
// this wont work at the moment because there are some null values in the DB. Still a good example of a 'custom command' in Cypress,
// these can be used across test files.
Cypress.Commands.add("nullFieldValidator", (fields, resObj) => {
  for (var property in resObj) {
    if (
      property in fields ||
      property == "LATITUDE" ||
      property == "LONGITUDE" ||
      property == "DISCOVERY_DATE" ||
      property == "CONT_DATE" ||
      property == "FIRE_SIZE"
    ) {
      expect(resObj[property]).to.not.be.null;
    } else {
      expect(resObj[property]).to.be.null;
    }
  }
});
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
