#! /usr/bin/env node
const followRedirect = require("follow-redirects");
const http = followRedirect.http;
const https = followRedirect.https;
const fs = require("node:fs");
const randomString = require("random-string");
const image = require("./Image");
const readline = require("node:readline");
/* Require Commander configuration */
const commanderConfig = require("./commanderConfig");
// Counter of files downloaded
let downloadedFilesCount = 0;
// List of files downloaded
const downloadedFiles = [];

function calculatePercentage(number, total) {
	return Math.ceil((number / total) * 100);
}

function writeHttpResponseInStream(httpResponse, fileName) {
	const writeStream = fs.createWriteStream(fileName);
	httpResponse.pipe(writeStream);
	writeStream.on("finish", () => {
		writeStream.close(() => {
			downloadedFilesCount++;
			downloadedFiles.push(fileName);
			const downloadPercentage = calculatePercentage(
				downloadedFilesCount,
				commanderConfig.number,
			);
			readline.cursorTo(process.stdout, 0);
			process.stdout.write(
				`Downloaded ${downloadedFilesCount} of ${commanderConfig.number}. [${downloadPercentage} %]`,
			);
			if (downloadedFilesCount === commanderConfig.number) {
				console.info(
					`\n${commanderConfig.number} image(s) successfully downloaded`,
				);
			}
		});
	});
	writeStream.on("error", () => {
		console.log("Failed");
	});
}
// Download an image
async function downloadImage(url, fileName) {
	if (isHttp(url)) {
		await http.get(url, (httpResponse) => {
			writeHttpResponseInStream(httpResponse, fileName);
		});
	} else {
		await https.get(url, (httpResponse) => {
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
	return `placeholder_${commanderConfig.size}_${randomString({ length: 4 })}${fileNumber}${randomString({ length: 4 })}.jpg`;
}

for (i = 1; i <= commanderConfig.number; i++) {
	downloadImage(
		image.getImageUrl(commanderConfig.size),
		generateRandomFileName(i),
	);
}
