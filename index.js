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


function calculatePercentage(number, total) {
  return Math.ceil(number/total*100);
}

function writeHttpResponseInStream(httpResponse, fileName, downloadIncrement){
  var writeStream = fs.createWriteStream(fileName);
  httpResponse.pipe(writeStream);
  writeStream.on('finish', function(){
    writeStream.close(function(){
      'use strict';
      downloadIncrement.count++;
      downloadIncrement.files.push(fileName);
      var downloadPercentage=calculatePercentage(downloadIncrement.count,commanderConfig.number);
      readline.cursorTo(process.stdout,0);
      process.stdout.write('Downloaded '+downloadIncrement.count+' of '+commanderConfig.number+'. ['+downloadPercentage+' %]');
      if(downloadIncrement.count===commanderConfig.number){console.info("\n" + commanderConfig.number + ' image(s) successfully downloaded')}
    });
  });
  writeStream.on('error',function(){console.log('Failed')})
};
// Download an image
function downloadImage(url,fileName, downloadIncrement){
  'use strict';
  if (url.substring(0, 7) === 'http://'){
    http.get(url,function(httpResponse){writeHttpResponseInStream(httpResponse, fileName, downloadIncrement)});
  } else {https.get(url,function(httpResponse){writeHttpResponseInStream(httpResponse, fileName, downloadIncrement)})}
};
followRedirect.maxRedirects = 10;

// Generate a randome file name
function generateRandomFileName(fileNumber){
  'use strict';
  return 'placeholder_' + commanderConfig.size + '_' + randomString({length: 4}) + fileNumber + randomString({length: 4}) + '.jpg'
}

function main() {
  'use strict';
  var i;
  //Objet pour modifier les valeurs count et files
  var downloadIncrement = {
    count: 0,
    files: []
  };

  for(i=1;i<=commanderConfig.number;i++)
  {
    downloadImage(image.getImageUrl(commanderConfig.size),generateRandomFileName(i), downloadIncrement);
  }
}

main();