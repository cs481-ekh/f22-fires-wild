/// <reference types="cypress" />

const url = "http://localhost:8000/polls/";

describe("Proof of concept test using the state of our application at sprint 0.", () => {
  before(() => {
    cy.visit(url, { failOnStatusCode: false });
  });

  it("Demonstration of a simple front end test", () => {
    cy.get("h1").should("include.text", `ProgrammingError`);
    cy.get(".exception_value").should(
      "contain.text",
      `(1146, "Table 'mysql-db.polls_question' doesn't exist")`
    );
    cy.get("#template > h2").should(
      "contain.text",
      "Error during template rendering"
    );
  });

  it("Demonstration of a simple api test", () => {
    cy.request({ method: "GET", url, failOnStatusCode: false }).then((res) => {
      cy.log(JSON.stringify(res.body));
      cy.expect(res.status).to.eq(500);
    });
  });
});
