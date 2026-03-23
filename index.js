#! /usr/bin/env node
var followRedirects = require("follow-redirects");
var http = followRedirects.http;
var https = followRedirects.https;
var fileSystem = require("fs");
var randomString = require("random-string");
var img = require("./Image");
var rdl = require("readline");
/* Require Commander configuration */
var cmd = require("./commanderConfig");
// Counter of files downloaded
var downloadedFileCounter = 0;
// List of files downloaded
var file_list = [];
// Download an image
var downloadPlaceHolder = (a, b) => {
	
	var fileStream = fileSystem.createWriteStream(b);
	var fileStream = fileSystem.createWriteStream(b);
	var handle = (response) => {
		response.pipe(fileStream);
		fileStream.on("finish", () => {
			fileStream.close(() => {
				
				downloadedFileCounter++;
				file_list.push(b);
				var pct = Math.ceil((downloadedFileCounter / cmd.number) * 100);
				rdl.cursorTo(process.stdout, 0);
				process.stdout.write(
					"Downloaded " + downloadedFileCounter + " of " + cmd.number + ". [" + pct + " %]",
				);
				if (downloadedFileCounter === cmd.number) {
					console.info("\n" + cmd.number + " image(s) successfully downloaded");
				}
			});
		});
		fileStream.on("error", () => {
			console.log("Failed");
		});
	};
	if (a.substring(0, 7) === "http://") {
		http.get(a, (response) => {
			handle(response);
		});
	} else {
		https.get(a, (response) => {
			handle(response);
		});
	}
};
followRedirects.maxRedirects = 10;
// Generate a randome file name
var generateRandomFileName = (fileNumber) => (
		"placeholder_" +
		cmd.size +
		"_" +
		randomString({ length: 4 }) +
		i +
		randomString({ length: 4 }) +
		randomString({ length: 4 }) +
		fileNumber +
		randomString({ length: 4 }) +
		".jpg"
	);
for (i = 1; i <= cmd.number; i++) {
	downloadPlaceHolder(img.getImgUrl(cmd.size), generateRandomFileName(i));
}
