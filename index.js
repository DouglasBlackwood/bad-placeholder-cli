#! /usr/bin/env node
var followRedirects = require("follow-redirects");
var http = followRedirects.http;
var https = followRedirects.https;
var fileSystem = require("fs");
var randomString = require("random-string");
var image = require("./Image");
var readline = require("readline");
/* Require Commander configuration */
var cliOption = require("./commanderConfig");
// Counter of files downloaded
var downloadedFileCounter = 0;
// List of files downloaded
var file_list = [];
// Download an image
var downloadPlaceHolder = (imageUrl, imageFileName) => {
	
	var fileStream = fileSystem.createWriteStream(imageFileName);
	var handle = (response) => {
		response.pipe(fileStream);
		fileStream.on("finish", () => {
			fileStream.close(() => {
				
				downloadedFileCounter++;
				file_list.push(imageFileName);
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
	if (imageUrl.substring(0, 7) === "http://") {
		http.get(imageUrl, (response) => {
			handle(response);
		});
	} else {
		https.get(imageUrl, (response) => {
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
		randomString({ length: 4 }) +
		fileNumber +
		randomString({ length: 4 }) +
		".jpg"
	);
for (i = 1; i <= cliOption.number; i++) {
	downloadPlaceHolder(image.getImgUrl(cliOption.size), generateRandomFileName(i));
}
