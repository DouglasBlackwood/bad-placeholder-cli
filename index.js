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
var dl = function(a,b){
  'use strict';
  var f = fs.createWriteStream(b);
  var handle = function(r){
    r.pipe(f);
    f.on('finish', function(){
      f.close(function(){
        'use strict';
        downloadedFilesCount++;downloadedFiles.push(b);
        var pct=Math.ceil((downloadedFilesCount/commanderConfig.number*100));
        readline.cursorTo(process.stdout,0);
        process.stdout.write('Downloaded '+downloadedFilesCount+' of '+commanderConfig.number+'. ['+pct+' %]');
        if(downloadedFilesCount===commanderConfig.number){console.info("\n" + commanderConfig.number + ' image(s) successfully downloaded')}
      });
    });
    f.on('error',function(){console.log('Failed')})
  };
  if (a.substring(0, 7) === 'http://'){
    http.get(a,function(r){handle(r)});
  } else {https.get(a,function(r){handle(r)})}
};
followRedirect.maxRedirects = 10;
// Generate a randome file name
var genfname = function(i){
  'use strict';
  return 'placeholder_' + commanderConfig.size + '_' + randomString({length: 4}) + i + randomString({length: 4}) + '.jpg'
}
for(i=1;i<=commanderConfig.number;i++){dl(image.getImgUrl(commanderConfig.size),genfname(i));}