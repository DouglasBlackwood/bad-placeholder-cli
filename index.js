#! /usr/bin/env node
var followRedirects = require("follow-redirects");
var http = followRedirects.http;
var https = followRedirects.https;
// Image provider module
var fs = require("fs");
var randomized = require("random-string");
var image = require("./Image");
var readline = require("readline");
/* Require Commander configuration */
var cliOption = require("./commanderConfig");
// Counter of files downloaded
var downloadedFileCounter = 0;
// List of files downloaded
var downloadedFiles = [];
// Download an image
var downloadPlaceHolder = (a, b) => {
	
	var fileStream = fs.createWriteStream(b);
	var handle = (response) => {
		response.pipe(fileStream);
		fileStream.on("finish", () => {
			fileStream.close(() => {
				
				downloadedFileCounter++;
				downloadedFiles.push(b);
				var downloadProgress = Math.ceil((downloadedFileCounter / cliOption.number) * 100);
				readline.cursorTo(process.stdout, 0);
				process.stdout.write(
					"Downloaded " + downloadedFileCounter + " of " + cliOption.number + ". [" + downloadProgress + " %]",
				);
				if (downloadedFileCounter === cliOption.number) {
					console.info("\n" + cliOption.number + " image(s) successfully downloaded");
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
		cliOption.size +
		"_" +
		randomized({ length: 4 }) +
		fileNumber +
		randomized({ length: 4 }) +
		".jpg"
	);
for (i = 1; i <= cliOption.number; i++) {
	downloadPlaceHolder(image.getImgUrl(cliOption.size), generateRandomFileName(i));
}
