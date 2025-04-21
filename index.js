#! /usr/bin/env node
var fr = require('follow-redirects');
var http = fr.http;
var https = fr.https;
var fs = require('fs');
var rdm = require('random-string');
var img = require('./Image');
var rdl = require('readline');
/* Require Commander configuration */
var cmd = require('./commanderConfig');
// Counter of files downloaded
var c = 0;
// List of files downloaded
var file_list = [];
// Download an image
var dl = function(a,b){
  'use strict';
  var f = fs.createWriteStream(b);
  var handle = function(r){
    r.pipe(f);
    f.on('finish', function(){
      f.close(function(){
        'use strict';
        c++;file_list.push(b);
        var pct=Math.ceil((c/cmd.number*100));
        rdl.cursorTo(process.stdout,0);
        process.stdout.write('Downloaded '+c+' of '+cmd.number+'. ['+pct+' %]');
        if(c===cmd.number){console.info("\n" + cmd.number + ' image(s) successfully downloaded')}
      });
    });
    f.on('error',function(){console.log('Failed')})
  };
  if (a.substring(0, 7) === 'http://'){
    http.get(a,function(r){handle(r)});
  } else {https.get(a,function(r){handle(r)})}
};
fr.maxRedirects = 10;
// Generate a randome file name
var genfname = function(i){
  'use strict';
  return 'placeholder_' + cmd.size + '_' + rdm({length: 4}) + i + rdm({length: 4}) + '.jpg'
}
for(i=1;i<=cmd.number;i++){dl(img.getImgUrl(cmd.size),genfname(i));}