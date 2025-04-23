'use strict';

const ImageModule = require('./Image');

// Create a single instance of the Image class
const imageInstance = new ImageModule.Image('random');

// Export the singleton instance
module.exports = imageInstance;
