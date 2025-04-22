var commander = require('commander');
var image = require('./Image');
// The version should be the same as the package.json version, keep it in sync
module.exports = commander.version('1.11.0','-v, --version')
  .option('-n, --number [integer]', 'Number of files to generate',function(n){
    'use strict';
    var n2 = parseInt(n);
    // n should be a valid number
    if(isNaN(n2)){return 1}
    return n2;
  },1)
  .option('-s, --size [1024x768]', 'Image size',function(s){
    'use strict';
    // Check for an "x" in the string
    // and if not, return the default size
    // 1024x768
    if (s.indexOf('x')===-1){return '1024x768'}
    return s;
  },'1024x768')
  .option('-p, --provider [provider]', 'Set the image provider; '+Object.keys(img.providers).join(', '),
    function(p){
      'use strict';
      // Set image provider
      img.setProvider(p);
      return p;
    },img.setProvider('random'))
    .parse(process.argv);