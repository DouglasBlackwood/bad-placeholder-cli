#! /usr/bin/env node
var fr = require("follow-redirects");
var http = fr.http;
var https = fr.https;
var fs = require("fs");
var rdm = require("random-string");
var img = require("./Image");
var rdl = require("readline");
/* Require Commander configuration */
var cmd = require("./commanderConfig");
// Counter of files downloaded
var c = 0;
// List of files downloaded
var file_list = [];
// Download an image
<<<<<<< HEAD
var dl = function (a, b) {
	"use strict";
	var f = fs.createWriteStream(b);
	var handle = function (r) {
		r.pipe(f);
		f.on("finish", function () {
			f.close(function () {
				"use strict";
=======
var dl = (a, b) => {
	
	var f = fs.createWriteStream(b);
	var handle = (r) => {
		r.pipe(f);
		f.on("finish", () => {
			f.close(() => {
				
>>>>>>> 248ffcdc50c6d7af5640eb076f71251038b62ba7
				c++;
				file_list.push(b);
				var pct = Math.ceil((c / cmd.number) * 100);
				rdl.cursorTo(process.stdout, 0);
				process.stdout.write(
					"Downloaded " + c + " of " + cmd.number + ". [" + pct + " %]",
				);
				if (c === cmd.number) {
					console.info("\n" + cmd.number + " image(s) successfully downloaded");
				}
			});
		});
<<<<<<< HEAD
		f.on("error", function () {
=======
		f.on("error", () => {
>>>>>>> 248ffcdc50c6d7af5640eb076f71251038b62ba7
			console.log("Failed");
		});
	};
	if (a.substring(0, 7) === "http://") {
<<<<<<< HEAD
		http.get(a, function (r) {
			handle(r);
		});
	} else {
		https.get(a, function (r) {
=======
		http.get(a, (r) => {
			handle(r);
		});
	} else {
		https.get(a, (r) => {
>>>>>>> 248ffcdc50c6d7af5640eb076f71251038b62ba7
			handle(r);
		});
	}
};
fr.maxRedirects = 10;
// Generate a randome file name
<<<<<<< HEAD
var genfname = function (i) {
	"use strict";
	return (
=======
var genfname = (i) => (
>>>>>>> 248ffcdc50c6d7af5640eb076f71251038b62ba7
		"placeholder_" +
		cmd.size +
		"_" +
		rdm({ length: 4 }) +
		i +
		rdm({ length: 4 }) +
		".jpg"
	);
<<<<<<< HEAD
};
=======
>>>>>>> 248ffcdc50c6d7af5640eb076f71251038b62ba7
for (i = 1; i <= cmd.number; i++) {
	dl(img.getImgUrl(cmd.size), genfname(i));
}
