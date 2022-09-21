/// <reference types="cypress" />

const url = "http://localhost:3000/";

describe("Proof of concept test using the state of our application at 9/20/2022.", () => {
  before(() => {
    cy.visit(url, { failOnStatusCode: false });
  });

  it("Should verify that the 'Data' tab exists and displays map", () => {
    cy.get("ul > :nth-child(1) > a")
      .should("be.visible")
      .and("contain.text", "Data")
      .click()
      .get(".leaflet-container")
      .should("be.visible");
  });

  it("Should verify that the 'About' tab exists and displays about page", () => {
    cy.get("ul > :nth-child(2) > a")
      .should("be.visible")
      .and("contain.text", "About")
      .click()
      .get("h1")
      .should("be.visible")
      .and("contain.text", "About");
  });

  it("Should verify that the 'Admin' tab exists and displays about page", () => {
    cy.get("ul > :nth-child(3) > a")
      .should("be.visible")
      .and("contain.text", "Admin")
      .click()
      .get("h1")
      .should("be.visible")
      .and("contain.text", "Admin");
  });

  it("Should verify that all 3 tabs are displayed", () => {
    cy.get("ul > :nth-child(1) > a")
      .should("be.visible")
      .and("contain.text", "Data")
      .get("ul > :nth-child(2) > a")
      .should("be.visible")
      .and("contain.text", "About")
      .get("ul > :nth-child(3) > a")
      .should("be.visible")
      .and("contain.text", "Admin");
  });
});
