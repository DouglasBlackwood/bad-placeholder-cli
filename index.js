#! /usr/bin/env node
var followRedirect = require("follow-redirects");
var http = followRedirect.http;
var https = followRedirect.https;
var fs = require("fs");
var randomString = require("random-string");
var image = require("./Image");
var readline = require("readline");
/* Require Commander configuration */
var commanderConfig = require("./commanderConfig");
// Counter of files downloaded
var downloadedFilesCount = 0;
// List of files downloaded
var downloadedFiles = [];

function calculatePercentage(number, total) {
	return Math.ceil((number / total) * 100);
}

function writeHttpResponseInStream(httpResponse, fileName) {
	var writeStream = fs.createWriteStream(fileName);
	httpResponse.pipe(writeStream);
	writeStream.on("finish", () => {
		writeStream.close(() => {
			downloadedFilesCount++;
			downloadedFiles.push(fileName);
			var downloadPercentage = calculatePercentage(
				downloadedFilesCount,
				commanderConfig.number,
			);
			readline.cursorTo(process.stdout, 0);
			process.stdout.write(
				"Downloaded " +
					downloadedFilesCount +
					" of " +
					commanderConfig.number +
					". [" +
					downloadPercentage +
					" %]",
			);
			if (downloadedFilesCount === commanderConfig.number) {
				console.info(
					"\n" + commanderConfig.number + " image(s) successfully downloaded",
				);
			}
		});
	});
	writeStream.on("error", () => {
		console.log("Failed");
	});
}
// Download an image
function downloadImage(url, fileName) {
	if (isHttp(url)) {
		http.get(url, (httpResponse) => {
			writeHttpResponseInStream(httpResponse, fileName);
		});
	} else {
		https.get(url, (httpResponse) => {
			writeHttpResponseInStream(httpResponse, fileName);
		});
	}
}
function isHttp(url) {
	return url.startsWith("http://");
}
followRedirect.maxRedirects = 10;

// Generate a randome file name
function generateRandomFileName(fileNumber) {
	return (
		"placeholder_" +
		commanderConfig.size +
		"_" +
		randomString({ length: 4 }) +
		fileNumber +
		randomString({ length: 4 }) +
		".jpg"
	);
}

for (i = 1; i <= commanderConfig.number; i++) {
	downloadImage(
		image.getImageUrl(commanderConfig.size),
		generateRandomFileName(i),
	);
}
