var commander = require('commander');
var ImageModule = require('./Image');
var image = require('./imageInstance');

const DEFAULT_NUMBER = 1;
const DEFAULT_SIZE = '1024x768';

// The version should be the same as the package.json version, keep it in sync
module.exports = commander.version('1.11.0','-v, --version')
  .option('-n, --number [integer]', 'Number of files to generate',function(numberFileToGenerateInput){
    'use strict';
    var numberFileToGenerate = parseInt(numberFileToGenerateInput);
    // n should be a valid number
    if(isNaN(numberFileToGenerate)){return DEFAULT_NUMBER}
    return numberFileToGenerate;
  }, DEFAULT_NUMBER)
  .option('-s, --size [1024x768]', 'Image size',function(imageSize){
    'use strict';
    // Check for an "x" in the string
    // and if not, return the default size
    // 1024x768
    if (imageSize.indexOf('x')===-1){return DEFAULT_SIZE}
    return imageSize;
  }, DEFAULT_SIZE)
  .option('-p, --provider [provider]', 'Set the image provider; '+ImageModule.PROVIDER_NAMES.join(', '),
    function(provider){
      'use strict';
      // Set image provider
      image.setProvider(provider);
      return provider;
    },image.getProvider())
  .parse(process.argv);
