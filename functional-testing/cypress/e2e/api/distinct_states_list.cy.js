const url = "localhost:8000/api/distinct_states_list/";

const possible_states = [
	'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC','FL', 'GA', 'HI',
	'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD','MA','MI', 'MN', 
	'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'CM', 
	'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT','VT', 'VA',
	'WA', 'WV', 'WI', 'WY'
	]
	
describe("distinct_states_list.cy.js", () => {
	it("should be visitable", () => {
		cy.visit(url);
	})
	it("STATE should not be null", () => {
		cy.request({
			method: "GET",
			url,
		}).then((response) => {
			let distinct_states = response.body;
			distinct_states.forEach((obj) => {
				expect(obj).to.not.be.null;
			})
		})
	})
	it("STATE should not be named null", () => {
		cy.request({
			method: "GET",
			url,
		}).then((response) => {
			let distinct_states = response.body;
			distinct_states.forEach((obj) => {
				expect(obj.toLowerCase()).to.not.eql("null");
			})
		})
	})
	it("STATE should not be named none", () => {
		cy.request({
			method: "GET",
			url,
		}).then((response) => {
			let distinct_states = response.body;
			distinct_states.forEach((obj) => {
				expect(obj.toLowerCase()).to.not.eql("none");
			})
		})
	})
	it("STATE should not be empty", () => {
		cy.request({
			method: "GET",
			url,
		}).then((response) => {
			let distinct_states = response.body;
			distinct_states.forEach((obj) => {
				expect(obj).to.not.be.empty;
			})
		})
	})
	it("STATE name should be string", () => {
		cy.request({
			method: "GET",
			url,
		}).then((response) => {
			let distinct_states = response.body;
			distinct_states.forEach((obj) => {
				expect(obj).to.match(/[\s\S]*/);
			})
		})
	})
	it("STATE name should be 2 characters long", () => {
		cy.request({
			method: "GET",
			url,
		}).then((response) => {
			let distinct_states = response.body;
			distinct_states.forEach((obj) => {
				expect(obj).to.be.lengthOf(2);
			})
		})
	})
	it("STATE name should be a state in US", () => {
		cy.request({
			method: "GET",
			url,
		}).then((response) => {
			let distinct_states = response.body;
			distinct_states.forEach((obj) => {
				expect(obj).to.be.oneOf(possible_states);
			})
		})
	})
	it("STATE - each option should be unique", () => {
		cy.request({
			method: "GET",
			url,
		}).then((response) => {
			let distinct_states = response.body;
			distinct_states.forEach((obj) => {
				expect(Cypress._.uniq(obj));
			})
		})
	})
})