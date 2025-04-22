var commander = require('commander');
var image = require('./Image');
// The version should be the same as the package.json version, keep it in sync
module.exports = commander.version('1.11.0','-v, --version')
  .option('-n, --number [integer]', 'Number of files to generate',function(numberFileToGenerateInput){
    'use strict';
    var numberFileToGenerate = parseInt(numberFileToGenerateInput);
    // n should be a valid number
    if(isNaN(numberFileToGenerate)){return 1}
    return numberFileToGenerate;
  },1)
  .option('-s, --size [1024x768]', 'Image size',function(imageSize){
    'use strict';
    // Check for an "x" in the string
    // and if not, return the default size
    // 1024x768
    if (imageSize.indexOf('x')===-1){return '1024x768'}
    return imageSize;
  },'1024x768')
  .option('-p, --provider [provider]', 'Set the image provider; '+Object.keys(image.providers).join(', '),
    function(provider){
      'use strict';
      // Set image provider
      image.setProvider(provider);
      return provider;
    },image.setProvider('random'))
  .parse(process.argv);