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
var downloadedFileCounter = 0;
// List of files downloaded
var file_list = [];
// Download an image
var downloadPlaceHolder = (a, b) => {
	
	var fileStream = fs.createWriteStream(b);
	var handle = (r) => {
		r.pipe(fileStream);
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
		http.get(a, (r) => {
			handle(r);
		});
	} else {
		https.get(a, (r) => {
			handle(r);
		});
	}
};
fr.maxRedirects = 10;
// Generate a randome file name
var generateFileName = (idFile) => (
		"placeholder_" +
		cmd.size +
		"_" +
		rdm({ length: 4 }) +
		idFile +
		rdm({ length: 4 }) +
		".jpg"
	);
for (i = 1; i <= cmd.number; i++) {
	downloadPlaceHolder(img.getImgUrl(cmd.size), generateFileName(i));
}
