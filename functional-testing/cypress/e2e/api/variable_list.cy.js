const url = "localhost:8000/variable_list/";
	
    const data = { 
        'FIRE_YEAR' : 'Calendar year in which the fire was discovered or confirmed to exist',
        'DISCOVERY_DATE' : 'Date on which the fire was discovered or confirmed to exist',
        'DISCOVERY_DOY' : 'Day of year on which the fire was discovered or confirmed to exist',
        'DISCOVERY_TIME' : 'Time of day that the fire was discovered or confirmed to exist',
        'CONT_DATE' : 'Date on which the fire was declared contained or otherwise controlled (mm/dd/yyyy where mm=month, dd=day, and yyyy=year)',
        'CONT_DOY' : 'Day of year on which the fire was declared contained or otherwise controlled',
        'CONT_TIME' : 'Time of day that the fire was declared contained or otherwise controlled (hhmm where hh=hour, mm=minutes)',
        'STATE' : 'Two-letter alphabetic code for the state in which the fire burned (or originated), based on the nominal designation in the fire report',
        'COUNTY' : 'County, or equivalent, in which the fire burned (or originated), based on nominal designation in the fire report',
        'Ecoregion_US_L4CODE' : 'Ecoregion level 4 code in the US',
        'Ecoregion_US_L3CODE' : 'Ecoregion level 3 code in the US',
        'Ecoregion_NA_L3CODE' : 'Ecoregion level 3 code in the North America',
        'Ecoregion_NA_L2CODE' : 'Ecoregion level 2 code in the North America',
        'Ecoregion_NA_L1CODE' : 'Ecoregion level 1 code in the North America',
    };


describe("variable_list.cy.js", () => {
	it("should be visitable", () => {
		cy.visit(url);
	})
	it("serializer key should match list given", () => {
		cy.request({
			method: "GET",
			url,
		}).then((response) => {
			let variable_list = response.body;
			for(const [key, value] of Object.entries(variable_list)){
				expect(key).to.be.oneOf(Object.keys(data));
			}
		})
	})
	it("serializer descriptions should match list given", () => {
		cy.request({
			method: "GET",
			url,
		}).then((response) => {
			let variable_list = response.body;
			for(const [key, value] of Object.entries(variable_list)){
				expect(value).to.be.oneOf(Object.values(data));
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

	
