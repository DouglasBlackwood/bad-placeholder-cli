#! /usr/bin/env node
var followRedirects = require("follow-redirects");
var http = followRedirects.http;
var https = followRedirects.https;
var fileSystem = require("fs");
var randomString = require("random-string");
var image = require("./Image");
var readline = require("readline");
/* Require Commander configuration */
var cliOptions = require("./commanderConfig");

// Counter of files downloaded
var downloadedFileCounter = 0;
// List of files downloaded
var downloadedFiles = [];

function pipeResponseToFile(response, fileStream) {
	response.pipe(fileStream);
}

function updateDownloadState(imageFileName) {
	downloadedFileCounter++;
	downloadedFiles.push(imageFileName);
}

function renderProgress() {
	var downloadProgress = Math.ceil(
		(downloadedFileCounter / cliOptions.number) * 100
	);

	readline.cursorTo(process.stdout, 0);
	process.stdout.write(
		"Downloaded " +
			downloadedFileCounter +
			" of " +
			cliOptions.number +
			". [" +
			downloadProgress +
			" %]"
	);
}

function handleDownloadCompletion(imageFileName) {
	updateDownloadState(imageFileName);
	renderProgress();

	if (downloadedFileCounter === cliOptions.number) {
		console.info(
			"\n" + cliOptions.number + " image(s) successfully downloaded"
		);
	}
}

function onFileStreamFinish(fileStream, imageFileName) {
	fileStream.close(function onClose() {
		handleDownloadCompletion(imageFileName);
	});
}

function onFileStreamError() {
	console.log("Failed");
}

function attachFileStreamEvents(fileStream, imageFileName) {
	fileStream.on("finish", function handleFinish() {
		onFileStreamFinish(fileStream, imageFileName);
	});

	fileStream.on("error", function handleError() {
		onFileStreamError();
	});
}

function handleResponse(response, fileStream, imageFileName) {
	pipeResponseToFile(response, fileStream);
	attachFileStreamEvents(fileStream, imageFileName);
}

var downloadPlaceHolder = (imageUrl, imageFileName) => {
	var fileStream = fileSystem.createWriteStream(imageFileName);

	if (imageUrl.substring(0, 7) === "http://") {
		http.get(imageUrl, function onHttpResponse(response) {
			handleResponse(response, fileStream, imageFileName);
		});
	} else {
		https.get(imageUrl, function onHttpsResponse(response) {
			handleResponse(response, fileStream, imageFileName);
		});
	}
};

followRedirects.maxRedirects = 10;

var generateRandomFileName = (fileNumber) =>
	"placeholder_" +
	cliOptions.size +
	"_" +
	randomString({ length: 4 }) +
	fileNumber +
	randomString({ length: 4 }) +
	".jpg";

for (i = 1; i <= cliOptions.number; i++) {
	downloadPlaceHolder(
		image.getImgUrl(cliOptions.size),
		generateRandomFileName(i)
	);
}
