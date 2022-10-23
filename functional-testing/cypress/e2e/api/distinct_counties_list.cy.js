let url = "localhost:8000/distinct_counties_list/";

const possible_states = [
	'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC','FL', 'GA', 'HI',
	'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD','MA','MI', 'MN', 
	'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'CM', 
	'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT','VT', 'VA',
	'WA', 'WV', 'WI', 'WY'
	]
	
describe("distinct_counties_list.cy.js", () => {
	it("should be visitable", () => {
		cy.visit(url);
	})	
	it("should be visitable via STATE query string", () => {
		possible_states.forEach((obj) => {
			cy.visit(url.concat("?STATE=", obj));
		})
	})
	it("COUNTY should not be null for each STATE", () => {
		possible_states.forEach((state) => {
			url = url.concat("?STATE=", state)
			cy.request({
				method: "GET",
				url,
			}).then((response) => {
				let distinct_counties = response.body;
				distinct_counties.forEach((county) => {
					expect(county).to.not.be.null;
				})
			})
		})
	})
	it("COUNTY should not be named null for each STATE", () => {
		possible_states.forEach((state) => {
			url = url.concat("?STATE=", state)
			cy.request({
				method: "GET",
				url,
			}).then((response) => {
				let distinct_counties = response.body;
				distinct_counties.forEach((county) => {
					expect(county.toLowerCase()).to.not.eql("null");
				})
			})
		})
	})
	it("COUNTY should not be named none for each STATE", () => {
		possible_states.forEach((state) => {
			url = url.concat("?STATE=", state)
			cy.request({
				method: "GET",
				url,
			}).then((response) => {
				let distinct_counties = response.body;
				distinct_counties.forEach((county) => {
					expect(county.toLowerCase()).to.not.eql("none");
				})
			})
		})
	})
	it("COUNTY should not be empty for each STATE", () => {
		possible_states.forEach((state) => {
			url = url.concat("?STATE=", state)
			cy.request({
				method: "GET",
				url,
			}).then((response) => {
				let distinct_counties = response.body;
				distinct_counties.forEach((county) => {
					expect(county).to.not.be.empty;
				})
			})
		})
	})
	it("COUNTY - each option should be unique for each STATE (case-sensitive)", () => {
		possible_states.forEach((state) => {
			url = url.concat("?STATE=", state)
			cy.request({
				method: "GET",
				url,
			}).then((response) => {
				let distinct_counties = response.body;
				distinct_counties.forEach((county) => {
					expect(Cypress._.uniq(county.toLowerCase()));
				})
			})
		})
	})
	it("COUNTY name should be string", () => {
		possible_states.forEach((state) => {
			url = url.concat("?STATE=", state)
			cy.request({
				method: "GET",
				url,
			}).then((response) => {
				let distinct_counties = response.body;
				distinct_counties.forEach((county) => {
					expect(county).to.match(/[\s\S]*/);
				})
			})
		})
	})
})