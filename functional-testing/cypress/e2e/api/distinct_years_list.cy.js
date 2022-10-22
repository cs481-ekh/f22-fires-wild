const url = "localhost:8000/api/distinct_years_list/";

describe("distinct_years_list.cy.js", () => {	
	it("should be visitable", () => {
		cy.visit(url);
	})	
	it("FIRE_YEAR should not be null", () => {
		cy.request({
			method: "GET",
			url,
		}).then((response) => {
			let distinct_years = response.body;
			distinct_years.forEach((obj) => {
				expect(obj).to.not.be.null;
			})
		})
	})
	it("FIRE_YEAR should not be named null", () => {
		cy.request({
			method: "GET",
			url,
		}).then((response) => {
			let distinct_years = response.body;
			distinct_years.forEach((obj) => {
				expect(obj.toLowerCase()).to.not.eql("null");
			})
		})
	})
	it("FIRE_YEAR should not be named none", () => {
		cy.request({
			method: "GET",
			url,
		}).then((response) => {
			let distinct_years = response.body;
			distinct_years.forEach((obj) => {
				expect(obj.toLowerCase()).to.not.eql("none");
			})
		})
	})
	it("FIRE_YEAR should not be empty", () => {
		cy.request({
			method: "GET",
			url,
		}).then((response) => {
			let distinct_years = response.body;
			distinct_years.forEach((obj) => {
				expect(obj).to.not.be.empty;
			})
		})
	})
	it("FIRE_YEAR should be greater at least 1992", () => {
		cy.request({
			method: "GET",
			url,
		}).then((response) => {
			let distinct_years = response.body;
			distinct_years.forEach((obj) => {
				expect(Number(obj)).to.be.least(1992);
			})
		})
	})
	it("FIRE_YEAR should be at most 2022", () => {
		cy.request({
			method: "GET",
			url,
		}).then((response) => {
			let distinct_years = response.body;
			distinct_years.forEach((obj) => {
				expect(Number(obj)).to.be.most(2022);
			})
		})
	})
	it("FIRE_YEAR should be castable to a number", () => {
		cy.request({
			method: "GET",
			url,
		}).then((response) => {
			let distinct_years = response.body;
			distinct_years.forEach((obj) => {
				expect(Number(obj)).to.match(/[\d]*/);
			})
		})
	})
	it("FIRE_YEAR - each option should be unique", () => {
		cy.request({
			method: "GET",
			url,
		}).then((response) => {
			let distinct_years = response.body;
			distinct_years.forEach((obj) => {
				expect(Cypress._.uniq(obj));
			})
		})
	})
})