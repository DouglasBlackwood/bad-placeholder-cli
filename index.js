#! /usr/bin/env node
var fr = require("follow-redirects");
var http = fr.http;
var https = fr.https;
var fs = require("fs");
var randomString = require("random-string");
var image = require("./Image");
var readline = require("readline");
/* Require Commander configuration */
var cliOptions = require("./commanderConfig");
// Counter of files downloaded
var downloadedFileCounter = 0;
// List of files downloaded
var file_list = [];
// Download an image
var downloadPlaceHolder = (a, b) => {
  var f = fs.createWriteStream(b);
  var handle = (r) => {
    r.pipe(f);
    f.on("finish", () => {
      f.close(() => {
        downloadedFileCounter++;
        file_list.push(b);
        var pct = Math.ceil((downloadedFileCounter / cliOptions.number) * 100);
        readline.cursorTo(process.stdout, 0);
        process.stdout.write(
          "Downloaded " +
            downloadedFileCounter +
            " of " +
            cliOptions.number +
            ". [" +
            pct +
            " %]",
        );
        if (downloadedFileCounter === cliOptions.number) {
          console.info(
            "\n" + cliOptions.number + " image(s) successfully downloaded",
          );
        }
      });
    });
    f.on("error", () => {
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
// Generate a random file name
var genfname = (i) =>
  "placeholder_" +
  cliOptions.size +
  "_" +
  randomString({ length: 4 }) +
  i +
  randomString({ length: 4 }) +
  ".jpg";
for (i = 1; i <= cliOptions.number; i++) {
  downloadPlaceHolder(image.getImgUrl(cliOptions.size), genfname(i));
}
