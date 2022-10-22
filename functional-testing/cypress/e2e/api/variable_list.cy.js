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
	it("should visit", () => {
		cy.visit(url);
	})
	it("serializer should match list given", () => {
		cy.request({
			method: "GET",
			url,
		}).then((response) => {
			let variable_list = response.body;
			let key_index = 0;
			for(const [key, value] of Object.entries(variable_list)){
				expect(key).to.equal(variables[key_index]);
				key_index++;
			}
		})
	})
	it("Variable name should not be null", () => {
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
})
