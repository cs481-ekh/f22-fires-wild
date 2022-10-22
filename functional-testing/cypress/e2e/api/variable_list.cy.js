const url = "localhost:8000/api/variable_list/";

const variables = [
	"FIRE_YEAR",
	"DISCOVERY_DATE",
	"DISCOVERY_DOY",
	"DISCOVERY_TIME",
	"CONT_DATE",
	"CONT_DOY",
	"CONT_TIME",
	"STATE",
	"COUNTY",
	"Ecoregion_US_L4CODE",
	"Ecoregion_US_L3CODE",
	"Ecoregion_NA_L3CODE",
	"Ecoregion_NA_L2CODE",
	"Ecoregion_NA_L1CODE"
	];

describe("variable_list.cy.js", () => {
	it("should be visitable", () => {
		cy.visit(url);
	})
	it("serializer should match list given", () => {
		cy.request({
			method: "GET",
			url,
		}).then((response) => {
			let variable_list = response.body;
			for(const [key, value] of Object.entries(variable_list)){
				expect(key).to.be.oneOf(variables);
			}
		})
	})
	it("variable name should not be null", () => {
		cy.request({
			method: "GET",
			url,
		}).then((response) => {
			let variable_list = response.body;
			for(const [key, value] of Object.entries(variable_list)){
				expect(key).to.not.be.null;
			}
		})
	})
	it("description should not be null", () => {
		cy.request({
			method: "GET",
			url,
		}).then((response) => {
			let variable_list = response.body;
			for(const [key, value] of Object.entries(variable_list)){
				expect(value).to.not.be.null;
			}
		})
	})
	it("variable name should be string", () => {
		cy.request({
			method: "GET",
			url,
		}).then((response) => {
			let variable_list = response.body;
			for(const [key, value] of Object.entries(variable_list)){
				expect(key).to.be.a("string");
			}
		})
	})
	it("variable description should be string", () => {
		cy.request({
			method: "GET",
			url,
		}).then((response) => {
			let variable_list = response.body;
			for(const [key, value] of Object.entries(variable_list)){
				expect(value).to.be.a("string");
			}
		})
	})
})

	
