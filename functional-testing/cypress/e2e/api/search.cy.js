/// <reference types="cypress" />

const url = "http://localhost:8000/api/search/";

describe("API test suite for the /search endpoint", () => {
  it("Should perform specific search, return all values specified by query params", () => {
    let queryDate = "2018-07-05";
    let qs = {
      FIRE_YEAR__gte: 2018,
      FIRE_SIZE__gte: 0.1,
      DISCOVERY_DOY__gte: 185,
      DISCOVERY_TIME__gte: 1500,
      DISCOVERY_DATE__gte: queryDate,
      CONT_DATE__gte: queryDate,
      CONT_DOY__gte: 185,
      CONT_TIME__gte: 1500,
      STATE: "AZ",
      COUNTY: "Maricopa",
      Ecoregion_US_L3CODE: 81,
      Ecoregion_US_L4CODE: "81n",
      Ecoregion_NA_L3CODE: "10.2.2",
      Ecoregion_NA_L2CODE: "10.2",
      Ecoregion_NA_L1CODE: 10,
    };
    cy.request({
      method: "GET",
      url,
      qs,
    }).then((response) => {
      let returnedList = response.body;
      returnedList.forEach((obj) => {
        expect(obj.LATITUDE).to.not.be.null;
        expect(obj.LONGITUDE).to.not.be.null;
        expect(obj.FIRE_YEAR).to.be.gte(qs.FIRE_YEAR__gte);
        expect(Number(obj.FIRE_SIZE)).to.be.gte(Number(qs.FIRE_SIZE__gte));
        expect(obj.DISCOVERY_DOY).to.be.gte(qs.DISCOVERY_DOY__gte);
        expect(obj.DISCOVERY_TIME).to.be.gte(qs.DISCOVERY_TIME__gte);
        expect(new Date(obj.DISCOVERY_DATE).valueOf()).to.be.gte(
          new Date(queryDate).valueOf()
        );
        expect(new Date(obj.CONT_DATE).valueOf()).to.be.gte(
          new Date(queryDate).valueOf()
        );
        expect(obj.CONT_DOY).to.be.gte(qs.CONT_DOY__gte);
        expect(obj.CONT_TIME).to.be.gte(qs.CONT_TIME__gte);
        expect(obj.Ecoregion_US_L3CODE).to.be.eq(qs.Ecoregion_US_L3CODE);
        expect(obj.Ecoregion_US_L4CODE).to.be.eq(qs.Ecoregion_US_L4CODE);
        expect(obj.Ecoregion_NA_L2CODE).to.be.eq(qs.Ecoregion_NA_L2CODE);
        expect(obj.Ecoregion_NA_L1CODE).to.be.eq(qs.Ecoregion_NA_L1CODE);
        expect(obj.Ecoregion_NA_L3CODE).to.be.eq(qs.Ecoregion_NA_L3CODE);
      });
    });
  });

  it("Should return null values if not a 'default' value when no query params are provided", () => {
    cy.request({
      method: "GET",
      url,
    }).then((response) => {
      let returnedList = response.body;
      returnedList.forEach((obj) => {
        expect(obj.FIRE_YEAR).to.be.null;
        expect(obj.DISCOVERY_DOY).to.be.null;
        expect(obj.DISCOVERY_TIME).to.be.null;
        expect(obj.CONT_DOY).to.be.null;
        expect(obj.CONT_TIME).to.be.null;
        expect(obj.STATE).to.be.null;
        expect(obj.COUNTY).to.be.null;
        expect(obj.Ecoregion_US_L4CODE).to.be.null;
        expect(obj.Ecoregion_US_L3CODE).to.be.null;
        expect(obj.Ecoregion_NA_L3CODE).to.be.null;
        expect(obj.Ecoregion_NA_L2CODE).to.be.null;
        expect(obj.Ecoregion_NA_L1CODE).to.be.null;
      });
    });
  });

  // GTE, LTE, & range tests
  it("Should validate FIRE_SIZE GTE functionality", () => {
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

  it("Should validate FIRE_SIZE LTE functionality", () => {
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

  it("Should validate FIRE_SIZE range functionality", () => {
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

  it("Should validate FIRE_YEAR GTE functionality", () => {
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

  it("Should validate FIRE_YEAR LTE functionality", () => {
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

  it("Should validate FIRE_YEAR range functionality", () => {
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

  it("Should validate DISCOVERY_DOY GTE functionality", () => {
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

  it("Should validate DISCOVERY_DOY LTE functionality", () => {
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

  it("Should validate DISCOVERY_DOY range functionality", () => {
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

  it("Should validate DISCOVERY_TIME GTE functionality", () => {
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

  it("Should validate DISCOVERY_TIME LTE functionality", () => {
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

  it("Should validate DISCOVERY_TIME range functionality", () => {
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

  it("Should validate DISCOVERY_DATE GTE functionality", () => {
    let queryDate = "2018-07-05";
    cy.request({
      method: "GET",
      url,
      qs: {
        DISCOVERY_DATE__gte: queryDate,
      },
    }).then((response) => {
      let returnedList = response.body;
      returnedList.forEach((obj) => {
        var retDate = new Date(obj.DISCOVERY_DATE).valueOf();
        expect(retDate.valueOf()).to.be.gte(new Date(queryDate).valueOf());
      });
    });
  });

  it("Should validate DISCOVERY_DATE LTE functionality", () => {
    let queryDate = "2018-07-05";
    cy.request({
      method: "GET",
      url,
      qs: {
        DISCOVERY_DATE__lte: queryDate,
      },
    }).then((response) => {
      let returnedList = response.body;
      returnedList.forEach((obj) => {
        var retDate = new Date(obj.DISCOVERY_DATE).valueOf();
        expect(retDate.valueOf()).to.be.lte(new Date(queryDate).valueOf());
      });
    });
  });

  it("Should validate DISCOVERY_DATE range functionality", () => {
    let dateLow = "2018-07-05";
    let dateHigh = "2018-08-01";
    cy.request({
      method: "GET",
      url,
      qs: {
        DISCOVERY_DATE__range: `${dateLow}->${dateHigh}`,
      },
    }).then((response) => {
      let returnedList = response.body;
      returnedList.forEach((obj) => {
        var retDate = new Date(obj.DISCOVERY_DATE).valueOf();
        expect(retDate.valueOf()).to.be.within(
          new Date(dateLow).valueOf(),
          new Date(dateHigh).valueOf()
        );
      });
    });
  });

  it("Should validate CONT_DATE GTE functionality", () => {
    let queryDate = "2018-07-05";
    cy.request({
      method: "GET",
      url,
      qs: {
        CONT_DATE__gte: queryDate,
      },
    }).then((response) => {
      let returnedList = response.body;
      returnedList.forEach((obj) => {
        var retDate = new Date(obj.CONT_DATE.split(" ")[0]);
        expect(retDate.valueOf()).to.be.gte(new Date(queryDate).valueOf());
      });
    });
  });

  it("Should validate CONT_DATE LTE functionality", () => {
    let queryDate = "2018-07-05";
    cy.request({
      method: "GET",
      url,
      qs: {
        CONT_DATE__lte: queryDate,
      },
    }).then((response) => {
      let returnedList = response.body;
      returnedList.forEach((obj) => {
        var retDate = new Date(obj.CONT_DATE);
        expect(retDate.valueOf()).to.be.lte(new Date(queryDate).valueOf());
      });
    });
  });

  it("Should validate CONT_DATE range functionality", () => {
    let dateLow = "2018-07-05";
    let dateHigh = "2018-08-01";
    cy.request({
      method: "GET",
      url,
      qs: {
        CONT_DATE__range: `${dateLow}->${dateHigh}`,
      },
    }).then((response) => {
      let returnedList = response.body;
      returnedList.forEach((obj) => {
        var retDate = new Date(obj.CONT_DATE.split(" ")[0]);
        expect(retDate.valueOf()).to.be.within(
          new Date(dateLow).valueOf(),
          new Date(dateHigh).valueOf()
        );
      });
    });
  });

  it("Should validate CONT_DOY GTE functionality", () => {
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

  it("Should validate CONT_DOY LTE functionality", () => {
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

  it("Should validate CONT_DOY range functionality", () => {
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

  it("Should validate CONT_TIME GTE functionality", () => {
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

  it("Should validate CONT_TIME LTE functionality", () => {
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

  it("Should validate CONT_TIME range functionality", () => {
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
