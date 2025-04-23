var commander = require('commander');
var image = require('./Image');

function parseNumber(n){
  'use strict';
  var n2 = parseInt(n,10);
  return isNaN(n2) ? 1 : n2;
}

function parseSize(size) {
  'use strict';
  return size.indexOf('x') === -1 ? '1024x768' : size;
}

module.exports = commander
  .version('1.11.0','-v, --version')
  .option('-n, --number [integer]', 'Number of files to generate', parseNumber, 1)
  .option('-s, --size [1024x768]', 'Image size',parseSize, '1024x768')
  .option('-p, --provider [provider]', 'Set the image provider; '+Object.keys(image.list).join(', '),
    function(provider){
      'use strict';
      // Set image provider
      image.setProvider(provider);
      return provider;
    },image.setProvider('random'))
  .parse(process.argv);