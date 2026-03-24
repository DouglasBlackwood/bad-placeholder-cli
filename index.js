#! /usr/bin/env node
const fr = require("follow-redirects");
const http = fr.http;
const https = fr.https;
const fs = require("fs");
const rdm = require("random-string");
const img = require("./Image");
const rdl = require("readline");
const cmd = require("./commanderConfig");

fr.maxRedirects = 10;

let downloadedFileCounter = 0;
const file_list = [];

function printProgress() {
	const pct = Math.ceil((downloadedFileCounter / cmd.number) * 100);
	rdl.cursorTo(process.stdout, 0);
	process.stdout.write(
		`Downloaded ${downloadedFileCounter} of ${cmd.number}. [${pct} %]`,
	);

	if (downloadedFileCounter === cmd.number) {
		console.info(`\n${cmd.number} image(s) successfully downloaded`);
	}
}

function handleResponse(response, fileStream, b) {
	response.pipe(fileStream);

	fileStream.on("finish", () => {
		fileStream.close(() => {
			downloadedFileCounter++;
			file_list.push(b);
			printProgress();
		});
	});

	fileStream.on("error", (err) => {
		console.error(`Failed to write ${b}: ${err.message}`);
	});
}

function downloadPlaceHolder(a, b) {
	const fileStream = fs.createWriteStream(b);
	const protocol = a.startsWith("http://") ? http : https;

	protocol.get(a, (response) => {
		handleResponse(response, fileStream, b);
	}).on("error", (err) => {
		console.error(`Failed to download ${a}: ${err.message}`);
	});
}

function generateRandomFileName(fileNumber) {
	return `placeholder_${cmd.size}_${rdm({ length: 4 })}${fileNumber}${rdm({ length: 4 })}.jpg`;
}

for (let i = 1; i <= cmd.number; i++) {
	downloadPlaceHolder(img.getImgUrl(cmd.size), generateRandomFileName(i));
}
