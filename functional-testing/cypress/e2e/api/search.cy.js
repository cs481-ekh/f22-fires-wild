/// <reference types="cypress" />

const url = "http://localhost:8000/api/search/";

describe("Proof of concept test using the state of our application at 9/20/2022.", () => {
  // GTE, LTE, & range tests
  it.skip("Should validate FIRE_SIZE GTE functionality", () => {
    cy.request({
      method: "GET",
      url,
      qs: {
        FIRE_SIZE__gte: 0.1,
      },
    }).then((response) => {
      // below is how to log a response, data we care to test will be in .body
      cy.log(JSON.stringify(response.body));
      let returnedList = response.body;
      returnedList.forEach((obj) => {
        expect(Number(obj.FIRE_SIZE)).to.be.gte(0.1);
        // function wont work yet
        // cy.nullFieldValidator(["FIRE_SIZE"], obj);
      });
    });
  });

  it.skip("Should validate FIRE_SIZE LTE functionality", () => {
    cy.request({
      method: "GET",
      url,
      qs: {
        FIRE_SIZE__lte: 1,
      },
    }).then((response) => {
      let returnedList = response.body;
      returnedList.forEach((obj) => {
        expect(Number(obj.FIRE_SIZE)).to.be.lte(1);
      });
    });
  });

  it.skip("Should validate FIRE_SIZE range functionality", () => {
    cy.request({
      method: "GET",
      url,
      qs: {
        FIRE_SIZE__range: "0.1->1",
      },
    }).then((response) => {
      let returnedList = response.body;
      returnedList.forEach((obj) => {
        expect(Number(obj.FIRE_SIZE)).to.be.within(0.1, 1);
      });
    });
  });

  it.skip("Should validate FIRE_YEAR GTE functionality", () => {
    cy.request({
      method: "GET",
      url,
      qs: {
        FIRE_YEAR__gte: 2018,
      },
    }).then((response) => {
      let returnedList = response.body;
      returnedList.forEach((obj) => {
        expect(Number(obj.FIRE_YEAR)).to.be.gte(2018);
      });
    });
  });

  it.skip("Should validate FIRE_YEAR LTE functionality", () => {
    cy.request({
      method: "GET",
      url,
      qs: {
        FIRE_YEAR__lte: 2019,
      },
    }).then((response) => {
      let returnedList = response.body;
      returnedList.forEach((obj) => {
        expect(Number(obj.FIRE_YEAR)).to.be.lte(2019);
      });
    });
  });

  it.skip("Should validate FIRE_YEAR range functionality", () => {
    cy.request({
      method: "GET",
      url,
      qs: {
        FIRE_YEAR__range: "2018->2019",
      },
    }).then((response) => {
      let returnedList = response.body;
      returnedList.forEach((obj) => {
        expect(Number(obj.FIRE_YEAR)).to.be.within(2018, 2019);
      });
    });
  });

  // todo
  it.skip("Should validate DISCOVERY_DATE GTE functionality", () => {
    cy.request({
      method: "GET",
      url,
      qs: {
        DISCOVERY_DATE__gte: "0007-05-18",
      },
    }).then((response) => {
      let returnedList = response.body;
      returnedList.forEach((obj) => {
        cy.log(JSON.stringify(obj));
        // expect(Number(obj.DISCOVERY_DATE)).to.be.gte(Date("0007 - 05 - 18"));
      });
    });
  });

  // todo
  it.skip("Should validate DISCOVERY_DATE LTE functionality", () => {
    cy.request({
      method: "GET",
      url,
      qs: {
        DISCOVERY_DATE__lte: 2019,
      },
    }).then((response) => {
      let returnedList = response.body;
      returnedList.forEach((obj) => {
        expect(Number(obj.DISCOVERY_DATE)).to.be.lte(2019);
      });
    });
  });

  // todo
  it.skip("Should validate DISCOVERY_DATE range functionality", () => {
    cy.request({
      method: "GET",
      url,
      qs: {
        DISCOVERY_DATE__range: "2018->2019",
      },
    }).then((response) => {
      let returnedList = response.body;
      returnedList.forEach((obj) => {
        expect(Number(obj.DISCOVERY_DATE)).to.be.within(2018, 2019);
      });
    });
  });

  it.skip("Should validate DISCOVERY_DOY GTE functionality", () => {
    cy.request({
      method: "GET",
      url,
      qs: {
        DISCOVERY_DOY__gte: 185,
      },
    }).then((response) => {
      let returnedList = response.body;
      returnedList.forEach((obj) => {
        expect(Number(obj.DISCOVERY_DOY)).to.be.gte(185);
      });
    });
  });

  it.skip("Should validate DISCOVERY_DOY LTE functionality", () => {
    cy.request({
      method: "GET",
      url,
      qs: {
        DISCOVERY_DOY__lte: 186,
      },
    }).then((response) => {
      let returnedList = response.body;
      returnedList.forEach((obj) => {
        expect(Number(obj.DISCOVERY_DOY)).to.be.lte(186);
      });
    });
  });

  it.skip("Should validate DISCOVERY_DOY range functionality", () => {
    cy.request({
      method: "GET",
      url,
      qs: {
        DISCOVERY_DOY__range: "185->186",
      },
    }).then((response) => {
      let returnedList = response.body;
      returnedList.forEach((obj) => {
        expect(Number(obj.DISCOVERY_DOY)).to.be.within(185, 186);
      });
    });
  });

  it.skip("Should validate DISCOVERY_TIME GTE functionality", () => {
    cy.request({
      method: "GET",
      url,
      qs: {
        DISCOVERY_TIME__gte: 1500,
      },
    }).then((response) => {
      let returnedList = response.body;
      returnedList.forEach((obj) => {
        expect(Number(obj.DISCOVERY_TIME)).to.be.gte(1500);
      });
    });
  });

  it.skip("Should validate DISCOVERY_TIME LTE functionality", () => {
    cy.request({
      method: "GET",
      url,
      qs: {
        DISCOVERY_TIME__lte: 1600,
      },
    }).then((response) => {
      let returnedList = response.body;
      returnedList.forEach((obj) => {
        expect(Number(obj.DISCOVERY_TIME)).to.be.lte(1600);
      });
    });
  });

  it.skip("Should validate DISCOVERY_TIME range functionality", () => {
    cy.request({
      method: "GET",
      url,
      qs: {
        DISCOVERY_TIME__range: "1500->1600",
      },
    }).then((response) => {
      let returnedList = response.body;
      returnedList.forEach((obj) => {
        expect(Number(obj.DISCOVERY_TIME)).to.be.within(1500, 1600);
      });
    });
  });

  //todo
  it.skip("Should validate CONT_DATE GTE functionality", () => {
    cy.request({
      method: "GET",
      url,
      qs: {
        CONT_DATE__gte: "7/4/18 0:00",
      },
    }).then((response) => {
      let returnedList = response.body;
      returnedList.forEach((obj) => {
        cy.log(JSON.stringify(obj));
        //something like this
        // expect(Date(obj.CONT_DATE)).to.be.gte(Date("7/4/18 0:00"));
      });
    });
  });

  //todo
  it.skip("Should validate CONT_DATE LTE functionality", () => {
    cy.request({
      method: "GET",
      url,
      qs: {
        CONT_DATE__lte: 1600,
      },
    }).then((response) => {
      let returnedList = response.body;
      returnedList.forEach((obj) => {
        expect(Number(obj.CONT_DATE)).to.be.lte(1600);
      });
    });
  });

  //todo
  it.skip("Should validate CONT_DATE range functionality", () => {
    cy.request({
      method: "GET",
      url,
      qs: {
        CONT_DATE__range: "1500->1600",
      },
    }).then((response) => {
      let returnedList = response.body;
      returnedList.forEach((obj) => {
        expect(Number(obj.CONT_DATE)).to.be.within(1500, 1600);
      });
    });
  });

  it.skip("Should validate CONT_DOY GTE functionality", () => {
    cy.request({
      method: "GET",
      url,
      qs: {
        CONT_DOY__gte: 185,
      },
    }).then((response) => {
      let returnedList = response.body;
      returnedList.forEach((obj) => {
        expect(Number(obj.CONT_DOY)).to.be.gte(185);
      });
    });
  });

  it.skip("Should validate CONT_DOY LTE functionality", () => {
    cy.request({
      method: "GET",
      url,
      qs: {
        CONT_DOY__lte: 186,
      },
    }).then((response) => {
      let returnedList = response.body;
      returnedList.forEach((obj) => {
        expect(Number(obj.CONT_DOY)).to.be.lte(186);
      });
    });
  });

  it.skip("Should validate CONT_DOY range functionality", () => {
    cy.request({
      method: "GET",
      url,
      qs: {
        CONT_DOY__range: "185->186",
      },
    }).then((response) => {
      let returnedList = response.body;
      returnedList.forEach((obj) => {
        expect(Number(obj.CONT_DOY)).to.be.within(185, 186);
      });
    });
  });

  it.skip("Should validate CONT_TIME GTE functionality", () => {
    cy.request({
      method: "GET",
      url,
      qs: {
        CONT_TIME__gte: 1500,
      },
    }).then((response) => {
      let returnedList = response.body;
      returnedList.forEach((obj) => {
        expect(Number(obj.CONT_TIME)).to.be.gte(1500);
      });
    });
  });

  it.skip("Should validate CONT_TIME LTE functionality", () => {
    cy.request({
      method: "GET",
      url,
      qs: {
        CONT_TIME__lte: 1600,
      },
    }).then((response) => {
      let returnedList = response.body;
      returnedList.forEach((obj) => {
        expect(Number(obj.CONT_TIME)).to.be.lte(1600);
      });
    });
  });

  it.skip("Should validate CONT_TIME range functionality", () => {
    cy.request({
      method: "GET",
      url,
      qs: {
        CONT_TIME__range: "1500->1600",
      },
    }).then((response) => {
      let returnedList = response.body;
      returnedList.forEach((obj) => {
        expect(Number(obj.CONT_TIME)).to.be.within(1500, 1600);
      });
    });
  });
});
