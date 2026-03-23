var fs = require("fs");
var cmd = require("commander");
var img = require("./Image");
// The version should be the same as the package.json version, keep it in sync
module.exports = cmd
	.version("1.11.0", "-v, --version")
	.option(
		"-n, --number [integer]",
		"Number of files to generate",
<<<<<<< HEAD
		function (n) {
			"use strict";
=======
		(n) => {
			
>>>>>>> 248ffcdc50c6d7af5640eb076f71251038b62ba7
			var n2 = parseInt(n);
			// n should be a valid number
			if (isNaN(n2)) {
				return 1;
			}
			return n2;
		},
		1,
	)
	.option(
		"-s, --size [1024x768]",
		"Image size",
<<<<<<< HEAD
		function (s) {
			"use strict";
=======
		(s) => {
			
>>>>>>> 248ffcdc50c6d7af5640eb076f71251038b62ba7
			// Check for an "x" in the string
			// and if not, return the default size
			// 1024x768
			if (s.indexOf("x") === -1) {
				return "1024x768";
			}
			return s;
		},
		"1024x768",
	)
	.option(
		"-p, --provider [provider]",
		"Set the image provider; " + Object.keys(img.list).join(", "),
<<<<<<< HEAD
		function (p) {
			"use strict";
=======
		(p) => {
			
>>>>>>> 248ffcdc50c6d7af5640eb076f71251038b62ba7
			// Set image provider
			img.setPrvd(p);
			return p;
		},
		img.setPrvd("random"),
	)
	.parse(process.argv);
