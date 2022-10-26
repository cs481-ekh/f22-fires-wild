/// <reference types="cypress" />

import { elements } from "../../fixtures/data-cy.json";
const url = "http://localhost:3000/f22-fires-wild";

describe("Proof of concept test using the state of our application at 9/20/2022.", () => {
  beforeEach(() => {
    cy.visit(url, { failOnStatusCode: false });
  });

  it("Should verify that the 'Data' tab exists and displays map along with drop down", () => {
    cy.get(elements.navDataButton)
      .should("be.visible")
      .and("contain.text", "Data")
      .click()
      .get(".leaflet-container")
      .should("be.visible");
  });

  it("Should verify that the 'About' tab exists and displays about page", () => {
    cy.get(elements.navAboutButton)
      .should("be.visible")
      .and("contain.text", "About")
      .click()
      .get("h1")
      .should("be.visible")
      .and("contain.text", "About");
  });

  it("Should verify that the 'Admin' tab exists and displays about page", () => {
    cy.get(elements.navAdminButton)
      .should("be.visible")
      .and("contain.text", "Admin")
      .click()
      .get("h1")
      .should("be.visible")
      .and("contain.text", "Admin");
  });

  it("Should verify that all 3 tabs are displayed on home page", () => {
    cy.get(elements.navDataButton)
      .should("be.visible")
      .and("contain.text", "Data")
      .get(elements.navAboutButton)
      .should("be.visible")
      .and("contain.text", "About")
      .get(elements.navAdminButton)
      .should("be.visible")
      .and("contain.text", "Admin");
  });

  it.skip("Should verify the state selection dropdown exists and functions --Skipped not worth running while WIP", () => {
    cy.get(elements.navDataButton)
      .should("be.visible")
      .and("contain.text", "Data")
      .click()
      .get(elements.stateDropdown)
      .select("Arkansas");
  });

  it("Home button should redirect home regardles of current page", () => {
    cy.get(elements.navDataButton)
      .should("be.visible")
      .click()
      .get(elements.navHomeButton)
      .click()
      .url()
      .should("eq", url)
      .get(elements.navAboutButton)
      .should("be.visible")
      .click()
      .get(elements.navHomeButton)
      .click()
      .url()
      .should("eq", url)
      .get(elements.navAdminButton)
      .should("be.visible")
      .click()
      .get(elements.navHomeButton)
      .click()
      .url()
      .should("eq", url);
  });
});
