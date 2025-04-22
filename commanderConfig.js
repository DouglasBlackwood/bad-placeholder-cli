var commander = require('commander');
var image = require('./Image');
// The version should be the same as the package.json version, keep it in sync
module.exports = commander.version('1.11.0','-v, --version')
  .option('-n, --number [integer]', 'Number of files to generate',function(numberFileToGenerate){
    'use strict';
    var convertStringToInt = parseInt(numberFileToGenerate);
    // numberFileToGenerate should be a valid number
    if(isNaN(convertStringToInt)){return 1}
    return convertStringToInt;
  },1)
  .option('-s, --size [1024x768]', 'Image size',function(s){
    'use strict';
    // Check for an "x" in the string
    // and if not, return the default size
    // 1024x768
    if (s.indexOf('x')===-1){return '1024x768'}
    return s;
  },'1024x768')
  .option('-p, --provider [provider]', 'Set the image provider; '+Object.keys(image.list).join(', '),
    function(p){
      'use strict';
      // Set image provider
      image.setPrvd(p);
      return p;
    },image.setPrvd('random'))
  .parse(process.argv);