var chai = require("chai");
var expect = require("chai").expect;
var execa = require("execa");
var helpers = require("./helpers");

<<<<<<< HEAD
describe("bad-placeholder -n 3", function () {
	"use strict";

	before(function (done) {
		helpers.deletePlaceholders().then(function (response) {
=======
describe("bad-placeholder -n 3", () => {
	

	before((done) => {
		helpers.deletePlaceholders().then((response) => {
>>>>>>> 248ffcdc50c6d7af5640eb076f71251038b62ba7
			done();
		});
	});

	var result;

<<<<<<< HEAD
	before(function (done) {
		execa
			.shell("node ./index.js -n 3")
			.then(function (response) {
				result = response.stdout;
				done();
			})
			.catch(function (error) {
=======
	before((done) => {
		execa
			.shell("node ./index.js -n 3")
			.then((response) => {
				result = response.stdout;
				done();
			})
			.catch((error) => {
>>>>>>> 248ffcdc50c6d7af5640eb076f71251038b62ba7
				console.log(error);
				done();
			});
	});

<<<<<<< HEAD
	it("should generate three images", function () {
		expect(helpers.getPlaceholders().length).to.be.equal(3);
	});

	it("should have default dimensions", function () {
=======
	it("should generate three images", () => {
		expect(helpers.getPlaceholders().length).to.be.equal(3);
	});

	it("should have default dimensions", () => {
>>>>>>> 248ffcdc50c6d7af5640eb076f71251038b62ba7
		var dimensions = helpers.getDimensions(
			helpers.getPlaceholders()[Math.floor(Math.random() * 2) + 0],
		);
		expect(dimensions).to.be.equal("1024x768");
	});
});

<<<<<<< HEAD
describe("bad-placeholder -s 100x100", function () {
	"use strict";

	before(function (done) {
		helpers.deletePlaceholders().then(function (response) {
=======
describe("bad-placeholder -s 100x100", () => {
	

	before((done) => {
		helpers.deletePlaceholders().then((response) => {
>>>>>>> 248ffcdc50c6d7af5640eb076f71251038b62ba7
			done();
		});
	});

	var result;

<<<<<<< HEAD
	before(function (done) {
		execa
			.shell("node ./index.js -s 100x100")
			.then(function (response) {
				result = response.stdout;
				done();
			})
			.catch(function (error) {
=======
	before((done) => {
		execa
			.shell("node ./index.js -s 100x100")
			.then((response) => {
				result = response.stdout;
				done();
			})
			.catch((error) => {
>>>>>>> 248ffcdc50c6d7af5640eb076f71251038b62ba7
				console.log(error);
				done();
			});
	});

<<<<<<< HEAD
	it("should generate one image", function () {
		expect(helpers.getPlaceholders().length).to.be.equal(1);
	});

	it("should be 100x100", function () {
=======
	it("should generate one image", () => {
		expect(helpers.getPlaceholders().length).to.be.equal(1);
	});

	it("should be 100x100", () => {
>>>>>>> 248ffcdc50c6d7af5640eb076f71251038b62ba7
		var dimensions = helpers.getDimensions(helpers.getPlaceholders()[0]);
		expect(dimensions).to.be.equal("100x100");
	});
});

for (const provider of ["DummyImage", "LoremPicsum", "PlaceBear"]) {
	("use strict");

<<<<<<< HEAD
	describe("bad-placeholder -p " + provider, function () {
		"use strict";

		before(function (done) {
			helpers.deletePlaceholders().then(function (response) {
=======
	describe("bad-placeholder -p " + provider, () => {
		

		before((done) => {
			helpers.deletePlaceholders().then((response) => {
>>>>>>> 248ffcdc50c6d7af5640eb076f71251038b62ba7
				done();
			});
		});

		var result;

<<<<<<< HEAD
		before(function (done) {
			execa
				.shell("node ./index.js -p " + provider)
				.then(function (response) {
					result = response.stdout;
					done();
				})
				.catch(function (error) {
=======
		before((done) => {
			execa
				.shell("node ./index.js -p " + provider)
				.then((response) => {
					result = response.stdout;
					done();
				})
				.catch((error) => {
>>>>>>> 248ffcdc50c6d7af5640eb076f71251038b62ba7
					console.log(error);
					done();
				});
		});

		it(
			"should generate one image from specified provider (" + provider + ")",
<<<<<<< HEAD
			function () {
=======
			() => {
>>>>>>> 248ffcdc50c6d7af5640eb076f71251038b62ba7
				expect(helpers.getPlaceholders().length).to.be.equal(1);
			},
		);

<<<<<<< HEAD
		it("should have default dimensions", function () {
=======
		it("should have default dimensions", () => {
>>>>>>> 248ffcdc50c6d7af5640eb076f71251038b62ba7
			var dimensions = helpers.getDimensions(helpers.getPlaceholders()[0]);
			expect(dimensions).to.be.equal("1024x768");
		});

<<<<<<< HEAD
		after(function (done) {
			helpers.deletePlaceholders().then(function (response) {
=======
		after((done) => {
			helpers.deletePlaceholders().then((response) => {
>>>>>>> 248ffcdc50c6d7af5640eb076f71251038b62ba7
				done();
			});
		});
	});
}
