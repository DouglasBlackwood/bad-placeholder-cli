#! /usr/bin/env node
const followRedirects = require("follow-redirects");
const http = followRedirects.http;
const https = followRedirects.https;
const fileSystem = require("fs");
const randomString = require("random-string");
const image = require("./Image");
const readline = require("readline");
const cliOptions = require("./commanderConfig");

followRedirects.maxRedirects = 10;

let downloadedFileCounter = 0;
const downloadedFiles = [];

function printProgress() {
	const pct = Math.ceil((downloadedFileCounter / cliOptions.number) * 100);
	readline.cursorTo(process.stdout, 0);
	process.stdout.write(
		`Downloaded ${downloadedFileCounter} of ${cliOptions.number}. [${pct} %]`,
	);

	if (downloadedFileCounter === cliOptions.number) {
		console.info(`\n${cliOptions.number} image(s) successfully downloaded`);
	}
}

function handleResponse(response, fileStream, b) {
	response.pipe(fileStream);

	fileStream.on("finish", () => {
		fileStream.close(() => {
			downloadedFileCounter++;
			downloadedFiles.push(b);
			printProgress();
		});
	});

	fileStream.on("error", (err) => {
		console.error(`Failed to write ${b}: ${err.message}`);
	});
}

function downloadPlaceHolder(a, b) {
	const fileStream = fileSystem.createWriteStream(b);
	const protocol = a.startsWith("http://") ? http : https;

	protocol.get(a, (response) => {
		handleResponse(response, fileStream, b);
	}).on("error", (err) => {
		console.error(`Failed to download ${a}: ${err.message}`);
	});
}

function generateRandomFileName(fileNumber) {
	return `placeholder_${cliOptions.size}_${randomString({ length: 4 })}${fileNumber}${randomString({ length: 4 })}.jpg`;
}

for (let i = 1; i <= cliOptions.number; i++) {
	downloadPlaceHolder(image.getImgUrl(cliOptions.size), generateRandomFileName(i));
}
