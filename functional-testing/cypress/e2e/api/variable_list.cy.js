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

describe("Proof of concept test for variable list.", () => {
	it.skip("Should validate correct variables in variable_list API.", () => {
		cy.request({
			method: "GET",
			url,
		}).then((response) => {
			let variable_list = response.body;
			key_index = 0;
			for(const [key, value] of Object.entries(variable_list)){
				expect(key).to.equal(variables[i]);
				key_index++;
			}
		});
	});
)};
