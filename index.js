#! /usr/bin/env node
var followRedirect = require('follow-redirects');
var http = followRedirect.http;
var https = followRedirect.https;
var fs = require('fs');
var randomString = require('random-string');
var image = require('./Image');
var readline = require('readline');
/* Require Commander configuration */
var commanderConfig = require('./commanderConfig');
// Counter of files downloaded
var downloadedFilesCount = 0;
// List of files downloaded
var downloadedFiles = [];
// Download an image
function downloadImage(url,fileName){
  'use strict';
  var writeStream = fs.createWriteStream(fileName);
  function writeHttpResponseInStream(httpResponse){
    httpResponse.pipe(writeStream);
    writeStream.on('finish', function(){
      writeStream.close(function(){
        'use strict';
        downloadedFilesCount++;downloadedFiles.push(fileName);
        var downloadPercentage=Math.ceil((downloadedFilesCount/commanderConfig.number*100));
        readline.cursorTo(process.stdout,0);
        process.stdout.write('Downloaded '+downloadedFilesCount+' of '+commanderConfig.number+'. ['+downloadPercentage+' %]');
        if(downloadedFilesCount===commanderConfig.number){console.info("\n" + commanderConfig.number + ' image(s) successfully downloaded')}
      });
    });
    writeStream.on('error',function(){console.log('Failed')})
  };
  if (url.substring(0, 7) === 'http://'){
    http.get(url,function(httpResponse){writeHttpResponseInStream(httpResponse)});
  } else {https.get(url,function(httpResponse){writeHttpResponseInStream(httpResponse)})}
};
followRedirect.maxRedirects = 10;
// Generate a randome file name
function generateRandomFileName(i){
  'use strict';
  return 'placeholder_' + commanderConfig.size + '_' + randomString({length: 4}) + i + randomString({length: 4}) + '.jpg'
}
for(i=1;i<=commanderConfig.number;i++){downloadImage(image.getImageUrl(commanderConfig.size),generateRandomFileName(i));}