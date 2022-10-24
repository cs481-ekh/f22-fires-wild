/// <reference types="cypress" />

const url = "http://localhost:8000/heatmap/";

describe("API test suite for the /heatmap endpoint", () => {
  it("Expect that each fire returned has 3 required properties for mapping", () => {
    cy.request({
      method: "GET",
      url,
    }).then((response) => {
      let returnedList = response.body;
      returnedList.forEach((obj) => {
        expect(obj.LATITUDE).to.not.be.null;
        expect(Number(obj.LATITUDE)).to.not.eq(0);
        expect(obj.LONGITUDE).to.not.be.null;
        expect(Number(obj.LONGITUDE)).to.not.eq(0);
        expect(obj.FIRE_SIZE).to.not.be.null;
        expect(Number(obj.FIRE_SIZE)).to.be.gte(1);
      });
    });
  });
});
